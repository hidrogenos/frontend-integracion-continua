import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: "acciones-lista",
    templateUrl: "acciones-lista.component.html",
    styleUrls: ["acciones-lista.component.scss"]
})
export class AccionesListaComponent {

    //atributos
    dateFormatAngular: string = environment.dateFormatAngular;
    
    @Input()
    data: any[];

    @Input()
    rows: number;

    @Input()
    loading: boolean;

    @Input()
    cantidadTotalAcciones;

    @Output()
    onLazy: EventEmitter<any>;

    @Input()
    cols: any[]

    constructor() {
        this.onLazy = new EventEmitter();
    }

    loadLazy( event: Event)
    {
        this.onLazy.emit( event );
    }
    
}