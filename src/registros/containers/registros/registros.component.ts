import { Component, Input, Output, ViewChild, OnInit } from "@angular/core";
import { FileUpload, DataTable } from "primeng/primeng";
import { environment } from "../../../environments/environment";
import { RegistrosService } from "../../services";
import { take } from "rxjs/operators";
import { PlanoModel } from "../../../shared/models/plano.model";
import { CreateRegistroDialogComponent } from "../../components";
import { UsuarioModel } from "../../../shared/models/usuario.model";

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromAuth from './../../../auth/store';
import * as fromShared from './../../../shared/store';
import { StoreModel } from "../../../shared/models/store.model";
import { HasPermisionService } from "../../../shared/services";
import { RegistroModel } from "../../../shared/models/registro.model";


@Component({
    selector:'registros',
    template:`


        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-book" aria-hidden="true"></i> Registros</h1>
                    <div class="ui-g" *ngIf="hasPermision(906) | async">
                        <div class="ui-g-12 text-aling-right">
                        <button pButton 
                        *ngIf="hasPermision(900) | async"
                        type="button" 
                        (click)="crdc.display = true" 
                        label="Crear nuevo registro" 
                        class="ui-button-success">
                    </button>
                </div>
                <div class="ui-g" *ngIf="user">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                    <p-table [value]="registros" [lazy]="true" (onLazyLoad)="loadRegistrosLazy($event)" [paginator]="true" 
                                        [rows]="10" [totalRecords]="totalRecords" sortField="nombre" #dt>
                                        <ng-template pTemplate="header" let-columns>
                                            <tr>
                                                <th pSortableColumn="nombre">
                                                    Nombre
                                                    <p-sortIcon field="nombre" ></p-sortIcon>
                                                </th>
                                                <th pSortableColumn="descripcion">
                                                    descripción
                                                    <p-sortIcon field="descripcion" ></p-sortIcon>
                                                </th>
                                                <th pSortableColumn="fecha_carga">
                                                    Fecha de Carga
                                                    <p-sortIcon field="fecha_carga" ></p-sortIcon>
                                                </th>
                                                <th rowspan="2">
                                                    Acciones
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                                </th>
                                                <th>
                                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'descripcion', 'contains')">
                                                </th>
                                                <th>
                                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_carga', 'contains')">
                                                </th>
                                            </tr>
                                        </ng-template>
                                        <ng-template pTemplate="body" let-registro>
                                            <tr>
                                                <td>{{ registro.nombre }}</td>
                                                <td>{{ registro.descripcion }}</td>
                                                <td>{{ registro.fecha_carga | date: dateFormat }}</td>
                                                <td style="text-align: center;">
                                                <button style="margin-right:10px;" pButton 
                                                    *ngIf="hasPermision(902) | async"
                                                    type="button" 
                                                    icon="fa fa-eye" 
                                                    (click)="consultarRegistro(registro)"
                                                    class="ui-button-primary">
                                                </button>
                                                <button style="margin-right:10px;" pButton
                                                    *ngIf="hasPermision(904) | async"
                                                    type="button" 
                                                    icon="fa fa-download" 
                                                    (click)="downloadRegistro(registro)"
                                                    class="ui-button-success">
                                                </button>
                                                <button style="margin-right:10px;" pButton
                                                    *ngIf="hasPermision(905) | async"
                                                    type="button" 
                                                    icon="fa fa-trash" 
                                                    class="ui-button-danger"
                                                    (click)="deleteRegistro(registro)">
                                                </button>
                                            </td>
                                            </tr>
                                        </ng-template>
                    </p-table>
            </div>
                <create-registro-dialog-component #crdc
                    (onCreateRegistro)="createRegistro($event)"
                    (create)="onCreate($event)">
                </create-registro-dialog-component>
    </div>
    `
})

export class RegistrosComponent implements OnInit{

    //atributos
    dateFormat = environment.dateFormatAngular;
    totalRecords: number;
    user: UsuarioModel;
    registros: RegistroModel[];

    //viewchild
    @ViewChild('dt') dt: DataTable;
    @ViewChild('crdc')crdc: CreateRegistroDialogComponent; 

    //properties
    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private registroService: RegistrosService,
        
    ) {}

    ngOnInit() {
        this.dateFormat = environment.dateFormatAngular;
        this.store.select(fromAuth.getUser).pipe(
            take(1),
        ).subscribe(response => {
            this.user = response;
        });
    }

    consultarRegistro(registro: RegistroModel){
        const idTipoDocumento = environment.tipos_documento.registro_documento.id;
        this.store.dispatch(new fromRoot.Go({path: [`visor-adjunto/${idTipoDocumento}/${registro.id}/${registro.nombre}`]}))
    }

    createRegistro(data) {
        this.showWaitDialog('Adjuntando plano, un momento por favor...');
        const form: FormData = new FormData();
        data.files.forEach(element =>
            form.append('uploads[]', element, element.name)
        );
        form.append('descripcion', data.registro.descripcion)
        this.registroService
            .uploadRegistro(this.user.id, form)
            .subscribe(response => {
                this.dt.reset();
                this.crdc.fu.clear();
                this.hideWaitDialog();
            });
    }

    deleteRegistro(event: RegistroModel) {
        this.showWaitDialog('Eliminando plano, un momento por favor...');
        this.registroService
            .deleteRegistro(event.id)
            .subscribe(response => {
                this.registros = this.registros.filter(
                    element => element.id != event.id,
                    this.dt.reset()
                );
                this.hideWaitDialog();
            });
    }

    downloadRegistro(event: RegistroModel) {
        this.showWaitDialog('Descargando plano, un momento por favor...');
        this.registroService
            .downloadRegistro({ path: event.path })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = event.nombre;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
        });
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    loadRegistrosLazy(event) {
        this.showWaitDialog(
            'Consultando datos requeridos, un momento por favor...');
        this.registroService
            .getRegistrosLazy(event)
            .subscribe(response => {
                this.registros = response.data;
                this.totalRecords = response.totalRows;
            });
            this.hideWaitDialog();
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }    
}


