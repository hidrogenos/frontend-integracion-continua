import { Component, AfterContentInit, ViewChild } from '@angular/core';

@Component({
    selector: 'image-viewer',
    styleUrls: ['image-viewer.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <canvas #myCanva class="canvas-class" width="1000" height="800"></canvas>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12">
                <!--<img id="source" [src]="url" />-->
            </div>
        </div>
    `
})
export class ImageViewerComponentComponent implements AfterContentInit {
    url: any;

    @ViewChild('myCanva')
    canvas;
    constructor() {}

    ngAfterContentInit() {
        let canva: HTMLCanvasElement = this.canvas.nativeElement;
        var ctx = canva.getContext('2d');

        let img = new Image();
        img.src = this.url;
        img.addEventListener('load', () => {
            let startWidth =
                this.canvas.nativeElement.width / 2 - img.width / 2;
            let startHeight =
                this.canvas.nativeElement.height / 2 - img.height / 2;
            ctx.drawImage(img, startWidth, startHeight);
        });
    }
}
