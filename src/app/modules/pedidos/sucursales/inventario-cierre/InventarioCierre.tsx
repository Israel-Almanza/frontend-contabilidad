import { CardActionArea,FormGroup,Typography, Button, Collapse, TextField,Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { IoMdPaperPlane } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import PaletaInventarioCierre from './components/PaletaInventarioCierre';
import { useInventarioCierre } from './services/useInventarioCierre';
import dataInventarioCierreJson from '../../../../../data/dataInventarioCierreJson.json'
import { AlertToastError, AlertToastWarning } from '../../../../common/alerts/alertsToast';
//HiLockClosed 
import {HiLockClosed} from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2"; 
import { Controller, useForm } from "react-hook-form";
import { messageEmpty } from '../../../../common/messages/messagesCustom';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { ModalAbrirInventario } from './components/ModalAbrirInventario';
import { ModalCerrarInventario } from './components/ModalCerrarInventario';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import { isMultiploDe025Custom, isMultiploDeNumberCustom } from '../../../../../core/utils/Mathematical';
import XLSX from "xlsx";
import FileSaver from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { printCustomPDF } from '../../../../../core/utils/ManagerPdf';
import { exportToCustomCSV } from '../../../../../core/utils/ManagerExcel';

const InventarioCierre = () => {
  const { idSucursal } = useParams()
  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();

  const [originalRows, setoriginalRows] = useState<any>([])
  const [rows, setRows] = useState<any>(originalRows);
  const { loadApiInventarioCierre, loadApiGuardarInventario, loadApiEnviarInventario } = useInventarioCierre()
  const[controlDisable,setControlDisable]=useState<number>(0)


  
 
  const [existencia, setExistencia] = useState<any>([])
  const [cabecera, setCabecera] = useState<any>([])
  const [sucursal, setSucursal] = useState<any>([])
  const [nomSucursal, setNomSucursal] = useState<any>([])
  const [stock, setStock] = useState<any>([])
  const [registro, setRegistro] = useState<any>([])
  const [adecuacionInput, setAdecuacionInput] = useState<any>([])
  const [checkInactivo, setCheckInactivo] = useState(true)
  

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadInventarioCierre()
    
  }, [idSucursal]);

  //loading
const [loading, setLoading] = useState(
  false
);

//modal abrir inventario
const [openModalAbrir, setOpenModalAbrir] = useState(false);

const handleOpenModalAbrir = () => setOpenModalAbrir(true);
const handleCloseModalAbrir = () => setOpenModalAbrir(false);

//modal abrir inventario
const [openModalCerrar, setOpenModalCerrar] = useState(false);

const handleOpenModalCerrar = () => setOpenModalCerrar(true);
const handleCloseModalCerrar = () => setOpenModalCerrar(false);

  //botones candado
  const [items, setItems] = useState([]);


  const loadInventarioCierre = async () => {
    try {
      setLoading(true)
      const response = await loadApiInventarioCierre(Number(idSucursal));
      //console.log("response inventario cabecera:** ", response.existencia)
      console.log("datos inventario ",response)
      setLoading(false)
      setControlDisable(response?.cabecera[0]?.ESTADO)
      setExistencia(response.existencia)
      setCabecera(response.cabecera)
      setStock(response.stock)
      //setRegistro(response.registro)
      setSucursal(response.sucursal)
      setNomSucursal(response.descripcion_sucursal)
      getValueByKeyInObjectTag(response?.registro, "_registro")
      setRegistro(response?.registro)
      setAdecuacionInput(response.adecuacion_inputs_validation)
      
      handleSubmit(()=> {})();

     if(response?.cabecera && response?.cabecera[0]?.ESTADO){
      if(response?.cabecera[0]?.ESTADO == 9){
        console.log("entre aqui ",controlDisable)
        localStorage.setItem('estaDesabilitado', JSON.stringify(false));
        return;
      }
      if(response?.cabecera[0]?.ESTADO == 10){
        //hablitado o inabilitado
        localStorage.setItem('estaDesabilitado', JSON.stringify(true));
      }
      if(response?.cabecera[0]?.ESTADO >= 11 ){
        localStorage.setItem('estaDesabilitado', JSON.stringify(true));
        return ;
      }
     } 


    } catch (error) {

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

  const getValueByKeyInObject = (array: any) => {
    for (var key in array) {
     // console.log(" key , valor",`${key}`, array[key] )
    
      setValue(key,array[key])
    
    //  setValue(key,'')
      //  if (key == val) {
       // return array[key]
     // }
    }
  //  return null;
  }


//datos de Json
  const loadData = async () => {
    console.log("datos de Json Inventario ", dataInventarioCierreJson)
    setRows(dataInventarioCierreJson)
    setoriginalRows(dataInventarioCierreJson)
  }

  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }

  //guardar los datos de inventario
  const onSubmit = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm))
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(stock) || !idSucursal
      || isObjEmpty(registro) 
    ) {
      //alert("el objecto esta vacio")
      return;
    }

    
    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    for (var key in stock) {

      //campos que pueden sufrir modifcaciones
      //stock tiene la contiene la informacion de solcitudes
      if (dataForm[`${key}_registro`] != registro[key] 
      ) {
        console.log("el valor campo por orginal(izq) cambiado(der) ", key, registro[key], dataForm[`${key}_registro`])
        //anañdiendo valor solamente valor cambiando
        //dinamcamente
        var resChild: any = {
          "cantidad declarada": dataForm[`${key}_registro`]
        }
        resObj[key] = dataForm[`${key}_registro`];

      }

    }

    console.log("res send guardar ", resObj)

    if (isObjEmpty(resObj)) {
      //alert("No modficaste datos")
      AlertToastWarning({ message: "No habia nada que actualizar" })
      return;
    }else {
      if (isMultiploDeNumberCustom(resObj, dataForm, "_registro",adecuacionInput)) {
        console.log("son multiplos de 0.25")
        try {
          setLoading(true)
          const response = await loadApiGuardarInventario(
            idSucursal,
            resObj
          )
          console.log("res guardar inventario ", response)
          setLoading(false)
          if (response?.status) {
            await loadInventarioCierre()
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
          AlertError({ title: '', message: 'Algo salió mal' })
        }
      } else {
        AlertToastWarning({ message: "hay algunos datos incorrectos" })
      }  
  }
  
}


