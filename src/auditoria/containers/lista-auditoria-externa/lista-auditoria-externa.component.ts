import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateAuditoriaExternaDialogComponent } from '../../components';
import { ListaAuditoriaExternaService } from '../../services';
import { forkJoin } from 'rxjs';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';

@Component({
    selector: 'lista-auditoria-externa',
    styleUrls: ['lista-auditoria-externa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1>Auditorias externas</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                (click)="showCreateAuditoriExternaDialog()"
                                type="button" 
                                label="Crear nueva auditoria" 
                                class="ui-button-primary">
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create-auditoria-externa-dialog #caed
            (onSearchProveedor)="searchProveedor($event)"
            [auditores]="auditores"
            [listasPreguntas]="listasPreguntas"
            (onCreateAuditoria)="createAuditoria($event)">
        </create-auditoria-externa-dialog>
    `
})
export class ListaAuditoriaExternaComponent implements OnInit {
    //atributos
    auditores: UsuarioModel[];
    listasPreguntas: ListaPreguntaModel[];

    //viewchild
    @ViewChild('caed')
    caed: CreateAuditoriaExternaDialogComponent;

    constructor(
        private listaAuditoriaExternaService: ListaAuditoriaExternaService
    ) {}

    ngOnInit() {
        this.getInitialInfo();
    }

    createAuditoria(data: {
        auditoria: AuditoriaExternaModel;
        idsLista: number[];
    }) {
        console.log(data);
        this.listaAuditoriaExternaService
            .createAuditoriaExterna(data)
            .subscribe(response => console.log(response));
    }

    getInitialInfo() {
        this.listaAuditoriaExternaService
            .getInitialInfo()
            .subscribe(response => {
                console.log(response);
                this.auditores = response.auditores;
                this.listasPreguntas = response.listas_preguntas;
            });
    }

    showCreateAuditoriExternaDialog() {
        this.caed.display = true;
    }

    searchProveedor(query: string) {
        console.log(query);
        this.listaAuditoriaExternaService
            .getFilteredProveedores({ query })
            .subscribe(response => (this.caed.filteredProveedores = response));
    }
}
