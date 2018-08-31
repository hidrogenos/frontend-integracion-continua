import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CapacitacionCapacitadorInternoModel } from "../../../shared/models/capacitacion-capacitador-interno.model";

@Component({
    selector: "edit-capacitador-interno-component",
    template: `
    <div class="ui-g">
    <div>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <p-dialog header="Capacitador Interno" [(visible)]="display" modal="modal" width="500" [responsive]="true" positionTop="100">
                    <div class="ui-g">
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
export class EditCapacitadoresInternosDialogComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    //atributos
    form: FormGroup;
    display: boolean = false;

    //properties
    @Output()
    editCI = new EventEmitter<CapacitacionCapacitadorInternoModel>();

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: [""],
            calificacion: ["", Validators.required]
        });
    }

    LoadForm(newForm: CapacitacionCapacitadorInternoModel) {
        this.form.setValue({
            id: newForm.id,
            calificacion: newForm.calificacion
        });
    }

    onSubmit() {
        this.display = false;
        const newCapacitador: CapacitacionCapacitadorInternoModel = {
            ...this.form.value
        };
        this.editCI.emit(newCapacitador);
    }

    show(asistente) {
        this.display = true;
        this.LoadForm(asistente);
    }
}
