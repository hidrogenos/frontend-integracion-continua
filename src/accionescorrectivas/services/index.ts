import { AccionesCorrectivasService } from './accionescorrectivas-service/accionescorrectivas.service';
export * from './accionescorrectivas-service/accionescorrectivas.service';

import { AccionesCorrectivasProcesoService } from './accionescorrectivas-proceso-service/accionescorrectivas-proceso.service';
export * from './accionescorrectivas-proceso-service/accionescorrectivas-proceso.service';



export const container: any[] = [ AccionesCorrectivasService,
                                AccionesCorrectivasProcesoService ];