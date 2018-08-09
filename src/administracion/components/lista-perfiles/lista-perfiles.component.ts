import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PerfilModel } from '../../../shared/models/perfil.model';

@Component({
    selector: 'lista-perfiles',
    styleUrls: ['lista-perfiles.component.scss'],
    template: `
        <div>
            <p-table #dt
                [value]="perfiles"
                [paginator]="true" 
                [rows]="15"
                sortField="nombre" 
                selectionMode="single"
                (onRowSelect)="onRowSelect($event)">
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="nombre">
                            Perfiles
                            <p-sortIcon field="nombre"></p-sortIcon>
                        </th>
                    </tr>
                    <tr>
                        <th class="ui-fluid">
                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData  let-perfil>
                    <tr [pSelectableRow]="rowData">
                        <td> {{ perfil.nombre }} </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class ListaPerfilesComponent {
    //properties
    @Input() perfiles: PerfilModel[];

    //events
    @Output() onSelectPerfil = new EventEmitter<PerfilModel>();

    constructor() {}

    onRowSelect(event) {
        const selectedPerfil: PerfilModel = event.data;
        this.onSelectPerfil.emit(selectedPerfil);
        console.log(selectedPerfil);
    }
}
