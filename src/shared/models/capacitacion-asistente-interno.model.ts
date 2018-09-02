import { UsuarioModel } from "./usuario.model";

export interface CapacitacionAsistenteInternoModel {
    id?: number;
    id_capacitacion?: number;
    nombre_asistente?: string;
    identificacion_asistente?: number;
    calificacion?: number;
    id_usuario?: number;
    usuario?: UsuarioModel;
    fecha?: number;
}
