import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

//components
import * as fromComponents from "./components";

//containers
import * as fromContainers from "./containers";

//primeNg modules
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { OrganizationChartModule } from "primeng/organizationchart";
import { RadioButtonModule } from "primeng/radiobutton";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { MultiSelectModule } from "primeng/primeng";
const primeNgModules = [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    InputTextModule,
    OrganizationChartModule,
    MultiSelectModule,
    RadioButtonModule,
    TableModule,
    TabViewModule
];

//routes
import { CapacitacionRoutes } from "./capacitacion.routing";

//services
import * as fromServices from "./services";

@NgModule({
    imports: [
        CapacitacionRoutes,
        CommonModule,
        ...primeNgModules,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    providers: [...fromServices.services]
})
export class CapacitacionModule {}
