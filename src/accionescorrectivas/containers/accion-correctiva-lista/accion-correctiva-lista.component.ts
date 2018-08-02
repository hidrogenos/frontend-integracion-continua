import { Component, Input, Output, OnInit, ViewChild } from '@angular/core';
import { AccionModel } from '../../../shared/models/accion.model';
import { AccionesCorrectivasService } from '../../services';
import { AccionCorrectivaService  } from "../../../shared/services";

//store
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as fromShared from './../../../shared/store';
import { forkJoin } from 'rxjs';

//Modelos
import { AccionImportanciaModel } from '../../../shared/models/accion-importancia.model';
import { AccionProcesoModel } from '../../../shared/models/accion-proceso.model';

//Child
import { CreateAccionCorrectivaDialogComponent } from '../../components';
import { MessageService } from 'primeng/primeng';

@Component({
    selector: "accion-correctiva-lista",
    template: `<div cass="ui-g">
                <p-growl [(value)]="msgs" life="5000"></p-growl>
                    <div class="ui-g-12" class="card card-w-title">
                        <h2> Acciones Correctivas </h2>

                        <acciones-estados-lista></acciones-estados-lista>
                        
                        <div class="text-aling-right">
                            <button pButton type="button" (click)="cacd.display=true" label="Crear Acción Correctiva" class="ui-button-success">
                            </button>  
                        </div>               
                       
                        <!-- Componente lista de acciones correctivas-->
                        <acciones-lista [data]="accionesCorrectivas" [rows]="10" [loading]="estaCargando" [cols]="colsAccionCorrectiva"
                        [cantidadTotalAcciones]="cantidadTotalAccionesCorrectivas" (onLazy)="loadLazyAccionesCorrectivas($event)"></acciones-lista>
                    </div>
                </div>
                
                <create-accion-correctiva-dialog #cacd [procesos]="procesos" [importancias]="importancias" 
                (onCreateAccionCorrectiva)="createAccionCorrectiva($event)" >
                 </create-accion-correctiva-dialog>`
})
export class AccionCorrectivaListaComponent implements OnInit {
    
    /**
     * @var accionesCorrectivas lista donde se almacenan las acciones correctivas
     */
    private accionesCorrectivas: AccionModel[];

    /**
     * @var cantidadTotalAccionesCorrectivas total de acciones correctivas
     */
    private cantidadTotalAccionesCorrectivas: number;

    /**
     * @var estaCargando si la tabla esta o no en estado de carga
     */
    private estaCargando: boolean;

    private colsAccionCorrectiva : any[];

    private importancias : AccionImportanciaModel[];

    private procesos: AccionProcesoModel[];

    msgs = [];

    //viewChild
    @ViewChild('cacd') onCreateDialog: CreateAccionCorrectivaDialogComponent;


    constructor (private accionesCorrectivasService: AccionesCorrectivasService,
                private resourceAccionCorrectivaService: AccionCorrectivaService,
                private store: Store<StoreModel>,
                private messageService: MessageService) {
        
        this.estaCargando = true;

        this.colsAccionCorrectiva = [
            { field: 'codigo', header: 'Código' },
            { field: 'accion_estado', header: 'Estado' },
            { field: 'titulo', header: 'Titulo' },
            { field: 'importancia', header: 'Importancia' },
            { field: 'responsable', header: 'Responsable' },
            { field: 'fecha_creacion', header: 'Creación' }
        ];
    }

    ngOnInit(){
       this.loadInitData();
    }

    loadInitData() {
        this.showWaitDialog(
            'Acción en proceso',
            'Consultado datos requeridos, un momento por favor...'
        );

        let aux = forkJoin([
            this.getImportancias(),
            this.getProcesos()
        ]);

          aux.subscribe(([ importancias, procesos]) => {
              this.importancias = importancias;
              this.procesos = procesos;
              this.hideWaitDialog();
          });

       return aux;
    }

    loadAccionesCorrectivas() {
        this.accionesCorrectivasService.getAccionesCorrectivas()
        .subscribe(response => 
         {
             this.accionesCorrectivas = response;
             this.cantidadTotalAccionesCorrectivas = response.length;
             this.estaCargando = false;
         });
    }

    /**
     * Este método se encarga de hacer una petición cada vez que sea necesario hacer un lazy loading
     */
    loadLazyAccionesCorrectivas(event) {
        this.estaCargando = true;
        this.accionesCorrectivasService.getLazyAccionesCorrectivas(event)
        .subscribe((response: { cantidad: number,  data: AccionModel[] }) => {
            response.data.forEach(accionCorrectiva => { accionCorrectiva.fecha_creacion = accionCorrectiva.fecha_creacion * 1000});
            this.accionesCorrectivas = response.data;
            this.cantidadTotalAccionesCorrectivas = response.cantidad;
            this.estaCargando = false;
        }, (error) => {
            this.msgs.push({severity:'danger', summary:'Carga fallida',
             detail:'No se han podido obtener respuesta valida del servidor'});
        });
    }

    createAccionCorrectiva(event) {
        this.showWaitDialog(
            'Acción en proceso',
            'Registrando nueva Acción Correctiva, un momento por favor...'
        );
        this.resourceAccionCorrectivaService.createAccionCorrectiva(event)
        .subscribe(response => {
            this.accionesCorrectivas = [
                ...this.accionesCorrectivas,
                response
            ];
            this.hideWaitDialog();
            this.onCreateDialog.display = false;
            this.msgs.push({severity:'success', summary:'Acción exitosa',
             detail:'Enhorabuena!, Se ha creado una Acción correctiva'});
        },
        (error) => {
            this.msgs.push({severity:'danger', summary:'Acción fallida',
             detail:'No se puede crear una acción con un codigo repetido'});
        })
    }

    getImportancias() {
        return this.accionesCorrectivasService.getImportancias();
    }

    getProcesos() {
        return this.accionesCorrectivasService.getProcesos();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}