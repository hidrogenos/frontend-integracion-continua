import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { ProveedorService, FacturaProveedorService } from '../../../shared/services';
import { BancoModel } from '../../../shared/models/banco.model';
import { CiudadModel } from '../../../shared/models/ciudad.model';
import { TipoCuentaModel } from '../../../shared/models/TipoCuenta.model';
import { TipoIdentificacionModel } from '../../../shared/models/tipo-identificacion.model';
import { RegimenModel } from '../../../shared/models/regimen.model';
import { FacturtaProveedorModel } from '../../../shared/models/factura-proveedor.model';

@Injectable()
export class ProveedorListaService {
    constructor(
        private http: HttpClient,
        private proveedorService: ProveedorService,
        private facturaProveedorService: FacturaProveedorService
    ) {}

    getProveedores(): Observable<ProveedorModel[]> {
        return this.http
            .get<ProveedorModel[]>(
                `${environment.apiUrl}/proveedor/get-proveedores`
            )
            .pipe(catchError(error => Observable.throw(error.json())));
    }

    getProveedoresLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/proveedor/get-proveedores-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getProveedor(id): Observable<ProveedorModel> {
        return this.http
            .get<ProveedorModel>(
                `${environment.apiUrl}/proveedor/get-detalle-proveedor/${id}`
            )
            .pipe(
                map(response => {
                    return this.proveedorService.transformResponseProveedor(
                        response
                    );
                }),
                catchError(error => Observable.throw(error.json()))
            );
    }

    getInitialData(): Observable<{
        bancos: BancoModel[];
        ciudades: CiudadModel[];
        tiposCuenta: TipoCuentaModel[];
        tiposIdentificacion: TipoIdentificacionModel[];
        regimen: RegimenModel[];
    }> {
        return this.http
            .get<any>(`${environment.apiUrl}/proveedor/get-initial-data`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    onEliminar(event: ProveedorModel): Observable<ProveedorModel> {
        console.log(event);
        return this.http.delete<ProveedorModel>(
            `${environment.apiUrl}/proveedor/delete-proveedor/${event.id}`
        );
    }

    updateProveedor(id: number,data: ProveedorModel): Observable<ProveedorModel> {
        let aux = this.proveedorService.transformRequestProveedor(data);
        return this.http
            .post<ProveedorModel>(
                `${environment.apiUrl}/proveedor/update-proveedor/${id}`,
                aux
            )
            .pipe(catchError((error: any) => throwError(error)));
    }


    uploadFacturasProveedor(id: number,data): Observable<FacturtaProveedorModel[]> {
        return this.http
            .post<FacturtaProveedorModel[]>(
                `${
                    environment.apiUrl
                }/proveedor/upload-proveedor-factura/${id}`,
                data
            )
            .pipe(
                map(facturas =>
                    facturas.map(factura =>
                        this.facturaProveedorService.transformResponse(
                            factura
                        )
                    )
                ),
                catchError((error: any) => throwError(error))
            );
    }


    deleteFacturaProveedor(id: number): Observable<FacturtaProveedorModel> {
        return this.http
            .get<FacturtaProveedorModel>(
                `${
                    environment.apiUrl
                }/proveedor/delete-proveedor-factura/${id}`
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
}
