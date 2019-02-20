import {
    Component,
    Output,
    EventEmitter,
    Input,
    AfterViewChecked,
    ViewChild,
    OnInit,
    AfterViewInit
} from '@angular/core';
import { Editor } from 'primeng/editor';

@Component({
    selector: 'docs-detalle-editor-documento',
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <p-panel
                    header="Editor de documento"
                    [toggleable]="true"
                    [style]="{ 'margin-bottom': '20px' }"
                    [collapsed]="true"
                >
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <label style="margin-right: 15px;">
                                Disposición de hoja:
                            </label>
                            <p-dropdown
                                [options]="disposiciones"
                                [(ngModel)]="disposicion"
                            ></p-dropdown>
                        </div>
                        <div class="ui-g-12">
                            <label style="margin-right: 15px;">
                                Cabecera primera página:
                            </label>
                            <p-checkbox
                                [(ngModel)]="flagCabeceraPrimeraPagina"
                                binary="true"
                            >
                            </p-checkbox>
                            <div *ngIf="flagCabeceraPrimeraPagina">
                                <div
                                    class="ui-g-12"
                                    [froalaEditor]="
                                        optionsCabeceraPrimeraPagina
                                    "
                                    [(froalaModel)]="cabeceraPrimeraPagina"
                                ></div>
                            </div>
                        </div>
                        <div class="ui-g-12">
                            <label style="margin-right: 15px;">
                                Pie de página primera página:
                            </label>
                            <p-checkbox
                                [(ngModel)]="flagPiePrimeraPagina"
                                binary="true"
                            >
                            </p-checkbox>
                            <div *ngIf="flagPiePrimeraPagina">
                                <div
                                    class="ui-g-12"
                                    [froalaEditor]="optionsPiePrimeraPagina"
                                    [(froalaModel)]="piePrimeraPagina"
                                ></div>
                            </div>
                        </div>
                        <div class="ui-g-12">
                            <label style="margin-right: 15px;">
                                Cabecera documento:
                            </label>
                            <div
                                class="ui-g-12"
                                [froalaEditor]="optionsCabeceraDocumento"
                                [(froalaModel)]="cabeceraDocumento"
                            ></div>
                        </div>
                        <div class="ui-g-12">
                            <label style="margin-right: 15px;">
                                Cuerpo documento:
                            </label>
                            <div
                                [froalaEditor]="options"
                                [(froalaModel)]="text"
                            ></div>
                        </div>
                        <div class="ui-g-12">
                            <label style="margin-right: 15px;">
                                Pie de página documento:
                            </label>
                            <div
                                class="ui-g-12"
                                [froalaEditor]="optionsPieDocumento"
                                [(froalaModel)]="pieDocumento"
                            ></div>
                        </div>
                        <div
                            class="ui-g-12 text-aling-right"
                            *ngIf="puedeEditar"
                        >
                            <button
                                pButton
                                type="button"
                                label="Editar documento"
                                (click)="guardarDocumento()"
                                [disabled]="!text"
                            ></button>
                            <button
                                pButton
                                type="button"
                                label="Exportar PDF"
                                (click)="generarPDF()"
                            ></button>
                        </div>
                    </div>
                    <pre>
        {{ text | json }}
    </pre
                    >
                </p-panel>
            </div>
        </div>
    `
})
export class DocsDetalleEditorDocumentoComponent implements OnInit {
    @Input()
    disposicion: number;

    @Input()
    cabeceraDocumento: string;

    @Input()
    cabeceraPrimeraPagina: string;

    @Input()
    piePrimeraPagina: string;

    @Input()
    flagCabeceraPrimeraPagina: boolean;

    @Input()
    flagPiePrimeraPagina: boolean;

    @Input()
    pieDocumento: string;

    @Input()
    text: string;

    @Input()
    puedeEditar: boolean;

    @Output()
    onGuardarDocumento = new EventEmitter<{
        disposicion: number;
        flagCabeceraPrimeraPagina: boolean;
        cabeceraPrimeraPagina: string;
        flagPiePrimeraPagina: boolean;
        piePrimeraPagina: string;
        cabeceraDocumento: string;
        cuerpoDocumento: string;
        pieDocumento: string;
    }>();

    @Output()
    onGenerarPDF = new EventEmitter();

    options = null;
    optionsCabeceraPrimeraPagina = null;
    optionsPiePrimeraPagina = null;
    optionsCabeceraDocumento = null;
    optionsPieDocumento = null;

    disposiciones = [
        { label: 'Horizontal', value: 1 },
        { label: 'Vertical', value: 0 }
    ];

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

        this.optionsPiePrimeraPagina = {
            placeholderText: 'Edite el pie de página para la primera página',
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                }
            }
        };

        this.optionsCabeceraDocumento = {
            placeholderText: 'Edite la cabecera para el documento',
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                }
            }
        };

        this.optionsPieDocumento = {
            placeholderText: 'Edite el pie de página para el documento',
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                }
            }
        };
    }

    generarPDF() {
        this.onGenerarPDF.emit();
    }

    guardarDocumento() {
        this.onGuardarDocumento.emit({
            disposicion: this.disposicion,
            flagCabeceraPrimeraPagina: this.flagCabeceraPrimeraPagina,
            cabeceraPrimeraPagina: this.cabeceraPrimeraPagina,
            flagPiePrimeraPagina: this.flagPiePrimeraPagina,
            piePrimeraPagina: this.piePrimeraPagina,
            cabeceraDocumento: this.cabeceraDocumento,
            cuerpoDocumento: this.text,
            pieDocumento: this.pieDocumento
        });
    }
}
