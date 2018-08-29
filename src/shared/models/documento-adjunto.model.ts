export interface DocumentoAdjuntoModel {
    id?: number;
    id_documento?: number;
    titulo?: string;
    codigo?: string;
    path?: string;
    extension?: string;
    fecha_carga?: number;
    activo?: boolean;
}