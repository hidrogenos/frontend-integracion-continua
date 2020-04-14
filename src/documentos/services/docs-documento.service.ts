import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { DocumentoAdjuntoModel } from '../../shared/models/documento-adjunto.model';

import { DocumentoService } from '../../shared/services/documento/documento.service';

import {
    DocumentoDivulgacionRegistroService,
    DocumentoAdjuntoService,
    DocumentoArchivoSoporteService
} from '../../shared/services';
import { DocumentoPermisoTipoDocumentoModel } from '../../shared/models/documento-permiso-tipo-documento.model';
import { DocumentoArchivoSoporteModel } from '../../shared/models/documento-archivo-soporte.model';
import { DocumentoModel } from '../../shared/models/documento.model';
import { DocumentoImagenEditorAdjuntoModel } from 'src/shared/models/documento-imagen-editor-adjunto.model';

export interface DataEstado {
    estado: number;
    data: {
        observacion?: string;
        fecha_inicio?: number;
        fecha_fin?: number;
    };
}



@Injectable()
export class DocsDocumentoService {
    constructor(
        private http: HttpClient,
        private documentoService: DocumentoService,
        private documentoAdjuntoService: DocumentoAdjuntoService,
        private documentoDivulgacionRegistroService: DocumentoDivulgacionRegistroService,
        private documentoArchivoSoporteService: DocumentoArchivoSoporteService
    ) {}

