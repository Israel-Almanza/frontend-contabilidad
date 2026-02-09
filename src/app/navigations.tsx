export const navigations = [

  { name: 'Dashboard', path: '/dashboard/default', icon: 'settings'
  //icon: 'dashboard'
 },

  // { label: 'PAGES', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      //   { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      //   { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      //  { name: 'Error', iconText: '404', path: '/session/404' }
    ]
  },
  // { label: 'Components', type: 'label' },
  /*{
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' }
    ]
  },*/


  {
    name: 'VENTAS',
    icon: 'home',
    //badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Sucursal Pando', path: '/venta/ventas', iconText: 'A' },



    ]
  },
  {
    name: 'PEDIDOS',
    icon: 'apartment',
    //badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Inventario de Cierre', path: '/pedido/existencia-prueba', iconText: 'A' },
      { name: 'Solicitudes', path: '/pedido/solicitud-prueba', iconText: 'B' },
      { name: 'Revision Pedido', path: '/pedido/apv-prueba', iconText: 'C' },
      { name: 'Recepcion', path: '/pedido/recepcion', iconText: 'C' },
      { name: 'Perfil Pedidos', path: '/pedido/perfil-pedido', iconText: 'C' },
      //pedidos-consolidados
      { name: 'Pedidos Consolidados', path: '/pedido/pedidos-consolidados', iconText: 'C' },
      //{ name: 'Pedidos Consolidados', path: '/pedido/pedidos-consolidados', iconText: 'C' },
      { name: 'Entregas', path: '/pedido/entregas', iconText: 'C' },


    ]
  },


  {
    name: 'REPORTES',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Rep cierre Turno', path: '/reportes/reporte-cierre-turno', iconText: 'D' },
      { name: 'Rep de moviento de caja', path: '/reportes/rep-movimiento-caja', iconText: 'E' },

    ]
  },

  {
    name: 'RECETAS',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Crear Receta', path: '/receta/receta', iconText: 'D' },
      { name: 'Crear Receta Combo', path: '/receta/receta-combo', iconText: 'E' },

    ]
  },

  {
    name: 'CONFIGURACION',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Acceso formas de Pago', path: '/config/acceso-formas-pago', iconText: 'D' },
      { name: 'Sucursales', path: '/config/sucursales-config', iconText: 'E' },
      {
        name: 'Productos', path: '/config/productos', iconText: 'F'

      },

    ]
  },

  {
    name: 'CLIENTES',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Crear Cleinte', path: '/session/crear-cliente', iconText: 'D' },
      { name: 'Editar Cliente', path: '/session/update-cliente', iconText: 'E' },

    ]
  },

  {
    name: 'SEGURIDAD',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Acceso Boton', path: '/seguridad/acceso-boton', iconText: 'D' },
      { name: 'Acceso formas de Pago', path: '/seguridad/acceso-boton-sucursal', iconText: 'E' },
      { name: 'Acceso de Usuarios Ventas', path: '/seguridad/acceso-usuarios-venta', iconText: 'E' },
      { name: 'Acceso de Usuarios General', path: '/seguridad/acceso-usuarios-general', iconText: 'E' },
      { name: 'Cambias password', path: '/seguridad/cambiar-password', iconText: 'E' },
      { name: 'Reset password', path: '/seguridad/reset-password', iconText: 'E' },

      //'/seguridad/acceso-usuarios-general'
    ]
  },

  {
    name: 'Usuarios',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Accesibilidad', path: '/usuarios/accesibilidad', iconText: 'D' },
      { name: 'Borrar Usuario', path: '/usuarios/borrar-usuario', iconText: 'E' },

    ]
  },

  {
    name: 'PERFILES',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Perfil', path: '/perfiles/perfil', iconText: 'D' },

    ]
  },

  {
    name: 'FACTURACION',
    icon: 'description',
    //badge: { value: '30+', color: 'secondary' },
    children: [

      { name: 'Llave', path: '/facturacion/llave', iconText: 'D' },
      { name: 'Cuis', path: '/facturacion/cuis', iconText: 'D' },
      { name: 'Evento Significativo', path: '/facturacion/evento-significativo', iconText: 'D' },

    ]
  },
  /*

  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  },*/
  /* {
     name: 'Documentation',
     icon: 'launch',
     type: 'extLink',
     path: 'http://demos.ui-lib.com/matx-react-doc/'
   }*/
];

