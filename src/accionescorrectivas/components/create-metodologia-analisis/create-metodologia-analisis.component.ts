import { Component,  OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';;
import { AccionAnalisisTipoModel } from '../../../shared/models/accionAnalisisTipo.model';
import { AccionCorrectivaAnalisisModel } from '../../../shared/models/accion-correctiva-analisis.model';
import { AccionCorrectivaAnalisisHijoModel } from '../../../shared/models/accion-correctiva-analisis-hijo.model';

@Component({
   selector: 'create-metodologia-analisis',
   templateUrl: 'create-metodologia-analisis.component.html'
})
export class CreateMetodologiaAnalisisComponent   implements OnInit{

    form: FormGroup;
    ideasForm: FormGroup;
    
    // datos foraneos
    @Input()
    metodologiaActual: AccionCorrectivaAnalisisModel

    @Input()
    metodologias: AccionAnalisisTipoModel[];

    @Input()
    causas: AccionCorrectivaAnalisisHijoModel[];

    @Input()
    stepsItems: any[];


    // datos propios
    ideas: FormArray;
    
    // métodos.

    @Output()
    onCreateAccionAnalisis: EventEmitter<AccionAnalisisTipoModel> = new EventEmitter<AccionAnalisisTipoModel>();

    @Output()
    onCreateAccionAnalisisHijos: EventEmitter<AccionCorrectivaAnalisisHijoModel[]> = new EventEmitter<AccionCorrectivaAnalisisHijoModel[]>();

    @Output()
    onCreateOnlyAccionAnalisisHijo: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    onUpdateAccionAnalisisHijo: EventEmitter<any> = new EventEmitter<any>();
    
    
    // hijos
    @ViewChild('steps')
    stepComponent

    constructor(private fb: FormBuilder){
    }

    ngOnInit(){
        this.createFormulario();
    }
   
    // acciones sobre los items del componente
    createFormulario(){
        this.form = this.fb.group({
            metodologia: [null, Validators.required],
        })
    }

    createFormularioAnalisisHijos( data: AccionCorrectivaAnalisisHijoModel[]){
        const formGroupData : FormGroup[] = data.map(datoActual => this.fb.group(datoActual));
        this.ideas = this.fb.array( formGroupData);
        this.ideasForm = this.fb.group({
            ideas: this.ideas
        });
    }

    // acciones visuales no funcionales


    createArrayItem(): FormGroup {
        return this.fb.group({
            id: null,
            id_padre: 0,
            padre: null,
            id_accion_correctiva_analisis: this.metodologiaActual.id,
            pregunta_causa_idea: null,
            respuestas: null,
            contribuyo: null
          });
    }

    updateItem(){
        this.ideas = this.ideasForm.get('ideas') as FormArray;
    }

    addItem(): void {
        this.ideas = this.ideasForm.get('ideas') as FormArray;
        let nuevoActual = this.createArrayItem();
        this.ideas.push(nuevoActual);
    }

    deleteItem(index): void {
        this.ideas = this.ideasForm.get('ideas') as FormArray;
        this.ideas.removeAt(index);
    }

    setItems(data: AccionCorrectivaAnalisisHijoModel[]){
        this.ideas = this.ideasForm.get('ideas') as FormArray;
        const arrayData: FormGroup[] = data.map(actual => {
                const formGroup: FormGroup = this.fb.group({actual});
                return formGroup;
            });
        this.ideas.setValue(arrayData);
    }

    //acciones con guardado funcional
    saveItemEsquemaPescado(index: number): void {
        this.ideas = this.ideasForm.get('ideas') as FormArray;
        let hijoActual: AccionCorrectivaAnalisisHijoModel = this.ideas.at(index).value;
        this.onCreateOnlyAccionAnalisisHijo.emit({index:index,hijo:hijoActual});
    } 

    editItemEsquemaPescado(index): void {
        this.ideas = this.ideasForm.get('ideas') as FormArray;
        let hijoActual: AccionCorrectivaAnalisisHijoModel = this.ideas.at(index).value;
        this.onUpdateAccionAnalisisHijo.emit(hijoActual);
    }
    
    //acciones con eventos
    onSubmit(){
        this.onCreateAccionAnalisis.emit(this.form.value.metodologia);
    }

    onSubmitSaveHijo(){
        this.onCreateAccionAnalisisHijos.emit(this.ideasForm.value.ideas);
    }


} 