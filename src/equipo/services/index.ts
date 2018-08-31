import { EquipoCustomService } from './equipo.service';
export * from './equipo.service';

import { EquipoDocumentoService } from './equipo-documento.service';
export * from './equipo-documento.service';

import { EquipoServicioMantenimientoCustomService } from './equipo-servicio-mantenimiento-custom.service';
export * from './equipo-servicio-mantenimiento-custom.service';

import {  } from './'
export const services: any[] = [
    EquipoCustomService,
    EquipoDocumentoService,
    EquipoServicioMantenimientoCustomService
];
