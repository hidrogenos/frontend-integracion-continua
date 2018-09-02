import { ProveedorModel } from "./proveedor.model";

export interface EquipoAdjuntoModel{
    id?: number;
    id_equipo: number;
    titulo: string;
    codigo: string;
    path?: string,
    extension?: string,
    fecha_carga: number,
    activo: number;
    activo_check: boolean;
}