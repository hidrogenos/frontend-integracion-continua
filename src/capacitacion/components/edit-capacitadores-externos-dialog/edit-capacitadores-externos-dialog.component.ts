import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CapacitacionCapacitadorExternoModel } from "../../../shared/models/capacitacion-capacitador-externo.model";

@Component({
    selector: "edit-capacitadores-externo-component",
    template: `
    <div class="ui-g">
    <div>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <p-dialog header="Asistente Externo" [(visible)]="display" modal="modal" width="500" [responsive]="true" positionTop="100">
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <label>Nombre asistente: </label>
                        </div>
                             <div class="ui-md-8">
                                <input pInputText  
                                type="text"  
                                formControlName="nombre_capacitador"
                                style="width: 100%;"/>
                             </div>

                             <div class="ui-g-12">
                             <label>Calificacion: </label>
                         </div>
                              <div class="ui-md-8">
                                 <input pInputText  
                                 type="number"  
                                 formControlName="calificacion"
                                 style="width: 100%;"/>
                              </div>
                         </div>
                    <p-footer>
                        <button type="button" pButton icon="fa fa-close" (click)="display=false" label="Cancelar" class="black-btn"></button>
                        <button type="submit" pButton icon="fa fa-check" label="Aceptar"   [disabled]="!form.valid"></button>
                    </p-footer>
                </p-dialog>
            </form>
        </div>
       


      

    `
})
export class EditCapacitadoresExternosDialogComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    //atributos
    form: FormGroup;
    display: boolean = false;

    //properties
    @Output()
    editCE = new EventEmitter<CapacitacionCapacitadorExternoModel>();

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: [""],
            nombre_capacitador: ["", Validators.required],
            calificacion: ["", Validators.required]
        });
    }

    LoadForm(newForm: CapacitacionCapacitadorExternoModel) {
        this.form.setValue({
            id: newForm.id,
            nombre_capacitador: newForm.nombre_capacitador,
            calificacion: newForm.calificacion
        });
    }

    onSubmit() {
        this.display = false;
        const newCapacitador: CapacitacionCapacitadorExternoModel = {
            ...this.form.value
        };
        console.log(newCapacitador);
        this.editCE.emit(newCapacitador);
    }

    show(capacitador: CapacitacionCapacitadorExternoModel) {
        this.display = true;
        this.LoadForm(capacitador);
    }
}
