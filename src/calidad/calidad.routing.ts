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
            { path: '', redirectTo: 'nuestra-empresa', pathMatch: 'full' },
            {
                path: 'nuestra-empresa',
                component: fromContainers.NuestraEmpresaComponent
            },
            {
                path: 'nuestra-empresa/:ancla',
                component: fromContainers.NuestraEmpresaComponent
            }
        ]
    }
];

export const CalidadRoutes: ModuleWithProviders = RouterModule.forChild(ROUTES);
