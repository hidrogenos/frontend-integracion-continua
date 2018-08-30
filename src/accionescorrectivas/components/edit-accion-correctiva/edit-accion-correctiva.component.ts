import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccionCorrectivaModel } from '../../../shared/models/accion-correctiva.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionImportanciaModel } from '../../../shared/models/accion-importancia.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'edit-accion-correctiva',
    templateUrl: 'edit-accion-correctiva.component.html',
    styleUrls: ['edit-accion-correctiva.component.scss']
})
export class EditAccionCorrectivaComponent {
    //atributos
    dateFormatAngular: string = environment.dateFormatAngular;
    dateFormatNormal: string = environment.dateFormatPrimeNg;
    disabled: boolean;

    //atributos de entrada
    @Input()
    accionCorrectiva: AccionCorrectivaModel;

    @Input()
    importancias: AccionImportanciaModel[];

    //eventos
    @Output()
    onEditAccionCorrectiva: EventEmitter<
        AccionCorrectivaModel
    > = new EventEmitter<AccionCorrectivaModel>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
        this.disabled = false;
    }

    createForm() {
        this.form = this.fb.group({
            codigo: ['', Validators.required],
            titulo: ['', Validators.required],
            importancia: [null, Validators.required],
            descripcion: ['', Validators.required],
            fecha_compromiso: [null, Validators.required]
        });
    }

    disableComponent() {
        this.form.disable();
        this.disabled = true;
    }

    setDataAccionCorrectiva(data: AccionCorrectivaModel) {
        this.accionCorrectiva = data;
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
            const accionCorrectivaActualizada: AccionCorrectivaModel = {
                id: this.accionCorrectiva.id,
                id_estado: this.accionCorrectiva.id_estado,
                codigo: this.form.value.codigo,
                titulo: this.form.value.titulo,
                id_importancia: this.form.value.importancia.id,
                descripcion: this.form.value.descripcion,
                fecha_compromiso: (this.form.value
                    .fecha_compromiso as Date).valueOf()
            };
            this.onEditAccionCorrectiva.emit(accionCorrectivaActualizada);
        }
    }
}
