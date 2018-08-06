import {
    Component,
    OnInit,
    ViewChild,
    Input,
    EventEmitter,
    Output
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/primeng';
import { UsuarioDestrezaModel } from '../../../shared/models/usuario-destreza.model';
import { UsuarioModel } from '../../../shared/models/usuario.model';

@Component({
    selector: 'create-aptitud-destreza-colaborador',
    styleUrls: ['create-aptitud-destreza-colaborador.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Nueva aptitud o destreza" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateNewAptitudDestreza()">
                <div class="ui-g">
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Destreza</label>
                        </div>
                        <input type="text" pInputText formControlName="destreza" />
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Calificación</label>
                        </div>
                        <input type="text" pInputText formControlName="calificacion" />
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
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div>
                            <label>Adjuntos</label>
                        </div>
                        <p-fileUpload #fu
                            customUpload="true"
                            name="demo[]"
                            (uploadHandler)="uploadFiles($event)"
                            multiple="multiple"
                            [showUploadButton]="false"
                            cancelLabel="Limpiar"
                            chooseLabel="Seleccionar">
                        </p-fileUpload>
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
export class CreateAptitudDestrezaColaboradorComponent implements OnInit {
    //atirbutos
    display: boolean;
    form: FormGroup;

    //events
    @Output() onCreateDestreza = new EventEmitter<any>();

    //viewchild
    @ViewChild('fu') fu: FileUpload;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createform();
    }

    createform() {
        this.form = this.fb.group({
            destreza: ['', Validators.required],
            calificacion: ['', Validators.required],
            descripcion: ['', Validators.required]
        });
    }

    onHideCreateNewAptitudDestreza() {
        this.form.reset();
        this.fu.clear();
    }

    onSubmit() {
        if (this.form.valid) {
            const destreza = {
                destreza: this.form.value.destreza,
                calificacion: this.form.value.calificacion,
                descripcion: this.form.value.descripcion,
                activo: true
            };

            const data = {
                destreza,
                files: this.fu.files
            };
            this.onCreateDestreza.emit(data);
        }
    }
}
