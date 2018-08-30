import { Component, Input, Output, ViewChild, OnInit } from "@angular/core";
import { FileUpload, DataTable } from "primeng/primeng";
import { environment } from "../../../environments/environment";
import { DocumentosPlanosService } from "../../services";
import { take } from "rxjs/operators";
import { PlanoModel } from "../../../shared/models/plano.model";
import { CreatePlanoDialogComponent } from "../../components";
import { UsuarioModel } from "../../../shared/models/usuario.model";

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromAuth from './../../../auth/store';
import * as fromShared from './../../../shared/store';
import { StoreModel } from "../../../shared/models/store.model";
import { HasPermisionService } from "../../../shared/services";


@Component({
    selector:'planos',
    styleUrls:['planos.component.scss'],
    template:`


        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-book" aria-hidden="true"></i> Planos</h1>
                    <div class="ui-g" *ngIf="hasPermision(906) | async">
                        <div class="ui-g-12 text-aling-right">
                        <button pButton 
                        *ngIf="hasPermision(900) | async"
                        type="button" 
                        (click)="cpdc.display = true" 
                        label="Crear nuevo Plano" 
                        class="ui-button-success">
                    </button>
                </div>
                <div class="ui-g" *ngIf="user">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                    <p-table [value]="planos" [lazy]="true" (onLazyLoad)="loadPlanosLazy($event)" [paginator]="true" 
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
                                                <th>
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
                                                <th>
                                                </th>
                                            </tr>
                                        </ng-template>
                                        <ng-template pTemplate="body" let-plano>
                                            <tr>
                                                <td>{{ plano.nombre }}</td>
                                                <td>{{ plano.descripcion }}</td>
                                                <td>{{ plano.fecha_carga | date: dateFormat }}</td>
                                                <td style="text-align: center;">
                                                <button style="margin-right:10px;" pButton 
                                                    *ngIf="hasPermision(902) | async"
                                                    type="button" 
                                                    icon="fa fa-eye" 
                                                    (click)="consultarPlano(plano)"
                                                    class="ui-button-primary">
                                                </button>
                                                <button style="margin-right:10px;" pButton
                                                    *ngIf="hasPermision(904) | async"
                                                    type="button" 
                                                    icon="fa fa-download" 
                                                    (click)="downloadPlano(plano)"
                                                    class="ui-button-success">
                                                </button>
                                                <button style="margin-right:10px;" pButton
                                                    *ngIf="hasPermision(905) | async"
                                                    type="button" 
                                                    icon="fa fa-trash" 
                                                    class="ui-button-danger"
                                                    (click)="deletePlano(plano)">
                                                </button>
                                            </td>
                                            </tr>
                                        </ng-template>
                    </p-table>
            </div>
                <create-plano-dialog-component #cpdc
                    (onCreatePlano)="createPlano($event)"
                    (create)="onCreate($event)">
                </create-plano-dialog-component>
    </div>
    `
})

export class PlanosComponent implements OnInit{

    //atributos
    dateFormat = environment.dateFormatAngular;
    totalRecords: number;
    user: UsuarioModel;
    planos: PlanoModel[];

    //viewchild
    @ViewChild('dt') dt: DataTable;
    @ViewChild('cpdc') cpdc: CreatePlanoDialogComponent; 

    //properties
    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private documentPlanoService: DocumentosPlanosService,
        
    ) {}

    ngOnInit() {
        this.dateFormat = environment.dateFormatAngular;
        this.store.select(fromAuth.getUser).pipe(
            take(1),
        ).subscribe(response => {
            this.user = response;
        });
    }

    consultarPlano(plano: PlanoModel){
        const idTipoDocumento = environment.tipos_documento.plano_documento.id;
        this.store.dispatch(new fromRoot.Go({path: [`visor-adjunto/${idTipoDocumento}/${plano.id}/${plano.nombre}`]}))
    }

    createPlano(data) {
        this.showWaitDialog('Adjuntando plano, un momento por favor...');
        const form: FormData = new FormData();
        data.files.forEach(element =>
            form.append('uploads[]', element, element.name)
        );
        form.append('descripcion', data.plano.descripcion)
        this.documentPlanoService
            .uploadPlano(this.user.id, form)
            .subscribe(response => {
                this.dt.reset();
                this.cpdc.fu.clear();
                this.hideWaitDialog();
            });
    }

    deletePlano(event: PlanoModel) {
        this.showWaitDialog('Eliminando plano, un momento por favor...');
        this.documentPlanoService
            .deletePlano(event.id)
            .subscribe(response => {
                this.planos = this.planos.filter(
                    element => element.id != event.id,
                    this.dt.reset()
                );
                this.hideWaitDialog();
            });
    }

    downloadPlano(event: PlanoModel) {
        this.showWaitDialog('Descargando plano, un momento por favor...');
        this.documentPlanoService
            .downloadPlano({ path: event.path })
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

    loadPlanosLazy(event) {
        this.showWaitDialog(
            'Consultando datos requeridos, un momento por favor...');
        this.documentPlanoService
            .getPlanosLazy(event)
            .subscribe(response => {
                this.planos = response.data;
                this.totalRecords = response.totalRows;
            });
            this.hideWaitDialog();
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }    
}


