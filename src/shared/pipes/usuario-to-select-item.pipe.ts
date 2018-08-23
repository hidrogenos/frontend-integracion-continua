import { Pipe, PipeTransform } from '@angular/core';

import { SelectItem } from "primeng/primeng";
import { UsuarioModel } from "./../models/usuario.model";

@Pipe({ name: 'usuarioToSelectItem' })
export class UsuarioToSelectItemPipe implements PipeTransform {

    public transform(usuario: UsuarioModel[]): SelectItem[] {
        if (!usuario) return undefined;
        return usuario.map(p => ({ label: p.nombre + ' ' + p.apellido, value: p }));
    }
}
