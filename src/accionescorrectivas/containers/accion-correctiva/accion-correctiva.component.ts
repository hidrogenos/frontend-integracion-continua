import { Component, Input, Output, OnInit } from '@angular/core';
import { AccionModel } from '../../../shared/models/accion/accion.model';
import { AccionesCorrectivasService } from '../../services';


@Component({
    selector: "accion-correctiva",
    templateUrl: "accion-correctiva.html"
})
export class AccionCorrectivaComponent implements OnInit {
    
    /**
     * @var accionesCorrectivas lista donde se almacenan las acciones correctivas
     */
    private accionesCorrectivas: AccionModel[];

    /**
     * @var cantidadTotalAccionesCorrectivas total de acciones correctivas
     */
    private cantidadTotalAccionesCorrectivas: number;


    constructor (private accionesCorrectivasService: AccionesCorrectivasService) {
            
    }

    /**
     * Este método se encarga de hacer una petición cada vez que sea necesario hacer un lazy loading
     */
    loadLazyAccionesCorrectivas(event) {
        
        this.accionesCorrectivasService.getLazyAccionesCorrectivas(event)
        .subscribe((response: { cantidad: number,  data: AccionModel[] }) => {
            this.accionesCorrectivas = response.data;
            this.cantidadTotalAccionesCorrectivas = response.cantidad;
        });
    }

    ngOnInit(){
        
    }

}