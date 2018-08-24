import { AccionAnalisisTipoModel } from "./accion-analisis-tipo.model";
import { AccionCorrectivaAnalisisHijoModel } from "./accion-correctiva-analisis-hijo.model";
import { AccionCorrectivaAnalisisHijo5wsModel } from "./accion-correctiva-analisis-hijo-5ws";

export interface AccionCorrectivaAnalisisModel {
    id?: number;
    id_accion_correctiva?: number;
    conclusiones?: number;
    observaciones?: string;
    id_usuario?: number;
    fecha_creacion?: number;
    id_accion_analisis_tipo: number;
    accion_analisis_tipo?: AccionAnalisisTipoModel;
    analisis_hijo?: AccionCorrectivaAnalisisHijoModel[];
    analisis_hijo5ws?: AccionCorrectivaAnalisisHijo5wsModel[];
}
