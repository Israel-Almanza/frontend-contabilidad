import { Typography, Button, Collapse, TextField, Modal, Grid, InputAdornment, Autocomplete, AccordionDetails, Accordion, AccordionSummary } from '@mui/material'
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



import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';





import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from "react-hook-form";

import { styled } from '@mui/material/styles';


import PaletaParentFormasPago from './components/PaletaParentFormasPago';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAccesoFormasPago } from './services/useAccesoFormasPago';
import { KDImage } from '../../../../core/modal-loading/KDImage';




const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));
const AccesoFormasPago = () => {

  const { loadApiSucursalesUsaurio, loadApiListFirstFormas } = useAccesoFormasPago()

  const [ListSucursalesUsaurio, setListSucursalesUsaurio] = useState<any>([])
  const [ListFormas, setListFormas] = useState<any>([])
  const [ListCanales, setListCanales] = useState<any>([])
  const [idSucursal, setIdSucursal] = useState('')
  const [loading, setLoading] = useState(
    false
  );
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };



  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };






  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //call api
    loadSucursalesUsaurio()
  }, []);



  const loadSucursalesUsaurio = async () => {
    try {
      const response = await loadApiSucursalesUsaurio();
      console.log("response data ", response)
      if (Array.isArray(response)) {
        setListSucursalesUsaurio(response)
        //actulizar select
      }

    } catch (error) {

    }
  }

  const loadListFirstFormas = async () => {
    if (!idSucursal) {
      return;
    }
    try {
      setLoading(true);
      const response = await loadApiListFirstFormas(idSucursal);
      setLoading(false);
      console.log("response list formas ", response)
      if (response?.canales) {
        setListCanales(response?.canales);
      }
      if (response?.formas) {
        setListFormas(response?.formas);
      }

    } catch (error) {

    }
  }


  const handleSeleccioneSucursal = (value: any) => {
    console.log("valee de sucursal ", value)
    const { ID_UBICACION, DESCRIPCION } = value
    setIdSucursal(ID_UBICACION)

    //recuperar el nombre de la sucursal

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
          Acceso de Formas de pago en Sucursales
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

              <Grid item xs={12} sm={6} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Sucursal</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListSucursalesUsaurio}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) =>
                      handleSeleccioneSucursal(value)
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
                    getOptionLabel={(option: any) => option.DESCRIPCION}
                  />



                </div>
              </Grid>




              <Grid item xs={12} sm={12} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => loadListFirstFormas()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>


      <br />




      {ListCanales?.map((item: any, index: any) => {
        return (
          <PaletaParentFormasPago
            name={item.NOMBRE_LISTA_PRECIOS} color="#EF9A9A" COLOR_R="239" COLOR_G="154" COLOR_B="154"
       
            //formas={ListFormas}
            formas={item.formas}
            FACTURADO={item.FACTURADO}
            ID_NOMBRE_LISTA_PRECIOS={item.ID_NOMBRE_LISTA_PRECIOS}
            sucursal={idSucursal}
            index={index}

          />

        )
      })}


      {loading ? <KDImage

      /> : null}





    </>
  )
}

export default AccesoFormasPago