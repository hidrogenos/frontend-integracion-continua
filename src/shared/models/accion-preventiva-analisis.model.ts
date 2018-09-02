import { AccionAnalisisTipoModel } from "./accion-analisis-tipo.model";
import { AccionPreventivaAnalisisHijoModel } from "./accion-preventiva-analisis-hijo.model";
import { AccionPreventivaAnalisisHijo5wsModel } from "./accion-preventiva-analisis-hijo-5ws";

export interface AccionPreventivaAnalisisModel {
    id?: number;
    id_accion_preventiva?: number;
    conclusiones?: number;
    observaciones?: string;
    id_usuario?: number;
    fecha_creacion?: number;
    id_accion_analisis_tipo: number;
    accion_analisis_tipo?: AccionAnalisisTipoModel;
    analisis_hijo?: AccionPreventivaAnalisisHijoModel[];
    analisis_hijo5ws?: AccionPreventivaAnalisisHijo5wsModel[];
}
