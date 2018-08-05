import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { of } from 'rxjs';

@Component({
    selector: 'reset-contrasena-colaborador',
    styleUrls: ['reset-contrasena-colaborador.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Cambio contraseña colaborador: {{ loadedUsuario.nombre }} {{ loadedUsuario.apellido }}" 
                [(visible)]="display" 
                [width]="600"
                modal="true"
                (onHide)="resetForm()">
                <div class="ui-g">
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Nueva contraseña:</label>
                        </div>
                        <input type="password" pInputText formControlName="contrasenaUno" />
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Confirme contraseña:</label>
                        </div>
                        <input type="password" pInputText formControlName="contrasenaDos" />
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 text-aling-right">
                        <button style="margin-right:10px;" pButton type="button" label="Cancelar" (click)="display=false" class="ui-button-danger"></button>
                        <button style="margin-right:10px;" pButton type="submit" label="Actualizar"  class="ui-button-primary" [disabled]="!form.valid"></button>
                    </div>
                </div>
            </p-dialog>
        </form>
    `
})
export class ResetContrasenaColaboradorComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //event
    @Output() onResetPassword = new EventEmitter<any>();

    //properties
    @Input() loadedUsuario: UsuarioModel;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            contrasenaUno: ['', Validators.required, passwordComparation],
            contrasenaDos: ['', Validators.required, passwordComparation]
        });
    }

    onSubmit() {
        const data = {
            idUsuario: this.loadedUsuario.id,
            nuevaContrasena: this.form.value.contrasenaUno
        };

        this.onResetPassword.emit(data);
        this.display = false;
    }

    resetForm() {
        this.form.setValue({
            contrasenaUno: '',
            contrasenaDos: ''
        });
    }
}

function passwordComparation(control: FormControl) {
    const form = control.parent as FormGroup;
    const pass1 = form.get('contrasenaUno');
    const pass2 = form.get('contrasenaDos');
    if (pass1.value === pass2.value) {
        pass1.setErrors(null);
        pass2.setErrors(null);
        return of(null);
    } else {
        return of({
            passwordComparation: 'Las contraseñas no coinciden'
        });
    }
}
