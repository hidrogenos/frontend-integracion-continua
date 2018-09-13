import { UsuarioModel } from "./usuario.model";

export interface CapacitacionCapacitadorExternoModel {
    id?: number;
    id_capacitacion?: number;
    nombre_capacitador?: string;
    identificacion_capacitador?: number;
    calificacion?: number;
    id_usuario?: number;
    fecha?: number;
}
