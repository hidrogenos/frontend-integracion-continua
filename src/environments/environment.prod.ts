export const environment = {
    production: true,
    baseUrl: 'http://144.217.89.76/sgd/app',
    apiUrl: 'http://144.217.89.76/sgd/api/public/api',
    publicStorageUrl: 'http://144.217.89.76/sgd/api/storage/app',
    auth: {
        urlToken: 'http://144.217.89.76/sgd/api/public/oauth/token',
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
        },
        accion_preventiva_adjunto: {
            id: 9,
            permiso_impresion: 402
        },
        accion_preventiva_tarea_adjunto: {
            id: 10,
            permiso_impresion: 403
        },
        documento_capacitacion: {
            id: 11,
            permiso_impresion: 800
        },
        documento_archivo_soporte: {
            id: 12,
            permiso_impresion: 900
        },
        documento_editor: {
            id: 13,
            permiso_impresion: 100
        },
        registro_documento: {
            id: 14,
            permiso_impresion: 903
        },
        documento_externo: {
            id: 14,
            permiso_impresion: 903
        },
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
        anulado: 12,
        visto_bueno_calidad: 13,
        eliminado: 14
    },
    permiso_documento: {
        crear: 1,
        imprimir_adjuntos: 2,
        imprimir_adjuntos_flujo: 3,
        elaborar_ajenos: 4,
        revisar_ajenos: 5,
        aprobar_ajenos: 6,
        ver_lista_documentos: 7,
        ver_documentos_obsoletos: 8,
        ver_documentos_eliminados: 8,
        imprimir_editor: 9
    },
    nombres_modulos_visuales: {
        acciones_correctivas: 'Desviación',
        acciones_preventivas: 'Análisis de riesgos'
    }
};
