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
                        component: fromContainers.ColaboradoresListaComponent,
                        canActivate: [fromGuardsShareds.HasPermisionGuard],
                        data: {
                            requiredPermision: 1120
                        }

                    }
                ]
            },
            {
                path: 'permisos',
                component: fromContainers.PermisosComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1200
                }
            },
            {
                path: 'eps',
                component: fromContainers.EpsComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1303
                }
            },
            {
                path: 'arl',
                component: fromContainers.ArlComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1313
                }
            },
            {
                path: 'pension',
                component: fromContainers.PensionComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1323
                }
            },
            {
                path: 'cesantias',
                component: fromContainers.CesantiasComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1333
                }
            },
            {
                path: 'caja-compensacion',
                component: fromContainers.CajaCompensacionComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1343
                }
            },
            {
                path: 'pais',
                component: fromContainers.PaisComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1353
                }
            },
            {
                path: 'departamento',
                component: fromContainers.DepartamentoComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1363
                }
            },
            {
                path: 'ciudad',
                component: fromContainers.CiudadComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                data: {
                    requiredPermision: 1373
                }
            },
            {
                path: 'lista-documentos-restringidos',
                component: fromContainers.DocumentosRestringidosListaComponent,
            }
        ]
    }
];

export const AdministracionRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
