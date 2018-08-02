import { Component, Input } from '@angular/core';

@Component({
    selector: "acciones-estados-lista",
    templateUrl: "acciones-estados-lista.component.html"
})
export class AccionesEstadosListaComponent {
    
    @Input()
    data: any[];

    @Input()
    rowsOnPage: number;

    @Input() 
    filters: any[];

    @Input()
    rows: number;
}