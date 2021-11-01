import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "create-accion-preventiva-dialog",
    templateUrl: "create-accion-preventiva-dialog.component.html",
    styleUrls: ["create-accion-preventiva-dialog.component.scss"]
})
export class CreateAccionPreventivaDialogComponent implements OnInit {
    //formulario
    display: boolean;
    form: FormGroup;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_preventivas;

    //atributos
    dateFormatNormal: string = environment.dateFormatPrimeNg;
    fechaMinimaCalendario = new Date();

    @Output()
    onCreateAccionPreventiva: EventEmitter<
        AccionPreventivaModel
        > = new EventEmitter();

    //listas modelos
    @Input()
    procesos: AccionProcesoModel[];

    @Input()
    importancias: AccionImportanciaModel[];

    //selected procesos
    selectedProcesos: AccionProcesoModel[];

    constructor(private fb: FormBuilder) {
        this.display = false;
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            codigo: ["", Validators.required],
            titulo: ["", Validators.required],
            proceso: [null],
            importancia: [{id: 1}],
            fecha_compromiso: [null, Validators.required],
            descripcion: ["", Validators.required]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const accionPreventiva: AccionPreventivaModel = {
                codigo: this.form.value.codigo,
                titulo: this.form.value.titulo,
                descripcion: this.form.value.descripcion,
                id_estado: 1,
                id_importancia: this.form.value.importancia.id,
                procesos: this.form.value.proceso,
                fecha_compromiso: (this.form.value
                    .fecha_compromiso as Date).valueOf()
            };
            this.onCreateAccionPreventiva.emit(accionPreventiva);
        }
    }

    onHideCreateAccionPreventiva() {
        this.createForm();
    }
}
