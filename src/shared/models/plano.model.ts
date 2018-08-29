import { UsuarioModel } from "./usuario.model";

export interface PlanoModel{
    id?: number;
    nombre: string;
    descripcion: string;
    extension: string;
    path: string;
    fecha_carga: number;
    id_usuario_carga?: number;
    id_usuario_elimina?: number;
    fecha_elimina: number;
    activo: number;
    idUser?: UsuarioModel[];
}