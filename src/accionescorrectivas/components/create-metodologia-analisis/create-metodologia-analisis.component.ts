import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ViewChild
} from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { AccionAnalisisTipoModel } from "../../../shared/models/accion-analisis-tipo.model";
import { AccionCorrectivaAnalisisModel } from "../../../shared/models/accion-correctiva-analisis.model";
import { AccionCorrectivaAnalisisHijoModel } from "../../../shared/models/accion-correctiva-analisis-hijo.model";
import { AccionCorrectivaAnalisisHijo5wsModel } from "../../../shared/models/accion-correctiva-analisis-hijo-5ws";
import { CincoWsComponent } from "../cinco-ws/cinco-ws.component";

@Component({
    selector: "create-metodologia-analisis",
    templateUrl: "create-metodologia-analisis.component.html"
})
export class CreateMetodologiaAnalisisComponent implements OnInit {
    form: FormGroup;
    ideasForm: FormGroup;

    // datos foraneos
    @Input()
    metodologiaActual: AccionCorrectivaAnalisisModel;

    @Input()
    metodologias: AccionAnalisisTipoModel[];

    @Input()
    causas: AccionCorrectivaAnalisisHijoModel[];

    @Input()
    stepsItems: any[];

    // datos propios
    ideas: FormArray;
    disabled: boolean;

    // hijos
    @ViewChild("cincows")
    CincoWsComponent: CincoWsComponent;

    // métodos.

    @Output()
    onCreateAccionAnalisis: EventEmitter<
        AccionAnalisisTipoModel
    > = new EventEmitter<AccionAnalisisTipoModel>();

    @Output()
    onCreateAccionAnalisisHijos: EventEmitter<
        AccionCorrectivaAnalisisHijoModel[]
    > = new EventEmitter<AccionCorrectivaAnalisisHijoModel[]>();

    @Output()
    onCreateAccionAnalisisHijos5ws: EventEmitter<
        AccionCorrectivaAnalisisHijo5wsModel[]
    > = new EventEmitter<AccionCorrectivaAnalisisHijo5wsModel[]>();

    @Output()
    onCreateOnlyAccionAnalisisHijo: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onUpdateAccionAnalisisHijo: EventEmitter<any> = new EventEmitter<any>();

    // hijos
    @ViewChild("steps")
    stepComponent;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createFormulario();
        this.disabled = false;
    }

    // acciones sobre los items del componente
    createFormulario() {
        this.form = this.fb.group({
            metodologia: [null, Validators.required]
        });
        this.ideasForm = this.fb.group({
            ideas: [null, Validators.required]
        });
    }

    createFormularioAnalisisHijos(data: AccionCorrectivaAnalisisHijoModel[]) {
        const formGroupData: FormGroup[] = data.map(datoActual =>
            this.fb.group(datoActual)
        );
        this.ideas = this.fb.array(formGroupData);
        this.ideasForm = this.fb.group({
            ideas: this.ideas
        });
    }

    // acciones visuales no funcionales

    createArrayItem(): FormGroup {
        let item: AccionCorrectivaAnalisisHijoModel = {
            id: null,
            id_padre: 0,
            id_usuario: null,
            padre: null,
            id_accion_correctiva_analisis: this.metodologiaActual.id,
            pregunta_causa_idea: null,
            fecha_creacion: null,
            respuestas: null,
            contribuyo: null,
            created_at: null,
            updated_at: null
        };
        return this.fb.group(item);
    }

    updateItem() {
        this.ideas = this.ideasForm.get("ideas") as FormArray;
    }

    addItem(): void {
        this.ideas = this.ideasForm.get("ideas") as FormArray;
        let nuevoActual = this.createArrayItem();
        this.ideas.push(nuevoActual);
    }

    editItem(index): void {
        this.ideas.at(index).enable();
    }

    lockItems(bloquear: boolean): void {
        if (bloquear) {
            this.ideas.disable();
        } else {
            this.ideas.enable();
        }
    }

    deleteItem(index): void {
        this.ideas = this.ideasForm.get("ideas") as FormArray;
        this.ideas.removeAt(index);
    }

    setItems(data: AccionCorrectivaAnalisisHijoModel[]) {
        this.ideas = this.ideasForm.get("ideas") as FormArray;
        const arrayData: FormGroup[] = data.map(actual => {
            const formGroup: FormGroup = this.fb.group({ actual });
            return formGroup;
        });
        this.ideas.setValue(arrayData);
    }

    //acciones con guardado funcional
    saveItemAccionAnalisisHijo(index: number): void {
        this.ideas = this.ideasForm.get("ideas") as FormArray;
        let hijoActual: AccionCorrectivaAnalisisHijoModel = this.ideas.at(index)
            .value;
        this.onCreateOnlyAccionAnalisisHijo.emit({
            index: index,
            hijo: hijoActual
        });
    }

    editItemAccionAnalisisHijo(index: number): void {
        this.ideas = this.ideasForm.get("ideas") as FormArray;
        let hijoActual: AccionCorrectivaAnalisisHijoModel = this.ideas.at(index)
            .value;
        this.onUpdateAccionAnalisisHijo.emit({
            index: index,
            hijo: hijoActual
        });
    }

    onCreateAccionAnalisisHijo5(event: AccionCorrectivaAnalisisHijo5wsModel[]) {
        this.onCreateAccionAnalisisHijos5ws.emit(event);
    }

    //acciones con eventos
    onSubmit() {
        this.onCreateAccionAnalisis.emit(this.form.value.metodologia);
    }

    onSubmitSaveHijo() {
        this.onCreateAccionAnalisisHijos.emit(this.ideasForm.value.ideas);
    }

    mirar(event) {
        console.log(event);
    }

    disableComponent() {
        this.form.disable();
        if (this.CincoWsComponent) {
            this.CincoWsComponent.disableComponent();
        }
        this.disabled = true;
    }
}
