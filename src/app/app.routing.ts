import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import * as fromGuards from './../auth/guards';

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: './../app-wrapper/app-wrapper.module#AppWrapperModule',
        canActivate: [fromGuards.LoggedGuard]
    },

    {
        path: 'auth',
        loadChildren: './../auth/auth.module#AuthModule'
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
