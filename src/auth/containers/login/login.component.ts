import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//store
import { Store } from '@ngrx/store';
import * as fromAuth from '../../store';
//models
import { StoreModel } from '../../../shared/models/store.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'login',
    styleUrls: ['login.component.scss'],
    template: `
        <body class="login-body custom-login-body">
            <div class="login-image"></div>
            <div class="card login-panel ui-fluid">
                <div class="login-panel-content">
                    <div class="ui-g">
                        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                            <div class="ui-g-3" style="text-align:left;">
                                <img src="assets/layout/images/login/icon-login.svg" />
                            </div>
                            <div class="ui-g-9" style="text-align:right;">
                                <h2 class="welcome-text">Welcome Guest</h2>
                                <span class="guest-sign-in">Sign in to Avalon Network</span>
                            </div>
                            <div class="ui-g-12" style="text-align:left;">
                                <label class="login-label">Username</label>
                                <div class="login-input">
                                    <input 
                                        type="text" 
                                        class="ui-inputtext ui-widget ui-state-default ui-corner-all"
                                        formControlName="username"
                                    />
                                </div>
                            </div>
                            <div class="ui-g-12" style="text-align:left;">
                                <label class="login-label">Password</label>
                                <div class="login-input">
                                    <input 
                                        type="password" 
                                        class="ui-inputtext ui-widget ui-state-default ui-corner-all"
                                        formControlName="password"
                                    />
                                </div>
                            </div>
                            <div class="ui-g-12 ui-md-6 button-pane">
                                <button type="submit" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                                    <span class="ui-button-text ui-c">Sign In</span>
                                </button>
                            </div>
                            <div class="ui-g-12 ui-md-6 link-pane">
                                <a href="#">Forget Password?</a>
                            </div>
                        </form>
                        <!-- <pre>{{ form.value | json}}</pre> -->
                    </div>
                </div>
            </div>
        </body>
    `
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private store: Store<StoreModel>) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.store.dispatch(
            new fromAuth.GetToken({
                grant_type: 'password',
                client_id: environment.auth.clientId,
                client_secret: environment.auth.secret,
                password: this.form.value.password,
                username: this.form.value.username,
                scope: ''
            })
        );
    }
}
