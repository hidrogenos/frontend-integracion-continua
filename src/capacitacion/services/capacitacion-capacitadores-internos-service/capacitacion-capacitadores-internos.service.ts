import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";
import { CapacitacionCapacitadorInternoService } from "../../../shared/services/capacitacion-capacitadores-internos-service/capacitacion-capacitador-interno.service";
import { CapacitacionCapacitadorInternoModel } from "../../../shared/models/capacitacion-capacitador-interno.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";

@Injectable()
export class CapacitacionCapacitadoresInternosService {
    constructor(
        private http: HttpClient,
        private capacitacionCI: CapacitacionCapacitadorInternoService
    ) {}

    createCapacitadorInterno(
        data: CapacitacionCapacitadorInternoModel[],
        id: number
    ): Observable<CapacitacionCapacitadorInternoModel[]> {
        data.forEach(ele => {
            this.capacitacionCI.transformRequestCapacitacionCI(ele);
        });
        return this.http
            .post<CapacitacionCapacitadorInternoModel[]>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-capacitadores/create-capacitador-interno/${id}`,
                data
            )
            .pipe(
                map(response => {
                    response.forEach(ele => {
                        this.capacitacionCI.transformResponseCapacitacionCI(
                            ele
                        );
                    });
                    return response;
                }),

                catchError(error => Observable.throw(error.json()))
            );
    }
    getCapacitadoresInternos(): Observable<UsuarioModel[]> {
        return this.http
            .get<UsuarioModel[]>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-capacitadores/get-capacitador-interno`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    updateCapacitadorInterno(
        id: number,
        data: CapacitacionCapacitadorInternoModel
    ): Observable<CapacitacionCapacitadorInternoModel> {
        data = this.capacitacionCI.transformRequestCapacitacionCI(data);

        return this.http.put<CapacitacionCapacitadorInternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-capacitadores/update-capacitador-interno/${id}`,
            data
        );
    }

    deleteCapacitadorInterno(
        id: number
    ): Observable<CapacitacionCapacitadorInternoModel> {
        return this.http.delete<CapacitacionCapacitadorInternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-capacitadores/delete-capacitador-interno/${id}`
        );
    }
}
