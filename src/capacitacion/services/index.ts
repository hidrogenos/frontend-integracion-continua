import { CapacitacionesService } from "./capacitaciones-service/capacitaciones.service";
export * from "./capacitaciones-service/capacitaciones.service";

import { CapacitacionAsistentesExternosService } from "./capacitacion-asistentes-externos-service/capacitacion-asistentes-externos.service";
export * from "./capacitacion-asistentes-externos-service/capacitacion-asistentes-externos.service";

import { CapacitacionAsistentesInternosService } from "./capacitacion-asistentes-internos-service/capacitacion-asistentes-internos.service";
export * from "./capacitacion-asistentes-internos-service/capacitacion-asistentes-internos.service";

import { CapacitacionCapacitadoresExternosService } from "./capacitacion-capacitadores-externos-service/capacitacion-capacitadores-externos.service";
export * from "./capacitacion-capacitadores-externos-service/capacitacion-capacitadores-externos.service";

import { CapacitacionCapacitadoresInternosService } from "./capacitacion-capacitadores-internos-service/capacitacion-capacitadores-internos.service";
export * from "./capacitacion-capacitadores-internos-service/capacitacion-capacitadores-internos.service";

import { DocumentacionCapacitacionService } from "./documentacion-capacitacion-service/documentacion-capacitacion.service";
export * from "./documentacion-capacitacion-service/documentacion-capacitacion.service";

export const services: any[] = [
    CapacitacionesService,
    CapacitacionAsistentesExternosService,
    CapacitacionAsistentesInternosService,
    CapacitacionCapacitadoresExternosService,
    CapacitacionCapacitadoresInternosService,
    DocumentacionCapacitacionService
];
