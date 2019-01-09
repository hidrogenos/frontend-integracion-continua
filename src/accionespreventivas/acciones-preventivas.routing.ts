import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

//containers
import * as fromContainers from "./containers";
import * as fromGuardsShareds from './../shared/guards';


export const ROUTES: Routes = [
    {
        path: "",
        children: [
            { path: "", redirectTo: "acciones-preventivas", pathMatch: "full" },
            {
                path: "acciones-preventivas",
                children: [
                    { path: "", redirectTo: "lista", pathMatch: "full" },
                    {
                        path: "detalle/:id",
                        component:
                            fromContainers.AccionPreventivaDetalleComponent
                    },
                    {
                        path: "lista",
                        component: fromContainers.AccionPreventivaListaComponent,
                        canActivate: [fromGuardsShareds.HasPermisionGuard],
                        data: {
                            requiredPermision: 11208
                        }
                    }
                ]
            }
        ]
    }
];

export const AccionesPreventivasRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
