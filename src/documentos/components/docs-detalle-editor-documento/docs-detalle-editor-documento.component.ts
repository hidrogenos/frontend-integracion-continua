import {
    Component,
    Output,
    EventEmitter,
    Input,
    AfterViewChecked,
    ViewChild,
    OnInit
} from '@angular/core';
import { Editor } from 'primeng/editor';

@Component({
    selector: 'docs-detalle-editor-documento',
    template: `
        <div>
            <div class="ui-g">
                <h2>Documento</h2>
            </div>

            <div class="ui-g">
                <div class="ui-g-12">
                    <label style="margin-right: 15px;"
                        >Cabecera primera página:</label
                    >
                    <p-checkbox
                        [(ngModel)]="flagCabeceraPrimeraPagina"
                        binary="true"
                    ></p-checkbox>
                    <div *ngIf="flagCabeceraPrimeraPagina">
                        <div
                            class="ui-g-12"
                            [froalaEditor]="optionsCabeceraPrimeraPagina"
                            [(froalaModel)]="cabeceraPrimeraPagina"
                        ></div>
                    </div>
                    <div
                        class="ui-g-12"
                        [froalaEditor]="options"
                        [(froalaModel)]="text"
                    ></div>
                    <!-- <div class="ui-g-12">
                <p-editor [(ngModel)]="text" [style]="{'height':'220px'}" [readonly]="!puedeEditar"></p-editor>
            </div> -->
                    <div class="ui-g-12 text-aling-right" *ngIf="puedeEditar">
                        <button
                            pButton
                            type="button"
                            label="Editar documento"
                            (click)="guardarDocumento()"
                            [disabled]="!text"
                        ></button>
                    </div>
                </div>
            </div>
            <pre>
        {{ text | json }}
    </pre>
        </div>
    `
})
export class DocsDetalleEditorDocumentoComponent implements OnInit {
    @Input()
    cabeceraPrimeraPagina: string;

    @Input()
    flagCabeceraPrimeraPagina: boolean;

    @Input()
    text: string;

    @Input()
    puedeEditar: boolean;

    @Output()
    onGuardarDocumento = new EventEmitter<string>();

    options = null;
    optionsCabeceraPrimeraPagina = null;

    constructor() {}

    ngOnInit() {
        this.options = {
            placeholderText: 'Edite su documento',
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                }
            }
        };

        this.optionsCabeceraPrimeraPagina = {
            placeholderText: 'Edite la cabecera para la primera página',
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                }
            }
        };
    }

    guardarDocumento() {
        this.onGuardarDocumento.emit(this.text);
    }
}
