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
            { path: '', redirectTo: 'colaboradores', pathMatch: 'full' },
            {
                path: 'colaboradores',
                children: [
                    { path: '', redirectTo: 'lista', pathMatch: 'full' },
                    {
                        path: 'detalle/:id',
                        component: fromContainers.ColaboradorDetalleComponent
                    },
                    {
                        path: 'lista',
                        component: fromContainers.ColaboradoresListaComponent
                    }
                ]
            },
            {
                path: 'permisos',
                component: fromContainers.PermisosComponent
            }
        ]
    }
];

export const AdministracionRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
