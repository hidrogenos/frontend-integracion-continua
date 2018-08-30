import { AccionProcesoModel } from "./accion-proceso.model";
import { AccionImportanciaModel } from "./accion-importancia.model";
import { AccionPreventivaAdjuntoModel } from "./accion-preventiva-adjunto.model";
import { AccionPreventivaTareaModel } from "./accion-preventiva-tarea.model";

export interface AccionPreventivaModel {
    id?: number;
    codigo: string;
    titulo: string;
    descripcion: string;
    fecha_creacion?: number;
    fecha_compromiso?: number;
    fecha_inicio_analisis?: number;
    cierre_accion_fecha?: number;
    id_estado: number;
    accion_estado?: any;
    id_importancia: number;
    importancia?: AccionImportanciaModel;
    id_responsable?: number;
    responsable?: any;
    id_usuario_crea?: number;
    procesos?: AccionProcesoModel[];
    documentos?: AccionPreventivaAdjuntoModel[];
    tareas?: AccionPreventivaTareaModel[];
    observacion?: string;
}
