import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

@Injectable()
export class ColaboradoresListaService {
    constructor(private http: HttpClient) {}

    createUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
        return this.http
            .post<UsuarioModel>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/create-usuario`,
                usuario
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getArls(): Observable<ArlModel[]> {
        return this.http
            .get<ArlModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-arls`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getCajasCompensacion(): Observable<CajaCompensacionModel[]> {
        return this.http
            .get<CajaCompensacionModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-cajas-compensacion`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getCargosActivos(): Observable<CalidadOrganigramaModel[]> {
        return this.http
            .get<CalidadOrganigramaModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-cargos-activos`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getCesantias(): Observable<CesantiaModel[]> {
        return this.http
            .get<CesantiaModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-cesantias`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getEpss(): Observable<EpsModel[]> {
        return this.http
            .get<EpsModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-epss`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getPaises(): Observable<PaisModel[]> {
        return this.http
            .get<PaisModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-paises`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getEpensiones(): Observable<PensionModel[]> {
        return this.http
            .get<PensionModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-pensiones`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getPerfilesActivos(): Observable<PerfilModel[]> {
        return this.http
            .get<PerfilModel[]>(
                `${
                    environment.apiUrl
                }/administracion/colaborador/lista/get-perfiles-activos`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
