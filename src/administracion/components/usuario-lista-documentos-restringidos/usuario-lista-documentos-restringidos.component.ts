import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ListaDocumentoRestringidoModel } from "../../../shared/models/lista-documento-restringido.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'usuario-lista-documentos-restringidos',
    template: `
    <form [formGroup]="form">
    <div class="ui-g" *ngIf="permisoRelacionarListaDocumentosRestringidos">
        <div class="ui-g-4 ui-fluid">
            <p-multiSelect [options]="listasDocumentosRestringidos" formControlName="documentosPorRestringir" optionLabel="nombre" defaultLabel="Seleccione..."></p-multiSelect>
        </div>
        <div class="ui-g-4 ui-fluid">
            <button pButton 
                type="button" 
                label="Relacionar lista de documentos restringidos" 
                class="ui-button-primary"
                [disabled]="!form.valid"
                (click)="relateListaDocumentosRestringidos()">
            </button>
        </div>
    
</div>
</form>
<div class="ui-g">
    <div class="ui-g-12 ui-fluid">
        <p-table [value]="listasUsuarioDocumentosRestringidos">
            <ng-template pTemplate="header">
                <tr>
                    <th>Listas de documentos restringidos</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-listaUsuarioDocumentosRestringidos>
                <tr>
                    <td>{{ listaUsuarioDocumentosRestringidos.nombre }}</td>
                    <td>
                        <button pButton 
                            *ngIf="permisoBorrarListaDocumentosRestringidos"
                            type="button" 
                            icon="fa fa-trash" 
                            class="ui-button-danger"
                            (click)="onDeleteUsuarioListaDocumentosRestringidos.emit(listaUsuarioDocumentosRestringidos)">
                        </button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</div>`,
    styleUrls: []
})
export class UsuarioListaDocumentosRestringidosComponent implements OnInit {
    
    //permits
    @Input()
    permisoRelacionarListaDocumentosRestringidos;

    @Input()
    permisoBorrarListaDocumentosRestringidos;


    //properties component externo
    @Input()
    listasDocumentosRestringidos: ListaDocumentoRestringidoModel[];

    @Input()
    listasUsuarioDocumentosRestringidos: ListaDocumentoRestringidoModel[];

    //events
    @Output()
    onRelateListaDocumentosRestringidos = new EventEmitter();

    @Output()
    onDeleteUsuarioListaDocumentosRestringidos = new EventEmitter();
    
    form: FormGroup;

    constructor(private fb:FormBuilder){}

    ngOnInit(){
        this.form = this.fb.group({
            documentosPorRestringir: [null, Validators.required]
        })
    }

    relateListaDocumentosRestringidos(){

        let listasNoRepetidas = this.form.value.documentosPorRestringir.filter( listaActual => {
            const listaBuscada = this.listasUsuarioDocumentosRestringidos.find(listaUsuarioActual => listaUsuarioActual.id == listaActual.id);
            if(!listaBuscada){
                return listaActual;
            }
        });

        this.onRelateListaDocumentosRestringidos.emit(listasNoRepetidas)
    }
}