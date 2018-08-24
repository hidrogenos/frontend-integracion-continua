import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//components
import * as fromComponents from "./components";

//containers
import * as fromContainers from "./containers";

// primeng modules
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";

const primeNgModules = [
    ButtonModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    TableModule
];

//services
import * as fromServices from "./services";

// store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./store";
import { FileUploadModule } from "primeng/primeng";
import { TableModule } from "primeng/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ...primeNgModules,
        StoreModule.forFeature("shared", reducers)
    ],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    providers: [...fromServices.services],
    exports: [...fromComponents.components]
})
export class SharedModule {}
