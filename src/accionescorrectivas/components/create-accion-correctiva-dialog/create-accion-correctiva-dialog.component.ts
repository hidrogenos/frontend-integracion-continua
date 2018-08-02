import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccionProcesoModel } from '../../../shared/models/accion-proceso.model';
import { AccionImportanciaModel } from '../../../shared/models/accion-importancia.model';
import { AccionModel } from '../../../shared/models/accion.model';

@Component({
    selector: "create-accion-correctiva-dialog",
    templateUrl: "create-accion-correctiva-dialog.component.html",
    styleUrls: ["create-accion-correctiva.component.scss"]
})
export class CreateAccionCorrectivaDialogComponent implements OnInit {

    //formulario
    display: boolean;
    form: FormGroup;
    
    @Output()
    onCreateAccionCorrectiva: EventEmitter<AccionModel> = new EventEmitter();

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

     ngOnInit(){
        this.createForm();
     }

     createForm() {
        this.form = this.fb.group({
            codigo: ['', Validators.required],
            titulo: ['', Validators.required],
            proceso: [null],
            importancia: [null, Validators.required],
            descripcion: ['', Validators.required]
        });
     }

     onSubmit() {
        if(this.form.valid){
            const accionCorrectiva: AccionModel = {
                codigo : this.form.value.codigo,
                titulo: this.form.value.titulo,
                descripcion: this.form.value.descripcion,
                id_estado : 1,
                id_importancia: this.form.value.importancia.id,
                id_usuario_crea: 1,
                procesos: this.selectedProcesos
            };
            this.onCreateAccionCorrectiva.emit(accionCorrectiva);
        }
     }

     onHideCreateAccionCorrectiva() {
        this.createForm();
     }

}