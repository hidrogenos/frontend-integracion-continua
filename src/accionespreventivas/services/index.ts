import { AccionesPreventivasDocumentoService } from "./accionescorrectivas-documento.service";
export * from "./accionescorrectivas-documento.service";

import { AccionesPreventivasProcesoService } from "./accionescorrectivas-proceso.service";
export * from "./accionescorrectivas-proceso.service";

import { AccionesPreventivasTareaAdjuntoService } from "./accionescorrectivas-tarea-adjunto.service";
export * from "./accionescorrectivas-tarea-adjunto.service";

import { AccionesPreventivasTareaService } from "./accionescorrectivas-tarea.service";
export * from "./accionescorrectivas-tarea.service";

export const container: any[] = [
    AccionesPreventivasDocumentoService,
    AccionesPreventivasProcesoService,
    AccionesPreventivasTareaAdjuntoService,
    AccionesPreventivasTareaService
];
