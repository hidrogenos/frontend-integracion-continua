import { UsuarioModel } from "./usuario.model";

export interface AccionPreventivaTareaResponsableModel {
    id?: number;
    id_accion_preventiva_tarea: number;
    id_responsable: number;
    responsable?: UsuarioModel;
    id_usuario?: number;
    fecha_creacion?: number;
}
