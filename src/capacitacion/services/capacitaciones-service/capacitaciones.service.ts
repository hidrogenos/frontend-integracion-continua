import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { CapacitacionModel } from "../../../shared/models/capacitacion.model";
import { CapacitacionService } from "../../../shared/services/capacitacion/capacitacion.service";
import { CapacitacionProcesoModel } from "../../../shared/models/capacitacion-proceso.model";

@Injectable()
export class CapacitacionesService {
    constructor(
        private http: HttpClient,
        private capacitacionService: CapacitacionService
    ) {}

    getProcesos(): Observable<MapaProcesoHijoModel[]> {
        return this.http
            .get<MapaProcesoHijoModel[]>(
                `${environment.apiUrl}/capacitacion/get-procesos`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    createCapacitacion(data: CapacitacionModel): Observable<CapacitacionModel> {
        data = this.capacitacionService.transformRequestCapacitacion(data);
        return this.http
            .post<CapacitacionModel>(
                `${environment.apiUrl}/capacitacion/create-capacitacion`,
                data
            )
            .pipe(
                map(response => {
                    return this.capacitacionService.transformResponseCapacitacion(
                        response
                    );
                })
            );
    }

    getCapacitaciones(): Observable<CapacitacionModel[]> {
        return this.http
            .get<CapacitacionModel[]>(
                `${environment.apiUrl}/capacitacion/get-capacitaciones`
            )
            .pipe(
                map(response => {
                    return response.map(ele =>
                        this.capacitacionService.transformResponseCapacitacion(
                            ele
                        )
                    );
                }),
                catchError(error => Observable.throw(error.json()))
            );
    }
    getCapacitacionesLazy(
        data
    ): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/capacitacion/get-capacitaciones-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(data: CapacitacionModel): Observable<CapacitacionModel> {
        return this.http.delete<CapacitacionModel>(
            `${environment.apiUrl}/capacitacion/delete-capacitacion/${data.id}`
        );
    }

    onUpdate(
        id: number,
        data: CapacitacionModel
    ): Observable<CapacitacionModel> {
        data = this.capacitacionService.transformRequestCapacitacion(data);

        return this.http
            .put<CapacitacionModel>(
                `${environment.apiUrl}/capacitacion/update-capacitacion/${id}`,
                data
            )
            .pipe(
                map(response =>
                    this.capacitacionService.transformResponseCapacitacion(
                        response
                    )
                )
            );
    }

    getCapacitacion(id): Observable<CapacitacionModel> {
        return this.http
            .get<CapacitacionModel>(
                `${
                    environment.apiUrl
                }/capacitacion/get-detalle-capacitacion/${id}`
            )
            .pipe(
                map(response => {
                    let capacitacion = this.capacitacionService.transformResponseCapacitacion(
                        response
                    );
                    return capacitacion;
                }),
                catchError(error => Observable.throw(error.json()))
            );
    }

    getProcesoNoAsociados(): Observable<CapacitacionProcesoModel> {
        return this.http
            .get<CapacitacionProcesoModel>(
                `${environment.apiUrl}/capacitacion/get-proceso-hijo`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    addProcesoCapacitacion(
        id: number,
        data
    ): Observable<MapaProcesoHijoModel[]> {
        return this.http.post<MapaProcesoHijoModel[]>(
            `${environment.apiUrl}/capacitacion/add-proceso-capacitacion/${id}`,
            data
        );
    }

    openCapacitacionEstado(id, data) {
        return this.http.post<CapacitacionModel>(
            `${environment.apiUrl}/capacitacion/open-capacitacion/${id}`,
            data
        );
    }

    closeCapacitacionEstado(id, data) {
        return this.http.post<CapacitacionModel>(
            `${environment.apiUrl}/capacitacion/close-capacitacion/${id}`,
            data
        );
    }
}
