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
import { AppWrapperComponent, AccessDeniedComponent, BandejaEntradaComponent, DocumentAccessDeniedComponent } from './containers';

import * as fromSharedContainers from './../shared/containers';
import * as fromGuards from './guards';

export const ROUTES: Routes = [
    {
        path: '',
        component: AppWrapperComponent,
        canActivate: [fromGuards.AppMenuGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'acceso-denegado',
                component: AccessDeniedComponent
            },
            {
                path: 'documento-vencido',
                component: DocumentAccessDeniedComponent
            },
            {
                path: 'administracion',
                loadChildren:
                    './../administracion/administracion.module#AdministracionModule'
            },
            {
                path: 'auditoria',
                loadChildren: './../auditoria/auditoria.module#AuditoriaModule'
            },
            {
                path: 'calidad',
                loadChildren: './../calidad/calidad.module#CalidadModule'
            },
            {
                path: 'acciones',
                children: [
                    {
                        path: '',
                        loadChildren:
                            './../accionescorrectivas/accionescorrectivas.module#AccionesCorrectivasModule'
                    },
                    {
                        path: '',
                        loadChildren:
                            './../accionespreventivas/acciones-preventivas.module#AccionesPreventivasModule'
                    }
                ]
            },
            {
                path: 'documentos',
                loadChildren:
                    './../documentos/documentos.module#DocumentosModule'
            },
            {
                path: 'equipos',
                loadChildren: './../equipo/equipo.module#EquipoModule'
            },
            {
                path: 'informes',
                loadChildren:
                    './../informes/informes.module#InformesModule'
            },
            {
                path: 'proveedores',
                loadChildren: './../proveedor/proveedor.module#ProveedorModule'
            },
            {
                path: 'planos',
                loadChildren: './../plano/plano.module#PlanoModule'
            },

            {
                path: 'registros',
                loadChildren: './../registros/registros.module#RegistroModule'
            },
            {
                path: 'documentos-externos',
                loadChildren: './../documentos-externos/documentos-externos.module#DocumentoExternoModule'
            },
            {
                path:
                    'visor-adjunto/:id_tipo_documento/:id_documento/:nombre_doc',
                component: fromSharedContainers.VisorAdjuntoComponent
            },
            { path: 'dashboard', component: BandejaEntradaComponent },
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
            { path: 'documentation', component: DocumentationComponent },
            {
                path: 'capacitaciones',
                loadChildren:
                    './../capacitacion/capacitacion.module#CapacitacionModule'
            }
        ]
    }
];

export const AppWrapperRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
