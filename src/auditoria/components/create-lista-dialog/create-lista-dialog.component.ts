import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { MessageService } from 'primeng/api';
import { UsuarioModel } from '../../../shared/models/usuario.model';

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

                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Autor:</label>
                        </div>
                        <p-dropdown 
                            [options]="usuarios" 
                            appendTo="body"
                            formControlName="id_usuario"
                            optionLabel="nombre"
                            autoWidth="false"
                            [style]="{'width': '100%'}"
                            placeholder="seleccione...">
                            <ng-template let-usuario pTemplate="selectedItem"> 
                                <span style="vertical-align:middle">
                                    {{ usuario.value.nombre + ' ' + usuario.value.apellido }}
                                </span>
                            </ng-template> 
                            <ng-template let-usuario pTemplate="item"> 
                                <div>
                                    {{ usuario.value.nombre + ' ' + usuario.value.apellido }}
                                </div>
                            </ng-template>
                        </p-dropdown>
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
    @Input()
    usuarios: UsuarioModel[];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            id_usuario: [null, Validators.required],

        });
    }

    onHideDIalog() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            const lista: ListaPreguntaModel = {
                nombre: this.form.value.nombre,
                id_usuario: this.form.value.id_usuario.id,

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
                                    actividad_realizar: 'Evidencia',
                                    responsable: 'responsable',
                                    fecha: new Date().valueOf(),
                                    ponderado: 'NA',
                                    resultado: null
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
