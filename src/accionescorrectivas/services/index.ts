import { AccionesCorrectivasService } from "./accionescorrectivas-service/accionescorrectivas.service";
export * from "./accionescorrectivas-service/accionescorrectivas.service";

import { AccionesCorrectivasProcesoService } from "./accionescorrectivas-panel/accionescorrectivas-proceso.service";
export * from "./accionescorrectivas-panel/accionescorrectivas-proceso.service";

import { AccionesCorrectivasDocumentoService } from "./accionescorrectivas-panel/accionescorrectivas-documento.service";
export * from "./accionescorrectivas-panel/accionescorrectivas-documento.service";

import { AccionesCorrectivasAnalisisService } from "./accionescorrectivas-panel/accionescorrectivas-analisis.service";
export * from "./accionescorrectivas-panel/accionescorrectivas-analisis.service";

import { AccionesCorrectivasTareaService } from "./accionescorrectivas-panel/accionescorrectivas-tarea.service";
export * from "./accionescorrectivas-panel/accionescorrectivas-tarea.service";

import { AccionesCorrectivasTareaAdjuntoService } from "./accionescorrectivas-panel/accionescorrectivas-tarea-adjunto.service";
export * from "./accionescorrectivas-panel/accionescorrectivas-tarea-adjunto.service";

export const container: any[] = [
    AccionesCorrectivasService,
    AccionesCorrectivasProcesoService,
    AccionesCorrectivasDocumentoService,
    AccionesCorrectivasAnalisisService,
    AccionesCorrectivasTareaService,
    AccionesCorrectivasTareaAdjuntoService
];
