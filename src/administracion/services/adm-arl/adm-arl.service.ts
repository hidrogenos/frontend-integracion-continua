import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { ArlModel } from "../../../shared/models/arl.model";

@Injectable()

export class AdmArlService{

    constructor(private http: HttpClient){}
    
    editArl(id: number,data: ArlModel){
        return this.http
        .post<ArlModel>(`${environment.apiUrl}/administracion/arl/update-arl/${id}`
        ,data).pipe(
            catchError((error: any) => throwError(error))
        );
    }
    
    getArlLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/arl/get-arl-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: ArlModel): Observable<ArlModel> {
        return this.http.delete<ArlModel>(
            `${environment.apiUrl}/administracion/arl/delete-arl/${event.id}`
        );
    }
}