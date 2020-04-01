import { Component, Input, Output, ViewChild, OnInit } from "@angular/core";
import { FileUpload, DataTable } from "primeng/primeng";
import { environment } from "../../../environments/environment";
import { DocumentosExternosService } from "../../services";
import { take } from "rxjs/operators";
import { PlanoModel } from "../../../shared/models/plano.model";
import { CreateDocumentoExternoDialogComponent } from "../../components";
import { UsuarioModel } from "../../../shared/models/usuario.model";

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromAuth from './../../../auth/store';
import * as fromShared from './../../../shared/store';
import { StoreModel } from "../../../shared/models/store.model";
import { HasPermisionService } from "../../../shared/services";
import { DocumentoExternoModel } from "../../../shared/models/documento-externo.model";


@Component({
    selector:'documentos-externos',
    template:`


        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-book" aria-hidden="true"></i> Documentos Externos</h1>
                    <div class="ui-g" *ngIf="hasPermision(906) | async">
                        <div class="ui-g-12 text-aling-right">
                        <button pButton 
                        *ngIf="hasPermision(900) | async"
                        type="button" 
                        (click)="cdedc.display = true" 
                        label="Crear nuevo documento externo" 
                        class="ui-button-success">
                    </button>
                </div>
                <div class="ui-g" *ngIf="user">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                    <p-table [value]="documentosExternos" [lazy]="true" (onLazyLoad)="loadDocumentosExternosLazy($event)" [paginator]="true" 
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
                                        <ng-template pTemplate="body" let-documentoExterno>
                                            <tr>
                                                <td>{{ documentoExterno.nombre }}</td>
                                                <td>{{ documentoExterno.descripcion }}</td>
                                                <td>{{ documentoExterno.fecha_carga | date: dateFormat }}</td>
                                                <td style="text-align: center;">
                                                <button style="margin-right:10px;" pButton 
                                                    *ngIf="hasPermision(902) | async"
                                                    type="button" 
                                                    icon="fa fa-eye" 
                                                    (click)="consultarDocumentoExterno(documentoExterno)"
                                                    class="ui-button-primary">
                                                </button>
                                                <button style="margin-right:10px;" pButton
                                                    *ngIf="hasPermision(904) | async"
                                                    type="button" 
                                                    icon="fa fa-download" 
                                                    (click)="downloadDocumentoExterno(documentoExterno)"
                                                    class="ui-button-success">
                                                </button>
                                                <button style="margin-right:10px;" pButton
                                                    *ngIf="hasPermision(905) | async"
                                                    type="button" 
                                                    icon="fa fa-trash" 
                                                    class="ui-button-danger"
                                                    (click)="deleteDocumentoExterno(documentoExterno)">
                                                </button>
                                            </td>
                                            </tr>
                                        </ng-template>
                    </p-table>
            </div>
                <create-documento-externo-dialog-component #cdedc
                    (onCreateDocumentoExterno)="createDocumentoExterno($event)"
                    (create)="onCreate($event)">
                </create-documento-externo-dialog-component>
    </div>
    `
})

export class DocumentosExternosComponent implements OnInit{

    //atributos
    dateFormat = environment.dateFormatAngular;
    totalRecords: number;
    user: UsuarioModel;
    documentosExternos: DocumentoExternoModel[];

    //viewchild
    @ViewChild('dt') dt: DataTable;
    @ViewChild('cdedc') cdedc: CreateDocumentoExternoDialogComponent; 

    //properties
    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private documentoExternoService: DocumentosExternosService,
        
    ) {}

    ngOnInit() {
        this.dateFormat = environment.dateFormatAngular;
        this.store.select(fromAuth.getUser).pipe(
            take(1),
        ).subscribe(response => {
            this.user = response;
        });
    }

    consultarDocumentoExterno(plano: DocumentoExternoModel){
        const idTipoDocumento = environment.tipos_documento.documento_externo.id;
        this.store.dispatch(new fromRoot.Go({path: [`visor-adjunto/${idTipoDocumento}/${plano.id}/${plano.nombre}`]}))
    }

    createDocumentoExterno(data) {
        this.showWaitDialog('Adjuntando plano, un momento por favor...');
        const form: FormData = new FormData();
        data.files.forEach(element =>
            form.append('uploads[]', element, element.name)
        );
        form.append('descripcion', data.plano.descripcion)
        this.documentoExternoService
            .uploadDocumentoExterno(this.user.id, form)
            .subscribe(response => {
                this.dt.reset();
                this.cdedc.fu.clear();
                this.hideWaitDialog();
            });
    }

    deleteDocumentoExterno(event: DocumentoExternoModel) {
        this.showWaitDialog('Eliminando plano, un momento por favor...');
        this.documentoExternoService
            .deleteDocumentoExterno(event.id)
            .subscribe(response => {
                this.documentosExternos = this.documentosExternos.filter(
                    element => element.id != event.id,
                    this.dt.reset()
                );
                this.hideWaitDialog();
            });
    }

    downloadDocumentoExterno(event: PlanoModel) {
        this.showWaitDialog('Descargando plano, un momento por favor...');
        this.documentoExternoService
            .downloadDocumentoExterno({ path: event.path })
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

    loadDocumentosExternosLazy(event) {
        this.showWaitDialog(
            'Consultando datos requeridos, un momento por favor...');
        this.documentoExternoService
            .getDocumentosExternosLazy(event)
            .subscribe(response => {
                this.documentosExternos = response.data;
                this.totalRecords = response.totalRows;
            });
            this.hideWaitDialog();
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }    
}


