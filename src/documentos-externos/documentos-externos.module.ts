import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//components
import * as fromComponents from './components';

//containers
import * as fromContainers from './containers';

//primeNg modules
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
const primeNgModules = [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    OrganizationChartModule,
    RadioButtonModule,
    TableModule,
    TabViewModule
];

//routes
import { DocumentosExternosRoutes } from './documentos-externos.routing';

//services
import * as fromServices from './services';

@NgModule({
    imports: [
        DocumentosExternosRoutes,
        CommonModule,
        ...primeNgModules,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [...fromContainers.containers, ...fromComponents.component],
    providers: [...fromServices.services]
})
export class DocumentoExternoModule {}
