import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//containers
import * as fromContainers from "./containers";

//guards
import * as fromGuards from "./../auth/guards";
import * as fromGuardsShareds from './../shared/guards';

export const ROUTES: Routes = [
    {
        path: "",
        children: [
            { path: "", redirectTo: "lista", pathMatch: "full" },
            {
                path: "lista",
                component: fromContainers.CapacitacionesComponent,
                canActivate: [fromGuardsShareds.HasPermisionGuard],
                    data: {
                        requiredPermision: 11210
                    }
            },
            {
                path: "detalle/:id",
                component: fromContainers.CapacitacionesDetalleComponent
            }
        ]
    }
];

export const CapacitacionRoutes: ModuleWithProviders = RouterModule.forChild(
    ROUTES
);
