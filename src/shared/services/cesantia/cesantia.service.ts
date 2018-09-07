import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArlModel } from '../../models/arl.model';
import { CesantiaModel } from '../../models/cesantia.model';

//environment
import { environment } from '../../../environments/environment';

@Injectable()
export class CesantiaService {
    constructor(private http: HttpClient) {}

    createCesantia(cesantia: CesantiaModel): Observable<CesantiaModel> {
        return this.http
            .post<CesantiaModel>(`${environment.apiUrl}/cesantia`, cesantia)
            .pipe(catchError(error => Observable.throw(error.json())));
    }
    
}
