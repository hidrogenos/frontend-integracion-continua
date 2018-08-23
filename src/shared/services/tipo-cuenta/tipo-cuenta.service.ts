import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { TipoCuentaModel } from '../../../shared/models/TipoCuenta.model';

@Injectable()
export class TipoCuentaService {
    constructor(private http: HttpClient) {}

    getTiposCuentas(): Observable<TipoCuentaModel[]> {
        return this.http
            .get<TipoCuentaModel[]>(
                `${environment.apiUrl}/tipocuenta`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
