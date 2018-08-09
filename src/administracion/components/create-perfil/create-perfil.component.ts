import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
    ValidatorFn,
    AbstractControl
} from '@angular/forms';
import { of } from 'rxjs';
import { PerfilModel } from '../../../shared/models/perfil.model';

@Component({
    selector: 'create-perfil',
    styleUrls: ['create-perfil.component.scss'],
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
                    (onHide)="onHideCreateNewPerfil()">
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
                        <button type="submit" pButton icon="pi pi-save" label="Crear" class="ui-button-primary" [disabled]="!form.valid"></button>
                    </p-footer>
                </p-dialog>
            </form>
        </div>
    `
})
export class CreatePerfilComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output() onCreatePerfil = new EventEmitter<string>();

    //properties
    @Input() perfiles: PerfilModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            perfil: ['', Validators.required, perfilExists(this.perfiles)]
        });
    }

    onHideCreateNewPerfil() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            this.onCreatePerfil.emit(this.form.value.perfil);
            this.display = false;
        }
    }
}

export function perfilExists(perfiles: PerfilModel[]): ValidatorFn {
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
