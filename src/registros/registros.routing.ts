import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//containers
import * as fromContainers from './containers/registros';

//guards
import * as fromGuards from './../auth/guards';

export const ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            {
                path: 'detalle/:id',
                component: fromContainers.RegistrosComponent
            },
            {
                path: 'lista',
                component: fromContainers.RegistrosComponent
            }
        ]
    }
];

export const RegistrosRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
