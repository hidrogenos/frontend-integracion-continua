export interface CalidadOrganigramaModel {
    id?: number;
    id_calidad: number;
    id_padre: number;
    cargo: string;
    id_url_manual_funciones?: number;
    descripcion: string;
    activo: boolean;
}
