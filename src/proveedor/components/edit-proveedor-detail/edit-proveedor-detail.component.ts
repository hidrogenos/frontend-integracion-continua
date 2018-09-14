import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { TipoCuentaModel } from '../../../shared/models/TipoCuenta.model';
import { BancoModel } from '../../../shared/models/banco.model';
import { RegimenModel } from '../../../shared/models/regimen.model';
import { CiudadModel } from '../../../shared/models/ciudad.model';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';

@Component({
    selector: 'edit-proveedor-detail',
    template: `
                        <form [formGroup]="detailProveedor" (ngSubmit)="onSubmit()" novalidate>
                            <h2>Datos básicos</h2>
                            <div class="ui-g">
                                <div class="ui-g-8 ui-fluid">
                                    <div>
                                        <label>Nombre:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="nombre" />
                                </div>
                                <div class="ui-g-4 ui-fluid">
                                    <div>
                                        <label>Identificación/NIT:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="identificacion_nit" />
                                </div>
                            </div>
                            <div class="ui-g">
                                    <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Ciudad:</label>
                                    </div>
                                    <p-dropdown 
                                        [options]="ciudades" 
                                        formControlName="id_ciudad" 
                                        optionLabel="nombre" 
                                        placeholder="Seleccione una ciudad"
                                        appendTo="body"
                                        [autoWidth]="false"></p-dropdown>
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                        <div>
                                            <label>Fecha de ingreso:</label>
                                        </div>
                                    <p-calendar appendTo="body" showIcon="true" formControlName="fecha_inicio"></p-calendar>
                                </div>
                            </div>
                            <div class="ui-g">
                                <div class="ui-g-12 ui-fluid">
                                    <div>
                                        <label>Dirección:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="direccion" />
                                </div>
                                
                            </div>
                            <div class="ui-g">
                            <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Teléfono 1:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="tel1" />
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Teléfono 2:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="tel2" />
                                </div>
                                
                            </div>
                            <h2>Contactos</h2>
                            <div class="ui-g">
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Contacto 1:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="contacto1" />
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Email Contacto 1:</label>
                                    </div>
                                    <input type="email" pInputText formControlName="email_contacto1" />
                                </div>
                            </div>
                            <div class="ui-g">
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Contacto 2:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="contacto2" />
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Email contacto 2:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="email_contacto2" />
                                </div>
                            </div>
                            <h2>Datos representante legal</h2>
                            <div class="ui-g">
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Nombre representante legal:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="representante_legal" />
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                        <div>
                                            <label>Tipo de identificación:</label>
                                        </div>
                                        <p-dropdown 
                                            [options]="identificacion" 
                                            formControlName="id_tipo_identificacion_representante_legal" 
                                            optionLabel="nombre" 
                                            placeholder="Seleccione un tipo de Identificación"
                                            appendTo="body"
                                            [autoWidth]="false"></p-dropdown>
                                    </div>
                            </div>
                            <div class="ui-g">
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Número de identificación:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="identificacion_representante_legal" />
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Email representante:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="email_representante_legal" />
                                </div>
                            </div>
                            <h2>Infromación legal</h2>
                            <div class="ui-g">
                                    <div class="ui-g-6 ui-fluid">
                                        <div>
                                            <label>Web:</label>
                                        </div>
                                        <input type="text" pInputText formControlName="web" />
                    
                                    </div>
                                    <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Régimen:</label>
                                    </div>
                                    <p-dropdown 
                                        [options]="regimen" 
                                        formControlName="id_regimen" 
                                        optionLabel="nombre" 
                                        placeholder="Seleccione un Régimen"
                                        appendTo="body"
                                        [autoWidth]="false"></p-dropdown>
                                </div>
                            </div>
                            <div class="ui-g">
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Producto/Servicio:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="producto_servicio" />
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Actividad:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="actividad" />
                                </div>
                            </div>
                            <div class="ui-g">
                                <div class="ui-g-3 ui-fluid">
                                    <div>
                                        <label>Autorretenedor:</label>
                                    </div>
                                    <p-checkbox binary="false" [formControl]="detailProveedor.controls['autoretenedor']"></p-checkbox>
                                    </div>
                                <div class="ui-g-3 ui-fluid">
                                    <div>
                                        <label>Gran contribuyente:</label>
                                    </div>
                                    <p-checkbox binary="false" [formControl]="detailProveedor.controls['grancontrib']"></p-checkbox>
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Banco:</label>
                                    </div>
                                    <p-dropdown 
                                        [options]="banco" 
                                        formControlName="id_banco" 
                                        optionLabel="nombre" 
                                        placeholder="Seleccione un Banco"
                                        appendTo="body"
                                        [autoWidth]="false"></p-dropdown>
                                </div>
                            </div>
                            <div class="ui-g">
                                    
                                    <div class="ui-g-4 ui-fluid">
                                    <div>
                                        <label>Tipo de cuenta:</label>
                                    </div>
                                    <p-dropdown 
                                        [options]="tipoCuenta" 
                                        formControlName="tipo_cuenta" 
                                        optionLabel="nombre" 
                                        placeholder="Seleccione un Tipo de Cuenta"
                                        appendTo="body"
                                        [autoWidth]="false"></p-dropdown>
                                </div>
                                <div class="ui-g-8 ui-fluid">
                                    <div>
                                        <label>Número de cuenta:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="cuenta" />
                                </div>
                            </div>
                                <div class="ui-g">
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Moneda:</label>
                                    </div>
                                    <input type="text" pInputText formControlName="moneda" />
                                </div>
                                <div class="ui-g-6 ui-fluid">
                                    <div>
                                        <label>Calificación:</label>
                                    </div>
                                    <input type="number" pInputText formControlName="calificacion" />
                                </div>
                            </div>
                            <div class="ui-g">
                            <div class="ui-g-12 text-aling-right">
                                <button style="margin-right:10px;" *ngIf="detailProveedor.disabled && permisoEditar" pButton type="button" label="Editar datos" (click)="detailProveedor.enable()" class="ui-button-success"></button>
                                <button style="margin-right:10px;" *ngIf="detailProveedor.enabled" pButton type="button" label="Descartar cambios" (click)="loadFormData(proveedor)" class="ui-button-danger"></button>
                                <button style="margin-right:10px;" *ngIf="detailProveedor.enabled" pButton type="submit" label="Actualizar"  class="ui-button-primary"></button>
                                </div>
                            </div>
                    </form>
                    <!--<pre>{{ detailProveedor.value | json }}</pre>-->
    `
})

