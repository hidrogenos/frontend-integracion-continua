export interface AccionCorrectivaAnalisisHijoModel {
    id?: number,
    id_accion_correctiva_analisis: number,
    id_padre: number,
    padre?: AccionCorrectivaAnalisisHijoModel,
    pregunta_causa_idea: string,
    respuestas: string,
    contribuyo: string,
    id_usuario?: number,
    fecha_creacion?: number
}