import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { ProveedorModel } from "../../../shared/models/proveedor.model";
import { TipoIdentificacionModel } from "../../../shared/models/tipo-identificacion.model";
import { CiudadModel } from "../../../shared/models/ciudad.model";
import { RegimenModel } from "../../../shared/models/regimen.model";
import { BancoModel } from "../../../shared/models/banco.model";
import { TipoCuentaModel } from "../../../shared/models/TipoCuenta.model";
import { CiudadService, RegimenService, BancoService, TipoIdentificacionService, TipoCuentaService } from "../../../shared/services";

@Component({
    selector: 'create-proveedor-dialog',
    styleUrls: ['create-proveedor-dialog.component.scss'],
    template:`
            <form [formGroup]="newProveedor" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nuevo Proveedor" 
                [(visible)]="display" 
                [width]="800"
                [modal]="true">
                <h2>Datos Básicos</h2>
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
                        <p-calendar showIcon="true" formControlName="fecha_inicio"></p-calendar>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Direccion:</label>
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
                            <label>Email Contacto 2:</label>
                        </div>
                        <input type="text" pInputText formControlName="email_contacto2" />
                    </div>
                </div>
                <h2>Datos Representante Legal</h2>
                <div class="ui-g">
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Nombre Representante Legal:</label>
                        </div>
                        <input type="text" pInputText formControlName="representante_legal" />
                    </div>
                    <div class="ui-g-6 ui-fluid">
                            <div>
                                <label>Tipo de Identificación:</label>
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
                            <label>Número de Identificacion:</label>
                        </div>
                        <input type="text" pInputText formControlName="identificacion_representante_legal" />
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Email Representante:</label>
                        </div>
                        <input type="text" pInputText formControlName="email_representante_legal" />
                    </div>
                </div>
                <h2>Infromación Legal</h2>
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
                        <p-checkbox  binary="false" [formControl]="newProveedor.controls['autoretenedor']"></p-checkbox>
                        </div>
                    <div class="ui-g-3 ui-fluid">
                        <div>
                            <label>Gran Contribuyente:</label>
                        </div>
                        <p-checkbox  binary="false" [formControl]="newProveedor.controls['grancontrib']"></p-checkbox>
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
                            <label>Tipo de Cuenta:</label>
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
                            <label>Número de Cuenta:</label>
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
                <p-footer>
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newProveedor.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newProveedor.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateProveedorDialogComponent {

    //atributos
    display:boolean;
    newProveedor: FormGroup;
    msgs: Message[] = [];

    //events
    @Output() create = new EventEmitter<ProveedorModel>();
    @Input() identificacion: TipoIdentificacionModel[];
    @Input() ciudades: CiudadModel[];
    @Input() regimen: RegimenModel[];
    @Input() banco: BancoModel[];
    @Input() tipoCuenta: TipoCuentaModel[];

    //properties
    constructor(
        private fb: FormBuilder,
        private ciudadService: CiudadService,
        private regimenService: RegimenService,
        private bancosService: BancoService,
        private tipoIdentificacionservice: TipoIdentificacionService,
        private tipoCuentaService: TipoCuentaService
    ) { }
    
    ngOnInit(){ 
        this.createForm();
        this.getBancos();
        this.getCiudades();
        this.getRegimen();
        this.getTipoCuentas();
        this.getTiposIdentificacion();
    }

    createForm() {

        this.newProveedor = this.fb.group({
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
        autoretenedor: [false,Validators.required],
        grancontrib: [false, Validators.required],
        id_banco: ['',Validators.required],
        tipo_cuenta: ['',Validators.required],
        cuenta: ['',Validators.required],
        moneda: ['',Validators.required],
        calificacion: ['',Validators.required],
        activo: true,
        
        });
    }
    
    getTiposIdentificacion(){
         this.tipoIdentificacionservice.getTiposIdentificacion().subscribe(response => {
             this.identificacion = response;
        })
    }

    getBancos(){
         this.bancosService.getBancos().subscribe(response => {
             this.banco = response;
        })
    }

    getCiudades(){
         this.ciudadService.getCiudades().subscribe(response => {
             this.ciudades = response;
        })
    }

    getRegimen(){
        this.regimenService.getRegimen().subscribe(response => {
            this.regimen = response;
        })
    }

    getTipoCuentas(){
         this.tipoCuentaService.getTiposCuentas().subscribe(response => {
             this.tipoCuenta = response;
        })
    }

    onSubmit() {
        this.display = false;
        const proveedor:  ProveedorModel= {
            nombre:this.newProveedor.value.nombre,
            identificacion_nit:this.newProveedor.value.identificacion_nit,
            fecha_inicio:(this.newProveedor.value.fecha_inicio as Date).valueOf() / 1000,
            direccion: this.newProveedor.value.direccion,
            id_ciudad: this.newProveedor.value.id_ciudad.id,
            tel1: this.newProveedor.value.tel1,
            tel2: this.newProveedor.value.tel2,
            contacto1: this.newProveedor.value.contacto1,
            email_contacto1: this.newProveedor.value.email_contacto1,
            contacto2: this.newProveedor.value.contacto2,
            email_contacto2: this.newProveedor.value.email_contacto2,
            web: this.newProveedor.value.web,
            calificacion: this.newProveedor.value.calificacion,
            producto_servicio: this.newProveedor.value.producto_servicio,
            representante_legal: this.newProveedor.value.representante_legal,
            id_tipo_identificacion_representante_legal: this.newProveedor.value.id_tipo_identificacion_representante_legal.id,
            identificacion_representante_legal: this.newProveedor.value.identificacion_representante_legal,
            email_representante_legal: this.newProveedor.value.email_representante_legal,
            id_regimen: this.newProveedor.value.id_regimen.id,
            grancontrib: this.newProveedor.value.grancontrib,
            autoretenedor: this.newProveedor.value.autoretenedor,
            actividad: this.newProveedor.value.actividad,
            id_banco: this.newProveedor.value.id_banco.id,
            tipo_cuenta: this.newProveedor.value.tipo_cuenta.nombre,
            cuenta: this.newProveedor.value.cuenta,
            moneda: this.newProveedor.value.moneda,
            activo: true,
        };
        this.newProveedor.reset();
        this.create.emit(proveedor);
    }
    
    show() {
        this.display = true;
    }
}