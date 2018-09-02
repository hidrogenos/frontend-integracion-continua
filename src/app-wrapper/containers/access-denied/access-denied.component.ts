import { Component } from '@angular/core';

@Component({
    selector: 'access-denied',
    template: `
        <div class="ui-g">
            <div class="ui-12">
                <img src="./assets/layout/images/exception/icon-error.png"/>

                <div class="line"></div>
                
                <h1>Acceso Denegado</h1>
                <p>Usted no posee privilegios de acceso al recurso solicitado</p>
                <p>Si considera que esta restricción es un error por favor comuníquese con su administrador</p>
            </div>
        </div>
    `
})
export class AccessDeniedComponent {
    constructor() { }
}
