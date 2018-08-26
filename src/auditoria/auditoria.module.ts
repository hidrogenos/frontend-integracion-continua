import { NgModule } from '@angular/core';
import { AuditoriaRoutes } from './auditoria.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';

//primeng modules

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';

const primeNgModules = [
    AccordionModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    InputTextModule,
    PanelModule,
    TableModule,
    InputTextareaModule
];

@NgModule({
    imports: [
        AuditoriaRoutes,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ...primeNgModules
    ],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    providers: [...fromServices.services]
})
export class AuditoriaModule {}
