import { UsuarioModel } from './usuario.model';
import { MapaProcesoHijoModel } from './mapa_proceso_hijo.model';
import { DocumentoEstadoModel } from './documento-estado.model';
import { DocumentoAdjuntoModel } from './documento-adjunto.model';
import { DocumentoAsociadoModel } from './documento-asociado.model';
import { DocumentoDivulgacionRegistroModel } from './documento-divulgacion-registro.model';
import { DocumentoTipoModel } from './documento-tipo.model';

export interface DocumentoModel {
    id?: number;
    codigo?: string;
    titulo?: string;
    id_tipo?: number;
    id_estado?: number;
    id_responsable_crea?: number;
    id_responsable_elabora?: number;
    id_responsable_revisa?: number;
    id_responsable_aprueba?: number;
    version?: number;
    descripcion?: string;
    documento?: string;
    fecha_divulgacion?: number;
    divulgacion_observacion?: string;
    fecha_inicio?: number;
    fecha_fin?: number;

    responsable_elaboracion?: UsuarioModel;
    responsable_revision?: UsuarioModel;
    responsable_aprobacion?: UsuarioModel;
    procesos?: MapaProcesoHijoModel[];
    estado?: DocumentoEstadoModel;
    adjuntos?: DocumentoAdjuntoModel[];
    documentos_asociados?: DocumentoModel[];
    divulgacion_registros?: DocumentoDivulgacionRegistroModel[];
    tipo_documento?: DocumentoTipoModel;
}
