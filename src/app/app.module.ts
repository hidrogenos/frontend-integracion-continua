import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app.routing';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthTokenInterceptor } from '../auth/interceptors/auth-token/auth-token.interceptor';

//containers
import * as fromContainers from './containers';

//environment
import { environment } from '../environments/environment';

//modules
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from './../shared/shared.module';

//store
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer
} from '@ngrx/router-store';
import { reducers, effects, CustomSerializer } from './store';

//dev tools store
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        StoreRouterConnectingModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
        }),
        AuthModule,
        SharedModule
    ],
    declarations: [...fromContainers.containers],
    providers: [
        { provide: RouterStateSerializer, useClass: CustomSerializer },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
