import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { TipoIdentificacionModel } from '../../models/tipo-identificacion.model';

@Injectable()
export class TipoIdentificacionService {
    constructor(private http: HttpClient) {}

    getTiposIdentificacion(): Observable<TipoIdentificacionModel[]> {
        return this.http
            .get<TipoIdentificacionModel[]>(
                `${environment.apiUrl}/tiposidentificacion`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
