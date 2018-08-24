import { Component, Input } from '@angular/core';
import {
    AuditoriaListaModel,
    AuditoriaListaDataTituloModel
} from '../../../shared/models/auditoria-lista.model';

@Component({
    selector: 'editor-lista',
    styleUrls: ['editor-lista.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <p-panel [header]="lista.nombre">
                    <p-accordion>
                        <ng-template ngFor let-titulo [ngForOf]="lista.data.titulos" let-iTitulo="index">
                            <p-accordionTab header="Header 1">
                                <p-header>
                                    {{ titulo.id + ' ' + titulo.titulo }}
                                    <button  pButton type="button" icon="fa fa-pencil" ></button>
                                </p-header>
                                content
                            </p-accordionTab>
                        </ng-template>
                    </p-accordion>
                </p-panel>
            </div>
        </div>
    `
})
export class EditorListaComponent {
    //properties
    @Input()
    lista: AuditoriaListaModel;
    constructor() {}
}
