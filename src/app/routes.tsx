import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import CrearRecetaPage from '../pages/crearreceta/CrearRecetaPage';
//import EntregasPage from '../pages/pedidos/sucursales/entregas/EntregasPage';
import EntregasPage from '../pages/pedidos/sucursales/entregas/EntregasPage';
import InventarioCierrePage from '../pages/pedidos/sucursales/invetario-cierrre/InventarioCierrePage';
import Login from '../pages/Login/Login';
import PedidosConsolidadosPage from '../pages/pedidos-consolidados/PedidosConsolidadosPage';
import PerfilPedidoPage from '../pages/pedidos/sucursales/perfil-pedido/PerfilPedidoPage';
import RecepcionPage from '../pages/pedidos/sucursales/recepcion/RecepcionPage';
import RecetaComboPage from '../pages/receta-combo/RecetaComboPage';
import RevsionPedidioPage from '../pages/pedidos/sucursales/revision-pedido/RevsionPedidioPage';
import SolicitudesPage from '../pages/pedidos/sucursales/solicitudes/SolicitudesPage';
import VentaPage from '../pages/venta/VentaPage';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';

import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from './views/material-kit/MaterialRoutes';
import AccesoBotonPage from '../pages/seguridad/accesoboton/AccesoBotonPage';
import AccesoBotonSucursalPage from '../pages/seguridad/accesobotonSucursal/AccesoBotonSucursalPage';
import CambiarPasswordPage from '../pages/seguridad/cambiar-password/CambiarPasswordPage';
import ResetPasswordPage from '../pages/seguridad/reset-password/ResetPasswordPage';
import AccesoFormasPagoPage from '../pages/configuraciones/acceso-formas-pago/AccesoFormasPagoPage';
import SucursalesConfigPage from '../pages/configuraciones/sucursales-config/SucursalesConfigPage';
import ReporteCierreTurnoPage from '../pages/reporte-cierre-turno/ReporteCierreTurnoPage';
import RepMovCajaPage from '../pages/rep-movimiento-caja/RepMovCajaPage';
import PerfilPage from '../pages/perfiles/perfil/PerfilPage';
import EventoSignificativoPage from '../pages/facturacion/evento-significativo/EventoSignificativoPage';
import CuisPage from '../pages/facturacion/cuis/CuisPage';
import LlavePage from '../pages/facturacion/llave/LlavePage';
import ProductoPage from '../pages/configuraciones/productos/ProductosPage';
import AccesoUsuarioGeneralPage from '../pages/seguridad/acceso-usuario-general/AccesoUsuarioGeneralPage';
import AccesoUsuarioVentaPage from '../pages/seguridad/acceso-usuario-venta/AccesoUsuarioVentaPage';
import PedidosExtraordinariosPage from '../pages/pedidos/pedidos-extraordinarios/PedidosExtraordinariosPage';
import PedidosExternosPage from '../pages/pedidos/pedidos-externos/PedidosExternosPage';
import TransferenciaProductosPage from '../pages/pedidos/transferencia-productos/TransferenciaProductosPage';
import CronogramaEntregaPage from '../pages/pedidos/cronograma-entrega/CronogramaEntregaPage';
import DespachoPage from '../pages/pedidos/planta/despacho/DespachoPage';

import PlantaRecepcionPage from '../pages/plata/PlantaRecepcionPage';
import PlantaAreaPage from '../pages/plata/PlantaAreaPage';
import PlantaPresentacionPage from '../pages/plata/PlantaPresentacionPage';
import PlantaProveedorPage from '../pages/plata/PlantaProveedorPage';
import PlantaProductoPage from '../pages/plata/PlantaProductoPage';
import PlantaPedidosPage from '../pages/plata/PlantaPedidoPage';
import ControladorWhatsappPage from '../pages/whatsapp-test/ControladorWhatsappPage';

