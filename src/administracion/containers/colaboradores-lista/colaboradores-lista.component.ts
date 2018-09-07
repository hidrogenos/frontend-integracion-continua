import { Component, OnInit, ViewChild } from '@angular/core';

//models
import { StoreModel } from '../../../shared/models/store.model';

//store
import { Store } from '@ngrx/store';
import * as fromShared from './../../../shared/store';
import * as fromRoot from './../../../app/store';
import {
    TipoIdentificacionService,
    UsuarioService,
    HasPermisionService
} from '../../../shared/services';
import { forkJoin } from 'rxjs';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import { ColaboradoresListaService } from '../../services';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';
import { PaisModel } from '../../../shared/models/pais.model';
import { EpsModel } from '../../../shared/models/eps.model';
import { ArlModel } from '../../../shared/models/arl.model';
import { PensionModel } from '../../../shared/models/pension.model';
import { CajaCompensacionModel } from '../../../shared/models/caja-compensacion.model';
import { CesantiaModel } from '../../../shared/models/cesantia.model';
import {
    CreateNuevoColaboradorDialogComponent,
    CreateAptitudDestrezaColaboradorComponent
} from '../../components';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { DataTable } from 'primeng/primeng';

@Component({
    selector: 'colaboradores-lista',
    styleUrls: ['colaboradores-lista.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-users" aria-hidden="true"></i> Colaboradores</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton type="button" (click)="cncd.display=true" *ngIf="hasPermision(1101) | async" label="Crear nuevo colaborador" class="ui-button-success"></button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="usuarios" [lazy]="true" (onLazyLoad)="loadUsuariosLazy($event)" [paginator]="true" 
                                [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="full_name" #dt>
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th pSortableColumn="full_name">
                                            Nombre
                                            <p-sortIcon field="full_name" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="login">
                                            usuario
                                            <p-sortIcon field="login" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="identificacion">
                                            Identificación
                                            <p-sortIcon field="identificacion" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="perfil">
                                            Perfil
                                            <p-sortIcon field="perfil" ></p-sortIcon>
                                        </th>
                                        <th>
                                            Acciones
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'usuario', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'identificacion', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'perfil', 'contains')">
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-usuario>
                                    <tr>
                                        <td>{{ usuario.full_name }}</td>
                                        <td>{{ usuario.login }}</td>
                                        <td>{{ usuario.identificacion }}</td>
                                        <td>{{ usuario.perfil }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton type="button" *ngIf="hasPermision(1102) | async" (click)="detalleUsuario(usuario.id)" icon="pi pi-search" class="ui-button-primary"></button>
                                            <button pButton type="button" icon="pi pi-trash" *ngIf="hasPermision(1103) | async" class="ui-button-danger"></button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create-nuevo-colaborador-dialog #cncd
            [tiposIdentificacion]="tiposIdentificacion"
            [perfilesActivos]="perfilesActivos"
            [cargosActivos]="cargosActivos"
            [paises]="paises"
            [epss]="epss"
            [arls]="arls"
            [pensiones]="pensiones"
            [cajasCompensacion]="cajasCompensacion"
            [cesantias]="cesantias"
            (onCreateUsuario)="createUsuario($event)">
        </create-nuevo-colaborador-dialog>
    `
})
export class ColaboradoresListaComponent implements OnInit {
    //atributos
    arls: ArlModel[];
    cajasCompensacion: CajaCompensacionModel[];
    cargosActivos: CalidadOrganigramaModel[];
    cesantias: CesantiaModel[];
    epss: EpsModel[];
    loading: boolean = true;
    paises: PaisModel[];
    pensiones: PensionModel[];
    perfilesActivos: PerfilModel[];
    tiposIdentificacion: TipoIdentificacionModel[];
    totalRecords: number;
    usuarios: any[];

    //viewChild
    @ViewChild('cncd') cncd: CreateNuevoColaboradorDialogComponent;
    @ViewChild('dt') dt: DataTable;

    constructor(
        private colaboradoresListaService: ColaboradoresListaService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private tipoIdentificacionService: TipoIdentificacionService,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit() {
        this.loadInitData();
    }

    detalleUsuario(idUsuario: number) {
        this.store.dispatch(
            new fromRoot.Go({
                path: [`administracion/colaboradores/detalle/${idUsuario}`]
            })
        );
    }

    loadInitData() {
        this.showWaitDialog(
            'Consultado datos requeridos, un momento por favor...'
        );

        forkJoin([this.loadInitDataUno(), this.loadInitDataDos()]).subscribe(
            () => this.hideWaitDialog()
        );
    }

    loadInitDataUno() {
        let aux = forkJoin([
            this.getArls(),
            this.getCargosActivos(),
            this.getEpss(),
            this.getPaises(),
            this.getPerfilesActivos(),
            this.getTiposIdentificacion()
        ]);

        aux.subscribe(
            ([
                arls,
                cargosActivos,
                epss,
                paises,
                perfilesActivos,
                tiposIdentificacion
            ]) => {
                this.arls = arls;
                this.cargosActivos = cargosActivos;
                this.epss = epss;
                this.paises = paises;
                this.perfilesActivos = perfilesActivos;
                this.tiposIdentificacion = tiposIdentificacion;
            }
        );
        
        return aux;
    }

    loadInitDataDos() {
        let aux = forkJoin([
            this.getPensiones(),
            this.getCajasCompensacion(),
            this.getCesantias()
        ]);

        aux.subscribe(([pensiones, cajasCompensacion, cesantias]) => {
            this.pensiones = pensiones;
            this.cajasCompensacion = cajasCompensacion;
            this.cesantias = cesantias;
        });

        return aux;
    }

    loadUsuariosLazy(event) {
        this.loading = true;
        this.colaboradoresListaService
            .getUsuariosLazy(event)
            .subscribe(response => {
                this.usuarios = response.data;
                this.totalRecords = response.totalRows;
                this.loading = false;
            });
    }

    createUsuario(usuario: UsuarioModel) {
        // this.showWaitDialog(
        //     'Registrando nuevo colaborador, un momento por favor...'
        // );
        let aux = this.usuarioService.transformRequestUsuario(usuario);
        this.colaboradoresListaService
            .createUsuario(aux)
            .subscribe(response => {
                this.dt.reset();
                this.hideWaitDialog();
            });
    }

    getArls() {
        return this.colaboradoresListaService.getArls();
    }

    getCajasCompensacion() {
        return this.colaboradoresListaService.getCajasCompensacion();
    }

    getCargosActivos() {
        return this.colaboradoresListaService.getCargosActivos();
    }

    getCesantias() {
        return this.colaboradoresListaService.getCesantias();
    }

    getEpss() {
        return this.colaboradoresListaService.getEpss();
    }

    getPaises() {
        return this.colaboradoresListaService.getPaises();
    }

    getPensiones() {
        return this.colaboradoresListaService.getEpensiones();
    }

    getPerfilesActivos() {
        return this.colaboradoresListaService.getPerfilesActivos();
    }

    getTiposIdentificacion() {
        return this.tipoIdentificacionService.getTiposIdentificacion();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
