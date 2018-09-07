import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { EpsModel } from "../../../shared/models/eps.model";
import { catchError } from "rxjs/operators";
import { PensionModel } from "../../../shared/models/pension.model";

@Injectable()

export class AdmPensionService{

    constructor(private http: HttpClient){}

    editPension(id: number,data: PensionModel){
        return this.http
        .post<PensionModel>(`${environment.apiUrl}/administracion/pension/update-pension/${id}`
        ,data).pipe(
            catchError((error: any) => throwError(error))
        );
    }

    getPensionesLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/pension/get-pension-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: PensionModel): Observable<PensionModel> {
        return this.http.delete<PensionModel>(
            `${environment.apiUrl}/administracion/pension/delete-pension/${event.id}`
        );
    }


   
}



