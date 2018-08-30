import { AccionPreventivaDetalleService } from "./accion-preventiva-detalle/accion-preventiva-detalle.service";
export * from "./accion-preventiva-detalle/accion-preventiva-detalle.service";

import { AccionPreventivaListaService } from "./accion-preventiva-lista/accion-preventiva-lista.service";
export * from "./accion-preventiva-lista/accion-preventiva-lista.service";

export const container: any[] = [
    AccionPreventivaDetalleService,
    AccionPreventivaListaService
];
