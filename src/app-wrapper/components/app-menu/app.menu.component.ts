import {
    Component,
    Input,
    OnInit,
    EventEmitter,
    ViewChild
} from '@angular/core';
import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';
import { MenuItem } from 'primeng/primeng';
import { AppWrapperComponent } from './../../containers/app-wrapper/app-wrapper.component';
import { Store } from '@ngrx/store';
import * as fromShared from './../../../shared/store';
import { switchMap, map } from 'rxjs/operators';
import { DocumentoTipoModel } from '../../../shared/models/documento-tipo.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu layout-main-menu clearfix"
            [reset]="reset" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {
    @Input()
    reset: boolean;

    model: any[];

    theme = 'blue';

    layout = 'blue';

    version = 'v3';

    documentos: MenuItem[] = [];

    constructor(
        public app: AppWrapperComponent,
        private store: Store<fromShared.SharedState>
    ) { }

    ngOnInit() {
        this.buildMenuDocumentos().subscribe(response => {
            this.model = [
                {
                    label: 'Inicio',
                    icon: 'fa fa-fw fa-home',
                    routerLink: ['/']
                },
                {
                    label: 'Calidad',
                    icon: 'fa fa-quora',
                    routerLink: ['/calidad/nuestra-empresa/inicio'],
                    items: [
                        {
                            label: 'Nuestra organización',
                            icon: 'fa fa-building-o',
                            routerLink: ['/calidad/nuestra-empresa/inicio']
                        },
                        {
                            label: 'Organigrama',
                            icon: 'fa fa-sitemap',
                            routerLink: ['/calidad/nuestra-empresa/organigrama']
                        },
                        {
                            label: 'Mapa de procesos',
                            icon: 'fa fa-map-signs',
                            routerLink: [
                                '/calidad/nuestra-empresa/mapa-procesos'
                            ]
                        }
                    ]
                },

                {
                    label: 'Acciones',
                    icon: 'fa fa-fw fa-wrench',
                    items: [
                        {
                            label: environment.nombres_modulos_visuales.acciones_correctivas,
                            icon: 'fa fa-fw fa-thermometer-full',
                            routerLink: ['/acciones/acciones-correctivas']
                        },
                        {
                            label: environment.nombres_modulos_visuales.acciones_preventivas,
                            icon: 'fa fa-fw fa-thermometer-empty',
                            routerLink: ['/acciones/acciones-preventivas']
                        }
                    ]
                },
                {
                    label: 'Auditorias',
                    icon: 'fa fa-fw fa-eye',
                    items: [
                        {
                            label: 'Adm. listas',
                            icon: 'fa fa-fw fa-tag',
                            routerLink: ['/auditoria/administrador-listas']
                        },
                        {
                            label: 'Externas',
                            icon: 'fa fa-fw fa-tag',
                            routerLink: ['/auditoria/externa/lista']
                        }
                    ]
                },
                {
                    label: 'Documentos',
                    icon: 'fa fa-fw fa-book',
                    items: this.documentos
                },
                {
                    label: 'Informes',
                    icon: 'fa fa-fw fa-file-pdf-o',
                    items: [
                        {
                            label: 'Listado documentos',
                            icon: 'fa fa-fw fa-file-pdf-o',
                            routerLink: ['/informes/listado-documentos']
                        },
                        {
                            label: 'Informes acciones',
                            icon: 'fa fa-fw fa-file-pdf-o',
                            routerLink: ['/informes/listado-reportes-acciones']
                        }
                    ]
                },
                {
                    label: 'Planos',
                    icon: 'fa fa-fw fa-braille',
                    routerLink: ['/planos/lista']
                },
                {
                    label: 'Registros',
                    icon: 'fa fa-folder-open',
                    routerLink: ['/registros/lista']
                },
                {
                    label: 'Documentos Externos',
                    icon: 'fa fa-fw fa-folder-open-o',
                    routerLink: ['/documentos-externos/lista']
                },
                {
                    label: 'Capacitaciones',
                    icon: 'fa fa-fw fa-graduation-cap',
                    routerLink: ['/capacitaciones/lista']
                },
                {
                    label: 'Administración',
                    icon: 'fa fa-fw fa-lock',
                    items: [
                        {
                            label: 'Colaboradores',
                            icon: 'fa fa-fw fa-users',
                            routerLink: ['/administracion/colaboradores']
                        },
                        {
                            label: 'Permisos',
                            icon: 'fa fa-fw fa-unlock',
                            routerLink: ['/administracion/permisos']
                        },
                        {
                            label: 'Eps',
                            icon: 'fa fa-fw fa-heartbeat',
                            routerLink: ['/administracion/eps']
                        },
                        {
                            label: 'Arl',
                            icon: 'fa fa-fw fa-building',
                            routerLink: ['/administracion/arl']
                        },
                        {
                            label: 'Pensión',
                            icon :'fa fa-fw fa-institution',
                            routerLink: ['/administracion/pension']
                        },
                        {
                            label: 'Cesantías',
                            icon: 'fa fa-fw fa-institution',
                            routerLink: ['/administracion/cesantias']

                        },
                        {
                            label: 'Caja de compensación',
                            icon: 'fa fa-fw fa-briefcase',
                            routerLink: ['/administracion/caja-compensacion']
                        },
                        {
                            label: 'País',
                            icon: 'fa fa-fw fa-globe',
                            routerLink: ['/administracion/pais']
                        },
                        {
                            label: 'Departamento',
                            icon: 'fa fa-fw fa-map',
                            routerLink: ['/administracion/departamento']
                        },
                        {
                            label: 'Ciudad',
                            icon :'fa fa-fw fa-map-signs',
                            routerLink: ['/administracion/ciudad']
                        },
                        {
                            label: 'Documentos restringidos',
                            icon: 'fa fa-shield',
                            routerLink: ['/administracion/lista-documentos-restringidos']
                        }
                    ]
                },
                {
                    label: 'Equipos',
                    icon: 'fa fa-fw fa-microchip',
                    routerLink: ['/equipos']
                },
                {
                    label: 'Proveedores',
                    icon: 'fa fa-fw fa-industry',
                    routerLink: ['/proveedores/lista']
                }
            ];
        });
    }

    buildMenuDocumentos(): Observable<boolean> {
        return this.store.select(fromShared.getAllDocumentoTipos).pipe(
            switchMap((tipos: DocumentoTipoModel[]) => {
                tipos.map((tipo: DocumentoTipoModel) => {
                    let item: MenuItem = {
                        label: tipo.nombre,
                        icon: 'fa fa-fw fa-file-text-o',
                        routerLink: [`/documentos/${tipo.id}`]
                    };
                    this.documentos = [...this.documentos, item];
                });
                return of(true);
            })
        );
    }

    changeTheme(theme: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>(
            document.getElementById('theme-css')
        );

        if (this.version === 'v3') {
            themeLink.href = 'assets/theme/theme-' + theme + '.css';
        } else {
            themeLink.href = 'assets/theme/theme-' + theme + '-v4' + '.css';
        }

        this.theme = theme;
    }

    changeLayout(layout: string, special?: boolean) {
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>(
            document.getElementById('layout-css')
        );

        if (this.version === 'v3') {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
        } else {
            layoutLink.href =
                'assets/layout/css/layout-' + layout + '-v4' + '.css';
        }

        this.layout = layout;

        if (special) {
            this.app.darkMenu = true;
        }
    }

    changeVersion(version: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>(
            document.getElementById('theme-css')
        );
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>(
            document.getElementById('layout-css')
        );

        if (version === 'v3') {
            this.version = 'v3';
            themeLink.href = 'assets/theme/theme-' + this.theme + '.css';
            layoutLink.href =
                'assets/layout/css/layout-' + this.layout + '.css';
        } else {
            themeLink.href =
                'assets/theme/theme-' + this.theme + '-v4' + '.css';
            layoutLink.href =
                'assets/layout/css/layout-' + this.layout + '-v4' + '.css';
            this.version = '-v4';
        }
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   class="ripplelink" *ngIf="!child.routerLink"
                    [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <div class="submenu-arrow" *ngIf="child.items"></div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?
                     'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state(
                'hiddenAnimated',
                style({
                    height: '0px'
                })
            ),
            state(
                'visibleAnimated',
                style({
                    height: '*'
                })
            ),
            state(
                'visible',
                style({
                    display: 'block'
                })
            ),
            state(
                'hidden',
                style({
                    display: 'none'
                })
            ),
            transition(
                'visibleAnimated => hiddenAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hiddenAnimated => visibleAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            )
        ])
    ]
})
export class AppSubMenuComponent {
    @Input()
    item: MenuItem;

    @Input()
    root: boolean;

    @Input()
    visible: boolean;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;

    constructor(public app: AppWrapperComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = this.activeIndex === index ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (
            this.root &&
            this.app.menuHoverActive &&
            (this.app.isHorizontal() || this.app.isSlim()) &&
            !this.app.isMobile() &&
            !this.app.isTablet()
        ) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input()
    get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input()
    get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
