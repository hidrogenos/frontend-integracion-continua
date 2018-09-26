import { Component } from '@angular/core';

@Component({
    selector: 'documento-vencido',
    template: `
        <div class="ui-g">
            <div class="ui-12">
                <img src="./assets/layout/images/exception/icon-error.png"/>
                <div class="line"></div>
                <h1>Documento Vencido</h1>
                <p>El documento que intenta consultar se encuentra vencido</p>
                <p>Si considera que esta restricción es un error por favor comuníquese con su administrador</p>
            </div>
        </div>
    `
})
export class DocumentAccessDeniedComponent {
    constructor() { }
}
