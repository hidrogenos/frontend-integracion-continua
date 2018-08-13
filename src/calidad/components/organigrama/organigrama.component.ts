import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CalidadModel } from '../../../shared/models/calidad.model';

import { TreeNode } from 'primeng/api';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';

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
    `
})
export class OrganigramaComponent implements OnInit {
    //atributos
    data: TreeNode[];

    //events
    @Output()
    onCreateNewCargo = new EventEmitter<CalidadOrganigramaModel>();

    //properties
    @Input()
    loadedCalidad: CalidadModel;

    constructor() {}

    ngOnInit() {
        this.orderOrganigrama();
        setTimeout(() => {
            console.log(this.data);
        }, 5000);
    }

    orderOrganigrama() {
        const padre = this.loadedCalidad.calidad_organigrama.find(
            element => element.id_padre == 0
        );

        this.loadedCalidad.calidad_organigrama.forEach(org => {
            if (org.id_padre == 0) {
                this.data = [
                    {
                        label: org.cargo,
                        data: org,
                        expanded: true,
                        children: []
                    }
                ];
            } else {
                this.searchPadre(this.data[0], org);
            }
        });
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
        console.log(event);
    }
}
