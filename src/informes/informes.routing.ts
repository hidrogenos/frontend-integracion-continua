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
            {
                path: 'listado-documentos',
                component: fromContainers.InfListadoMaestroDocumentosComponent
            },
        ]
    }
];

export const InformesRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
