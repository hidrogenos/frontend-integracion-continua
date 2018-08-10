import {
    Component,
    Output,
    EventEmitter,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnInit
} from '@angular/core';
import { CalidadModel } from '../../../shared/models/calidad.model';

@Component({
    selector: 'valores',
    styleUrls: ['valores.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <div style="text-align: right; color: #337ab7;">
                        <i 
                            *ngIf="!edit"
                            style="cursor: pointer;" 
                            class="fa fa-w fa-pencil" 
                            aria-hidden="true"
                            (click)="toggleEdit()">
                        </i>
                        <i 
                            *ngIf="edit"
                            style="cursor: pointer;" 
                            class="fa fa-check" 
                            aria-hidden="true"
                            (click)="toggleEdit()">
                        </i>
                    </div>
                    <div>
                    <div class="ui-g">
                        <div class="ui-g-12" style="text-align: center;">
                            <h1 style="color: #337ab7;">Valores</h1>
                        </div>
                    </div>
                    <div *ngIf="!edit" class="ui-g">
                        <div class="ui-g-12">
                            <div #valoresContainer>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="edit" class="ui-g">
                        <div class="ui-g-12">
                            <p-editor [(ngModel)]="valores" [style]="{'height':'320px'}"></p-editor>
                        </div>
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Actualizar" 
                                class="ui-button-primary"
                                (click)="onUpdateValores.emit(valores)">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class ValoresComponent implements OnInit, AfterViewInit {
    //atributos
    edit: boolean;
    valores: string;

    //events
    @Output()
    onUpdateValores = new EventEmitter<string>();

    //properties
    @Input()
    loadedCalidad: CalidadModel;

    //viewChild
    @ViewChild('valoresContainer')
    valoresContainer: ElementRef;
    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.loadValores();
    }

    loadValores() {
        this.valores = this.loadedCalidad.valores;
        this.valoresContainer.nativeElement.innerHTML = this.loadedCalidad.valores;
    }

    toggleEdit() {
        this.edit = !this.edit;
        if (!this.edit) {
            setTimeout(() => {
                this.loadValores();
            }, 1);
        }
    }
}
