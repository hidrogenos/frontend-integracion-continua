import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "edit-accion-preventiva",
    templateUrl: "edit-accion-preventiva.component.html",
    styleUrls: ["edit-accion-preventiva.component.scss"]
})
export class EditAccionPreventivaComponent {
    //atributos
    dateFormatAngular: string = environment.dateFormatAngular;
    dateFormatNormal: string = environment.dateFormatPrimeNg;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_preventivas;
    disabled: boolean;

    //atributos de entrada
    @Input()
    accionPreventiva: AccionPreventivaModel;

    @Input()
    importancias: AccionImportanciaModel[];

    //eventos
    @Output()
    onEditAccionPreventiva: EventEmitter<
        AccionPreventivaModel
        > = new EventEmitter<AccionPreventivaModel>();

    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
        this.disabled = false;
    }

    createForm() {
        this.form = this.fb.group({
            codigo: ["", Validators.required],
            titulo: ["", Validators.required],
            importancia: [null, Validators.required],
            descripcion: ["", Validators.required],
            fecha_compromiso: [null, Validators.required]
        });
    }

    disableComponent() {
        this.form.disable();
        this.disabled = true;
    }

    setDataAccionPreventiva(data: AccionPreventivaModel) {
        this.accionPreventiva = data;
        this.form.setValue({
            codigo: data.codigo,
            titulo: data.titulo,
            importancia: this.importancias.find(
                element => element.id == data.id_importancia
            ),
            descripcion: data.descripcion,
            fecha_compromiso: new Date(data.fecha_compromiso)
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const accionPreventivaActualizada: AccionPreventivaModel = {
                id: this.accionPreventiva.id,
                id_estado: this.accionPreventiva.id_estado,
                codigo: this.form.value.codigo,
                titulo: this.form.value.titulo,
                id_importancia: this.form.value.importancia.id,
                descripcion: this.form.value.descripcion,
                fecha_compromiso: (this.form.value
                    .fecha_compromiso as Date).valueOf()
            };
            this.onEditAccionPreventiva.emit(accionPreventivaActualizada);
        }
    }
}
