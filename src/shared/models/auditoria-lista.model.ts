export interface ListaPreguntaModel {
    id?: number;
    nombre: string;
    activo: boolean;
    data?: ListaPreguntaDataModel;
}

export interface ListaPreguntaDataModel {
    titulos: ListaPreguntaDataTituloModel[];
}

export interface ListaPreguntaDataTituloModel {
    id: string;
    titulo: string;
    preguntas: ListaPreguntaDataPreguntaModel[];
}

export interface ListaPreguntaDataPreguntaModel {
    id: string;
    aspecto_evaluar: string;
    actividad_realizar: string;
    responsable: string;
    fecha: any;
    ponderado: number;
    resultado: boolean;
}
