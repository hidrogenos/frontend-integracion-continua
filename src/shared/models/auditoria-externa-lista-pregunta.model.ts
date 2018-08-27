import { ListaPreguntaDataModel } from './auditoria-lista.model';

export interface AuditoriaExternaListaPreguntaModel {
    id?: number;
    id_auditoria_externa: number;
    nombre: string;
    data: ListaPreguntaDataModel;
}
