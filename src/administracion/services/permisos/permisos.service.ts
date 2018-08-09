import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { PerfilModel } from '../../../shared/models/perfil.model';
import { ModuloModel } from '../../../shared/models/modulo.model';
import { PermisoModel } from '../../../shared/models/permiso.model';

@Injectable()
export class PermisosService {
    constructor(private http: HttpClient) {}

    addPermiso(data: {
        id_perfil: number;
        id_permiso: number;
    }): Observable<PermisoModel> {
        return this.http
            .post<PermisoModel>(
                `${environment.apiUrl}/administracion/perfil/add-permiso`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    editPerfil(id: number, data: { perfil: string }): Observable<PerfilModel> {
        return this.http
            .post<PerfilModel>(
                `${environment.apiUrl}/administracion/perfil/edit-perfil/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    createPerfil(data: PerfilModel) {
        return this.http
            .post<PerfilModel>(
                `${environment.apiUrl}/administracion/perfil/create-perfil`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    getModulos(): Observable<ModuloModel[]> {
        return this.http
            .get<ModuloModel[]>(
                `${environment.apiUrl}/administracion/perfil/get-modulos`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    getPerfiles(): Observable<PerfilModel[]> {
        return this.http
            .get<PerfilModel[]>(
                `${
                    environment.apiUrl
                }/administracion/perfil/get-perfiles-activos`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    removePermiso(data: { id_perfil: number; id_permiso: number }) {
        return this.http
            .post<PermisoModel>(
                `${environment.apiUrl}/administracion/perfil/remove-permiso`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }
}
