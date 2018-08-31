// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    baseUrl: "http://localhost:4200",
    apiUrl: "http://localhost/api-base-5-6/public/api",
    auth: {
        urlToken: "http://localhost/api-base-5-6/public/oauth/token",
        secret: "GzjgA5FBjRtF270LjKN9WUTRojaTg6v0uCN37Dfq",
        clientId: 2
    },
    dateFormatAngular: "yyyy-MM-dd",
    dateFormatPrimeNg: "yy-mm-dd",
    tipos_documento: {
        manual_calidad: {
            id: 1,
            permiso_impresion: 100
        },
        usuario_destreza_documento: {
            id: 2,
            permiso_impresion: 101
        },
        factura_proveedor_documento: {
            id: 3,
            permiso_impresion: 203
        },
        documento_adjunto_doc: {
            id: 3,
            permiso_impresion: 100
        },
        documento_adjunto_flujo_doc: {
            id: 4,
            permiso_impresion: 100
        },
        plano_documento: {
            id: 6,
            permiso_impresion: 903
        },
        accion_correctiva_adjunto: {
            id: 4,
            permiso_impresion: 302
        },
        accion_correctiva_tarea_adjunto: {
            id: 5,
            permiso_impresion: 303
        },
        accion_preventiva_adjunto: {
            id: 10,
            permiso_impresion: 402
        },
        accion_preventiva_tarea_adjunto: {
            id: 11,
            permiso_impresion: 403
        },
        documento_capacitacion: {
            id: 8,
            permiso_impresion: 800
        }
    },
    extensiones_imagen: ["jpg", "gif", "png", "svg", "bmp", "jpeg"],
    estados_documento: {
        en_creacion: 1,
        en_elaboracion: 2,
        en_revision: 3,
        en_aprobacion: 4,
        aprobado: 5,
        en_divulgacion: 6,
        vigente: 7,
        para_reasignacion: 8,
        para_reelaboracion: 9,
        obsoleto: 10,
        rechazado: 11,
        anulado: 12
    }
};