export class EditProveedorDetalComponent implements OnInit {

    //atributos
    display:boolean;
    detailProveedor: FormGroup;
    proveedor: ProveedorModel;
    
    //events
    @Output() editProveedor = new EventEmitter<ProveedorModel>();
    @Input() identificacion: TipoIdentificacionModel[];
    @Input() ciudades: CiudadModel[];
    @Input() regimen: RegimenModel[];
    @Input() banco: BancoModel[];
    @Input() tipoCuenta: TipoCuentaModel[];
    @Input() permisoEditar: boolean; 
    

    //properties
    constructor(private fb: FormBuilder) {}

    ngOnInit(){ 
        this.createForm();
    }
    
    createForm() {
        this.detailProveedor = this.fb.group({
        id: [''],
        nombre:['', Validators.required],
        identificacion_nit:['', Validators.required],
        fecha_inicio: [new Date(),Validators.required],
        id_ciudad: ['', Validators.required],
        direccion:['',Validators.required],
        tel1:['',Validators.required],
        tel2:['',Validators.required],
        contacto1: ['', Validators.required],
        email_contacto1: ['', Validators.required],
        contacto2: ['',Validators.required],
        email_contacto2: ['',Validators.required],
        representante_legal: ['',Validators.required],
        id_tipo_identificacion_representante_legal: ['',Validators.required],
        identificacion_representante_legal: ['',Validators.required],
        email_representante_legal: ['',Validators.required],
        web: ['',Validators.required],
        id_regimen: ['',Validators.required],
        producto_servicio: ['',Validators.required],
        actividad: ['',Validators.required],
        autoretenedor: ['',Validators.required],
        grancontrib: ['',Validators.required],
        id_banco: ['',Validators.required],
        tipo_cuenta: ['',Validators.required],
        cuenta: ['',Validators.required],
        moneda: ['',Validators.required],
        calificacion: ['',Validators.required],
        });
    }

