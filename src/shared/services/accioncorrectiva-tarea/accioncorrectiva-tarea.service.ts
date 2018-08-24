import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AccionCorrectivaTareaModel } from "../../models/accion-correctiva-tarea.model";

@Injectable()
export class AccionCorrectivaTareaService {
    constructor(private http: HttpClient) {}

    transformResponse(
        data: AccionCorrectivaTareaModel
    ): AccionCorrectivaTareaModel {
        return {
            ...data,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_cumplimiento: data.fecha_cumplimiento * 1000
        };
    }
}
