import { AccionCorrectivaService } from "./accioncorrectiva/accioncorrectiva.service";
export * from "./accioncorrectiva/accioncorrectiva.service";

import { AccionCorrectivaTareaService } from "./accioncorrectiva-tarea/accioncorrectiva-tarea.service";
export * from "./accioncorrectiva-tarea/accioncorrectiva-tarea.service";

import { AccionCorrectivaTareaAdjuntoService } from "./accioncorrectiva-tarea-adjunto/accioncorrectiva-tarea-adjunto.service";
export * from "./accioncorrectiva-tarea-adjunto/accioncorrectiva-tarea-adjunto.service";

import { HasPermisionService } from "./utils/auth-has-permision/auth-has-permision.service";
export * from "./utils/auth-has-permision/auth-has-permision.service";

import { PdfViewerService } from "./pdf-viewer/pdf-viewer.service";
export * from "./pdf-viewer/pdf-viewer.service";

import { TipoIdentificacionService } from "./tipo-identificacion/tipo-identificacion.service";
export * from "./tipo-identificacion/tipo-identificacion.service";

import { UsuarioDestrezaService } from "./usuario-destreza/usuario-destreza.service";
export * from "./usuario-destreza/usuario-destreza.service";

import { UsuarioService } from "./usuario/usuario.service";
export * from "./usuario/usuario.service";

import { UsuarioDocumentoService } from "./usuario-documento/usuario-documento.service";
export * from "./usuario-documento/usuario-documento.service";

export const services: any[] = [
    AccionCorrectivaService,
    AccionCorrectivaTareaService,
    AccionCorrectivaTareaAdjuntoService,
    HasPermisionService,
    PdfViewerService,
    TipoIdentificacionService,
    UsuarioDestrezaService,
    UsuarioService,
    UsuarioDocumentoService
];
