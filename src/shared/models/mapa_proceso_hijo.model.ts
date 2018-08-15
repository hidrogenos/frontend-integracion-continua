export interface MapaProcesoHijoModel {
    id: number;
    id_mapa_procesos: number;
    id_padre: number;
    proceso: string;
    codigo?: string;
    fecha?: string;
    descripcion: string;
    activo: boolean;
}
