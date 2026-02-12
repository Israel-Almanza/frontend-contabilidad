import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Login from '../pages/Login/Login';

import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';

import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from './views/material-kit/MaterialRoutes';
import AccesoBotonPage from '../pages/seguridad/accesoboton/AccesoBotonPage';
import AccesoBotonSucursalPage from '../pages/seguridad/accesobotonSucursal/AccesoBotonSucursalPage';
import CambiarPasswordPage from '../pages/seguridad/cambiar-password/CambiarPasswordPage';
import ResetPasswordPage from '../pages/seguridad/reset-password/ResetPasswordPage';

import EventoSignificativoPage from '../pages/facturacion/evento-significativo/EventoSignificativoPage';
import CuisPage from '../pages/facturacion/cuis/CuisPage';
import LlavePage from '../pages/facturacion/llave/LlavePage';
import ReportesLinkPage from '../pages/reporteslink/ReportesLinkPage';

import PacientePage from '../pages/paciente/PacientePage';
import CitaPage from '../pages/cita/CitaPage';
import FacturaPage from '../pages/factura/FacturaPage'
import MenuPage from '../pages/menus/MenuPage';
import ParametroPage from '../pages/parametros/ParametroPage';
import ArticuloVentaPage from '../pages/contabilidad/compras/articuloVenta/ArticuloVentaPage';
import FacturaCompraPage from '../pages/contabilidad/compras/facturaCompra/FacturaCompraPage';
import PermisoPage from '../pages/permisos/PermisoPage';
import RolPage from '../pages/roles/RolPage';
import UsuarioPage from '../pages/usuario/UsuarioPage';
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

  { path: '/menus', element: <MenuPage /> },
  { path: '/parametros', element: <ParametroPage /> },
  { path: '/permisos', element: <PermisoPage /> },
  { path: '/roles', element: <RolPage /> },
  { path: '/usuarios', element: <UsuarioPage /> },


  { path: '/articulo-venta', element: <ArticuloVentaPage /> },
  { path: '/factura-compra', element: <FacturaCompraPage /> },

  { path: '/pacientes', element: <PacientePage /> },

  { path: '/citas', element: <CitaPage /> },
  { path: '/facturas', element: <FacturaPage /> },
  //{ path: '/perfiles/perfil', element: <PerfilPage /> },

];

//seguridad

const seguridadRoutes = [
  { path: '/permisos-boton', element: <AccesoBotonPage /> },
  { path: '/permisos-boton-sucursal', element: <AccesoBotonSucursalPage /> },
  { path: '/cambiar-pasword', element: <CambiarPasswordPage /> },
  { path: '/reset-pasword', element: <ResetPasswordPage /> },

  /*
  { path: '/seguridad/acceso-boton', element: <AccesoBotonPage /> },
  { path: '/seguridad/acceso-boton-sucursal', element: <AccesoBotonSucursalPage /> },
  { path: '/seguridad/cambiar-password', element: <CambiarPasswordPage /> },
  { path: '/seguridad/reset-password', element: <ResetPasswordPage /> },
  { path: '/seguridad/acceso-usuarios-general', element: <AccesoUsuarioGeneralPage /> },
  { path: '/seguridad/acceso-usuarios-venta', element: <AccesoUsuarioVentaPage /> },*/

];

const ventasRoutes = [

  { path: '/capressocafe', element: <ReportesLinkPage /> },

];

// rutas recetas
const recetasRoutes = [
  //{ path: '/receta/receta-combo', element: <RecetaComboPage /> },
  // { path: '/receta/receta', element: <CrearRecetaPage /> }

];







const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [

      //reportes
      ...facturacionRoutes,
      //reportes
      ...perfilesRoutes,
      //reportes
      //seguridad
      ...seguridadRoutes,
      //ventas
      ...ventasRoutes,
      //pedidos
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
