import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";
import { CapacitacionCapacitadorExternService } from "../../../shared/services/capacitacion-capacitadores-externos-service/capacitacion-capacitador-externo.service";
import { CapacitacionCapacitadorExternoModel } from "../../../shared/models/capacitacion-capacitador-externo.model";

@Injectable()
export class CapacitacionCapacitadoresExternosService {
    constructor(
        private http: HttpClient,
        private capacitacionCE: CapacitacionCapacitadorExternService
    ) {}

    createCapacitadorExterno(
        data: CapacitacionCapacitadorExternoModel,
        id: number
    ): Observable<CapacitacionCapacitadorExternoModel> {
        data = this.capacitacionCE.transformRequestCapacitacionCE(data);
        return this.http
            .post<CapacitacionCapacitadorExternoModel>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-capacitadores/create-capacitador-externo/${id}`,
                data
            )
            .pipe(
                map(response => {
                    return this.capacitacionCE.transformResponseCapacitacionCE(
                        response
                    );
                }),
                catchError(error => Observable.throw(error.json()))
            );
    }

    getCapacitadoresExternos(): Observable<
        CapacitacionCapacitadorExternoModel
    > {
        return this.http
            .get<CapacitacionCapacitadorExternoModel>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-capacitadores/get-capacitador-externo`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    updateCapacitadorExterno(
        id: number,
        data: CapacitacionCapacitadorExternoModel
    ): Observable<CapacitacionCapacitadorExternoModel> {
        data = this.capacitacionCE.transformRequestCapacitacionCE(data);

        return this.http.put<CapacitacionCapacitadorExternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-capacitadores/update-capacitador-externo/${id}`,
            data
        );
    }

    deleteCapacitadorExterno(
        id: number
    ): Observable<CapacitacionCapacitadorExternoModel> {
        return this.http.delete<CapacitacionCapacitadorExternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-capacitadores/delete-capacitador-externo/${id}`
        );
    }
}
