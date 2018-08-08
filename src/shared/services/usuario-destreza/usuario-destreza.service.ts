import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//environment
import { environment } from '../../../environments/environment';
import { UsuarioDestrezaModel } from '../../models/usuario-destreza.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UsuarioDestrezaService {
    constructor(private http: HttpClient) {}

    create(destreza: UsuarioDestrezaModel): Observable<UsuarioDestrezaModel> {
        return this.http
            .post<UsuarioDestrezaModel>(
                `${environment.apiUrl}/usuario-destrezas`,
                destreza
            )
            .pipe(catchError((error: any) => throwError(error)));
    }
}