import AccesoPerfilesVentaPage from '../pages/perfiles/AccesoPerfilesVentaPage';
import AccesoPerfilesGeneralPage from '../pages/perfiles/AccesoPerfilesGeneralPage';
import CrearClientePage from '../pages/clientes/CrearClientePage';
import UpdateClientePage from '../pages/clientes/UpdateClientePage';
import ProductoInventarioPage from '../pages/productoInventario/ProductoInventarioPage';
import ReportesLinkPage from '../pages/reporteslink/ReportesLinkPage';
import ReporteEgresosPage from '../pages/reporteIngresoEgresos/ReporteEgresoPage';
import ReporteIngresosPage from '../pages/reporteIngresoEgresos/ReporteIngresoPage';
import ReporteUsuarioSucursalPage from '../pages/reporteIngresoEgresos/ReporteUsuarioSucursalPage';
import NewEmpresaPage from '../pages/newEmpresa/NewEmpresaPage';
import ReporteEgresoPage from '../pages/reporteIngresoEgresos/ReporteEgresoPage';
import PacientePage from '../pages/paciente/PacientePage';
import CitaPage from '../pages/cita/CitaPage';
import FacturaPage from '../pages/factura/FacturaPage'
import UsuarioPage from '../pages/usuarios/UsuarioPage';
//import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('./views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('./views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('./views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('./views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('./views/dashboard/Analytics')));



//facturacion
const facturacionRoutes = [

  { path: '/llave', element: < LlavePage /> },
  { path: '/cuis', element: <CuisPage /> },
  { path: '/evento-significativo', element: < EventoSignificativoPage /> },


];

//perfiles
const perfilesRoutes = [

  { path: '/perfiles', element: <PerfilPage /> },
  { path: '/pacientes', element: <PacientePage /> },
  { path: '/usuarios', element: <UsuarioPage /> },
  { path: '/citas', element: <CitaPage /> },
  { path: '/facturas', element: <FacturaPage /> },
  { path: '/acceso-perfiles-ventas', element: <AccesoPerfilesVentaPage/> },
  { path: '/acceso-perfiles', element: <AccesoPerfilesGeneralPage/> }
  //{ path: '/perfiles/perfil', element: <PerfilPage /> },

];


const reportesRoutes = [

  { path: '/REP-CT-PANDO', element: <ReporteCierreTurnoPage /> },
  { path: '/REP-CT-SALAMANCA', element: <ReporteCierreTurnoPage /> },
  { path: '/REP-CT-AMERICA_OE', element: <ReporteCierreTurnoPage /> },
  { path: '/REP-CT-HUPERMALL', element: <ReporteCierreTurnoPage /> },
  { path: '/REP-CT-LINCOLN', element: <ReporteCierreTurnoPage /> },
  { path: '/REP-CT-JORDAN', element: <ReporteCierreTurnoPage /> },
  { path: '/REP-CT-AMERICA_E', element: <ReporteCierreTurnoPage /> },
  { path: '/REP-CT-CENTER', element: <ReporteCierreTurnoPage /> },
  { path: '/reportes/rep-movimiento-caja', element: <RepMovCajaPage /> },
  { path: '/reportesEgreso', element: <ReporteEgresosPage /> },
  { path: '/reportesIngreso', element: <ReporteIngresosPage /> },
  { path: '/rep-usuario-sucursal', element: <ReporteUsuarioSucursalPage /> },


];
//usuarios 

const usuariosRoutes = [
  // { path: '/usuarios/borrar-usuario', element: <BorrarUsuarioPage /> },



];

//configuraciones

const configuracionesRoutes = [
  //sucursal-formas-pago
  { path: '/sucursal-formas-pago', element: <AccesoFormasPagoPage /> },
  //{ path: '/config/acceso-formas-pago', element: <AccesoFormasPagoPage /> },
  //  { path: '/config/sucursales-config', element: <SucursalesConfigPage /> },
  { path: '/config-sucursales', element: <SucursalesConfigPage /> },
  //{ path: '/config/productos', element: <ProductoPage /> }
  { path: '/CONF-PRODUCTS', element: <ProductoPage /> }
  //

];

