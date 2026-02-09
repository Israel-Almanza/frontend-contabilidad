import { Typography, Button, Collapse, TextField, Modal, Grid, InputAdornment, Accordion, AccordionSummary, AccordionDetails, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'
//import Paleta from '../../../core/components/common/Paleta'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import ExplicitOutlinedIcon from '@mui/icons-material/ExplicitOutlined';


import FindInPageIcon from '@mui/icons-material/FindInPage';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TableViewIcon from '@mui/icons-material/TableView';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';



//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//import dayjs from 'dayjs';

import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from "react-hook-form";

import { styled } from '@mui/material/styles';



import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import PaletaParentPerfilesVenta from './components/PaletaParentPerfilesVenta';

import { useAccesoPerfilesVenta } from './services/useAccesoPerfilesVenta';
import { KDImage } from '../../../../core/modal-loading/KDImage';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));
const AccesoPerfilesVenta = () => {

  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  const { loadApiGetPerfiles, loadApiGetAccesoPerfil } = useAccesoPerfilesVenta();
  const [ListUsaurios, setListUsaurios] = useState<any>([]);
  const [idPerfil, setIdPerfil] = useState('')
  const [menuData, setMenuData] = useState<any>([])
  const [loading, setLoading] = useState(
    false
  );
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };






  useEffect(() => {

    loadGetUsuariosforVentas()
  }, []);


  const loadGetUsuariosforVentas = async () => {
    try {
      const response = await loadApiGetPerfiles();
      console.log("response data ", response)
      if (response?.status && response?.perfiles) {
        setListUsaurios(response?.perfiles)

      }

    } catch (error) {

    }
  }


  const handleSeleccionePerfil = (value: any) => {
    console.log("value usuario ", value)

    setMenuData([]);
    const {id } = value
    setIdPerfil(id)

    //recuperar el nombre de la sucursal

  }


  const loadGetgetSearchUsuarioVenta = async () => {
    if (!idPerfil) {
      return;
    }

    try {
      setLoading(true);
      const response = await loadApiGetAccesoPerfil(idPerfil);
      setLoading(false);
      console.log("response list menus info ", response)
      if (response?.status && response?.menu) {
        setMenuData(response?.menu)
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
          Acceso de Perfiles - Sistema de Ventas

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
                  <h5 style={{ margin: "5px" }}>Perfiles</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListUsaurios}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) =>
                      handleSeleccionePerfil(value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Seleccione perfil"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (<InputAdornment position="start"> <SearchIcon />
                          </InputAdornment>),
                          disableUnderline: true
                        }}

                      />
                    )}
                    getOptionLabel={(option: any) => option.text}
                  />



                </div>
              </Grid>




              <Grid item xs={12} sm={12} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => loadGetgetSearchUsuarioVenta()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>



      <br />


      <br />

      {menuData?.map((item: any, index: any) => {
        return (
          <PaletaParentPerfilesVenta
            key={index}
            idVentasAccesoFather={item.ID_VENTAS_ACCESO}
            accedeFather={item.ACCEDE}
            name={item.NOMBRE} color="#EF9A9A" COLOR_R="239" COLOR_G="154" COLOR_B="154"
            rows={item.hijos}
            control={control}
            idPerfil={idPerfil}
            getValues={getValues}
            setValue={setValue}
          />

        )
      })}

      {loading ? <KDImage

      /> : null}

    </>
  )
}

export default AccesoPerfilesVenta