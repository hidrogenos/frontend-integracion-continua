import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { CajaCompensacionModel } from '../../models/caja-compensacion.model';

@Injectable()
export class CajaCompensacionService {
    constructor(private http: HttpClient) {}

    createCajaCompensacion(cajaCompensacion: CajaCompensacionModel): Observable<CajaCompensacionModel> {
        console.log(cajaCompensacion)
        return this.http
            .post<CajaCompensacionModel>(`${environment.apiUrl}/caja-compensacion`, cajaCompensacion)
            .pipe(catchError(error => Observable.throw(error.json())));
    }
    
}
