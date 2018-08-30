import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccionPreventivaTareaAdjuntoModel } from "../../models/accion-preventiva-tarea-adjunto.model";

@Injectable()
export class AccionPreventivaTareaAdjuntoService {
    constructor(private http: HttpClient) {}

    transformResponse(
        data: AccionPreventivaTareaAdjuntoModel
    ): AccionPreventivaTareaAdjuntoModel {
        return {
            ...data,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
