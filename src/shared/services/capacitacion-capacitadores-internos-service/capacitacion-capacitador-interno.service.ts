import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//environment

import { CapacitacionCapacitadorInternoModel } from "../../models/capacitacion-capacitador-interno.model";

@Injectable()
export class CapacitacionCapacitadorInternoService {
    constructor(private http: HttpClient) {}

    transformRequestCapacitacionCI(
        cci: CapacitacionCapacitadorInternoModel
    ): CapacitacionCapacitadorInternoModel {
        return {
            ...cci,
            fecha: cci.fecha / 1000
        };
    }

    transformResponseCapacitacionCI(
        cci: CapacitacionCapacitadorInternoModel
    ): CapacitacionCapacitadorInternoModel {
        return {
            ...cci,
            fecha: cci.fecha * 1000
        };
    }
}
