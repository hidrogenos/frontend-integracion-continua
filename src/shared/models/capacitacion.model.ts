import { MapaProcesoHijoModel } from "./mapa_proceso_hijo.model";
import { CapacitacionAsistenteExternoModel } from "./capacitacion-asistente-externo.model";
import { CapacitacionAsistenteInternoModel } from "./capacitacion-asistente-interno.model";
import { CapacitacionCapacitadorExternoModel } from "./capacitacion-capacitador-externo.model";
import { CapacitacionCapacitadorInternoModel } from "./capacitacion-capacitador-interno.model";
import { CapacitacionAdjuntoModel } from "./capacitacion-adjunto.model";

export interface CapacitacionModel {
    id?: number;
    fecha_inicio?: number;
    fecha_fin?: number;
    cantidad_asistentes?: number;
    tema: string;
    objetivo: string;
    lugar: string;
    observaciones: string;
    id_usuario?: number;
    fecha?: number;
    procesos?: MapaProcesoHijoModel[];
    asistentes_externos?: CapacitacionAsistenteExternoModel[];
    asistentes_internos?: CapacitacionAsistenteInternoModel[];
    capacitadores_externos?: CapacitacionCapacitadorExternoModel[];
    capacitadores_internos?: CapacitacionCapacitadorInternoModel[];
    documentos?: CapacitacionAdjuntoModel[];
}
