import {
    Component,
    Input,
    OnInit,
    AfterViewInit,
    Output,
    EventEmitter
} from "@angular/core";
import { ModuloModel } from "../../../shared/models/modulo.model";
import { PerfilModel } from "../../../shared/models/perfil.model";
import { PermisoModel } from "../../../shared/models/permiso.model";

@Component({
    selector: "lista-permisos",
    styleUrls: ["lista-permisos.component.scss"],
    template: `
        <div>
            <p-table #dt
                [value]="permisos"
                dataKey="modulo">
                <ng-template pTemplate="header">
                    <tr>
                        <th>
                            Permisos
                        </th>
                        <th style="width: 70px;" rowspan="2">
                            Estado
                        </th>
                    </tr>
                    <tr>
                        <th class="ui-fluid">
                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-rowIndex="rowIndex" let-expanded="true">
                    <tr class="ui-widget-header" *ngIf="rowGroupMetadata[rowData.modulo].index === rowIndex">
                        <td colspan="2">
                            <a href="#" [pRowToggler]="rowData">
                                <i [ngClass]="expanded ? 'fa fa-fw fa-chevron-circle-down' : 'fa fa-fw fa-chevron-circle-right'"></i>
                                <span>{{rowData.modulo}}</span>
                            </a>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="rowexpansion" let-rowData let-rowIndex="rowIndex">
                    <tr>
                        <td>{{rowData.nombre}}</td>
                        <td style="text-align: center;">
                            <p-checkbox 
                                *ngIf="permisoSeleccionarPermiso"
                                binary="true" 
                                name="groupname" 
                                [(ngModel)]="rowData.check"
                                [disabled]="!selectedPerfil"
                                (onChange)="changePermiso($event, rowData.id)">
                            </p-checkbox>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class ListaPermisosComponent implements OnInit {
    //atributos
    permisos: any[];
    rowGroupMetadata: any;

    //events
    @Output()
    onAddPermiso = new EventEmitter<number>();
    @Output()
    onRemovePermiso = new EventEmitter<number>();

    //properties
    @Input()
    modulos: ModuloModel[];
    @Input()
    selectedPerfil: PerfilModel;
    @Input()
    permisoSeleccionarPermiso: boolean;

    constructor() {}

    ngOnInit() {}

    changePermiso(event: boolean, idPermiso: number) {
        if (event) {
            this.onAddPermiso.emit(idPermiso);
        } else {
            this.onRemovePermiso.emit(idPermiso);
        }
    }

    loadPermisos(permisos: PermisoModel[]) {
        this.permisos.forEach(permiso => {
            if (permisos.findIndex(per => per.id == permiso.id) == -1) {
                permiso.check = false;
            } else {
                permiso.check = true;
            }
        });
    }

    updateRowGroupMetaData() {
        this.permisos = [];
        for (let i = 0; i < this.modulos.length; i++) {
            for (let j = 0; j < this.modulos[i].permisos.length; j++) {
                this.permisos.push({
                    ...this.modulos[i].permisos[j],
                    modulo: this.modulos[i].modulo,
                    check: false
                });
            }
        }

        this.rowGroupMetadata = {};
        if (this.permisos) {
            for (let i = 0; i < this.permisos.length; i++) {
                let rowData = this.permisos[i];
                let modulo = rowData.modulo;
                if (i == 0) {
                    this.rowGroupMetadata[modulo] = { index: 0, size: 1 };
                } else {
                    let previousRowData = this.permisos[i - 1];
                    let previousRowGroup = previousRowData.modulo;
                    if (modulo === previousRowGroup)
                        this.rowGroupMetadata[modulo].size++;
                    else this.rowGroupMetadata[modulo] = { index: i, size: 1 };
                }
            }
        }
    }
}
