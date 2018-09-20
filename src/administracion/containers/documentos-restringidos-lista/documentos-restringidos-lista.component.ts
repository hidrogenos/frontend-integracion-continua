import { Component, OnInit, ViewChild } from "@angular/core";
import { HasPermisionService } from "../../../shared/services";
import { ListaDocumentoRestringidoModel } from "../../../shared/models/lista-documento-restringido.model";
import { forkJoin } from "rxjs";
import { ListaDocumentosRestringidosService } from "../../services/lista-documentos-restringidos/lista-documentos-restringidos.service";
import { ComponenteCargado } from "../../../shared/services/utils/abstract-clases/ComponenteCargado";
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import { CreateListaDocumentosRestringidosDialogComponent } from "../../components/create-lista-documentos-restringidos-dialog/create-lista-documentos-restringidos-dialog.component";
import { EditListaDocumentosRestringidosDialogComponent } from "../../components/edit-lista-documentos-restringidos-dialog/edit-lista-documentos-restringidos-dialog.component";
import { DocumentoModel } from "../../../shared/models/documento.model";
import { DocumentoRestringidoModel } from "../../../shared/models/documento-restringido.model";
import { DocumentosRestringidosPanelComponent } from "../../components";

@Component({
    selector: 'documentos-restringidos-lista',
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-shield" aria-hidden="true"></i> Lista de documentos restringidos</h1>
                <div class="ui-g" style="text-align: right">
                    <div class="ui-g-12">
                        <button pButton class="ui-button-success" label="Crear lista" (click)="cldrd.display=true"></button>
                    </div>
                </div>
                    <div class="ui-g ui-fluid">
                        <div class="ui-g-4">
                            <lista-documentos-retringidos [listaDocumentosRestringidos]="listaDocumentosRestringidos"
                                                            [totalRecordsDocumentosRestringidos]="totalRecordsDocumentosRestringidos"
                                                            [loadingDocumentosRestringidos]="loadingDocumentosRestringidos"
                                                            (onEditListaDocumentosRestringidos)="eldrd.loadFormData($event)"
                                                            (onLoadListaDocumentosRestringidos)="getListasDocumentosRestrigidosLazy($event)"
                                                            (onDeleteListaDocumentosRestringidos)="deleteListaDocumentosRestringidos($event)"
                                                            (onSelectListaDocumentosRestringidos)="selectListaDocumentosRestringidos($event)">
                            </lista-documentos-retringidos>
                        </div>
                        <div class="ui-g-8">
                            <documentos-restringidos-panel #drp
                                                           [documentosPorRelacionar]="documentosPorRelacionar"
                                                           [documentosRestringidos]="listaDocumentosRestringidosSelected?.documentos_restringidos"
                                                           [disabled]="documentosRestringidosPanelDisabled"
                                                           (onSearchDocumentosByCodigo)="getDocumentosByCodigo($event)"
                                                           (onRelateDocumentosRestringidos)="relateDocumentosRestringidos($event)">
                            </documentos-restringidos-panel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create-lista-documentos-restringidos-dialog #cldrd
            (onCreateListaDocumentosRestringidos)="createListaDocumentosRestringidos($event)">
        </create-lista-documentos-restringidos-dialog>
        <edit-lista-documentos-restringidos-dialog #eldrd
            (onUpdateListaDocumentosRestringidos)="updateListaDocumentosRestringidos($event)">
        </edit-lista-documentos-restringidos-dialog>`,
    styleUrls: []
})
export class DocumentosRestringidosListaComponent extends ComponenteCargado implements OnInit {

    // Lista de documentos retringidos componente
    listaDocumentosRestringidos: ListaDocumentoRestringidoModel[];
    totalRecordsDocumentosRestringidos: number;
    loadingDocumentosRestringidos: boolean;

    // Selected Lista
    listaDocumentosRestringidosSelected: ListaDocumentoRestringidoModel;

    // documentos restringidos panel componente
    documentosRestringidosPanelDisabled: boolean = true;
    documentosPorRelacionar: DocumentoModel[];

    //componentes
    @ViewChild("cldrd")
    cldrd: CreateListaDocumentosRestringidosDialogComponent;

    @ViewChild("eldrd")
    eldrd: EditListaDocumentosRestringidosDialogComponent;

    @ViewChild("drp")
    drp: DocumentosRestringidosPanelComponent;

    constructor(private hasPermisionService: HasPermisionService,
        private listaDocumentosRestringidosService: ListaDocumentosRestringidosService,
        private storeDialogs: Store<StoreModel>) {
        super(storeDialogs);
    }

    ngOnInit() {
        this.loadInitData();
    }

    loadInitData() {
    }

    getListasDocumentosRestrigidosLazy(filtros) {
        this.listaDocumentosRestringidosService.getListasDocumentosRestrigidosLazy(filtros)
            .subscribe((response: any) => {
                this.listaDocumentosRestringidos = response.listasDocumentosRestringidos;
                this.totalRecordsDocumentosRestringidos = response.cantidad;
                this.loadingDocumentosRestringidos = false;
            });
    }

    getDocumentosByCodigo(filtro) {
        this.listaDocumentosRestringidosService
            .getDocumentosByCodigo(filtro)
            .subscribe(documentos => {
                this.documentosPorRelacionar = documentos;
            });
    }

    createListaDocumentosRestringidos(listaDocumentosRestringidos: ListaDocumentoRestringidoModel) {
        this.listaDocumentosRestringidosService.
            createListaDocumentosRestringidos(listaDocumentosRestringidos)
            .subscribe(listaDocumentosRestringidos =>
                this.listaDocumentosRestringidos = [
                    ...this.listaDocumentosRestringidos,
                    listaDocumentosRestringidos
                ]
            );
    }

    deleteListaDocumentosRestringidos(data: ListaDocumentoRestringidoModel) {
        this.listaDocumentosRestringidosService
            .deleteListaDocumentosRestringidos(data.id)
            .subscribe(listaDocumentosRestringidos => {
                this.listaDocumentosRestringidos = this.listaDocumentosRestringidos.filter(listaActual => listaActual.id != listaDocumentosRestringidos.id);
            });
    }

    selectListaDocumentosRestringidos(data: ListaDocumentoRestringidoModel) {
        this.listaDocumentosRestringidosSelected = data;
        this.documentosRestringidosPanelDisabled = false;
        this.drp.enableComponent();
    }


    updateListaDocumentosRestringidos(data: ListaDocumentoRestringidoModel) {
        this.listaDocumentosRestringidosService
            .updateListaDocumentosRestringidos(data)
            .subscribe(responseLista => {
                this.listaDocumentosRestringidos = this.listaDocumentosRestringidos.map(listaActual => {
                    if (listaActual.id == responseLista.id) {
                        return responseLista;
                    } else {
                        return listaActual;
                    }
                });
            });
    }

    relateDocumentosRestringidos(data: DocumentoModel[]) {
        this.listaDocumentosRestringidosService
            .addDocumentosToListaRestringidos(this.listaDocumentosRestringidosSelected.id, data)
            .subscribe(response => console.log(response));
    }



    hasPermision(id: number) {
        return this.hasPermisionService.hasPermision(id);
    }
}