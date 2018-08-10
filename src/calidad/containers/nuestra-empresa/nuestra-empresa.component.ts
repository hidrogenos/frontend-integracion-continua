import { Component, OnInit, ViewChild } from '@angular/core';
import { NuestraEmpresaService } from '../../services';
import { forkJoin } from 'rxjs';
import { CalidadModel } from '../../../shared/models/calidad.model';
import { TituloComponent } from '../../components';

@Component({
    selector: 'nuestra-empresa',
    styleUrls: ['nuestra-empresa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <titulo #titulo
                    *ngIf="loadedCalidad && blobLogo"
                    [loadedCalidad]="loadedCalidad"
                    [blobLogo]="blobLogo"
                    (onUpdateEmpresaNombre)="updateEmpresaNombre($event)"
                    (onUpdateEmpresaLogo)="updateLogoEmpresa($event)">
                </titulo>
            </div>
        </div> 
        
    `
})
export class NuestraEmpresaComponent implements OnInit {
    //atributos
    blobLogo: any;
    loadedCalidad: CalidadModel;

    //viewChild
    @ViewChild('titulo')
    titulo: TituloComponent;

    constructor(private nuestraEmpresaService: NuestraEmpresaService) {}

    ngOnInit() {
        this.loadInitData();
    }

    loadInitData() {
        forkJoin([this.getDetalleCalidad()]).subscribe(([calidad]) => {
            console.log(calidad);
            this.loadedCalidad = calidad;

            if (calidad.empresa_logo != null) {
                this.getLogo();
            }
        });
    }

    getDetalleCalidad() {
        return this.nuestraEmpresaService.getDetalleCalidad();
    }

    updateEmpresaNombre(empresa_nombre: string) {
        this.nuestraEmpresaService
            .updateEmpresaNombre(this.loadedCalidad.id, { empresa_nombre })
            .subscribe(response => {
                this.loadedCalidad = {
                    ...this.loadedCalidad,
                    ...response
                };
                this.titulo.toggleEdit();
            });
    }

    updateLogoEmpresa(file: File) {
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

    getLogo() {
        this.nuestraEmpresaService
            .downloadAdjunto({ path: this.loadedCalidad.empresa_logo })
            .subscribe(response => {
                var reader = new FileReader();

                reader.onload = e => {
                    this.blobLogo = e.target.result;
                };

                reader.readAsDataURL(response);
            });
    }
}
