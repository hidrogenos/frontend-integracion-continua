import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "acciones-lista",
    templateUrl: "acciones-lista.html"
})
export class AccionesListaComponent {
    
    @Input()
    data: any[];

    @Input()
    rows: number;

    @Input()
    cantidadTotalAcciones;

    @Output()
    onLazy: EventEmitter<any>;

    constructor() {
        this.onLazy = new EventEmitter();
    }

    loadLazy( event: Event)
    {
        console.log("lazy load");
        this.onLazy.emit( event );
    }
    
}