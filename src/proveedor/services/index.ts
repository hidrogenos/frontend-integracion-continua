import { ProveedorListaService } from './proveedor-lista/proveedor-lista.service';
export * from './proveedor-lista/proveedor-lista.service';

import { EvaluacionService } from './evaluacion-proveedor/evaluacion-proveedor.service';
export * from './evaluacion-proveedor/evaluacion-proveedor.service';

export const services: any[] = [
    ProveedorListaService,
    EvaluacionService
];
