import { ProveedoresComponent } from './proveedores/proveedores.component';
export * from './proveedores/proveedores.component';

import { ProveedorDetalleComponent } from './proveedores-detalle/proveedor-detalle.component';
export * from './proveedores-detalle/proveedor-detalle.component';

import { EvaluacionProveedorComponent } from './evaluacion-proveedor/evaluacion-proveedor.component';
export * from './evaluacion-proveedor/evaluacion-proveedor.component';


import { FacturasProveedorComponent } from './facturas-proveedor/facturas-proveedor.component';
export * from './facturas-proveedor/facturas-proveedor.component';

export const containers: any[] = [
    ProveedoresComponent,
    ProveedorDetalleComponent,
    EvaluacionProveedorComponent,
    FacturasProveedorComponent
];
