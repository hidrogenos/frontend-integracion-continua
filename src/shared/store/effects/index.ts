import { DocumentoEstadosEffects } from './documento-estados.effect';
export * from './documento-estados.effect';

import { DocumentoTiposEffects } from './documento-tipos.effect';
export * from './documento-tipos.effect';

export const effects: any[] = [
    DocumentoEstadosEffects,
    DocumentoTiposEffects
];