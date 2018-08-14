import { Component, OnInit, ViewChild } from '@angular/core';
import { NuestraEmpresaService } from '../../services';
import { forkJoin } from 'rxjs';
import { CalidadModel } from '../../../shared/models/calidad.model';
import {
    TituloComponent,
    MisionComponent,
    VisionComponent,
    PoliticaComponent,
    ValoresComponent,
    ManualCalidadComponent,
    OrganigramaComponent
} from '../../components';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '@ngrx/store';
import * as fromShared from './../../../shared/store';
import * as fromRoot from './../../../app/store';
import { CalidadOrganigramaModel } from '../../../shared/models/calidad-organigrama.model';
import { element } from '../../../../node_modules/protractor';

@Component({
    selector: 'nuestra-empresa',
    styleUrls: ['nuestra-empresa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <titulo #titulo
                    *ngIf="loadedCalidad"
                    [loadedCalidad]="loadedCalidad"
                    [blobLogo]="blobLogo"
                    (onUpdateEmpresaNombre)="updateEmpresaNombre($event)"
                    (onUpdateEmpresaLogo)="updateLogoEmpresa($event)">
                </titulo>
                <mision #mision
                    *ngIf="loadedCalidad"
                    [loadedCalidad]="loadedCalidad"
                    (onUpdateMision)="updateMision($event)">
                </mision>
                <vision #vision
                    *ngIf="loadedCalidad"
                    [loadedCalidad]="loadedCalidad"
                    (onUpdateVision)="updateVision($event)">
                </vision>
                <politica #politica
                    *ngIf="loadedCalidad"
                    [loadedCalidad]="loadedCalidad"
                    (onUpdatePolitica)="updatePolitica($event)">
                </politica>
                <valores #valores
                    *ngIf="loadedCalidad"
                    [loadedCalidad]="loadedCalidad"
                    (onUpdateValores)="updateValores($event)">
                </valores>
                <manual-calidad #manual
                    *ngIf="loadedCalidad"
                    [loadedCalidad]="loadedCalidad"
                    (onUpdateManual)="updateManual($event)"
                    (onDescargarManualCalidad)="descargarManual()"
                    (onConsultarManualCalidad)="consultarManual()">
                </manual-calidad>
                <organigrama #organigrama
                    *ngIf="loadedCalidad"
                    [loadedCalidad]="loadedCalidad"
                    (onCreateNewCargo)="createCargo($event)"
                    (onUpdateCargo)="updateCrago($event)">
                </organigrama>
            </div>
        </div> 
        
    `
})
export class NuestraEmpresaComponent implements OnInit {
    //atributos
    blobLogo: any;
    loadedCalidad: CalidadModel;

    //viewChild
    @ViewChild('manual')
    manual: ManualCalidadComponent;
    @ViewChild('mision')
    mision: MisionComponent;
    @ViewChild('organigrama')
    organigrama: OrganigramaComponent;
    @ViewChild('politica')
    politica: PoliticaComponent;
    @ViewChild('titulo')
    titulo: TituloComponent;
    @ViewChild('valores')
    valores: ValoresComponent;
    @ViewChild('vision')
    vision: VisionComponent;

    constructor(
        private nuestraEmpresaService: NuestraEmpresaService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.loadInitData();
    }

    loadInitData() {
        this.showWaitDialog('Consultado datos, un momento por favor...');
        forkJoin([this.getDetalleCalidad()]).subscribe(([calidad]) => {
            console.log(calidad);
            this.loadedCalidad = calidad;
            if (calidad.empresa_logo != null) {
                this.getLogo();
            } else {
                this.hideWaitDialog();
            }
        });
    }

    consultarManual() {
        this.store.dispatch(
            new fromRoot.Go({
                path: [
                    `visor-pdf/1/${this.loadedCalidad.id}/manual_calidad.pdf`
                ]
            })
        );
    }

    createCargo(cargo: CalidadOrganigramaModel) {
        this.showWaitDialog('Registrando nuevo cargo, un momento por favor...');
        this.nuestraEmpresaService.createCargo(cargo).subscribe(response => {
            this.loadedCalidad.calidad_organigrama = [
                ...this.loadedCalidad.calidad_organigrama,
                response
            ];

            this.organigrama.orderOrganigrama();
            this.hideWaitDialog();
        });
    }

    descargarManual() {
        this.showWaitDialog(
            'Descargando manual de calidad, un momento por favor...'
        );
        this.nuestraEmpresaService
            .downloadAdjunto({ path: this.loadedCalidad.url_manual })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = 'Manual de calidad';
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
            });
    }

    getDetalleCalidad() {
        return this.nuestraEmpresaService.getDetalleCalidad();
    }

    updateCrago(cargo: CalidadOrganigramaModel) {
        this.showWaitDialog('Actualizando organigrama, un momento por favor..');
        this.nuestraEmpresaService
            .updateCargo(cargo.id, cargo)
            .subscribe(response => {
                this.loadedCalidad.calidad_organigrama = [
                    ...this.loadedCalidad.calidad_organigrama.filter(
                        element => element.id != cargo.id
                    ),
                    response
                ];

                this.organigrama.orderOrganigrama();
                this.hideWaitDialog();
            });
    }

    updateEmpresaNombre(empresa_nombre: string) {
        this.showWaitDialog('Actualizando nombre, un momento por favor...');
        this.nuestraEmpresaService
            .updateEmpresaNombre(this.loadedCalidad.id, { empresa_nombre })
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                this.titulo.toggleEdit();
                this.hideWaitDialog();
            });
    }

    updateLogoEmpresa(file: File) {
        this.showWaitDialog('Actualizando logo, un momento por favor...');
        const form: FormData = new FormData();
        form.append('upload', file, file.name);
        this.nuestraEmpresaService
            .updateLogoEmpresa(this.loadedCalidad.id, form)
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                setTimeout(() => {
                    this.getLogo();
                    this.titulo.toggleEdit();
                }, 1);
            });
    }

    updateManual(file: File) {
        this.showWaitDialog(
            'Actualizando manual de calidad, un momento por favor...'
        );
        const form: FormData = new FormData();
        form.append('upload', file, file.name);
        this.nuestraEmpresaService
            .updateManual(this.loadedCalidad.id, form)
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                setTimeout(() => {
                    this.manual.toggleEdit();
                    this.hideWaitDialog();
                }, 1);
            });
    }

    updateMision(mision: string) {
        this.showWaitDialog('Actualizando misión, un momento por favor...');
        this.nuestraEmpresaService
            .updateMision(this.loadedCalidad.id, { mision })
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                setTimeout(() => {
                    this.mision.toggleEdit();
                    this.hideWaitDialog();
                }, 1);
            });
    }

    updatePolitica(politica: string) {
        this.showWaitDialog('Actualizando política, un momento por favor...');
        this.nuestraEmpresaService
            .updatePolitica(this.loadedCalidad.id, { politica })
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                setTimeout(() => {
                    this.politica.toggleEdit();
                    this.hideWaitDialog();
                }, 1);
            });
    }

    updateValores(valores: string) {
        this.showWaitDialog('Actualizando valores, un momento por favor...');
        this.nuestraEmpresaService
            .updateValores(this.loadedCalidad.id, { valores })
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                setTimeout(() => {
                    this.valores.toggleEdit();
                    this.hideWaitDialog();
                }, 1);
            });
    }

    updateVision(vision: string) {
        this.showWaitDialog('Actualizando logo, un momento por favor...');
        this.nuestraEmpresaService
            .updateVision(this.loadedCalidad.id, { vision })
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                setTimeout(() => {
                    this.vision.toggleEdit();
                    this.hideWaitDialog();
                }, 1);
            });
    }

    getLogo() {
        this.nuestraEmpresaService
            .downloadAdjunto({ path: this.loadedCalidad.empresa_logo })
            .subscribe(response => {
                var reader = new FileReader();

                reader.onload = (e: any) => {
                    this.blobLogo = e.target.result;
                    this.hideWaitDialog();
                };

                reader.readAsDataURL(response);
            });
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
