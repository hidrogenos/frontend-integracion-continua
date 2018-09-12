import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartamentoModel } from '../../models/departamento.model';

//environment
import { environment } from '../../../environments/environment';

@Injectable()
export class DepartamentoService {
    constructor(private http: HttpClient) {}

    createDepartamento(departamento: DepartamentoModel): Observable<DepartamentoModel> {
        return this.http
            .post<DepartamentoModel>(`${environment.apiUrl}/departamento`, departamento)
            .pipe(catchError(error => Observable.throw(error.json())));
    }
    
}
