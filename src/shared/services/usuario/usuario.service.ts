import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { UsuarioModel } from '../../models/usuario.model';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) {}

    transformRequestUsuario(usuario: UsuarioModel): UsuarioModel {
        return {
            ...usuario,
            fecha_ingreso: usuario.fecha_ingreso / 1000
        };
    }
}
