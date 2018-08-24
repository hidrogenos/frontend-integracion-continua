import { Component, ViewChild, OnInit } from '@angular/core';
import { CreateListaDialogComponent } from '../../components';
import { AuditoriaListaModel } from '../../../shared/models/auditoria-lista.model';
import { AdministradorListasService } from '../../services';
import { forkJoin } from 'rxjs';

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
                                [lista]="selectedLista">
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
    listas: AuditoriaListaModel[];
    selectedLista: AuditoriaListaModel;

    //viewChild
    @ViewChild('cld')
    cld: CreateListaDialogComponent;

    constructor(
        private administradorListasService: AdministradorListasService
    ) {}

    ngOnInit() {
        this.loadInitialInfo();
    }

    loadInitialInfo() {
        forkJoin([this.getListas()]).subscribe(([listas]) => {
            console.log(listas);
            this.listas = listas;
        });
    }

    createLista(lista: AuditoriaListaModel) {
        this.administradorListasService
            .createLista(lista)
            .subscribe(response => {
                this.listas = [...this.listas, response];
            });
    }
    getListas() {
        return this.administradorListasService.getListas();
    }

    selectLista(id: number) {
        this.administradorListasService.getLista(id).subscribe(response => {
            this.selectedLista = response;
            console.log(response);
        });
    }

    showCreateListaDialog() {
        this.cld.display = true;
    }
}
