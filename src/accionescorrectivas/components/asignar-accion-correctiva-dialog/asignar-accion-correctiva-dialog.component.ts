import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";

@Component({
    selector: 'asignar-accion-correctiva-dialog',
    templateUrl: 'asignar-accion-correctiva-dialog.component.html'
})
export class AsignarAccionCorrectivaComponent implements OnInit {

    form: FormGroup;

    @Input()
    accionCorrectivaActual;

    @Input()
    usuarios: UsuarioModel[];

    @Input()
    display: boolean;

    @Output()
    onAsignarAccionCorrectiva: EventEmitter<AccionCorrectivaModel> = new EventEmitter<AccionCorrectivaModel>();

    constructor(private fb:FormBuilder){    
    }

    ngOnInit(){
        this.form = this.fb.group(
            {
                responsable: ['',Validators.required],
              //  observacion: ['',Validators.required]
            }
        );
    }

    onHide(){
        this.display = false;
    }

    asignarAccionCorrectiva(){
        const accionCorrectivaActual: AccionCorrectivaModel = {
            ...this.accionCorrectivaActual,
           id_responsable: this.form.value.responsable.id
        }
        this.onAsignarAccionCorrectiva.emit(accionCorrectivaActual);
    }
}