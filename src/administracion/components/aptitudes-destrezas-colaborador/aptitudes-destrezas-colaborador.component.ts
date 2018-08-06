import { Component } from '@angular/core';

@Component({
    selector: 'aptitudes-destrezas-colaborador',
    styleUrls: ['aptitudes-destrezas-colaborador.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                <button style="margin-right:10px;" pButton 
                    type="button" 
                    icon="pi pi-plus"
                    label="Agregar aptitud o desterza" 
                    class="ui-button-warning"
                    (click)="rcc.display = true">
                </button>
            </div>
        </div>
    `
})
export class AptitudesDestrezasColaboradorComponent {
    constructor() {}
}
