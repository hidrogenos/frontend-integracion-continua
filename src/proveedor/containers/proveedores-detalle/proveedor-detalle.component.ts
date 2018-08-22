import {
    Component,
    OnInit,
    ViewChild,
    EventEmitter,
    Output,
    Input
} from '@angular/core';
import { StoreModel } from '../../../shared/models/store.model';

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import { forkJoin } from 'rxjs';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import {
    TipoCuentaService,
    TipoIdentificacionService,
    BancoService,
    RegimenService,
    CiudadService,
    ProveedorService
} from '../../../shared/services';
import { TipoCuentaModel } from '../../../shared/models/TipoCuenta.model';
import { BancoModel } from '../../../shared/models/banco.model';
import { RegimenModel } from '../../../shared/models/regimen.model';
import { CiudadModel } from '../../../shared/models/ciudad.model';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import { ProveedorListaService } from '../../services';
import * as fromShared from './../../../shared/store';
import { EditProveedorDetalComponent } from '../../components';
import { take, switchMap } from 'rxjs/operators';
import { FacturasProveedorComponent } from '../facturas-proveedor/facturas-proveedor.component';
import { FacturtaProveedorModel } from '../../../shared/models/factura-proveedor.model';

@Component({
    selector: 'proveedor-detalle',
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-user" aria-hidden="true"></i> Detalles: {{ proveedor?.nombre }}</h1>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <edit-proveedor-detail #epd
                                                    [identificacion]="identificacion"
                                                    [ciudades]="ciudades"
                                                    [regimen]="regimen"
                                                    [banco]="banco"
                                                    (editProveedor)="updateProveedor($event)">
                            </edit-proveedor-detail>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-address-book" aria-hidden="true"></i> Anexos del proveedor</h1>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <p-tabView>
                                <p-tabPanel header="Evaluación">
                                    <div class="ui-g">
                                        <div class="ui-g-12">
                                            <evaluacion-proveedor></evaluacion-proveedor>
                                        </div>
                                    </div>
                                </p-tabPanel>
                                <p-tabPanel header="facturas">
                                    <div class="ui-g">
                                        <div class="ui-g-12">
                                        <facturas-proveedor #fpc
                                                            *ngIf="proveedor"
                                                            [facturas]="proveedor.facturas"
                                                            (onCreateFacturaProveedor)="createFacturaProveedor($event)"
                                                            (onDeleteFacturaProveedor)="deletefacturaProveedor($event)"
                                                            (onDownloadFacturaProveedor)="downloadFacturaProveedor($event)">
                                        </facturas-proveedor>
                                        </div>
                                    </div>
                                </p-tabPanel>
                            </p-tabView>
                        </div>
                    </div>
                </div>
            </div>
    `
})
export class ProveedorDetalleComponent implements OnInit {
    //atributos
    display: boolean;
    proveedores: ProveedorModel[];
    proveedor: ProveedorModel;
    identificacion: TipoIdentificacionModel[];
    ciudades: CiudadModel[];
    regimen: RegimenModel[];
    banco: BancoModel[];
    tipoCuenta: TipoCuentaModel[];

    //viewChild
    @ViewChild('epd') epd: EditProveedorDetalComponent;
    @ViewChild('fpc') fpc: FacturasProveedorComponent;
    

    //properties
    constructor(
        private ciudadService: CiudadService,
        private regimenService: RegimenService,
        private bancosService: BancoService,
        private tipoIdentificacionservice: TipoIdentificacionService,
        private tipoCuentaService: TipoCuentaService,
        private store: Store<StoreModel>,
        private proveedorListaService: ProveedorListaService,
        private proveedorListService: ProveedorListaService
    ) {}

    ngOnInit() {
        this.getinitialData();
    }

    getAuxData() {
        return this.proveedorListaService.getInitialData();
    }

    getinitialData() {
        this.showWaitDialog(
            'Consultando datos del colaborador, un momento por favor...'
        );
        forkJoin([this.getProveedor(), this.getAuxData()]).subscribe(
            ([proveedor, auxData]) => {
                this.proveedor = proveedor;
                this.epd.banco = auxData.bancos;
                this.epd.regimen = auxData.regimen;
                this.epd.ciudades = auxData.ciudades;
                this.epd.tipoCuenta = auxData.tiposCuenta;
                this.epd.identificacion = auxData.tiposIdentificacion;

                setTimeout(() => {
                    this.epd.loadFormData(proveedor);
                    this.hideWaitDialog();
                }, 1);
            }
        );
    }

    getProveedor() {
        return this.store.select(fromRoot.getRouterState).pipe(
            take(1),
            switchMap(routerState => {
                return this.proveedorListService.getProveedor(
                    routerState.state.params.id
                );
            })
        );
    }

    listaProveedor() {
        this.store.dispatch(
            new fromRoot.Go({
                path: [`administracion/proveedores`]
            })
        );
    }

    getProveedores() {
        return this.proveedorListaService.getProveedores();
    }

    getTiposIdentificacion() {
        return this.tipoIdentificacionservice.getTiposIdentificacion();
    }

    getBancos() {
        return this.bancosService.getBancos();
    }

    getCiudades() {
        return this.ciudadService.getCiudades();
    }

    getRegimen() {
        return this.regimenService.getRegimen();
    }

    getTipoCuentas() {
        return this.tipoCuentaService.getTiposCuentas();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    updateProveedor(proveedor: ProveedorModel) {
        this.showWaitDialog('Actualizando datos, un momento por favor...');
        this.proveedorListaService
            .updateProveedor(this.proveedor.id, proveedor)
            .subscribe(response => {
                this.proveedor = response;
                setTimeout(() => {
                    this.epd.loadFormData(proveedor);
                    this.hideWaitDialog();
            }, 1);
        });
    }

    createFacturaProveedor(files: File[]) {
        this.showWaitDialog('Adjuntando documentos, un momento por favor...');
        const form: FormData = new FormData();
        files.forEach(element =>
            form.append('uploads[]', element, element.name)
        );
        this.proveedorListaService
            .uploadFacturasProveedor(this.proveedor.id, form)
            .subscribe(response => {
                this.proveedor.facturas = [
                    ...this.proveedor.facturas,
                    ...response
                ];
                this.fpc.fu.clear();
                this.hideWaitDialog();
            });
    }

    deleteFacturaProveedor(event: FacturtaProveedorModel) {
        this.showWaitDialog('Eliminando documento, un momento por favor...');
        this.proveedorListService
            .deleteFacturaProveedor(event.id)
            .subscribe(response => {
                this.proveedor.facturas = this.proveedor.facturas.filter(
                    element => element.id != event.id
                );
                this.hideWaitDialog();
            });
    }

    downloadFacturaProveedor(event: FacturtaProveedorModel) {
        this.proveedorListService
            .downloadFacturaProveedor({ path: event.path })
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
}
