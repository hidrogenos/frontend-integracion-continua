import { DepartamentoModel } from './departamento.model';

export interface CiudadModel {
    id?: number;
    id_departamento: number;
    nombre: string;
    departamento?: DepartamentoModel;
}
