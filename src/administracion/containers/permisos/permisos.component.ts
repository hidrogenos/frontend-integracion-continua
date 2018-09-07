import { Component, ViewChild, OnInit } from "@angular/core";
import {
    CreatePerfilComponent,
    ListaPermisosComponent,
    EditPerfilComponent
} from "../../components";
import { PerfilModel } from "../../../shared/models/perfil.model";
import { PermisosService } from "../../services";
import { forkJoin } from "rxjs";
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";
import * as fromAuth from "./../../../auth/store";
import * as fromShared from "./../../../shared/store";
import { ModuloModel } from "../../../shared/models/modulo.model";
import { HasPermisionService } from "../../../shared/services";

@Component({
    selector: "permisos",
    styleUrls: ["permisos.component.scss"],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-unlock-alt" aria-hidden="true"></i> Perfiles de acceso</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
                                *ngIf="hasPermision(1202) | async"
                                type="button" 
                                label="Crear nuevo perfil" 
                                class="ui-button-primary"
                                (click)="cp.display = true;">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-6">
                            <lista-perfiles
                                [perfiles]="perfiles"
                                (onSelectPerfil)="selectPerfil($event)"
                                (onEditPerfil)="ep.setPerfil($event); ep.display = true;"
                                [permisoEditarPerfil]="hasPermision(1201) | async">
                            </lista-perfiles>
                        </div>
                        <div class="ui-g-6">
                            <lista-permisos #lp
                                [modulos]="modulos"
                                [selectedPerfil]="selectedPerfil"
                                (onAddPermiso)="addPermiso($event)"
                                (onRemovePermiso)="removePermiso($event)"
                                [permisoSeleccionarPermiso]="hasPermision(1203) | async">
                            </lista-permisos>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create-perfil #cp
            *ngIf="perfiles"
            [perfiles]="perfiles"
            (onCreatePerfil)="createPerfil($event)">
        </create-perfil>
        <edit-perfil #ep
            *ngIf="perfiles"
            [perfiles]="perfiles"
            (onEditPerfil)="editPerfil($event)"
            >
        </edit-perfil>
    `
})
export class PermisosComponent implements OnInit {
    //atributos
    perfiles: PerfilModel[];
    modulos: ModuloModel[];
    selectedPerfil: PerfilModel;

    //viewChild
    @ViewChild("ep")
    ep: EditPerfilComponent;
    @ViewChild("cp")
    cp: CreatePerfilComponent;
    @ViewChild("lp")
    lp: ListaPermisosComponent;

    constructor(
        private permisosService: PermisosService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.loadInitalInfo();
    }

    addPermiso(id_permiso: number) {
        this.showWaitDialog("Actualizando permiso, un momento por favor...");
        this.permisosService
            .addPermiso({ id_perfil: this.selectedPerfil.id, id_permiso })
            .subscribe(response => {
                this.selectedPerfil.permisos = [
                    ...this.selectedPerfil.permisos,
                    response
                ];
                this.hideWaitDialog();
            });
    }

    createPerfil(data: string) {
        this.showWaitDialog("Creando nuevo perfil, un momento por favor...");
        this.store.select(fromAuth.getUser).subscribe(usuario => {
            const perfil: PerfilModel = {
                nombre: data,
                estado: true,
                id_usuario_crea: usuario.id
            };

            this.permisosService.createPerfil(perfil).subscribe(response => {
                this.perfiles = [...this.perfiles, response];
                setTimeout(() => {
                    this.cp.createForm();
                    this.ep.createForm();
                    this.hideWaitDialog();
                }, 1);
            });
        });
    }

    editPerfil(data: { id: number; perfil: string }) {
        this.showWaitDialog("Actualizando perfil, un momento por favor...");
        this.permisosService
            .editPerfil(data.id, { perfil: data.perfil })
            .subscribe(response => {
                this.perfiles = [
                    ...this.perfiles.filter(perfil => perfil.id != data.id),
                    response
                ];
                setTimeout(() => {
                    this.cp.createForm();
                    this.ep.createForm();
                    this.hideWaitDialog();
                }, 10);
            });
    }

    loadInitalInfo() {
        this.showWaitDialog(
            "Consultado información requerida, un momento por favor..."
        );
        forkJoin([this.getPerfiles(), this.getModulos()]).subscribe(
            ([perfiles, modulos]) => {
                console.log(modulos);
                this.perfiles = perfiles;
                this.modulos = modulos;

                setTimeout(() => {
                    this.lp.updateRowGroupMetaData();
                    this.hideWaitDialog();
                }, 10);
            }
        );
    }

    getModulos() {
        return this.permisosService.getModulos();
    }

    getPerfiles() {
        return this.permisosService.getPerfiles();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    removePermiso(id_permiso: number) {
        this.showWaitDialog("Actualizando permiso, un momento por favor...");
        this.permisosService
            .removePermiso({ id_perfil: this.selectedPerfil.id, id_permiso })
            .subscribe(response => {
                this.selectedPerfil.permisos = this.selectedPerfil.permisos.filter(
                    permiso => permiso.id != id_permiso
                );
                this.hideWaitDialog();
            });
    }

    selectPerfil(perfil: PerfilModel) {
        this.selectedPerfil = perfil;
        this.lp.loadPermisos(perfil.permisos);
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
