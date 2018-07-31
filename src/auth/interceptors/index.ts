import { AuthTokenInterceptor } from './auth-token/auth-token.interceptor';
export * from './auth-token/auth-token.interceptor';

export const interceptors: any[] = [AuthTokenInterceptor];
