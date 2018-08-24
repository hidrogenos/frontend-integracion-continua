import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

const url_Point_Api = "/acciones-correctivas";

//environment
import { environment } from "../../../environments/environment";

// modelo del servicio
import { AccionCorrectivaModel } from "../../models/accion-correctiva.model";
import { AccionCorrectivaTareaService } from "../accioncorrectiva-tarea/accioncorrectiva-tarea.service";
import { AccionesCorrectivasTareaAdjuntoService } from "../../../accionescorrectivas/services";
import { query } from "@angular/animations";
import { AccionCorrectivaTareaModel } from "../../models/accion-correctiva-tarea.model";
import { AccionCorrectivaTareaAdjuntoService } from "../accioncorrectiva-tarea-adjunto/accioncorrectiva-tarea-adjunto.service";

@Injectable()
export class AccionCorrectivaService {
    constructor(
        private http: HttpClient,
        private accionCorrectivaTareaService: AccionCorrectivaTareaService,
        private tareaAdjuntoService: AccionCorrectivaTareaAdjuntoService
    ) {}

    createAccionCorrectiva(
        data: AccionCorrectivaModel
    ): Observable<AccionCorrectivaModel> {
        return this.http
            .post<AccionCorrectivaModel>(
                `${environment.apiUrl}${url_Point_Api}`,
                data
            )
            .pipe(
                map(response => this.transformAccionCorrectiva(response)),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    updateAccionCorrectiva(
        data: AccionCorrectivaModel
    ): Observable<AccionCorrectivaModel> {
        return this.http
            .put<AccionCorrectivaModel>(
                `${environment.apiUrl}${url_Point_Api}/${data.id}`,
                data
            )
            .pipe(
                map(response => this.transformAccionCorrectiva(response)),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    deleteAccionCorrectiva(
        data: AccionCorrectivaModel
    ): Observable<AccionCorrectivaModel> {
        return this.http
            .delete<AccionCorrectivaModel>(
                `${environment.apiUrl}${url_Point_Api}/${data.id}`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getAccionCorrectiva(id: number): Observable<AccionCorrectivaModel> {
        return this.http
            .get<AccionCorrectivaModel>(
                `${environment.apiUrl}${url_Point_Api}/${id}`
            )
            .pipe(
                map(response => this.transformAccionCorrectiva(response)),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    transformAccionCorrectiva(data: AccionCorrectivaModel) {
        let tareas: AccionCorrectivaTareaModel[] = data.tareas
            ? data.tareas.map(tareaActual => {
                  let tareaModificada: AccionCorrectivaTareaModel = this.accionCorrectivaTareaService.transformResponse(
                      tareaActual
                  );
                  tareaModificada.adjunto = tareaModificada.adjunto.map(
                      tareaModificadaAct =>
                          this.tareaAdjuntoService.transformResponse(
                              tareaModificadaAct
                          )
                  );
                  return tareaModificada;
              })
            : data.tareas;

        const accionCorrectiva: AccionCorrectivaModel = {
            ...data,
            tareas: tareas,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_inicio_analisis: data.fecha_inicio_analisis * 1000,
            cierre_accion_fecha: data.cierre_accion_fecha * 1000,
            fecha_compromiso: data.fecha_compromiso * 1000
        };
        return accionCorrectiva;
    }
}
