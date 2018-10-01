import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    TipoCuentaService,
    TipoIdentificacionService,
    BancoService,
    RegimenService,
    CiudadService,
    HasPermisionService
} from '../../../shared/services';
import { TipoCuentaModel } from '../../../shared/models/TipoCuenta.model';
import { BancoModel } from '../../../shared/models/banco.model';
import { RegimenModel } from '../../../shared/models/regimen.model';
import { CiudadModel } from '../../../shared/models/ciudad.model';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import { ProveedorListaService, FacturaService } from '../../services';
import { StoreModel } from '../../../shared/models/store.model';
import { forkJoin } from 'rxjs';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { EditProveedorDetalComponent, EvaluacionProveedorComponent } from '../../components';
import { take, switchMap } from 'rxjs/operators';
import { FacturasProveedorComponent } from '../../components/facturas-proveedor/facturas-proveedor.component';
import { FacturtaProveedorModel } from '../../../shared/models/factura-proveedor.model';
import { environment } from '../../../environments/environment';

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromShared from './../../../shared/store';


@Component({
    selector: 'proveedor-detalle',
    styleUrls: ['proveedor-detalle.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-industry" aria-hidden="true"></i> Detalles: {{ proveedor?.nombre }}</h1>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <edit-proveedor-detail #epd
                                                    [permisoEditar]="hasPermision([205]) | async"
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
            <div class="ui-g-12">
            <div class="card card-w-title">
                <h1><i class="fa fa-address-book" aria-hidden="true"></i> Anexos del proveedor</h1>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <p-tabView>
                            <p-tabPanel header="Evaluación" >
                                <div class="ui-g" *ngIf="hasPermision(206) | async">
                                    <div class="ui-g-12">
                                        <evaluacion-proveedor-component #epc
                                            [permisoCrearEvaluacion]="hasPermision([207]) | async"
                                            [permisoEditEvaluacion]="hasPermision([208]) | async"
                                            [permisoBorrarEvaluacion]="hasPermision([209]) | async">
                                        </evaluacion-proveedor-component>
                                    </div>
                                </div>
                            </p-tabPanel>
                            <p-tabPanel header="Facturas" >
                                <div class="ui-g" *ngIf="hasPermision(210) | async">
                                    <div class="ui-g-12">
                                    <facturas-proveedor #fpc
                                                        *ngIf="proveedor"
                                                        [factura]="proveedor.factura"
                                                        (onCreateFacturaProveedor)="createFacturaProveedor($event)"
                                                        (onDeleteFacturaProveedor)="deleteFacturaProveedor($event)"
                                                        (onDownloadFacturaProveedor)="downloadFacturaProveedor($event)"
                                                        (onConsultarFacturaProveedor)="consultarFacturaProveedor($event)"
                                                        (lazyFactura)="loadFacturasLazy($event)"
                                                        [perimisoUploadFactura]="hasPermision([211]) | async"
                                                        [permisoViewFactura]="hasPermision([212]) | async"
                                                        [permisoDownloadFactura]="hasPermision([213]) | async"
                                                        [permisoBorrarFactura]="hasPermision([214]) | async">
                                    </facturas-proveedor>
                                    </div>
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
    loading: boolean = true;

    //viewChild
    @ViewChild('epd') epd: EditProveedorDetalComponent;
    @ViewChild('fpc') fpc: FacturasProveedorComponent;
    @ViewChild('epc') epc: EvaluacionProveedorComponent;
    
    //properties
    constructor(
        private bancosService: BancoService,
        private ciudadService: CiudadService,
        private facturaService: FacturaService,
        private hasPermisionService: HasPermisionService,
        private regimenService: RegimenService,
        private proveedorListaService: ProveedorListaService,
        private store: Store<StoreModel>,
        private tipoIdentificacionservice: TipoIdentificacionService,
        private tipoCuentaService: TipoCuentaService
    ) {}

    ngOnInit() {
        this.getinitialData();
    }

    consultarFacturaProveedor(factura: FacturtaProveedorModel){
        const idTipoDocumento = environment.tipos_documento.factura_proveedor_documento.id;
        this.store.dispatch(new fromRoot.Go({path: [`visor-adjunto/${idTipoDocumento}/${factura.id}/${factura.titulo}`]}))
    }

    createFacturaProveedor(files: File[]) {
        this.showWaitDialog('Adjuntando documentos, un momento por favor...');
        const form: FormData = new FormData();
        files.forEach(element =>
            form.append('uploads[]', element, element.name)
        );
        this.facturaService
            .uploadFacturasProveedor(this.proveedor.id, form)
            .subscribe(response => {
                this.proveedor.factura = [
                    ...this.proveedor.factura,
                    ...response
                ];  
                this.fpc.fu.clear();
                this.hideWaitDialog();
            });
    }

    deleteFacturaProveedor(event: FacturtaProveedorModel) {
        this.showWaitDialog('Eliminando documento, un momento por favor...');
        this.facturaService
            .deleteFacturaProveedor(event.id)
            .subscribe(response => {
                this.proveedor.factura = this.proveedor.factura.filter(
                    element => element.id != event.id
                );
                this.hideWaitDialog();
            });
    }

    downloadFacturaProveedor(event: FacturtaProveedorModel) {
        this.facturaService
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
                return this.proveedorListaService.getProveedor(
                    routerState.state.params.id
                );
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

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    loadFacturasLazy(event) {
        this.loading = true;
        this.facturaService.getFacturasLazy(event, this.proveedor.id)
            .subscribe(response => {
                this.proveedor.factura = response.data;
                this.fpc.totalRecords = response.totalRows;
                this.loading = false;
        });
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
                    this.getinitialData();
                    this.hideWaitDialog();
            }, 1);
        });
    }    
}
