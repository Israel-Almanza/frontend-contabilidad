import { Typography, Button, Collapse, TextField, Modal, Grid, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TablaCronogramaEntrega from './TablaCronogramaEntrega';
import SearchBar from '@mkyy/mui-search-bar';
import dataUserJson from '../../../../data/usuarios/dataUserJson.json'
import { useCronogramaEntregaService } from './services/useCronogramaEntregaService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { es } from 'date-fns/locale'


import { ModalAddCronoEntrega } from './components/ModalAddCronoEntrega';
import { getStringFechaInicial, getDayFormat, getMonthFormat } from '../../../../core/utils/DateFormat';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));



const CronogramaEntrega = () => {
  const { loadApiObtenerCronogramas, loadApiGetCabeceraCronograma } = useCronogramaEntregaService();


  const [loading, setLoading] = useState(
    false
  );

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };


  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };




  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const handleOpenModalTres = () => {

    setOpenModalTres(true);
  }
  const handleCloseModalTres = () => setOpenModalTres(false);
  //four


  const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())

  const [originalRows, setoriginalRows] = useState<any>([])
  const [activeBtnSearch, setActiveBtnSearch] = useState(false)

  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    
    setSearched(searchedVal);
    /*const filteredRows = originalRows.filter((row: any) => {
      return row.nombre.toLowerCase().includes(searchedVal.toLowerCase());
    });*/
    const keys = ["SUCURSAL", "TURNO", "EN PLANTA", "EN CAMINO", "DESCARGANDO", "ENTREGADO", "ESTADO"]
    const filteredRows = originalRows.filter((row: any) => {
      return keys.some((key: any) =>
        row[key]?.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };



  const [comlunaDemo, setComlumnaDemo] = useState<any>([])


  //star llamar a api
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //loadData();
    //loadGetCabeceraCronograma();
    //loadObtenerCronogramas()
  }, []);


  const handleChangeDateInicio = async (fecha: Date) => {

    fecha = new Date(fecha)
    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    //console.log("format fecha ini", auxFormatFecha)
    setFechaInicio(auxFormatFecha)


  };






  const loadObtenerCronogramas = async () => {
    if (!fechaInicio) {
      return;
    }
    try {
      setLoading(true)
      const response = await loadApiObtenerCronogramas(fechaInicio)
  
      setLoading(false)
      if (Array.isArray(response?.datos) && Array.isArray(response?.cabecera)) {
        setRows(response?.datos)
        setoriginalRows(response?.datos)

        setComlumnaDemo(response?.cabecera)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const loadObtenerCronogramasByFecha = async (fecha: string) => {
    if (!fecha) {
      return;
    }
    try {
      setLoading(true)
      const response = await loadApiObtenerCronogramas(fecha)

      setLoading(false)
      if (Array.isArray(response?.datos) && Array.isArray(response?.cabecera)) {
        setRows(response?.datos)
        setoriginalRows(response?.datos)

        setComlumnaDemo(response?.cabecera)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  //end llamar a la api

  const deleteByIndex = (index: any) => {
  
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

  return (
    <>




      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >


        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
          <Grid item xs={12} sm={12} md={10}>
            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '15px',
              color: 'white', alignItems: 'center'
            }} >
              Cronograma de Entregas

            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <div>
              
              <Button onClick={handleOpenModalTres} sx={{ fontSize: '1.6em', color: 'white' }}><AiOutlinePlusCircle /></Button>


            </div>
          </Grid>
        </Grid>


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



              <Grid item xs={6} sm={6} md={4}>

                <h5 style={{ margin: "5px" }}>
                  Seleccione Fecha inicial</h5>
                <LocalizationProvider locale={es} dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DesktopDatePicker sx={{ width: '100%' }}
                    defaultValue={dayjs()}

                    format='DD/MM/YYYY'

                    onChange={(newValue: Date) => { handleChangeDateInicio(newValue) }}
                    slotProps={{ textField: { size: 'small' } }}

                  />
                </LocalizationProvider>
              </Grid>


              <Grid item xs={12} sm={12} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => loadObtenerCronogramas()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>



          </AccordionDetails>

        </Accordion>
      </div>


      <br />

      {expanded ? <>

        <Box sx={{ width: '100%' }}>



          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
            , alignContent: 'center'
          }}>
         

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {/*  <h6 style={{ padding: '0px', margin: '0px' }}>Buscar</h6>*/}
              &nbsp;&nbsp;
       
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelResearch={() => cancelSearch()}
                placeholder='Buscar'

              />
            </div>
          </div>
        </Box>

        <br />
        <TablaCronogramaEntrega
          tableData={rows}
          comlunaDemo={comlunaDemo}
          deleteByIndex={(index: any) => deleteByIndex(index)}
        />
      </> : null}

      {loading ? <KDImage /> : null}

      <ModalAddCronoEntrega
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        loadObtenerCronogramasByFecha={(fechaX: string) => loadObtenerCronogramasByFecha(fechaX)}
        // loadObtenerPerfilesSucursal={loadObtenerPerfilesSucursal}
        description="Nueva Entrega"
      />

   
    </>
  )
}

export default CronogramaEntrega