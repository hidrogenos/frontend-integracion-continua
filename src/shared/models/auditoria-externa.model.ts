import { AuditoriaExternaListaPreguntaModel } from './auditoria-externa-lista-pregunta.model';
import { UsuarioModel } from './usuario.model';
import { ProveedorModel } from './proveedor.model';
import { AuditoriaExternaEstadoModel } from './auditoria-externa-estado.model';

export interface AuditoriaExternaModel {
    id?: number;
    id_estado?: number;
    activo?: boolean;
    fecha?: number;
    id_proveedor?: number;
    id_auditor_principal?: number;
    id_auditor_apoyo?: number;
    auditado?: string;
    objetivo?: string;
    alcance?: string;
    normas?: string;
    listas?: AuditoriaExternaListaPreguntaModel;
    auditor_principal?: UsuarioModel;
    auditor_apoyo?: UsuarioModel;
    proveedor?: ProveedorModel;
    estado?: AuditoriaExternaEstadoModel;
    fecha_reunion?: number;
    conclusion?: string;
    fortaleza?: string;
    observacion?: string;}
