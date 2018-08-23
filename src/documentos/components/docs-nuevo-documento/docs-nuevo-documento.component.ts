import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'docs-nuevo-documento',
    template: `
    <div>
        <form [formGroup]="form" (ngSubmit)="onSubmitCreateDoc()" novalidate>
            <p-dialog 
                header="{{ tipoDocumento?.nombre }} - Crear nuevo" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateNewDoc()">
                
                <div class="ui-g">
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Código:</label>
                        </div>
                        <input type="text" pInputText formControlName="codigo" />
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Título:</label>
                        </div>
                        <input type="text" pInputText formControlName="titulo" />
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-4 ui-fluid">
                        <div>
                            <label>Responsable elaboración:</label>
                        </div>
                        <p-autoComplete formControlName="responsable_elaboracion" [forceSelection]="true"
                            [suggestions]="filteredRespElaboracion" 
                            (completeMethod)="filterResponsableElaboracion($event)"
                            [minLength]="1" field="nombre" [dropdown]="true">
                            <ng-template let-brand pTemplate="item">
                                {{brand.nombre}} {{brand.apellido}}
                            </ng-template>
                        </p-autoComplete>
                    </div>
                    <div class="ui-g-4 ui-fluid">
                        <div>
                            <label>Responsable revisión:</label>
                        </div>
                        <p-autoComplete formControlName="responsable_revision" [forceSelection]="true"
                            [suggestions]="filteredRespRevision" 
                            (completeMethod)="filterResponsableRevision($event)"
                            [minLength]="1" field="nombre" [dropdown]="true">
                            <ng-template let-brand pTemplate="item">
                                {{brand.nombre}} {{brand.apellido}}
                            </ng-template>
                        </p-autoComplete>
                    </div>
                    <div class="ui-g-4 ui-fluid">
                        <div>
                            <label>Responsable aprobación:</label>
                        </div>
                        <p-autoComplete formControlName="responsable_aprobacion" [forceSelection]="true"
                            [suggestions]="filteredRespAprobacion" 
                            (completeMethod)="filterResponsableAprobacion($event)" 
                            [minLength]="1" field="nombre" [dropdown]="true">
                            <ng-template let-brand pTemplate="item">
                                {{brand.nombre}} {{brand.apellido}}
                            </ng-template>
                        </p-autoComplete>
                    </div>
                    
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Procesos:</label>
                        </div>
                        <p-autoComplete formControlName="procesos" [forceSelection]="true"
                            [suggestions]="filteredProcesos" 
                            (completeMethod)="filterProcesos($event)" styleClass="wid100"
                            [minLength]="1" placeholder="Ingrese los procesos" field="proceso" [multiple]="true">
                        </p-autoComplete>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Descripción:</label>
                        </div>
                        <textarea rows="5" cols="30" formControlName="descripcion" pInputTextarea></textarea>
                    </div>
                </div>
                <p-footer>
                    <button type="button" pButton icon="pi pi-times" (click)="onHideCreateNewDoc()" label="Cancelar" class="ui-button-danger"></button>
                    <button type="submit" pButton icon="pi pi-save" label="Crear" class="ui-button-primary" [disabled]="!form.valid"></button>
                </p-footer>
            </p-dialog>
        </form>
    </div>
    `
})
export class DocsNuevoDocumentoComponent implements OnInit {

    display: boolean;
    form: FormGroup;

    @Input()
    tipoDocumento;

    @Input()
    filteredRespAprobacion;

    @Input()
    filteredRespRevision;
    @Input()
    filteredRespElaboracion;
    @Input()
    filteredProcesos;

    @Output()
    onFilterRespElaboracion = new EventEmitter<any>();
    @Output()
    onFilterRespRevision = new EventEmitter<any>();
    @Output()
    onFilterRespAprobacion = new EventEmitter<any>();
    @Output()
    onFilterProcesos = new EventEmitter<string>();
    @Output()
    onCreateDoc = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            codigo: [null, Validators.required],
            titulo: [null, Validators.required],
            responsable_elaboracion: [null, Validators.required],
            responsable_revision: [null, Validators.required],
            responsable_aprobacion: [null, Validators.required],
            procesos: [null],
            descripcion: [null]
        })
    }

    onHideCreateNewDoc() {
        this.display = false;
        this.form.reset();
    }

    filterResponsableElaboracion(event) {
        let obj = this.validateExcludeArray(event.query, this.form.value.responsable_revision,
            this.form.value.responsable_aprobacion);
        this.onFilterRespElaboracion.emit(obj);
    }

    filterResponsableRevision(event) {
        let obj = this.validateExcludeArray(event.query, this.form.value.responsable_elaboracion,
            this.form.value.responsable_aprobacion);
        this.onFilterRespRevision.emit(obj);
    }

    filterResponsableAprobacion(event) {
        let obj = this.validateExcludeArray(event.query, this.form.value.responsable_revision,
            this.form.value.responsable_elaboracion);
        this.onFilterRespAprobacion.emit(obj);
    }

    validateExcludeArray(query, responsable1, responsable2) {
        let obj = {
            query: query,
            exclude: []
        }
        if (responsable1) {
            obj.exclude.push(responsable1.id);
        }
        if (responsable2) {
            obj.exclude.push(responsable2.id);
        }
        return obj;
    }

    filterProcesos(event) {
        this.onFilterProcesos.emit(event.query);
    }

    onSubmitCreateDoc() {
        this.onCreateDoc.emit(this.form.value);
    }
}