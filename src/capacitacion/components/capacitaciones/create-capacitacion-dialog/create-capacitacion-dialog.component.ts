import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MapaProcesoHijoModel } from "../../../../shared/models/mapa_proceso_hijo.model";
import { CapacitacionModel } from "../../../../shared/models/capacitacion.model";
import { environment } from "../../../../environments/environment";

@Component({
    selector: "create-capacitacion-dialog",
    styleUrls: ["create-capacitacion-dialog.component.scss"],
    template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva capacitación" 
                [(visible)]="display" 
                [width]="900"
                [modal]="true">
            <div class="ui-g">
                <div class="ui-g-6 ui-fluid">
                    <div>
                        <label>Tema:</label>
                    </div>
                        <input type="text" pInputText formControlName="tema" />
                </div>
                <div class="ui-g-6 ui-fluid">
                    <div>
                        <label>Objetivo:</label>
                    </div>
                    <input type="text" pInputText formControlName="objetivo" />
                </div>
            <div class="ui-g-6 ui-fluid">
                <div>
                    <label>Fecha inicio:</label>
                </div>
                <p-calendar showIcon="true" formControlName="fecha_inicio" appendTo="body"></p-calendar>

            </div>
            <div class="ui-g-6 ui-fluid">
                <div>
                    <label>Fecha fin:</label>
                </div>
                <p-calendar showIcon="true" formControlName="fecha_fin" appendTo="body"></p-calendar>

            </div>
            <div class="ui-g-6 ui-fluid">
                <div>
                    <label>Lugar:</label>
                </div>
                    <input type="text" pInputText formControlName="lugar" />
            </div>
            <div class="ui-g-6 ui-fluid">
                <div>
                    <label>Procesos</label>
                </div>
                   <p-multiSelect 
                        [options]="procesos"
                        appendTo="body"
                        [panelStyle]="{minWidth:'12em'}"
                        formControlName="procesos"
                        optionLabel="proceso"
                        defaultLabel="Seleccione múltiples...">
                    </p-multiSelect>
            </div>
            <div class="ui-g-12 ui-fluid">
                <div>
                    <label>Observaciones:</label>
                </div>
                    <textarea rows="5" cols="30"
                        pInputTextArea formControlName="observaciones"
                        style=" width: 100%">
                     </textarea>
            </div>
        </div>
        <p-footer>
            <button type="button" pButton icon="pi pi-times" (click)="display=false; reset()" label="Cancelar" class="ui-button-danger"></button>
            <button type="submit" pButton icon="pi pi-save" label="Crear" class="ui-button-primary" [disabled]="!form.valid"></button>
        </p-footer>
    </p-dialog>
</form>

    `
})
export class CreateCapacitacionDialogComponent implements OnInit {
    //listas modelos
    @Input()
    procesos: MapaProcesoHijoModel[];

    loadedCapacitacion: CapacitacionModel;

    //properties
    @Output()
    onCreateCapacitacion: EventEmitter<CapacitacionModel> = new EventEmitter();
    @Output()
    create = new EventEmitter<CapacitacionModel>();

    //atributos
    display: boolean;
    form: FormGroup;
    formatoFecha = environment.dateFormatAngular;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    show() {
        this.display = true;
    }

    createForm() {
        this.form = this.fb.group({
            tema: ["", Validators.required],
            objetivo: ["", Validators.required],
            fecha_inicio: [new Date(), Validators.required],
            fecha_fin: [new Date(), Validators.required],
            lugar: ["", Validators.required],
            procesos: [null, Validators.required],
            observaciones: ["", Validators.required]
        });
    }
    onSubmit() {
        const capacitacion = {
            tema: this.form.value.tema,
            objetivo: this.form.value.objetivo,
            fecha_inicio: (this.form.value.fecha_inicio as Date).valueOf(),
            fecha_fin: (this.form.value.fecha_fin as Date).valueOf(),
            lugar: this.form.value.lugar,
            observaciones: this.form.value.observaciones,
            procesos: this.form.value.procesos
        };
        this.create.emit(capacitacion);
        this.display = false;
        this.form.reset();
    }
    reset() {
        this.form.reset();
    }
}
