import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreModel } from '../../../shared/models/store.model';

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromSahred from './../../../shared/store';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { ColaboradorDetalleService } from '../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { forkJoin } from 'rxjs';
import { ArlModel } from '../../../shared/models/arl.model';
import { CajaCompensacionModel } from '../../../shared/models/caja-compensacion.model';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';
import { CesantiaModel } from '../../../shared/models/cesantia.model';
import { EpsModel } from '../../../shared/models/eps.model';
import { PaisModel } from '../../../shared/models/pais.model';
import { PensionModel } from '../../../shared/models/pension.model';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import {
    UsuarioService,
    UsuarioDestrezaService,
    HasPermisionService
} from '../../../shared/services';
import {
    DatosBasicosColaboradorComponent,
    CreateDocumentoColaboradorComponent
} from '../../components';
import { UsuarioDestrezaModel } from '../../../shared/models/usuario-destreza.model';
import { UsuarioDestrezaDocumentoModel } from '../../../shared/models/usuario-destreza-documento.model';
import { UsuarioDocumentoModel } from '../../../shared/models/usuario-documento.model';
import { environment } from '../../../environments/environment';
import { CalidadMapaProcesoModel } from '../../../shared/models/calidad-mapa-proceso.model';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';
import { UsuarioProcesoModel } from '../../../shared/models/usuario-proceso.model';
import { ListaDocumentoRestringidoModel } from '../../../shared/models/lista-documento-restringido.model';
import { UsuarioListaDocumentosRestringidosModel } from '../../../shared/models/usuario-lista-documentos-restringidos.model';
import { DocumentosRestringidosListaComponent } from '../documentos-restringidos-lista/documentos-restringidos-lista.component';

