import { DocumentoModel } from "./documento.model";

export interface DocumentoRestringidoModel {
    id: number,
    id_lista_documentos_restringidos: number,
    id_documento: number,
    documento?: DocumentoModel
}