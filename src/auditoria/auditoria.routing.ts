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
            { path: '', redirectTo: 'administrador-listas', pathMatch: 'full' },
            {
                path: 'administrador-listas',
                component: fromContainers.AdministradorListasComponent
            },
            {
                path: 'externa',
                children: [
                    {
                        path: 'detalle/:id',
                        component:
                            fromContainers.DetalleAuditoriaExternaComponent
                    },
                    {
                        path: 'lista',
                        component: fromContainers.ListaAuditoriaExternaComponent
                    }
                ]
            }
        ]
    }
];

export const AuditoriaRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
