import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

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
                                Primera página:
                            </label>
                            <p-checkbox
                                [(ngModel)]="flagPrimeraPagina"
                                binary="true"
                            >
                            </p-checkbox>
                            <p-accordion *ngIf="flagPrimeraPagina">
                                <p-accordionTab
                                    header="Cabecera primera pagina"
                                >
                                    <div
                                        [froalaEditor]="
                                            optionsCabeceraPrimeraPagina
                                        "
                                        [(froalaModel)]="cabeceraPrimeraPagina"
                                    ></div>
                                </p-accordionTab>
                                <p-accordionTab header="Cuerpo primera pagina">
                                    <div
                                        [froalaEditor]="
                                            optionsCuerpoPrimeraPagina
                                        "
                                        [(froalaModel)]="cuerpoPrimeraPagina"
                                    ></div>
                                </p-accordionTab>
                                <p-accordionTab
                                    header="Pie de página primera página"
                                >
                                    <div
                                        [froalaEditor]="optionsPiePrimeraPagina"
                                        [(froalaModel)]="piePrimeraPagina"
                                    ></div>
                                </p-accordionTab>
                            </p-accordion>
                        </div>
                        <div class="ui-g-12">
                            <p-accordion>
                                <p-accordionTab header="Cabecera documento">
                                    <div
                                        [froalaEditor]="
                                            optionsCabeceraDocumento
                                        "
                                        [(froalaModel)]="cabeceraDocumento"
                                    ></div>
                                </p-accordionTab>
                                <p-accordionTab header="Cuerpo documento">
                                    <div
                                        [froalaEditor]="options"
                                        [(froalaModel)]="text"
                                    ></div>
                                </p-accordionTab>
                                <p-accordionTab
                                    header="Pie de página documento"
                                >
                                    <div
                                        [froalaEditor]="optionsPieDocumento"
                                        [(froalaModel)]="pieDocumento"
                                    ></div>
                                </p-accordionTab>
                            </p-accordion>
                        </div>
                        <div
                            class="ui-g-12 text-aling-right"
                            *ngIf="puedeEditar"
                        >
                            <button
                                pButton
                                class="ui-button-success"
                                style="margin-right: 15px;"
                                type="button"
                                icon="fa fa-floppy-o"
                                label="Guardar documento"
                                (click)="guardarDocumento()"
                                [disabled]="!text"
                            ></button>
                            <button
                                pButton
                                class="ui-button-danger"
                                type="button"
                                icon="fa fa-file-pdf-o"
                                label="Exportar PDF"
                                (click)="generarPDF()"
                            ></button>
                        </div>
                    </div>
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
    flagPrimeraPagina: boolean;

    @Input()
    cuerpoPrimeraPagina: string;

    @Input()
    pieDocumento: string;

    @Input()
    text: string;

    @Input()
    puedeEditar: boolean;

    @Output()
    onGuardarDocumento = new EventEmitter<{
        disposicion: number;
        flagPrimeraPagina: boolean;
        cabeceraPrimeraPagina: string;
        piePrimeraPagina: string;
        cuerpoPrimeraPagina: string;
        cabeceraDocumento: string;
        cuerpoDocumento: string;
        pieDocumento: string;
    }>();

    @Output() onUploadImageEditor = new EventEmitter<any>();

    @Output()
    onGenerarPDF = new EventEmitter();

    options = null;
    optionsCabeceraPrimeraPagina = null;
    optionsPiePrimeraPagina = null;
    optionsCuerpoPrimeraPagina = null;
    optionsCabeceraDocumento = null;
    optionsPieDocumento = null;

    disposiciones = [
        { label: 'Horizontal', value: 1 },
        { label: 'Vertical', value: 0 }
    ];

    generalOptions = {
        language: 'es',
        heightMax: 300,
        toolbarButtons: [
            'fullscreen',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript',
            '|',
            'fontFamily',
            'fontSize',
            'color',
            'inlineClass',
            'inlineStyle',
            'paragraphStyle',
            'lineHeight',
            '|',
            'paragraphFormat',
            'align',
            'formatOL',
            'formatUL',
            'outdent',
            'indent',
            'quote',
            '|',
            'insertLink',
            'insertTable',
            '|',
            'specialCharacters',
            'insertHR',
            'selectAll',
            'clearFormatting',
            '|',
            'spellChecker',
            '|',
            'undo',
            'redo'
        ]
    };

    constructor() {}

    ngOnInit() {
        this.options = {
            placeholderText: 'Edite su documento',
            ...this.generalOptions,
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                },
                'froalaEditor.image.beforeUpload': (e, editor, files) => {
                    if (files.length) {
                        this.onUploadImageEditor.emit({ e, editor, files });
                    }
                    editor.popups.hideAll();
                    // Stop default upload chain.
                    return false;
                }
            }
        };

        this.optionsCabeceraPrimeraPagina = {
            placeholderText: 'Edite la cabecera para la primera página',
            ...this.generalOptions,
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                },
                'froalaEditor.image.beforeUpload': (e, editor, files) => {
                    if (files.length) {
                        this.onUploadImageEditor.emit({ e, editor, files });
                    }
                    editor.popups.hideAll();
                    return false;
                }
            }
        };

        this.optionsPiePrimeraPagina = {
            placeholderText: 'Edite el pie de página para la primera página',
            ...this.generalOptions,
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                },
                'froalaEditor.image.beforeUpload': (e, editor, files) => {
                    if (files.length) {
                        this.onUploadImageEditor.emit({ e, editor, files });
                    }
                    editor.popups.hideAll();
                    return false;
                }
            }
        };

        this.optionsCuerpoPrimeraPagina = {
            placeholderText: 'Edite el cuerpo de la primera página',
            ...this.generalOptions,
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                },
                'froalaEditor.image.beforeUpload': (e, editor, files) => {
                    if (files.length) {
                        this.onUploadImageEditor.emit({ e, editor, files });
                    }
                    editor.popups.hideAll();
                    return false;
                }
            }
        };

        this.optionsCabeceraDocumento = {
            placeholderText: 'Edite la cabecera para el documento',
            ...this.generalOptions,
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                },
                'froalaEditor.image.beforeUpload': (e, editor, files) => {
                    if (files.length) {
                        this.onUploadImageEditor.emit({ e, editor, files });
                    }
                    editor.popups.hideAll();
                    return false;
                }
            }
        };

        this.optionsPieDocumento = {
            placeholderText: 'Edite el pie de página para el documento',
            ...this.generalOptions,
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                },
                'froalaEditor.image.beforeUpload': (e, editor, files) => {
                    if (files.length) {
                        this.onUploadImageEditor.emit({ e, editor, files });
                    }
                    editor.popups.hideAll();
                    return false;
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
            flagPrimeraPagina: this.flagPrimeraPagina,
            cabeceraPrimeraPagina: this.cabeceraPrimeraPagina,
            cuerpoPrimeraPagina: this.cuerpoPrimeraPagina,
            piePrimeraPagina: this.piePrimeraPagina,
            cabeceraDocumento: this.cabeceraDocumento,
            cuerpoDocumento: this.text,
            pieDocumento: this.pieDocumento
        });
    }
}
