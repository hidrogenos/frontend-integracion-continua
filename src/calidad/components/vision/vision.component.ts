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
    selector: 'vision',
    styleUrls: ['vision.component.scss'],
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
                            <h1 style="color: #337ab7;">Visión</h1>
                        </div>
                    </div>
                    <div *ngIf="!edit" class="ui-g">
                        <div class="ui-g-12">
                            <div #visionContainer>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="edit" class="ui-g">
                        <div class="ui-g-12">
                            <p-editor [(ngModel)]="vision" [style]="{'height':'320px'}"></p-editor>
                        </div>
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Actualizar" 
                                class="ui-button-primary"
                                (click)="onUpdateVision.emit(vision)">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class VisionComponent implements OnInit, AfterViewInit {
    //atributos
    edit: boolean;
    vision: string;

    //events
    @Output()
    onUpdateVision = new EventEmitter<string>();

    //properties
    @Input()
    loadedCalidad: CalidadModel;

    //viewChild
    @ViewChild('visionContainer')
    visionContainer: ElementRef;
    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.loadVision();
    }

    loadVision() {
        this.vision = this.loadedCalidad.vision;
        this.visionContainer.nativeElement.innerHTML = this.loadedCalidad.vision;
    }

    toggleEdit() {
        this.edit = !this.edit;
        if (!this.edit) {
            setTimeout(() => {
                this.loadVision();
            }, 1);
        }
    }
}
