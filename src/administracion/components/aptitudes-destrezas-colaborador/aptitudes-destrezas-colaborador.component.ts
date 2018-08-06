import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'aptitudes-destrezas-colaborador',
    styleUrls: ['aptitudes-destrezas-colaborador.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                <button style="margin-right:10px;" pButton 
                    type="button" 
                    label="Agregar aptitud o desterza" 
                    class="ui-button-warning"
                    (click)="cpdc.display = true">
                </button>
            </div>
        </div>
        <create-aptitud-destreza-colaborador #cpdc
            (onCreateDestreza)="onCreateDestreza.emit($event)">
        </create-aptitud-destreza-colaborador>
        
    `
})
export class AptitudesDestrezasColaboradorComponent {
    //events
    @Output() onCreateDestreza = new EventEmitter<any>();
    constructor() {}
}
