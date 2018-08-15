import { Component } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'alert-message',
    template: `
        <p-toast key="global-toast"></p-toast>
    `
})
export class AlertMessageComponent {
    
    msgs: Message[];
    
    constructor() {}
}