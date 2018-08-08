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
    UsuarioDestrezaService
} from '../../../shared/services';
import { DatosBasicosColaboradorComponent } from '../../components';
import { UsuarioDestrezaModel } from '../../../shared/models/usuario-destreza.model';
import { UsuarioDestrezaDocumentoModel } from '../../../shared/models/usuario-destreza-documento.model';

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
                                (onUpdateUsuario)="updateUsuario($event)">
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
                                    <div class="ui-g">
                                        <div class="ui-g-12">
                                            <aptitudes-destrezas-colaborador
                                                *ngIf="loadedUsuario"
                                                [destrezas]="loadedUsuario.destrezas"
                                                (onCreateDestreza)="createDestreza($event)"
                                                (onDownloadDestrezaDocumento)="downloadUsuarioDestrezaDocumento($event)"
                                                (onUpdateDestreza)="updateDestreza($event)"
                                                (onDeleteDestrezaDocumento)="deleteDestrezaDocumento($event)"
                                                (onDeleteDestreza)="deleteDestreza($event)">
                                            </aptitudes-destrezas-colaborador>
                                        </div>
                                    </div>
                                </p-tabPanel>
                                <p-tabPanel header="Documentación y certificados">
                                    Content 2
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
    tiposIdentificacion: TipoIdentificacionModel[];

    //viewChild
    @ViewChild('dbc') dbc: DatosBasicosColaboradorComponent;

    constructor(
        private colaboradorDetalleService: ColaboradorDetalleService,
        private store: Store<StoreModel>,
        private usuarioDestrezaService: UsuarioDestrezaService
    ) {}

    ngOnInit() {
        this.getInitialData();
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
            'COnsultando datos del colaborador, un momento por favor'
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
