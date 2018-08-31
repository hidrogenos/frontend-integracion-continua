import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccionPreventivaModel } from "../../models/accion-preventiva.model";
import { AccionPreventivaTareaModel } from "../../models/accion-preventiva-tarea.model";
import { AccionPreventivaTareaAdjuntoService } from "../accionpreventiva-tarea-adjunto/accionpreventiva-tarea-adjunto.service";
import { AccionPreventivaTareaService } from "../accionpreventiva-tarea/accionpreventiva-tarea.service";

@Injectable()
export class AccionPreventivaService {
    constructor(
        private http: HttpClient,
        private tareaAdjuntoService: AccionPreventivaTareaAdjuntoService,
        private accionPreventivaTareaService: AccionPreventivaTareaService
    ) {}

    transformAccionPreventiva(data: AccionPreventivaModel) {
        let tareas: AccionPreventivaTareaModel[] = data.tareas
            ? data.tareas.map(tareaActual => {
                  let tareaModificada: AccionPreventivaTareaModel = this.accionPreventivaTareaService.transformResponse(
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

        const accionPreventiva: AccionPreventivaModel = {
            ...data,
            tareas: tareas,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_inicio_analisis: data.fecha_inicio_analisis * 1000,
            cierre_accion_fecha: data.cierre_accion_fecha * 1000,
            fecha_compromiso: data.fecha_compromiso * 1000
        };
        return accionPreventiva;
    }
}
