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


import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


import TablaAccesoBotonSucursal from './components/TablaAccesoBotonSucursal';


//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//import dayjs from 'dayjs';

import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from "react-hook-form";

import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';


import { useAccesoBotonSucursal } from './services/useAccesoBotonSucursal';
import { KDImage } from '../../../../core/modal-loading/KDImage';



const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));
const AccesoBotonSucursal = () => {

  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();
  const { errors } = formState;

  const { loadApiSucursalesUsaurio, loadApiGetAccesoBotones } = useAccesoBotonSucursal()

  const [ListSucursalesUsaurio, setListSucursalesUsaurio] = useState<any>([])
  const [idSucursal, setIdSucursal] = useState('')
  const [ListConfiguraciones, setListConfiguraciones] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
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

  const handleSeleccioneSucursal = (value: any) => {
    console.log("valee de sucursal ", value)
    const { ID_UBICACION, DESCRIPCION } = value
    setIdSucursal(ID_UBICACION)

    //recuperar el nombre de la sucursal

  }

  const setValueStringArrayByTag = (arrayValues: any,column:string, tag: string ) => {

    for (let i = 0; i <arrayValues?.length; i++) {
      if ((arrayValues?.[i])[column] == 1) {
        setValue(`${tag}${i}`, 1)
      } else {
        setValue(`${tag}${i}`, 0)
      }

    }

  }

  const setValueBooleanArrayByTag = (arrayValues: any,column:string, tag: string ) => {

    for (let i = 0; i <arrayValues?.length; i++) {
      if ((arrayValues?.[i])[column] == 1) {
        setValue(`${tag}${i}`, true)
      } else {
        setValue(`${tag}${i}`, false)
      }

    }

  }

  const loadGetAccesoBotones = async () => {
    if (!idSucursal) {
      return;
    }
    try {
      setLoading(true);
      const response = await loadApiGetAccesoBotones(idSucursal);
      setLoading(false);
      console.log("response list get botones ", response)
      if (response?.status && response?.configuraciones) {

        setListConfiguraciones(response?.configuraciones);

        if (response?.configuraciones) {

          setValueStringArrayByTag(response?.configuraciones,"TRANSPORTE","envios_")
          setValueStringArrayByTag(response?.configuraciones,"ENVIO_PROGRAMADO","venta_")
          setValueStringArrayByTag(response?.configuraciones,"DESCUENTO_FACTURADO","descuentofac_")
          setValueStringArrayByTag(response?.configuraciones,"DESCUENTO_TRADICIONAL","descuentotra_")
          setValueBooleanArrayByTag(response?.configuraciones,"ESTADO","estado_")
          
          
          /*for (let i = 0; i < response?.configuraciones?.length; i++) {
            if (response?.configuraciones?.[i]?.ENVIO_PROGRAMADO == 1) {
              setValue(`envios_${i}`, 1)
            } else {
              setValue(`envios_${i}`, 0)
            }

          }*/
        }

      
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
          Acceso de Botones a las Sucursales
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
                  onClick={() => loadGetAccesoBotones()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>


      <br />





      <TablaAccesoBotonSucursal tablaData={ListConfiguraciones}

        control={control}

        getValues={getValues}
        setValue={setValue}

        errors={errors}
        register={register}
      />
      {loading ? <KDImage

      /> : null}

    </>
  )
}

export default AccesoBotonSucursal