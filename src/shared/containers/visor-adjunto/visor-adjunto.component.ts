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
import { take, switchMap, map, last } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
    CalidadService,
    HasPermisionService,
    AdjuntoService
} from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerComponent } from './../../components/pdf-viewer/pdf-viewer.component';

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
        private sanitizer: DomSanitizer,
        private store: Store<StoreModel>
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

    getDocumento(idTipoDocumento: number, idDocumento: number) {
        switch (idTipoDocumento) {
            case environment.tipos_documento.manual_calidad.id:
                this.getManualCalidad(idDocumento);
                break;

            default:
                break;
        }
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
}
