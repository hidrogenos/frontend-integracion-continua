import { BancoService } from './banco/banco.service';
export * from './banco/banco.service';

import { CiudadService } from './ciudad/ciudad.service';
export * from './ciudad/ciudad.service';

import { ProveedorService } from './proveedor/proveedor.service';
export * from './proveedor/proveedor.service';

import { RegimenService } from './regimen/regimen.service';
export * from './regimen/regimen.service';

import { TipoCuentaService } from './tipo-cuenta/tipo-cuenta.service';
export * from './tipo-cuenta/tipo-cuenta.service';

import { TipoIdentificacionService } from './tipo-identificacion/tipo-identificacion.service';
export * from './tipo-identificacion/tipo-identificacion.service';

import { UsuarioDestrezaService } from './usuario-destreza/usuario-destreza.service';
export * from './usuario-destreza/usuario-destreza.service';

import { UsuarioService } from './usuario/usuario.service';
export * from './usuario/usuario.service';

import { AccionCorrectivaService } from './accioncorrectiva/accioncorrectiva.service';
export * from './accioncorrectiva/accioncorrectiva.service';

import { UsuarioDocumentoService } from './usuario-documento/usuario-documento.service';
export * from './usuario-documento/usuario-documento.service';

export const services: any[] = [
    TipoIdentificacionService,
    UsuarioDestrezaService,
    UsuarioService,
    AccionCorrectivaService,
    UsuarioDocumentoService,
    CiudadService,
    RegimenService,
    TipoCuentaService,
    BancoService,
    ProveedorService
];
