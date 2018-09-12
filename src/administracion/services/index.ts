import { AdmArlService } from './adm-arl/adm-arl.service';
export * from './adm-arl/adm-arl.service';

import { AdmEpsService } from './adm-eps/adm-eps.service';
export * from './adm-eps/adm-eps.service';

import { AdmPensionService } from './adm-pension/adm-pension.service';
export * from './adm-pension/adm-pension.service';

import { AdmCesantiaService } from './adm-cesantia/adm-cesantia.service';
export * from './adm-cesantia/adm-cesantia.service';

import { AdmCajaCompensacionSevice } from './adm-caja-compensacion/adm-caja-compensacion.service';
export * from './adm-caja-compensacion/adm-caja-compensacion.service';

import { AdmPaisService } from './adm-pais/adm-pais.service';
export * from './adm-pais/adm-pais.service';

import { AdmDepartamentoService } from './adm-departamento/adm-departamento.service';
export * from './adm-departamento/adm-departamento.service';

import { AdmCiudadService } from './adm-ciudad/adm-ciudad.service';
export * from './adm-ciudad/adm-ciudad.service';
 
import { ColaboradorDetalleService } from './colaborador-detalle/colaborador-detalle.service';
export * from './colaborador-detalle/colaborador-detalle.service';

import { ColaboradoresListaService } from './colaboradores-lista/colaboradores-lista.service';
export * from './colaboradores-lista/colaboradores-lista.service';

import { PermisosService } from './permisos/permisos.service';
export * from './permisos/permisos.service';

export const services: any[] = [
    AdmCesantiaService,
    AdmArlService,
    AdmEpsService,
    AdmPensionService,
    AdmCajaCompensacionSevice,
    AdmPaisService,
    AdmDepartamentoService,
    AdmCiudadService,
    ColaboradorDetalleService,
    ColaboradoresListaService,
    PermisosService
];
