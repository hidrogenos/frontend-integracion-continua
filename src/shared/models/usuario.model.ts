import { TipoIdentificacionModel } from "./tipo-identificacion.model";
import { PerfilModel } from "./perfil.model";
import { CalidadOrganigramaModel } from "./calidad-organigrama.model";
import { CiudadModel } from "./ciudad.model";
import { EpsModel } from "./eps.model";
import { ArlModel } from "./arl.model";
import { PensionModel } from "./pension.model";
import { CesantiaModel } from "./cesantia.model";
import { CajaCompensacionModel } from "./caja-compensacion.model";
import { UsuarioDestrezaModel } from "./usuario-destreza.model";
import { UsuarioDocumentoModel } from "./usuario-documento.model";

export interface UsuarioModel {
    id?: number;
    nombre: string;
    apellido: string;
    id_tipo_identificacion: number;
    identificacion: string;
    email: string;
    login: string;
    password?: string;
    id_perfil: number;
    activo: boolean;
    id_cargo: number;
    es_jefe: boolean;
    es_auditor: boolean;
    fecha_ingreso: number;
    id_ciudad: number;
    telefono: number;
    direccion: string;
    profesion: string;
    id_eps: number;
    id_arl: number;
    id_pension: number;
    id_cesantia: number;
    id_caja_compensacion: number;
    url_foto?: string;
    tipo_identificacion?: TipoIdentificacionModel;
    perfil?: PerfilModel;
    cargo?: CalidadOrganigramaModel;
    ciudad?: CiudadModel;
    eps?: EpsModel;
    arl?: ArlModel;
    pension?: PensionModel;
    cesantia?: CesantiaModel;
    caja_compensacion?: CajaCompensacionModel;
    destrezas?: UsuarioDestrezaModel[];
    documentos?: UsuarioDocumentoModel[];
}
