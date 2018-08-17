import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

@Injectable()
export class ProveedorService {
    constructor(private http: HttpClient) {}

    getProveedores(): Observable<ProveedorModel[]> {
        return this.http
            .get<ProveedorModel[]>(`${environment.apiUrl}/proveedores`)
            .pipe(catchError(error => Observable.throw(error.json())));
    }

    createProveedor(proveedor: ProveedorModel): Observable<ProveedorModel> {
        return this.http
            .post<ProveedorModel>(`${environment.apiUrl}/proveedores`, proveedor)
            .pipe(catchError(error => Observable.throw(error.json())));
    }

    editProveedor(proveedor: ProveedorModel): Observable<ProveedorModel>{
        console.log(proveedor.id)
        return this.http.put<ProveedorModel>(`${environment.apiUrl}/proveedores/${proveedor.id}`,proveedor)
        .pipe(catchError(error => Observable.throw(error.json)));
    }

    transformRequestProveedor(proveedor: ProveedorModel): ProveedorModel {
        return {
            ...proveedor,
            fecha_inicio: proveedor.fecha_inicio / 1000
        };
    }

    transformResponseProveedor(proveedor: ProveedorModel): ProveedorModel {
        return {
            ...proveedor,
            fecha_inicio: proveedor.fecha_inicio * 1000,
        };
    }
}
