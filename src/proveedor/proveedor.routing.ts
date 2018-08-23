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
                component: fromContainers.ProveedorDetalleComponent
            },
            {
                path: 'lista',
                component: fromContainers.ProveedoresComponent
            }
        ]
    }
];

export const ProveedorRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
