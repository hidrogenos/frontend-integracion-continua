import { Component, Output, EventEmitter } from '@angular/core';
import {
    trigger,
    state,
    transition,
    style,
    animate
} from '@angular/animations';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as fromAuth from './../../../auth/store';
import { Observable } from '../../../../node_modules/rxjs';
import { UsuarioModel } from '../../../shared/models/usuario.model';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <!-- <img class="profile-image" src="assets/layout/images/avatar.png" /> -->
                <span class="profile-name">{{ (loguedUser$ | async).nombre }} {{ (loguedUser$ | async).apellido }}</span>
                <i class="fa fa-fw fa-caret-down"></i>
                <span class="profile-role">{{ (loguedUser$ | async).perfil.nombre }} </span>
            </a>
        </div>

        <ul id="profile-menu" class="layout-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-user"></i>
                    <span>Profile</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Profile</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-user-secret"></i>
                    <span>Privacy</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Privacy</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-cog"></i>
                    <span>Settings</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Settings</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" [attr.tabindex]="!active ? '-1' : null" (click)="logout($event)">
                    <i class="fa fa-fw fa-sign-out"></i>
                    <span>Cerrar sesion</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Logout</div>
                </div>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state(
                'hidden',
                style({
                    height: '0px'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition(
                'visible => hidden',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hidden => visible',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            )
        ])
    ]
})
export class AppProfileComponent {
    active: boolean;
    loguedUser$: Observable<UsuarioModel> = this.store.select(fromAuth.getUser);

    //events
    @Output()
    onLogout = new EventEmitter<any>();

    constructor(private store: Store<StoreModel>) {}

    logout(event) {
        event.preventDefault();
        this.onLogout.emit();
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
}
