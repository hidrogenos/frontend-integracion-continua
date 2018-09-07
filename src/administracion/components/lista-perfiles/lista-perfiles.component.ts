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
                        <th style="width: 80px;">
                            Editar
                        </th>
                    </tr>
                    <tr>
                        <th class="ui-fluid">
                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                        </th>
                        <th>

                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData  let-perfil>
                    <tr [pSelectableRow]="rowData">
                        <td> {{ perfil.nombre }} </td>
                        <td style="text-align: center;">
                            <button style="margin-right:10px;" pButton 
                                *ngIf="permisoEditarPerfil"
                                type="button" 
                                icon="fa fa-pencil" 
                                class="ui-button-primary"
                                (click)="onEditPerfil.emit(perfil)">
                            </button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class ListaPerfilesComponent {
    //properties
    @Input()
    perfiles: PerfilModel[];
    @Input()
    permisoEditarPerfil: boolean;

    //events
    @Output()
    onEditPerfil = new EventEmitter<PerfilModel>();
    @Output()
    onSelectPerfil = new EventEmitter<PerfilModel>();

    constructor() {}

    onRowSelect(event) {
        const selectedPerfil: PerfilModel = event.data;
        this.onSelectPerfil.emit(selectedPerfil);
    }
}
