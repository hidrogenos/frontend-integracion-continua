import { environment } from '../../../environments/environment';
import { AccionCorrectivaModel } from '../../../shared/models/accion-correctiva.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AccionImportanciaModel } from '../../../shared/models/accion-importancia.model';
import { AccionCorrectivaEstadoModel } from '../../../shared/models/accion-correctiva-estado.model';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';
import { AccionCorrectivaService } from '../../../shared/services';

const url_Point_Api = "/acciones/acciones-correctivas";

@Injectable()
export class AccionesCorrectivasService {


    constructor( private http: HttpClient, private accionCorrectivaService: AccionCorrectivaService){
    }


    getAccionesCorrectivas(): Observable< AccionCorrectivaModel[]> {

        return this.http.get<AccionCorrectivaModel[]>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-acciones-correctivas`)
             .pipe(
                 catchError((error: any) => Observable.throw(error.json()))
            );
    }

    /**
     * @param data los campos necesarios para hacer un lazy loading
     * @return AccionCorrectivaModel[] lista de acciones correctivas preparada para mostrar al usuario
     */
    getLazyAccionesCorrectivas( data ): Observable<{ cantidad: number , data: AccionCorrectivaModel[]}> {

        return this.http.post<{ cantidad: number , data: AccionCorrectivaModel[]}>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-async-acciones-correctivas`, data)
             .pipe(
                map( (response) => {
                    return {cantidad: response.cantidad, data: response.data.map(accionCorrectiva => this.accionCorrectivaService.transformAccionCorrectiva(accionCorrectiva))}   
                }),
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

     getEstados(): Observable<AccionCorrectivaEstadoModel[]> {
         return this.http.get<AccionCorrectivaEstadoModel[]>(
            `${
                environment.apiUrl
            }${url_Point_Api}/get-estados`)
            .pipe(
                catchError((error: any) => Observable.throw(error.json()))
           );
     }


    // /** transforma y ajusta los cambios de un response a una accion correctiva */
    // transformResponseAccion(accionCorrectiva: AccionCorrectivaModel): AccionCorrectivaModel {
    //     return {
    //         ...accionCorrectiva,
    //         responsable : accionCorrectiva.responsable ?  accionCorrectiva.responsable.nombre : null,
    //         accion_estado : accionCorrectiva.accion_estado ? accionCorrectiva.accion_estado.nombre : null,
    //         importancia: accionCorrectiva.importancia ? accionCorrectiva.importancia.nombre : null

    //     }
    // }

}