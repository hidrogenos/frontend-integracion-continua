import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProveedorService, ProveedorFacturaService } from '../../../shared/services';
import { FacturtaProveedorModel } from '../../../shared/models/factura-proveedor.model';
//environment
import { environment } from '../../../environments/environment';

@Injectable()
export class FacturaService {
    constructor(
        private http: HttpClient,
        private facturaProveedorService: ProveedorFacturaService
    ) {}

    deleteFacturaProveedor(id: number): Observable<FacturtaProveedorModel> {
        return this.http
            .get<FacturtaProveedorModel>(
                `${
                    environment.apiUrl
                }/proveedor/proveedor-factura/delete-proveedor-factura/${id}`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadFacturaProveedor(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    getFacturasLazy(data, id): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/proveedor/proveedor-factura/get-facturas-lazy/${id}`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }    

    uploadFacturasProveedor(id: number,data): Observable<FacturtaProveedorModel[]> {
        return this.http
            .post<FacturtaProveedorModel[]>(
                `${
                    environment.apiUrl
                }/proveedor/proveedor-factura/upload-proveedor-factura/${id}`,
                data
            )
            .pipe(map(facturas => facturas.map(factura =>
                this.facturaProveedorService.transformResponseFactura(factura))),
                catchError((error: any) => throwError(error))
            );
    }

}
