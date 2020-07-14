// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: true,
    baseUrl: 'http://localhost:4200',
    apiUrl: 'http://localhost/sgd_backend_v_2_1/public/api',
    publicStorageUrl: 'http://localhost/sgd_backend_v_2_1/public/storage/app',
    auth: {
        urlToken: 'http://localhost/sgd_backend_v_2_1/public/oauth/token',
        secret: 'GzjgA5FBjRtF270LjKN9WUTRojaTg6v0uCN37Dfq',
        clientId: 2
    },
    dateProperties: {
        calendarProperties: {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        },
        dateFormatCalendar: 'dd/mm/yy',
        dateFormatAngularPipe: 'dd/MM/yy',
        dateTimeFormatAngularPipe: 'dd/MM/yy HH:mm:ss'
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
    
    estados_auditoria: {
        creada: 1,
        reunion_programada: 2,
        inicio_preguntas: 3,
        fin_preguntas: 4,
        conclusiones_auditoria: 5,
        pre_finalizacion: 6,
        finalizacion: 7,
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
