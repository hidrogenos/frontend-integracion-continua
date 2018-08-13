import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';

@Component({
    selector: 'create-calidad-organigrama-dialog',
    styleUrls: ['create-calidad-organigrama-dialog.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Nueva cargo" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateNewCalidadOrganigrama()">
                <div class="ui-g">
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Jefe directo</label>
                        </div>
                        <p-dropdown 
                            [options]="cargos"  
                            optionLabel="cargo" 
                            formControlName="jefe_directo"
                            placeholder="Seleccione..."
                            appendTo="body"
                            filter="true">
                        </p-dropdown>
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Cargo</label>
                        </div>
                        <input type="text" pInputText formControlName="cargo" />
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Descripción</label>
                        </div>
                        <textarea style="width: 100%;" rows="4" pInputTextarea formControlName="descripcion"></textarea>
                    </div>
                </div>
                <p-footer>
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            label="Cancelar" 
                            class="ui-button-danger"
                            (click)="display = false">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            type="submit" 
                            label="Crear" 
                            class="ui-button-primary"
                            [disabled]="!form.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
})
export class CreateCalidadOrganigramaDialogComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output()
    onCreateNewCargo = new EventEmitter<CalidadOrganigramaModel>();

    //properties
    @Input()
    cargos: CalidadOrganigramaModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            jefe_directo: [null, Validators.required],
            cargo: ['', Validators.required],
            descripcion: ['', Validators.required]
        });
    }

    onHideCreateNewCalidadOrganigrama() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            const cargo: CalidadOrganigramaModel = {
                id_padre: this.form.value.jefe_directo.id,
                cargo: this.form.value.cargo,
                activo: true,
                descripcion: this.form.value.descripcion,
                id_calidad: this.form.value.jefe_directo.id_calidad
            };

            this.onCreateNewCargo.emit(cargo);
            this.display = false;
        }
    }
}
