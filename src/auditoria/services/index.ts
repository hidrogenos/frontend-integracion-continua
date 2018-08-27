import { AdministradorListasService } from './administrador-listas/administrador-listas.service';
export * from './administrador-listas/administrador-listas.service';

import { ListaAuditoriaExternaService } from './lista-auditoria-externa/lista-auditoria-externa.service';
export * from './lista-auditoria-externa/lista-auditoria-externa.service';

export const services: any[] = [
    AdministradorListasService,
    ListaAuditoriaExternaService
];
