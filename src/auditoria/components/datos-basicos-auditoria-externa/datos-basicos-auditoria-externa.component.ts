import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'datos-basicos-auditoria-externa',
    styleUrls: ['datos-basicos-auditoria-externa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <form [formGroup]="form" novalidate>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha</label>
                            </div>
                            <p-calendar  dateFormat="yy/mm/dd"  [locale]="es" formControlName="fecha"></p-calendar>
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
                            <p-editor  [style]="{'height':'100px'}" formControlName="objetivo" [readonly]="readonlyEditors">
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
                            <p-editor  [style]="{'height':'100px'}" formControlName="alcance" [readonly]="readonlyEditors">
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
                            <p-editor  [style]="{'height':'100px'}" formControlName="normas" [readonly]="readonlyEditors">
                                <p-header>
                                    <span class="ql-formats">
                                        Normas
                                    </span>
                                </p-header>
                            </p-editor>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right" *ngIf="readonlyEditors">
                            <button pButton 
                                [disabled]="auditoria?.id_estado == env?.estados_auditoria.finalizacion || auditoria?.id_estado == env?.estados_auditoria.pre_finalizacion || auditoria?.id_estado == env?.estados_auditoria.fin_preguntas "
                                (click)="toogleEdit()"
                                type="button" 
                                label="Editar datos basicos" 
                                class="ui-button-primary">
                            </button>
                        </div>
                        <div class="ui-g-12 text-aling-right" *ngIf="!readonlyEditors">
                            <button pButton 
                                style="margin-right: 10px;"
                                (click)="toogleEdit()"
                                type="button" 
                                label="Descartar cambios" 
                                class="ui-button-danger">
                            </button>
                            <button pButton 
                                (click)="updateDatosBasicosAuditoria()"
                                type="button" 
                                label="Actualizar" 
                                class="ui-button-success"
                                [disabled]="!form.valid">
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
})
export class DatosBasicosAuditoriaExternaComponent implements OnInit {
    //atributos
    form: FormGroup;
    filteredProveedores: ProveedorModel[];
    readonlyEditors: boolean;
    env = environment;
    es: any;
    //events
    @Output()
    onSearchProveedor = new EventEmitter<string>();
    @Output()
    onUpdateDatosBasicos = new EventEmitter<AuditoriaExternaModel>();

    //properties
    @Input()
    auditoria: AuditoriaExternaModel;
    @Input()
    auditores: UsuarioModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
        this.es = environment.dateProperties.calendarProperties;
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
        setTimeout(() => {
            this.form.disable();
        }, 1);
        this.readonlyEditors = true;
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

    searchProveedor(event) {
        this.onSearchProveedor.emit(event.query);
    }

    toogleEdit() {
        if (this.readonlyEditors) {
            this.form.enable();
            this.readonlyEditors = false;
        } else {
            this.createForm();
        }
    }

    updateDatosBasicosAuditoria() {
        if (this.form.valid) {
            const auditoria: AuditoriaExternaModel = {
                activo: true,
                alcance: this.form.value.alcance,
                auditado: this.form.value.auditado,
                id_auditor_apoyo: this.form.value.auditor_apoyo.id,
                id_auditor_principal: this.form.value.auditor_principal.id,
                id_estado: this.auditoria.id_estado,
                fecha: (this.form.value.fecha as Date).valueOf(),
                id_proveedor: this.form.value.proveedor.id,
                normas: this.form.value.normas,
                objetivo: this.form.value.objetivo
            };

            this.onUpdateDatosBasicos.emit(auditoria);

            console.log(auditoria);
        }
    }
}
