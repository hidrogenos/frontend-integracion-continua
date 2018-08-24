import { AlertMessageComponent } from './alert-message/alert-message.component';
export * from './alert-message/alert-message.component';

import { DocumentoAdjuntoComponent } from "./documento-adjunto/documento-adjunto.component";
export * from "./documento-adjunto/documento-adjunto.component";

import { ImageViewerComponentComponent } from './image-viewer/image-viewer.component';
export * from './image-viewer/image-viewer.component';

import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
export * from './pdf-viewer/pdf-viewer.component';

import { RealizarTareaDialogComponent } from "./realizar-tarea-dialog/realizar-tarea-dialog.component";
export * from "./realizar-tarea-dialog/realizar-tarea-dialog.component";

import { WaitDialogComponent } from "./wait-dialog/wait.dialog.component";
export * from "./wait-dialog/wait.dialog.component";

export const components: any[] = [
    AlertMessageComponent,
    DocumentoAdjuntoComponent,
    ImageViewerComponentComponent,
    PdfViewerComponent,
    RealizarTareaDialogComponent,
    WaitDialogComponent
];
