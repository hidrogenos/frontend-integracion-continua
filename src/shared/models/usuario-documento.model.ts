export interface UsuarioDocumentoModel {
    id?: number;
    id_usuario: number;
    titulo: string;
    path: string;
    extension: string;
    fecha_carga: number;
    activo: boolean;
}
