import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoModel } from '../../models/documento.model';
import { DocumentoAdjuntoService } from '../documento-adjunto/documento-adjunto.service';
import { DocumentoDivulgacionRegistroService } from '../documento-divulgacion-registro/documento-divulgacion-registro.service';
import { DocumentoArchivoSoporteService } from '../documento-archivo-soporte/documento-archivo-soporte.service';

@Injectable()
export class DocumentoService {
    constructor(
        private http: HttpClient,
        private documentoAdjuntoService: DocumentoAdjuntoService,
        private documentoDivulgacionService: DocumentoDivulgacionRegistroService,
        private documentoArchivosSoporte: DocumentoArchivoSoporteService
    ) { }

    getDocumentoById(idDocumento: number) {
        return this.http.get(`${environment.apiUrl}/documento/${idDocumento}`);
    }

    transformDocumentoRequest(documento: DocumentoModel) {
        if (documento.adjuntos) {
            documento.adjuntos = documento.adjuntos.map(
                adjunto => this.documentoAdjuntoService.transformDocumentoAdjuntoRequest(adjunto)
            )
        }
        return {
            ...documento,
            fecha_fin: documento.fecha_fin ? documento.fecha_fin / 1000 : null,
            fecha_inicio: documento.fecha_fin ? documento.fecha_fin / 1000 : null
        }
    }

    transformDocumentoResponse(documento: DocumentoModel) {
        if (documento.adjuntos) {
            documento.adjuntos = documento.adjuntos.map(
                adjunto => this.documentoAdjuntoService.transformDocumentoAdjuntoResponse(adjunto)
            )
        }
        if (documento.divulgacion_registros) {
            documento.divulgacion_registros = documento.divulgacion_registros.map(
                adjunto => this.documentoDivulgacionService.transformDocumentoDivulgacionRegistroResponse(adjunto)
            )
        }if (documento.archivos_soporte) {
            documento.archivos_soporte = documento.archivos_soporte.map(
                archivo_soporte => this.documentoArchivosSoporte.transformDocumentoArchivoSoporteResponse(archivo_soporte)
            )
        }
        return {
            ...documento,
            fecha_fin: documento.fecha_fin ? documento.fecha_fin * 1000 : null,
            fecha_inicio: documento.fecha_fin ? documento.fecha_fin * 1000 : null
        }
    }

    getPermisoByIdDocAdjunto(idDoc: number, idPermisoDocumento) {
        return this.http.get(`${environment.apiUrl}/documentos/get-permiso-by-id-doc-adjunto/${idDoc}/${idPermisoDocumento}`);
    }

    getPermisoByIdDocAdjuntoFlujo(idDoc: number, idPermisoDocumento) {
        return this.http.get(`${environment.apiUrl}/documentos/get-permiso-by-id-doc-adjunto-flujo/${idDoc}/${idPermisoDocumento}`);
    }
}
