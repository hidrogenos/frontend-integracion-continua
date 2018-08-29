import {
    Component,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    AfterContentInit,
    OnInit
} from '@angular/core';
import { StoreModel } from '../../models/store.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromShared from './../../../shared/store';
import * as fromAuth from './../../../auth/store';
import { take, switchMap, map, last } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
    CalidadService,
    HasPermisionService,
    AdjuntoService,
    DocumentoAdjuntoService,
    DocumentoDivulgacionRegistroService,
    ProveedorFacturaService,
    UsuarioDestrezaDocumentoService,
    ProveedorFacturaService,
    PlanoService
} from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerComponent } from './../../components/pdf-viewer/pdf-viewer.component';
import { ImageViewerComponentComponent } from '../../components';



@Component({
    selector: 'visor-adjunto',
    styleUrls: ['visor-adjunto.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div #container>
                </div>
            </div>
        </div>
    `
})
export class VisorAdjuntoComponent implements AfterContentInit {
    //viewChild
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    constructor(
        private adjuntoService: AdjuntoService,
        private calidadService: CalidadService,
        private resolver: ComponentFactoryResolver,
        private hasPermisionService: HasPermisionService,
        private proveedorFacturaService: ProveedorFacturaService,
        private planoService: PlanoService,
        private sanitizer: DomSanitizer,
        private store: Store<StoreModel>,
        private usuarioDestrezaDocumentoService: UsuarioDestrezaDocumentoService,
        private documentoAdjuntoService: DocumentoAdjuntoService,
        private documentoDivulgacionService: DocumentoDivulgacionRegistroService
    ) {}

    ngAfterContentInit() {
        this.showWaitDialog('Consultado adjunto, un momento por favor...');
        this.store
            .select(fromRoot.getRouterState)
            .pipe(take(1))
            .subscribe(routeState => {
                const params = routeState.state.params;
                this.getDocumento(
                    parseInt(params.id_tipo_documento),
                    params.id_documento
                );
            });
    }

    downloadFile(path: string, nombre: string) {
        this.adjuntoService.getAdjunto({ path }).subscribe(file => {
            const blob = new Blob([file], { type: file.type });

            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = nombre;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
            this.hideWaitDialog();
        });
    }

    getDocumento(idTipoDocumento: number, idDocumento: number) {
        switch (idTipoDocumento) {
            case environment.tipos_documento.manual_calidad.id:
                this.getManualCalidad(idDocumento);
                break;
            case environment.tipos_documento.usuario_destreza_documento.id:
                this.getUsuarioDestrezaDocumento(idDocumento);
                break;
            case environment.tipos_documento.documento_adjunto_doc.id:
                this.getDocumentoAdjuntoDoc(idDocumento);
                break;
            case environment.tipos_documento.documento_adjunto_flujo_doc.id:
                this.getDocumentoAdjuntoFlujoDoc(idDocumento);
                break;

            case environment.tipos_documento.factura_proveedor_documento.id:
                this.getFacturaProveedorDocumento(idDocumento);
                break;
            case environment.tipos_documento.plano_documento.id:
                this.getPlanoDocumento(idDocumento);
                break;
            default:
                break;
        }
    }

    getFacturaProveedorDocumento(idDocumento) {
        this.proveedorFacturaService
            .getProveedorFactura(idDocumento)
            .subscribe(response => {
                if (response.extension == 'pdf') {
                    this.hasPermisionService
                        .hasPermision(
                            environment.tipos_documento
                                .factura_proveedor_documento.permiso_impresion
                        )
                        .subscribe(permisoImpresion => {
                            this.showPdf(response.path, permisoImpresion);
                        });
                } else if (
                    environment.extensiones_imagen.findIndex(
                        e => e == response.extension
                    ) != -1
                ) {
                    this.showImage(response.path);
                } else {
                    this.downloadFile(response.path, response.titulo);
                }
            });
    }

    getPlanoDocumento(idDocumento){
        this.planoService.getPlano(idDocumento)
            .subscribe(response => {
                if(response.extension == 'pdf'){
                    this.hasPermisionService.hasPermision(environment.tipos_documento.plano_documento.permiso_impresion)
                        .subscribe(permisoImpresion => {
                            this.showPdf(response.path, permisoImpresion)
                        })
                } else if(environment.extensiones_imagen.findIndex(e => e == response.extension) != -1 ){
                    this.showImage(response.path);
                } else { 
                    this.downloadFile(response.path, response.nombre);
                }
            })
    }

    getManualCalidad(idDocumento: number) {
        this.calidadService
            .getCalidad(idDocumento)
            .pipe(
                switchMap(calidad =>
                    this.hasPermisionService
                        .hasPermision(
                            environment.tipos_documento.manual_calidad
                                .permiso_impresion
                        )
                        .pipe(
                            map(permisoImpresion => {
                                return {
                                    path: calidad.url_manual,
                                    permisoImpresion
                                };
                            })
                        )
                )
            )
            .subscribe(response =>
                this.showPdf(response.path, response.permisoImpresion)
            );
    }

    getUsuarioDestrezaDocumento(idDocumento: number) {
        this.usuarioDestrezaDocumentoService
            .getusuarioDestrezaDocumento(idDocumento)
            .pipe(
                switchMap(documento =>
                    this.hasPermisionService
                        .hasPermision(
                            environment.tipos_documento
                                .usuario_destreza_documento.permiso_impresion
                        )
                        .pipe(
                            map(permisoImpresion => {
                                return {
                                    documento,
                                    permisoImpresion
                                };
                            })
                        )
                )
            )
            .subscribe(response => {
                if (response.documento.extension == 'pdf') {
                    this.showPdf(
                        response.documento.path,
                        response.permisoImpresion
                    );
                } else if (
                    environment.extensiones_imagen.findIndex(
                        ext => ext == response.documento.extension
                    ) != -1
                ) {
                    this.showImage(response.documento.path);
                } else {
                    this.downloadFile(
                        response.documento.path,
                        response.documento.titulo
                    );
                }
            });
    }

    showImage(path: string) {
        this.adjuntoService.getAdjunto({ path }).subscribe(response => {
            const blob = new Blob([response], {
                type: 'application/pdf'
            });
            const url = window.URL.createObjectURL(blob);
            const URL = this.sanitizer.bypassSecurityTrustResourceUrl(url);

            let componentFactory = this.resolver.resolveComponentFactory(
                ImageViewerComponentComponent
            );

            const component = this.container.createComponent(componentFactory);

            component.instance.url = url;

            this.hideWaitDialog();
        });
    }

    showPdf(path: string, permisoImpresion: boolean) {
        this.adjuntoService.getAdjunto({ path }).subscribe(response => {
            const blob = new Blob([response], {
                type: 'application/pdf'
            });
            const url = window.URL.createObjectURL(blob);
            const URL = permisoImpresion
                ? this.sanitizer.bypassSecurityTrustResourceUrl(
                      `${url}#toolbar=1&navpanes=1`
                  )
                : this.sanitizer.bypassSecurityTrustResourceUrl(
                      `${url}#toolbar=0&navpanes=1`
                  );

            let componentFactory = this.resolver.resolveComponentFactory(
                PdfViewerComponent
            );

            const component = this.container.createComponent(componentFactory);

            component.instance.url = URL;

            this.hideWaitDialog();
        });
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    getDocumentoAdjuntoDoc(idDocumento: number) {
        this.documentoAdjuntoService
            .getDocumentoAdjunto(idDocumento)
            .pipe(
                switchMap(documento =>
                    this.hasPermisionService
                        .hasPermision(
                            environment.tipos_documento.documento_adjunto_doc
                                .permiso_impresion
                        )
                        .pipe(
                            map(permisoImpresion => {
                                return {
                                    documento,
                                    permisoImpresion
                                };
                            })
                        )
                )
            )
            .subscribe(response => {
                if (response.documento.extension == 'pdf') {
                    this.showPdf(
                        response.documento.path,
                        response.permisoImpresion
                    );
                } else if (
                    environment.extensiones_imagen.findIndex(
                        ext => ext == response.documento.extension
                    ) != -1
                ) {
                    this.showImage(response.documento.path);
                } else {
                    this.downloadFile(
                        response.documento.path,
                        response.documento.titulo
                    );
                }
            });
    }

    getDocumentoAdjuntoFlujoDoc(idDocumento: number) {
        this.documentoDivulgacionService
            .getDocumentoDivulgacionRegistro(idDocumento)
            .pipe(
                switchMap(documento =>
                    this.hasPermisionService
                        .hasPermision(
                            environment.tipos_documento
                                .documento_adjunto_flujo_doc.permiso_impresion
                        )
                        .pipe(
                            map(permisoImpresion => {
                                return {
                                    documento,
                                    permisoImpresion
                                };
                            })
                        )
                )
            )
            .subscribe(response => {
                if (response.documento.extension == 'pdf') {
                    this.showPdf(
                        response.documento.path,
                        response.permisoImpresion
                    );
                } else if (
                    environment.extensiones_imagen.findIndex(
                        ext => ext == response.documento.extension
                    ) != -1
                ) {
                    this.showImage(response.documento.path);
                } else {
                    this.downloadFile(
                        response.documento.path,
                        response.documento.titulo
                    );
                }
            });
    }
}
