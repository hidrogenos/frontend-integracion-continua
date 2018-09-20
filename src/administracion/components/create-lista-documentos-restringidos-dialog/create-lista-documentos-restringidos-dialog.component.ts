import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ListaDocumentoRestringidoModel } from "../../../shared/models/lista-documento-restringido.model";

@Component({
    selector: 'create-lista-documentos-restringidos-dialog',
    template: `
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar lista de documentos restringidos" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!form.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!form.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateListaDocumentosRestringidosDialogComponent {

    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output()
    onCreateListaDocumentosRestringidos = new EventEmitter<ListaDocumentoRestringidoModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required]
        });
    }

    onSubmit() {
        this.display = false;
        const listaDocumentosRestringidos: ListaDocumentoRestringidoModel = {
            nombre: this.form.value.nombre,
        };
        this.onCreateListaDocumentosRestringidos.emit(listaDocumentosRestringidos);
        this.form.reset();
    }

    show() {
        this.display = true;
    }
}