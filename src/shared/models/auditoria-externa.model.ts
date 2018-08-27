import { AuditoriaExternaListaPreguntaModel } from './auditoria-externa-lista-pregunta.model';

export interface AuditoriaExternaModel {
    id?: number;
    activo: boolean;
    fecha: number;
    id_proveedor: number;
    id_auditor_principal: number;
    id_auditor_apoyo: number;
    auditado: string;
    objetivo: string;
    alcance: string;
    normas: string;
    listas?: AuditoriaExternaListaPreguntaModel;
}
