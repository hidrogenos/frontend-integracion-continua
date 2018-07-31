import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//environment
import { environment } from '../../../environments/environment';

//models
import { TokenModel } from '../../../shared/models/token.model';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TokenService {
    constructor(private http: HttpClient) {}

    getToken(payload: {
        grant_type: string;
        client_id: number;
        client_secret: string;
        username: string;
        password: string;
        scope: string;
    }): Observable<TokenModel> {
        return this.http
            .post<TokenModel>(environment.auth.urlToken, payload)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
