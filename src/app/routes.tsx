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

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
