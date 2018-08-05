import { CiudadModel } from './ciudad.model';
import { PaisModel } from './pais.model';

export interface DepartamentoModel {
    id?: number;
    id_pais: number;
    nombre: string;
    ciudades?: CiudadModel[];
    pais?: PaisModel;
}
