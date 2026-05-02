/**
 * Drawer structure: Ventas, Compras, Común, Informes, Configuración.
 * LINK paths match React routes; lista pages map to backend `libros/*` URLs.
 */
export const librosMenuBloques = [
  {
    ITEM: 93800,
    NOMBRE: 'Resumen',
    NIVEL_SUPERIOR: 0,
    NUMERO_ORDEN: 5,
    LINK: '',
    ICONO: 'dashboard',
    TIPO: 'menu',
    children: [
      { ITEM: 93801, NOMBRE: 'Inicio libros', LINK: '/libros', ICONO: 'home', TIPO: 'acceso', NUMERO_ORDEN: 1, NIVEL_SUPERIOR: 93800 },
    ],
  },
  {
    ITEM: 94000,
    NOMBRE: 'Ventas',
    NIVEL_SUPERIOR: 0,
    NUMERO_ORDEN: 10,
    LINK: '',
    ICONO: 'point_of_sale',
    TIPO: 'menu',
    children: [
      { ITEM: 94001, NOMBRE: 'Cotizaciones', LINK: '/libros/ventas/cotizaciones', ICONO: 'request_quote', TIPO: 'acceso', NUMERO_ORDEN: 1, NIVEL_SUPERIOR: 94000 },
      { ITEM: 94002, NOMBRE: 'Facturas venta', LINK: '/libros/ventas/facturas', ICONO: 'receipt_long', TIPO: 'acceso', NUMERO_ORDEN: 2, NIVEL_SUPERIOR: 94000 },
      { ITEM: 94003, NOMBRE: 'Pagos venta', LINK: '/libros/ventas/pagos', ICONO: 'payments', TIPO: 'acceso', NUMERO_ORDEN: 3, NIVEL_SUPERIOR: 94000 },
      { ITEM: 94004, NOMBRE: 'Clientes', LINK: '/libros/ventas/clientes', ICONO: 'people', TIPO: 'acceso', NUMERO_ORDEN: 4, NIVEL_SUPERIOR: 94000 },
      { ITEM: 94005, NOMBRE: 'Artículos venta', LINK: '/libros/ventas/articulos', ICONO: 'inventory_2', TIPO: 'acceso', NUMERO_ORDEN: 5, NIVEL_SUPERIOR: 94000 },
    ],
  },
  {
    ITEM: 94100,
    NOMBRE: 'Compras',
    NIVEL_SUPERIOR: 0,
    NUMERO_ORDEN: 20,
    LINK: '',
    ICONO: 'shopping_bag',
    TIPO: 'menu',
    children: [
      { ITEM: 94101, NOMBRE: 'Facturas compra', LINK: '/libros/compras/facturas', ICONO: 'description', TIPO: 'acceso', NUMERO_ORDEN: 1, NIVEL_SUPERIOR: 94100 },
      { ITEM: 94102, NOMBRE: 'Pagos compra', LINK: '/libros/compras/pagos', ICONO: 'payment', TIPO: 'acceso', NUMERO_ORDEN: 2, NIVEL_SUPERIOR: 94100 },
      { ITEM: 94103, NOMBRE: 'Proveedores', LINK: '/libros/compras/proveedores', ICONO: 'business', TIPO: 'acceso', NUMERO_ORDEN: 3, NIVEL_SUPERIOR: 94100 },
      { ITEM: 94104, NOMBRE: 'Artículos compra', LINK: '/libros/compras/articulos', ICONO: 'inventory', TIPO: 'acceso', NUMERO_ORDEN: 4, NIVEL_SUPERIOR: 94100 },
    ],
  },
  {
    ITEM: 94200,
    NOMBRE: 'Común',
    NIVEL_SUPERIOR: 0,
    NUMERO_ORDEN: 30,
    LINK: '',
    ICONO: 'account_tree',
    TIPO: 'menu',
    children: [
      { ITEM: 94201, NOMBRE: 'Entrada diario', LINK: '/libros/comun/entradas-diario', ICONO: 'edit_note', TIPO: 'acceso', NUMERO_ORDEN: 1, NIVEL_SUPERIOR: 94200 },
      { ITEM: 94202, NOMBRE: 'Socio comercial', LINK: '/libros/socios-comerciales', ICONO: 'handshake', TIPO: 'acceso', NUMERO_ORDEN: 2, NIVEL_SUPERIOR: 94200 },
      { ITEM: 94203, NOMBRE: 'Artículos', LINK: '/libros/articulos', ICONO: 'category', TIPO: 'acceso', NUMERO_ORDEN: 3, NIVEL_SUPERIOR: 94200 },
    ],
  },
  {
    ITEM: 94300,
    NOMBRE: 'Informes',
    NIVEL_SUPERIOR: 0,
    NUMERO_ORDEN: 40,
    LINK: '',
    ICONO: 'assessment',
    TIPO: 'menu',
    children: [
      { ITEM: 94301, NOMBRE: 'Libro mayor', LINK: '/libros/informes/libro-mayor', ICONO: 'menu_book', TIPO: 'acceso', NUMERO_ORDEN: 1, NIVEL_SUPERIOR: 94300 },
      { ITEM: 94302, NOMBRE: 'Ganancias y pérdidas', LINK: '/libros/informes/ganancias-perdidas', ICONO: 'trending_up', TIPO: 'acceso', NUMERO_ORDEN: 2, NIVEL_SUPERIOR: 94300 },
      { ITEM: 94303, NOMBRE: 'Balance general', LINK: '/libros/informes/balance-general', ICONO: 'balance', TIPO: 'acceso', NUMERO_ORDEN: 3, NIVEL_SUPERIOR: 94300 },
      { ITEM: 94304, NOMBRE: 'Balance provisional', LINK: '/libros/informes/balance-provisional', ICONO: 'pie_chart', TIPO: 'acceso', NUMERO_ORDEN: 4, NIVEL_SUPERIOR: 94300 },
    ],
  },
  {
    ITEM: 94400,
    NOMBRE: 'Configuración',
    NIVEL_SUPERIOR: 0,
    NUMERO_ORDEN: 50,
    LINK: '',
    ICONO: 'settings',
    TIPO: 'menu',
    children: [
      { ITEM: 94401, NOMBRE: 'Plan de cuentas', LINK: '/libros/plan-cuentas', ICONO: 'account_balance', TIPO: 'acceso', NUMERO_ORDEN: 1, NIVEL_SUPERIOR: 94400 },
      { ITEM: 94402, NOMBRE: 'Plantillas impuestos', LINK: '/libros/configuracion/plantillas-impuestos', ICONO: 'percent', TIPO: 'acceso', NUMERO_ORDEN: 2, NIVEL_SUPERIOR: 94400 },
      { ITEM: 94403, NOMBRE: 'Plantillas impresión', LINK: '/libros/configuracion/plantillas-impresion', ICONO: 'print', TIPO: 'acceso', NUMERO_ORDEN: 3, NIVEL_SUPERIOR: 94400 },
      { ITEM: 94404, NOMBRE: 'Configuración', LINK: '/libros/configuracion/contabilidad', ICONO: 'tune', TIPO: 'acceso', NUMERO_ORDEN: 4, NIVEL_SUPERIOR: 94400 },
    ],
  },
];
