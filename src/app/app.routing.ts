import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: './../app-wrapper/app-wrapper.module#AppWrapperModule'
    },
    {
        path: 'auth',
        loadChildren: './../auth/auth.module#AuthModule'
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
