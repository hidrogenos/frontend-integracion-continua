// Ng Modules
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Structure Modules
import * as fromServices from './services';
import * as fromContainers from './containers';
import * as fromComponents from './components';

// PrimeNg Module
import { DataTableModule, PanelModule } from 'primeng/primeng';
import { RouterModule, Route } from '@angular/router';

const ROUTES: Route[] = [
    { path: '', component: fromContainers.AccionCorrectivaComponent }
];

export const ngModules: any[] = [
    CommonModule,
    RouterModule.forChild(ROUTES)
]

export const primeNgModules: any[] = [
    DataTableModule,
    PanelModule
]

@NgModule({
    imports: [ ...ngModules, ...primeNgModules ],
    declarations: [...fromContainers.container, ...fromComponents.container ],
    providers : [ ...fromServices.container, DatePipe],    
    exports : [ RouterModule ]
})
export class AccionesCorrectivasModule {

}