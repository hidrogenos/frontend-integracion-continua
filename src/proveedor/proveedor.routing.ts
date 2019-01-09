import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//containers
import * as fromContainers from './containers';
import * as fromGuardsShareds from './../shared/guards';


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
                component: fromContainers.ProveedoresComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 11207
                }
            }
        ]
    }
];

export const ProveedorRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
