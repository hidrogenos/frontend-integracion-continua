import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArlModel } from '../../models/arl.model';

//environment
import { environment } from '../../../environments/environment';

@Injectable()
export class ArlService {
    constructor(private http: HttpClient) {}

    createArl(arl: ArlModel): Observable<ArlModel> {
        return this.http
            .post<ArlModel>(`${environment.apiUrl}/arl`, arl)
            .pipe(catchError(error => Observable.throw(error.json())));
    }
    
}
