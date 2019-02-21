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
                            <p-panel
                                *ngIf="flagPrimeraPagina"
                                header="Primera página"
                                [toggleable]="true"
                                [style]="{ 'margin-bottom': '20px' }"
                                [collapsed]="true"
                            >
                                <div class="ui-g">
                                    <div class="ui-g-12">
                                        <h3>Cabecera primera pagina</h3>
                                        <div
                                            class="ui-g-12"
                                            [froalaEditor]="
                                                optionsCabeceraPrimeraPagina
                                            "
                                            [(froalaModel)]="
                                                cabeceraPrimeraPagina
                                            "
                                        ></div>
                                    </div>
                                </div>
                                <div class="ui-g">
                                    <div class="ui-g-12">
                                        <h3>Cuerpo primera pagina</h3>
                                        <div
                                            class="ui-g-12"
                                            [froalaEditor]="
                                                optionsCuerpoPrimeraPagina
                                            "
                                            [(froalaModel)]="
                                                cuerpoPrimeraPagina
                                            "
                                        ></div>
                                    </div>
                                </div>
                                <div class="ui-g">
                                    <div class="ui-g-12">
                                        <h3>Cuerpo primera pagina</h3>
                                        <div
                                            class="ui-g-12"
                                            [froalaEditor]="
                                                optionsPiePrimeraPagina
                                            "
                                            [(froalaModel)]="piePrimeraPagina"
                                        ></div>
                                    </div>
                                </div>
                            </p-panel>
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

    constructor() {}

    ngOnInit() {
        this.options = {
            placeholderText: 'Edite su documento',
            events: {
                'froalaEditor.initialized': function(e, editor) {
                    !this.puedeEditar ? editor.edit.on() : editor.edit.off();
                },
                'froalaEditor.image.beforeUpload': (e, editor, files) => {
                    console.log(files);
                    if (files.length) {
                        this.onUploadImageEditor.emit({ e, editor, files });
                        // // Create a File Reader.
                        // var reader = new FileReader();
                        // // Set the reader to insert images when they are loaded.
                        // reader.onload = function(e) {
                        //     let x: any = e.target;
                        //     var result = x.result;
                        //     editor.image.insert(
                        //         result,
                        //         null,
                        //         null,
                        //         editor.image.get()
                        //     );
                        // };
                        // // Read image as base64.
                        // reader.readAsDataURL(files[0]);
                    }
                    //editor.popups.hideAll();
                    // // Stop default upload chain.
                    // return false;
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

        this.optionsCuerpoPrimeraPagina = {
            placeholderText: 'Edite el cuerpo de la primera página',
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
