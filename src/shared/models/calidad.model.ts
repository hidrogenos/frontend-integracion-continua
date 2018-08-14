import { CalidadOrganigramaModel } from './calidad-organigrama.model';

export interface CalidadModel {
    id?: number;
    empresa_nombre: string;
    empresa_logo: string;
    mision: string;
    vision: string;
    politica: string;
    valores: string;
    url_manual: string;
    calidad_organigrama?: CalidadOrganigramaModel[];
}
