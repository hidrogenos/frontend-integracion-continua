import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
const primeNgModules = [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule
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
        ReactiveFormsModule
    ],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    providers: [...fromServices.services]
})
export class AdministracionModule {}
