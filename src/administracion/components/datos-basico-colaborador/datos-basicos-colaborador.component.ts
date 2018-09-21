import {
    Component,
    OnInit,
    Input,
    ViewChild,
    EventEmitter,
    Output
} from '@angular/core';
import { ArlModel } from '../../../shared/models/arl.model';
import { CajaCompensacionModel } from '../../../shared/models/caja-compensacion.model';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';
import { CesantiaModel } from '../../../shared/models/cesantia.model';
import { EpsModel } from '../../../shared/models/eps.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { PaisModel } from '../../../shared/models/pais.model';
import { PensionModel } from '../../../shared/models/pension.model';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import { ResetContrasenaColaboradorComponent } from '../reset-contrasena-colaborador/reset-contrasena-colaborador.component';
import { StoreModel } from '../../../shared/models/store.model';
import { MessageService, Message } from 'primeng/api';

@Component({
    selector: 'datos-basicos-colaborador',
    styleUrls: ['datos-basicos-colaborador.component.scss'],
    template: `
        <form [formGroup]="formUser" (ngSubmit)="onSubmit()" novalidate>
            <div class="ui-g">
                <div class="ui-g-12"> 
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
                                placeholder="Seleccione..."
                                appendTo="body">
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
                                placeholder="Seleccione..."
                                appendTo="body">
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
                                placeholder="Seleccione..."
                                appendTo="body">
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
                                (onChange)="onChangePais()"
                                appendTo="body">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Departamento</label>
                            </div>
                            <p-dropdown 
                                [options]="formUser.value?.pais?.departamentos"
                                [autoWidth]="false"
                                formControlName="departamento"
                                optionLabel="nombre"
                                placeholder="Seleccione..."
                                (onChange)="onChangeDepartamento()"
                                appendTo="body">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Ciudad</label>
                            </div>
                            <p-dropdown 
                                [options]="formUser.value?.departamento?.ciudades"
                                [autoWidth]="false"
                                formControlName="ciudad"
                                optionLabel="nombre"
                                placeholder="Seleccione..."
                                appendTo="body">
                            </p-dropdown>
                        </div>
                        
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-3 ui-fluid">
                            <p-checkbox label="Es jefe?" binary="false" [formControl]="formUser.controls['es_jefe']"></p-checkbox>
                        </div>
                        <div class="ui-g-3 ui-fluid">
                            <p-checkbox label="Es auditor?" binary="false" [formControl]="formUser.controls['es_auditor']"></p-checkbox>
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
                            <input type="text" pInputText formControlName="profesion" />
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
                                placeholder="Seleccione..."
                                appendTo="body">
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
                                placeholder="Seleccione..."
                                appendTo="body">
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
                                placeholder="Seleccione..."
                                appendTo="body">
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
                                placeholder="Seleccione..."
                                appendTo="body">
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
                                placeholder="Seleccione..."
                                appendTo="body">
                            </p-dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui-g" *ngIf="loadedUsuario">
                <div class="ui-g-12 text-aling-right">
                    <button style="margin-right:10px;" pButton 
                        *ngIf="formUser.disabled && permisoRestablecerContrasena"
                        type="button" 
                        label="Restablecer contraseña" 
                        class="ui-button-warning"
                        (click)="rcc.display = true">
                    </button>
                    <button style="margin-right:10px;" *ngIf="formUser.disabled && permisoEditarDatosBasicos" pButton type="button" label="Editar datos basicos"  (click)="formUser.enable()" class="ui-button-success"></button>
                    <button style="margin-right:10px;" *ngIf="formUser.enabled" pButton type="button" label="Descartar cambios" (click)="loadFormData()" class="ui-button-danger"></button>
                    <button style="margin-right:10px;" *ngIf="formUser.enabled" [disabled]="!formUser.valid" pButton type="submit" label="Actualizar" (click)="messageEdit()" class="ui-button-primary"></button>
                </div>
            </div>
        </form>
            <reset-contrasena-colaborador #rcc
                *ngIf="loadedUsuario"
                [loadedUsuario]="loadedUsuario"
                (onResetPassword)="resetPassword($event)">
            </reset-contrasena-colaborador>
        <!-- <pre>{{ formUser.value | json }}</pre> -->

    `
})
export class DatosBasicosColaboradorComponent implements OnInit {
    //atributos
    displayResetContrasenaDialog: boolean;
    formUser: FormGroup;

    //properties
    @Input() arls: ArlModel[];
    @Input() cajasCompensacion: CajaCompensacionModel[];
    @Input() cargosActivos: CalidadOrganigramaModel[];
    @Input() cesantias: CesantiaModel[];
    @Input() epss: EpsModel[];
    @Input() loadedUsuario: UsuarioModel;
    @Input() paises: PaisModel[];
    @Input() pensiones: PensionModel[];
    @Input() perfilesActivos: PerfilModel[];
    @Input() tiposIdentificacion: TipoIdentificacionModel[];
    @Input() permisoEditarDatosBasicos: boolean;
    @Input() permisoRestablecerContrasena: boolean;

