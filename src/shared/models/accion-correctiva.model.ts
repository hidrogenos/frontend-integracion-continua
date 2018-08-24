import { AccionProcesoModel } from "./accion-proceso.model";
import { AccionImportanciaModel } from "./accion-importancia.model";
import { AccionCorrectivaAdjuntoModel } from "./accion-correctiva-adjunto.model";
import { AccionCorrectivaAnalisisModel } from "./accion-correctiva-analisis.model";
import { AccionCorrectivaTareaModel } from "./accion-correctiva-tarea.model";

export interface AccionCorrectivaModel {
    id?: number,
    codigo: string,
    titulo: string,
    descripcion: string,
    fecha_creacion?: number,
    fecha_compromiso?: number,
    fecha_inicio_analisis?: number,
    cierre_accion_fecha?: number,
    id_estado: number,
    accion_estado?: any,
    id_importancia: number,
    importancia?: AccionImportanciaModel,
    id_responsable?: number,
    responsable?: any,
    id_usuario_crea?: number
    procesos?: AccionProcesoModel[],
    documentos?: AccionCorrectivaAdjuntoModel[],
    metodologia_analisis?: AccionCorrectivaAnalisisModel,
    tareas?: AccionCorrectivaTareaModel[],
    observacion?: string
}