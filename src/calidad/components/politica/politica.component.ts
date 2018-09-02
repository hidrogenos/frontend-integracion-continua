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
    selector: 'politica',
    styleUrls: ['politica.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <div style="text-align: right; color: #337ab7;" *ngIf="permisoEditarPolitica">
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
                            <h1 style="color: #337ab7;">Política</h1>
                        </div>
                    </div>
                    <div *ngIf="!edit" class="ui-g">
                        <div class="ui-g-12">
                            <div #politicaContainer>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="edit" class="ui-g">
                        <div class="ui-g-12">
                            <p-editor [(ngModel)]="politica" [style]="{'height':'320px'}"></p-editor>
                        </div>
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Actualizar" 
                                class="ui-button-primary"
                                (click)="onUpdatePolitica.emit(politica)">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class PoliticaComponent implements OnInit, AfterViewInit {
    //atributos
    edit: boolean;
    politica: string;

    //events
    @Output()
    onUpdatePolitica = new EventEmitter<string>();

    //properties
    @Input()
    loadedCalidad: CalidadModel;
    @Input()
    permisoEditarPolitica: boolean;

    //viewChild
    @ViewChild('politicaContainer')
    politicaContainer: ElementRef;
    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.loadPolitica();
    }

    loadPolitica() {
        this.politica = this.loadedCalidad.politica;
        this.politicaContainer.nativeElement.innerHTML = this.loadedCalidad.politica;
    }

    toggleEdit() {
        this.edit = !this.edit;
        if (!this.edit) {
            setTimeout(() => {
                this.loadPolitica();
            }, 1);
        }
    }
}
