import { AccionProcesoModel } from "./accion-proceso.model";

export interface AccionModel {
    id?: number,
    codigo: string,
    titulo: string,
    descripcion: string,
    fecha_creacion?: number,
    fecha_inicio_analisis?: number,
    cierre_accion_fecha?: number,
    id_estado: number,
    accion_estado?: any,
    id_importancia: number,
    importancia?: any,
    id_responsable?: number,
    responsable?: any,
    id_usuario_crea: number
    procesos?: AccionProcesoModel[],
}