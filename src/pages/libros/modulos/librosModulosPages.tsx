/**
 * Un componente por módulo (pantalla) para alinear el frontend con los endpoints /libros/* del backend.
 */
import LibrosLista from '../LibrosLista';
import LibrosInformeVista from '../LibrosInformeVista';
import ConfiguracionContabilidadPage from '../ConfiguracionContabilidadPage';

const col = (value: string, label: string) => ({ value, label });

export const LibrosPlanCuentasPage = () => (
  <LibrosLista
    titulo="Plan de cuentas"
    url="libros/plan-cuentas"
    columns={[col('nombre', 'Nombre'), col('tipoRaiz', 'Tipo raíz'), col('cuentaPadre', 'Cuenta padre')]}
    filtros={[{ label: 'Nombre', field: 'nombre' }]}
  />
);

export const LibrosSociosComercialesPage = () => (
  <LibrosLista
    titulo="Socios comerciales"
    url="libros/socios-comerciales"
    columns={[col('nombre', 'Nombre'), col('rol', 'Rol'), col('correo', 'Correo')]}
    filtros={[{ label: 'Nombre', field: 'nombre' }]}
  />
);

export const LibrosArticulosPage = () => (
  <LibrosLista
    titulo="Artículos"
    url="libros/articulos"
    columns={[col('nombre', 'Nombre'), col('codigoArticulo', 'Código'), col('proposito', 'Propósito')]}
  />
);

export const LibrosVentasCotizacionesPage = () => (
  <LibrosLista
    titulo="Cotizaciones venta"
    url="libros/ventas/cotizaciones"
    columns={[col('nombre', 'Nº'), col('tercero', 'Tercero'), col('fecha', 'Fecha')]}
  />
);

export const LibrosVentasFacturasPage = () => (
  <LibrosLista
    titulo="Facturas venta"
    url="libros/ventas/facturas"
    columns={[col('nombre', 'Nº'), col('tercero', 'Tercero'), col('totalGeneral', 'Total')]}
  />
);

export const LibrosVentasPagosPage = () => (
  <LibrosLista
    titulo="Pagos venta"
    url="libros/ventas/pagos"
    columns={[col('nombre', 'Nº'), col('tercero', 'Tercero'), col('monto', 'Monto')]}
  />
);

export const LibrosVentasClientesPage = () => (
  <LibrosLista
    titulo="Clientes"
    url="libros/ventas/clientes"
    columns={[col('nombre', 'Nombre'), col('rol', 'Rol'), col('correo', 'Correo')]}
  />
);

export const LibrosVentasArticulosPage = () => (
  <LibrosLista
    titulo="Artículos (venta)"
    url="libros/ventas/articulos"
    columns={[col('nombre', 'Nombre'), col('proposito', 'Propósito')]}
  />
);

export const LibrosComprasFacturasPage = () => (
  <LibrosLista
    titulo="Facturas compra"
    url="libros/compras/facturas"
    columns={[col('nombre', 'Nº'), col('tercero', 'Proveedor'), col('totalGeneral', 'Total')]}
  />
);

export const LibrosComprasPagosPage = () => (
  <LibrosLista
    titulo="Pagos compra"
    url="libros/compras/pagos"
    columns={[col('nombre', 'Nº'), col('tercero', 'Tercero'), col('monto', 'Monto')]}
  />
);

export const LibrosComprasProveedoresPage = () => (
  <LibrosLista
    titulo="Proveedores"
    url="libros/compras/proveedores"
    columns={[col('nombre', 'Nombre'), col('rol', 'Rol')]}
  />
);

export const LibrosComprasArticulosPage = () => (
  <LibrosLista
    titulo="Artículos (compra)"
    url="libros/compras/articulos"
    columns={[col('nombre', 'Nombre'), col('proposito', 'Propósito')]}
  />
);

export const LibrosComunEntradasDiarioPage = () => (
  <LibrosLista
    titulo="Entradas diario"
    url="libros/comun/entradas-diario"
    columns={[col('nombre', 'Nº'), col('tipoEntrada', 'Tipo'), col('fecha', 'Fecha')]}
  />
);

export const LibrosConfigPlantillasImpuestosPage = () => (
  <LibrosLista
    titulo="Plantillas impuestos"
    url="libros/configuracion/plantillas-impuestos"
    columns={[col('nombre', 'Nombre')]}
  />
);

export const LibrosConfigPlantillasImpresionPage = () => (
  <LibrosLista
    titulo="Plantillas impresión"
    url="libros/configuracion/plantillas-impresion"
    columns={[col('nombre', 'Nombre'), col('tipo', 'Tipo')]}
  />
);

export const LibrosInformeLibroMayorPage = () => (
  <LibrosInformeVista titulo="Libro mayor" apiPath="libros/informes/libro-mayor" />
);

export const LibrosInformeGananciasPerdidasPage = () => (
  <LibrosInformeVista titulo="Ganancias y pérdidas" apiPath="libros/informes/ganancias-perdidas" />
);

export const LibrosInformeBalanceGeneralPage = () => (
  <LibrosInformeVista titulo="Balance general" apiPath="libros/informes/balance-general" />
);

export const LibrosInformeBalanceProvisionalPage = () => (
  <LibrosInformeVista titulo="Balance provisional" apiPath="libros/informes/balance-provisional" />
);

export { ConfiguracionContabilidadPage as LibrosConfiguracionContablePage };