    //eventos
    @Output() onResetPassword = new EventEmitter<any>();
    @Output() onUpdateUsuario = new EventEmitter<UsuarioModel>();

    //viewChild
    @ViewChild('rcc') rcc: ResetContrasenaColaboradorComponent;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
        ) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formUser = this.fb.group({
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
            profesion: [''],
            fecha_ingreso: [new Date(), Validators.required],
            eps: [null, Validators.required],
            arl: [null, Validators.required],
            pension: [null, Validators.required],
            cesantia: [null, Validators.required],
            caja_compensacion: [null, Validators.required]
        });
    }

    loadFormData() {
        const pais = this.paises.find(
            element =>
                element.id == this.loadedUsuario.ciudad.departamento.pais.id
        );

        const departamento = pais.departamentos.find(
            element => element.id == this.loadedUsuario.ciudad.departamento.id
        );

        const ciudad = departamento.ciudades.find(
            element => element.id == this.loadedUsuario.id_ciudad
        );

        this.formUser.setValue({
            nombre: this.loadedUsuario.nombre,
            apellido: this.loadedUsuario.apellido,
            tipo_identificacion: this.tiposIdentificacion.find(
                element =>
                    element.id == this.loadedUsuario.id_tipo_identificacion
            ),
            numero_identificacion: this.loadedUsuario.identificacion,
            email: this.loadedUsuario.email,
            perfil: this.perfilesActivos.find(
                element => element.id == this.loadedUsuario.id_perfil
            ),
            cargo: this.cargosActivos.find(
                element => element.id == this.loadedUsuario.id_cargo
            ),
            usuario: this.loadedUsuario.login,
            es_jefe: this.loadedUsuario.es_jefe,
            es_auditor: this.loadedUsuario.es_auditor,
            pais: pais,
            departamento: departamento,
            ciudad: ciudad,
            telefono: this.loadedUsuario.telefono,
            direccion: this.loadedUsuario.direccion,
            profesion: this.loadedUsuario.profesion,
            fecha_ingreso: new Date(this.loadedUsuario.fecha_ingreso),
            eps: this.epss.find(
                element => element.id == this.loadedUsuario.id_eps
            ),
            arl: this.arls.find(
                element => element.id == this.loadedUsuario.id_arl
            ),
            pension: this.pensiones.find(
                element => element.id == this.loadedUsuario.id_pension
            ),
            cesantia: this.cesantias.find(
                element => element.id == this.loadedUsuario.id_cesantia
            ),
            caja_compensacion: this.cajasCompensacion.find(
                element => element.id == this.loadedUsuario.id_caja_compensacion
            )
        });

        setTimeout(() => {
            this.formUser.disable();
        }, 1);
    }

    onChangeDepartamento() {
        this.formUser.get('ciudad').setValue(null);
    }

    onChangePais() {
        this.formUser.get('departamento').setValue(null);
        this.formUser.get('ciudad').setValue(null);
    }

    messageEdit() {
        this.messageService.add({severity:'success', summary:'Actualización exitosa', detail:'Datos básicos actualizados'});
    }

    onSubmit() {
        if (this.formUser.valid) {
            const usuario: UsuarioModel = {
                nombre: this.formUser.value.nombre,
                apellido: this.formUser.value.apellido,
                id_tipo_identificacion: this.formUser.value.tipo_identificacion
                    .id,
                identificacion: this.formUser.value.numero_identificacion,
                email: this.formUser.value.email,
                login: this.formUser.value.usuario,
                id_perfil: this.formUser.value.perfil.id,
                activo: true,
                id_cargo: this.formUser.value.cargo.id,
                es_jefe: this.formUser.value.es_jefe,
                es_auditor: this.formUser.value.es_auditor,
                fecha_ingreso: (this.formUser.value
                    .fecha_ingreso as Date).valueOf(),
                id_ciudad: this.formUser.value.ciudad.id,
                telefono: this.formUser.value.telefono,
                direccion: this.formUser.value.direccion,
                profesion: this.formUser.value.profesion,
                id_eps: this.formUser.value.eps.id,
                id_arl: this.formUser.value.arl.id,
                id_pension: this.formUser.value.pension.id,
                id_cesantia: this.formUser.value.cesantia.id,
                id_caja_compensacion: this.formUser.value.caja_compensacion.id
            };
            this.onUpdateUsuario.emit(usuario);
        }
    }

    resetPassword(data) {
        this.onResetPassword.emit(data);
    }
}
