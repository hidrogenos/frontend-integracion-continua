import {
    Component,
    AfterViewInit,
    ElementRef,
    Renderer2,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { ScrollPanel } from 'primeng/primeng';
import { Store } from '../../../../node_modules/@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as fromRoot from './../../../app/store';
import * as fromAuth from './../../../auth/store';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    SLIM,
    HORIZONTAL
}

@Component({
    selector: 'app-wrapper',
    styleUrls: ['app-wrapper.component.scss'],
    template: `
        <div class="layout-wrapper" (click)="onLayoutClick()"
            [ngClass]="{'menu-layout-static': !isOverlay(),
                        'menu-layout-overlay': isOverlay(),
                        'layout-menu-overlay-active': overlayMenuActive,
                        'menu-layout-horizontal': isHorizontal(),
                        'menu-layout-slim': isSlim(),
                        'layout-menu-static-inactive': staticMenuDesktopInactive,
                        'layout-menu-static-active': staticMenuMobileActive}">

            <app-topbar></app-topbar>

            <div class="layout-menu-container" [ngClass]="{'layout-menu-dark':darkMenu}" (click)="onMenuClick($event)">
                <p-scrollPanel #layoutMenuScroller [style]="{height: '100%' }">
                    <div class="menu-scroll-content">
                        <app-inline-profile *ngIf="profileMode=='inline'&&!isHorizontal()"
                            (onLogout)="logout()"></app-inline-profile>
                        <app-menu [reset]="resetMenu"></app-menu>
                    </div>
                </p-scrollPanel>
            </div>
            
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
            
            <div class="layout-mask"></div>
            
            <app-footer></app-footer>

        </div>
    `
})
export class AppWrapperComponent {
    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    darkMenu = false;

    profileMode = 'inline';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    @ViewChild('layoutMenuScroller')
    layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public renderer: Renderer2, private store: Store<StoreModel>) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.layoutMenuScrollerViewChild.moveBar();
        }, 100);
    }

    logout() {
        localStorage.clear();
        this.store.dispatch(new fromRoot.Go({ path: ['auth/login'] }));
        this.store.dispatch(new fromAuth.Logout());
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this
                    .staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => {
                this.layoutMenuScrollerViewChild.moveBar();
            }, 450);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    isSlim() {
        return this.layoutMode === MenuOrientation.SLIM;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    changeToSlimMenu() {
        this.layoutMode = MenuOrientation.SLIM;
    }
}
