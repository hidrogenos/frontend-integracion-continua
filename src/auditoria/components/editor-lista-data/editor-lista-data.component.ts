import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChildren
} from '@angular/core';
import {
    ListaPreguntaModel,
    ListaPreguntaDataTituloModel
} from '../../../shared/models/auditoria-lista.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Table } from 'primeng/table';

@Component({
    selector: 'editor-lista',
    styleUrls: ['editor-lista.component.scss'],
    template: `
        
        <div class="ui-g">
            <div class="ui-g-12">
                <div *ngIf="!editNombre">
                    <h1 style="display: inline; margin-right: 15px;">{{ lista.nombre }}</h1>
                    <button class="ui-button-primary"  pButton 
                        type="button" 
                        icon="fa fa-pencil" 
                        (click)="toggleEditNombreLista()">
                    </button>
                </div>
                <div *ngIf="editNombre">
                    <input pInputText style="margin-right: 15px;" type="text" [(ngModel)]="lista.nombre">
                    <button class="ui-button-success"  pButton 
                        type="button" 
                        icon="fa fa-check" 
                        (click)="updateListaNombre()">
                    </button>
                </div>
                <p-accordion>
                    <ng-template ngFor let-titulo [ngForOf]="lista.data.titulos" let-iTitulo="index">
                        <p-accordionTab>
                            <p-header>
                                {{ titulo.id + ' ' + titulo.titulo }}
                                <button class="button-edit-titulo ui-button-danger" pButton 
                                    *ngIf="lista.data.titulos.length > 1"
                                    (click)="deleteTitulo($event, iTitulo)"
                                    type="button" 
                                    icon="fa fa-trash">
                                </button>
                                <button class="button-edit-titulo ui-button-success" pButton 
                                    *ngIf="iTitulo < (lista.data.titulos.length -1)"
                                    (click)="moveDownTitulo($event, iTitulo)"
                                    type="button" 
                                    icon="fa fa-arrow-down">
                                </button>
                                <button class="button-edit-titulo ui-button-info" pButton 
                                    *ngIf="iTitulo > 0"
                                    (click)="moveUpTitulo($event, iTitulo)"
                                    type="button" 
                                    icon="fa fa-arrow-up">
                                </button>
                                <button class="button-edit-titulo ui-button-primary"  pButton 
                                    type="button" 
                                    icon="fa fa-pencil" 
                                    (click)="editTitulo(titulo, iTitulo)">
                                </button>
                            </p-header>
                            <div class="ui-g">
                                <div class="ui-g-12">
                                    <p-table #tblPreguntas [value]="titulo.preguntas" #tblPreguntas>
                                        <ng-template pTemplate="header">
                                            <tr>
                                                <th style="width: 50px;">Ref.</th>
                                                <th>Aspecto a evaluar</th>
                                                <th>Actividad a realizar</th>
                                                <th>Responsable</th>
                                                <th style="width: 100px;">Fecha</th>
                                                <th style="width: 60px;">P</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </ng-template>
                                        <ng-template pTemplate="body" let-pregunta let-iPregunta="rowIndex">
                                            <tr>
                                                <td pEditableColumn [pEditableColumn]="pregunta" [pEditableColumnField]="'id'">
                                                    <p-cellEditor>
                                                        <ng-template pTemplate="input">
                                                            <input pInputText type="text" [(ngModel)]="pregunta.id">
                                                        </ng-template>
                                                        <ng-template pTemplate="output">
                                                            {{ pregunta.id }}
                                                        </ng-template>
                                                    </p-cellEditor>
                                                </td>
                                                <td pEditableColumn [pEditableColumn]="pregunta" [pEditableColumnField]="'aspecto_evaluar'">
                                                    <p-cellEditor>
                                                        <ng-template pTemplate="input">
                                                            <textarea pInputTextarea [(ngModel)]="pregunta.aspecto_evaluar"></textarea>
                                                        </ng-template>
                                                        <ng-template pTemplate="output">
                                                            {{ pregunta.aspecto_evaluar }}
                                                        </ng-template>
                                                    </p-cellEditor>
                                                </td>
                                                <td pEditableColumn [pEditableColumn]="pregunta" [pEditableColumnField]="'actividad_realizar'">
                                                    <p-cellEditor>
                                                        <ng-template pTemplate="input">
                                                            <textarea pInputTextarea [(ngModel)]="pregunta.actividad_realizar"></textarea>
                                                        </ng-template>
                                                        <ng-template pTemplate="output">
                                                            {{ pregunta.actividad_realizar }}
                                                        </ng-template>
                                                    </p-cellEditor>
                                                </td>
                                                <td pEditableColumn [pEditableColumn]="pregunta" [pEditableColumnField]="'responsable'">
                                                    <p-cellEditor>
                                                        <ng-template pTemplate="input">
                                                            <input pInputText type="text" [(ngModel)]="pregunta.responsable">
                                                        </ng-template>
                                                        <ng-template pTemplate="output">
                                                            {{ pregunta.responsable }}
                                                        </ng-template>
                                                    </p-cellEditor>
                                                </td>
                                                <td pEditableColumn [pEditableColumn]="pregunta" [pEditableColumnField]="'fecha'">
                                                    <p-cellEditor>
                                                        <ng-template pTemplate="input">
                                                            <p-calendar [(ngModel)]="pregunta.fecha" (onClose)="onCloseFechaPregunta($event)"></p-calendar>
                                                        </ng-template>
                                                        <ng-template pTemplate="output">
                                                            {{ pregunta.fecha | date: formatDateAngular  }}
                                                        </ng-template>
                                                    </p-cellEditor>
                                                </td>
                                                <td pEditableColumn [pEditableColumn]="pregunta" [pEditableColumnField]="'ponderado'">
                                                    <p-cellEditor>
                                                        <ng-template pTemplate="input">
                                                            <input pInputText type="number" [(ngModel)]="pregunta.ponderado">
                                                        </ng-template>
                                                        <ng-template pTemplate="output">
                                                            {{ pregunta.ponderado }}
                                                        </ng-template>
                                                    </p-cellEditor>
                                                </td>
                                                <td style="text-align: center;">
                                                    <button pButton 
                                                        *ngIf="iPregunta != 0"
                                                        style="margin-right: 5px;"
                                                        (click)="moveUpPregunta(titulo, iPregunta)"
                                                        type="button" 
                                                        icon="fa fa-arrow-up"
                                                        class="ui-button-primary">
                                                    </button>
                                                    <button pButton 
                                                        *ngIf="iPregunta != (titulo.preguntas.length -1)"
                                                        style="margin-right: 5px;"
                                                        (click)="moveDownPregunta(titulo, iPregunta)"
                                                        type="button" 
                                                        icon="fa fa-arrow-down"
                                                        class="ui-button-success">
                                                    </button>
                                                    <button pButton 
                                                        *ngIf="titulo.preguntas.length > 1"
                                                        (click)="deletePregunta(titulo, iPregunta)"
                                                        type="button" 
                                                        icon="fa fa-trash"
                                                        class="ui-button-danger">
                                                    </button>
                                                </td>
                                            </tr>
                                        </ng-template>
                                    </p-table>
                                </div>
                            </div>
                            <div class="ui-g">
                                <div class="ui-g-12 text-aling-right">
                                    <button pButton 
                                        (click)="addPregunta(titulo)"
                                        type="button" 
                                        label="Agregar pregunta" 
                                        icon="fa fa-plus"
                                        class="ui-button-info">
                                    </button>
                                </div>
                            </div>
                        </p-accordionTab>
                    </ng-template>
                </p-accordion>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                <button pButton 
                    (click)="addTitulo()"
                    type="button" 
                    label="Agregar titulo" 
                    icon="fa fa-plus"
                    class="ui-button-success">
                </button>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12 ui-fluid">
                <button pButton 
                    (click)="updateListaData()"
                    type="button" 
                    label="Guardar datos de la lista" 
                    class="ui-button-primary">
                </button>
            </div>
        </div>
           
        <form [formGroup]="formEditTitulo" (ngSubmit)="onSubmitEditTitulo()" novalidate>
            <p-dialog [(visible)]="displayEditTitulo" (onHide)="onHideDialogEditTiulo()" modal="true" [width]="350">
                <p-header>
                    Editar titulo
                </p-header>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <div>
                                <label>Ref.</label>
                            </div>
                            <input type="text" pInputText formControlName="id"/>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <div>
                                <label>Titulo</label>
                            </div>
                            <input type="text" pInputText formControlName="titulo"/>
                        </div>
                    </div>
                <p-footer>
                    <button pButton 
                        type="button" 
                        label="Cancelar" 
                        class="ui-button-danger"
                        (click)="displayEditTitulo=false;">
                    </button>
                    <button pButton 
                        type="submit" 
                        label="Actualizar" 
                        class="ui-button-primary"
                        [disabled]="!formEditTitulo.valid">
                    </button>
                </p-footer>
            </p-dialog>
        </form>
    `
})
export class EditorListaComponent implements OnInit {
    // atributos
    displayEditTitulo: boolean;
    editNombre: boolean;
    formEditTitulo: FormGroup;
    formatDateAngular: string = environment.dateFormatAngular;

