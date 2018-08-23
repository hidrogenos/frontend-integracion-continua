import { DocumentoAdjuntoService } from './documento-adjunto/documento-adjunto.service';
export * from './documento-adjunto/documento-adjunto.service';

import { DocumentoEstadoService } from './documento-estado/documento-estado.service';
export * from './documento-estado/documento-estado.service';

import { DocumentoProcesoService } from './documento-proceso/documento-proceso.service';
export * from './documento-proceso/documento-proceso.service';

import { DocumentoTipoService } from './documento-tipo/documento-tipo.service';
export * from './documento-tipo/documento-tipo.service';

import { HasPermisionService } from './utils/auth-has-permision/auth-has-permision.service';
export * from './utils/auth-has-permision/auth-has-permision.service';

import { PdfViewerService } from './pdf-viewer/pdf-viewer.service';
export * from './pdf-viewer/pdf-viewer.service';

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
    DocumentoAdjuntoService,
    DocumentoEstadoService,
    DocumentoProcesoService,
    DocumentoTipoService,
    HasPermisionService,
    PdfViewerService,
    TipoIdentificacionService,
    UsuarioDestrezaService,
    UsuarioService,
    AccionCorrectivaService,
    UsuarioDocumentoService
];
