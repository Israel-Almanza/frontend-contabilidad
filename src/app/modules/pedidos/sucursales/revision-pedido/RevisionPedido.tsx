import { CardActionArea, FormGroup, Typography, Button, Collapse, TextField, Checkbox, Autocomplete, InputAdornment, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { IoMdPaperPlane } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import PaletaRevisionPedido from './components/PaletaRevisionPedido';
import { useRevisionPedido } from './services/useRevisionPedido';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//HiLockClosed 
import { HiLockClosed } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2";
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
//import { AlertSave } from '../../../common/alerts/alerts';
import { Controller, useForm } from "react-hook-form";


import { useParams } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { styled } from '@mui/material/styles';


import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { ModalAbrirInventario } from './components/ModalAbrirInventario';
import { ModalCerrarInventario } from './components/ModalCerrarInventario';
import { AlertToastWarning } from '../../../../common/alerts/alertsToast';

import { getStringFechaInicial, getDayFormat, getMonthFormat } from '../../../../../core/utils/DateFormat';
import { messageEmpty } from '../../../../common/messages/messagesCustom';
import { ToastContainer } from 'react-toastify';

import { isMultiploDe025Custom, isMultiploDeNumberCustom } from '../../../../../core/utils/Mathematical';


import "jspdf-autotable";
import { printCustomPDF } from '../../../../../core/utils/ManagerPdf';
import { exportToCustomCSV } from '../../../../../core/utils/ManagerExcel';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));







