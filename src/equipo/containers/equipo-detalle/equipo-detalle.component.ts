import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

//MODEL
import { EquipoModel } from '../../../shared/models/equipo.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { StoreModel } from '../../../shared/models/store.model';
import { EquipoAdjuntoModel } from '../../../shared/models/equipo-adjunto.model';
import { EquipoServicioMantenimientoModel } from '../../../shared/models/equipoServicioMantenimiento.model';
import { TipoServicioModel } from '../../../shared/models/tipoServicio.model';

//STORE
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import { forkJoin } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import * as fromShared from './../../../shared/store';

//SERVICE
import { EquipoCustomService } from '../../services/equipo.service';
import { ProveedorService } from '../../../shared/services/proveedor/proveedor.service';
import { EquipoDocumentoService } from '../../services/equipo-documento.service';
import { EquipoServicioMantenimientoService } from '../../../shared/services/equipo-servicio-mantenimiento/equipo-servicio-mantenimiento.service';
import { TipoServicioService } from '../../../shared/services';
import { HasPermisionService } from '../../../shared/services';
//COMPONENT
import { DatosBasicosEquiposComponent, CreateDocumentoEquipoComponent, ServiciosMantenimientosEquipoComponent } from '../../components';
import { DataTable } from 'primeng/primeng';
import { EquipoServicioMantenimientoCustomService } from '../../services';

@Component({
    selector: 'equipo-detalle',
    styleUrls: ['equipo-detalle.component.scss'],
    template: `
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <h1><i class="fa fa-user" aria-hidden="true"></i> Detalle {{ equipos?.nombre }}</h1>
                <div class="ui-g-6 ui-md-2">
                    <br>
                        <img #imagenEquipo class="imagen">
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <datos-basicos-equipo #dbe
                            [canEditPermisionsEditarDatosBasicosEquipo]="hasPermision([704]) | async"
                            [proveedor]="proveedor"
                            (onUpdateEquipo)="updateEquipo($event)">
                        </datos-basicos-equipo>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <div class="ui-g">
                    <div class="ui-g-12">
                        <p-tabView>
                            <p-tabPanel   header="Documentos">
                                <create-documento-equipo #cdc 
                                    *ngIf="equipos"
                                    [documentosEquipo]="equipos.documentos"
                                    (onCreateEquipoDocumento)="uploadDocumentosToEquipo($event)"
                                    (onCambiarValor)="cambiarValor($event)"
                                    (onDeleteEquipoDocumento)="deleteDocumentoEquipo($event)"
                                    (onDownloadEquipoDocumento)="downloadEquipoDocumento($event)"
                                    [canEditPermisionsSeleccionarDocumentoEquipo]="hasPermision([705]) | async"
                                    [canEditPermisionsDescargarDocumentoEquipo]="hasPermision([706]) | async"
                                    [canEditPermisionsEliminarDocumentoEquipo]="hasPermision([707]) | async"
                                    [canEditPermisionsMostrarImagenEquipo]="hasPermision([711]) | async">
                                </create-documento-equipo>
                            </p-tabPanel>
                            <p-tabPanel  header="Servicios  y mantenimientos">
                                <servicios-mantenimientos-equipo #sme
                                    *ngIf="equipos"
                                    [proveedoresCreate]="proveedor" 
                                    [tipos_servicioCreate]="tipo_servicio"
                                    [proveedoresEdit]="proveedor" 
                                    [tipos_servicioEdit]="tipo_servicio"
                                    [servicios]="equiposServicios"
                                    [canEditPermisionsCrearServicioMantenimiento]="hasPermision([708]) | async"
                                    [canEditPermisionsEditarServicioMantenimiento]="hasPermision([709]) | async"
                                    [canEditPermisionsEliminarServicioMantenimiento]="hasPermision([710]) | async"
                                    (onChangeFilterEquipos)="loadEquipoServicioMantenimiento($event)"
                                    (onCreateServicioMantenimientoEquipo)="createServicioMantenimientoEquipo($event)"
                                    (onDeleteEquipos)="deleteEquipoServicio($event)"
                                    (onEditServicioMantenimientoEquipo)="updateEquipoServicio($event)">
                                </servicios-mantenimientos-equipo>
                            </p-tabPanel>
                        </p-tabView>
                    </div>
                </div>  
            </div>
        </div>
    </div>
        `
})
export class EquipoDetalleComponent implements OnInit {

    //atributos
    documentosEquipo: EquipoAdjuntoModel[] = [];
    equipos: EquipoModel;
    equiposServicios: EquipoServicioMantenimientoModel;
    loading: boolean = true;
    proveedor: ProveedorModel[];
    tipo_servicio: TipoServicioModel[];
    totalRecords: number;
    dt: DataTable;

    //viewchild
    @ViewChild('dbe') dbe: DatosBasicosEquiposComponent;
    @ViewChild('cdc') cdc: CreateDocumentoEquipoComponent;
    @ViewChild('sme') sme: ServiciosMantenimientosEquipoComponent;
    @ViewChild('imagenEquipo') imagenEquipo: ElementRef;