//seguridad

const seguridadRoutes = [
  { path: '/permisos-boton', element: <AccesoBotonPage /> },
  { path: '/permisos-boton-sucursal', element: <AccesoBotonSucursalPage /> },
  { path: '/cambiar-pasword', element: <CambiarPasswordPage /> },
  { path: '/reset-pasword', element: <ResetPasswordPage /> },
  { path: '/acceso-usuarios-sistema-general', element: <AccesoUsuarioGeneralPage /> },
  { path: '/acceso-usuarios-sistema-ventas', element: <AccesoUsuarioVentaPage /> }

  /*
  { path: '/seguridad/acceso-boton', element: <AccesoBotonPage /> },
  { path: '/seguridad/acceso-boton-sucursal', element: <AccesoBotonSucursalPage /> },
  { path: '/seguridad/cambiar-password', element: <CambiarPasswordPage /> },
  { path: '/seguridad/reset-password', element: <ResetPasswordPage /> },
  { path: '/seguridad/acceso-usuarios-general', element: <AccesoUsuarioGeneralPage /> },
  { path: '/seguridad/acceso-usuarios-venta', element: <AccesoUsuarioVentaPage /> },*/

];

const ventasRoutes = [
  /* { path: '/venta/ventas', element: <VentaPage /> },*/
  { path: '/VENTAS/:ITEM/:idSucursal', element: <VentaPage /> },

   { path: '/capressocafe', element: <ReportesLinkPage /> },
   { path: '/REPORTE_01_PANDO', element: <ReporteEgresoPage /> },

];
//rutas demo 
const pedidosRoutes = [
  { path: '/existencia-SJ/:idSucursal', element: <InventarioCierrePage/> },
  { path: '/existencia-SS/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/existencia-CC/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/existencia-SP/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/existencia-SH/:idSucursal', element: <InventarioCierrePage /> },
 
  { path: '/existencia-AE/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/existencia-AO/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/existencia-SL/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/existencia-prueba/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/existencia-prueba2/:idSucursal', element: <InventarioCierrePage /> },
  { path: '/recepcion-prueba', element: <RecepcionPage /> },


  { path: '/perfilPed-SJ/:idSucursal', element: <PerfilPedidoPage /> },
  { path: '/perfilPed-SS/:idSucursal', element: <PerfilPedidoPage /> },
  { path: '/perfilPed-CC/:idSucursal', element: <PerfilPedidoPage /> },
  { path: '/perfilPed-SP/:idSucursal', element: <PerfilPedidoPage /> },
  { path: '/perfilPed-SH/:idSucursal', element: <PerfilPedidoPage /> },

  { path: '/perfilPed-AE/:idSucursal', element: <PerfilPedidoPage /> },
  { path: '/perfilPed-AO/:idSucursal', element: <PerfilPedidoPage /> },
  { path: '/perfilPed-SL/:idSucursal', element: <PerfilPedidoPage /> },

  { path: '/perfilPed-prueba/:idSucursal', element: <PerfilPedidoPage /> },
  { path: '/perfilPed-prueba2/:idSucursal', element: <PerfilPedidoPage /> },


  { path: '/solicitud-SJ/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-SS/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-CC/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-SP/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-SH/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-AE/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-AO/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-SL/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-prueba/:idSucursal', element: <SolicitudesPage /> },
  { path: '/solicitud-prueba2/:idSucursal', element: <SolicitudesPage /> },

  //añadienden las nuevas rutas entregas
{ path: '/entrega-prueba/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-prueba2/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-SJ/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-SS/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-CC/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-SP/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-SH/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-AE/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-AO/:idSucursal', element: <EntregasPage /> },
{ path: '/entrega-SL/:idSucursal', element: <EntregasPage /> },

//añadienden las nuevas rutas recepcion
{ path: '/recepcion-prueba/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-prueba2/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-SJ/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-SS/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-CC/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-SP/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-SH/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-AE/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-AO/:idSucursal', element: <RecepcionPage /> },
{ path: '/recepcion-SL/:idSucursal', element: <RecepcionPage /> },

  //añadienden las nuevas rutas revsion pedido

  { path: '/apv-SJ/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-SS/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-CC/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-SP/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-SH/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-AE/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-AO/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-SL/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-prueba/:idSucursal', element: <RevsionPedidioPage /> },
  { path: '/apv-prueba2/:idSucursal', element: <RevsionPedidioPage /> },


  { path: '/pedidos-consolidados', element: <PedidosConsolidadosPage /> },

  { path: '/entrega-prueba', element: <EntregasPage /> },

  //new ,modulos 

  { path: '/lista-pedidos-extraordinarios', element: <PedidosExtraordinariosPage /> },
  { path: '/pedidos-externos', element: <PedidosExternosPage /> },
  { path: '/transferencia-productos', element: <TransferenciaProductosPage /> },
  { path: '/cronograma', element: <CronogramaEntregaPage /> },
  //planta->despacho
  { path: '/despacho', element: <DespachoPage /> },
  { path: '/nueva-empresa', element: <NewEmpresaPage /> }
  
  /*
  { path: '/pedido/existencia-prueba', element: <InventarioCierrePage /> },
  { path: '/pedido/solicitud-prueba', element: <SolicitudesPage /> },
  { path: '/pedido/apv-prueba', element: <RevsionPedidioPage /> },
  { path: '/pedido/recepcion', element: <RecepcionPage /> },
  { path: '/pedido/perfil-pedido', element: <PerfilPedidoPage /> },

  { path: '/pedido/pedidos-consolidados', element: <PedidosConsolidadosPage /> },
  { path: '/pedido/entregas', element: <EntregasPage /> },*/

];

