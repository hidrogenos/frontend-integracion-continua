import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentoModel } from '../../../shared/models/documento.model';

@Component({
    selector: 'docs-informacion-general-documento',
    template: `
    <div>
        <form [formGroup]="form" (ngSubmit)="onSubmitUpdateDoc()" novalidate>
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
                <div class="ui-g-4 ui-fluid">
                    <div>
                        <label>Estado:</label>
                    </div>
                    <input type="text" pInputText formControlName="estado" />
                </div>
                <div class="ui-g-4 ui-fluid">
                    <div>
                        <label>Versión:</label>
                    </div>
                    
                    <input type="text" pInputText formControlName="version" />
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
            <div class="ui-g">
                <div class="ui-g-6" >
                    <button *ngIf="puedeReasignar" type="button" pButton label="Solicitar reasignación" class="ui-button-warning" 
                    (click)="solicitarReasignacion()"></button>
                    <button *ngIf="puedeReelaborar" type="button" pButton label="Solicitar reelaboracion" class="ui-button-warning" 
                    (click)="solicitarReelaboracion()"></button>
                </div>
                <div class="ui-g-6 text-aling-right" *ngIf="puedeEditar">
                    <button type="submit" pButton label="Editar información inicial" class="ui-button-primary" [disabled]="!form.valid" ></button>
                </div>
            </div>
        </form>
    </div>
    `
})
export class DocsInformacionGeneralDocumentoComponent implements OnInit {

    display: boolean;
    form: FormGroup;

    @Input()
    filteredRespAprobacion;
    @Input()
    filteredRespRevision;
    @Input()
    filteredRespElaboracion;
    @Input()
    filteredProcesos;
    @Input()
    puedeEditar: boolean;
    @Input()
    puedeReasignar: boolean;
    @Input()
    puedeReelaborar: boolean;
    @Output()
    onFilterRespElaboracion = new EventEmitter<any>();
    @Output()
    onFilterRespRevision = new EventEmitter<any>();
    @Output()
    onFilterRespAprobacion = new EventEmitter<any>();
    @Output()
    onFilterProcesos = new EventEmitter<string>();
    @Output()
    onUpdateDoc = new EventEmitter<any>();
    @Output()
    onSolicitarReasignacion = new EventEmitter();
    @Output()
    onSolicitarReelaboracion = new EventEmitter();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            id: [null, Validators.required],
            codigo: [null, Validators.required],
            titulo: [null, Validators.required],
            responsable_elaboracion: [null, Validators.required],
            responsable_revision: [null, Validators.required],
            responsable_aprobacion: [null, Validators.required],
            estado: [{ value: null, disabled: true }],
            version: [null, Validators.required],
            descripcion: [null]
        })
    }

    inicializarForm(documento: DocumentoModel, puedeEditarForm: boolean) {
        this.form.patchValue({
            id: documento.id,
            codigo: documento.codigo,
            titulo: documento.titulo,
            responsable_elaboracion: documento.responsable_elaboracion,
            responsable_revision: documento.responsable_revision,
            responsable_aprobacion: documento.responsable_aprobacion,
            estado: documento.estado.nombre,
            version: documento.version,
            descripcion: documento.descripcion
        })
        if (!puedeEditarForm) {
            this.form.disable();
        }
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

    onSubmitUpdateDoc() {
        this.onUpdateDoc.emit(this.form.value);
    }

    solicitarReasignacion() {
        this.onSolicitarReasignacion.emit();
    }

    solicitarReelaboracion() {
        this.onSolicitarReelaboracion.emit();
    }
}