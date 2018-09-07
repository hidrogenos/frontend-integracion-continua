import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// guards shared
import * as fromGuardsShared from './../shared/guards';

//containers
import * as fromContainers from './containers';

//guards
import * as fromGuards from './../auth/guards';

export const ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'listado-documentos',
                component: fromContainers.InfListadoMaestroDocumentosComponent,
                canActivate: [fromGuardsShared.HasPermisionGuard],
                data: {
                    requiredPermision: 2100
                }
            },
        ]
    }
];

export const InformesRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
