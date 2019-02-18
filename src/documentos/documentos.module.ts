import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

const primeNgModules: any[] = [
    AutoCompleteModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    TableModule
];


// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

const ROUTES: Routes = [
    {
        path: ':tipoId',
        component: fromContainers.DocsDocumentosListaComponent,
        canActivate: [
            fromGuards.DocumentosGuard
        ]
    },
    {
        path: 'detalle/:documentoId',
        component: fromContainers.DocsDocumentoDetalleComponent,
        canActivate: [
            fromGuards.DocumentoGuard
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(
            ROUTES
        ),
        FormsModule,
        ReactiveFormsModule,
        ...primeNgModules,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot()
    ],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components
    ],
    providers: [
        ...fromGuards.guards,
        ...fromServices.services
    ]
})
export class DocumentosModule { }