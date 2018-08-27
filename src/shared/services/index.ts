import { AdjuntoService } from "./utils/adjunto/adjunto.service";
export * from "./utils/adjunto/adjunto.service";

import { AuditoriaExternaService } from './auditoria-externa/auditoria-externa.service';
export * from './auditoria-externa/auditoria-externa.service';

import { CalidadService } from './calidad/calidad.service';
export * from './calidad/calidad.service';
import { AccionCorrectivaService } from "./accioncorrectiva/accioncorrectiva.service";
export * from "./accioncorrectiva/accioncorrectiva.service";

import { AccionCorrectivaTareaAdjuntoService } from "./accioncorrectiva-tarea-adjunto/accioncorrectiva-tarea-adjunto.service";
export * from "./accioncorrectiva-tarea-adjunto/accioncorrectiva-tarea-adjunto.service";

import { AccionCorrectivaTareaService } from "./accioncorrectiva-tarea/accioncorrectiva-tarea.service";
export * from "./accioncorrectiva-tarea/accioncorrectiva-tarea.service";

import { BancoService } from "./banco/banco.service";
export * from "./banco/banco.service";

import { CalidadService } from "./calidad/calidad.service";
export * from "./calidad/calidad.service";

import { CiudadService } from "./ciudad/ciudad.service";
export * from "./ciudad/ciudad.service";

import { EvaluacionProveedorService } from "./evaluacion-proveedor/evaluacion-proveedor.service";
export * from "./evaluacion-proveedor/evaluacion-proveedor.service";

import { HasPermisionService } from "./utils/auth-has-permision/auth-has-permision.service";
export * from "./utils/auth-has-permision/auth-has-permision.service";

import { PdfViewerService } from "./pdf-viewer/pdf-viewer.service";
export * from "./pdf-viewer/pdf-viewer.service";

import { ProveedorFacturaService } from "./proveedor-factura/proveedor-factura.service";
export * from "./proveedor-factura/proveedor-factura.service";

import { ProveedorService } from "./proveedor/proveedor.service";
export * from "./proveedor/proveedor.service";

import { RegimenService } from "./regimen/regimen.service";
export * from "./regimen/regimen.service";

import { TipoCuentaService } from "./tipo-cuenta/tipo-cuenta.service";
export * from "./tipo-cuenta/tipo-cuenta.service";

import { TipoIdentificacionService } from "./tipo-identificacion/tipo-identificacion.service";
export * from "./tipo-identificacion/tipo-identificacion.service";

import { UsuarioDestrezaDocumentoService } from "./usuario-destreza-documento/usuario-destreza-documento.service";
export * from "./usuario-destreza-documento/usuario-destreza-documento.service";

import { UsuarioDestrezaService } from "./usuario-destreza/usuario-destreza.service";
export * from "./usuario-destreza/usuario-destreza.service";

import { UsuarioService } from "./usuario/usuario.service";
export * from "./usuario/usuario.service";

import { UsuarioDocumentoService } from "./usuario-documento/usuario-documento.service";
export * from "./usuario-documento/usuario-documento.service";

export const services: any[] = [
    AdjuntoService,
    AuditoriaExternaService,
    AccionCorrectivaService,
    AccionCorrectivaTareaAdjuntoService,
    AccionCorrectivaTareaService,
    BancoService,
    CalidadService,
    CiudadService,
    EvaluacionProveedorService,
    HasPermisionService,
    PdfViewerService,
    ProveedorFacturaService,
    ProveedorService,
    RegimenService,
    TipoCuentaService,
    TipoIdentificacionService,
    UsuarioDestrezaService,
    UsuarioDestrezaDocumentoService,
    UsuarioDocumentoService,
    UsuarioService
];
