import { UsuarioModel } from "./usuario.model";

export interface AccionCorrectivaTareaResponsableModel {
    id?: number;
    id_accion_correctiva_tarea: number;
    id_responsable: number;
    responsable?: UsuarioModel;
    id_usuario?: number;
    fecha_creacion?: number;
}
