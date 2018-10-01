import { Component } from "@angular/core";
import { InformeService } from "../../services";

import * as fromSharedStore from './../../../shared/store';
import { Store } from '@ngrx/store';
import * as fromRootStore from './../../../app/store';

@Component({selector: 'inf-acciones',
template: `
        <reportes-acciones 
        (onExportarReporteDesviacion)="onExportReportePDF()">
        </reportes-acciones>
`})
export class InfAccionesComponent{
    constructor(
        private informeService: InformeService,
        private sharedStore: Store<fromSharedStore.SharedState>,
        private store: Store<fromRootStore.State>
    ) { }


    onExportReportePDF() {
        this.informeService.getReporteDesviacion().subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.hideWaitDialog();
        });
    }

    hideWaitDialog() {
        this.sharedStore.dispatch(new fromSharedStore.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.sharedStore.dispatch(new fromSharedStore.ShowWaitDialog({ header, body }));
    }
}