import { AccionesListaComponent } from './acciones-lista/acciones-lista.component';
export * from './acciones-lista/acciones-lista.component';

import { AccionesEstadosListaComponent } from './acciones-estados-lista/acciones-estados-lista.component';
export * from './acciones-estados-lista/acciones-estados-lista.component';

import { CreateAccionCorrectivaDialogComponent } from './create-accion-correctiva-dialog/create-accion-correctiva-dialog.component';
export * from './create-accion-correctiva-dialog/create-accion-correctiva-dialog.component';

export const container: any[] = [ 
                                    AccionesListaComponent, 
                                    AccionesEstadosListaComponent,
                                    CreateAccionCorrectivaDialogComponent
                                ];