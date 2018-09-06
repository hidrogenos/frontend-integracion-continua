import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { CalidadMapaProcesoModel } from "../../../shared/models/calidad-mapa-proceso.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";

@Component({
    selector: "create-proceso-dialog",
    styleUrls: ["create-proceso-dialog.component.scss"],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Crear nuevo proceso" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateProcesos()">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div style="margin-bottom: 5px;">
                            <label>Tipo de proceso</label>
                        </div>
                        <p-radioButton   
                            name="tipo-proceso" 
                            label="Proceso princial" 
                            value="1" 
                            formControlName="tipo_proceso"
                            (onClick)="onSelectProcesoPrincipal()">
                        </p-radioButton>
                        <p-radioButton  
                            [style]="{'margin-left': '10px'}" 
                            name="tipo-proceso" 
                            label="Sub proceso" 
                            value="2" 
                            formControlName="tipo_proceso"
                            (onClick)="onSelectSubProceso()">
                        </p-radioButton>
                    </div>
                </div>
                <div class="ui-g" *ngIf="form?.value?.tipo_proceso == 2">
                    <div class="ui-g-12 ui-fluid">
                        <div style="margin-bottom: 5px;">
                            <label>Dirección flechas</label>
                        </div>
                        <p-radioButton   
                            name="direccion-flechas" 
                            label="Izquierda" 
                            value="izq" 
                            formControlName="flecha">
                        </p-radioButton>
                        <p-radioButton  
                            [style]="{'margin-left': '10px'}" 
                            name="direccion-flechas" 
                            label="Derecha" 
                            value="der" 
                            formControlName="flecha">
                        </p-radioButton>
                        <p-radioButton  
                            [style]="{'margin-left': '10px'}" 
                            name="direccion-flechas" 
                            label="Ambas" 
                            value="dos" 
                            formControlName="flecha">
                        </p-radioButton>
                        <p-radioButton  
                            [style]="{'margin-left': '10px'}" 
                            name="direccion-flechas" 
                            label="N/A" 
                            value="NA" 
                            formControlName="flecha">
                        </p-radioButton>
                    </div>
                </div>
                <div class="ui-g" *ngIf="form?.value?.tipo_proceso == 2">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Proceso pricipal</label>
                        </div>
                        <p-dropdown 
                            [options]="procesosPrincipales"  
                            optionLabel="proceso" 
                            formControlName="padre"
                            placeholder="Seleccione..."
                            appendTo="body"
                            filter="true">
                        </p-dropdown>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Proceso</label>
                        </div>
                        <input type="text" pInputText formControlName="proceso" />
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-6">
                        <div>
                            <label>Jefe a cargo</label>
                        </div>
                        <p-dropdown [options]="jefes"  
                                    optionLabel="nombre" 
                                    formControlName="jefe"
                                    placeholder="Seleccione..."
                                    appendTo="body"
                                    filter="true"
                                    [style]="{'width':'100%'}">
                                    <ng-template let-item pTemplate="selectedItem"> 
                                        <span style="vertical-align:middle">{{item.value.nombre}}  {{item.value.apellido}}</span>
                                    </ng-template> 
                                    <ng-template let-data pTemplate="item"> 
                                        <span style="vertical-align:middle">{{data.value.nombre}}  {{data.value.apellido}}</span>
                                    </ng-template>
                        </p-dropdown>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Descripción</label>
                        </div>
                        <p-editor  [style]="{'height':'320px'}" formControlName="descripcion">
                            <p-header>
                            </p-header>
                        </p-editor>
                    </div>
                </div>
                <p-footer>
                    <button *ngIf="this.form.value.id && permisoEliminarProceso"
                            style="margin-right:10px;" pButton 
                            type="button" 
                            label="Eliminar" 
                            class="ui-button-warning"
                            (click)="deleteProceso()">
                    </button>
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            label="Cancelar" 
                            class="ui-button-danger"
                            (click)="display = false">
                        </button>
                        <button *ngIf="!form?.value?.id" style="margin-right:10px;" pButton 
                            type="submit" 
                            label="Crear" 
                            class="ui-button-primary"
                            [disabled]="!form.valid">
                        </button>
                        <button *ngIf="form?.value?.id && permisoEditarProceso" style="margin-right:10px;" pButton 
                            type="submit" 
                            label="Actualizar" 
                            class="ui-button-primary"
                            [disabled]="!form.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
})
export class CreateProcesoDialogComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output()
    onCreateProceso = new EventEmitter<MapaProcesoHijoModel>();
    @Output()
    onUpdateProceso = new EventEmitter<MapaProcesoHijoModel>();
    @Output()
    onDeleteProceso = new EventEmitter<number>();

    //properties
    @Input()
    mapa: CalidadMapaProcesoModel;
    @Input()
    jefes: UsuarioModel[];
    @Input()
    permisoEditarProceso: boolean;
    @Input()
    permisoEliminarProceso: boolean;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: null,
            tipo_proceso: [1, Validators.required],
            padre: [{ id: 0 }, Validators.required],
            flecha: ["NA", Validators.required],
            proceso: ["", Validators.required],
            jefe: [null, Validators.required],
            descripcion: ["", Validators.required]
        });
    }

    editProceso(proceso: MapaProcesoHijoModel) {
        this.form.setValue({
            id: proceso.id,
            tipo_proceso: proceso.id_padre == 0 ? 1 : 2,
            padre:
                proceso.id_padre == 0
                    ? { id: 0 }
                    : this.mapa.procesos
                        .filter(proceso => proceso.id_padre == 0)
                        .find(e => e.id == proceso.id_padre),
            flecha: proceso.flecha,
            descripcion: proceso.descripcion,
            proceso: proceso.proceso,
            jefe: this.jefes.find(jefeAct => jefeAct.id == proceso.id_jefe)
        });
        this.display = true;
    }

    get procesosPrincipales() {
        return this.mapa.procesos.filter(proceso => proceso.id_padre == 0);
    }

    onHideCreateProcesos() {
        this.createForm();
    }

    onSelectProcesoPrincipal() {
        this.form.get("padre").setValue({ id: 0 });
        this.form.get("flecha").setValue("NA");
    }

    onSelectSubProceso() {
        this.form.get("padre").setValue(null);
        this.form.get("flecha").setValue("NA");
    }

    deleteProceso() {
        if (this.form.value.id) {
            const idMapaProceso = this.form.value.id;
            this.onDeleteProceso.emit(idMapaProceso);
        }
        this.display = false;
    }

    onSubmit() {
        if (this.form.valid) {
            if (this.form.value.id == null) {
                const proceso: MapaProcesoHijoModel = {
                    id_padre: this.form.value.padre.id,
                    id_mapa_procesos: this.mapa.id,
                    activo: true,
                    descripcion: this.form.value.descripcion,
                    proceso: this.form.value.proceso,
                    flecha: this.form.value.flecha,
                    id_jefe: this.form.value.jefe.id
                };

                this.onCreateProceso.emit(proceso);
            } else {
                const proceso: MapaProcesoHijoModel = {
                    id: this.form.value.id,
                    id_padre: this.form.value.padre.id,
                    id_mapa_procesos: this.mapa.id,
                    activo: true,
                    descripcion: this.form.value.descripcion,
                    proceso: this.form.value.proceso,
                    flecha: this.form.value.flecha,
                    id_jefe: this.form.value.jefe.id
                };

                if (
                    this.validarProcesoSinSubProcesos(proceso) &&
                    this.validarIncesto(proceso)
                ) {
                    this.onUpdateProceso.emit(proceso);
                }
            }
        }
        this.display = false;
    }

    validarProcesoSinSubProcesos(proceso: MapaProcesoHijoModel) {
        if (
            proceso.id_padre != 0 &&
            this.mapa.procesos.filter(e => e.id_padre == proceso.id).length > 0
        ) {
            alert(
                "No es posible actualizar el proceso, ya que posee subprocesos. Reasigne los subprocesos o eliminelos previamente."
            );
            return false;
        } else {
            return true;
        }
    }

    validarIncesto(proceso: MapaProcesoHijoModel) {
        if (proceso.id == proceso.id_padre) {
            alert("No es posible asignar un subproceso a si mismo");
            return false;
        } else {
            return true;
        }
    }
}
