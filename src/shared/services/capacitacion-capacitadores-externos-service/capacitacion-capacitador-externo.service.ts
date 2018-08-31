import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";

import { CapacitacionAsistenteExternoModel } from "../../models/capacitacion-asistente-externo.model";
import { CapacitacionAsistenteInternoModel } from "../../models/capacitacion-asistente-interno.model";
import { CapacitacionCapacitadorExternoModel } from "../../models/capacitacion-capacitador-externo.model";

@Injectable()
export class CapacitacionCapacitadorExternService {
    constructor(private http: HttpClient) {}

    transformRequestCapacitacionCE(
        cce: CapacitacionCapacitadorExternoModel
    ): CapacitacionCapacitadorExternoModel {
        return {
            ...cce,
            fecha: cce.fecha / 1000
        };
    }

    transformResponseCapacitacionCE(
        cce: CapacitacionCapacitadorExternoModel
    ): CapacitacionCapacitadorExternoModel {
        return {
            ...cce,
            fecha: cce.fecha * 1000
        };
    }
}
