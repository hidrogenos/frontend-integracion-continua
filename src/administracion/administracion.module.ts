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
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

const primeNgModules = [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    MultiSelectModule,
    RadioButtonModule,
    TableModule,
    TabViewModule
];

//routes
import { AdministracionRoutes } from './administracion.routing';

//services
import * as fromServices from './services';

@NgModule({
    imports: [
        AdministracionRoutes,
        CommonModule,
        ...primeNgModules,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    providers: [...fromServices.services]
})
export class AdministracionModule {}
