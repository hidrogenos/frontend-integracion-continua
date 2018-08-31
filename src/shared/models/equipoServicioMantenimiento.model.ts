import { TipoServicioModel } from '../../shared/models/tipoServicio.model'
import { EquipoModel } from './equipo.model';

export interface EquipoServicioMantenimientoModel {
    id?: number;
    fecha_servicio?: number;
    fecha_proximo_servicio?: number;
    id_proveedor?: number;
    id_tipo_servicio?: number;
    descripcion?: string;
    id_equipo?: number;
    activo?: boolean;
    tipo_servicio?: TipoServicioModel[];
    equipo?: EquipoModel;


}
