export const environment = {
    production: true,
    baseUrl: 'http://144.217.85.84/sgd-v-2-1/app',
    apiUrl: 'http://144.217.85.84/sgd-v-2-1/api/public/api',
    auth: {
        urlToken: 'http://144.217.85.84/sgd-v-2-1/api/public/oauth/token',
        secret: 'GzjgA5FBjRtF270LjKN9WUTRojaTg6v0uCN37Dfq',
        clientId: 2
    },
    dateFormatAngular: 'yyyy-MM-dd',
    dateFormatPrimeNg: 'yy-mm-dd',
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
            id: 4,
            permiso_impresion: 100
        },
        documento_adjunto_flujo_doc: {
            id: 5,
            permiso_impresion: 100
        },
        plano_documento: {
            id: 6,
            permiso_impresion: 903
        },
        accion_correctiva_adjunto: {
            id: 7,
            permiso_impresion: 302
        },
        accion_correctiva_tarea_adjunto: {
            id: 8,
            permiso_impresion: 303
        }
    },
    extensiones_imagen: ['jpg', 'gif', 'png', 'svg', 'bmp', 'jpeg'],
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
