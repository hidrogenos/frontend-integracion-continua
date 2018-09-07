import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PaisModel } from "../../models/pais.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable()

export class PaisService{
    constructor(
        private http: HttpClient
    ){}

    createPais(event: PaisModel): Observable<PaisModel>{
        return this.http.post<PaisModel>(`${environment.apiUrl}/pais`, event).pipe(
            catchError(error => Observable.throw(error.json())))
    }
}