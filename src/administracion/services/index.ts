import { ColaboradorDetalleService } from './colaborador-detalle/colaborador-detalle.service';
export * from './colaborador-detalle/colaborador-detalle.service';

import { ColaboradoresListaService } from './colaboradores-lista/colaboradores-lista.service';
export * from './colaboradores-lista/colaboradores-lista.service';

import { PermisosService } from './permisos/permisos.service';
export * from './permisos/permisos.service';

import { ProveedorListaService } from  './proveedor-lista/proveedor-lista.service';
export * from './proveedor-lista/proveedor-lista.service';

export const services: any[] = [
    ColaboradorDetalleService,
    ColaboradoresListaService,
    PermisosService,
    ProveedorListaService
];
