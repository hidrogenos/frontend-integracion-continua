import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ListaDocumentoRestringidoModel } from "../../../shared/models/lista-documento-restringido.model";

@Component({
    selector: 'edit-lista-documentos-restringidos-dialog',
    template: `
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar lista de documentos restringidos" 
                [(visible)]="display" 
                [responsive]="true" 
                [maximizable]="true" 
                [width]="800"
                [modal]="true">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Nombre:</label>
                        </div>
                        <input type="text" pInputText formControlName="nombre" />
                    </div>
                </div>
                <p-footer>
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!form.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!form.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditListaDocumentosRestringidosDialogComponent {

    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output()
    onUpdateListaDocumentosRestringidos = new EventEmitter<ListaDocumentoRestringidoModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: ['', Validators.required],
            nombre: ['', Validators.required]
        });
    }

    loadFormData(listaDocumentosRestringidos: ListaDocumentoRestringidoModel) {
        this.display = true;
        this.form.setValue({
            id: listaDocumentosRestringidos.id,
            nombre: listaDocumentosRestringidos.nombre
        });
    }

    onSubmit() {
        this.display = false;
        const listaDocumentosRestringidos: ListaDocumentoRestringidoModel = {
            id: this.form.value.id,
            nombre: this.form.value.nombre,
        };
        this.onUpdateListaDocumentosRestringidos.emit(listaDocumentosRestringidos);
        this.form.reset();
    }

    show() {
        this.display = true;
    }
}