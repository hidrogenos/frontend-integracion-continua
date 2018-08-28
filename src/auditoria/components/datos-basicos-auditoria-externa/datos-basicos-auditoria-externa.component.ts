import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

@Component({
    selector: 'datos-basicos-auditoria-externa',
    styleUrls: ['datos-basicos-auditoria-externa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
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
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-editor  [style]="{'height':'100px'}" formControlName="objetivo">
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
                            <p-editor  [style]="{'height':'100px'}" formControlName="alcance">
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
                            <p-editor  [style]="{'height':'100px'}" formControlName="normas">
                                <p-header>
                                    <span class="ql-formats">
                                        Normas
                                    </span>
                                </p-header>
                            </p-editor>
                        </div>
                    </div>
                </form>
                <pre>
                    {{ form.value | json}}
                </pre>
            </div>
        </div>
    `
})
export class DatosBasicosAuditoriaExternaComponent implements OnInit {
    //atributos
    form: FormGroup;
    filteredProveedores: ProveedorModel[];

    //events
    @Output()
    onSearchProveedor = new EventEmitter<string>();

    //properties
    @Input()
    auditoria: AuditoriaExternaModel;
    @Input()
    auditores: UsuarioModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: [this.auditoria.id, Validators.required],
            fecha: [new Date(this.auditoria.fecha), Validators.required],
            proveedor: [this.auditoria.proveedor, Validators.required],
            auditor_principal: [
                this.auditores.find(
                    e => e.id == this.auditoria.id_auditor_principal
                ),
                Validators.required
            ],
            auditor_apoyo: [
                this.auditores.find(
                    e => e.id == this.auditoria.id_auditor_apoyo
                ),
                Validators.required
            ],
            auditado: [this.auditoria.auditado, Validators.required],
            objetivo: [this.auditoria.objetivo, Validators.required],
            alcance: [this.auditoria.alcance, Validators.required],
            normas: [this.auditoria.normas, Validators.required]
        });
    }

    searchProveedor(event) {
        this.onSearchProveedor.emit(event.query);
    }
}
