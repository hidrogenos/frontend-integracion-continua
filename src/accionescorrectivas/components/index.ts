import { AccionesListaComponent } from './acciones-lista/acciones-lista.component';
export * from './acciones-lista/acciones-lista.component';

import { AccionesEstadosListaComponent } from './acciones-estados-lista/acciones-estados-lista.component';
export * from './acciones-estados-lista/acciones-estados-lista.component';

import { CreateAccionCorrectivaDialogComponent } from './create-accion-correctiva-dialog/create-accion-correctiva-dialog.component';
export * from './create-accion-correctiva-dialog/create-accion-correctiva-dialog.component';

import { EditAccionCorrectivaComponent} from './edit-accion-correctiva/edit-accion-correctiva.component';
export * from './edit-accion-correctiva/edit-accion-correctiva.component';

import { RelacionarProcesoComponent } from './relacionar-proceso/relacionar-proceso.component';
export * from './relacionar-proceso/relacionar-proceso.component';

import { CreateDocumentoAccionCorrectivaComponent } from './create-accion-correctiva-documento/create-accion-correctiva-documento.component';
export * from './create-accion-correctiva-documento/create-accion-correctiva-documento.component';

import { CreateMetodologiaAnalisisComponent } from './create-metodologia-analisis/create-metodologia-analisis.component';
export * from './create-metodologia-analisis/create-metodologia-analisis.component';


export const container: any[] = [ 
                                    AccionesListaComponent, 
                                    AccionesEstadosListaComponent,
                                    CreateAccionCorrectivaDialogComponent,
                                    EditAccionCorrectivaComponent,
                                    RelacionarProcesoComponent,
                                    CreateDocumentoAccionCorrectivaComponent,
                                    CreateMetodologiaAnalisisComponent
                                ];