    ngOnInit() {
        this.getInitialData();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    constructor(
        private store: Store<StoreModel>,
        private equipoCustomService: EquipoCustomService,
        private proveedorService: ProveedorService,
        private equipoDocumentoService: EquipoDocumentoService,
        private equipoServicioMantenimientoService: EquipoServicioMantenimientoService,
        private equipoServicioMantenimientoCustomService: EquipoServicioMantenimientoCustomService,
        private tipoServicioService: TipoServicioService,
        private hasPermisionService: HasPermisionService
    ) { }

    cambiarValor(equipoImagen: EquipoAdjuntoModel) {
        this.showWaitDialog("Un momento por favor", "");
        this.equipoDocumentoService
            .changeImagen(equipoImagen)
            .subscribe(response => {
                this.getEquipo().subscribe(responseEquipoImagen => {
                    this.equipos = responseEquipoImagen;
                    this.paintImagen();
                })
            })
    }


    paintImagenw(imagen: Blob) {
        const url = window.URL.createObjectURL(imagen);

        this.imagenEquipo.nativeElement.src = url;
        this.hideWaitDialog();
    }

    borrarImagen() {
        this.imagenEquipo.nativeElement.src = "";
        this.hideWaitDialog();
    }

    paintImagen() {
        let imagenPerfil = this.equipos.documentos.filter(imagen => {

            if (imagen.activo_check == true) {

                return imagen;

            }

        })
        if (imagenPerfil.length > 0) {
            this.equipoDocumentoService
                .downloadEquipoDocumento({ path: imagenPerfil[0].path })
                .subscribe(imagen => {
                    const blob = new Blob([imagen], { type: imagen.type });
                    this.paintImagenw(blob);

                });
        }
        else {
            this.borrarImagen();
        }

    }

    createServicioMantenimientoEquipo(equipoServicio: EquipoServicioMantenimientoModel) {
        this.showWaitDialog('Instalando equipo, un momento por favor...');
        equipoServicio.id_equipo = this.equipos.id
        this.equipoServicioMantenimientoCustomService
            .createServicioEquipo(equipoServicio)
            .subscribe(response => {
                this.sme.dt1.reset();
            });
    }

    deleteDocumentoEquipo(event: EquipoAdjuntoModel) {
        this.equipoDocumentoService.deleteEquipoDocumento(event.id)
            .subscribe(response => {
                this.getInitialData();
            });
    }

    deleteEquipoServicio(event: EquipoServicioMantenimientoModel) {
        this.showWaitDialog("Eliminando mantenimiento, un momento por favor...")
        console.log(event);
        this.equipoCustomService
            .getEliminarEquipoServicio(event)
            .subscribe((data: any) => {
                this.sme.dt1.reset();
            });
    }

    downloadEquipoDocumento(event: EquipoAdjuntoModel) {
        this.showWaitDialog("Descargando documento, un momento por favor...")
        this.equipoDocumentoService
            .downloadEquipoDocumento({ path: event.path })
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

    getEquipo() {
        return this.store.select(fromRoot.getRouterState).pipe(
            take(1),
            switchMap(routerState => {
                return this.equipoCustomService.getEquipoDetalle(
                    routerState.state.params.id
                );
            })
        );
    }

    getInitialData() {
        this.showWaitDialog("Consultando datos, un momento por favor...")
        forkJoin(
            this.getEquipo(), this.getProveedor(), this.getTiposServicios()
        ).subscribe(([equipos, proveedor, tipoServicio]) => {
            this.equipos = equipos;
            this.proveedor = proveedor;
            this.tipo_servicio = tipoServicio;
            setTimeout(() => {
                this.dbe.loadFormData(equipos);
                this.hideWaitDialog();
            }, 1);
            this.paintImagen();
        })
    }

    getProveedor() {
        return this.proveedorService.getProveedores();
    }

    getTiposServicios() {
        return this.tipoServicioService.getTiposServicio();
    }

    hasPermision(requiredPermisions) {
        return this.hasPermisionService.hasPermision(requiredPermisions);
    }

    loadEquipoServicioMantenimiento(event) {
        this.loading = true;
        this.equipoCustomService
            .getEquiposServicioMantenimientoLazy(event, this.equipos.id)
            .subscribe((items: any) => {
                this.equiposServicios = items.equipos;
                this.totalRecords = items.totalRecords;
                this.loading = false;
                this.hideWaitDialog();
            });
    }

    updateEquipo(equipo: EquipoModel) {
        this.showWaitDialog("Actualizando equipo, un momento por favor...")
        this.equipoCustomService
            .updateEquipo(equipo.id, equipo)
            .subscribe(response => {
                this.equipos = response;
                setTimeout(() => {
                    this.dbe.loadFormData(equipo);
                    this.hideWaitDialog();
                }, 1);
            });
    }

    uploadDocumentosToEquipo(files: File[]) {
        this.showWaitDialog(
            'Acción en proceso',
            'Realizando carga de documentos solicitados...'
        );

        const form: FormData = new FormData();
        files.forEach(archivo => {
            form.append('uploads[]', archivo, archivo.name);
        });

        this.equipoCustomService
            .uploadDocumentosEquipo(this.equipos.id, form)
            .subscribe(response => {
                this.equipos.documentos.push(...response);
                this.cdc.fu.clear();
                this.hideWaitDialog();
            });
    }

    updateEquipoServicio(equipo: EquipoServicioMantenimientoModel) {
        equipo.id_equipo = this.equipos.id;
        this.showWaitDialog("Actualizando servicio, un momento por favor...")
        this.equipoServicioMantenimientoService
            .updateEquipoServicio(equipo.id, equipo)
            .subscribe(response => {
                this.sme.dt1.reset();
            });
    }
}