// rutas recetas
const recetasRoutes = [

  { path: '/receta-combo', element: <RecetaComboPage /> },
  { path: '/receta', element: <CrearRecetaPage /> }
  //{ path: '/receta/receta-combo', element: <RecetaComboPage /> },
  // { path: '/receta/receta', element: <CrearRecetaPage /> }

];

const testRoutes = [

  //{ path: '/planta-page', element: <PlantaPage /> },
  { path: '/solicitud-pedido/', element: <PlantaPedidosPage /> },
  { path: '/registro-recepcion/', element: <PlantaRecepcionPage /> },
  { path: '/registro-producto', element: <PlantaProductoPage /> },
  { path: '/registro-area', element: <PlantaAreaPage /> },
  { path: '/registro-proovedor', element: <PlantaProveedorPage /> },
  { path: '/registro-presentacion', element: <PlantaPresentacionPage /> },
  
  { path: '/prueba', element: <ProductoInventarioPage /> },
 

  //{ path: '/controlador-whatsapp', element: <ControladorWhatsappPage /> }
  { path: '/whatsapp', element: <ControladorWhatsappPage /> }

];

const clienteRoutes = [
  { path: '/cliente-capresso', element: <CrearClientePage /> },
  { path: '/actualizar-cliente-capresso', element: <UpdateClientePage /> },
];







const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [

      //test plata 
      ...testRoutes,
      //clientes
      ...clienteRoutes,
      //reportes
      ...facturacionRoutes,
      //reportes
      ...perfilesRoutes,
      //reportes
      ...reportesRoutes,
      //usuarios
      ...usuariosRoutes,
      //configuraciones
      ...configuracionesRoutes,
      //seguridad
      ...seguridadRoutes,
      //ventas
      ...ventasRoutes,
      //pedidos
      ...pedidosRoutes,
      //recetas
      ...recetasRoutes,
      //materialRoutes
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <Login /> },
  //{ path: '/session/signin', element: <JwtLogin /> },
 
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