@Component({
    selector: 'colaborador-detalle',
    styleUrls: ['colaborador-detalle.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-user" aria-hidden="true"></i> Detalle {{ loadedUsuario?.nombre }} {{ loadedUsuario?.apellido }}</h1>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <datos-basicos-colaborador #dbc
                                [arls]="arls"
                                [cajasCompensacion]="cajasCompensacion"
                                [cargosActivos]="cargosActivos"
                                [cesantias]="cesantias"
                                [epss]="epss"
                                [loadedUsuario]="loadedUsuario"
                                [paises]="paises"
                                [pensiones]="pensiones"
                                [perfilesActivos]="perfilesActivos"
                                [tiposIdentificacion]="tiposIdentificacion"
                                (onResetPassword)="resetPassword($event)"
                                (onUpdateUsuario)="updateUsuario($event)"
                                [permisoRestablecerContrasena]="hasPermision(1104) | async"
                                [permisoEditarDatosBasicos]="hasPermision(1105) | async">
                            </datos-basicos-colaborador>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-address-book" aria-hidden="true"></i> Anexos del colaborador</h1>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <p-tabView>
                                <p-tabPanel header="Aptitudes y destrezas">
                                    <div class="ui-g" *ngIf="hasPermision(1106) | async">
                                        <div class="ui-g-12">
                                            <aptitudes-destrezas-colaborador
                                                *ngIf="loadedUsuario"
                                                [destrezas]="loadedUsuario.destrezas"
                                                (onConsultarDestrezaDocumento)="consultarDestrezaDocumento($event)"
                                                (onCreateDestreza)="createDestreza($event)"
                                                (onDownloadDestrezaDocumento)="downloadUsuarioDestrezaDocumento($event)"
                                                (onUpdateDestreza)="updateDestreza($event)"
                                                (onDeleteDestrezaDocumento)="deleteDestrezaDocumento($event)"
                                                (onDeleteDestreza)="deleteDestreza($event)"
                                                [permisoAgregarAptitudDestreza]="hasPermision(1107) | async"
                                                [permisoConsultarDocumentoAptitudDestreza]="hasPermision(1108) | async"
                                                [permisoDescargarDocumentoAptitudDestreza]="hasPermision(1109) | async"
                                                [permisoBorrarDocumentoAptitudDestreza]="hasPermision(1110) | async"
                                                [permisoEditarAptitudDestreza]="hasPermision(1111) | async"
                                                [permisoBorrarAptitupDestreza]="hasPermision(1112) | async">
                                            </aptitudes-destrezas-colaborador>
                                        </div>
                                    </div>
                                </p-tabPanel>
                                <p-tabPanel header="Documentación y certificados">
                                    <div class="ui-g" *ngIf="hasPermision(1113) | async">
                                        <create-documento-colaborador #cdc
                                        *ngIf="loadedUsuario"
                                        [documentos]="loadedUsuario.documentos"
                                        (onCreateDocumentoColaborador)="createDocumentoColaborador($event)"
                                        (onDeleteUsuarioDocumento)="deleteUsuarioDocumento($event)"
                                        (onDownloadUsuarioDocumento)="downloadUsuarioDocumento($event)"
                                        [permisoAdjuntarDocumentos]="hasPermision(1114) | async"
                                        [permisoDescargarCertificado]="hasPermision(1115) | async"
                                        [permisoBorrarCertificado]="hasPermision(1116) | async">
                                    </create-documento-colaborador>
                                    </div>
                                </p-tabPanel>
                                <p-tabPanel header="Procesos relacionados">
                                    <div class="ui-g" *ngIf="hasPermision(1117) | async">
                                        <usuario-procesos
                                        *ngIf="loadedUsuario"
                                        [procesos]="procesos"
                                        [usuarioProcesos]="loadedUsuario.procesos"
                                        (onDeleteUsuarioProceso)="deleteUsuarioProceso($event)"
                                        (onRelacionarProcesos)="relacionarProcesos($event)"
                                        [permisoRelacionaroceso]="hasPermision(1118) | async"
                                        [permisoBorrarProceso]="hasPermision(1119) | async">
                                    </usuario-procesos>
                                    </div>
                                </p-tabPanel>
                                <p-tabPanel header="Listas de documentos restringidos">
                                    <div class="ui-g" *ngIf="hasPermision(1121) | async">
                                            <usuario-lista-documentos-restringidos
                                            *ngIf="loadedUsuario"
                                            [listasDocumentosRestringidos]="listasDocumentosRestringidos"
                                            [listasUsuarioDocumentosRestringidos]="loadedUsuario.listas_documentos_restringidos"
                                            (onDeleteUsuarioListaDocumentosRestringidos)="deleteUsuarioListaDocumentosRestringidos($event)"
                                            (onRelateListaDocumentosRestringidos)="relacionarListasDocumentosRestringidos($event)"
                                            [permisoRelacionarListaDocumentosRestringidos]="hasPermision(1122) | async"
                                            [permisoBorrarListaDocumentosRestringidos]="hasPermision(1123) | async">
                                        </usuario-lista-documentos-restringidos>
                                    </div>
                                </p-tabPanel>
                            </p-tabView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    `
})
export class ColaboradorDetalleComponent implements OnInit {
    //atributos
    arls: ArlModel[];
    cajasCompensacion: CajaCompensacionModel[];
    cargosActivos: CalidadOrganigramaModel[];
    cesantias: CesantiaModel[];
    epss: EpsModel[];
    formUser: FormGroup;
    loadedUsuario: UsuarioModel;
    paises: PaisModel[];
    pensiones: PensionModel[];
    perfilesActivos: PerfilModel[];
    procesos: MapaProcesoHijoModel[];
    tiposIdentificacion: TipoIdentificacionModel[];
    listasDocumentosRestringidos: ListaDocumentoRestringidoModel[];

    //viewChild
    @ViewChild('cdc')
    cdc: CreateDocumentoColaboradorComponent;
    @ViewChild('dbc')
    dbc: DatosBasicosColaboradorComponent;

    constructor(
        private colaboradorDetalleService: ColaboradorDetalleService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private usuarioDestrezaService: UsuarioDestrezaService
    ) {}

    ngOnInit() {
        this.getInitialData();
    }

    consultarDestrezaDocumento(documento: UsuarioDestrezaDocumentoModel) {
        this.store.dispatch(
            new fromRoot.Go({
                path: [
                    `visor-adjunto/${
                        environment.tipos_documento.usuario_destreza_documento
                            .id
                    }/${documento.id}/${documento.titulo}`
                ]
            })
        );
        console.log(documento);
    }

    createDestreza(data) {
        this.showWaitDialog(
            'Regitsrando nueva aptitud o destreza, un momento por favor...'
        );

        const auxDestreza: UsuarioDestrezaModel = {
            ...data.destreza,
            id_usuario: this.loadedUsuario.id
        };
        this.usuarioDestrezaService
            .create(auxDestreza)
            .pipe(
                switchMap(destreza => {
                    const files: File[] = data.files;
                    const form: FormData = new FormData();
                    files.forEach(element =>
                        form.append('uploads[]', element, element.name)
                    );
                    return this.colaboradorDetalleService
                        .uploadUsuarioDestrezaDocumentos(destreza.id, form)
                        .pipe(
                            map(documentos => {
                                return {
                                    ...destreza,
                                    documentos: documentos
                                };
                            })
                        );
                })
            )
            .subscribe(response => {
                this.loadedUsuario.destrezas = [
                    ...this.loadedUsuario.destrezas,
                    response
                ];
                this.hideWaitDialog();
            });
    }

    createDocumentoColaborador(files: File[]) {
        this.showWaitDialog('Adjuntando documentos, un momento por favor...');
        const form: FormData = new FormData();
        files.forEach(element =>
            form.append('uploads[]', element, element.name)
        );

        this.colaboradorDetalleService
            .uploadDocumentosColaborador(this.loadedUsuario.id, form)
            .subscribe(response => {
                this.loadedUsuario.documentos = [
                    ...this.loadedUsuario.documentos,
                    ...response
                ];
                this.cdc.fu.clear();
                this.hideWaitDialog();
            });
    }

    deleteDestreza(destreza: UsuarioDestrezaModel) {
        this.showWaitDialog('Eliminando destreza, un momento por favor...');
        this.colaboradorDetalleService
            .deleteDestreza(destreza.id)
            .subscribe(response => {
                this.loadedUsuario.destrezas = this.loadedUsuario.destrezas.filter(
                    element => element.id != response.id
                );
                this.hideWaitDialog();
            });
    }

    deleteDestrezaDocumento(destrezaDocumento: UsuarioDestrezaDocumentoModel) {
        this.showWaitDialog('Eliminando documento, un momento por favor...');
        this.colaboradorDetalleService
            .deleteDestrezaDocumento(destrezaDocumento.id)
            .subscribe(response => {
                this.loadedUsuario.destrezas.forEach(element => {
                    element.documentos = element.documentos.filter(
                        doc => doc.id != response.id
                    );
                });
                this.hideWaitDialog();
            });
    }

    deleteUsuarioDocumento(event: UsuarioDocumentoModel) {
        this.showWaitDialog('Eliminando documento, un momento por favor...');
        this.colaboradorDetalleService
            .deleteUsuarioDocumento(event.id)
            .subscribe(response => {
                this.loadedUsuario.documentos = this.loadedUsuario.documentos.filter(
                    element => element.id != event.id
                );
                this.hideWaitDialog();
            });
    }

    deleteUsuarioProceso(usuarioProceso: MapaProcesoHijoModel) {
        this.showWaitDialog('Eliminando proceso, un momento  por favor...');
        this.colaboradorDetalleService
            .deleteUsuarioProceso({
                id_usuario: this.loadedUsuario.id,
                id_mapa_procesos: usuarioProceso.id
            })
            .subscribe(response => {
                this.loadedUsuario = {
                    ...this.loadedUsuario,
                    procesos: this.loadedUsuario.procesos.filter(
                        e => e.id != usuarioProceso.id
                    )
                };
                this.hideWaitDialog();
            });
    }

    deleteUsuarioListaDocumentosRestringidos(listaDocumentosRestringidos: ListaDocumentoRestringidoModel){
        this.colaboradorDetalleService
        .deleteUsuarioListaDocumentosRestringidos( {
                id_usuario: this.loadedUsuario.id,
                id_lista_documentos_restringidos: listaDocumentosRestringidos.id
            }
        )
        .subscribe(usuarioListaDocumentoRestringido => {
            this.loadedUsuario.listas_documentos_restringidos = 
            this.loadedUsuario.listas_documentos_restringidos.filter(listaActual => listaActual.id != usuarioListaDocumentoRestringido.id_lista_documentos_restringidos);
        })
    }

    downloadUsuarioDocumento(event: UsuarioDocumentoModel) {
        this.colaboradorDetalleService
            .downloadUsuarioDestrezaDocumento({ path: event.path })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = event.titulo;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
            });
    }

    downloadUsuarioDestrezaDocumento(event: UsuarioDestrezaDocumentoModel) {
        this.showWaitDialog('Descargando documento, un momento por favor...');
        this.colaboradorDetalleService
            .downloadUsuarioDestrezaDocumento({ path: event.path })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = event.titulo;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
            });
    }

    getAuxData() {
        return this.colaboradorDetalleService.getInitialData();
    }

    getInitialData() {
        this.showWaitDialog(
            'Consultando datos del colaborador, un momento por favor'
        );
        forkJoin([this.getUsuario(), this.getAuxData()]).subscribe(
            ([usuario, auxData]) => {
                this.loadedUsuario = usuario;
                this.arls = auxData.arls;
                this.cajasCompensacion = auxData.cajas_compensacion;
                this.cargosActivos = auxData.cargos;
                this.cesantias = auxData.cesantias;
                this.epss = auxData.epss;
                this.paises = auxData.paises;
                this.pensiones = auxData.pensiones;
                this.perfilesActivos = auxData.perfiles;
                this.tiposIdentificacion = auxData.tipos_identificacion;
                this.procesos = auxData.procesos;
                this.listasDocumentosRestringidos = auxData.listasDocumentosRestringidos;

                setTimeout(() => {
                    this.dbc.loadFormData();
                    this.hideWaitDialog();
                }, 1);
            }
        );
    }

    getUsuario() {
        return this.store.select(fromRoot.getRouterState).pipe(
            take(1),
            switchMap(routeState => {
                return this.colaboradorDetalleService.getDetalleUsuario(
                    routeState.state.params.id
                );
            })
        );
    }

    hideWaitDialog() {
        this.store.dispatch(new fromSahred.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    relacionarListasDocumentosRestringidos(data: ListaDocumentoRestringidoModel[]){
        this.showWaitDialog('Relacionando listas documentosRestringidos...');
        this.colaboradorDetalleService
            .relacionarListasDocumentosRestringidos(this.loadedUsuario.id, { listas: data })
            .subscribe(response => {
                this.loadedUsuario = {
                    ...this.loadedUsuario,
                    ...response
                };
                this.hideWaitDialog();
            });
    }

    relacionarProcesos(procesos: MapaProcesoHijoModel[]) {
        this.showWaitDialog('Relacionando proceso, un momento por favor...');
        this.colaboradorDetalleService
            .relacionarProcesos(this.loadedUsuario.id, { procesos })
            .subscribe(response => {
                this.loadedUsuario = {
                    ...this.loadedUsuario,
                    ...response
                };
                this.hideWaitDialog();
            });
    }


    resetPassword(data) {
        this.showWaitDialog('Actualizando la contraseña, un momento por favor');
        this.colaboradorDetalleService
            .resetPassword(data)
            .subscribe(response => this.hideWaitDialog());
    }

    updateUsuario(usuario: UsuarioModel) {
        this.showWaitDialog('Actualizando datos, un momento por favor');

        this.colaboradorDetalleService
            .updateUsuario(this.loadedUsuario.id, usuario)
            .subscribe(response => {
                this.loadedUsuario = response;
                setTimeout(() => {
                    this.dbc.loadFormData();
                    this.hideWaitDialog();
                }, 1);
            });
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromSahred.ShowWaitDialog({ header, body }));
    }

    updateDestreza(data: { destreza: UsuarioDestrezaModel; files: File[] }) {
        this.showWaitDialog('Actualizando datos, un momento por favor...');
        this.colaboradorDetalleService
            .updateDestreza(data.destreza.id, data.destreza)
            .pipe(
                switchMap(destreza => {
                    const files: File[] = data.files;
                    const form: FormData = new FormData();
                    files.forEach(element =>
                        form.append('uploads[]', element, element.name)
                    );
                    return this.colaboradorDetalleService
                        .uploadUsuarioDestrezaDocumentos(data.destreza.id, form)
                        .pipe(
                            map(documentos => {
                                const aux: UsuarioDestrezaModel = {
                                    ...destreza,
                                    documentos: documentos
                                };

                                return aux;
                            })
                        );
                })
            )
            .subscribe(response => {
                this.loadedUsuario.destrezas = this.loadedUsuario.destrezas.map(
                    element => {
                        if (element.id == response.id) {
                            return {
                                ...element,
                                ...response,
                                documentos: [
                                    ...element.documentos,
                                    ...response.documentos
                                ]
                            };
                        }

                        return element;
                    }
                );

                this.hideWaitDialog();
            });
    }
}
