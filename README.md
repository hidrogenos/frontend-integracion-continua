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
