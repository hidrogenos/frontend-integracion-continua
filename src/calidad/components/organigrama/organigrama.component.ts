import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChild
} from '@angular/core';
import { CalidadModel } from '../../../shared/models/calidad.model';

import { TreeNode } from 'primeng/api';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';
import { EditCalidadOrganigramaDialogComponent } from '../edit-calidad-organigrama-dialog/edit-calidad-organigrama-dialog.component';

@Component({
    selector: 'organigrama',
    styleUrls: ['organigrama.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <div class="ui-g">
                        <div class="ui-g-12" style="text-align: center;">
                            <h1 style="color: #337ab7;">Organigrama</h1>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12" style="overflow-x: scroll;">
                            <p-organizationChart 
                                [value]="data" 
                                selectionMode="single"
                                (onNodeSelect)="onNodeSelect($event)">
                            </p-organizationChart>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Crear nuevo cargo" 
                                class="ui-button-primary"
                                (click)="ccod.display=true"
                                >
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <create-calidad-organigrama-dialog #ccod
            [cargos]="loadedCalidad?.calidad_organigrama"
            (onCreateNewCargo)="onCreateNewCargo.emit($event)">
        </create-calidad-organigrama-dialog>
        <edit-calidad-organigrama-dialog #ecod
            [cargos]="loadedCalidad?.calidad_organigrama"
            (onUpdateCargo)="onUpdateCargo.emit($event)">
        </edit-calidad-organigrama-dialog>
    `
})
export class OrganigramaComponent implements OnInit {
    //atributos
    data: TreeNode[];

    //events
    @Output()
    onCreateNewCargo = new EventEmitter<CalidadOrganigramaModel>();
    @Output()
    onUpdateCargo = new EventEmitter<CalidadOrganigramaModel>();

    //properties
    @Input()
    loadedCalidad: CalidadModel;

    //viewChild
    @ViewChild('ecod')
    ecod: EditCalidadOrganigramaDialogComponent;

    constructor() {}

    ngOnInit() {
        this.orderOrganigrama();
    }

    orderOrganigrama() {
        this.data = this.loadedCalidad.calidad_organigrama.map(cargo => {
            return {
                label: cargo.cargo,
                data: cargo,
                expanded: true,
                children: []
            };
        });

        let sinHijos: TreeNode[];

        while (this.data.length > 1) {
            let sinHijos = this.data.filter(cargo => {
                return this.data.findIndex(
                    e => e.data.id_padre == cargo.data.id
                ) == -1
                    ? true
                    : false;
            });

            this.data = this.data
                .filter(cargo => {
                    return sinHijos.findIndex(
                        e => e.data.id == cargo.data.id
                    ) == -1
                        ? true
                        : false;
                })
                .map(cargo => {
                    return {
                        ...cargo,
                        children: [
                            ...cargo.children,
                            ...sinHijos.filter(
                                e => e.data.id_padre == cargo.data.id
                            )
                        ]
                    };
                });
        }
    }

    searchPadre(padre: TreeNode, org: CalidadOrganigramaModel) {
        if (padre.data.id == org.id_padre) {
            padre.children = [
                ...padre.children,
                {
                    label: org.cargo,
                    data: org,
                    expanded: true,
                    children: []
                }
            ];
        } else {
            padre.children.forEach(element => {
                this.searchPadre(element, org);
            });
        }
    }

    onNodeSelect(event) {
        const cargo: CalidadOrganigramaModel = event.node.data;
        this.ecod.showDialog(cargo);
    }
}
