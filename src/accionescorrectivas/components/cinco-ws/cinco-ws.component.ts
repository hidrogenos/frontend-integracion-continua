import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { AccionCorrectivaAnalisisHijo5wsModel } from "../../../shared/models/accion-correctiva-analisis-hijo-5ws";
import { Column } from "primeng/primeng";

@Component({
    selector: "cinco-ws",
    styleUrls: ["cinco-ws.component.scss"],
    template: `
        <div class="ui-g">
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                    <div class="ui-g-3" *ngFor="let pq of form.get('pqs').controls; let i=index">
                        <div style="text-align: center; margin-bottom:10px">
                            <button icon="pi pi-trash"
                                pButton
                                class="ui-button-danger"
                                *ngIf="form.get('pqs').length > 1 && !disabled"
                                (click)="removePq(i)"
                                label="Eliminar por qué">
                            </button>
                        </div>
                    
                        <p-table [value]="pq.get('filas').controls" >
                            <ng-template pTemplate="header">
                                <tr>
                                    <th colspan="2">Por qué {{i + 1}}</th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-fila>
                                <tr>
                                    <td>{{ fila.value.label }}</td>
                                    <td>
                                        <input style="width: 100%;"  type="text" pInputText [formControl]="fila.get('value')"/>
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                <div class="ui-g-12 text-aling-right">
                        <button
                            pButton
                            icon="pi pi-plus"
                            class="ui-button-success"
                            *ngIf="form.get('pqs').length < 5 && !disabled"
                            (click)="addPq()"
                            label="Agregar por qué">
                        </button>
                        <button *ngIf="!disabled" pButton type="submit" class="ui-button" icon="pi pi-save" [disabled]="!this.form.valid" label="Guardar cambios" style="margin-left: 10px"></button>
                </div>
            </form>
        </div>
    `
})
export class CincoWsComponent implements OnInit {
    //atributos

    form: FormGroup;
    disabled: boolean;

    constructor(private fb: FormBuilder) {}

    @Output()
    onSave5ws: EventEmitter<
        AccionCorrectivaAnalisisHijo5wsModel[]
    > = new EventEmitter<AccionCorrectivaAnalisisHijo5wsModel[]>();

    ngOnInit() {
        this.createForm();
        this.disabled = false;
    }

    addPq() {
        const pqs = this.form.get("pqs") as FormArray;
        pqs.push(this.createFormPq());
    }

    removePq(index: number) {
        const pqs = this.form.get("pqs") as FormArray;
        pqs.removeAt(index);
    }

    createForm() {
        this.form = this.fb.group({
            pqs: this.fb.array([this.createFormPq(), this.createFormPq()])
        });
        this.disabled = false;
    }

    clearForm() {
        this.form.setControl("pqs", this.fb.array([]));
    }

    setValue(data: AccionCorrectivaAnalisisHijo5wsModel[]) {
        // this.form.setValue({ pqs: this.fb.array([]) });
        this.clearForm();
        let nuevoForm = this.form.get("pqs") as FormArray;

        data.forEach(element => {
            let groupTest = this.fb.group({
                filas: this.fb.array([
                    this.fb.group({
                        label: "Quién",
                        value: this.fb.control(
                            element.quien,
                            Validators.required
                        )
                    }),
                    this.fb.group({
                        label: "Qué",
                        value: this.fb.control(element.que, Validators.required)
                    }),
                    this.fb.group({
                        label: "Cuándo",
                        value: this.fb.control(
                            element.cuando,
                            Validators.required
                        )
                    }),
                    this.fb.group({
                        label: "Dónde",
                        value: this.fb.control(
                            element.donde,
                            Validators.required
                        )
                    }),
                    this.fb.group({
                        label: "Cómo ocurre",
                        value: this.fb.control(
                            element.como_ocurre,
                            Validators.required
                        )
                    }),
                    this.fb.group({
                        label: "Cómo resolverlo",
                        value: this.fb.control(
                            element.como_resolverlo,
                            Validators.required
                        )
                    })
                ])
            });
            nuevoForm.push(groupTest);
        });
        //const formArray: FormArray = this.fb.array([...formGroup]);
    }

    createFormPq() {
        return this.fb.group({
            filas: this.fb.array([
                this.fb.group({
                    label: "Quién",
                    value: this.fb.control("", Validators.required)
                }),
                this.fb.group({
                    label: "Qué",
                    value: this.fb.control("", Validators.required)
                }),
                this.fb.group({
                    label: "Cuándo",
                    value: this.fb.control("", Validators.required)
                }),
                this.fb.group({
                    label: "Dónde",
                    value: this.fb.control("", Validators.required)
                }),
                this.fb.group({
                    label: "Cómo ocurre",
                    value: this.fb.control("", Validators.required)
                }),
                this.fb.group({
                    label: "Cómo resolverlo",
                    value: this.fb.control("", Validators.required)
                })
            ])
        });
    }

    disableComponent() {
        this.form.disable();
        this.disabled = true;
    }

    onSubmit() {
        const pqsGuardados = this.form.value.pqs;
        let porques: AccionCorrectivaAnalisisHijo5wsModel[] = [];
        pqsGuardados.forEach(columna => {
            let porque: AccionCorrectivaAnalisisHijo5wsModel = {
                quien: columna.filas["0"].value,
                que: columna.filas["1"].value,
                cuando: columna.filas["2"].value,
                donde: columna.filas["3"].value,
                como_ocurre: columna.filas["4"].value,
                como_resolverlo: columna.filas["5"].value
            };
            porques.push(porque);
        });

        this.onSave5ws.emit(porques);
    }
}
