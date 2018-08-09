import { PermisoModel } from './permiso.model';

export interface ModuloModel {
    id?: number;
    modulo: string;
    orden: number;
    permisos?: PermisoModel[];
}
