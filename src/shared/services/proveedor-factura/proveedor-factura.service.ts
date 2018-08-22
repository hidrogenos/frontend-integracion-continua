import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//environment
import { FacturtaProveedorModel } from '../../models/factura-proveedor.model';

@Injectable()
export class FacturaProveedorService {
    constructor(private http: HttpClient) {}

    transformResponse(data: FacturtaProveedorModel): FacturtaProveedorModel {
        return {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
