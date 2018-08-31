import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//environment
import { environment } from "../../../environments/environment";

@Injectable()
export class CapacitacionProcesoService {
    constructor(private http: HttpClient) {}

    deleteCapacitacionProcesobyId(id: number) {
        return this.http.delete(
            `${environment.apiUrl}/capacitacion-proceso/${id}`
        );
    }
}
