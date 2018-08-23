import { NgModule } from '@angular/core';
import { AuditoriaRoutes } from './auditoria.routing';

import * as fromContainers from './containers';

@NgModule({
    imports: [AuditoriaRoutes],
    declarations: [...fromContainers.containers],
    providers: []
})
export class AuditoriaModule {}
