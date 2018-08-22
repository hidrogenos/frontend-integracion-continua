import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'image-viewer',
    styleUrls: ['image-viewer.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <button 
                    pButton 
                    style="margin-right: 10px;"
                    type="button" 
                    icon="fa fa-search-plus"
                    (click)="zoomIn()"
                    class="ui-button-success">
                </button>
                <button 
                    pButton 
                    style="margin-right: 10px;"
                    type="button" 
                    icon="fa fa-search-minus"
                    (click)="zoomOut()"
                    class="ui-button-success">
                </button>
                <button 
                    pButton 
                    type="button" 
                    icon="fa fa-refresh"
                    (click)="initImage()"
                    class="ui-button-success">
                </button>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12">
                <canvas #myCanva class="canvas-class" width="1000" height="800"></canvas>
            </div>
        </div>
        
    `
})
export class ImageViewerComponentComponent implements AfterContentInit {
    //atributos
    initialX: number;
    initialY: number;
    moveStartX: number;
    moveStartY: number;
    img: HTMLImageElement;
    scaleW: number;
    scaleH: number;
    url: any;
    zoomIndex: number = 0;

    @ViewChild('myCanva')
    canvas;
    constructor() {}

    //Observables
    down$: Observable<MouseEvent>;
    up$: Observable<MouseEvent>;
    move$: Observable<MouseEvent>;

    ngAfterContentInit() {
        this.initImage();
        this.initMoveImage();
    }

    drawImage() {
        let canva: HTMLCanvasElement = this.canvas.nativeElement;
        const ctx = canva.getContext('2d');

        ctx.clearRect(
            0,
            0,
            this.canvas.nativeElement.width,
            this.canvas.nativeElement.height
        );

        if (
            this.zoomIndex == 0 ||
            this.zoomIndex == 1 ||
            this.zoomIndex == -1
        ) {
            this.initialX =
                this.canvas.nativeElement.width / 2 - this.img.width / 2;
            this.initialY =
                this.canvas.nativeElement.height / 2 - this.img.height / 2;
        }

        if (this.zoomIndex > 1) {
            this.initialX =
                this.canvas.nativeElement.width / 2 -
                (this.img.width * this.zoomIndex) / 2;
            this.initialY =
                this.canvas.nativeElement.height / 2 -
                (this.img.height * this.zoomIndex) / 2;
        }

        ctx.drawImage(this.img, this.initialX, this.initialY);
    }

    initImage() {
        let canva: HTMLCanvasElement = this.canvas.nativeElement;
        const ctx = canva.getContext('2d');

        this.img = new Image();
        this.img.src = this.url;
        this.img.addEventListener('load', () => {
            this.scaleW = this.img.width;
            this.scaleH = this.img.height;
            this.zoomIndex = 1;
            this.drawImage();
        });
    }

    initMoveImage() {
        let canva: HTMLCanvasElement = this.canvas.nativeElement;
        const ctx = canva.getContext('2d');

        this.down$ = fromEvent(this.canvas.nativeElement, 'mousedown');
        this.up$ = fromEvent(this.canvas.nativeElement, 'mouseup');
        this.move$ = fromEvent(this.canvas.nativeElement, 'mousemove');

        this.down$
            .pipe(
                tap((event: MouseEvent) => {
                    this.moveStartX = event.clientX;
                    this.moveStartY = event.clientY;
                }),
                switchMap((down: MouseEvent) =>
                    this.move$.pipe(takeUntil(this.up$))
                )
            )
            .subscribe((event: MouseEvent) => {
                this.initialX =
                    this.initialX + (event.clientX - this.moveStartX);
                this.initialY =
                    this.initialY + (event.clientY - this.moveStartY);

                ctx.clearRect(
                    0,
                    0,
                    this.canvas.nativeElement.width,
                    this.canvas.nativeElement.height
                );

                ctx.drawImage(
                    this.img,
                    this.initialX,
                    this.initialY,
                    this.scaleW,
                    this.scaleH
                );

                this.moveStartX = event.clientX;
                this.moveStartY = event.clientY;
            });
    }

    paintZoom() {
        let initialX = 0;
        let initialY = 0;
        if (this.zoomIndex > 1) {
            this.scaleW = this.img.width * this.zoomIndex;
            this.scaleH = this.img.height * this.zoomIndex;

            initialX =
                this.canvas.nativeElement.width / 2 -
                (this.img.width * this.zoomIndex) / 2;
            initialY =
                this.canvas.nativeElement.height / 2 -
                (this.img.height * this.zoomIndex) / 2;
        } else if (this.zoomIndex < -1) {
            const aux = this.zoomIndex * -1;
            this.scaleW = this.img.width / aux;
            this.scaleH = this.img.height / aux;

            initialX =
                this.canvas.nativeElement.width / 2 - this.img.width / aux / 2;
            initialY =
                this.canvas.nativeElement.height / 2 -
                this.img.height / aux / 2;
        } else {
            this.scaleW = this.img.width * this.zoomIndex;
            this.scaleH = this.img.height * this.zoomIndex;

            initialX =
                this.canvas.nativeElement.width / 2 -
                (this.img.width * this.zoomIndex) / 2;
            initialY =
                this.canvas.nativeElement.height / 2 -
                (this.img.height * this.zoomIndex) / 2;
        }

        let canva: HTMLCanvasElement = this.canvas.nativeElement;
        const ctx = canva.getContext('2d');

        ctx.clearRect(
            0,
            0,
            this.canvas.nativeElement.width,
            this.canvas.nativeElement.height
        );

        ctx.drawImage(this.img, initialX, initialY, this.scaleW, this.scaleH);
    }

    zoomIn() {
        if (this.zoomIndex == 0 || this.zoomIndex == -1) {
            this.zoomIndex = 1;
        }

        this.zoomIndex++;

        this.paintZoom();
    }

    zoomOut() {
        if (this.zoomIndex == 0 || this.zoomIndex == 1) {
            this.zoomIndex = -1;
        }

        this.zoomIndex--;

        this.paintZoom();
    }
}
