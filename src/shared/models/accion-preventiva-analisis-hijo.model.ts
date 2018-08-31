export interface AccionPreventivaAnalisisHijoModel {
    id?: number;
    id_accion_preventiva_analisis?: number;
    id_padre?: number;
    padre?: AccionPreventivaAnalisisHijoModel;
    pregunta_causa_idea?: string;
    respuestas?: string;
    contribuyo?: string;
    id_usuario?: number;
    fecha_creacion?: number;
    created_at?: number;
    updated_at?: number;
}
