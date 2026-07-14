import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Login from '../pages/Login/Login';

import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';

import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from './views/material-kit/MaterialRoutes';


import PacientePage from '../pages/paciente/PacientePage';
import CitaPage from '../pages/cita/CitaPage';
import FacturaPage from '../pages/factura/FacturaPage'
import MenuPage from '../pages/menus/MenuPage';
import ParametroPage from '../pages/parametros/ParametroPage';
import ArticuloVentaPage from '../pages/contabilidad/venta/ArticuloVentaPage';
import FacturaCompraPage from '../pages/contabilidad/compra/FacturaCompraPage';
import PagoCompraPage from '../pages/contabilidad/compra/PagoCompraPage';
import ProveedorPage from '../pages/contabilidad/compra/ProveedorPage';
import ArticuloCompraPage from '../pages/contabilidad/compra/ArticuloCompraPage';
import PermisoPage from '../pages/permisos/PermisoPage';
import RolPage from '../pages/roles/RolPage';
import UsuarioPage from '../pages/usuario/UsuarioPage';

import CotizacionVentaPage from '../pages/contabilidad/venta/CotizacionVentaPage';
import FacturaVentaPage from '../pages/contabilidad/venta/FacturaVentaPage';
import PagoVentaPage from '../pages/contabilidad/venta/PagoVentaPage';
import ClienteVentaPage from '../pages/contabilidad/venta/ClienteVentaPage';
import EntradaDiarioPage from '../pages/contabilidad/compra/EntradaDiarioPage';
import SocioComercialPage from '../pages/contabilidad/compra/SocioComercialPage';
import ArticuloPage from '../pages/contabilidad/compra/ArticuloPage';
import LibroMayorPage from '../pages/contabilidad/reportes/LibroMayorPage';
import EstadoResultadoPage from '../pages/contabilidad/reportes/EstadoResultadoPage';
import BalanceGeneralPage from '../pages/contabilidad/reportes/BalanceGeneralPage';
import BalanceComprobacionPage from '../pages/contabilidad/reportes/BalanceComprobacionPage';
import HomePage from '../pages/home/template/HomePage';
import VerProductoPage from '../pages/home/template/VerProductoPage';
import EmpresaLayout from '../pages/home/template/EmpresaLayout';
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

//perfiles
const perfilesRoutes = [

  { path: '/menus', element: <MenuPage /> },
  { path: '/parametros', element: <ParametroPage /> },
  { path: '/permisos', element: <PermisoPage /> },
  { path: '/roles', element: <RolPage /> },
  { path: '/usuarios', element: <UsuarioPage /> },

  /* Modulo de Ventas */
  { path: '/libros/ventas/cotizaciones', element: <CotizacionVentaPage /> },
  { path: '/libros/ventas/facturas', element: <FacturaVentaPage /> },
  { path: '/libros/ventas/pagos', element: <PagoVentaPage /> },
  { path: '/libros/ventas/clientes', element: <ClienteVentaPage /> },
  { path: '/libros/ventas/articulos', element: <ArticuloVentaPage /> },

  /* Modulo Comun */
  { path: '/libros/comun/entradas-diario', element: <EntradaDiarioPage /> },
  { path: '/libros/socios-comerciales', element: <SocioComercialPage /> },
  { path: '/libros/articulos', element: <ArticuloPage /> },

  /* Modulo Reportes */
  { path: '/libros/informes/libro-mayor', element: <LibroMayorPage /> },
  { path: '/libros/informes/ganancias-perdidas', element: <EstadoResultadoPage /> },
  { path: '/libros/informes/balance-general', element: <BalanceGeneralPage /> },
  { path: '/libros/informes/balance-provisional', element: <BalanceComprobacionPage /> },

  /* Modulo de Compras */
  { path: '/libros/compras/facturas', element: <FacturaCompraPage /> },
  { path: '/libros/compras/pagos', element: <PagoCompraPage /> },
  { path: '/libros/compras/proveedores', element: <ProveedorPage /> },
  { path: '/libros/compras/articulos', element: <ArticuloCompraPage /> },

  { path: '/pacientes', element: <PacientePage /> },

  { path: '/citas', element: <CitaPage /> },
  { path: '/facturas', element: <FacturaPage /> },
  //{ path: '/perfiles/perfil', element: <PerfilPage /> },

];

//seguridad









const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [

      //reportes
      //reportes
      ...perfilesRoutes,
      //reportes
      //seguridad
      //ventas
      //pedidos
      //recetas
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

  {
    element: <EmpresaLayout />,
    children: [
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/ver-producto",
        element: <VerProductoPage />
      }
    ]
  },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
