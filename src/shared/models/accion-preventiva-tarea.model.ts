import { AccionPreventivaTareaResponsableModel } from "./accion-preventiva-tarea-responsable.model";
import { AccionPreventivaTareaTipoModel } from "./accion-preventiva-tarea-tipo.model";
import { AccionPreventivaTareaAdjuntoModel } from "./accion-preventiva-tarea-adjunto.model";
import { AccionPreventivaModel } from "./accion-preventiva.model";

export interface AccionPreventivaTareaModel {
    id?: number;
    id_accion_preventiva: number;
    id_accion_preventiva_tarea_tipo: number;
    prioridad: number;
    tarea: string;
    responsables_terceros?: string;
    fecha_cumplimiento?: number;
    realizada?: number;
    observaciones?: string;
    id_realizada_por?: number;
    id_usuario?: number;
    fecha_creacion?: number;
    responsables?: AccionPreventivaTareaResponsableModel[];
    tipo?: AccionPreventivaTareaTipoModel;
    accion?: AccionPreventivaModel;
    adjunto?: AccionPreventivaTareaAdjuntoModel[];
}
