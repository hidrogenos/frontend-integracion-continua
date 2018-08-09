import { Component, ViewChild, OnInit } from '@angular/core';
import {
    CreatePerfilComponent,
    ListaPermisosComponent
} from '../../components';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { PermisosService } from '../../services';
import { forkJoin } from 'rxjs';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '@ngrx/store';
import * as fromAuth from './../../../auth/store';
import { ModuloModel } from '../../../shared/models/modulo.model';

@Component({
    selector: 'permisos',
    styleUrls: ['permisos.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-unlock-alt" aria-hidden="true"></i> Perfiles de acceso</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
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
                                (onSelectPerfil)="selectPerfil($event)">
                            </lista-perfiles>
                        </div>
                        <div class="ui-g-6">
                            <lista-permisos #lp
                                [modulos]="modulos"
                                [selectedPerfil]="selectedPerfil"
                                (onAddPermiso)="addPermiso($event)">
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
    `
})
export class PermisosComponent implements OnInit {
    //atributos
    perfiles: PerfilModel[];
    modulos: ModuloModel[];
    selectedPerfil: PerfilModel;

    //viewChild
    @ViewChild('cp') cp: CreatePerfilComponent;
    @ViewChild('lp') lp: ListaPermisosComponent;

    constructor(
        private permisosService: PermisosService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.loadInitalInfo();
    }

    addPermiso(id_permiso: number) {
        this.permisosService
            .addPermiso({ id_perfil: this.selectedPerfil.id, id_permiso })
            .subscribe(response => {
                this.selectedPerfil.permisos = [
                    ...this.selectedPerfil.permisos,
                    response
                ];
            });
    }

    createPerfil(data: string) {
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
                }, 1);
            });
        });
    }

    loadInitalInfo() {
        forkJoin([this.getPerfiles(), this.getModulos()]).subscribe(
            ([perfiles, modulos]) => {
                console.log(modulos);
                this.perfiles = perfiles;
                this.modulos = modulos;

                setTimeout(() => {
                    this.lp.updateRowGroupMetaData();
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

    selectPerfil(perfil: PerfilModel) {
        this.selectedPerfil = perfil;
        this.lp.loadPermisos(perfil.permisos);
    }
}
