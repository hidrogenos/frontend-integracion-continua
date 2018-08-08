import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';
import { PaisModel } from '../../../shared/models/pais.model';
import { ArlModel } from '../../../shared/models/arl.model';
import { CajaCompensacionModel } from '../../../shared/models/caja-compensacion.model';
import { CesantiaModel } from '../../../shared/models/cesantia.model';
import { EpsModel } from '../../../shared/models/eps.model';
import { PensionModel } from '../../../shared/models/pension.model';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { UsuarioService } from '../../../shared/services';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import { UsuarioDestrezaModel } from '../../../shared/models/usuario-destreza.model';
import { UsuarioDestrezaDocumentoModel } from '../../../shared/models/usuario-destreza-documento.model';

@Injectable()
export class ColaboradorDetalleService {
    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService
    ) {}

    deleteDestreza(id: number): Observable<UsuarioDestrezaModel> {
        return this.http
            .get<UsuarioDestrezaModel>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/delete-destreza/${id}`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    deleteDestrezaDocumento(
        id: number
    ): Observable<UsuarioDestrezaDocumentoModel> {
        return this.http
            .get<UsuarioDestrezaDocumentoModel>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/delete-destreza-documento/${id}`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadUsuarioDestrezaDocumento(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    getDetalleUsuario(idUsuario: number): Observable<UsuarioModel> {
        return this.http
            .get<UsuarioModel>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/get-detalle-usuario/${idUsuario}`
            )
            .pipe(
                map(usuario =>
                    this.usuarioService.transformResponseUsuario(usuario)
                ),
                catchError((error: any) => throwError(error))
            );
    }

    getInitialData(): Observable<{
        arls: ArlModel[];
        cajas_compensacion: CajaCompensacionModel[];
        cargos: CalidadOrganigramaModel[];
        cesantias: CesantiaModel[];
        epss: EpsModel[];
        paises: PaisModel[];
        pensiones: PensionModel[];
        perfiles: PerfilModel[];
        tipos_identificacion: TipoIdentificacionModel[];
    }> {
        return this.http
            .get<any>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/get-initial-data`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    resetPassword(data): Observable<UsuarioModel> {
        return this.http
            .post<UsuarioModel>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/reset-password`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateUsuario(id: number, data: UsuarioModel): Observable<UsuarioModel> {
        let aux = this.usuarioService.transformRequestUsuario(data);
        return this.http
            .post<UsuarioModel>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/update-usuario/${id}`,
                aux
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateDestreza(
        id: number,
        data: UsuarioDestrezaModel
    ): Observable<UsuarioDestrezaModel> {
        return this.http
            .post<UsuarioDestrezaModel>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/update-destreza/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadUsuarioDestrezaDocumentos(
        idDestreza: number,
        data: any
    ): Observable<UsuarioDestrezaDocumentoModel[]> {
        return this.http
            .post<UsuarioDestrezaDocumentoModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/detalle/upload-usuario-destreza-documento/${idDestreza}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }
}
