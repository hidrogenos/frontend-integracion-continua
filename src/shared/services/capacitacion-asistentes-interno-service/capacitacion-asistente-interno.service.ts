import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

//environment
import { environment } from "../../../environments/environment";

import { CapacitacionAsistenteExternoModel } from "../../models/capacitacion-asistente-externo.model";
import { CapacitacionAsistenteInternoModel } from "../../models/capacitacion-asistente-interno.model";

@Injectable()
export class CapacitacionAsistenteInternoService {
    constructor(private http: HttpClient) {}

    transformRequestCapacitacionAI(
        cai: CapacitacionAsistenteInternoModel
    ): CapacitacionAsistenteInternoModel {
        return {
            ...cai,
            fecha: cai.fecha / 1000
        };
    }

    transformResponseCapacitacionAI(
        cai: CapacitacionAsistenteInternoModel
    ): CapacitacionAsistenteInternoModel {
        return {
            ...cai,
            fecha: cai.fecha * 1000
        };
    }
}
