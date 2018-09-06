import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "create-accion-correctiva-dialog",
    templateUrl: "create-accion-correctiva-dialog.component.html",
    styleUrls: ["create-accion-correctiva.component.scss"]
})
export class CreateAccionCorrectivaDialogComponent implements OnInit {
    //formulario
    display: boolean;
    form: FormGroup;

    //atributos
    dateFormatNormal: string = environment.dateFormatPrimeNg;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_correctivas;
    fechaMinimaCalendario = new Date();


    @Output()
    onCreateAccionCorrectiva: EventEmitter<
        AccionCorrectivaModel
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
            importancia: [null, Validators.required],
            fecha_compromiso: [null, Validators.required],
            descripcion: ["", Validators.required]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const accionCorrectiva: AccionCorrectivaModel = {
                codigo: this.form.value.codigo,
                titulo: this.form.value.titulo,
                descripcion: this.form.value.descripcion,
                id_estado: 1,
                id_importancia: this.form.value.importancia.id,
                procesos: this.form.value.proceso,
                fecha_compromiso: (this.form.value
                    .fecha_compromiso as Date).valueOf()
            };
            this.onCreateAccionCorrectiva.emit(accionCorrectiva);
        }
    }

    onHideCreateAccionCorrectiva() {
        this.createForm();
    }
}
