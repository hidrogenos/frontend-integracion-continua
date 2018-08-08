import { UsuarioDestrezaDocumentoModel } from './usuario-destreza-documento.model';

export interface UsuarioDestrezaModel {
    id?: number;
    id_usuario: number;
    destreza: string;
    calificacion: string;
    descripcion: string;
    activo: boolean;
    documentos?: UsuarioDestrezaDocumentoModel[];
}
