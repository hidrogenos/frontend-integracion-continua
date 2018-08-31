import { ProveedorModel } from "./proveedor.model";
import { EquipoAdjuntoModel } from "./equipo-adjunto.model";
import { EquipoServicioMantenimientoModel } from "./equipoServicioMantenimiento.model";

export interface EquipoModel{
    id?: number;
    nombre: string;
    grupo?: string;
    referencia: string;
    area: string;
    serial: string;
    marca: string; 
    software: string;
    observaciones: string;
    fecha_compra: number;
    fecha_calibracion: number;
    fecha_calificacion: number;
    fecha_metrologia: number;
    fecha_mantenimiento_preventivo: number;
    fecha_mantenimiento_correctivo: number;
    fecha_proxima_compra: number;
    fecha_proxima_calibracion: number;
    fecha_proxima_calificacion: number;
    fecha_proxima_metrologia: number;
    fecha_proximo_mantenimiento_preventivo: number;
    fecha_proximo_mantenimiento_correctivo: number;
    id_proveedor1?: number;
    id_proveedor2?: number;
    estado?: number;
    path_photo?: string;

    proveedor?: ProveedorModel[];
    documentos?: EquipoAdjuntoModel[];
    servicios?:EquipoServicioMantenimientoModel[];

}