    loadFormData( proveedor : ProveedorModel){
        this.proveedor=proveedor;
        this.detailProveedor.setValue({
            id: this.proveedor.id,
            nombre: this.proveedor.nombre,
            identificacion_nit: this.proveedor.identificacion_nit,
            fecha_inicio: new Date(this.proveedor.fecha_inicio),
            direccion: this.proveedor.direccion,
            id_ciudad: this.ciudades.find(element => element.id == this.proveedor.id_ciudad),
            tel1: this.proveedor.tel1,
            tel2: this.proveedor.tel2,
            contacto1: this.proveedor.contacto1,
            email_contacto1: this.proveedor.email_contacto1,
            contacto2: this.proveedor.contacto2,
            email_contacto2: this.proveedor.email_contacto2,
            web: this.proveedor.web,
            calificacion: this.proveedor.calificacion,
            producto_servicio: this.proveedor.producto_servicio,
            representante_legal: this.proveedor.representante_legal,
            id_tipo_identificacion_representante_legal: this.identificacion.find(element => element.id == this.proveedor.id_tipo_identificacion_representante_legal),
            identificacion_representante_legal: this.proveedor.identificacion_representante_legal,
            email_representante_legal: this.proveedor.email_representante_legal,
            id_regimen: this.regimen.find(element => element.id == this.proveedor.id_regimen),
            grancontrib: this.proveedor.grancontrib == 'Si' ? true : false,
            autoretenedor: this.proveedor.autoretenedor == 'Si' ? true : false,
            actividad: this.proveedor.actividad,
            id_banco: this.banco.find(element => element.id == this.proveedor.id_banco),
            tipo_cuenta: this.tipoCuenta.find(element => element.nombre == this.proveedor.tipo_cuenta),
            cuenta: this.proveedor.cuenta,
            moneda: this.proveedor.moneda,
        });
            setTimeout(() => {
                this.detailProveedor.disable();
            }, 1);
    }

    onSubmit() {
        
        const proveedor:  ProveedorModel= {
            id: this.detailProveedor.value.id,
            nombre:this.detailProveedor.value.nombre,
            identificacion_nit:this.detailProveedor.value.identificacion_nit,
            fecha_inicio:(this.detailProveedor.value.fecha_inicio as Date).valueOf(),
            direccion: this.detailProveedor.value.direccion,
            id_ciudad: this.detailProveedor.value.id_ciudad.id,
            tel1: this.detailProveedor.value.tel1,
            tel2: this.detailProveedor.value.tel2,
            contacto1: this.detailProveedor.value.contacto1,
            email_contacto1: this.detailProveedor.value.email_contacto1,
            contacto2: this.detailProveedor.value.contacto2,
            email_contacto2: this.detailProveedor.value.email_contacto2,
            web: this.detailProveedor.value.web,
            calificacion: this.detailProveedor.value.calificacion,
            producto_servicio: this.detailProveedor.value.producto_servicio,
            representante_legal: this.detailProveedor.value.representante_legal,
            id_tipo_identificacion_representante_legal: this.detailProveedor.value.id_tipo_identificacion_representante_legal.id,
            identificacion_representante_legal: this.detailProveedor.value.identificacion_representante_legal,
            email_representante_legal: this.detailProveedor.value.email_representante_legal,
            id_regimen: this.detailProveedor.value.id_regimen.id,
            grancontrib: this.detailProveedor.value.grancontrib,
            autoretenedor: this.detailProveedor.value.autoretenedor,
            actividad: this.detailProveedor.value.actividad,
            id_banco: this.detailProveedor.value.id_banco.id,
            tipo_cuenta: this.detailProveedor.value.tipo_cuenta.nombre,
            cuenta: this.detailProveedor.value.cuenta,
            moneda: this.detailProveedor.value.moneda,
            activo: true,
        };
        this.editProveedor.emit(proveedor);
    }
}
