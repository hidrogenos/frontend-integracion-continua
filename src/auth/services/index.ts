import { LoginService } from './login/login.service';
export * from './login/login.service';

import { TokenService } from './token/token.service';
export * from './token/token.service';

export const services: any[] = [LoginService, TokenService];
