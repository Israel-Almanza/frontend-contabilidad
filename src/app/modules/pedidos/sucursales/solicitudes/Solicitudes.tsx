import { Typography, Button, Collapse, TextField, Modal, Container, Card, CardContent, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Autocomplete } from '@mui/material';
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { IoMdPaperPlane } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { HiLockClosed } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2";
import { ModalPersonalized } from './components/ModalPersonalized';
import { ModalPersonalized2 } from './components/ModalPersonalized2';
import { useSolicitudes } from './services/useSolicitudes';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Controller, useForm } from "react-hook-form";
import PaletaSolicitudes from './components/PaletaSolicitudes';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { ModalAbrirInventario } from './components/ModalAbrirInventario';
import { ModalCerrarInventario } from './components/ModalCerrarInventario';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { AlertToastError, AlertToastWarning } from '../../../../common/alerts/alertsToast';
import { messageEmpty } from '../../../../common/messages/messagesCustom';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import { printCustomPDF } from '../../../../../core/utils/ManagerPdf';
import { isMultiploDe025Custom, isMultiploDeNumberCustom } from '../../../../../core/utils/Mathematical';
import { exportToCustomCSV } from '../../../../../core/utils/ManagerExcel';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
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

const getStringFecha = () => {
  const fechaInit = new Date()

  //2023-04-24"
  const auxFormatFechaInit = `${fechaInit.getFullYear()}-${getMonth(fechaInit.getMonth())}-${getDay(fechaInit.getDate())}`
  return auxFormatFechaInit
}


