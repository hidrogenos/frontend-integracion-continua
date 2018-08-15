import { MapaProcesoHijoModel } from './mapa_proceso_hijo.model';

export interface CalidadMapaProcesoModel {
    id?: number;
    id_calidad: number;
    entrada: string;
    salida: string;
    descripcion: string;
    activo: boolean;
    procesos?: MapaProcesoHijoModel[];
}
