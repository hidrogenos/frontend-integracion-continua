import { Component, ViewChild, OnInit } from '@angular/core';
import { AccionModel } from '../../../shared/models/accion.model';
import { AccionImportanciaModel } from '../../../shared/models/accion-importancia.model';
import { AccionCorrectivaService } from '../../../shared/services';
import {
    AccionesCorrectivasService,
    AccionesCorrectivasProcesoService
} from '../../services';
import { ComponenteCargado } from './ComponenteCargado';
import {
    EditAccionCorrectivaComponent,
    RelacionarProcesoComponent
} from '../../components';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';

import * as fromRootStore from './../../../app/store';
import { map } from 'rxjs/operators';
import { AccionProcesoModel } from '../../../shared/models/accion-proceso.model';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'accion-correctiva-panel',
    template: `<div class="ui-g">
                    <div class="ui-g-12">
                        <edit-accion-correctiva #edit [accionCorrectiva]="accionCorrrectivaActual"
                                                [importancias]="importancias"
                                                (onEditAccionCorrectiva)="updateAccionCorrectiva($event)">
                        </edit-accion-correctiva>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <relacionar-proceso #relate [data]="procesosAccionCorrectiva" 
                                            [procesos]="procesos"
                                            [loadingProcesos]="loadingProcesos"
                                            [cols]="colsAccionCorrectivaProceso"
                                            [rows]="10"
                                            (onRelateProceso)="addProcesoToAccionCorrectiva($event)"
                                            (onDeleteProcesoFromAccionCorrectiva)="deleteProcesoFromAccionCorrectiva($event)"
                                            ></relacionar-proceso>
                    </div>
                </div>
                `
})
export class AccionCorrectivaPanel extends ComponenteCargado implements OnInit {
    o;
    constructor(
        private accionCorrectivaService: AccionCorrectivaService,
        private accionesCorrectivasService: AccionesCorrectivasService,
        private accionesCorrectivasProcesoService: AccionesCorrectivasProcesoService,
        private store: Store<StoreModel>
    ) {
        super(store);
    }

    colsAccionCorrectivaProceso: any[];

    // variables con todos los tipos de una clase
    importancias: AccionImportanciaModel[];

    procesos: MapaProcesoHijoModel[];

    loadingProcesos: boolean;

    // variables dependientes
    accionCorrectivaActual: AccionModel;

    procesosAccionCorrectiva: AccionProcesoModel[];

    @ViewChild('edit')
    editAccionCorrectivaComponent: EditAccionCorrectivaComponent;

    @ViewChild('relate')
    relateAccionCorrectivaComponent: RelacionarProcesoComponent;

    ngOnInit() {
        this.loadInitData();
    }

    loadInitData() {
        this.showWaitDialog(
            'Acción en proceso',
            'Consultado datos requeridos, un momento por favor...'
        );

        this.loadingProcesos = true;

        this.colsAccionCorrectivaProceso = [
            { field: 'nombre', header: 'Nombre proceso' },
            { field: 'acciones', header: 'Acciones' }
        ];

        let esperandoId = true;
        let id = 0;

        this.store
            .select(fromRootStore.getRouterState)
            .subscribe(RouterState => {
                esperandoId = false;
                id = RouterState.state.params.id;
            });
        if (!esperandoId) {
            let aux = forkJoin([
                this.getImportancias(),
                this.getAccionCorrectiva(id),
                this.getProcesos(),
                this.getProcesosByAccionCorrectiva(id)
            ]);

            aux.subscribe(
                ([
                    importancias,
                    accionCorrectiva,
                    procesos,
                    procesosAccionCorrectiva
                ]) => {
                    this.importancias = importancias;
                    this.accionCorrectivaActual = accionCorrectiva;
                    this.procesos = procesos.filter(
                        procesoActual =>
                            !procesosAccionCorrectiva.find(
                                procesoAccionCorrectivaA =>
                                    procesoAccionCorrectivaA.id_mapa_procesos ==
                                    procesoActual.id
                            )
                    );

                    this.procesosAccionCorrectiva = procesosAccionCorrectiva;

                    setTimeout(() => {
                        this.editAccionCorrectivaComponent.setDataAccionCorrectiva(
                            this.accionCorrectivaActual
                        );
                        this.loadingProcesos = false;
                    }, 1);
                    this.hideWaitDialog();
                }
            );
        }
    }

