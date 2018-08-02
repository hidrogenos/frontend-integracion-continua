import { TipoIdentificacionService } from './tipo-identificacion/tipo-identificacion.service';
export * from './tipo-identificacion/tipo-identificacion.service';

import { UsuarioService } from './usuario/usuario.service';
export * from './usuario/usuario.service';

import { AccionCorrectivaService } from "./accioncorrectiva/accioncorrectiva.service";
export * from './accioncorrectiva/accioncorrectiva.service';

export const services: any[] = [TipoIdentificacionService, UsuarioService, AccionCorrectivaService];