const RevisionPedido = () => {

  const { idSucursal } = useParams()
  // console.log("id sucursal dinamico ", idSucursal)
  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();
  const { errors } = formState;

  const { loadApiRevisionSucursalByDate,
    loadApiRestriccionesTiempoSucursal,
    loadApiGuardarRevisionSucursal,
    loadApiEnviarRevisionSucursal } = useRevisionPedido()

  const [cabecera, setCabecera] = useState<any>([])
  const [existencia, setExistencia] = useState<any>([])
  const [adecuacionInput, setAdecuacionInput] = useState<any>([])
  const [fechaActual, setFechaActual] = useState(() => getStringFechaInicial())
  const [stock, setStock] = useState<any>({})
  //const [fechaActual, setFechaActual] = useState('')




  const [NombrePerfilTemp, setNombrePerfilTemp] = useState('')
  const [NombreSucursalShow, setNombreSucursalShow] = useState('')
  const [enviada, setenviada] = useState<any>([])
  const [turnos, setTurnos] = useState<any>([])
  const [entrega, setEntrega] = useState<any>([])
  //verficando datos

  const [solicitada, setSolicitada] = useState<any>({})
  const [observacion, setObservacion] = useState<any>({})
  const [envio, setEnvio] = useState<any>({})

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //reset value
    setExistencia([])
    setNombrePerfilTemp('')
    setNombreSucursalShow('')
    //setFechaActual(getStringFechaInicial())
    reset({})
    //end reset values
    loadRevisionSucursal()
    loadRestriccionesTiempoSucursal()


    //obteniendo multiplos




  }, [idSucursal]);

  //loading
  const [loading, setLoading] = useState(false);

  //botones candado
  const [checkInactivo, setCheckInactivo] = useState(true)



  const [controlBlockDays, setControlBlockDays] = useState<number>(0)

  //<---MODAL



  //modal abrir inventario
  const [openModalAbrir, setOpenModalAbrir] = useState(false);

  const handleOpenModalAbrir = () => setOpenModalAbrir(true);
  const handleCloseModalAbrir = () => setOpenModalAbrir(false);

  //modal abrir inventario
  const [openModalCerrar, setOpenModalCerrar] = useState(false);

  const handleOpenModalCerrar = () => setOpenModalCerrar(true);
  const handleCloseModalCerrar = () => setOpenModalCerrar(false);
  //MODAL-->

  const handleBuscarRevisionSucursal = async () => {
    await loadRevisionSucursal();
    //setNombreSucursalShow(NombrePerfilTemp)

    //resetValues()
    //handleCloseModalBuscar()

  }

  const loadRestriccionesTiempoSucursal = async () => {
    if (!idSucursal) {
      return;
    }

    try {
      const response = await loadApiRestriccionesTiempoSucursal(Number(idSucursal))
      // console.log("resposne api restricciones ", response)
      if (response && response?.DIAS_MAX_PEDIDO) {
        setControlBlockDays(response?.DIAS_MAX_PEDIDO)
        setNombreSucursalShow(response?.DESCRIPCION)

      }


    } catch (error) {

    }

  }
  const loadRevisionSucursal = async () => {

    console.log("entre aqui ", idSucursal, fechaActual)
    //setExistencia([])

    if (!idSucursal || !fechaActual) {
      //alert("valor vacio de idperfil")
      return;
    }
    try {
      setLoading(true)
      const response = await loadApiRevisionSucursalByDate(idSucursal, fechaActual);
      setLoading(false)

      console.log(" response revision pedido ", response)

      const valdateValuesCerosArray = (array: any, objectCompare: any) => {

        var res = false
        let contarRes = 0;
        let i;
        for (i = 0; i < array.length; i++) {
          if (objectCompare[`${array[i].ID_SUB_CATEGORIA_2}`] == '.00' ||
            objectCompare[`${array[i].ID_SUB_CATEGORIA_2}`] == undefined) {
            contarRes = contarRes + 1;
            res = true
          } else {
            res = false
          }
        }
        if (i == array.length) {
          if (res == true && contarRes == i) {
            //console.log("aaaa res fin true todos son ceros", i)
            return true
          } else {
            // console.log("aaaa res fin false")//por lo menos existe un cero en la tabla
            return false
          }
        }
        return true

      }
      const verficandoProductos = (arrayProduct: any) => {
        if (arrayProduct) {
      
          if (valdateValuesCerosArray(arrayProduct, response?.solicitada)) {
            //si es todo es cero return true
            return false
          } else {
            //al menos exiten un valores en tabla ceros
            return true
          }
         

        } else {
          return false;
        }

      }

      let resAuxFilterExistencia = response?.existencia.map((item: any) => {
        //para items sin productos
        const filteredSubcategoria = item.SUBCATEGORIA?.filter((subItem: any) => verficandoProductos(subItem?.PRODUCTOS));
        item.SUBCATEGORIA = filteredSubcategoria;
        return item;
      });

      console.log("res filter ",resAuxFilterExistencia)
      
      var resExistenciaFilter = resAuxFilterExistencia?.filter((item: any) => (item?.SUBCATEGORIA?.length > 0))

      setExistencia(resExistenciaFilter)

      //setExistencia(response?.existencia)  //esto srive
      setSolicitada(response?.solicitada)  //stock==solicitada
      setCabecera(response?.cabecera)
      //getValueByKeyInObject(response?.solicitada)

      //cambio hoy //getValueByKeyInObjectTag(response?.solicitada, "_stockEnviado")
      getValueByKeyInObjectTagReplaceCeros(response?.enviada, response?.solicitada, "_stockEnviado")
      //envio
      getValueByKeyInObjectTag(response?.envio, "_turno")
      setEnvio(response?.envio)
      //observacion
      getValueByKeyInObjectTag(response?.observacion, "_observacion")
      setObservacion(response?.observacion)
      setAdecuacionInput(response.adecuacion_inputs_validation)
      
      // en este modulo enviada trabaja como el objeto registro
      if (response?.enviada) {
        // console.log(" enviada ", response.enviada)
        setenviada(response.enviada)
        //getValueByKeyInObject(response.enviada)
      }

      handleSubmit(() => { })();

      if (response?.cabecera && response?.cabecera[0]?.ESTADO) {
        if (response?.cabecera[0]?.ESTADO <= 10) { //10 block
          // console.log("entre aqui ",controlDisable)
          // localStorage.setItem('estaDesabilitado_RevisionPedido', JSON.stringify(false));
          localStorage.setItem('estaDesabilitado_RevisionPedido', JSON.stringify(true));
          return;
        }
        if (response?.cabecera[0]?.ESTADO == 11) { //11
          //hablitado o inabilitado
          localStorage.setItem('estaDesabilitado_RevisionPedido', JSON.stringify(false));
        }
        if (response?.cabecera[0]?.ESTADO >= 12) {  //12 block
          localStorage.setItem('estaDesabilitado_RevisionPedido', JSON.stringify(true));
          return;
        }
      }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }



  const getValueByKeyInObject = (array: any) => {
    for (var key in array) {
      setValue(key, array[key])
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

  const getValueByKeyInObjectTagReplaceCeros = (arrayObjIteracion: any, arrayObjectReplace: any, tag: string) => {

    for (var key in arrayObjIteracion) {

      if (arrayObjIteracion[`${key}`] == '.00') {
        setValue(`${key}${tag}`, arrayObjectReplace[key])
      } else {
        setValue(`${key}${tag}`, arrayObjIteracion[key])
      }
    }

  }



  const getRestarDateCurrent = (restarDias: number) => {
    var fechaTemp: any = new Date()
    //const restarDias = 3
    fechaTemp.setDate(fechaTemp.getDate() - restarDias)
    return fechaTemp;
  }


  //var map = { "item1": 1404, "item2": 2, "item3":3 ,"item4":5};
  //var res = getValueByKeyInObject("item1", map); 

  //datos de Json

  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  /*
    const isMultiploDe025Custom = (arrayObjIteracion: any, arryayObjGetBykeyValue: any, tag: string) => {
      for (var key in arrayObjIteracion) {
        //no eso multiplo 
        //console.log("key get ", key)
        if (Number(arryayObjGetBykeyValue[`${key}${tag}`]) % 0.25 != 0) {
        //  console.log("no multplo ", arryayObjGetBykeyValue[`${key}${tag}`])
          return false
        }
      }
      return true
    }*/
  //guardar los dataForm de inventario
  const onSave = async (dataForm: any) => {


    //esta vacio-> true
    //si no esta vacio-> false

    console.log("respues ", isObjEmpty(dataForm), fechaActual)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(solicitada) || !idSucursal
      || !fechaActual || isObjEmpty(observacion) || isObjEmpty(envio)
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj: any = {}


    for (var key in enviada) {


      if (dataForm[`${key}_stockEnviado`] != enviada[key] ||
        dataForm[`${key}_turno`] != envio[key] ||
        dataForm[`${key}_observacion`] != observacion[key]
      ) {
       //anañdiendo valor solamente valor cambiando
        //dinamcamente
        var resChild: any = {
          "stockEnviado": dataForm[`${key}_stockEnviado`],
          "turno": dataForm[`${key}_turno`],
          "observacion": dataForm[`${key}_observacion`]
        }
        resObj[key] = resChild;

      }

    }

    console.log("res data form ", dataForm)
    console.log("res send ", resObj)

    if (isObjEmpty(resObj)) {

      AlertToastWarning({ message: "No habia nada que actualizar" })
      return;
    }


    if (isMultiploDeNumberCustom(resObj, dataForm, "_stockEnviado",adecuacionInput)) {
      console.log("son multiplos de 0.25")


      try {
        setLoading(true)
        const response = await loadApiGuardarRevisionSucursal(
          idSucursal,
          fechaActual,
          resObj
        )
        console.log("res guardar perfil pedidos ", response)
        setLoading(false)
        if (response?.status) {
          await loadRevisionSucursal();
          AlertSave({ title: '', message: 'Se ha guardado las cantidades Solicitadas' })

        }
        if (response?.status == false) {

          AlertQuestion({ title: '', message: 'No Se ha guardado ' })
          return;
        }

        if (response == undefined) {
          AlertError({ title: '', message: 'Algo salió mal' })
          return;
        }

      } catch (error) {
        console.log("error api guardar:*", error)
        setLoading(false)
      }
    }
    else {
      AlertToastWarning({ message: "hay algunos datos son incorrectos" })
    }

  }

  const onSend = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm), fechaActual)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(solicitada) || !idSucursal
      || !fechaActual || isObjEmpty(observacion) || isObjEmpty(envio)
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    

    for (var key in enviada) {

      //campos que pueden sufrir modifcaciones
      //stock tiene la contiene la informacion de solcitudes
      /* if (dataForm[`${key}_stockEnviado`] != stock[key] ||
         dataForm[`${key}_turno`] != envio[key] ||
         dataForm[`${key}_observacion`] != observacion[key]
       ) 
       */
      // console.log("el valor campo por orginal(izq) cambiado(der) ", key, stock[key], dataForm[`${key}_stockEnviado`])
      //anañdiendo valor solamente valor cambiando
      //dinamcamente
      if (Number(solicitada[`${key}`]) > 0  //dataForm[`${key}_stockEnviado`] > 0
      ) {
        var resChild: any = {
          "stockEnviado": dataForm[`${key}_stockEnviado`],
          "turno": dataForm[`${key}_turno`],
          "observacion": dataForm[`${key}_observacion`]
        }
        resObj[key] = resChild;
      }




    }

    console.log("res send ", resObj)

    /*if (isObjEmpty(resObj)) {
      AlertToastWarning({ message: "No habia nada que actualizar" })
      return;
    }*/

    if (isMultiploDeNumberCustom(resObj, dataForm, "_stockEnviado",adecuacionInput)) {
      try {
        setLoading(true)
        const response = await loadApiEnviarRevisionSucursal(
          idSucursal,
          fechaActual,
          resObj
        )
        console.log("res enviar perfil pedidos ", response)
        setLoading(false)
        if (response?.status) {

          await loadRevisionSucursal();
          AlertSave({ title: '', message: 'Se ha guardado las cantidades Solicitadas' })
          return;
        }
        if (response?.status == false) {

          AlertQuestion({ title: '', message: 'No Se ha guardado ' })
          return;
        }

        if (response == undefined) {
          AlertError({ title: '', message: 'Algo salió mal' })
          return;
        }

      } catch (error) {
        console.log("error api enviar:*", error)
        setLoading(false)
      }
    }
    else {
      AlertToastWarning({ message: "hay algunos datos son incorrectos" })
    }



  }

  //enviar los datos del inventario

  const handleChangeDateInicio = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    // console.log("format fecha ini", auxFormatFecha)

    setFechaActual(auxFormatFecha)


  };







  //habilitar/desabilitar candado
  const handlePadLock = () => {
    handleCloseModalAbrir()
    handleCloseModalCerrar()
    if (!checkInactivo) {
      //cerrado
      localStorage.setItem('estaDesabilitado_RevisionPedido', JSON.stringify(true));
      //AlertSave({ title: "", message: "El formulario fue guardado y cerrado" });
      console.log("recuperando valores actuales ", getValues())

      handleSubmit(onSend)();

    } else {
      //abierto
      localStorage.setItem('estaDesabilitado_RevisionPedido', JSON.stringify(false));
      AlertSave({ title: "", message: "Formulario fue abierto!" });
    }
    setCheckInactivo(!checkInactivo)
  }

  const formatDataforPdfAndDownload = () => {

    var arrayGetOnlyProduct: any = []
    for (let i = 0; i < existencia.length; i++) {
      if (existencia[i]?.SUBCATEGORIA) {
        var subcategoriaTemp = existencia[i]?.SUBCATEGORIA
        for (let x = 0; x < subcategoriaTemp.length; x++) {
          var productosTemp = subcategoriaTemp[x]?.PRODUCTOS
          for (let z = 0; z < productosTemp?.length; z++) {
            if (solicitada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] != ".00") {
              var objProd = {
                producto: productosTemp[z].SUB_CATEGORIA_2,
                cant_solicitada: solicitada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`],
                cant_preparada: (enviada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? solicitada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] : enviada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`]),
                turno: envio[`${productosTemp[z].ID_SUB_CATEGORIA_2}`],
                observacion: observacion[`${productosTemp[z].ID_SUB_CATEGORIA_2}`]
              }
              arrayGetOnlyProduct.push(objProd)
            }
          }
        }
      }


    }


    const columns = [
      { name: "Producto", nameRow: "producto" },
      { name: "Cantidad Solicidata", nameRow: "cant_solicitada" },
      { name: "Cantidad Preparada", nameRow: "cant_preparada" },
      { name: "Turno", nameRow: "turno" },
      { name: "Observacion", nameRow: "observacion" }
    ]


    const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${NombreSucursalShow}`).toUpperCase()
    setLoading(true)
    printCustomPDF(arrayGetOnlyProduct, columns, titleHeader, "preparacion-ventas")
    setLoading(false)
  }




  const generateExcel = () => {

    var arrayGetOnlyProduct: any = []
    for (let i = 0; i < existencia.length; i++) {
      if (existencia[i]?.SUBCATEGORIA) {
        var subcategoriaTemp = existencia[i]?.SUBCATEGORIA
        for (let x = 0; x < subcategoriaTemp.length; x++) {
          var productosTemp = subcategoriaTemp[x]?.PRODUCTOS
          for (let z = 0; z < productosTemp?.length; z++) {
            if (solicitada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] != ".00") {
              var objProd = {
                producto: productosTemp[z].SUB_CATEGORIA_2,
                cant_solicitada: solicitada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`],
                //cant_solicitada: solicitada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`],
                cant_preparada: (enviada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? solicitada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] : enviada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`]),
                turno: envio[`${productosTemp[z].ID_SUB_CATEGORIA_2}`],
                observacion: observacion[`${productosTemp[z].ID_SUB_CATEGORIA_2}`]
              }
              arrayGetOnlyProduct.push(objProd)
            }
          }
        }
      }

    }

    const columns = [

      { name: "Producto", nameRow: "producto" },
      { name: "Cantidad Solicidata", nameRow: "cant_solicitada", widthCol: 12 },
      { name: "Cantidad Preparada", nameRow: "cant_preparada", widthCol: 12 },
      { name: "Turno", nameRow: "turno", widthCol: 4 },
      { name: "Observacion", nameRow: "observacion", widthCol: 0 }

    ]

    const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${NombreSucursalShow}`).toUpperCase()
    setLoading(true)
    exportToCustomCSV(arrayGetOnlyProduct, columns, titleHeader, "preparacion-ventas")
    setLoading(false)
  }


  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
       (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
         setExpanded(newExpanded ? panel : false);
       };



  return (
    <>


      <div style={{
        backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center'

      }}
      >

        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
          {/* <PersonAddIcon />*/}
          Revisión - {NombreSucursalShow}
        </Typography>
        {/*<div>
            <Button onClick={handleOpenModalBuscar} sx={{ fontSize: '1.6em', color: 'white' }}><BiSearchAlt /></Button>
            <Button onClick={handleOpenModal} sx={{ fontSize: '1.6em', color: 'white' }}><AiOutlinePlusCircle /></Button>
            <Button onClick={handleOpenModal2} sx={{ fontSize: '1.6em', color: 'white' }}><FaRegClone /></Button>
          </div>*/}
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DesktopDatePicker sx={{ width: '100%' }}
              defaultValue={dayjs() as unknown as Date}

              
              format='DD/MM/YYYY'
              minDate={dayjs(getRestarDateCurrent(controlBlockDays)) as unknown as Date}
              maxDate={dayjs() as unknown as Date}
              onChange={(newValue: any) => { handleChangeDateInicio(newValue) }}
              slotProps={{ textField: { size: 'small' } }}

            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={2} container
          direction="row"
          justifyContent="flex-start"
          alignItems="center">

          <ColorButton variant="contained" sx={{ marginTop: '29px' }}

            //onClick={() => loadPedidosExtraordinariosSuc()}
            onClick={() => handleBuscarRevisionSucursal()}
          >Buscar</ColorButton>
        </Grid>

      </Grid >
          </AccordionDetails>
        </Accordion>
      </div>


      {cabecera[0]?.ESTADO >= 11 ?
        <>
          <div style={{
            backgroundColor: `#343A40`, padding: '0.5%', display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', borderRadius: '0px', marginTop: '1%'
            , alignItems: 'center', position: 'sticky', top: '0px', zIndex: 50

          }}
          >

            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontSize: '18px', fontFamily: 'Times New Roman' }} >
              Revisión
            </Typography>
            {/* <div>
                <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSave)}><IoSaveOutline /></Button>
                <Button sx={{ fontSize: '1.6em', color: 'white' }}
                  onClick={handleSubmit(onSend)}
                ><IoMdPaperPlane /></Button>
               
              </div>*/}

            <div>
              {cabecera ? cabecera?.map((row: any, index: any) => {
                 if(row.BLOQUEADO_GENERAL == 1){
                  return ;
                }else{
                if (row.ESTADO >= 13 || row.ESTADO <= 10) {
                  return;
                }
                if (row.ESTADO == 11) {
                  return (
                    <>

                      <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSave)}><IoSaveOutline /></Button>
                      <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSend)}><IoMdPaperPlane /></Button>
                    </>
                  )
                }

                if (row.ESTADO == 12) {
                  return (
                    <>

                      {checkInactivo ? <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleOpenModalAbrir}><HiLockClosed /></Button> :
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleOpenModalCerrar}><HiLockOpen /></Button>}
                      

                    </>
                  )
                }
              }
              }) : null
              }
              
              <Button onClick={generateExcel} sx={{ fontSize: '1.6em', color: 'white' }}><SiMicrosoftexcel /></Button>
              <Button onClick={formatDataforPdfAndDownload} sx={{ fontSize: '1.6em', color: 'white' }}><ImFilePdf /></Button>
            </div>
          </div>
        </>
        :
        null
      }


      <br />


      {cabecera[0]?.ESTADO >= 11 && existencia?.map((row: any, index: any) => {

        return (

          <PaletaRevisionPedido
            key={index}
            name={row.CATEGORIA}
            color={`rgb(${row.COLOR_R},${row.COLOR_G},${row.COLOR_B})`} COLOR_R={row.COLOR_R} COLOR_G={row.COLOR_G} COLOR_B={row.COLOR_B}
            SUBCATEGORIA={row.SUBCATEGORIA}


            control={control}

            getValues={getValues}
            setValue={setValue}
            solicitada={solicitada}
            enviada={enviada}
            errors={errors}
            register={register}
            adecuacionInput={adecuacionInput}
          />

        )
      })}


      {(cabecera[0]?.ESTADO < 11 || cabecera?.length <= 0) ?
        <>
          {messageEmpty({ message: 'NO HAY SOLICITUDES POR PARTE DE LA SUCURSAL' })}
        </>
        : null}

      {loading ? <KDImage /> : null}
      <ToastContainer />

      <ModalAbrirInventario
        handlePadLock={handlePadLock}
        openModalAbrir={openModalAbrir}
        handleOpenModalAbrir={handleOpenModalAbrir}
        handleCloseModalAbrir={handleCloseModalAbrir}
        description="Desea abrir el Formulario?"
      />

      <ModalCerrarInventario
        handlePadLock={handlePadLock}
        openModalCerrar={openModalCerrar}
        handleOpenModalCerrar={handleOpenModalCerrar}
        handleCloseModalCerrar={handleCloseModalCerrar}
        description="Deseas cerrar y guardar el formulario?"
      />



    </>
  )



}

export default RevisionPedido