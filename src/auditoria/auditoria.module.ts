import { NgModule } from '@angular/core';
import { AuditoriaRoutes } from './auditoria.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';

//primeng modules

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

const primeNgModules = [
    AccordionModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    PanelModule,
    TableModule
];

@NgModule({
    imports: [
        AuditoriaRoutes,
        CommonModule,
        ReactiveFormsModule,
        ...primeNgModules
    ],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    providers: [...fromServices.services]
})
export class AuditoriaModule {}
