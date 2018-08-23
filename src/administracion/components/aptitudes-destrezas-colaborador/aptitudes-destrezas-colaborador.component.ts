import {
    Component,
    EventEmitter,
    Output,
    Input,
    ViewChild
} from '@angular/core';
import { UsuarioDestrezaModel } from '../../../shared/models/usuario-destreza.model';
import { UsuarioDestrezaDocumentoModel } from '../../../shared/models/usuario-destreza-documento.model';
import { EditAptitudDestrezaColaboradorComponent } from '../edit-aptitud-destreza-colaborador/edit-aptitud-destreza-colaborador.component';

@Component({
    selector: 'aptitudes-destrezas-colaborador',
    styleUrls: ['aptitudes-destrezas-colaborador.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                <button style="margin-right:10px;" pButton 
                    type="button" 
                    label="Agregar aptitud o desterza" 
                    class="ui-button-warning"
                    (click)="cpdc.display = true">
                </button>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12">
                <p-table [value]="destrezas">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Destreza / Aptitud</th>
                            <th>Calificación</th>
                            <th>Descripción</th>
                            <th style="width: 400px;">Documentos</th>
                            <th>Acciones</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-destreza>
                        <tr>
                            <td>{{destreza.destreza}}</td>
                            <td>{{destreza.calificacion}}</td>
                            <td>{{destreza.descripcion}}</td>
                            <td>
                                <p-table [value]="destreza.documentos">
                                    <ng-template pTemplate="body" let-documento>
                                        <tr>
                                            <td>{{ documento.titulo }}</td>
                                            <td style="text-align: center;">
                                                <button style="margin-right:10px;" pButton 
                                                    type="button" 
                                                    icon="fa fa-eye" 
                                                    class="ui-button-primary"
                                                    (click)="onConsultarDestrezaDocumento.emit(documento)">
                                                </button>
                                                <button style="margin-right:10px;" pButton 
                                                    type="button" 
                                                    icon="fa fa-download" 
                                                    (click)="onDownloadDestrezaDocumento.emit(documento)"
                                                    class="ui-button-success">
                                                </button>
                                                <button style="margin-right:10px;" pButton 
                                                    type="button" 
                                                    icon="fa fa-trash" 
                                                    class="ui-button-danger"
                                                    (click)="onDeleteDestrezaDocumento.emit(documento)">
                                                </button>
                                            </td>
                                        </tr>
                                    </ng-template>
                                </p-table>
                            </td>
                            <td style="text-lign: center;">
                                <button style="margin-right:10px;" pButton 
                                    type="button" 
                                    icon="fa fa-pencil" 
                                    (click)="editDestreza(destreza)"
                                    class="ui-button-primary">
                                </button>
                                <button style="margin-right:10px;" pButton 
                                    type="button" 
                                    icon="fa fa-trash" 
                                    class="ui-button-danger"
                                    (click)="onDeleteDestreza.emit(destreza)">
                                </button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
        <create-aptitud-destreza-colaborador #cpdc
            (onCreateDestreza)="onCreateDestreza.emit($event)">
        </create-aptitud-destreza-colaborador>
        <edit-aptitud-desterza-colaborador #epdc
            (onUpdateDestreza)="onUpdateDestreza.emit($event)">
        </edit-aptitud-desterza-colaborador>
        
    `
})
export class AptitudesDestrezasColaboradorComponent {
    //properties
    @Input()
    destrezas: UsuarioDestrezaModel[];

    //events
    @Output()
    onConsultarDestrezaDocumento = new EventEmitter<UsuarioDestrezaModel>();
    @Output()
    onCreateDestreza = new EventEmitter<any>();
    @Output()
    onDeleteDestreza = new EventEmitter<UsuarioDestrezaModel>();
    @Output()
    onDownloadDestrezaDocumento = new EventEmitter<
        UsuarioDestrezaDocumentoModel
    >();
    @Output()
    onUpdateDestreza = new EventEmitter<{
        destreza: UsuarioDestrezaModel;
        files: File[];
    }>();
    @Output()
    onDeleteDestrezaDocumento = new EventEmitter<
        UsuarioDestrezaDocumentoModel
    >();

    //viewChild
    @ViewChild('epdc')
    epdc: EditAptitudDestrezaColaboradorComponent;

    constructor() {}

    editDestreza(destreza) {
        this.epdc.loadFormData(destreza);
        this.epdc.display = true;
    }
}
