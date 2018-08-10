import {
    Component,
    OnInit,
    AfterViewInit,
    Output,
    EventEmitter
} from '@angular/core';
import { CalidadModel } from '../../../shared/models/calidad.model';

@Component({
    selector: 'manual-calidad',
    styleUrls: ['manual-calidad.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <div style="text-align: right; color: #337ab7;">
                        <i 
                            *ngIf="!edit"
                            style="cursor: pointer;" 
                            class="fa fa-w fa-pencil" 
                            aria-hidden="true"
                            (click)="toggleEdit()">
                        </i>
                        <i 
                            *ngIf="edit"
                            style="cursor: pointer;" 
                            class="fa fa-check" 
                            aria-hidden="true"
                            (click)="toggleEdit()">
                        </i>
                    </div>
                    <div>
                    <div class="ui-g">
                        <div class="ui-g-12" style="text-align: center;">
                            <h1 style="color: #337ab7;">Manual de calidad</h1>
                        </div>
                    </div>
                    <div *ngIf="!edit" class="ui-g">
                        <div class="ui-g-4 ui-g-offset-4">
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Consultar manual de calidad" 
                                class="ui-button-primary"
                                (click)="onConsultarManualCalidad.emit()">
                            </button>
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Descargar manual de calidad" 
                                class="ui-button-success"
                                (click)="onDescargarManualCalidad.emit()">
                            </button>
                        </div>
                    </div>
                    <div *ngIf="edit" class="ui-g">
                        <div class="ui-g-4 ui-g-offset-4 ui-fluid">
                            <p-fileUpload 
                                mode="basic" 
                                name="demo[]"  
                                accept="application/pdf"
                                customUpload="true"
                                (uploadHandler)="uploadManual($event)"
                                chooseLabel="Seleccione">
                            </p-fileUpload>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class ManualCalidadComponent implements OnInit, AfterViewInit {
    //atributos
    edit: boolean;
    loadedCalidad: CalidadModel;

    //events
    @Output()
    onConsultarManualCalidad = new EventEmitter<any>();
    @Output()
    onDescargarManualCalidad = new EventEmitter<any>();
    @Output()
    onUpdateManual = new EventEmitter<File>();

    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {}

    toggleEdit() {
        this.edit = !this.edit;
    }

    uploadManual(event) {
        const file = event.files[0];
        this.onUpdateManual.emit(file);
    }
}
