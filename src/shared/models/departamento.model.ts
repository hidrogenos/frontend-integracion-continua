import { CiudadModel } from './ciudad.model';

export interface DepartamentoModel {
    id?: number;
    id_pais: number;
    nombre: string;
    ciudades: CiudadModel[];
}
