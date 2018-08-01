import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//containers
import * as fromContainers from './containers';

//guards
import * as fromGuards from './guards';

//routes
import { AuthRoutes } from './auth.routing';

//services
import * as fromServices from './services';

//store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

@NgModule({
    imports: [
        AuthRoutes,
        CommonModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature(effects),
        ReactiveFormsModule
    ],
    declarations: [...fromContainers.containers],
    providers: [...fromServices.services, ...fromGuards.guards]
})
export class AuthModule {}
