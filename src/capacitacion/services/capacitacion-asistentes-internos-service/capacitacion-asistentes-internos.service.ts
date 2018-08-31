import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";
import { CapacitacionAsistenteInternoService } from "../../../shared/services/capacitacion-asistentes-interno-service/capacitacion-asistente-interno.service";
import { CapacitacionAsistenteInternoModel } from "../../../shared/models/capacitacion-asistente-interno.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";

@Injectable()
export class CapacitacionAsistentesInternosService {
    constructor(
        private http: HttpClient,
        private capacitacionAI: CapacitacionAsistenteInternoService
    ) {}

    createAsistenteInterno(
        data: CapacitacionAsistenteInternoModel[],
        id: number
    ): Observable<CapacitacionAsistenteInternoModel[]> {
        data.forEach(ele => {
            this.capacitacionAI.transformRequestCapacitacionAI(ele);
        });
        return this.http
            .post<CapacitacionAsistenteInternoModel[]>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-asistentes/create-asistente-interno/${id}`,
                data
            )
            .pipe(
                map(response => {
                    response.forEach(ele => {
                        this.capacitacionAI.transformResponseCapacitacionAI(
                            ele
                        );
                    });
                    return response;
                }),

                catchError(error => Observable.throw(error.json()))
            );
    }

    getAsistentesinternos(): Observable<UsuarioModel[]> {
        return this.http
            .get<UsuarioModel[]>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-asistentes/get-asistente-interno`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    updateAsistenteinterno(
        id: number,
        data: CapacitacionAsistenteInternoModel
    ): Observable<CapacitacionAsistenteInternoModel> {
        data = this.capacitacionAI.transformRequestCapacitacionAI(data);

        return this.http.put<CapacitacionAsistenteInternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-asistentes/update-asistente-interno/${id}`,
            data
        );
    }

    deleteAsistenteinterno(
        id: number
    ): Observable<CapacitacionAsistenteInternoModel> {
        return this.http.delete<CapacitacionAsistenteInternoModel>(
            `${
                environment.apiUrl
            }/capacitacion/capacitacion-asistentes/delete-asistente-interno/${id}`
        );
    }
}
