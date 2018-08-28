import { Component, OnInit, Input } from '@angular/core';
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

    //properties
    @Input()
    auditoria: AuditoriaExternaModel;
    @Input()
    auditores: UsuarioModel[];
    @Input()
    proveedores: ProveedorModel[];

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
}
