import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import * as fromComponents from './components';

// primeng modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

const primeNgModules = [ButtonModule, DialogModule, DropdownModule];

//services
import * as fromServices from './services';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';

@NgModule({
    imports: [
        CommonModule,
        ...primeNgModules,
        StoreModule.forFeature('shared', reducers)
    ],
    declarations: [...fromComponents.components],
    providers: [...fromServices.services],
    exports: [...fromComponents.components]
})
export class SharedModule {}
