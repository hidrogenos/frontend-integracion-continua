// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    baseUrl: 'http://localhost:4200',
    apiUrl: 'http://localhost:8083/APISGDv2_1/public/api',
    auth: {
        urlToken: 'http://localhost:8083/APISGDv2_1/public/oauth/token',
        secret: 'yr4UMVVPu73VVBv4ureOri14UpqZwASy2JKuXuNm',
        clientId: 4
    },
    dateFormatAngular: 'yyyy-MM-dd',
    dateFormatPrimeNg: 'yy-mm-dd',
    ids_tipo_documento: {
        manual_calidad: 1
    },
    extensiones_imagen: ['jpg', 'gif', 'png', 'svg', 'bmp']
};
