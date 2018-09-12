import { DepartamentoModel } from './departamento.model';

export interface PaisModel {
    id?: number;
    nombre: string;
    departamentos?: DepartamentoModel[];
}