    getDocumentosByIdTipo(filtros, idTipoDocumento: number): any {
        return this.http
            .post(
                `${
                    environment.apiUrl
                }/documentos/get-documentos-by-id-tipo/${idTipoDocumento}`,
                filtros
            )
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        documentos: response.documentos.map(documento =>
                            this.documentoService.transformDocumentoResponse(
                                documento
                            )
                        )
                    };
                })
            );
    }

    onEliminarDocumento(event: DocumentoModel): Observable<DocumentoModel> {
        return this.http.delete<DocumentoModel>(
            `${environment.apiUrl}/documentos/delete-documento/${event.id}`
        );
    }

    getUsuariosQuery(queryObject) {
        return this.http.post(
            `${environment.apiUrl}/documentos/get-user-query`,
            queryObject
        );
    }

    getProcesosQuery(queryString) {
        return this.http.post(
            `${environment.apiUrl}/documentos/get-procesos-query`,
            { query: queryString }
        );
    }

    createDocumento(idTipoDocumento, documento) {
        return this.http.post(
            `${
                environment.apiUrl
            }/documentos/create-documento/${idTipoDocumento}`,
            documento
        );
    }

    updateDocumento(documento) {
        return this.http.post(
            `${environment.apiUrl}/documentos/update-documento/${documento.id}`,
            documento
        );
    }

    updateDocumentoTexto(
        id: number,
        data: {
            disposicion: number;
            flagPrimeraPagina: boolean;
            cabeceraPrimeraPagina: string;
            cuerpoPrimeraPagina: string;
            piePrimeraPagina: string;
            cabeceraDocumento: string;
            cuerpoDocumento: string;
            pieDocumento: string;
        }
    ) {
        return this.http.post(
            `${environment.apiUrl}/documentos/update-documento-texto/${id}`,
            {
                disposicion: data.disposicion,
                flagPrimeraPagina: data.flagPrimeraPagina,
                cabeceraPrimeraPagina: data.cabeceraPrimeraPagina,
                cuerpoPrimeraPagina: data.cuerpoPrimeraPagina,
                piePrimeraPagina: data.piePrimeraPagina,
                cabeceraDocumento: data.cabeceraDocumento,
                cuerpoDocumento: data.cuerpoDocumento,
                pieDocumento: data.pieDocumento
            }
        );
    }

    getDocumentoById(idDocumento: number): any {
        return this.http
            .get<DocumentoModel>(
                `${
                    environment.apiUrl
                }/documentos/get-documento-by-id/${idDocumento}`
            )
            .pipe(
                map(documento =>
                    this.documentoService.transformDocumentoResponse(documento)
                )
            );
    }

    getProcesosNoAsociados(idDocumento: number): any {
        return this.http.get(
            `${
                environment.apiUrl
            }/documentos/get-procesos-no-asociados/${idDocumento}`
        );
    }

    uploadAdjuntoByDocumento(
        idDocumento: number,
        data
    ): Observable<DocumentoAdjuntoModel[]> {
        return this.http
            .post<DocumentoAdjuntoModel[]>(
                `${
                    environment.apiUrl
                }/documentos/upload-adjuntos-by-documento/${idDocumento}`,
                data
            )
            .pipe(
                map(adjuntos => {
                    return adjuntos.map(adjunto =>
                        this.documentoAdjuntoService.transformDocumentoAdjuntoResponse(
                            adjunto
                        )
                    );
                })
            );
    }

    uploadImagenEditorByDocumento(
        idDocumento: number,
        data
    ): Observable<DocumentoImagenEditorAdjuntoModel> {
        return this.http.post<DocumentoImagenEditorAdjuntoModel>(
            `${
                environment.apiUrl
            }/documentos/upload-imagen-editor-by-documento/${idDocumento}`,
            data
        );
    }

    uploadAdjuntoFlujoByDocumento(
        idDocumento: number,
        data
    ): Observable<DocumentoAdjuntoModel[]> {
        return this.http
            .post<DocumentoAdjuntoModel[]>(
                `${
                    environment.apiUrl
                }/documentos/upload-adjuntos-flujo-by-documento/${idDocumento}`,
                data
            )
            .pipe(
                map(adjuntos => {
                    return adjuntos.map(adjunto =>
                        this.documentoDivulgacionRegistroService.transformDocumentoDivulgacionRegistroResponse(
                            adjunto
                        )
                    );
                })
            );
    }

    getDocumentoQueryByTipo(filter: {
        query: string;
        id_tipo_documento: number;
    }) {
        return this.http.post(
            `${environment.apiUrl}/documentos/get-documento-query-by-tipo`,
            filter
        );
    }

    updateEstadoDocumento(idDocumento: number, data: DataEstado) {
        return this.http.post(
            `${
                environment.apiUrl
            }/documentos/update-estado-documento/${idDocumento}`,
            data
        );
    }

    getDocumentosReemplazoQuery(filter: {
        query: string;
        id_documento: number;
    }) {
        return this.http.post(
            `${environment.apiUrl}/documentos/get-documentos-reemplazo-query`,
            filter
        );
    }

    getPermisosByDoc(
        idDoc: number
    ): Observable<DocumentoPermisoTipoDocumentoModel[]> {
        return this.http.get<DocumentoPermisoTipoDocumentoModel[]>(
            `${environment.apiUrl}/documentos/get-permisos-by-id-doc/${idDoc}`
        );
    }

    getPermisosByTipoDoc(
        idTipoDoc: number
    ): Observable<DocumentoPermisoTipoDocumentoModel[]> {
        return this.http.get<DocumentoPermisoTipoDocumentoModel[]>(
            `${
                environment.apiUrl
            }/documentos/get-permisos-by-tipo-doc/${idTipoDoc}`
        );
    }

    filtrarPermisoDocumento(
        response: DocumentoPermisoTipoDocumentoModel[],
        permisoDocumento
    ): number {
        let permiso = response.find(
            item => item.id_documento_permiso == permisoDocumento
        );
        if (permiso) {
            return permiso.id_permiso;
        } else {
            return null;
        }
    }

    usuarioPerteneceProcesoDocumento(idUsuario: number, idDocumento: number) {
        return this.http.get(
            `${
                environment.apiUrl
            }/documentos/usuario-pertenece-proceso-documento/${idUsuario}/${idDocumento}`
        );
    }

    usuarioTieneDocumentoRestringido(idUsuario: number, idDocumento: number) {
        return this.http.get(
            `${
                environment.apiUrl
            }/documentos/usuario-tiene-documento-restringido/${idUsuario}/${idDocumento}`
        );
    }

    deleteArchivoSoporte(id: number): Observable<DocumentoArchivoSoporteModel> {
        return this.http
            .get<DocumentoArchivoSoporteModel>(
                `${environment.apiUrl}/documentos/delete-archivo-soporte/${id}`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadArchivoSoporte(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadArchivoSoporte(
        idDocumento: number,
        data
    ): Observable<DocumentoArchivoSoporteModel[]> {
        return this.http
            .post<DocumentoArchivoSoporteModel[]>(
                `${
                    environment.apiUrl
                }/documentos/upload-archivo-soporte/${idDocumento}`,
                data
            )
            .pipe(
                map(adjuntos => {
                    return adjuntos.map(adjunto =>
                        this.documentoArchivoSoporteService.transformDocumentoArchivoSoporteResponse(
                            adjunto
                        )
                    );
                })
            );
    }

    generarPdf(idDocumento: number) {
        return this.http.post(
            `${environment.apiUrl}/documentos/generar-pdf`,
            {
                idDocumento
            },
            {
                responseType: 'blob'
            }
        );
    }


    
    deleteDocumento(idDocumento: number, data: DataEstado) {
        return this.http.post(
            `${
                environment.apiUrl
            }/documentos/eliminar-documento/${idDocumento}`,
            data
        );
    }
   
}
