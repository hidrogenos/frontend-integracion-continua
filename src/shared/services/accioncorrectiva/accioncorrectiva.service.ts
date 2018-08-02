import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const url_Point_Api = "/acciones-correctivas";

//environment
import { environment } from '../../../environments/environment';

// modelo del servicio
import { AccionModel } from "../../models/accion.model";

@Injectable()
export class AccionCorrectivaService {
    
    constructor(private http: HttpClient){        
    }

    createAccionCorrectiva( data:AccionModel ) : Observable<AccionModel> {   
        return this.http.post<AccionModel>(`${environment.apiUrl}${url_Point_Api}` ,data)
        // .pipe(
        //     catchError((error:any) => Observable.throw(error.json()))
        // );
    }

    updateAccionCorrectiva( data:AccionModel ) : Observable<AccionModel> {      
        return this.http.put<AccionModel>(`${environment.apiUrl}${url_Point_Api}` ,data)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    } 
}

