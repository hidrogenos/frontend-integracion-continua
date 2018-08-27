import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EvaluacionProveedorModel } from '../../../shared/models/evaluacion-proveedor.model';

@Component({
    selector: 'edit-evaluacion-proveedor',
    template: ` 
            <form [formGroup]="editEvaluacionForm" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar Evaluación" 
                [(visible)]="display" 
                [width]="800"
                [modal]="true">
                <h2>Datos Básicos</h2>
                <div class="ui-g">
                    <div class="ui-g-4 ui-fluid">
                        <div>
                            <label>Factura/Servicio:</label>
                        </div>
                        <input type="text" pInputText formControlName="factura_servicio" />
                    </div>
                    <div class="ui-g-4 ui-fluid">
                        <div>
                            <label>Calificación:</label>
                        </div>
                        <input type="number" pInputText formControlName="calificacion" />
                    </div>
                    <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de Calificación:</label>
                            </div>
                        <p-calendar appendTo="body" showIcon="true" formControlName="fecha_calificacion"></p-calendar>
                    </div>
                    <div class="ui-g-12">
                    <div class="ui-g ui-fluid">
                        <div>
                            <label>Observaciónes</label>
                        </div>
                        <textarea style="width: 100%;" rows="10" pInputTextarea formControlName="observaciones"></textarea>
                    </div>
                </div>
                </div>
                <p-footer>
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editEvaluacionForm.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editEvaluacionForm.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})
export class EditEvaluacionProveedorDialogComponent implements OnInit {

    //atributos
    display: boolean = false;
    editEvaluacionForm: FormGroup;
    evaluacion: Observable<EvaluacionProveedorModel>;
    id: number;

    //events
    @Output() edit = new EventEmitter<EvaluacionProveedorModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.editEvaluacionForm = this.fb.group({
            id:[''],
            factura_servicio:['', Validators.required],
            fecha_calificacion: [new Date(),Validators.required],
            calificacion: ['', Validators.required],
            observaciones:['',Validators.required],
            activo: true,
        });
    }

    loadForm(evaluacion: EvaluacionProveedorModel) {
        this.editEvaluacionForm.setValue({
            id: evaluacion.id,
            factura_servicio: evaluacion.factura_servicio,
            fecha_calificacion: new Date(evaluacion.fecha_calificacion),
            calificacion: evaluacion.calificacion,
            observaciones:evaluacion.observaciones,
            activo: evaluacion.activo
        });
    }

    onSubmit() {
        this.display = false;
        const evaluacion:  EvaluacionProveedorModel= {
            id: this.editEvaluacionForm.value.id,
            factura_servicio: this.editEvaluacionForm.value.factura_servicio,
            fecha_calificacion: (this.editEvaluacionForm.value.fecha_calificacion as Date).valueOf(),
            calificacion: this.editEvaluacionForm.value.calificacion,
            observaciones: this.editEvaluacionForm.value.observaciones,
            activo: this.editEvaluacionForm.value.activo
        };
        this.edit.emit(evaluacion);
    }

    show(evaluacion: EvaluacionProveedorModel){
        this.id = evaluacion.id;
        this.display= true;
        this.loadForm(evaluacion);
    }

}
