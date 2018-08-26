import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'create-lista-dialog',
    styleUrls: ['create-lista-dialog.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog [(visible)]="display" (onHide)="onHideDIalog()" modal="true">
                <p-header>
                    Crear nueva lista de preguntas
                </p-header>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <div>
                                <label>Nombre</label>
                            </div>
                            <input type="text" pInputText formControlName="nombre"/>
                        </div>
                    </div>
                <p-footer>
                    <button pButton 
                        type="button" 
                        label="Cancelar" 
                        class="ui-button-danger"
                        (click)="display=false;">
                    </button>
                    <button pButton 
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
export class CreateListaDialogComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output()
    onCreateLista = new EventEmitter<ListaPreguntaModel>();

    //properties
    @Input()
    listas: ListaPreguntaModel[];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required]
        });
    }

    onHideDIalog() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            const lista: ListaPreguntaModel = {
                nombre: this.form.value.nombre,
                activo: true,
                data: {
                    titulos: [
                        {
                            id: '1',
                            titulo: 'titulo 1',
                            preguntas: [
                                {
                                    id: '1.1',
                                    aspecto_evaluar: 'Aspecto a evaluar',
                                    actividad_realizar: 'Actividad a realizar',
                                    responsable: 'responsable',
                                    fecha: new Date().valueOf(),
                                    ponderado: 1
                                }
                            ]
                        }
                    ]
                }
            };

            if (this.validarListaExistente(lista)) {
                this.onCreateLista.emit(lista);
                this.display = false;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Nombre ya existente',
                    detail: 'Ya existe una lista con el nombre digitado'
                });
            }
        }
    }

    validarListaExistente(lista: ListaPreguntaModel): boolean {
        return this.listas.findIndex(l => l.nombre == lista.nombre) == -1;
    }
}
