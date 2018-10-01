import { DocumentoRestringidoModel } from "./documento-restringido.model";

export interface ListaDocumentoRestringidoModel {
    id?: number,
    nombre?: string,
    activo?: number
    documentos_restringidos?: DocumentoRestringidoModel[];
}