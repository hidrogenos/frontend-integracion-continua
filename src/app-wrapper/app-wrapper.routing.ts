import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { AppWrapperComponent } from './containers';

import * as fromSharedContainers from './../shared/containers';

export const ROUTES: Routes = [
    {
        path: '',
        component: AppWrapperComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'administracion',
                loadChildren:
                    './../administracion/administracion.module#AdministracionModule'
            },
            {
                path: 'calidad',
                loadChildren: './../calidad/calidad.module#CalidadModule'
            },
            {
                path: 'equipos',
                loadChildren: './../equipo/equipo.module#EquipoModule'
            },
            {
                path: 'acciones',
                loadChildren:
                    './../accionescorrectivas/accionescorrectivas.module#AccionesCorrectivasModule'
            },
            {
                path: 'proveedores',
                loadChildren: './../proveedor/proveedor.module#ProveedorModule'
            },
            {
                path:
                    'visor-adjunto/:id_tipo_documento/:id_documento/:nombre_doc',
                component: fromSharedContainers.VisorAdjuntoComponent
            },
            { path: 'dashboard', component: DashboardDemoComponent },
            { path: 'sample', component: SampleDemoComponent },
            { path: 'forms', component: FormsDemoComponent },
            { path: 'data', component: DataDemoComponent },
            { path: 'panels', component: PanelsDemoComponent },
            { path: 'overlays', component: OverlaysDemoComponent },
            { path: 'menus', component: MenusDemoComponent },
            { path: 'messages', component: MessagesDemoComponent },
            { path: 'misc', component: MiscDemoComponent },
            { path: 'empty', component: EmptyDemoComponent },
            { path: 'charts', component: ChartsDemoComponent },
            { path: 'file', component: FileDemoComponent },
            { path: 'utils', component: UtilsDemoComponent },
            { path: 'documentation', component: DocumentationComponent }
        ]
    }
];

export const AppWrapperRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
