import { ProveedorModel } from "./proveedor.model";

export interface EvaluacionProveedorModel{
    id?: number;
    id_proveedor?: number;
    factura_servicio: string;
    calificacion: number;
    fecha_calificacion: number;
    observaciones: string;
    activo: boolean;
    proveedor?: ProveedorModel[];
}