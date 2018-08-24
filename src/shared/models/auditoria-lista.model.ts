export interface AuditoriaListaModel {
    id?: number;
    nombre: string;
    activo: boolean;
    data?: AuditoriaListaDataModel;
}

export interface AuditoriaListaDataModel {
    titulos: AuditoriaListaDataTituloModel[];
}

export interface AuditoriaListaDataTituloModel {
    id: string;
    titulo: string;
    preguntas: AuditoriaListaDataPreguntaModel[];
}

export interface AuditoriaListaDataPreguntaModel {
    id: string;
    aspecto_evaluar: string;
    actividad_realizar: string;
    responsable: string;
    fecha: number;
}
