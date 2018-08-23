import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import * as fromComponents from './components';

//containers
import * as fromContainers from './containers';

// pipes
import * as fromPipes from './pipes';

// primeng modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

const primeNgModules = [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ToastModule
];

//services
import * as fromServices from './services';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { effects } from './store';

@NgModule({
    imports: [
        CommonModule,
        ...primeNgModules,
        StoreModule.forFeature('shared', reducers),
        EffectsModule.forFeature(effects),
    ],
    declarations: [...fromContainers.containers, ...fromComponents.components, ...fromPipes.pipes],
    providers: [
        ...fromServices.services
    ],
    exports: [...fromComponents.components, ...fromPipes.pipes]
})
export class SharedModule { }
