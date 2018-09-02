import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Output,
    EventEmitter
} from '@angular/core';
import { CalidadModel } from '../../../shared/models/calidad.model';

@Component({
    selector: 'mision',
    styleUrls: ['mision.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <div style="text-align: right; color: #337ab7;" *ngIf="permisoEditarMision">
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
                            <h1 style="color: #337ab7;">Misión</h1>
                        </div>
                    </div>
                    <div *ngIf="!edit" class="ui-g">
                        <div class="ui-g-12">
                            <div #misionContainer>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="edit" class="ui-g">
                        <div class="ui-g-12">
                            <p-editor [(ngModel)]="mision" [style]="{'height':'320px'}"></p-editor>
                        </div>
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Actualizar" 
                                class="ui-button-primary"
                                (click)="onUpdateMision.emit(mision)">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class MisionComponent implements OnInit, AfterViewInit {
    //atributos
    edit: boolean;
    mision: string;

    //events
    @Output()
    onUpdateMision = new EventEmitter<string>();
    @Input()
    permisoEditarMision: boolean;

    //properties
    @Input()
    loadedCalidad: CalidadModel;

    //viewChild
    @ViewChild('misionContainer')
    misionCOntainer: ElementRef;
    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.loadMision();
    }

    loadMision() {
        this.mision = this.loadedCalidad.mision;
        this.misionCOntainer.nativeElement.innerHTML = this.loadedCalidad.mision;
    }

    toggleEdit() {
        this.edit = !this.edit;
        if (!this.edit) {
            setTimeout(() => {
                this.loadMision();
            }, 1);
        }
    }
}
