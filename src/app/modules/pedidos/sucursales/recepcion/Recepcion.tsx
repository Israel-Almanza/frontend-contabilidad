import { Typography, Button, Collapse, TextField, Grid, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'
//import PaletaRep from '../../../../../core/components/common/PaletaRep';
import PaletaRep from './components/PaletaRep';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { useRecepcion } from './services/useRecepcion';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { Controller, useForm } from "react-hook-form";
import { IoMdPaperPlane } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { HiLockClosed } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2";
import { ModalAbrirInventario } from './components/ModalAbrirInventario';
import { ModalCerrarInventario } from './components/ModalCerrarInventario';
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { AlertToastError, AlertToastWarning } from '../../../../common/alerts/alertsToast';
import { messageEmpty } from '../../../../common/messages/messagesCustom';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import { printCustomPDF } from '../../../../../core/utils/ManagerPdf';
import { isMultiploDe025Custom, isMultiploDeNumberCustom  } from '../../../../../core/utils/Mathematical';
import { exportToCustomCSV } from '../../../../../core/utils/ManagerExcel';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#43A047'),
  backgroundColor: '#43A047',
  '&:hover': {
    backgroundColor: '#409243 ',
  },
}));

const getDay = (tempDateDay: any) => {
  let res = "0";
  if (tempDateDay > 0 && tempDateDay < 10) {
    res = res + tempDateDay;
    return res;
  } else {
    return tempDateDay;
  }
}

const getMonth = (tempDateMonth: any) => {
  let res = "0";
  if (tempDateMonth >= 0 && tempDateMonth < 9) {
    let temp = tempDateMonth + 1;
    res = res + temp;
    return res;
  } else {
    return tempDateMonth + 1;
  }
}

const getStringFechaInicial = () => {
  const fechaInit = new Date()

  //2023-04-24"
  const auxFormatFechaInit = `${fechaInit.getFullYear()}-${getMonth(fechaInit.getMonth())}-${getDay(fechaInit.getDate())}`
  return auxFormatFechaInit
}

