import { DocumentoGuard } from './documento.guard';
import { DocumentosGuard } from './documentos.guard';

export * from './documento.guard';
export * from './documentos.guard';

export const guards: any[] = [
    DocumentoGuard,
    DocumentosGuard
]