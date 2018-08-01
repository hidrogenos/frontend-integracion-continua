import { Http, RequestOptions, Headers} from '@angular/http';
import { environment } from '../../../environments/environment';
import { AccionModel } from '../../../shared/models/accion/accion.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'



@Injectable()
export class AccionesCorrectivasService {

    // header de la petición
    headers: Headers;

    // sesión activa del usuario, para poder realizar una petición
    requestOptions: RequestOptions;

    constructor( private http: Http){
    }

    /**
     * @param data los campos necesarios para hacer un lazy loading
     * @return AccionModel[] lista de acciones correctivas preparada para mostrar al usuario
     */
    // getLazyAccionesCorrectivas( data ): Observable< { cantidad: number , data: AccionModel[] } > {

    //     return this.http.post< { cantidad: number , data: AccionModel[] }>(`${environment.apiUrl}/acciones-correctivas-v2/get-lazy-all-acciones-correctivas`, data);
    
    //         //.catch((error: any) => Observable.throw(error.json()));

    // }

    getLazyAccionesCorrectivas(data) {
        return this.http.post(`${environment.apiUrl}/acciones-correctivas-v2/get-lazy-all-acciones-correctivas`, data);
    }

    /** transforma y ajusta los cambios de un response a una accion correctiva */
    transformResponseAccion(accionCorrectiva: AccionModel): AccionModel {
        return {
            ...accionCorrectiva,
            responsable : accionCorrectiva.responsable ?  accionCorrectiva.responsable.nombre : null,
            accion_estado : accionCorrectiva.accion_estado ? accionCorrectiva.accion_estado.nombre : null,
            importancia: accionCorrectiva.importancia ? accionCorrectiva.importancia.nombre : null

        }
    }

}