import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccionPreventivaTareaModel } from "../../models/accion-preventiva-tarea.model";
import { AccionPreventivaAdjuntoModel } from "../../models/accion-preventiva-adjunto.model";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable()
export class AccionPreventivaTareaService {
    constructor(private http: HttpClient) {}

    transformResponse(
        data: AccionPreventivaTareaModel
    ): AccionPreventivaTareaModel {
        return {
            ...data,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_cumplimiento: data.fecha_cumplimiento * 1000
        };
    }
}
