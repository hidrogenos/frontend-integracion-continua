import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//containers
import * as fromContainers from './containers';

//guards
import * as fromGuards from './../auth/guards';

export const ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            {
                path: 'detalle/:id',
                component: fromContainers.DocumentosExternosComponent
            },
            {
                path: 'lista',
                component: fromContainers.DocumentosExternosComponent
            }
        ]
    }
];

export const DocumentosExternosRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
