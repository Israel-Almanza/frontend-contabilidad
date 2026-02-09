import { Typography, Button, Collapse, TextField, Modal, Grid, InputAdornment, AccordionSummary, AccordionDetails, Accordion, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
//import Paleta from '../../../core/components/common/Paleta'


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';




import TablaAccesoBoton from './components/TablaAccesoBoton';

import { useAccesoBoton } from './services/useAccesoBoton';
import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from "react-hook-form";

import { styled } from '@mui/material/styles';

import { KDImage } from '../../../../core/modal-loading/KDImage';





const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));
const AccesoBotton = () => {

  const { loadApiGetUsuariosMenus,loadApiGetPermisoBoton  } = useAccesoBoton();
  const [ListUsuarios, setListUsuarios] = useState<any>([]);
  const [ListMenus, setListMenus] = useState<any>([]);

  const [idUsuario, setIdUsuario] = useState("")
  const [idMenu, setIdMenu] = useState("")

  const [rows,setRows]=useState<any>([]);

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };



  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //call api
    loadGetUsuariosMenus()
  }, []);



  const loadGetUsuariosMenus = async () => {
    try {
    
      const response = await loadApiGetUsuariosMenus();
      console.log("response data ", response)

      if (response?.status && response?.usuarios && response?.menus) {
        setListUsuarios(response?.usuarios);
        setListMenus(response?.menus)
      }
    } catch (error) {

    }
  }


  const handleChangeUsuarios = (value: any) => {
    console.log("usaurio ", value)
    const { ID_USUARIO } = value
    setIdUsuario(ID_USUARIO);
  }

  const handleChangeMenus = (value: any) => {
    console.log("menu ", value)
    const { ID_VENTAS_ACCESO } = value;
    setIdMenu(ID_VENTAS_ACCESO);
  }


  const loadGetPermisoBoton  = async () => {
    if (!idUsuario && !idMenu) {
      return;
    }
    try {
      setLoading(true);
      const response = await loadApiGetPermisoBoton(idUsuario,idMenu);
      setLoading(false);
      console.log("response list formas ", response)
      if (response?.status && response?.respuesta) {
        //setListCanales(response?.canales);
        setRows(response?.respuesta)
      }
    

    } catch (error) {

    }
  }


  return (
    <>





      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'flex-start', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >
        <PersonAddAlt1Icon sx={{ marginLeft: '20px', color: 'white' }} />

        <Typography variant="subtitle1" gutterBottom sx={{
          marginLeft: '15px',
          color: 'white', alignItems: 'center'
        }} >
          Permisos de Boton a Usuarios
        </Typography>

      </div>

      <div >
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange1('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            //style={{backgroundColor:`#343A40`}}
            style={{
              boxShadow: '1px 2px 9px #918c8d',
              //margin: '4em',
              //padding: '1em',
            }}
          >
            <Typography style={{ fontSize: '1rem', fontFamily: 'Times New Roman' }}>
              Buscador
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{
            boxShadow: '1px 2px 9px #918c8d',
          }}>


            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Usuarios</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListUsuarios}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) =>
                      handleChangeUsuarios(value)
                      // handleSeleccioneSucursal(value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Seleccione la sucursal"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (<InputAdornment position="start"> <SearchIcon />
                          </InputAdornment>),
                          disableUnderline: true
                        }}

                      />
                    )}
                    getOptionLabel={(option: any) => option.NOMBRE_COMPLETO}
                  />
                </div>
              </Grid>


              <Grid item xs={12} sm={6} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Menu</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListMenus}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) =>
                    
                      handleChangeMenus(value)
             
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Seleccione la sucursal"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (<InputAdornment position="start"> <SearchIcon />
                          </InputAdornment>),
                          disableUnderline: true
                        }}

                      />
                    )}
                    getOptionLabel={(option: any) => option.NOMBRE}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => loadGetPermisoBoton()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>



  


      <br />
      {expanded ?     <TablaAccesoBoton rows={rows}/> : null}

      {loading ? <KDImage

/> : null}


    </>
  )
}

export default AccesoBotton 