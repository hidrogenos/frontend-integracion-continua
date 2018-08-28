import { Component, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';

//models
import { StoreModel } from '../../../shared/models/store.model';

//services
import { DetalleAuditoriaExternaService } from '../../services/detalle-auditoria-externa/detalle-auditoria-externa.service';

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromShared from './../../../shared/store';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { forkJoin } from 'rxjs';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

@Component({
    selector: 'detalle-auditoria-externa',
    styleUrls: ['detalle-auditoria-externa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1>Detalle auditoria externa 1</h1>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <datos-basicos-auditoria-externa
                                *ngIf="loadedAuditoria"
                                [auditores]="auditores"
                                [auditoria]="loadedAuditoria"
                                [proveedores]="proveedores">
                            </datos-basicos-auditoria-externa>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class DetalleAuditoriaExternaComponent implements OnInit {
    //atributos
    auditores: UsuarioModel[];
    loadedAuditoria: AuditoriaExternaModel;
    proveedores: ProveedorModel[];

    constructor(
        private detalleAuditoriaExternaService: DetalleAuditoriaExternaService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.getInitialInfo();
    }

    getInitialInfo() {
        this.showWaitDialog(
            'Consultado datos de auditoria, un momento por favor'
        );
        forkJoin([
            this.getAuditoria(),
            this.detalleAuditoriaExternaService.getInitialInfo()
        ]).subscribe(([auditoria, initialInfo]) => {
            this.loadedAuditoria = auditoria;
            this.auditores = initialInfo.auditores;
            this.proveedores = initialInfo.proveedores;
            this.hideWaitDialog();
            console.log(auditoria);
        });
    }

    getAuditoria() {
        return this.store.select(fromRoot.getRouterState).pipe(
            take(1),
            map(routeState => routeState.state.params.id),
            switchMap(id =>
                this.detalleAuditoriaExternaService.getAuditoriaExterna(id)
            )
        );
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
