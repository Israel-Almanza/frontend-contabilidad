import React, { Fragment, useEffect, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material';
import MatxVerticalNav from './MatxVerticalNav/MatxVerticalNav';
//import { MatxVerticalNav } from 'app/components';
import useSettings from '../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
//import { NavLink } from 'react-router-dom';
import { navigations } from '../navigations';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
  const [dataNavigations, setDataNavigations] = useState<any>([])
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //console.log("import data json ", convertToNestedMenu(dataJson, 0))
    const requestMenu = JSON.parse(localStorage.getItem('arrayNavigations')!);
    //console.log("resquest menu json SideNav", requestMenu)
    setDataNavigations(requestMenu)
    
  }, []);

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

      {/*<MatxVerticalNav items={dataNavigations} />*/}
       <MatxVerticalNav items={JSON.parse(localStorage.getItem('arrayNavigations')!)} />
        {/*<MatxVerticalNav items={navigations} />*/}

      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
