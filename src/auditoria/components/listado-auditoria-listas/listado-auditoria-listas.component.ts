import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuditoriaListaModel } from '../../../shared/models/auditoria-lista.model';

@Component({
    selector: 'listado-auditoria-listas',
    styleUrls: ['listado-auditoria-listas.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <p-table [value]="listas" selectionMode="single" (onRowSelect)="onRowSelect($event)" dataKey="id">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-lista>
                        <tr [pSelectableRow]="lista">
                            <td>{{ lista.nombre }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    `
})
export class ListadoAuditoriaListasComponent {
    //events
    @Output()
    onSelectLista = new EventEmitter<number>();

    //properties
    @Input()
    listas: AuditoriaListaModel[];

    constructor() {}

    onRowSelect(event) {
        this.onSelectLista.emit(event.data.id);
    }
}
