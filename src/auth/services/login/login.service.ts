import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';

//models
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    login(): Observable<UsuarioModel> {
        return this.http
            .get<UsuarioModel>(`${environment.apiUrl}/user`)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