    updateAccionCorrectiva(data: AccionModel) {
        this.accionCorrectivaService
            .updateAccionCorrectiva(data)
            .subscribe(response => {
                this.accionCorrectivaActual = response;
                this.hideWaitDialog();
            });
    }

    getAccionCorrectiva(id: number) {
        return this.accionCorrectivaService.getAccionCorrectiva(id).pipe(
            map(response => {
                const accionCorrectiva: AccionModel = {
                    ...response,
                    fecha_creacion: response.fecha_creacion * 1000
                };
                return accionCorrectiva;
            })
        );
    }

    getProcesosByAccionCorrectiva(id: number) {
        return this.accionesCorrectivasProcesoService.getProcesosByAccionCorrectiva(
            id
        );
    }

    getImportancias() {
        return this.accionesCorrectivasService.getImportancias();
    }

    getProcesos() {
        return this.accionesCorrectivasService.getProcesos();
    }

    addProcesoToAccionCorrectiva(data: MapaProcesoHijoModel[]) {
        this.showWaitDialog(
            'Acción en proceso',
            'Relacionando proceso a acción correctiva, un momento por favor...'
        );
        this.store.select(this.fromAuth.getUser).subscribe(usuario => {
            let accionCorrectivaProcesos: AccionProcesoModel[] = [];

            data.forEach(mapaProcesoHijo => {
                let accionCorrectivaProceso: AccionProcesoModel = {
                    id_mapa_procesos: mapaProcesoHijo.id,
                    id_accion_correctiva: this.accionCorrectivaActual.id,
                    id_usuario: usuario.id
                };
                accionCorrectivaProcesos.push(accionCorrectivaProceso);
            });

            this.accionesCorrectivasProcesoService
                .addProcesoToAccionCorrectiva(accionCorrectivaProcesos)
                .subscribe(procesosAccionCorrectiva => {
                    this.procesosAccionCorrectiva = [
                        ...this.procesosAccionCorrectiva,
                        ...procesosAccionCorrectiva
                    ];
                    this.procesos = this.procesos.filter(procesoActual => {
                        procesosAccionCorrectiva.forEach(
                            procesoAccionCorrectivaActual => {
                                if (
                                    procesoActual.id !=
                                    procesoAccionCorrectivaActual.id_mapa_procesos
                                ) {
                                    return procesoActual;
                                }
                            }
                        );
                    });
                    this.hideWaitDialog();
                });
        });
    }

    deleteProcesoFromAccionCorrectiva(data: AccionProcesoModel) {
        this.showWaitDialog(
            'Acción en proceso',
            'Eliminando proceso de acción correctiva, un momento por favor...'
        );
        this.accionesCorrectivasProcesoService
            .deleteProcesoFromAccionCorrectiva(data.id)
            .subscribe(procesoAccionCorrectiva => {
                this.procesosAccionCorrectiva = this.procesosAccionCorrectiva.filter(
                    procesoActual => {
                        if (procesoActual.id != procesoAccionCorrectiva.id) {
                            return procesoActual;
                        } else {
                            // const proceso:  MapaProcesoHijoModel= {
                            //     id: procesoActual.proceso.id,
                            //     proceso: procesoActual.proceso.proceso
                            // };

                            this.procesos = [
                                ...this.procesos,
                                procesoActual.proceso
                            ];
                        }
                    }
                );

                this.hideWaitDialog();
            });
    }
}