const Recepcion = () => {

  const { idSucursal } = useParams()
  console.log("id sucursal dinamico ", idSucursal)

  const { loadApiRestriccion, loadApiRecepcionTurnoSucursal, loadApiRecepcionSucursal, loadApiGuardarRecepcionSucursal, loadApiEnviarRecepcionSucursal } = useRecepcion()
  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };

  const [age, setAge] = React.useState('Button Prueba');

  //const handleChange = (event: any) => {
  //setAge(event.target.value);
  //};

  const [valueSelect, setValueSelct] = useState('Button Prueba');

  const handleChangeSelect = (event: any) => {
    //setAge(event.target.value);
    setValueSelct(event.target.value)
  };


  const [ID_PERFILES, setID_PERFILES] = useState<number>(0)
  const [NombrePerfilTemp, setNombrePerfilTemp] = useState('')
  const [NombreSucursalShow, setNombreSucursalShow] = useState('')
  const [lista, setLista] = useState<any>([])
  const [fechaActual, setFechaActual] = useState(() => getStringFechaInicial())
  const [resFecha, setResFecha] = useState<number>(0)
  const [controlDisable, setControlDisable] = useState<number>(0)
  const [checkInactivo, setCheckInactivo] = useState(true)
  const [recepcion, setRecepcion] = useState<any>([])
  const [existencia, setExistencia] = useState<any>([])
  const [cabecera, setCabecera] = useState<any>([])
  const [registro, setRegistro] = useState<any>([])
  const [aceptada, setAceptada] = useState<any>({})
  const [observacion, setObservacion] = useState<any>({})
  const [turnos, setTurnos] = useState<any>([])
  const [adecuacionInput, setAdecuacionInput] = useState<any>([])

  //modal abrir inventario
  const [openModalAbrir, setOpenModalAbrir] = useState(false);

  const handleOpenModalAbrir = () => setOpenModalAbrir(true);
  const handleCloseModalAbrir = () => setOpenModalAbrir(false);

  //modal cerrar inventario
  const [openModalCerrar, setOpenModalCerrar] = useState(false);

  const handleOpenModalCerrar = () => setOpenModalCerrar(true);
  const handleCloseModalCerrar = () => setOpenModalCerrar(false);


  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadDataRecepcionTurnoFecha()
    loadObtenerRestriccion()
    setNombreSucursalShow('')
    // testAxios();
  }, [idSucursal]);

  //loading
  const [loading, setLoading] = useState(
    false
  );



  const handleChangeDate = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonth(fecha.getMonth())}-${getDay(fecha.getDate())}`
    // console.log("format fecha ini", auxFormatFecha)

    setFechaActual(auxFormatFecha)
    //loadDataRecepcionTurnoFecha
    loadDataRecepcionParmaters(auxFormatFecha)

  };


  const getRestarDateCurrent = (restarDias: number) => {
    var fechaTemp: any = new Date()
    //const restarDias = 3
    fechaTemp.setDate(fechaTemp.getDate() - restarDias)
    return fechaTemp;
  }

  const loadObtenerRestriccion = async () => {
    if (!idSucursal) {
      return;
    }

    try {
      const response = await loadApiRestriccion(Number(idSucursal))
      console.log("restriccion fecha ", response)
      // setResFecha(response.DIAS_MAX_PEDIDO)
      if (response && response?.DIAS_MAX_PEDIDO) {
        setResFecha(response?.DIAS_MAX_PEDIDO)
        setNombreSucursalShow(response?.DESCRIPCION)

      }
    } catch (error) {

    }

  }

  //api recepcion lista turno segun fecha
  const loadDataRecepcionTurnoFecha = async () => {
    try {

      //parametro ncesarios
      console.log(idSucursal, fechaActual)

      if (!idSucursal || !fechaActual) {

        //  alert("hay un campo vacio")
        return;
      }
      setLoading(true)

      const response = await loadApiRecepcionTurnoSucursal(idSucursal, fechaActual)
      setLoading(false)
      console.log("lista de recepcion turnos ", response)
      setLista(response)


    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  //api recepcion lista 
  const loadDataRecepcionSucursal = async () => {
    try {

      //parametro ncesarios
      console.log(idSucursal, fechaActual)

      if (!idSucursal || !fechaActual) {

        //  alert("hay un campo vacio")
        return;
      }
      setLoading(true)

      const response = await loadApiRecepcionSucursal(idSucursal, fechaActual, NombrePerfilTemp)
      setLoading(false)
      console.log("lista de recepcion central ", response)
      console.log("lista aceptada ", response.aceptada)

      console.log("lista aaaa ", response?.registro["641"])
      const valdateValuesCerosArray = (array: any,objectCompare:any) => {


        //console.log("array ", array)
        //ceros y ademoas la longitud sea igual a la iteracion

        var res = false
        let contarRes = 0;
        let i;
        for (i = 0; i < array.length; i++) {

          if (objectCompare[`${array[i].ID_SUB_CATEGORIA_2}`] == '.00' ||
          objectCompare[`${array[i].ID_SUB_CATEGORIA_2}`] == undefined ||
          objectCompare[`${array[i].ID_SUB_CATEGORIA_2}`] == null) {
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


          if (valdateValuesCerosArray(arrayProduct,response?.registro)) {
            //si es todo es cero return true
            return false
          } else {
            //al menos exiten un valores en tabla ceros
            return true
          }
          //return allEqual;

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

      var resExistenciaFilter = resAuxFilterExistencia ?.filter((item: any) => (item?.SUBCATEGORIA?.length>0))

      console.log("respuesta  ini filter ", resExistenciaFilter)
      console.log("respuesta  fin res  filter ", resExistenciaFilter)
      setExistencia(resExistenciaFilter)
      //setExistencia(response.existencia)
      setCabecera(response.cabecera)
      setControlDisable(response?.cabecera[0]?.ESTADO)
      setRegistro(response.registro)
      setRecepcion(response.recepcion)
      console.log("recepcion ",response.recepcion)
      setTurnos(response.turno)
      console.log("TURNO SEGUN BUSQUEDA ",response.turno)
      //setAceptada(response.aceptada)
      getValueByKeyInObjectTagReplaceCeros(response?.registro,response?.aceptada,"_aceptada")
      //getValueByKeyInObjectTag(response?.aceptada, "_aceptada")
      setAceptada(response?.aceptada)
      getValueByKeyInObjectTag(response?.observacion, "_observacion")
      setObservacion(response?.observacion)
      setAdecuacionInput(response.adecuacion_inputs_validation)

      handleSubmit(()=> {})();

      if (response?.cabecera && response?.cabecera[0]?.ESTADO) {
        if (response?.cabecera[0]?.ESTADO == 12) {
          console.log("entre aqui ", controlDisable)
          localStorage.setItem('estaDesabilitado_recepcion', JSON.stringify(false));
          return;
        }
        if (response?.cabecera[0]?.ESTADO == 13) {
          //hablitado o inabilitado
          localStorage.setItem('estaDesabilitado_recepcion', JSON.stringify(true));
        }
        if (response?.cabecera[0]?.ESTADO >= 14) {
          localStorage.setItem('estaDesabilitado_recepcion', JSON.stringify(true));
          return;
        }
      }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  const loadDataRecepcionParmaters = async (suc_fecha: any) => {

    //console.log("  .... ",  suc_fecha)
    if (!suc_fecha)

      return
    try {

      //parametro ncesarios
      console.log(idSucursal, suc_fecha)

      if (!idSucursal || !suc_fecha) {

        //  alert("hay un campo vacio")
        return;
      }
      setLoading(true)

      const response = await loadApiRecepcionTurnoSucursal(idSucursal, suc_fecha)
      setLoading(false)
      console.log("lista de recepcion turnos2 ", response)
      setLista(response)


    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }


  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  const valdateValuesCerosObj = (array: any) => {


    //ceros y ademoas la longitud sea igual a la iteracion
    const arrayAux = Object.keys(array)
    var res = false
    let i;
    for (i = 0; i < arrayAux.length; i++) {
      console.log("aaaa ", array[`${arrayAux[i]}`])

      if (array[`${arrayAux[i]}`] != '.00') {
        console.log("aaaa prioridad distion de cero ", array[`${arrayAux[i]}`])
        return false
      }
      if (array[`${arrayAux[i]}`] == '.00') {
        res = true
      } else {
        res = false
      }
    }
    if (i == arrayAux.length) {
      if (res) {
        console.log("aaaa res fin true")
        return true
      } else {
        console.log("aaaa res fin false")
        return false
      }

    }

    return res

  }
  //guardar los datos de solicitud
  //guardar los dataForm de solicitud
  const onSubmitRep = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm), fechaActual)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(registro) || !idSucursal
      || !fechaActual || isObjEmpty(observacion) || isObjEmpty(aceptada)
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    for (var key in registro) {

      //campos que pueden sufrir modifcaciones
      //stock tiene la contiene la informacion de solcitudes
      //if (dataForm[`${key}_aceptada`] != aceptada[key] ||
      //  dataForm[`${key}_observacion`] != observacion[key]
      //) {
        //console.log("el valor campo por orginal(izq) cambiado(der) ", key, aceptada[key], dataForm[`${key}_aceptada`])
        //anañdiendo valor solamente valor cambiando
        //dinamcamente
      if (Number(registro[`${key}`]) > 0  //dataForm[`${key}_stockEnviado`] > 0
      ) { 
        var resChild: any = {
          "cantidad": dataForm[`${key}_aceptada`],
          "observacion": dataForm[`${key}_observacion`]
        }
        resObj[key] = resChild;
      }
      //}

    }

    console.log("res send guardar ", resObj)

      if (isMultiploDeNumberCustom(resObj, dataForm, "_aceptada",adecuacionInput)) {
        try {
          setLoading(true)
          const response = await loadApiGuardarRecepcionSucursal(
            idSucursal,
            fechaActual,
            resObj
          )
          console.log("res guardar recepcion ", response)
          setLoading(false)
          if (response?.status) {
            await loadDataRecepcionSucursal()
            AlertSave({ title: "", message: response.message });

          }
          if (response?.status == false) {
            AlertQuestion({ title: '', message: 'No Se ha guardado ' })
    
    
          }
    
          if (response == undefined) {
            AlertError({ title: '', message: response.message })
          }

        } catch (error) {
          console.log("error api guardar:*", error)
          setLoading(false)
        }
      } else {
        AlertToastWarning({ message: "hay algunos datos incorrectos" })
      }

  }


  //enviar los datos del inventario
  const onSendRep = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm), fechaActual)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(registro) || !idSucursal
      || !fechaActual || isObjEmpty(observacion) || isObjEmpty(aceptada)
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    for (var key in registro) {

      //campos que pueden sufrir modifcaciones
      //stock tiene la contiene la informacion de solcitudes
      //if (dataForm[`${key}_aceptada`] != aceptada[key] ||
      //  dataForm[`${key}_observacion`] != observacion[key]
      //) {
        //console.log("el valor campo por orginal(izq) cambiado(der) ", key, aceptada[key], dataForm[`${key}_aceptada`])
        //anañdiendo valor solamente valor cambiando
        //dinamcamente
      if (Number(registro[`${key}`]) > 0  //dataForm[`${key}_stockEnviado`] > 0
      ) {  
        var resChild: any = {
          "cantidad": dataForm[`${key}_aceptada`],
          "observacion": dataForm[`${key}_observacion`]
        }
        resObj[key] = resChild;
      }
      //}

    }

    console.log("res send enviar ", resObj)

      if (isMultiploDeNumberCustom(resObj, dataForm, "_aceptada",adecuacionInput)) {
        try {
          setLoading(true)
          const response = await loadApiEnviarRecepcionSucursal(
            idSucursal,
            fechaActual,
            NombrePerfilTemp,
            resObj
          )
          console.log("res enviar recepcion ", response)
          setLoading(false)
          if (response?.status) {
            await loadDataRecepcionSucursal()
            AlertSave({ title: "", message: response.message });

          }
          if (response?.status == false) {
            AlertQuestion({ title: '', message: 'No Se ha guardado ' })
    
    
          }
    
          if (response == undefined) {
            AlertError({ title: '', message: response.message })
          }

        } catch (error) {
          console.log("error api guardar:*", error)
          setLoading(false)
        }
      } else {
        AlertToastWarning({ message: "hay algunos datos incorrectos" })
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

  const getValueByKeyInObjectTagReplaceCeros = (arrayObjIteracion: any,arrayObjectReplace ,tag: string) => {

    for (var key in arrayObjIteracion) {

      if (arrayObjIteracion[`${key}`] == '.00' ) {
        setValue(`${key}${tag}`, arrayObjectReplace[key])
      } else {
        setValue(`${key}${tag}`, arrayObjIteracion[key])
      }
    }

  }

  //habilitar/desabilitar candado
  const handlePadLock = () => {
    handleCloseModalAbrir()
    handleCloseModalCerrar()
    if (!checkInactivo) {
      //cerrado
      localStorage.setItem('estaDesabilitado_recepcion', JSON.stringify(true));
      //AlertSave({ title: "", message: "El formulario fue guardado y cerrado" });
      console.log("recuperando valores actuales ", getValues())

      handleSubmit(onSendRep)();

    } else {
      //abierto
      localStorage.setItem('estaDesabilitado_recepcion', JSON.stringify(false));
      AlertSave({ title: "", message: "Formulario fue abierto!" });
    }
    setCheckInactivo(!checkInactivo)
  }


  const AutoCompletableCustom = () => {

    const handleSeleccionePerfil = (value: any) => {
      console.log("Seleccione Pefil** ", value)
      const { ID, TURNO } = value
      setID_PERFILES(ID)
      setNombrePerfilTemp(TURNO)
    }

    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={lista}
        sx={{ width: '100%' }}
        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

        onChange={(event, value) =>
          handleSeleccionePerfil(value)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Seleccione Turno"

          />
        )}


        getOptionLabel={(option: any) => option.TURNO}


      />

    )
  }

const [expanded, setExpanded] = React.useState<string | false>('panel1');

const handleChange1 =
     (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
       setExpanded(newExpanded ? panel : false);
     };

  const formatDataforPdf = () => {
  console.log("existencias ", existencia)

  var arrayGetOnlyProduct: any = []
  for (let i = 0; i < existencia.length; i++) {
    if (existencia[i]?.SUBCATEGORIA) {
      var subcategoriaTemp = existencia[i]?.SUBCATEGORIA
      for (let x = 0; x < subcategoriaTemp.length; x++) {
        var productosTemp = subcategoriaTemp[x]?.PRODUCTOS
        for (let z = 0; z < productosTemp?.length; z++) {
          if (registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] != ".00" && registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] != undefined) {
            var objProd = {
              producto: productosTemp[z].SUB_CATEGORIA_2,
              cant_enviada: registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`],
              cant_aceptada: aceptada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] ,
              turno: turnos,
              observacion: observacion[`${productosTemp[z].ID_SUB_CATEGORIA_2}`]
            }
            arrayGetOnlyProduct.push(objProd)
          }
        }
      }
    }


  }

  console.log("get olny product ", arrayGetOnlyProduct)

  const columns = [
    { name: "Producto", nameRow: "producto" },
    { name: "Cantidad Solicidata", nameRow: "cant_enviada" },
    { name: "Cantidad Preparada", nameRow: "cant_aceptada" },
    { name: "Turno", nameRow: "turno" },
    { name: "Observacion", nameRow: "observacion" }
  ]


  const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${NombreSucursalShow}`).toUpperCase()
  printCustomPDF(arrayGetOnlyProduct, columns, titleHeader,"recepcion-ventas")
  
}


const generateExcel = () => {

  var arrayGetOnlyProduct: any = []
  for (let i = 0; i < existencia.length; i++) {
    if (existencia[i]?.SUBCATEGORIA) {
      var subcategoriaTemp = existencia[i]?.SUBCATEGORIA
      for (let x = 0; x < subcategoriaTemp.length; x++) {
        var productosTemp = subcategoriaTemp[x]?.PRODUCTOS
        for (let z = 0; z < productosTemp?.length; z++) {
          if (registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] != ".00" && registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] != undefined) {
            var objProd = {
              producto: productosTemp[z].SUB_CATEGORIA_2,
              cant_enviada: registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`],
              cant_aceptada: aceptada[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] ,
              turno: turnos,
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
    { name: "Cantidad Solicidata", nameRow: "cant_enviada" },
    { name: "Cantidad Preparada", nameRow: "cant_aceptada" },
    { name: "Turno", nameRow: "turno" },
    { name: "Observacion", nameRow: "observacion" }
  ]

  const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${NombreSucursalShow}`).toUpperCase()
  setLoading(true)
  exportToCustomCSV(arrayGetOnlyProduct, columns, titleHeader, "recepcion-ventas")
  setLoading(false)
}


  return (
    <>
      <div style={{
        backgroundColor: `#DC3545`, padding: '0%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center'

      }}
      // onClick={handleClick}
      >

        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
          Recepciones - {NombreSucursalShow}

          {/* <Button onClick={handleOpenModal2} sx={{ fontSize: '1.6em',color: 'white' }}><BiSearchAlt/></Button>
          <Button onClick={handleOpenModalDos} sx={{ fontSize: '1.6em',color: 'white' }}><AiOutlineClear/></Button> */}
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
              <Grid item xs={6} sm={6} md={4}>

                <h4 style={{ margin: "5px" }}>
                  Seleccione Fecha </h4>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DesktopDatePicker sx={{ width: '100%' }}
                    defaultValue={dayjs() as unknown as Date}

                    format='DD/MM/YYYY'
                    minDate={dayjs(getRestarDateCurrent(resFecha))}
                    maxDate={dayjs()}
                    onChange={(newValue: any) => { handleChangeDate(newValue) }}
                    slotProps={{ textField: { size: 'small' } }}

                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} sm={6} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                {/* <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  //onClick={() => handleBuscarSolicitudSucursal()}
                >Buscar</ColorButton> */}
              </Grid>

            </Grid >

            {(lista && lista.length > 0) ?
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
                <Grid item xs={6} sm={6} md={4}>

                  <h4 style={{ margin: "5px" }}>
                    Seleccione Turno</h4>
                  {AutoCompletableCustom()}
                </Grid>

                <Grid item xs={6} sm={6} md={2} container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center">

                  <ColorButton sx={{ backgroundColor: '#43A047', marginTop: '29px' }}
                    variant="contained"
                    onClick={loadDataRecepcionSucursal}
                  >
                    Buscar</ColorButton>
                </Grid>

              </Grid >
            :null}
          </AccordionDetails>

        </Accordion>
      </div>

      {cabecera[0]?.ESTADO >= 12 ?
        <>
        <div style={{
            position: 'sticky',
            top: '0', width: '100%', zIndex:50
            }}>
          <div style={{
            backgroundColor: `#343A40`, padding: '0.5%', display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', borderRadius: '0px', marginTop: '1%', marginLeft:'0.4%'
            , alignItems: 'center',marginRight:'0.4%'

          }}
          // onClick={handleClick}
          >

            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontSize: '15px', fontFamily: 'Times New Roman' }} >
              Recepcion
            </Typography>
            <Typography sx={{ marginLeft: '15px', color: 'Red', fontSize: '20px', fontFamily: 'Times New Roman' }}>
              {/* <Button variant="contained" sx={{ backgroundColor: 'red', fontSize: '15px', fontFamily: 'Times New Roman' }}>Bloqueado</Button> */}
            </Typography>

            <div>
              {cabecera?.map((row: any, index: any) => {
                
                if (row.ESTADO >= 13) {
                  return;
                }

                
                // if (row.ESTADO == 12) {
                //   return (
                //     <>
                //       <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSubmit)}><IoSaveOutline /></Button>
                //       <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSend)}><IoMdPaperPlane /></Button>
                //     </>
                //   )
                // }
                /* if(rowR.RECEPCION_NO_PERECEDERO == 0){
                    return (
                      <>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSubmit)}><IoSaveOutline /></Button>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSend)}><IoMdPaperPlane /></Button>
                      </>
                    )
                  }*/
                
              })}
              {turnos == "PERECEDERO"?
              <>
                {recepcion?.map((rowR:any ) =>{
                  console.log("valor de percedero al mapearlo:--",rowR.RECEPCION_PERECEDERO[0])
                  if(cabecera[0].BLOQUEADO_GENERAL == 1){
                    return ;
                  }else{
                  if(rowR.RECEPCION_PERECEDERO == 0){
                    return (
                      <>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSubmitRep)}><IoSaveOutline /></Button>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSendRep)}><IoMdPaperPlane /></Button>
                      </>
                    )
                  }else{
                    return;
                  }
                }
                })}
              </>
              :
              <>
              {recepcion?.map((rowR:any ) =>{
                  console.log("valor de no percedero al mapearlo:--",rowR.RECEPCION_NO_PERECEDERO)
                  if(cabecera[0].BLOQUEADO_GENERAL == 1){
                    return ;
                  }else{ 
                  if(rowR.RECEPCION_NO_PERECEDERO == 0){
                    return (
                      <>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSubmitRep)}><IoSaveOutline /></Button>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSendRep)}><IoMdPaperPlane /></Button>
                      </>
                    )
                  }else{
                    return;
                  }
                }
                })}
              </>
              }
                
              <Button onClick={generateExcel} sx={{ fontSize: '1.6em', color: 'white' }}><SiMicrosoftexcel /></Button>
              <Button onClick={formatDataforPdf} sx={{ fontSize: '1.6em', color: 'white' }}><ImFilePdf /></Button>
            </div>

          </div>
        </div>
        </>
        :null}
      {/* !row.PRODUCTOS || row.PRODUCTOS.length <= 0*/}
      {true ?
        <>
          {cabecera[0]?.ESTADO >= 12 && existencia?.map((row: any, index: any) => {

            return (

              <PaletaRep
                name={row.CATEGORIA}
                color={`rgb(${row.COLOR_R},${row.COLOR_G},${row.COLOR_B})`} COLOR_R={row.COLOR_R} COLOR_G={row.COLOR_G} COLOR_B={row.COLOR_B}
                SUBCATEGORIA={row.SUBCATEGORIA}
                control={control}
                registro={registro}
                getValues={getValues}
                setValue={setValue}
                adecuacionInput={adecuacionInput}
              />

            )
          })}
        </>
        : null}

      {loading ? <KDImage /> : null}

      {cabecera[0]?.ESTADO < 12 || cabecera?.length <= 0 ?
        <>
          {messageEmpty({ message: 'NO SE HA ENVIADO PEDIDO DEL DIA DE LA FECHA SELECCIONADA' })}
        </>
        : null}

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

export default Recepcion