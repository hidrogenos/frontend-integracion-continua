import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccionCorrectivaTareaAdjuntoModel } from "../../models/accion-correctiva-tarea-adjunto.model";

@Injectable()
export class AccionCorrectivaTareaAdjuntoService {
    constructor(private http: HttpClient) {}

    transformResponse(
        data: AccionCorrectivaTareaAdjuntoModel
    ): AccionCorrectivaTareaAdjuntoModel {
        return {
            ...data,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