    //events
    @Output()
    onUpdateListaData = new EventEmitter<ListaPreguntaModel>();
    @Output()
    onUpdateListaNombre = new EventEmitter<ListaPreguntaModel>();

    //properties
    @Input()
    lista: ListaPreguntaModel;
    constructor(private fb: FormBuilder) {}

    //viewChildren
    @ViewChildren('tblPreguntas')
    tblPreguntas: Table[];

    ngOnInit() {
        this.createEditTituloForm();
    }

    addTitulo() {
        const titulo: ListaPreguntaDataTituloModel = {
            id: '0',
            titulo: 'nuevo titulo',
            preguntas: []
        };
        this.lista.data.titulos.push(titulo);
    }

    addPregunta(titulo: ListaPreguntaDataTituloModel) {
        titulo.preguntas.push({
            id: '0',
            aspecto_evaluar: 'Aspecto a evaluar',
            actividad_realizar: 'Actividad a realizar',
            responsable: 'responsable',
            fecha: new Date(),
            ponderado: 1
        });
    }

    createEditTituloForm() {
        this.formEditTitulo = this.fb.group({
            index: [null, Validators.required],
            id: ['', Validators.required],
            titulo: ['', Validators.required]
        });
    }

    deletePregunta(
        titulo: ListaPreguntaDataTituloModel,
        indexPregunta: number
    ) {
        titulo.preguntas = titulo.preguntas.filter(
            (e, i) => i != indexPregunta
        );
    }

