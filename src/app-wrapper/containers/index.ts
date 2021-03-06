import { AccessDeniedComponent } from './access-denied/access-denied.component';
export * from './access-denied/access-denied.component';

import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
export * from './app-wrapper/app-wrapper.component';

import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
export * from './bandeja-entrada/bandeja-entrada.component';

import { DocumentAccessDeniedComponent } from './documento-vencido/documento-vencido.component';
export * from './documento-vencido/documento-vencido.component';

export const containers: any[] = [
    AccessDeniedComponent,
    AppWrapperComponent,
    BandejaEntradaComponent,
    DocumentAccessDeniedComponent
];
