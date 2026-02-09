import { Typography, Button, Collapse, TextField, Modal, Grid, Autocomplete, InputAdornment, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TablaDespacho from './TablaDespacho';


import { useDespachoService } from './services/useDespachoService';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { es } from 'date-fns/locale'




import { getStringFechaInicial, getDayFormat, getMonthFormat } from '../../../../../core/utils/DateFormat';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { Controller, useForm } from "react-hook-form";
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import { AlertToastWarning } from '../../../../common/alerts/alertsToast';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#28A745 '),
  backgroundColor: '#28A745 ',
  '&:hover': {
    backgroundColor: '#186C2B',
  },
}));


const Despacho = () => {
  const { loadApiObtenerListaPedidosDespacho, loadApiInventariosTurno, loadApiGuardarPedidosDespacho } = useDespachoService();

  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();
  const { errors } = formState;

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const [loading, setLoading] = useState(
    false
  );

  const [openOne, setOpenOne] = useState(false);





  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const handleOpenModalTres = () => {

    setOpenModalTres(true);
  }
  const handleCloseModalTres = () => setOpenModalTres(false);
  //four


  const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())
  const [ListTurnos, setListTurnos] = useState<any>([])

  const [turno, setTurno] = useState('')
  const [datos, setDatos] = useState<any>([])

  const [originalRows, setoriginalRows] = useState<any>([])
  const [activeBtnSearch, setActiveBtnSearch] = useState(false)

  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const handleChange1 =
  (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };


  const requestSearch = (searchedVal: string) => {
    console.log("serach  ", searchedVal)
    setSearched(searchedVal);
    /*const filteredRows = originalRows.filter((row: any) => {
      return row.nombre.toLowerCase().includes(searchedVal.toLowerCase());
    });*/
    const keys = ["CATEGORIA",
      "SUBCATEGORIA",
      "PRODUCTO",
      "Pando",
      "Salamanca",
      //"America_Oeste",
      "Hupermall",
      "Lincoln",
      "Jordan",
      //"America_Este",
      //"Mega_Center",
      "Prueba",
      "TOTAL",
      "RECIBIDA",
      "CARGADO"]
    const filteredRows = originalRows.filter((row: any) => {
      return keys.some((key: any) =>
        row[key]?.toLowerCase()?.includes(searchedVal.toLowerCase())
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
    //loadObtenerListaPedidosDespacho()
    loadInventariosTurno();
  }, []);


  const handleChangeDate = async (fecha: Date) => {

    fecha = new Date(fecha)
    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    //console.log("format fecha ini", auxFormatFecha)
    setFechaInicio(auxFormatFecha)


  };






  const loadObtenerListaPedidosDespacho = async () => {
    if (!fechaInicio || !turno) {
      return;
    }
    try {
      setLoading(true)
      const response = await loadApiObtenerListaPedidosDespacho(fechaInicio, turno)
      console.log(" response by fecha", fechaInicio, response)
      setLoading(false)
      if (Array.isArray(response?.datos) && Array.isArray(response?.cabecera)) {
        setRows(response?.datos)
        setoriginalRows(response?.datos)
        console.log("tag +++++++++++++++")
        getValueByKeyInArrayTag(response?.datos, "_recibida")
        getValueByKeyInArrayTag(response?.datos, "_cargado")
        setDatos(response?.datos)
        setComlumnaDemo(response?.cabecera)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getValueByKeyInObjectTag = (array: any, tag: string) => {

    for (var key in array) {

      if (array[`${key}`] == '.00') {
        setValue(`${key}${tag}`, 0)
      } else {
        setValue(`${key}${tag}`, array[key])
      }
    }

  }
  const getValueByKeyInArrayTag = (array: any, tag: string) => {
    console.log("tag ", tag)
    if (tag == "_recibida") {

      for (let i = 0; i < array.length; i++) {
        setValue(`${array[i].ID_SUB_CATEGORIA_2}${tag}`, array[i].TOTAL)
        // setValue(`${key}${tag}`, array[key])

      }
      return;
    }

    if (tag == "_cargado") {
      //      console.log("entre para actulizar tag ", `${array[0].ID_SUB_CATEGORIA_2}${tag}`, `${array[0].RECIBIDA}`)

      for (let i = 0; i < array.length; i++) {
        setValue(`${array[i].ID_SUB_CATEGORIA_2}${tag}`, array[i].CARGADO)
        // setValue(`${key}${tag}`, array[key])

      }
      return;
    }



    //  return null;
  }

  const loadObtenerListaPedidosDespachoByFecha = async (fecha: string) => {
    if (!fecha) {
      return;
    }
    try {
      setLoading(true)
      const response = await loadApiObtenerListaPedidosDespacho(fecha, "tipo")
      console.log(" response by fecha", fecha, response)
      setLoading(false)
      if (Array.isArray(response?.datos) && Array.isArray(response?.cabecera)) {
        setRows(response?.datos)
        console.log("tag +++++++++++++++")
        getValueByKeyInArrayTag(response?.datos, "_recibida")
        setoriginalRows(response?.datos)

        setComlumnaDemo(response?.cabecera)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  //end llamar a la api

  const loadInventariosTurno = async () => {
    try {
      const response = await loadApiInventariosTurno();
      console.log("response data ", response)
      if (Array.isArray(response?.turnos)) {
        setListTurnos(response?.turnos)
        //actulizar select
      }

    } catch (error) {

    }
  }

  const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  const onSubmit = async (dataForm: any) => {
    console.log("enviando datos a despacho ", dataForm)

    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm), fechaInicio)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || !fechaInicio || !turno
      || (datos.length <= 0)
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)
    for (let i = 0; i < datos.length; i++) {
      // setValue(`${array[i].ID_SUB_CATEGORIA_2}${tag}`, `${array[i].RECIBIDA}`)
      // setValue(`${key}${tag}`, array[key])
      if (dataForm[`${datos[i].ID_SUB_CATEGORIA_2}_recibida`] != datos[i].RECIBIDA
        || dataForm[`${datos[i].ID_SUB_CATEGORIA_2}_cargado`] != datos[i].CARGADO
        // dataForm[`${key}_turno`] != envio[key] ||
        // dataForm[`${key}_observacion`] != observacion[key]
      ) {
        //   console.log("el valor campo por orginal(izq) cambiado(der) ", key, stock[key], dataForm[`${key}_stockEnviado`])

        var resChild: any = {
          "recibida": dataForm[`${datos[i].ID_SUB_CATEGORIA_2}_recibida`],
          "cargado": (dataForm[`${datos[i].ID_SUB_CATEGORIA_2}_cargado`] == undefined ?
            "0" : dataForm[`${datos[i].ID_SUB_CATEGORIA_2}_cargado`] == true ? "1" : "0"),
          // "observacion": dataForm[`${key}_observacion`]
        }
        resObj[datos[i].ID_SUB_CATEGORIA_2] = resChild;

      }

    }

    console.log("res send ", turno, resObj)

    if (isObjEmpty(resObj)) {
      //alert("No modficaste datos")
      AlertToastWarning({ message: "No habia nada que actualizar" })
      return;
    }

    try {
      setLoading(true)
      const response = await loadApiGuardarPedidosDespacho(
        turno,
        resObj
      )
      setLoading(false)

      console.log("res guardar perfil pedidos ", response)
      if (response?.status) {
        //volver a  renderizar la api

        //await loadPerfilPedido()
        await loadObtenerListaPedidosDespacho()
        AlertSave({ title: '', message: 'Se ha guardado correctamente' })
      }


      if (response?.status == false) {
        AlertQuestion({ title: '', message: 'No Se ha guardado ' })


      }

      if (response == undefined) {
        AlertError({ title: '', message: 'Algo salió mal' })
      }
    } catch (error) {
      console.log("error api guardar:*", error)
      setLoading(false)
      AlertError({ title: '', message: 'Algo salió mal' })
    }


  }




  const handleTurnos = (value: any) => {
    console.log("value de succrusal ", value)
    const { TURNO } = value
    setTurno(TURNO);
    //setNombreSucursalTable(DESCRIPCION)
    //setIdSucursal(ID_UBICACION)
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
              Despacho de Pedidos
            </Typography>
          </Grid>
        
        </Grid>


      </div>





      <br />

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

                    onChange={(newValue: Date) => { handleChangeDate(newValue) }}
                    slotProps={{ textField: { size: 'small' } }}

                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListTurnos}
                    noOptionsText={"Sin opciones"}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) =>
                      handleTurnos(value)
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
                    getOptionLabel={(option: any) => option.TURNO}
                  />



                </div>
              </Grid>


              <Grid item xs={12} sm={6} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => loadObtenerListaPedidosDespacho()}
                >Buscar</ColorButton>
              </Grid>
              <Grid item xs={12} sm={6} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton2 variant="contained" sx={{ marginTop: '29px' }}
                  onClick={handleSubmit(onSubmit)}
                >Guardar</ColorButton2>
              </Grid>

            </Grid>



          </AccordionDetails>

        </Accordion>
      </div>

      {expanded ? <>

        <Box sx={{ width: '100%' }}>

     

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
            , alignContent: 'center'
          }}>
            {/*<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <h6 style={{ padding: '0px', margin: '0px' }}>Mostrar</h6>
    &nbsp;&nbsp;
    <TextField
      label="Mostrar"
      id="outlined-size-small"
      defaultValue="Small"
      type='number'
      size="small"
    />
  </div>*/}

            {/*<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        
              &nbsp;&nbsp;
        
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelResearch={() => cancelSearch()}
                placeholder='Buscar'

              />
            </div>*/}
          </div>
        </Box>

        <br />
        <TablaDespacho
          tableData={rows}
          comlunaDemo={comlunaDemo}
          control={control}
          deleteByIndex={(index: any) => deleteByIndex(index)}
        />
      </> : null}

      {loading ? <KDImage /> : null}
      <ToastContainer />


      {/*<ModalPersonalized
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        description="Deseas cerrar y guardar el formulario?"
      />*/}
      {/*
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>

          <Typography id="modal-modal-description" sx={{
            mt: 2, textAlign: 'center', fontWeight: 'bold',
            fontSize: '1.5rem'
          }}>
            Deseas cargar la sugerencia del perfil?, puedes perder toda informacion guardada anteriormente
          </Typography>
          <br />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
            &nbsp; &nbsp;
            <Button sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
            &nbsp; &nbsp;
            <Button sx={{ backgroundColor: '##6E7881' }} variant="contained" >Cancel</Button>
          </div>
        </Box>
      </Modal>
     */}
      {/*customModal()*/}
    </>
  )
}

export default Despacho