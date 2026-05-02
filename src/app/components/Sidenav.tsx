import React, { Fragment, useMemo } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MatxVerticalNav from './MatxVerticalNav/MatxVerticalNav';
//import { MatxVerticalNav } from 'app/components';
import useSettings from '../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
//import { NavLink } from 'react-router-dom';
import { librosMenuBloques } from '../navigation/librosMenu';


const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',



}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' }
}));

const Sidenav = ({ children }: any) => {
  const { settings, updateSettings } = useSettings();
  const location = useLocation();
  const navItems = useMemo(() => {
    try {
      const raw = localStorage.getItem('arrayNavigations');
      const fromServer = raw ? JSON.parse(raw) : [];
      const base = Array.isArray(fromServer) ? fromServer : [];
      return [...base, ...librosMenuBloques];
    } catch {
      return [...librosMenuBloques];
    }
  }, [location.pathname]);

  /*
  function convertToNestedMenu(arr: any, parentId: any) {
    return arr
      .filter((item:any) => item.NIVEL_SUPERIOR === parentId)
      .map((item:any) => {
        if (item.TIPO === 'acceso') return item;
        return {
          ...item,
          children: [...convertToNestedMenu(arr, item.ITEM)],
        }
      });
  }*/

  const updateSidebarMode = (sidebarSettings: any) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        {/* <NavLink
                  to={`VENTAS/408/4`}
                
                >
                  <h3>test btn</h3>
                </NavLink> */}

      <MatxVerticalNav items={navItems} />

      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
