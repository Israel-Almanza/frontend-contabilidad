import { Box, ButtonBase, styled } from '@mui/material';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import useSettings from '../../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Paragraph, Span } from '../Typography';

import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel';
//import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel';
// import { useNotifcacionesService } from '../../modules/notificaciones-service/services/useNotifcacionesService';
import useNotification from '../../hooks/useNotification';

const ListLabel = styled(Paragraph)(
  ({ theme, mode }) => ({
    fontSize: '12px',
    marginTop: '20px',
    marginLeft: '15px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    display: mode === 'compact' && 'none',
    color: theme.palette.text.secondary,
  }));

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '12px',
    // fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    //paddingRight: '35px',
    verticalAlign: 'middle',
  },
};
const ExternalLink = styled('a')(({ theme }: any) => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary,
}));

const InternalLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary,
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
}));

const StyledText = styled(Span)(({ mode }) => ({
  //fontSize: '0.875rem',
  fontSize: '0.8rem',
  paddingLeft: '0.14rem',
  //paddingLeft: '0.8rem',
  display: mode === 'compact' && 'none',
  
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

const BulletIcon = styled('div')(({ theme }) => ({
  padding: '2px',
  marginLeft: '24px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.text.primary,
}));

const BadgeValue = styled('div')(() => ({
  padding: '1px 8px',
  overflow: 'hidden',
  borderRadius: '300px',
}));

const MatxVerticalNav = ({ items }: any) => {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;
  const { getNotifications } = useNotification();



  const cargarNotificaciones = async (elementItem: any) => {

    console.log("me estoy ejecutando");
    console.log("me estoy ejecutando",elementItem);
    const { ITEM,
      NOMBRE,
      SUCURSAL
    } = elementItem;

    if(ITEM){
      localStorage.setItem('ITEM',ITEM);
    }
    if(NOMBRE){
      localStorage.setItem('NOMBRE',NOMBRE);
    }
    if(ITEM && NOMBRE && SUCURSAL){
      localStorage.setItem('SUCURSAL',SUCURSAL);
    }

    getNotifications();

  }




  const renderLevels = (data: any) => {
    console.log('data ------> ', data)
    return data?.map((item: any, index: any) => {
      if (item.type === 'label')
        return (
          <ListLabel key={index} mode={mode} className="sidenavHoverShow">
            {item.label}
          </ListLabel>
        );

      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      } else if (item.type === 'extLink') {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            className={`${mode === 'compact' && 'compactNavItem'}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ButtonBase key={item.NOMBRE} name="child" sx={{ width: '100%' }} >
              {(() => {
                if (item.icon) {
                  return <Icon className="icon">{item.icon}</Icon>;
                } else {
                  return <span className="item-icon icon-text">{item.iconText}</span>;
                }
              })()}
              <StyledText mode={mode} className="sidenavHoverShow">
                {item.name}
              </StyledText>
              <Box mx="auto"></Box>
              {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
            </ButtonBase>
          </ExternalLink>
        );
      } else {
        //      to={item.path} 
        //capaturando link 
        // console.log("item link ",item.LINK)
        //solo para caso modulo ventas 
        if (item.LINK) {

          if (
            (item.LINK).includes('solicitud-pedido') || (item.LINK).includes('registro-recepcion')
          ) {




            return (
              <InternalLink key={index}>
                <NavLink
                  to={`${item.LINK}`}
                  className={({ isActive }) =>
                    isActive
                      ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                      : `${mode === 'compact' && 'compactNavItem'}`
                  }
                >
                  <Tooltip title={item.NOMBRE} placement="right-end" >
                  <ButtonBase key={item.NOMBRE} name="child" sx={{ width: '100%' }} onClick={() => cargarNotificaciones(item)}>
                    {item?.ICONO ? (
                      <Icon className="icon" sx={{ width: 36 }}>
                        {item.ICONO}
                      </Icon>
                    ) : (
                      <Fragment>
                        <BulletIcon
                          className={`nav-bullet`}
                          sx={{ display: mode === 'compact' && 'none' }}
                        />
                        <Box
                          className="nav-bullet-text"
                          sx={{
                            ml: '20px',
                            fontSize: '11px',
                            display: mode !== 'compact' && 'none',
                          }}
                        >
                          {item.iconText}A
                        </Box>
                      </Fragment>
                    )}
                    <StyledText mode={mode} className="sidenavHoverShow">
                      {/*item.name*/}{item.NOMBRE}
                    </StyledText>

                    <Box mx="auto" />

                    {item.badge && (
                      <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                    )}
                  </ButtonBase>
                  </Tooltip>
                </NavLink>
              </InternalLink>
            );
          }

          if ((item.LINK).includes('VENTAS')) {

            return (
              <InternalLink key={index}>
                <NavLink
                  to={`VENTAS/${item.ITEM}/${item.SUCURSAL}`}
                  className={({ isActive }) =>
                    isActive
                      ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                      : `${mode === 'compact' && 'compactNavItem'}`
                  }
                >
                  <Tooltip title={item.NOMBRE} placement="right-end" >
                    <ButtonBase key={item.NOMBRE} name="child" sx={{ width: '100%' }} onClick={() => cargarNotificaciones(item)}>
                      {item?.ICONO ? (

                        <Icon className="icon" sx={{ width: 36 }}>
                          {item.ICONO}
                        </Icon>
                      ) : (
                        <Fragment>
                          <BulletIcon
                            className={`nav-bullet`}
                            sx={{ display: mode === 'compact' && 'none' }}
                          />
                          <Box
                            className="nav-bullet-text"
                            sx={{
                              ml: '20px',
                              fontSize: '11px',
                              display: mode !== 'compact' && 'none',
                            }}
                          >
                            {item.iconText}
                          </Box>
                        </Fragment>
                      )}
                      <StyledText mode={mode} className="sidenavHoverShow">
                        {/*item.name*/}{item.NOMBRE}
                      </StyledText>

                      <Box mx="auto" />

                      {item.badge && (
                        <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                      )}
                    </ButtonBase>
                  </Tooltip>
                </NavLink>
              </InternalLink>
            );
          }

          if ((item.LINK).includes('perfilPed') || (item.LINK).includes('apv')
            || (item.LINK).includes('solicitud') || (item.LINK).includes('existencia')
            || (item.LINK).includes('recepcion') || (item.LINK).includes('entrega')) {

            //  console.log("include si ")


            return (
              <InternalLink key={index}>
                <NavLink
                  to={`${item.LINK}/${item.SUCURSAL}`}
                  className={({ isActive }) =>
                    isActive
                      ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                      : `${mode === 'compact' && 'compactNavItem'}`
                  }
                >
                  <Tooltip title={item.NOMBRE} placement="right-end" >
                    <ButtonBase key={item.NOMBRE} name="child" sx={{ width: '100%' }} >
                      {item?.ICONO ? (
                        <Icon className="icon" sx={{ width: 36 }}>
                          {item.ICONO}
                        </Icon>
                      ) : (
                        <Fragment>
                          <BulletIcon
                            className={`nav-bullet`}
                            sx={{ display: mode === 'compact' && 'none' }}
                          />
                          <Box
                            className="nav-bullet-text"
                            sx={{
                              ml: '20px',
                              fontSize: '11px',
                              display: mode !== 'compact' && 'none',
                            }}
                          >
                            {item.iconText}A
                          </Box>
                        </Fragment>
                      )}
                      <StyledText mode={mode} className="sidenavHoverShow">
                        {/*item.name*/}{item.NOMBRE}
                      </StyledText>

                      <Box mx="auto" />

                      {item.badge && (
                        <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                      )}
                    </ButtonBase>
                  </Tooltip>
                </NavLink>
              </InternalLink>
            );
          }

          if ((item.LINK).includes('https')) {

            return (
              <InternalLink key={index}>
                <NavLink
                  to={`/capressocafe`}
                  className={({ isActive }) =>
                    isActive
                      ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                      : `${mode === 'compact' && 'compactNavItem'}`
                  }
                >
                  <Tooltip title={item.NOMBRE} placement="right-end" >
                    <ButtonBase key={item.NOMBRE} name="child" sx={{ width: '100%' }} onClick={() => cargarNotificaciones(item)}>
                      {item?.ICONO ? (

                        <Icon className="icon" sx={{ width: 36 }}>
                          {item.ICONO}
                        </Icon>
                      ) : (
                        <Fragment>
                          <BulletIcon
                            className={`nav-bullet`}
                            sx={{ display: mode === 'compact' && 'none' }}
                          />
                          <Box
                            className="nav-bullet-text"
                            sx={{
                              ml: '20px',
                              fontSize: '11px',
                              display: mode !== 'compact' && 'none',
                            }}
                          >
                            {item.iconText}
                          </Box>
                        </Fragment>
                      )}
                      <StyledText mode={mode} className="sidenavHoverShow">
                        {/*item.name*/}{item.NOMBRE}
                      </StyledText>

                      <Box mx="auto" />

                      {item.badge && (
                        <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                      )}
                    </ButtonBase>
                  </Tooltip>
                </NavLink>
              </InternalLink>
            );
          }

        }


        //console.log("item ",item)

        return (
          <InternalLink key={index}>
            <NavLink
              to={item.LINK}
              className={({ isActive }) =>
                isActive
                  ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                  : `${mode === 'compact' && 'compactNavItem'}`
              }
            >
              <Tooltip title={item.NOMBRE} placement="right-end" >
                <ButtonBase key={item.NOMBRE} name="child" sx={{ width: '100%' }} onClick={() => cargarNotificaciones(item)}>
                  {item?.ICONO ? (

                    <Icon
                      className="icon"
                      fontSize="small"
                      sx={{
                        width: 36,//  fontSize: '0.2rem',

                        //paddingLeft: '0.8rem'//,fontSize: 80 
                      }}>
                      {item.ICONO}
                    </Icon>


                  ) : (
                    <Fragment>
                      <BulletIcon
                        className={`nav-bullet`}
                        sx={{ display: mode === 'compact' && 'none' }}
                      />

                      <Box
                        className="nav-bullet-text"
                        sx={{
                          ml: '20px',
                          fontSize: '11px',
                          display: mode !== 'compact' && 'none',
                        }}
                      >
                        {item.iconText}A
                      </Box>
                    </Fragment>
                  )}
                  <StyledText mode={mode} className="sidenavHoverShow">
                    {/*item.name*/}{item.NOMBRE}
                  </StyledText>

                  <Box mx="auto" />

                  {item.badge && (
                    <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                  )}
                </ButtonBase>
              </Tooltip>
            </NavLink>
          </InternalLink>
        );
      }
    });
  };

  return <div className="navigation">{renderLevels(items)}</div>;
  //return  <Tooltip title={items.label} placement="right-end"><div className="navigation">{renderLevels(items)}</div></Tooltip>;
};

export default React.memo(MatxVerticalNav);
