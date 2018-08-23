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
    @ViewChild('epd')
    epd: EditProveedorDetalComponent;

    //properties
    constructor(
        private ciudadService: CiudadService,
        private regimenService: RegimenService,
        private bancosService: BancoService,
        private tipoIdentificacionservice: TipoIdentificacionService,
        private tipoCuentaService: TipoCuentaService,
        private store: Store<StoreModel>,
        private proveedorListaService: ProveedorListaService,
        private proveedorservice: ProveedorService,
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
            'Consultando datos del colaborador, un momento por favor'
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
                    console.log(proveedor);
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
        this.showWaitDialog('Actualizando datos, un momento por favor');
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
}
