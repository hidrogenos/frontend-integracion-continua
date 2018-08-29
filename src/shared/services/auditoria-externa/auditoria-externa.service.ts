import { Injectable } from '@angular/core';
import { AuditoriaExternaModel } from '../../models/auditoria-externa.model';

@Injectable()
export class AuditoriaExternaService {
    constructor() {}

    transformRequest(auditoria: AuditoriaExternaModel): AuditoriaExternaModel {
        return {
            ...auditoria,
            fecha: auditoria.fecha / 1000
        };
    }

    transformResponse(auditoria: AuditoriaExternaModel): AuditoriaExternaModel {
        return {
            ...auditoria,
            fecha: auditoria.fecha * 1000
        };
    }
}
