import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AccionModel } from "../../../shared/models/accion.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "edit-accion-correctiva",
    templateUrl: "edit-accion-correctiva.component.html",
    styleUrls: ["edit-accion-correctiva.component.scss"]

})
export class EditAccionCorrectivaComponent {

    //atributos
    dateFormatAngular: string = environment.dateFormatAngular;
    
    @Input()
    private accionCorrectiva: AccionModel;

    @Input()
    private importancias: AccionImportanciaModel[];

    @Output()
    onEditAccionCorrectiva: EventEmitter<AccionModel> = new EventEmitter<AccionModel>();

    form: FormGroup;

    constructor(private fb: FormBuilder){
    }

    ngOnInit(){
        this.createForm();
    }

    

    createForm() {
        this.form = this.fb.group({
            codigo: ['', Validators.required],
            titulo: ['', Validators.required],
            importancia: [null, Validators.required],
            descripcion: ['', Validators.required]
        });
     }

    setDataAccionCorrectiva( data:AccionModel) {
        this.accionCorrectiva = data;
        this.form.setValue({
            codigo: data.codigo,
            titulo: data.titulo,
            importancia: this.importancias.find(element => element.id == data.id_importancia) ,
            descripcion: data.descripcion
        });
    }

    onSubmit() {
        const accionCorrectivaActualizada: AccionModel = {
            id: this.accionCorrectiva.id,
            id_estado: this.accionCorrectiva.id_estado,
            codigo: this.form.value.codigo,
            titulo: this.form.value.titulo,
            id_importancia: this.form.value.importancia.id,
            descripcion: this.form.value.descripcion,
        };
            
         this.onEditAccionCorrectiva.emit(accionCorrectivaActualizada);  
    }

    
}