import { CardActionArea, FormGroup, Typography, Button, Collapse, TextField, Checkbox, Autocomplete, InputAdornment } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { IoMdPaperPlane } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import PaletaPerfilPedido from './components/PaletaPerfilPedido';
import { usePerfilPedido } from './services/usePerfilPedido';

//HiLockClosed 
import { HiLockClosed } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2";
import { AlertSave } from '../../../../common/alerts/alerts';
//import { AlertSave } from '../../../common/alerts/alerts';
import { Controller, useForm } from "react-hook-form";
import LockSharpIcon from '@mui/icons-material/LockSharp';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import Switch from "@mui/material/Switch";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegClone } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import SearchIcon from '@mui/icons-material/Search';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ModalSave } from './components/ModalSave';
import { ModalClone } from './components/ModalClone';
import { ModalBuscar } from './components/ModalBuscar';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { AlertToastError, AlertToastWarning } from '../../../../common/alerts/alertsToast';


const PerfilPedido = () => {

  const { idSucursal } = useParams()
  console.log("id sucursal dinamico ", idSucursal)
  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();


  const { loadApiObtenerPerfil,
    loadApiObtenerPerfilesSucursal,
    loadApiGuardarPerfilSucursal } = usePerfilPedido()


  const [existencia, setExistencia] = useState<any>([])



  const [NombrePerfilTemp, setNombrePerfilTemp] = useState('')
  const [NombrePerfilShow, setNombrePerfilShow] = useState('')
  const [registro, setRegistro] = useState<any>([])
  const [adecuacionInput, setAdecuacionInput] = useState<any>([])
  

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //reset value
    setExistencia([])
    setNombrePerfilTemp('')
    setNombrePerfilShow('')
    reset({})
    //end reset values
    //loadPerfilPedido()
    loadObtenerPerfilesSucursal()


    //obteniendo multiplos




  }, [idSucursal]);

  //loading
  const [loading, setLoading] = useState(false);

  //botones candado


  const [ListObtenerPerfilesUsaurio, setListObtenerPerfilesUsaurio] = useState<any>([]);

  const [ID_PERFILES, setID_PERFILES] = useState<number>(0)

  //<---MODAL
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [openModal2, setOpenModal2] = useState(false);

  const handleOpenModal2 = () => setOpenModal2(true);
  const handleCloseModal2 = () => setOpenModal2(false);

  const [openModalBuscar, setOpenModalBuscar] = useState(false);

  const handleOpenModalBuscar = () => setOpenModalBuscar(true);
  const handleCloseModalBuscar = () => setOpenModalBuscar(false);
  //MODAL-->

  const handleBuscarPerfil = async () => {
    await loadPerfilPedido();
    setNombrePerfilShow(NombrePerfilTemp)
    handleSubmit(activeValidationData)();
    resetValues()
    handleCloseModalBuscar()

  }
  const activeValidationData = (dataForm: any) => {

  }

  const loadObtenerPerfilesSucursal = async () => {
    if (!idSucursal) {
      return;
    }

    try {
      const response = await loadApiObtenerPerfilesSucursal(Number(idSucursal))
      console.log("list perfiles ", response)
      if (Array.isArray(response?.perfiles)) {
        setListObtenerPerfilesUsaurio(response?.perfiles)
      }
    } catch (error) {

    }

  }
  const loadPerfilPedido = async () => {

    console.log("entre aqui ...............")
    //setExistencia([])

    if (ID_PERFILES == 0) {
      //alert("valor vacio de idperfil")
      return;
    }
    try {
      setLoading(true)
      const response = await loadApiObtenerPerfil(ID_PERFILES);
      setLoading(false)

      console.log(" response pefil ", response)
      setExistencia(response?.perfil)  //esto srive
      setAdecuacionInput(response.adecuacion_inputs_validation)
      if (response?.registro) {
        console.log(" registro ", response.registro)
        setRegistro(response.registro)
        getValueByKeyInObject(response.registro)
      }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const loadPerfilPedidoTempCloneSave = async (idPerfil: number) => {

    console.log("entre aqui ...............")
    //setExistencia([])

    if (idPerfil == 0) {
      //alert("valor vacio de idperfil")
      return;
    }
    try {

      var nombre_perfil_local = localStorage.getItem('nombre_perfil_local');
      if (nombre_perfil_local && nombre_perfil_local != undefined) {
        setNombrePerfilShow(nombre_perfil_local)
      }
      setLoading(true)
      const response = await loadApiObtenerPerfil(idPerfil);
      setLoading(false)

      console.log(" response pefil ", response)
      setExistencia(response?.perfil)  //esto srive
      if (response?.registro) {
        console.log(" registro ", response.registro)
        setRegistro(response.registro)
        getValueByKeyInObject(response.registro)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getValueByKeyInObject = (array: any) => {
    for (var key in array) {
      //console.log("get values ",getValues(`${key}`))
      if (array[key] == '.00') {
        setValue(key, 0)
      } else {
        setValue(key, array[key])
      }
    }
    //  return null;
  }
  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  //guardar los dataForm de inventario
  const onSubmit = async (dataForm: any) => {
    console.log("dataForm inven ", dataForm)

    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm))
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(registro) || ID_PERFILES <= 0 || isObjEmpty(existencia)) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    console.log("registro objec ", registro)

    for (var key in dataForm) {


      if (dataForm[key] != registro[key]) {
        console.log("el valor campo por left rigth ", key, registro[key], dataForm[key])
        //anañdiendo valor solamente valor cambiando
        //dinamcamente
        resObj[key] = dataForm[key];

      }
      //setValue(key, array[key])

      //  setValue(key,'')
      //  if (key == val) {
      // return array[key]
      // }
    }

    console.log("res send ", resObj)

    //todos son multiplos de 0.25


    if (isObjEmpty(resObj)) {
      //alert("No modficaste datos")
      //  toast("No modficaste datos");
      AlertToastWarning({ message: "No habia nada que actualizar" })
      return;
    } else {
      if (isMultiploDe025(resObj)) {
        try {
          setLoading(true)
          const response = await loadApiGuardarPerfilSucursal(//idSucursal,//"13",
            Number(ID_PERFILES),
            resObj

          )
          console.log("res guardar perfil pedidos ", response)
          setLoading(false)
          if (response?.status) {
            //volver a  renderizar la api

            await loadPerfilPedido()
            AlertSave({ title: '', message: 'Se ha guardado las cantidades inventariadas' })
          }
        } catch (error) {
          console.log("error api guardar:*", error)
        }
      } else {
        AlertToastWarning({ message: "hay algunos datos que no son múltiplos de 0.25" })
      }
    }

    //verficar si el usuario 

  }

  //enviar los datos del inventario

  const isMultiploDe025 = (arrayObj: any) => {
    for (var key in arrayObj) {
      //no eso multiplo 
      if (arrayObj[key] % 0.25 != 0) {
        return false
      }
    }
    return true

  }


  const resetValues = () => {
    // setID_PERFILES(0)
  }

  const AutoCompletableCustom = () => {

    const handleSeleccionePerfil = (value: any) => {
      console.log("Seleccione Pefil ", value)
      const { ID, TEXT } = value
      setID_PERFILES(ID)
      setNombrePerfilTemp(TEXT)
    }

    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={ListObtenerPerfilesUsaurio}
        sx={{ width: '100%' }}
        noOptionsText={"Sin opciones"}
        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

        onChange={(event, value) =>
          handleSeleccionePerfil(value)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Seleccione Pefil"
            InputProps={{
              ...params.InputProps,
              startAdornment: (<InputAdornment position="start"> <SearchIcon />
              </InputAdornment>),
              //disableUnderline: true
            }}
          />
        )}


        getOptionLabel={(option: any) => option.TEXT}


      />
    )
  }




  return (
    <>



      <div style={{width:'100%'}}>
        <div style={{
          backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
          , alignItems: 'center',


        }}
        >

          <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
            <PersonAddIcon />
            Configuracion de Perfil de Pedidos
          </Typography>
          <div>
            <Button onClick={handleOpenModalBuscar} sx={{ fontSize: '1.6em', color: 'white' }}><BiSearchAlt /></Button>
            <Button onClick={handleOpenModal} sx={{ fontSize: '1.6em', color: 'white' }}><AiOutlinePlusCircle /></Button>
            <Button onClick={handleOpenModal2} sx={{ fontSize: '1.6em', color: 'white' }}><FaRegClone /></Button>
          </div>
        </div>
      </div>

      {existencia.length > 0 ? <>
        <div style={{
          backgroundColor: `#343A40`, padding: '0.5%', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', borderRadius: '0px', marginTop: '1%'
          , alignItems: 'center', //width: '400px',
          position: 'sticky', top: '0px',zIndex:50



          // position: 'sticky',top: '20px'
          // position:'absolute',
          //bottom:'200px',

        }}
        >

          <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontSize: '18px', fontFamily: 'Times New Roman' }} >
            {NombrePerfilShow}
          </Typography>
          <div>
            <Button sx={{ fontSize: '1.6em', color: 'white' }} onClick={handleSubmit(onSubmit)}><IoSaveOutline /></Button>
            {/*  <Button sx={{ fontSize: '2em', color: 'white' }}  ><IoSaveOutline /></sButton>*/}
          </div>
        </div>
      </> : null}


   

      {/* <button onClick={() => console.log("res ", existencia)}> Botton Guardar </button>*/}

      {existencia?.map((row: any, index: any) => {
         if (!row.SUBCATEGORIA || row.SUBCATEGORIA.length <= 0) {
          return;
        }
      
        return (

          <PaletaPerfilPedido
            key={index}
            name={row.CATEGORIA}
            color={`rgb(${row.COLOR_R},${row.COLOR_G},${row.COLOR_B})`} COLOR_R={row.COLOR_R} COLOR_G={row.COLOR_G} COLOR_B={row.COLOR_B}
            SUBCATEGORIA={row.SUBCATEGORIA}

            control={control}
            getValues={getValues}
            adecuacionInput={adecuacionInput}

          />

        )
      })}

      {loading ? <KDImage /> : null}

      <ToastContainer />

      <ModalSave
        openModalPersonalized={openModal}
        handleOpenModalPersonalized={handleOpenModal}
        handleCloseModalPersonalized={handleCloseModal}
        loadObtenerPerfilesSucursal={loadObtenerPerfilesSucursal}
        loadPerfilPedidoTempCloneSave={(idPerfilX: number) => loadPerfilPedidoTempCloneSave(idPerfilX)}
        description="Nuevo Perfil de Pedido"
      />

      <ModalClone
        openModalPersonalized={openModal2}
        handleOpenModalPersonalized={handleOpenModal2}
        handleCloseModalPersonalized={handleCloseModal2}
        loadObtenerPerfilesSucursal={loadObtenerPerfilesSucursal}
        loadPerfilPedidoTempCloneSave={(idPerfilX: number) => loadPerfilPedidoTempCloneSave(idPerfilX)}
        description="Clonar Perfil de Pedido"
      />

      <ModalBuscar
        openModalPersonalized={openModalBuscar}
        handleOpenModalPersonalized={handleOpenModalBuscar}
        handleCloseModalPersonalized={handleCloseModalBuscar}

        handleBuscarPerfil={handleBuscarPerfil}
        componentRender={AutoCompletableCustom()}
        resetValues={resetValues}

        description="Perfil que desea buscar"
      />

    </>
  )
}

export default PerfilPedido