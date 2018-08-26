import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    ListaPreguntaModel,
    ListaPreguntaDataModel
} from '../../../shared/models/auditoria-lista.model';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class AdministradorListasService {
    constructor(private http: HttpClient) {}

    createLista(data: ListaPreguntaModel): Observable<ListaPreguntaModel> {
        return this.http
            .post<ListaPreguntaModel>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/create-lista`,
                data
            )
            .pipe(catchError(error => throwError(error)));
    }

    getLista(id: number): Observable<ListaPreguntaModel> {
        return this.http
            .get<ListaPreguntaModel>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/get-lista/${id}`
            )
            .pipe(
                map(lista => {
                    return {
                        ...lista,
                        data: {
                            titulos: lista.data.titulos.map(t => {
                                return {
                                    id: t.id,
                                    titulo: t.titulo,
                                    preguntas: t.preguntas.map(p => {
                                        return {
                                            ...p,
                                            fecha: new Date(p.fecha)
                                        };
                                    })
                                };
                            })
                        }
                    };
                }),
                catchError(error => throwError(error))
            );
    }

    getListas(): Observable<ListaPreguntaModel[]> {
        return this.http
            .get<ListaPreguntaModel[]>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/get-listas`
            )
            .pipe(catchError(error => throwError(error)));
    }

    updateListaData(
        id: number,
        data: ListaPreguntaDataModel
    ): Observable<ListaPreguntaModel> {
        const aux: { data: ListaPreguntaDataModel } = {
            data: {
                titulos: data.titulos.map(t => {
                    return {
                        id: t.id,
                        titulo: t.titulo,
                        preguntas: t.preguntas.map(p => {
                            return {
                                ...p,
                                fecha: (p.fecha as Date).valueOf()
                            };
                        })
                    };
                })
            }
        };
        return this.http
            .post<ListaPreguntaModel>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/update-lista-data/${id}`,
                aux
            )
            .pipe(catchError(error => throwError(error)));
    }

    updateListaNombre(
        id: number,
        data: { nombre: string }
    ): Observable<ListaPreguntaModel> {
        return this.http
            .post<ListaPreguntaModel>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/update-lista-nombre/${id}`,
                data
            )
            .pipe(catchError(error => throwError(error)));
    }
}
