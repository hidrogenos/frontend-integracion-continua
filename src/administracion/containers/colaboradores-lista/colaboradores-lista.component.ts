import { Component, OnInit, ViewChild } from '@angular/core';

//models
import { StoreModel } from '../../../shared/models/store.model';

//store
import { Store } from '@ngrx/store';
import * as fromShared from './../../../shared/store';
import {
    TipoIdentificacionService,
    UsuarioService
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
import { CreateNuevoColaboradorDialogComponent } from '../../components';
import { UsuarioModel } from '../../../shared/models/usuario.model';

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
                            <button pButton type="button" (click)="cncd.display=true" label="Crear nuevo colaborador" class="ui-button-success"></button>
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
    paises: PaisModel[];
    pensiones: PensionModel[];
    perfilesActivos: PerfilModel[];
    tiposIdentificacion: TipoIdentificacionModel[];

    //viewChild
    @ViewChild('cncd') cncd: CreateNuevoColaboradorDialogComponent;

    constructor(
        private colaboradoresListaService: ColaboradoresListaService,
        private store: Store<StoreModel>,
        private tipoIdentificacionService: TipoIdentificacionService,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit() {
        this.loadInitData();
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

    createUsuario(usuario: UsuarioModel) {
        this.showWaitDialog(
            'Registrando nuevo colaborador, un momento por favor...'
        );
        let aux = this.usuarioService.transformRequestUsuario(usuario);
        this.colaboradoresListaService
            .createUsuario(aux)
            .subscribe(response => this.hideWaitDialog());
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

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
