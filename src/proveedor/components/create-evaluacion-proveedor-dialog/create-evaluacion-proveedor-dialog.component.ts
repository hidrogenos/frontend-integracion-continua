import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { EvaluacionProveedorModel } from "../../../shared/models/evaluacion-proveedor.model";

@Component({
    selector: 'create-evaluacion-dialog',
    template:`
            <form [formGroup]="newEvaluacion" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva Evaluación" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newEvaluacion.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newEvaluacion.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateEvaluacionProveedorDialogComponent {

    //atributos
    display:boolean;
    newEvaluacion: FormGroup;
    msgs: Message[] = [];

    //events
    @Output() create = new EventEmitter<EvaluacionProveedorModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.newEvaluacion = this.fb.group({
        id:[''],
        factura_servicio:['', Validators.required],
        fecha_calificacion: ['',Validators.required],
        calificacion: ['', Validators.required],
        observaciones:['',Validators.required],
        activo: true
        });
    }
    
    onSubmit() {
        this.display = false;
        const evaluacion:  EvaluacionProveedorModel= {
            id: this.newEvaluacion.value.id,
            factura_servicio: this.newEvaluacion.value.factura_servicio,
            calificacion: this.newEvaluacion.value.calificacion,
            fecha_calificacion:(this.newEvaluacion.value.fecha_calificacion as Date).valueOf() / 1000,
            observaciones: this.newEvaluacion.value.observaciones,
            activo: true,

        };
        this.newEvaluacion.reset();
        this.create.emit(evaluacion);
    }
    
    show() {
        this.display = true;
    }


}