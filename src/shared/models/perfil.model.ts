import { PermisoModel } from './permiso.model';

export interface PerfilModel {
    id?: number;
    nombre: string;
    estado: boolean;
    id_usuario_crea: number;
    fecha?: number;
    permisos?: PermisoModel[];
}
