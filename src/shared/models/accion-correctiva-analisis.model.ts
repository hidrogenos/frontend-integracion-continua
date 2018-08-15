import { AccionAnalisisTipoModel } from "./accionAnalisisTipo.model";
import { AccionCorrectivaAnalisisHijoModel } from "./accion-correctiva-analisis-hijo.model";

export interface AccionCorrectivaAnalisisModel {
    id?: number,
    id_accion_correctiva?: number,
    conclusiones?: number,
    observaciones?: string,
    id_usuario?: number,
    fecha_creacion?: number,
    id_accion_analisis_tipo: number,
    accion_analisis_tipo?: AccionAnalisisTipoModel;
    analisis_hijo?: AccionCorrectivaAnalisisHijoModel[];
}