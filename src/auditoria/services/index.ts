import { AdministradorListasService } from './administrador-listas/administrador-listas.service';
export * from './administrador-listas/administrador-listas.service';

import { DetalleAuditoriaExternaService } from './detalle-auditoria-externa/detalle-auditoria-externa.service';
export * from './detalle-auditoria-externa/detalle-auditoria-externa.service';

import { ListaAuditoriaExternaService } from './lista-auditoria-externa/lista-auditoria-externa.service';
export * from './lista-auditoria-externa/lista-auditoria-externa.service';

export const services: any[] = [
    AdministradorListasService,
    DetalleAuditoriaExternaService,
    ListaAuditoriaExternaService
];
