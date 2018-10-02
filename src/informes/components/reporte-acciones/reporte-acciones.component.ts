import { Component, EventEmitter, Output } from "@angular/core";


@Component({
    selector: 'reportes-acciones',
    template: `
        <button pButton class="ui-button ui-button-success" 
        label="descargar informe lista de chequeo" (click)="exportarInformeListaChequeo()"></button>
    `
})
export class ReporteAccionesComponent {

    @Output()
    onExportInformeListaChequeoPDF = new EventEmitter();

    constructor() { }

    exportarInformeListaChequeo() {
        this.onExportInformeListaChequeoPDF.emit();
    }
}