import { NgModule } from '@angular/core';
import { AuditoriaRoutes } from './auditoria.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';

//primeng modules

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';

const primeNgModules = [
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    InputTextModule,
    MultiSelectModule,
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
