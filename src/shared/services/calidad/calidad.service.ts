import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CalidadModel } from '../../models/calidad.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CalidadService {
    constructor(private http: HttpClient) {}

    getCalidad(id: number): Observable<CalidadModel> {
        return this.http
            .get<CalidadModel>(`${environment.apiUrl}/calidades/${id}`)
            .pipe(catchError(error => throwError(error)));
    }
}
