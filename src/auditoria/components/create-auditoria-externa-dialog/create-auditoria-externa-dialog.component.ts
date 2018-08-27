import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'create-auditoria-externa-dialog',
    styleUrls: ['create-auditoria-externa-dialog.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog [(visible)]="display" (onHide)="onHideDIalog()" modal="true" [width]="800">
                <p-header>
                    Crear nueva auditoria externa
                </p-header>
                <div class="ui-g">
                    <div class="ui-g-4 ui-fluid">
                        <div>
                            <label>Fecha</label>
                        </div>
                        <p-calendar formControlName="fecha"></p-calendar>
                    </div>
                    <div class="ui-g-8 ui-fluid">
                        <div>
                            <label>Proveedor</label>
                        </div>
                        <p-autoComplete 
                            formControlName="proveedor" 
                            [suggestions]="filteredProveedores" 
                            (completeMethod)="searchProveedor($event)"
                            appendTo="body"
                            forceSelection="true"
                            field="nombre"
                            forceSelection="true">
                        </p-autoComplete>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Auditor principal</label>
                        </div>
                        <p-dropdown 
                            [options]="auditores" 
                            appendTo="body"
                            formControlName="auditor_principal"
                            optionLabel="nombre"
                            autoWidth="false"
                            [style]="{'width': '100%'}"
                            placeholder="seleccione..."
                            (onChange)="onChangeAuditorPrincipal($event)">
                            <ng-template let-auditor pTemplate="selectedItem"> 
                                <span style="vertical-align:middle">
                                    {{ auditor.value.nombre + ' ' + auditor.value.apellido }}
                                </span>
                            </ng-template> 
                            <ng-template let-auditor pTemplate="item"> 
                                <div>
                                    {{ auditor.value.nombre + ' ' + auditor.value.apellido }}
                                </div>
                            </ng-template>
                        </p-dropdown>
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Auditor apoyo</label>
                        </div>
                        <p-dropdown 
                            [options]="auditores" 
                            appendTo="body"
                            formControlName="auditor_apoyo"
                            optionLabel="nombre"
                            autoWidth="false"
                            [style]="{'width': '100%'}"
                            placeholder="seleccione..."
                            (onChange)="onChangeAuditorApoyo($event)">
                            <ng-template let-auditor pTemplate="selectedItem"> 
                                <span style="vertical-align:middle">
                                    {{ auditor.value.nombre + ' ' + auditor.value.apellido }}
                                </span>
                            </ng-template> 
                            <ng-template let-auditor pTemplate="item"> 
                                <div>
                                    {{ auditor.value.nombre + ' ' + auditor.value.apellido }}
                                </div>
                            </ng-template>
                        </p-dropdown>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Auditado</label>
                        </div>
                        <input type="text" pInputText formControlName="auditado" />
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>listas de preguntas</label>
                        </div>
                        <p-multiSelect 
                            [options]="listasPreguntas" 
                            optionLabel="nombre"
                            formControlName="listas"
                            defaultLabel="seleccione...">
                        </p-multiSelect>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <p-editor  [style]="{'height':'120px'}" formControlName="objetivo">
                            <p-header>
                                <span class="ql-formats">
                                    Objetivo
                                </span>
                            </p-header>
                        </p-editor>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <p-editor  [style]="{'height':'120px'}" formControlName="alcance">
                            <p-header>
                                <span class="ql-formats">
                                    Alcance
                                </span>
                            </p-header>
                        </p-editor>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <p-editor  [style]="{'height':'120px'}" formControlName="normas">
                            <p-header>
                                <span class="ql-formats">
                                    Normas
                                </span>
                            </p-header>
                        </p-editor>
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
export class CreateAuditoriaExternaDialogComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //event
    @Output()
    onSearchProveedor = new EventEmitter<string>();
    @Output()
    onCreateAuditoria = new EventEmitter<{
        auditoria: AuditoriaExternaModel;
        idsLista: number[];
    }>();

    //properties
    @Input()
    filteredProveedores: ProveedorModel[];
    @Input()
    auditores: UsuarioModel[];
    @Input()
    listasPreguntas: ListaPreguntaModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            fecha: [new Date(), Validators.required],
            proveedor: [null, Validators.required],
            auditor_principal: [null, Validators.required],
            auditor_apoyo: [null, Validators.required],
            auditado: [null, Validators.required],
            listas: [null, Validators.required],
            objetivo: [null, Validators.required],
            alcance: [null, Validators.required],
            normas: [null, Validators.required]
        });
    }

    onChangeAuditorApoyo(event) {
        if (
            this.form.value.auditor_principal &&
            event.value.id == this.form.value.auditor_principal.id
        ) {
            this.form.get('auditor_principal').setValue(null);
        }
    }

    onChangeAuditorPrincipal(event) {
        if (
            this.form.value.auditor_apoyo &&
            event.value.id == this.form.value.auditor_apoyo.id
        ) {
            this.form.get('auditor_apoyo').setValue(null);
        }
    }

    onHideDIalog() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            const auditoria: AuditoriaExternaModel = {
                fecha: (this.form.value.fecha as Date).valueOf(),
                id_estado: 1,
                id_auditor_principal: this.form.value.auditor_principal.id,
                id_auditor_apoyo: this.form.value.auditor_apoyo.id,
                activo: true,
                auditado: this.form.value.auditado,
                objetivo: this.form.value.objetivo,
                alcance: this.form.value.alcance,
                normas: this.form.value.normas,
                id_proveedor: this.form.value.proveedor.id
            };

            const idsLista: number[] = (this.form.value.listas as any[]).map(
                e => e.id
            );
            this.display = false;
            this.onCreateAuditoria.emit({ auditoria, idsLista });
        }
    }

    searchProveedor(event) {
        this.onSearchProveedor.emit(event.query);
    }
}
