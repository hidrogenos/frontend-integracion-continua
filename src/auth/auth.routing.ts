import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import * as fromContainers from './containers';

export const ROUTES: Routes = [
    { path: 'login', component: fromContainers.LoginComponent }
];

export const AuthRoutes: ModuleWithProviders = RouterModule.forChild(ROUTES);
