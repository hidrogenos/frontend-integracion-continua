import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from '../../../../node_modules/rxjs/operators';
import { throwError } from '../../../../node_modules/rxjs';

@Injectable()
export class PdfViewerService {
    constructor(private http: HttpClient) {}

    getManualCalidad(id: number) {
        return this.http
            .get(`${environment.apiUrl}/pdf-viewer/get-manual-calidad/${id}`, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }
}
