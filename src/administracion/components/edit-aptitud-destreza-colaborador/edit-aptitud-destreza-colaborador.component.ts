import {
    Component,
    OnInit,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioDestrezaDocumentoModel } from '../../../shared/models/usuario-destreza-documento.model';
import { UsuarioDestrezaModel } from '../../../shared/models/usuario-destreza.model';
import { FileUpload } from 'primeng/primeng';

@Component({
    selector: 'edit-aptitud-desterza-colaborador',
    styleUrls: ['edit-aptitud-desterza-colaborador.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar aptitud o destreza" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideEditAptitudDestreza()">
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
                            <label>Archivos adjuntos</label>
                        </div>
                        <p-table [value]="loadedDestreza?.documentos">
                            <ng-template pTemplate="header">
                                <tr>
                                    <th>Documento</th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-documento>
                                <tr>
                                    <td>{{ documento.titulo }}</td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div>
                            <label>Agregar documentos</label>
                        </div>
                        <p-fileUpload #fu
                            customUpload="true"
                            name="demo[]"
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
                            label="Actualizar" 
                            class="ui-button-primary"
                            [disabled]="!form.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
})
export class EditAptitudDestrezaColaboradorComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;
    loadedDestreza: UsuarioDestrezaModel;

    //eventos
    @Output()
    onUpdateDestreza = new EventEmitter<{
        destreza: UsuarioDestrezaModel;
        files: File[];
    }>();

    //viewChild
    @ViewChild('fu') fu: FileUpload;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            destreza: ['', Validators.required],
            calificacion: ['', Validators.required],
            descripcion: ['', Validators.required]
        });
    }

    loadFormData(data: UsuarioDestrezaModel) {
        this.loadedDestreza = data;
        this.form.setValue({
            destreza: data.destreza,
            calificacion: data.calificacion,
            descripcion: data.descripcion
        });
    }

    onHideEditAptitudDestreza() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            const destreza: UsuarioDestrezaModel = {
                id: this.loadedDestreza.id,
                activo: true,
                calificacion: this.form.value.calificacion,
                descripcion: this.form.value.descripcion,
                destreza: this.form.value.destreza,
                id_usuario: this.loadedDestreza.id_usuario
            };

            const files = this.fu.files;

            this.onUpdateDestreza.emit({ destreza, files });

            this.display = false;
        }
    }
}
