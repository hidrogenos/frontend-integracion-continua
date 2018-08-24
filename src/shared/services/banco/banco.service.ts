import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";
import { BancoModel } from "../../../shared/models/banco.model";

@Injectable()
export class BancoService {
    constructor(private http: HttpClient) {}

    getBancos(): Observable<BancoModel[]> {
        return this.http
            .get<BancoModel[]>(`${environment.apiUrl}/bancos`)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
