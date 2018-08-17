import { CiudadModel } from "./ciudad.model";
import { TipoIdentificacionModel } from "./tipo-identificacion.model";
import { RegimenModel } from "./regimen.model";
import { BancoModel } from "./banco.model";
import { TipoCuentaModel } from "./TipoCuenta.model";

export interface ProveedorModel {

    id?: number;
    nombre: string;
    identificacion_nit: number;
    fecha_inicio: number;
    id_ciudad?: number;
    direccion: string; 
    tel1: number;
    tel2: number;
    contacto1: string;
    email_contacto1 : string;
    contacto2: string;
    email_contacto2: string;
    representante_legal: string;
    id_tipo_identificacion_representante_legal?: number;
    identificacion_representante_legal: string;
    email_representante_legal: string;
    web: string;
    id_regimen?: number;
    producto_servicio: string;
    actividad: string;
    autoretenedor: string;
    grancontrib: string;
    id_banco?: number;
    tipo_cuenta?: string;
    cuenta: number;
    moneda: number;
    calificacion: number;
    activo: boolean;
    ciudades?: CiudadModel[];
    identificacion?: TipoIdentificacionModel[];
    regimen?: RegimenModel[];
    bancos?: BancoModel[];
    tipoCuenta?: TipoCuentaModel[];

}