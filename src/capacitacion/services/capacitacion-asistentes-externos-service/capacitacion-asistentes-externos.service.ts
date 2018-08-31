import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";
import { CapacitacionAsistenteExternoService } from "../../../shared/services/capacitacion-asistentes-externos-service/capacitacion-asistente-externo.service";
import { CapacitacionAsistenteExternoModel } from "../../../shared/models/capacitacion-asistente-externo.model";

@Injectable()
export class CapacitacionAsistentesExternosService {
    constructor(
        private http: HttpClient,
        private capacitacionAE: CapacitacionAsistenteExternoService
    ) {}

    createAsistenteExterno(
        data: CapacitacionAsistenteExternoModel,
        id: number
    ): Observable<CapacitacionAsistenteExternoModel> {
        data = this.capacitacionAE.transformRequestCapacitacionAE(data);
        return this.http
            .post<CapacitacionAsistenteExternoModel>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-asistentes/create-asistente-externo/${id}`,
                data
            )
            .pipe(
                map(response => {
                    return this.capacitacionAE.transformResponseCapacitacionAE(
                        response
                    );
                }),
                catchError(error => Observable.throw(error.json()))
            );
    }

    getAsistentesexternos(): Observable<CapacitacionAsistenteExternoModel> {
        return this.http
            .get<CapacitacionAsistenteExternoModel>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-asistentes/get-asistente-externo`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    updateAsistenteExterno(
        id: number,
        data: CapacitacionAsistenteExternoModel
    ): Observable<CapacitacionAsistenteExternoModel> {
        data = this.capacitacionAE.transformRequestCapacitacionAE(data);

        return this.http.put<CapacitacionAsistenteExternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-asistentes/update-asistente-externo/${id}`,
            data
        );
    }

    deleteAsistenteExterno(
        id: number
    ): Observable<CapacitacionAsistenteExternoModel> {
        return this.http.delete<CapacitacionAsistenteExternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-asistentes/delete-asistente-externo/${id}`
        );
    }
}
