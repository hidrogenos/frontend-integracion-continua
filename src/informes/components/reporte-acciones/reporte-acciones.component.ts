import { Component, EventEmitter, Output } from "@angular/core";


@Component({
    selector: 'reportes-acciones',
    template: `
        <button pButton class="ui-button ui-button-success" 
        label="descargar reporte desviación" (click)="exportarReporteDesviacion()"></button>
    `
})
export class ReporteAccionesComponent {

    @Output()
    onExportarReporteDesviacion = new EventEmitter();

    constructor() { }

    exportarReporteDesviacion() {
        this.onExportarReporteDesviacion.emit();
    }
}