    deleteTitulo(event: MouseEvent, indexTitulo: number) {
        event.preventDefault();
        this.lista.data.titulos = this.lista.data.titulos.filter(
            (e, i) => i != indexTitulo
        );
    }

    editTitulo(titulo: ListaPreguntaDataTituloModel, index: number) {
        this.formEditTitulo.setValue({
            index,
            id: titulo.id,
            titulo: titulo.titulo
        });
        this.displayEditTitulo = true;
    }

    moveDownPregunta(
        titulo: ListaPreguntaDataTituloModel,
        indexPregunta: number
    ) {
        const curr = titulo.preguntas[indexPregunta];
        const next = titulo.preguntas[indexPregunta + 1];
        titulo.preguntas[indexPregunta] = next;
        titulo.preguntas[indexPregunta + 1] = curr;
    }

    moveUpPregunta(
        titulo: ListaPreguntaDataTituloModel,
        indexPregunta: number
    ) {
        const prev = titulo.preguntas[indexPregunta - 1];
        const curr = titulo.preguntas[indexPregunta];
        titulo.preguntas[indexPregunta - 1] = curr;
        titulo.preguntas[indexPregunta] = prev;
    }

    moveDownTitulo(event: MouseEvent, indexTitulo: number) {
        event.preventDefault();
        const curr = this.lista.data.titulos[indexTitulo];
        const next = this.lista.data.titulos[indexTitulo + 1];

        this.lista.data.titulos[indexTitulo] = next;
        this.lista.data.titulos[indexTitulo + 1] = curr;
    }

    moveUpTitulo(event: MouseEvent, indexTitulo: number) {
        event.preventDefault();
        const prev = this.lista.data.titulos[indexTitulo - 1];
        const curr = this.lista.data.titulos[indexTitulo];

        this.lista.data.titulos[indexTitulo - 1] = curr;
        this.lista.data.titulos[indexTitulo] = prev;
    }

    onHideDialogEditTiulo() {
        this.formEditTitulo.reset();
    }

    onCloseFechaPregunta(event) {
        console.log(event);
        this.tblPreguntas.forEach(t => {
            if (t.editingCell) {
                t.closeCellEdit();
            }
        });
        // this.tblPreguntas[indexTitulo].closeCellEdit();
    }

    onSubmitEditTitulo() {
        const index = this.formEditTitulo.value.index;
        const titulo: ListaPreguntaDataTituloModel = {
            id: this.formEditTitulo.value.id,
            titulo: this.formEditTitulo.value.titulo,
            preguntas: []
        };
        this.lista.data.titulos = this.lista.data.titulos.map(
            (e, i) => (i != index ? e : { ...titulo, preguntas: e.preguntas })
        );

        this.displayEditTitulo = false;
    }

    toggleEditNombreLista() {
        this.editNombre = !this.editNombre;
    }

    updateListaData() {
        this.onUpdateListaData.emit(this.lista);
    }

    updateListaNombre() {
        this.toggleEditNombreLista();
        this.onUpdateListaNombre.emit(this.lista);
    }
}