const Solicitudes = () => {

  const { idSucursal } = useParams()
  //console.log("id sucursal dinamico ", idSucursal)

  const { loadApiSolicitudesPerfil, loadApiSolicitudesSucursal, loadApiRestriccion, loadApiGuardarSolicitudSucursal, loadApiEnviarSolicitudSucursal } = useSolicitudes()
  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  //const { customModal, handleOpenModal } = useSolicitudes();
  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };

  const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
    setLista(event.target.value);
  };

  const [valueSelect, setValueSelct] = useState('Button Prueba');

  const handleChangeSelect = (event: any) => {
    //setAge(event.target.value);
    setValueSelct(event.target.value)
  };

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //loadDataSolicitud()
    loadObtenerRestriccion()

    // testAxios();
  }, [idSucursal]);

  //loading
  const [loading, setLoading] = useState(
    false
  );

  const [ID_PERFILES, setID_PERFILES] = useState<number>(0)
  const [NombrePerfilTemp, setNombrePerfilTemp] = useState('')
  const [NombrePerfilShow, setNombrePerfilShow] = useState('')

  const [originalRows, setoriginalRows] = useState<any>([])
  const [rows, setRows] = useState<any>(originalRows);
  const [fecha, setFecha] = useState(() => getStringFecha())
  const [existencia, setExistencia] = useState<any>([])
  const [cabecera, setCabecera] = useState<any>([])
  const [minimo, setMinimo] = useState<any>([])
  const [solicitud, setSolicitud] = useState<any>([])
  const [precargado, setPrecargado] = useState<any>([])
  const [productosPerfil, setProductosPerfil] = useState<any>([])
  const [registro, setRegistro] = useState<any>([])
  const [nombreS, setNombreS] = useState<any>([])
  const [adecuacionInput, setAdecuacionInput] = useState<any>([])
  const [resFecha, setResFecha] = useState<number>(0)
  //const [idSucursal, setIdSucursal] = useState('13')
  const [lista, setLista] = useState<any>([])
  const [nombrePerfil, setNombrePerfil] = useState('')
  const [checkInactivo, setCheckInactivo] = useState(true)
  const [controlDisable, setControlDisable] = useState<number>(0)


  const [openModal2, setOpenModal2] = useState(false);
  const handleOpenModal2 = () => setOpenModal2(true);
  const handleCloseModal2 = () => setOpenModal2(false);

  //two
  const [openModalDos, setOpenModalDos] = useState(false);


  const handleOpenModalDos = () => setOpenModalDos(true);
  const handleCloseModalDos = () => setOpenModalDos(false);
  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const handleOpenModalTres = () => setOpenModalTres(true);
  const handleCloseModalTres = () => setOpenModalTres(false);

  //modal abrir inventario
  const [openModalAbrir, setOpenModalAbrir] = useState(false);

  const handleOpenModalAbrir = () => setOpenModalAbrir(true);
  const handleCloseModalAbrir = () => setOpenModalAbrir(false);

  //modal cerrar inventario
  const [openModalCerrar, setOpenModalCerrar] = useState(false);

  const handleOpenModalCerrar = () => setOpenModalCerrar(true);
  const handleCloseModalCerrar = () => setOpenModalCerrar(false);

  const handleBuscarSolicitudSucursal = async () => {
    await loadDataSolicitud();
  
  }


  const handleBuscarPerfil = async () => {
    await loadPerfilSolicitud();
    setNombrePerfilShow(NombrePerfilTemp)

    resetValues()
    handleCloseModal2()
  }

  //api solicitudes lista segun fecha
  const loadDataSolicitud = async () => {
    try {

      //parametro ncesarios
      console.log(idSucursal, fecha)

      if (!idSucursal || !fecha) {

        //  alert("hay un campo vacio")
        return;
      }
      setLoading(true)
      //const response = await loadApiSolicitudesSucursal(Number(idSucursal), fecha)
      const response = await loadApiSolicitudesSucursal(idSucursal, fecha)

      console.log("response ",response)
      setLoading(false)
      console.log("lista de perfil ", response.lista)
      console.log("cabecera ", response.cabecera)
      console.log("precargado ", response.precargado)
      setControlDisable(response?.cabecera[0]?.ESTADO)
      setExistencia(response.existencia)
      setCabecera(response.cabecera)
      setMinimo(response.minimo)
      setSolicitud(response.solicitud)
      setRegistro(response.registro)
      setLista(response.lista)
      setAdecuacionInput(response.adecuacion_inputs_validation)
      //setNombreS(response.descripcion_sucursal)
      if (Array.isArray(response)) {
        setRows(response)
        setoriginalRows(response)

      }
      {/*if(response.solicitud){
        //console.log(" solicitud ",response.solicitud)
        getValueByKeyInObject(response.solicitud) 
      }
      if(response.minimo){
        //console.log(" minimo ",response.minimo)
        getValueByKeyInObjectStockMinimo(response.minimo) 
      }
      if(response.adecuacion){
        //console.log(" adecuacion ",response.adecuacion)
        getValueByKeyInObjectAdecuacion(response.adecuacion) 
      }*/}
      getValueByKeyInObjectTag(response?.solicitud, "_solicitud")
      //minimo
      getValueByKeyInObjectTag(response?.minimo, "_minimo")
      setMinimo(response?.minimo)
      //registro
      getValueByKeyInObjectTag(response?.registro, "_registro")
      setRegistro(response?.registro)
      //console.log("datos de registro ",registro)
      //adecuacion
      getValueByKeyInObjectTag(response?.adecuacion, "_adecuacion")
      //setAdecuacion(response?.adecuacion)
      //adecuacion
      getValueByKeyInObjectTag(response?.precargado, "_precargado")
      setPrecargado(response?.precargado)

      handleSubmit(() => { })();

      if (response?.cabecera && response?.cabecera[0]?.ESTADO) {
        if (response?.cabecera[0]?.ESTADO == 10) {
          console.log("entre aqui ", controlDisable)
          localStorage.setItem('estaDesabilitado', JSON.stringify(false));
          return;
        }
        if (response?.cabecera[0]?.ESTADO == 11) {
          //hablitado o inabilitado
          localStorage.setItem('estaDesabilitado', JSON.stringify(true));
        }
        if (response?.cabecera[0]?.ESTADO >= 12) {
          localStorage.setItem('estaDesabilitado', JSON.stringify(true));
          return;
        }
      }


    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  const loadObtenerRestriccion = async () => {
    if (!idSucursal) {
      return;
    }

    try {
      const response = await loadApiRestriccion(Number(idSucursal))
      //console.log("restriccion fecha ", response)
      // setResFecha(response.DIAS_MAX_PEDIDO)
      if (response && response?.DIAS_MAX_PEDIDO) {
        setResFecha(response?.DIAS_MAX_PEDIDO)
        setNombreS(response?.DESCRIPCION)

      }
    } catch (error) {

    }

  }

  const loadPerfilSolicitud = async () => {

    console.log("entre aqui ...............")
    //setExistencia([])

    if (ID_PERFILES == 0) {
      //alert("valor vacio de idperfil")
      return;
    }
    try {
      setLoading(true)
      const response = await loadApiSolicitudesPerfil(ID_PERFILES);
      setLoading(false)

      console.log(" respuesta de api segun pefil ", response)
      setProductosPerfil(response.productos)
      //setExistencia(response?.perfil)  //esto srive
      if (response.productos) {
        //console.log(" minimo ",response.minimo)
        getValueByKeyInArrayStock(response.productos)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }



  //fecha restriccion
  const getRestarDateCurrent = (restarDias: number) => {
    var fechaTemp: any = new Date()
    //const restarDias = 3
    fechaTemp.setDate(fechaTemp.getDate() - restarDias)
    return fechaTemp;
  }


  const handleChangeDate = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonth(fecha.getMonth())}-${getDay(fecha.getDate())}`
    console.log("format fecha select", auxFormatFecha)

    setFecha(auxFormatFecha)
    //loadDataVentaParmaters(ITEM, auxFormatFecha)
    //la a la api cada vez que cambiar al backend

  };

  const handleSeleccionePerfil = (value: any) => {
    console.log("value de succrusal ", value)
    const { ID_UBICACION, DESCRIPCION } = value
    setNombrePerfil(DESCRIPCION)

    //setIdSucursal(ID_UBICACION)
  }

  const getValueByKeyInObjectTag = (array: any, tag: string) => {
    for (var key in array) {
      setValue(`${key}${tag}`, array[key])
      //console.log("solicitud en el tag ",solicitud)
      {/*  if(getValues(`${key}_solicitud`) && `${key}_minimo` && `${key}_adecuacion`){  
     var solicitud = getValues(`${key}_solicitud`)
     var minimo = Number(getValues(`${key}_minimo`))
     var adecuacion  = Number(getValues(`${key}_adecuacion`))

     var totalSoli = solicitud/adecuacion
     var totalMin = minimo/adecuacion

     var reoSoli = Math.round(totalSoli)
     var reoMin = Math.round(totalMin)
      
      console.log("valor de minimo ",minimo)
      console.log("valor de solicitud ",solicitud)
      console.log("valor de adecuacion ",adecuacion)
      console.log("minimo  ",reoMin)
      console.log("y solicitud", reoSoli)
     //setValue(`${key}_solicitud`,reoSoli)
     //setValue(`${key}_minimo`,reoMin)

     if(solicitud == .00){
       setValue(`${key}_solicitud`,0)
     }else{
      setValue(`${key}${tag}`, array[key])
      //setValue(`${key}_minimo`,reoMin)
      //setValue(`${key}_solicitud`,reoSoli)
     }
    }*/}

      switch (`${key}${tag}`) {
        case `${key}_solicitud`:
          var solicitud = getValues(`${key}_solicitud`)
          var adecuacion = Number(getValues(`${key}_adecuacion`))
          if (solicitud == .00) {
            setValue(`${key}_solicitud`, 0)
          }
          // if(solicitud > 0){
          //   var totalSoli = solicitud/adecuacion
          //   var reoSoli = Math.round(totalSoli)
          //   setValue(`${key}_solicitud`,reoSoli)
          // }
          break;
          {/*  case `${key}_minimo`:
        var minimo = Number(getValues(`${key}_minimo`))
        var adecuacion  = Number(getValues(`${key}_adecuacion`))
        if(minimo > 0){
          var totalMin = minimo/adecuacion
          var reoMin = Math.round(totalMin)
          setValue(`${key}_minimo`,reoMin)
        }
      break;  */}
      }

    }
  }

  const getValueByKeyInObject = (array: any) => {
    for (var key in array) {
      //console.log(" key , valor",`${key}`, array[key] )

      setValue(key, array[key])


      //  setValue(key,'')
      //  if (key == val) {
      // return array[key]
      // }
    }
    //  return null;

  }

  const getValueByKeyInObjectStockMinimo = (array: any) => {
    for (var key in array) {
      // console.log(" key , valor",`${key}`, array[key] )

      setValue(`${key}A`, array[key])

      //  setValue(key,'')
      //  if (key == val) {
      // return array[key]
      // }
    }
    //  return null;
  }

  const getValueByKeyInArrayStock = (array: any) => {

    for (let i = 0; i < array.length; i++) {
      var stock1 = array[i].STOCK
      var adecuacion1 = getValues(`${array[i].ID_SUB_CATEGORIA_2}_adecuacion`)

      var enteros = stock1 / adecuacion1


      //setValue(`${array[i].ID_SUB_CATEGORIA_2}_minimo`,`${array[i].STOCK}`)
      setValue(`${array[i].ID_SUB_CATEGORIA_2}_minimo`, enteros)
      //setValue("1048",10)


      if (getValues(`${array[i].ID_SUB_CATEGORIA_2}_registro`) && array[i].STOCK) {
        var stock = Number(getValues(`${array[i].ID_SUB_CATEGORIA_2}_registro`))
        var stockMin = Number(array[i].STOCK)
        var adecuacion = Number(getValues(`${array[i].ID_SUB_CATEGORIA_2}_adecuacion`))
        //console.log("stock ",array[i].ID_SUB_CATEGORIA_2,stock)
        //console.log("stockminimo ",array[i].ID_SUB_CATEGORIA_2,stockMin)
        //console.log("adecuacion ",array[i].ID_SUB_CATEGORIA_2,adecuacion)
        var result = (stockMin - stock) / adecuacion
        //console.log("resultado operacion ",array[i].ID_SUB_CATEGORIA_2,result)
        var redondeo = Math.round(result)
        //console.log("resultado operacion redondeado ",array[i].ID_SUB_CATEGORIA_2,redondeo)
        // console.log("resultado operacion redondeado ",array[i].ID_SUB_CATEGORIA_2,redondeo)

        //setValue(`${array[i].ID_SUB_CATEGORIA_2}_solicitud`,result)
        if (stock > stockMin) {
          setValue(`${array[i].ID_SUB_CATEGORIA_2}_solicitud`, 0)

        } else {
          if (redondeo < 0) {
            setValue(`${array[i].ID_SUB_CATEGORIA_2}_solicitud`, 0)
          } else {
            setValue(`${array[i].ID_SUB_CATEGORIA_2}_solicitud`, redondeo)
          }

        }


      }
    }




    //  return null;
  }

  const getValueByKeyInObjectAdecuacion = (array: any) => {
    for (var key in array) {

      setValue(`${key}B`, array[key])

    }
    //  return null;
  }


  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  //guardar los datos de solicitud
  //guardar los dataForm de solicitud
  const onSubmit = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm), fecha)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(registro) || !idSucursal
      || !fecha || isObjEmpty(minimo) || isObjEmpty(solicitud)
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
      if (dataForm[`${key}_minimo`] != minimo[key] ||
        dataForm[`${key}_solicitud`] != solicitud[key]
      ) {
        console.log("el valor campo por orginal(izq) cambiado(der) ", key, registro[key], dataForm[`${key}_registro`])
        //anañdiendo valor solamente valor cambiando
        //dinamcamente
        var resChild: any = {
          "minimo": dataForm[`${key}_minimo`],
          "precargado": (dataForm[`${key}_solicitud`] == solicitud[key] ? "1" : "0"),
          "cantidad": dataForm[`${key}_solicitud`]
        }
        resObj[key] = resChild;

      }

    }

    console.log("res send ", resObj)
    console.log("perfil ", NombrePerfilTemp)
    console.log("fecha ", fecha)

    if (isObjEmpty(resObj)) {
      //alert("No modficaste datos")
      AlertToastWarning({ message: "No habia nada que actualizar" })
      return;
    } else {
      if (isMultiploDeNumberCustom (resObj, dataForm, "_solicitud",adecuacionInput)) {
        try {
          setLoading(true)
          const response = await loadApiGuardarSolicitudSucursal(
            idSucursal,
            fecha,
            ID_PERFILES,
            resObj
          )
          console.log("res guardar solicitud ", response)
          setLoading(false)
          if (response?.status) {
            await loadDataSolicitud()
            AlertSave({ title: "", message: response.message });


          }
        } catch (error) {
          console.log("error api guardar:*", error)
          setLoading(false)
        }
      } else {
        AlertToastWarning({ message: "hay algunos datos que no son múltiplos de 0.25" })
      }
    }
  }


  //enviar los datos del inventario
  const onSendSoli = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm), fecha)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(registro) || !idSucursal
      || !fecha || isObjEmpty(minimo) || isObjEmpty(solicitud)
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObjE: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    for (var key in registro) {
      //campos que pueden sufrir modifcaciones
      //stock tiene la contiene la informacion de solcitudes
      if (dataForm[`${key}_minimo`] != minimo[key] ||
        dataForm[`${key}_solicitud`] != solicitud[key]
      ) {

      }

      console.log("el valor campo por orginal(izq) cambiado(der) ", key, registro[key], dataForm[`${key}_registro`])
      //anañdiendo valor solamente valor cambiando
      //dinamcamente
      var resChildE: any = {
        "minimo": dataForm[`${key}_minimo`],
        "precargado": (dataForm[`${key}_solicitud`] == solicitud[key] ? "1" : "0"),
        "cantidad": dataForm[`${key}_solicitud`]
      }
      resObjE[key] = resChildE;
      //}


    }

    console.log("res send enviar ", resObjE)

    if (isMultiploDeNumberCustom(resObjE, dataForm, "_solicitud",adecuacionInput)) {
      try {
        setLoading(true)
        const response = await loadApiEnviarSolicitudSucursal(
          idSucursal,
          fecha,
          ID_PERFILES,
          resObjE
        )
        console.log("res enviar solicitud ", response)
        setLoading(false)
        if (response?.status) {
          await loadDataSolicitud()
          AlertSave({ title: "", message: response.message });

        }
        if (response?.status == false) {
          AlertQuestion({ title: '', message: response.message })


        }

        if (response == undefined) {
          AlertError({ title: '', message: response.message })
        }
      } catch (error) {
        console.log("error api enviar:*", error)
        setLoading(false)
      }
    } else {
      AlertToastWarning({ message: "hay algunos datos que no son múltiplos de 0.25" })
    }

  }

  //enviar los datos del inventario
  const onSend2 = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm), fecha)
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(registro) || !idSucursal
      || !fecha || isObjEmpty(minimo) || isObjEmpty(solicitud)
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj2: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    for (var key in registro) {
      //campos que pueden sufrir modifcaciones
      //stock tiene la contiene la informacion de solcitudes
      if (dataForm[`${key}_minimo`] != minimo[key] ||
        dataForm[`${key}_solicitud`] != solicitud[key]
      ) {

        console.log("el valor campo por orginal(izq) cambiado(der) ", key, registro[key], dataForm[`${key}_registro`])
        //anañdiendo valor solamente valor cambiando
        //dinamcamente
        var resChild2: any = {
          "minimo": dataForm[`${key}_minimo`],
          "precargado": (dataForm[`${key}_solicitud`] == solicitud[key] ? "1" : "0"),
          "cantidad": dataForm[`${key}_solicitud`]
        }
        resObj2[key] = resChild2;
      }


    }

    console.log("res send enviar ", resObj2)

    if (isMultiploDeNumberCustom(resObj2, dataForm, "_solicitud",adecuacionInput)) {
      try {
        setLoading(true)
        const response = await loadApiEnviarSolicitudSucursal(
          idSucursal,
          fecha,
          ID_PERFILES,
          resObj2
        )
        console.log("res enviar solicitud ", response)
        setLoading(false)
        if (response?.status) {
          await loadDataSolicitud()
          AlertSave({ title: "", message: response.message });

        }
        if (response?.status == false) {
          AlertQuestion({ title: '', message: response.message })

        }

        if (response == undefined) {
          AlertError({ title: '', message: response.message })
        }
      } catch (error) {
        console.log("error api enviar:*", error)
        setLoading(false)
      }
    } else {
      AlertToastWarning({ message: "hay algunos datos que no son múltiplos de 0.25" })
    }

  }

  //habilitar/desabilitar candado
  const handlePadLock = () => {
    handleCloseModalAbrir()
    handleCloseModalCerrar()
    if (!checkInactivo) {
      //cerrado
      localStorage.setItem('estaDesabilitado', JSON.stringify(true));
      //AlertSave({ title: "", message: "El formulario fue guardado y cerrado" });
      console.log("recuperando valores actuales ", getValues())

      handleSubmit(onSend2)();

    } else {
      //abierto
      localStorage.setItem('estaDesabilitado', JSON.stringify(false));
      AlertSave({ title: "", message: "Formulario fue abierto!" });
    }
    setCheckInactivo(!checkInactivo)
  }

  const resetValues = () => {
    // setID_PERFILES(0)
  }

  const AutoCompletableCustom = () => {

    const handleSeleccionePerfil = (value: any) => {
      console.log("Seleccione Pefil** ", value)
      const { ID, TEXT } = value
      setID_PERFILES(ID)
      setNombrePerfilTemp(TEXT)
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
            label="Seleccione Pefil"

          />
        )}


        getOptionLabel={(option: any) => option.TEXT}


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

            var objProd = {
              producto: productosTemp[z].SUB_CATEGORIA_2,
              cant_minimo: (minimo[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? "0" : minimo[`${productosTemp[z].ID_SUB_CATEGORIA_2}`]),
              cant_solicitud: (solicitud[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? "0" : solicitud[`${productosTemp[z].ID_SUB_CATEGORIA_2}`])
            }
            arrayGetOnlyProduct.push(objProd)

          }
        }
      }


    }

    console.log("get olny prodcut ", arrayGetOnlyProduct)

    const columns = [
      { name: "Producto", nameRow: "producto" },
      { name: "Cantidad Stock", nameRow: "cant_minimo" },
      { name: "Cantidad Solicitada", nameRow: "cant_solicitud" }

    ]


    const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${nombreS}`).toUpperCase()
    printCustomPDF(arrayGetOnlyProduct, columns, titleHeader, "solicitudes-ventas")

  }

  const generateExcel = () => {

    var arrayGetOnlyProduct: any = []
    for (let i = 0; i < existencia.length; i++) {
      if (existencia[i]?.SUBCATEGORIA) {
        var subcategoriaTemp = existencia[i]?.SUBCATEGORIA
        for (let x = 0; x < subcategoriaTemp.length; x++) {
          var productosTemp = subcategoriaTemp[x]?.PRODUCTOS
          for (let z = 0; z < productosTemp?.length; z++) {

            var objProd = {
              producto: productosTemp[z].SUB_CATEGORIA_2,
              cant_minimo: (minimo[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? "0" : minimo[`${productosTemp[z].ID_SUB_CATEGORIA_2}`]),
              cant_solicitud: (solicitud[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? "0" : solicitud[`${productosTemp[z].ID_SUB_CATEGORIA_2}`])
            }
            arrayGetOnlyProduct.push(objProd)

          }
        }
      }

    }

    const columns = [
      { name: "Producto", nameRow: "producto" },
      { name: "Cantidad Stock", nameRow: "cant_minimo" },
      { name: "Cantidad Solicitada", nameRow: "cant_solicitud" }

    ]

    const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${nombreS}`).toUpperCase()
    setLoading(true)
    exportToCustomCSV(arrayGetOnlyProduct, columns, titleHeader, "solicitudes-ventas")
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
          Solicitudes - {nombreS}

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
                    minDate={dayjs(getRestarDateCurrent(resFecha)) as unknown as Date}
                    maxDate={dayjs() as unknown as Date}
                    onChange={(newValue: any) => { handleChangeDate(newValue) }}
                    slotProps={{ textField: { size: 'small' } }}

                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} sm={6} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => handleBuscarSolicitudSucursal()}
                >Buscar</ColorButton>
              </Grid>

            </Grid >

            {(existencia && existencia.length > 0) ?
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
                <Grid item xs={6} sm={6} md={4}>

                  <h4 style={{ margin: "5px" }}>
                    Seleccione Perfil</h4>
                  {AutoCompletableCustom()}
                </Grid>

                <Grid item xs={6} sm={6} md={2} container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center">

                  <ColorButton2 sx={{ backgroundColor: '#43A047', marginTop: '29px' }}
                    variant="contained"
                    onClick={handleOpenModal2} >
                    Cargar Perfil</ColorButton2>
                </Grid>

              </Grid >
              : null}
          </AccordionDetails>

        </Accordion>
      </div>

      {cabecera[0]?.ESTADO >= 10 ?
        <>
          <div style={{
            position: 'sticky',
            top: '0', width: '100%', zIndex: 50
          }}>
            <div style={{
              backgroundColor: `#343A40`, padding: '0.3%', display: 'flex', flexDirection: 'row',
              justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%', marginLeft: '0.3%'
              , alignItems: 'center'

            }}
            // onClick={handleClick}
            >

              <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
                Solicitudes
              </Typography>
              <div>
                {cabecera?.map((row: any, index: any) => {
                  if(row.BLOQUEADO_GENERAL == 1){
                    return ;
                  }else{
                  if (row.ESTADO >= 12) {
                    return;
                  }
                  if (row.ESTADO == 10) {
                    return (
                      <>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSubmit)}><IoSaveOutline /></Button>
                        <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSendSoli)}><IoMdPaperPlane /></Button>
                      </>
                    )
                  }
                  if (row.ESTADO == 11) {
                    return (
                      <>
                        {checkInactivo ? <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleOpenModalAbrir}><HiLockClosed /></Button> :
                          <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleOpenModalCerrar}><HiLockOpen /></Button>}

                      </>
                    )
                  }
                }
                })}
                <Button onClick={generateExcel} sx={{ fontSize: '1.6em', color: 'white' }}><SiMicrosoftexcel /></Button>
                <Button onClick={formatDataforPdf} sx={{ fontSize: '1.6em', color: 'white' }}><ImFilePdf /></Button>
              </div>
            </div>
          </div>
        </>
        :
        null
      }






      {cabecera[0]?.ESTADO >= 10 && existencia?.map((row: any, index: number) => {
         if (!row.SUBCATEGORIA || row.SUBCATEGORIA.length <= 0) {
          return;
        }
        return (

          <PaletaSolicitudes key={index}
            name={row.CATEGORIA}
            color={`rgb(${row.COLOR_R},${row.COLOR_G},${row.COLOR_B})`} COLOR_R={row.COLOR_R} COLOR_G={row.COLOR_G} COLOR_B={row.COLOR_B}
            SUBCATEGORIA={row.SUBCATEGORIA}
            control={control}
            solicitud={solicitud}
            registro={registro}
            precargado={precargado}
            getValues={getValues}
            adecuacionInput={adecuacionInput}
          />

        )
      })}

      {cabecera[0]?.ESTADO < 10 || cabecera?.length <= 0 ?
        <>
          {messageEmpty({ message: 'NO SE HA ENVIADO INVENTARIO DEL DIA DE LA FECHA SELECCIONADA' })}
        </>
        : null}

      <ModalPersonalized2
        handleBuscarPerfil={handleBuscarPerfil}
        openModalPersonalized={openModal2}
        handleOpenModalPersonalized={handleOpenModal2}
        handleCloseModalPersonalized={handleCloseModal2}
      />

      <ModalPersonalized
        openModalPersonalized={openModalDos}
        handleOpenModalPersonalized={handleOpenModalDos}
        handleCloseModalPersonalized={handleCloseModalDos}
        description="Deseas limpiar todas la modificaciones manuales?"
      />

      <ModalPersonalized
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        description="Deseas cerrar y guardar el formulario?"
      />

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

      {loading ? <KDImage
      /> : null}

      <ToastContainer />
    </>
  )
}

export default Solicitudes