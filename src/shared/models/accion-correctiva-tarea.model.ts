import { AccionCorrectivaTareaTipoModel } from "./accion-correctiva-tarea-tipo.model";
import { AccionCorrectivaModel } from "./accion-correctiva.model";
import { AccionCorrectivaTareaAdjuntoModel } from "./accion-correctiva-tarea-adjunto.model";
import { AccionCorrectivaTareaResponsableModel } from "./accion-correctiva-tarea-responsable.model";

export interface AccionCorrectivaTareaModel {
    id?: number,
    id_accion_correctiva: number
    id_accion_correctiva_tarea_tipo: number,
    prioridad: number,
    tarea: string,
    responsables_terceros?: string,
    fecha_cumplimiento?: number,
    realizada?: number,
    observaciones?: string,
    id_realizada_por?: number,
    id_usuario?: number,
    fecha_creacion?: number
    responsables?: AccionCorrectivaTareaResponsableModel[],
    tipo?: AccionCorrectivaTareaTipoModel,
    accion?: AccionCorrectivaModel,
    adjunto?: AccionCorrectivaTareaAdjuntoModel[]
}