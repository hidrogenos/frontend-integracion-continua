import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";

import { CapacitacionAsistenteExternoModel } from "../../models/capacitacion-asistente-externo.model";

@Injectable()
export class CapacitacionAsistenteExternoService {
    constructor(private http: HttpClient) {}

    transformRequestCapacitacionAE(
        cae: CapacitacionAsistenteExternoModel
    ): CapacitacionAsistenteExternoModel {
        return {
            ...cae,
            fecha: cae.fecha / 1000
        };
    }

    transformResponseCapacitacionAE(
        cae: CapacitacionAsistenteExternoModel
    ): CapacitacionAsistenteExternoModel {
        return {
            ...cae,
            fecha: cae.fecha * 1000
        };
    }
}
