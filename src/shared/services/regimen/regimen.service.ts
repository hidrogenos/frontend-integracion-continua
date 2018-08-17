import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { RegimenModel } from '../../../shared/models/regimen.model';

@Injectable()
export class RegimenService {
    constructor(private http: HttpClient) {}

    getRegimen(): Observable<RegimenModel[]> {
        return this.http
            .get<RegimenModel[]>(
                `${environment.apiUrl}/regimen`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
