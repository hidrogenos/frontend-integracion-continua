import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//environment
import { FacturtaProveedorModel } from '../../models/factura-proveedor.model';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProveedorFacturaService {
    constructor(private http: HttpClient) {}

    getProveedorFactura(id):Observable<FacturtaProveedorModel>{
        return this.http.get<FacturtaProveedorModel>(`${environment.apiUrl}/proveedor-facturas/${id}`)
        .pipe(
            map(response => this.transformResponseFactura(response)),
            catchError(error => throwError(error))
        )
    }

    transformResponseFactura(data: FacturtaProveedorModel): FacturtaProveedorModel {
        return {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };
    }

    transformRequestFactura(data: FacturtaProveedorModel): FacturtaProveedorModel {
        return {
            ...data,
            fecha_carga: data.fecha_carga / 1000
        };
    }

   

}
