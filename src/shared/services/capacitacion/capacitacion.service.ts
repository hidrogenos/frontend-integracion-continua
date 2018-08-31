import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";
import { ProveedorModel } from "../../../shared/models/proveedor.model";
import { CapacitacionModel } from "../../models/capacitacion.model";

@Injectable()
export class CapacitacionService {
    constructor(private http: HttpClient) {}

    transformRequestCapacitacion(
        capacitacion: CapacitacionModel
    ): CapacitacionModel {
        return {
            ...capacitacion,
            fecha_inicio: capacitacion.fecha_inicio / 1000,
            fecha_fin: capacitacion.fecha_fin / 1000
        };
    }

    transformResponseCapacitacion(
        capacitacion: CapacitacionModel
    ): CapacitacionModel {
        return {
            ...capacitacion,
            fecha_inicio: capacitacion.fecha_inicio * 1000,
            fecha_fin: capacitacion.fecha_fin * 1000
        };
    }
}
