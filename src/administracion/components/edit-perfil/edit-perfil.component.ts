import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
    AbstractControl
} from '@angular/forms';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { of } from 'rxjs';

@Component({
    selector: 'edit-perfil',
    styleUrls: ['edit-perfil.component.scss'],
    template: `
        <div>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <p-dialog 
                    header="Nuevo perfil" 
                    [(visible)]="display" 
                    [modal]="true" 
                    [responsive]="true" 
                    [width]="800" 
                    [maximizable]="true" 
                    (onHide)="onHideEditPerfilPerfil()">
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <div>
                                <label>Perfil</label>
                            </div>
                            <input type="text" pInputText formControlName="perfil" />
                            <div *ngIf="form.get('perfil').errors?.perfilExist"
                                style="margin-top: 5px; color: red; ">
                                El perfil digitado ya existe.
                            </div>
                        </div>
                    </div>
                    <p-footer>
                        <button type="button" pButton icon="pi pi-times" (click)="display=false" label="Cancelar" class="ui-button-danger"></button>
                        <button type="submit" pButton icon="pi pi-save" label="Actualizar" class="ui-button-primary" [disabled]="!form.valid"></button>
                    </p-footer>
                </p-dialog>
            </form>
        </div>
    `
})
export class EditPerfilComponent {
    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output()
    onEditPerfil = new EventEmitter<{ id: number; perfil: string }>();

    //properties
    @Input()
    perfiles: PerfilModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: null,
            perfil: ['', Validators.required, perfilExists(this.perfiles)]
        });
    }

    onHideEditPerfilPerfil() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            this.onEditPerfil.emit({
                id: this.form.value.id,
                perfil: this.form.value.perfil
            });
            this.display = false;
        }
    }

    setPerfil(perfil: PerfilModel) {
        this.form.setValue({
            id: perfil.id,
            perfil: perfil.nombre
        });
    }
}

function perfilExists(perfiles: PerfilModel[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (
            perfiles.find(perfil => perfil.nombre === control.value) ===
            undefined
        ) {
            return of(null);
        } else {
            return of({ perfilExist: 'El perfil digitado ya existe' });
        }
    };
}
