import { MapaProcesoHijoModel } from "./mapa_proceso_hijo.model";

export interface AccionPreventivaProcesoModel {
    id?: number;
    id_usuario?: number;
    id_mapa_procesos?: number;
    proceso?: MapaProcesoHijoModel;
    id_accion_preventiva?: number;
    fecha?: number;
}