//enviar los datos del inventario
  const onSend = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    console.log("respues ", isObjEmpty(dataForm))
    //paso 1 verificar si el objecto es mayor a cero
    if (isObjEmpty(dataForm) || isObjEmpty(stock) || !idSucursal
      || isObjEmpty(registro) 
    ) {
      //alert("el objecto esta vacio")
      return;
    }



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    for (var key in stock) {

      //campos que pueden sufrir modifcaciones
      //stock tiene la contiene la informacion de solcitudes
      //if (dataForm[`${key}_registro`] != registro[key] 
      //) {
        console.log("el valor campo por orginal(izq) cambiado(der) ", key, registro[key], dataForm[`${key}_registro`])
        //anañdiendo valor solamente valor cambiando
        //dinamcamente
        var resChild: any = {
          "cantidad declarada": dataForm[`${key}_registro`]
        }
        //resObj[key] = resChild;
        resObj[key] = dataForm[`${key}_registro`];

      //}

    }

    console.log("res send enviar ", resObj)

      if (isMultiploDeNumberCustom(resObj, dataForm, "_registro", adecuacionInput)) {
        console.log("son multiplos de 0.25")
        try {
          setLoading(true)
          const response = await loadApiEnviarInventario(
            idSucursal,
            resObj
          )
          console.log("res enviar inventario ", response)
          setLoading(false)
          if (response?.status) {
            await loadInventarioCierre()
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
          AlertError({ title: '', message: 'Algo salió mal' })
        }
      } else {
        AlertToastWarning({ message: "hay algunos datos incorrectos" })
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
      console.log("recuperando valores actuales ",getValues())
      
      handleSubmit(onSend)();
      
    } else {
      //abierto
      localStorage.setItem('estaDesabilitado', JSON.stringify(false));
      AlertSave({ title: "", message: "Formulario fue abierto!" });
    }
     setCheckInactivo(!checkInactivo)
}


