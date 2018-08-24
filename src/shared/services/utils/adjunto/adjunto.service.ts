import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AdjuntoService {
    constructor(private http: HttpClient) {}

    getAdjunto(data: { path: string }): Observable<Blob> {
        return this.http.post(`${environment.apiUrl}/utils/get-adjunto`, data, {
            responseType: 'blob'
        });
    }
}
