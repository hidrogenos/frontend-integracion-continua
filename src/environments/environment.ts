// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    baseUrl: 'http://localhost:4200',
    apiUrl: 'http://localhost/api-base-5-6/public/api',
    auth: {
        urlToken: 'http://localhost/api-base-5-6/public/oauth/token',
        secret: 'FmHkt9kqxNu1JUCnbWjY6ODIHeb7J29Ds9im63Kp',
        clientId: 2
    }
};