const formatDateString = (FECHA_ENTREGA_PEDIDO: string) => {
  var year = FECHA_ENTREGA_PEDIDO.substring(0, 4);
  var day = FECHA_ENTREGA_PEDIDO.substring(5, 7);
  var month = FECHA_ENTREGA_PEDIDO.substring(8, 10)

  var res = month + '/' + day + '/' + year
  //26/04/2023
  //const str = 'Mozilla';


  return res
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
            cant_registro: (registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? "0" : registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`])              
          }
            arrayGetOnlyProduct.push(objProd)
          
        }
      }
    }

  }

  const columns = [
    { name: "Producto", nameRow: "producto" },
    { name: "Cantidad Inventario", nameRow: "cant_registro" }
   
  ]

  const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${nomSucursal}`).toUpperCase()
  setLoading(true)
  exportToCustomCSV(arrayGetOnlyProduct, columns, titleHeader, "inventario-ventas")
  setLoading(false)
}

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
              cant_registro: (registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`] == '.00' ? "0" : registro[`${productosTemp[z].ID_SUB_CATEGORIA_2}`])              
            }
            arrayGetOnlyProduct.push(objProd)
          
        }
      }
    }


  }

  console.log("get olny prodcut ", arrayGetOnlyProduct)

  const columns = [
    { name: "Producto", nameRow: "producto" },
    { name: "Cantidad Inventario", nameRow: "cant_registro" }
   
  ]


  const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS - ${nomSucursal}`).toUpperCase()
  printCustomPDF(arrayGetOnlyProduct, columns, titleHeader,"inventario-ventas")

}


  return (
    <>
      <div style={{
        backgroundColor: `#DC3547`, padding: '0%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '8px', marginTop: '0%'
        , alignItems: 'center'

      }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontSize:'18px', fontFamily:'Times New Roman' }} >
          Inventario {nomSucursal}
          &nbsp; &nbsp;
        
        </Typography>
        
      </div>
      <div style={{
        position: 'sticky',
        top: '0', width: '100%', zIndex:50
      }}>
        <div style={{
          backgroundColor: `#343A40`, padding: '0.3%', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', borderRadius: '0px', marginTop: '1%'
          , alignItems: 'center'

        }}
        // onClick={handleClick}
        >

          <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontSize:'16px', fontFamily:'Times New Roman' }} >
            Inventario
          </Typography>
          <div>
            {cabecera ? cabecera?.map((row: any) => {
              if(row.BLOQUEADO_GENERAL == 1){
                return ;
              }else{
              if(row.ESTADO >= 11){
                return ;
              }
              if(row.ESTADO == 9){
                return(
                  <>
                  <Button  sx={{ fontSize: '1.6em', color: 'white'}} onClick={handleSubmit(onSubmit)}><IoSaveOutline/></Button>
                  <Button  sx={{ fontSize: '1.6em', color: 'white'}} onClick={handleSubmit(onSend)}><IoMdPaperPlane /></Button>
                  </>
                )
              }
              if(row.ESTADO == 10){
                return(
                  <>
                    {checkInactivo ?<Button  sx={{ fontSize: '1.6em', color: 'white'}} onClick={handleOpenModalAbrir}><HiLockClosed /></Button>:
                    <Button  sx={{ fontSize: '1.6em', color: 'white'}} onClick={handleOpenModalCerrar}><HiLockOpen /></Button>}   
                    {/* <Button  sx={{ fontSize: '1.6em', color: 'red'}}><HiLockClosed /></Button>
                    <Button  sx={{ fontSize: '1.6em', color: 'green'}} onClick={() => handlePadLock()}><HiLockOpen /></Button>  */}
            
                  </>
                )
              }
            }              
            }) : null}  
            <Button onClick={generateExcel} sx={{ fontSize: '1.6em',color: 'white' }}><SiMicrosoftexcel/></Button>
            <Button onClick={formatDataforPdf} sx={{ fontSize: '1.6em',color: 'white' }}><ImFilePdf/></Button>
          </div>
        </div>
      </div>  
      <br/>

                      {cabecera[0]?.ESTADO >= 9 && existencia?.map((row: any, index: any) => {
                            //const isItemSelected = isSelected(row.nombre);
                            const labelId = `enhanced-table-checkbox-${index}`;
                          /*  if (!row.SUBCATEGORIA || row.SUBCATEGORIA.length <= 0) {
                              return;
                            }*/
                            return (
                                
                              <PaletaInventarioCierre 
                              name={row.CATEGORIA} 
                              color={`rgb(${row.COLOR_R},${row.COLOR_G},${row.COLOR_B})`} COLOR_R={row.COLOR_R} COLOR_G={row.COLOR_G} COLOR_B={row.COLOR_B}
                              SUBCATEGORIA={row.SUBCATEGORIA }
                              STOCK={stock}
                              control={control}
                              cabecera={cabecera}
                              controlDisable={controlDisable}
                              getValues={getValues}
                              adecuacionInput={adecuacionInput}
                              />
                                
                            )
                            })} 
        {cabecera[0] == null || stock == undefined || stock < 0 ?
        <>
          {messageEmpty({ message: 'NO SE HIZO LA PRIMERA DECLARACION DE INVENTARIO DEL DIA' })}
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

          {loading ? <KDImage
            
          /> : null}

      <ToastContainer />

    </>
  )
}

export default InventarioCierre