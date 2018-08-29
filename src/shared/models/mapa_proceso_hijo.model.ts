import { UsuarioModel } from "./usuario.model";

export interface MapaProcesoHijoModel {
    id?: number;
    id_mapa_procesos: number;
    id_padre: number;
    proceso: string;
    codigo?: string;
    flecha: string;
    descripcion: string;
    activo: boolean;
    pivot?: any;
    id_jefe?: number;
    jefe?: UsuarioModel;
}
