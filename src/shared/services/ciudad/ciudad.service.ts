import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { CiudadModel } from '../../../shared/models/ciudad.model';

@Injectable()
export class CiudadService {
    constructor(private http: HttpClient) {}

    getCiudades(): Observable<CiudadModel[]> {
        return this.http
            .get<CiudadModel[]>(
                `${environment.apiUrl}/ciudades`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
