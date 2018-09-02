import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { TipoServicioModel } from '../../../shared/models/tipoServicio.model';

@Injectable()
export class TipoServicioService {
    constructor(private http: HttpClient) {}

    getTiposServicio(): Observable<TipoServicioModel[]> {
        return this.http
            .get<TipoServicioModel[]>(
                `${environment.apiUrl}/tipo-servicio`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
