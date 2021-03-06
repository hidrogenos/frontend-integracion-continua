import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.scss'],
    template: `
        <div>
            <router-outlet></router-outlet>
            <wait-dialog></wait-dialog>
            <alert-message></alert-message>
        </div>
    `
})
export class AppComponent {
    constructor() { }
}
