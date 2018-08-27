// Ng Modules
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// Structure Modules
import * as fromServices from "./services";
import * as fromContainers from "./containers";
import * as fromComponents from "./components";

// PrimeNg Module
import {
    PanelModule,
    DialogModule,
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    MessageService,
    GrowlModule,
    FileUploadModule,
    StepsModule,
    ToolbarModule,
    CalendarModule,
    ChipsModule
} from "primeng/primeng";
import { RouterModule, Route } from "@angular/router";
import { TableModule } from "primeng/table";
import { SharedModule } from "../shared/shared.module";

const ROUTES: Route[] = [
    {
        path: "acciones-correctivas",
        component: fromContainers.AccionCorrectivaListaComponent
    },
    {
        path: "acciones-correctivas/:id",
        component: fromContainers.AccionCorrectivaPanel
    }
];

export const ngModules: any[] = [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
];

export const primeNgModules: any[] = [
    ButtonModule,
    TableModule,
    PanelModule,
    DialogModule,
    MultiSelectModule,
    DropdownModule,
    InputTextModule,
    GrowlModule,
    FileUploadModule,
    StepsModule,
    ToolbarModule,
    CalendarModule,
    ChipsModule
];

export const customModules: any[] = [SharedModule];

@NgModule({
    imports: [...ngModules, ...primeNgModules, ...customModules],
    declarations: [...fromContainers.container, ...fromComponents.container],
    providers: [...fromServices.container, DatePipe, MessageService],
    exports: [RouterModule]
})
export class AccionesCorrectivasModule {}
