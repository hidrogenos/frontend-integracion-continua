import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { DocumentoModel } from "../../../shared/models/documento.model";
import { ListaDocumentoRestringidoModel } from "../../../shared/models/lista-documento-restringido.model";


const url_point_api = "/administracion/lista-documentos-restringidos";

@Injectable()
export class ListaDocumentosRestringidosService {
    constructor(private http: HttpClient) { }

    addDocumentosToListaRestringidos(id: number, data: DocumentoModel[]) {
        return this.http.post(`${environment.apiUrl}${url_point_api}/add-documentos-restringidos/${id}`, data)
            .pipe(
                map(response => response),
                catchError((error: any) => throwError(error)
                )
            );
    }

    getListasDocumentosRestrigidosLazy($filtro) {
        return this.http.post(`${environment.apiUrl}${url_point_api}/get-listas-documentos-restringidos`, $filtro)
            .pipe(
                map(response => response),
                catchError((error: any) => throwError(error)
                )
            );
    }

    getDocumentosByCodigo(filtro): Observable<DocumentoModel[]> {
        return this.http.post<DocumentoModel[]>(`${environment.apiUrl}${url_point_api}/get-documentos-by-codigo`, filtro)
            .pipe(
                map(response => response),
                catchError((error: any) => throwError(error)
                )
            );
    }

    createListaDocumentosRestringidos(data: ListaDocumentoRestringidoModel) {
        return this.http.post<ListaDocumentoRestringidoModel>(`${environment.apiUrl}${url_point_api}/create-lista-documentos-restringidos`, data)
            .pipe(
                map(response => response),
                catchError((error: any) => throwError(error)
                )
            );
    }

    updateListaDocumentosRestringidos(data: ListaDocumentoRestringidoModel) {
        return this.http.post<ListaDocumentoRestringidoModel>(`${environment.apiUrl}${url_point_api}/update-lista-documentos-restringidos/${data.id}`, data)
            .pipe(
                map(response => response),
                catchError((error: any) => throwError(error)
                )
            );
    }

    deleteListaDocumentosRestringidos(id: number) {
        return this.http.delete<ListaDocumentoRestringidoModel>(`${environment.apiUrl}${url_point_api}/delete-lista-documentos-restringidos/${id}`)
            .pipe(
                map(response => response),
                catchError((error: any) => throwError(error)
                )
            );
    }
}