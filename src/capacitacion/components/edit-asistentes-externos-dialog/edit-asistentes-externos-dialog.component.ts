import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CapacitacionAsistenteExternoModel } from "../../../shared/models/capacitacion-asistente-externo.model";

@Component({
    selector: "edit-asistente-externo-component",
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
                                formControlName="nombre_asistente"
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
export class EditAsistentesExternosDialogComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    //atributos
    form: FormGroup;
    display: boolean = false;

    //properties
    @Output()
    editAE = new EventEmitter<CapacitacionAsistenteExternoModel>();

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: [""],
            nombre_asistente: ["", Validators.required],
            calificacion: ["", Validators.required]
        });
    }

    LoadForm(newForm: CapacitacionAsistenteExternoModel) {
        this.form.setValue({
            id: newForm.id,
            nombre_asistente: newForm.nombre_asistente,
            calificacion: newForm.calificacion
        });
    }

    onSubmit() {
        this.display = false;
        const newAsistente: CapacitacionAsistenteExternoModel = {
            ...this.form.value
        };
        this.editAE.emit(newAsistente);
    }

    show(asistente: CapacitacionAsistenteExternoModel) {
        this.display = true;
        this.LoadForm(asistente);
    }
}
