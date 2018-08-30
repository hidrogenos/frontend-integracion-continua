import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators
} from '../../../../node_modules/@angular/forms';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';

@Component({
    selector: 'edit-calidad-organigrama-dialog',
    styleUrls: ['edit-calidad-organigrama-dialog.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Nueva cargo" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideEditCalidadOrganigrama()">
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
                            *ngIf="permisoEliminarCargo"
                            type="button" 
                            label="Eliminar" 
                            class="ui-button-warning"
                            (click)="deleteCargo()">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            label="Cancelar" 
                            class="ui-button-danger"
                            (click)="display = false">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            *ngIf="permisoEditarCargo"
                            type="submit" 
                            label="Actualizar" 
                            class="ui-button-primary"
                            [disabled]="!form.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
})
export class EditCalidadOrganigramaDialogComponent implements OnInit {
    //atributos
    form: FormGroup;
    display: boolean;

    //events
    @Output()
    onDeleteCargo = new EventEmitter<number>();
    @Output()
    onUpdateCargo = new EventEmitter<CalidadOrganigramaModel>();

    //properties
    @Input()
    cargos: CalidadOrganigramaModel[];
    @Input()
    permisoEditarCargo: boolean;
    @Input()
    permisoEliminarCargo: boolean;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: ['', Validators.required],
            jefe_directo: ['', Validators.required],
            cargo: ['', Validators.required],
            id_url_manual_funciones: [null],
            descripcion: ['', Validators.required],
            activo: [null, Validators.required],
            id_calidad: [null, Validators.required]
        });
    }

    deleteCargo() {
        this.onDeleteCargo.emit(this.form.value.id);
        this.display = false;
    }

    loadFormData(cargo: CalidadOrganigramaModel) {
        this.form.setValue({
            id: cargo.id,
            jefe_directo: this.cargos.find(
                element => element.id == cargo.id_padre
            ),
            cargo: cargo.cargo,
            id_url_manual_funciones: cargo.id_url_manual_funciones,
            descripcion: cargo.descripcion,
            activo: cargo.activo,
            id_calidad: cargo.id_calidad
        });
    }

    onHideEditCalidadOrganigrama() {
        this.form.reset();
    }

    onSubmit() {
        const cargo: CalidadOrganigramaModel = {
            id: this.form.value.id,
            cargo: this.form.value.cargo,
            descripcion: this.form.value.descripcion,
            activo: this.form.value.activo,
            id_padre: this.form.value.jefe_directo.id,
            id_calidad: this.form.value.id_calidad
        };

        this.onUpdateCargo.emit(cargo);
        this.display = false;
    }

    showDialog(cargo: CalidadOrganigramaModel) {
        this.loadFormData(cargo);
        this.display = true;
    }
}
