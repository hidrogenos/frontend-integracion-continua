import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EpsModel } from '../../models/eps.model';

//environment
import { environment } from '../../../environments/environment';

@Injectable()
export class EpsService {
    constructor(private http: HttpClient) {}

    createEps(eps: EpsModel): Observable<EpsModel> {
        return this.http
            .post<EpsModel>(`${environment.apiUrl}/eps`, eps)
            .pipe(catchError(error => Observable.throw(error.json())));
    }
    
}
