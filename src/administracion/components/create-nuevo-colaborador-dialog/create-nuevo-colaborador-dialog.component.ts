import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';
import { PaisModel } from '../../../shared/models/pais.model';
import { EpsModel } from '../../../shared/models/eps.model';
import { ArlModel } from '../../../shared/models/arl.model';
import { PensionModel } from '../../../shared/models/pension.model';
import { CesantiaModel } from '../../../shared/models/cesantia.model';
import { CajaCompensacionModel } from '../../../shared/models/caja-compensacion.model';

@Component({
    selector: 'create-nuevo-colaborador-dialog',
    styleUrls: ['create-nuevo-colaborador-dialog.component.scss'],
    template: `
        <div>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <p-dialog 
                    header="Nuevo colaborador" 
                    [(visible)]="display" 
                    [modal]="true" 
                    [responsive]="true" 
                    [width]="800" 
                    [maximizable]="true" 
                    [baseZIndex]="10000">
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Nombres</label>
                            </div>
                            <input type="text" pInputText formControlName="nombre" />
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Apellidos</label>
                            </div>
                            <input type="text" pInputText formControlName="apellido" />
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Usuario</label>
                            </div>
                            <input type="text" pInputText formControlName="usuario" />
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Tipo identificación</label>
                            </div>
                            <p-dropdown 
                                [options]="tiposIdentificacion"
                                [autoWidth]="false"
                                formControlName="tipo_identificacion"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Número identificación</label>
                            </div>
                            <input type="text" pInputText formControlName="numero_identificacion" />
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Email</label>
                            </div>
                            <input type="text" pInputText formControlName="email" />
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-6 ui-fluid">
                            <div>
                                <label>Perfil</label>
                            </div>
                            <p-dropdown 
                                [options]="perfilesActivos"
                                [autoWidth]="false"
                                formControlName="perfil"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-6 ui-fluid">
                            <div>
                                <label>Cargo</label>
                            </div>
                            <p-dropdown 
                                [options]="cargosActivos"
                                [autoWidth]="false"
                                formControlName="cargo"
                                optionLabel="cargo"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Pais</label>
                            </div>
                            <p-dropdown 
                                [options]="paises"
                                [autoWidth]="false"
                                formControlName="pais"
                                optionLabel="nombre"
                                placeholder="Seleccione..."
                                (onChange)="onChangePais()">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Departamento</label>
                            </div>
                            <p-dropdown 
                                [options]="form.value?.pais?.departamentos"
                                [autoWidth]="false"
                                formControlName="departamento"
                                optionLabel="nombre"
                                placeholder="Seleccione..."
                                (onChange)="onChangeDepartamento()">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Ciudad</label>
                            </div>
                            <p-dropdown 
                                [options]="form.value?.departamento?.ciudades"
                                [autoWidth]="false"
                                formControlName="ciudad"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                        
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-3 ui-fluid">
                            <p-checkbox label="Es jefe?" binary="false" [formControl]="form.controls['es_jefe']"></p-checkbox>
                        </div>
                        <div class="ui-g-3 ui-fluid">
                            <p-checkbox label="Es auditor?" binary="false" [formControl]="form.controls['es_auditor']"></p-checkbox>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Teléfono</label>
                            </div>
                            <input type="number" pInputText formControlName="telefono" />
                        </div>
                        <div class="ui-g-8 ui-fluid">
                            <div>
                                <label>Dirección</label>
                            </div>
                            <input type="text" pInputText formControlName="direccion" />
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-8 ui-fluid">
                            <div>
                                <label>Profesión</label>
                            </div>
                            <input type="number" pInputText formControlName="profesion" />
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de ingreso</label>
                            </div>
                            <p-calendar showIcon="true" formControlName="fecha_ingreso"></p-calendar>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>EPS</label>
                            </div>
                            <p-dropdown 
                                [options]="epss"
                                [autoWidth]="false"
                                formControlName="eps"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>ARL</label>
                            </div>
                            <p-dropdown 
                                [options]="arls"
                                [autoWidth]="false"
                                formControlName="arl"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Pensión</label>
                            </div>
                            <p-dropdown 
                                [options]="pensiones"
                                [autoWidth]="false"
                                formControlName="pension"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Cesantias</label>
                            </div>
                            <p-dropdown 
                                [options]="cesantias"
                                [autoWidth]="false"
                                formControlName="cesantia"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Caja compensación</label>
                            </div>
                            <p-dropdown 
                                [options]="cajasCompensacion"
                                [autoWidth]="false"
                                formControlName="caja_compensacion"
                                optionLabel="nombre"
                                placeholder="Seleccione...">
                            </p-dropdown>
                        </div>
                    </div>
                    <pre>{{ form.value | json }}</pre>
                    <p-footer>
                        <button type="button" pButton icon="pi pi-check" (click)="display=false" label="Yes"></button>
                        <button type="button" pButton icon="pi pi-close" (click)="display=false" label="No" class="ui-button-secondary"></button>
                    </p-footer>
                </p-dialog>
            </form>
        </div>
    `
})
export class CreateNuevoColaboradorDialogComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //properties
    @Input() arls: ArlModel[];
    @Input() cajasCompensacion: CajaCompensacionModel[];
    @Input() cargosActivos: CalidadOrganigramaModel[];
    @Input() cesantias: CesantiaModel[];
    @Input() epss: EpsModel[];
    @Input() paises: PaisModel[];
    @Input() pensiones: PensionModel[];
    @Input() perfilesActivos: PerfilModel[];
    @Input() tiposIdentificacion: TipoIdentificacionModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            tipo_identificacion: [null, Validators.required],
            numero_identificacion: [null, Validators.required],
            email: [null, Validators.required],
            perfil: [null, Validators.required],
            cargo: [null, Validators.required],
            usuario: ['', Validators.required],
            es_jefe: [false, Validators.required],
            es_auditor: [false, Validators.required],
            pais: [null, Validators.required],
            departamento: [null, Validators.required],
            ciudad: [null, Validators.required],
            telefono: ['', Validators.required],
            direccion: ['', Validators.required],
            profesion: ['', Validators.required],
            fecha_ingreso: [new Date(), Validators.required],
            eps: [null, Validators.required],
            arl: [null, Validators.required],
            pension: [null, Validators.required],
            cesantia: [null, Validators.required],
            caja_compensacion: [null, Validators.required]
        });
    }

    onChangeDepartamento() {
        this.form.get('ciudad').setValue(null);
    }

    onChangePais() {
        this.form.get('departamento').setValue(null);
        this.form.get('ciudad').setValue(null);
    }
}
