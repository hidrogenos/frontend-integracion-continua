Observaciones migracion v2 a V2.1

## TABLA sgd_arl

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_caja_compensacion

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_calidad_organigrama

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_cesantia

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_ciudad

-> se eliminan los campos:
-> cod_pais.
-> cod_dep.
-> cod_ciudad.
-> se gregan los campos:
-> id_departamento: llave foranea a la tabla departamento.
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_departamento

-> se eliminan los campos:
-> cod_pais.
-> cod_dep.
-> se gregan los campos:
-> id: llave primaria.
-> id_pais: llave foranea ala tabla pais.
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_eps

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_pais

-> se elimina la columna cod_pais
-> se gregan los campos:
-> id: llave pprimaria.
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_pension

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_perfil

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_tipo_identificacion

-> se gregan los campos:
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_usuario

-> se cambia el nombre de la tabla a "users".
-> se eliminan los campos id_departamento e id_pais esta información es heredada de la tabla ciudad.
-> se gregan los campos
-> remember_token: compatibilidad con passport.
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva

-> se agrega la constraint unique al campo código para que no se pueda repetir y se encapsula
el error si se repite el código
-> se elimina el campo fecha_creación y se reemplaza por el created_at
-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva_adjunto

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva_estado

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva_proceso

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva_tarea

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva_tarea_adjunto

-> se agregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva_tarea_responsable

-> se agregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_correctiva_tarea_tipo

se eliminan los campos
-> id_usuario
-> fecha_creacion

-> se agregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_importancia

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_calidad

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_calidad_mapa_procesos

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_calidad_mapa_procesos_hijo

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_calidad_organigrama

-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_analisis_tipo

-> se gregan los campos
-> se eliminan los campos id_usuario y fecha
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.

## TABLA sgd_accion_analisis

Se elimino la tabla.
Se segmento en acciones correctivas y preventivas

## TABLA sgd_accion_analisis_hijo

Se elimino la tabla.
Se segmento en acciones correctivas y preventivas


## TABLA sgd_accion_correctiva_analisis

se creo la tabla en base a los campos de sgd_accion_analisis,
solo para acciones correctivas
-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.


## TABLA sgd_accion_correctiva_analisis_hijo

se creo la tabla en base a los campos de sgd_accion_analisis_hijo,
solo para acciones correctivas
-> se gregan los campos
-> created_at: compatibilidad con eloquent.
-> updated_at: compatibilidad con eloquent.