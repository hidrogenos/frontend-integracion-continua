import { AlertMessageComponent } from './alert-message/alert-message.component';
export * from './alert-message/alert-message.component';

import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
export * from './pdf-viewer/pdf-viewer.component';

import { WaitDialogComponent } from './wait-dialog/wait.dialog.component';
export * from './wait-dialog/wait.dialog.component';

export const components: any[] = [
    WaitDialogComponent,
    PdfViewerComponent,
    AlertMessageComponent
];
