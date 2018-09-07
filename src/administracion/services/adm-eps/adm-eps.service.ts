import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { EpsModel } from "../../../shared/models/eps.model";
import { catchError } from "rxjs/operators";

@Injectable()

export class AdmEpsService{

    constructor(private http: HttpClient){}

    editEps(id: number,data: EpsModel){
        return this.http
        .post<EpsModel>(`${environment.apiUrl}/administracion/eps/update-eps/${id}`
        ,data).pipe(
            catchError((error: any) => throwError(error))
        );
    }

    getEpsLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/eps/get-eps-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: EpsModel): Observable<EpsModel> {
        return this.http.delete<EpsModel>(
            `${environment.apiUrl}/administracion/eps/delete-eps/${event.id}`
        );
    }

   
}



