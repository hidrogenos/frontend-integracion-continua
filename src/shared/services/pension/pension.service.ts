import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EpsModel } from '../../models/eps.model';

//environment
import { environment } from '../../../environments/environment';
import { PensionModel } from '../../models/pension.model';

@Injectable()
export class PensionService {
    constructor(private http: HttpClient) {}

    createPension(eps: EpsModel): Observable<PensionModel> {
        return this.http
            .post<PensionModel>(`${environment.apiUrl}/pension`, eps)
            .pipe(catchError(error => Observable.throw(error.json())));
    }
    
}
