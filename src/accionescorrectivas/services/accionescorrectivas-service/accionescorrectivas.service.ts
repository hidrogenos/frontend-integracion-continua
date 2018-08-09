import { environment } from '../../../environments/environment';
import { AccionModel } from '../../../shared/models/accion.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AccionImportanciaModel } from '../../../shared/models/accion-importancia.model';
import { AccionProcesoModel } from '../../../shared/models/accion-proceso.model';
import { AccionEstadoModel } from '../../../shared/models/accion-estado.model';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';

const url_Point_Api = "/acciones/acciones-correctivas";

@Injectable()
export class AccionesCorrectivasService {


    constructor( private http: HttpClient){
    }


    getAccionesCorrectivas(): Observable< AccionModel[]> {

        return this.http.get<AccionModel[]>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-acciones-correctivas`)
             .pipe(
                 catchError((error: any) => Observable.throw(error.json()))
            );
    }

    /**
     * @param data los campos necesarios para hacer un lazy loading
     * @return AccionModel[] lista de acciones correctivas preparada para mostrar al usuario
     */
    getLazyAccionesCorrectivas( data ): Observable<{ cantidad: number , data: AccionModel[]}> {

        return this.http.post<{ cantidad: number , data: AccionModel[]}>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-async-acciones-correctivas`, data)
             .pipe(
                 catchError((error: any) => Observable.throw(error.json()))
            );
    }

    getImportancias(): Observable<AccionImportanciaModel[]>  {
        return this.http.get<AccionImportanciaModel[]>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-importancias`)
            .pipe(
                catchError((error: any) => Observable.throw(error.json()))
           );;
     }

    getProcesos(): Observable<MapaProcesoHijoModel[]>  {
        return this.http.get<MapaProcesoHijoModel[]>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-procesos`)
            .pipe(
                catchError((error: any) => Observable.throw(error.json()))
           );
     }

     getEstados(): Observable<AccionEstadoModel[]> {
         return this.http.get<AccionEstadoModel[]>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-estados`)
            .pipe(
                catchError((error: any) => Observable.throw(error.json()))
           );
     }


    // /** transforma y ajusta los cambios de un response a una accion correctiva */
    // transformResponseAccion(accionCorrectiva: AccionModel): AccionModel {
    //     return {
    //         ...accionCorrectiva,
    //         responsable : accionCorrectiva.responsable ?  accionCorrectiva.responsable.nombre : null,
    //         accion_estado : accionCorrectiva.accion_estado ? accionCorrectiva.accion_estado.nombre : null,
    //         importancia: accionCorrectiva.importancia ? accionCorrectiva.importancia.nombre : null

    //     }
    // }

}