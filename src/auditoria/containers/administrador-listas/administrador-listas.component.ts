import { Component, ViewChild, OnInit } from '@angular/core';
import { CreateListaDialogComponent } from '../../components';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { AdministradorListasService } from '../../services';
import { forkJoin } from 'rxjs';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '@ngrx/store';

import * as fromShared from './../../../shared/store';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'administrador-listas',
    styleUrls: ['administrador-listas.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1>Administrador de listas de preguntas para auditorias</h1>
                    <div class="ui-g">
                        <div class="ui-g-3">
                            <listado-auditoria-listas
                                *ngIf="listas"
                                [listas]="listas"
                                (onSelectLista)="selectLista($event)">
                            </listado-auditoria-listas>
                            <div class="text-aling-right">
                                <button pButton 
                                    (click)="showCreateListaDialog()"
                                    type="button" 
                                    label="Crear nueva lista" 
                                    class="ui-button-primary">
                                </button>
                            </div>
                        </div>
                        <div class="ui-g-9">
                            <editor-lista
                                *ngIf="selectedLista"
                                [lista]="selectedLista"
                                (onUpdateListaData)="updateListaData($event)"
                                (onUpdateListaNombre)="updateListaNombre($event)">
                            </editor-lista>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create-lista-dialog #cld
            *ngIf="listas"
            [listas]="listas"
            (onCreateLista)="createLista($event)">
        </create-lista-dialog>
    `
})
export class AdministradorListasComponent implements OnInit {
    //atributos
    listas: ListaPreguntaModel[];
    selectedLista: ListaPreguntaModel;

    //viewChild
    @ViewChild('cld')
    cld: CreateListaDialogComponent;

    constructor(
        private administradorListasService: AdministradorListasService,
        private messageService: MessageService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.loadInitialInfo();
    }

    loadInitialInfo() {
        forkJoin([this.getListas()]).subscribe(([listas]) => {
            this.listas = listas;
        });
    }

    createLista(lista: ListaPreguntaModel) {
        this.showWaitDialog('Registrando nueva lista, un momento por favor...');
        this.administradorListasService
            .createLista(lista)
            .subscribe(response => {
                this.listas = [...this.listas, response];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Lista creda exitosamente'
                });
                this.hideWaitDialog();
            });
    }

    getListas() {
        return this.administradorListasService.getListas();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    selectLista(id: number) {
        this.administradorListasService.getLista(id).subscribe(response => {
            this.selectedLista = response;
        });
    }
    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    showCreateListaDialog() {
        this.cld.display = true;
    }

    updateListaData(lista: ListaPreguntaModel) {
        this.showWaitDialog(
            'Actualizando datos de la lista, un momento por favor'
        );
        this.administradorListasService
            .updateListaData(lista.id, lista.data)
            .subscribe(response => {
                this.hideWaitDialog();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Lista actualizada exitosamente'
                });
            });
    }

    updateListaNombre(lista: ListaPreguntaModel) {
        this.showWaitDialog(
            'Actualizando nombre de la lista, un momento por favor'
        );
        this.administradorListasService
            .updateListaNombre(lista.id, { nombre: lista.nombre })
            .subscribe(response => {
                this.listas = this.listas.map(
                    (e, i) =>
                        e.id != lista.id ? e : { ...e, nombre: lista.nombre }
                );

                this.hideWaitDialog();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Lista actualizada exitosamente'
                });
            });
    }
}
