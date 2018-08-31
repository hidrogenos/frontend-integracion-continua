import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//containers
import * as fromContainers from "./containers";

//guards
import * as fromGuards from "./../auth/guards";

export const ROUTES: Routes = [
    {
        path: "",
        children: [
            { path: "", redirectTo: "lista", pathMatch: "full" },
            {
                path: "lista",
                component: fromContainers.CapacitacionesComponent
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
