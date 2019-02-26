import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//containers
import * as fromContainers from './containers';

//guards
import * as fromGuards from './../auth/guards';
import * as fromGuardsShareds from './../shared/guards';


export const ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'equipos', pathMatch: 'full' },
            
            {
                path: 'detalle/:id',
                component: fromContainers.EquipoDetalleComponent
            },
            {
                path: 'equipos',
                component: fromContainers.EquipoComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 11206
                }
            }
        ]
    }
];

export const EquipoRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
