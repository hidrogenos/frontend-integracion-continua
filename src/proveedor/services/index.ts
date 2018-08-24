import { ProveedorListaService } from './proveedor-lista/proveedor-lista.service';
export * from './proveedor-lista/proveedor-lista.service';

import { EvaluacionService } from './evaluacion/evaluacion.service';
export * from './evaluacion/evaluacion.service';

import { FacturaService } from './factura/factura.service';
export * from './factura/factura.service';



export const services: any[] = [
    ProveedorListaService,
    EvaluacionService,
    FacturaService
];
