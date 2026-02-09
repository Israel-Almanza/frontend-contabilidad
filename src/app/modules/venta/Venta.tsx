import { Typography, Button, Collapse, TextField, Modal, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AlertError, AlertQuestion, AlertSave } from '../../common/alerts/alerts';
import { ModalPersonalized } from './components/ModalPersonalized';
import TablaVenta from './TablaVenta';
import { ModalForm } from './components/ModalForm';
import SearchBar from '@mkyy/mui-search-bar';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AplicationConnect from '../../../core/api/AplicationConnect';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { useParams } from "react-router-dom";
import { KDImage } from '../../../core/modal-loading/KDImage';
import { getDayFormat, getMonthFormat, getStringFechaInicial } from '../../../core/utils/DateFormat';



const Venta = () => {
  const { ITEM,idSucursal } = useParams()

  const [listBotones, setListaBotones] = useState<any>([])

  console.log("idSucursal ",idSucursal)
  //console.log("ITEM + id_sucursal ", (JSON.parse(id_sucursal))!)

  

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    console.log("fecha*** ",getStringFechaInicial())
    setFechaInicio(getStringFechaInicial())
  
    loadDataVenta()
    loadDataAnulacion()
    loadDataBotones()
    //loadDataVer()
    // testAxios();
  }, [idSucursal]);

//loading
const [loading, setLoading] = useState(
  false
);
const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())
  //datos para la tabla de ventas
  const loadDataVenta = async () => {
    try {
    var fecha = new Date()

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    setLoading(true)

    const respuesta = await AplicationConnect.post<any>('/ventasSucursal', {
        "sucursal": idSucursal,//"4",
        "fecha": getStringFechaInicial()//auxFormatFecha//"2023-04-25"
      })

      console.log("respuesta ventas", respuesta.data)
      setLoading(false)
      if(respuesta?.data){
        if (Array.isArray(respuesta.data)) {
      
          setRows(respuesta.data)
          setoriginalRows(respuesta?.data)
          
        }
      }
      if(respuesta?.data.status == false){
        AlertQuestion({ title: '', message: respuesta.data.message })
        setRows([])
      
      }
   
    } catch (error) {
      setLoading(false)
    }

  }

  //datos para la tabla de ventas
  const loadDataVentaParmaters = async (idItem: any, suc_fecha: any) => {
    
    console.log("  .... ", idItem, suc_fecha)
    if (!idItem || !suc_fecha)
    
      return
    /*
    
    "sucursal": "4",
            "fecha": "2023-04-25"
            */


    try {
      setLoading(true)
      const respuesta = await AplicationConnect.post<any>('/ventasSucursal', {
        "sucursal": idSucursal,
        "fecha": suc_fecha
      })

     //  console.log("respuesta *++*", respuesta.data)
     setLoading(false)
     if(respuesta?.data){
      if (Array.isArray(respuesta.data)) {
        console.log("respuesta *+++++15*", respuesta.data)
        setRows(respuesta.data)
        setoriginalRows(respuesta?.data)
       
      }
    }else{
      return("no hay datos");
    }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  //datos para el motivo de anulacion 
  const loadDataAnulacion = async () => {
    try {
      const respuesta = await AplicationConnect.post<any>('/motivosAnulacion', {
        // "sucursal": "4",
        // "fecha": "2023-04-24"
      })

      console.log("resAnulacion", respuesta.data)
    } catch (error) {

    }

  }


  //datos de los botones de la tabla 
  const loadDataBotones = async () => {
    try {
      const respuesta = await AplicationConnect.post<any>(`/botones/${ITEM}`)
     // const respuesta = await AplicationConnect.post<any>(`/botones/42`)

      console.log("resBotones", respuesta.data)
      if(respuesta?.data){
        if (Array.isArray(respuesta.data)) {
          setListaBotones(respuesta.data);
        }
      }
      
    } catch (error) {

    }

  }

  const [openModal, setOpenModal] = useState(false);


  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //two
  const [openModalDos, setOpenModalDos] = useState(false);


  const handleOpenModalDos = () => setOpenModalDos(true);
  const handleCloseModalDos = () => setOpenModalDos(false);
  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const handleOpenModalTres = () => setOpenModalTres(true);
  const handleCloseModalTres = () => setOpenModalTres(false);


  const [originalRows, setoriginalRows] = useState<any>([])

  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    console.log("serach  ", searchedVal)
    console.log("result ****",originalRows)
    setSearched(searchedVal);
    const keys = ["NUMERO_VENTA_DIA", "NUMERO_FACTURADO", "FECHA", "CLIENTE", "NRO_DOCUMENTO", "TOTAL_A_PAGAR", "TIPO_VENTA"]
    
  
   
    // const filteredRows = originalRows.filter((row: any) => {
    //   return keys.some((key: any) =>
    //     row[key]?.toLowerCase()?.includes(searchedVal?.toLowerCase())
    //   );
    // });
    const filteredRows = originalRows.filter((row: any) => {
      
     

      return keys.some((key: any) =>
        row[key]?.toString()?.toLowerCase()?.includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };






  const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

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

  const handleChangeDate = async (fecha: Date) => {
    console.log("fecha ", fecha)

    fecha = new Date(fecha)
    console.log("fecha año", fecha.getFullYear());
    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonth(fecha.getMonth())}-${getDay(fecha.getDate())}`
    console.log("format fecha ", auxFormatFecha)
    setFechaInicio(auxFormatFecha)
    loadDataVentaParmaters(ITEM, auxFormatFecha)
    //la a la api cada vez que cambiar al backend

  };


  return (
    <>
      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >

        <Typography variant="subtitle1" gutterBottom sx={{
          marginLeft: '15px',
          color: 'white', alignItems: 'center'
        }} >
          Reimpresion o Anulacion -  {rows[0]?.DESCRIPCION_SUCURSAL}
        </Typography>

      </div>



      <div style={{
        padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'start'
        , alignItems: 'end',

      }}
      // onClick={handleClick}
      >


        {/*<Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
          Solicitudes
        </Typography>*/}

      </div>

      <br />

      <Box sx={{ width: '100%' }}>


        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
          , alignContent: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DesktopDatePicker sx={{ width: '190px', height: '10px' }}
          defaultValue={dayjs() as unknown as Date}
          //defaultValue={dayjs('2022-04-17')}
          value={dayjs(fechaInicio)}
          format='DD/MM/YYYY'
          onChange={(newValue: any) => { handleChangeDate(newValue) }}
          slotProps={{ textField: { size: 'small' } }}

        />
      </LocalizationProvider>

          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h6 style={{ padding: '0px', margin: '0px' }}>Buscar</h6>
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
      <TablaVenta tableData={rows}
       listaVenta = {loadDataVenta}
        deleteByIndex={(index: any) => deleteByIndex(index)}
        listBotones={listBotones} 
        fechaInicio={fechaInicio}
        />


      <ModalPersonalized tableData={rows}
        openModalPersonalized={openModal}
        handleOpenModalPersonalized={handleOpenModal}
        handleCloseModalPersonalized={handleCloseModal}
        description="Deseas cargar la sugerencia del perfil?, puedes perder toda informacion guardada anteriormente"
      />

      <ModalPersonalized
        openModalPersonalized={openModalDos}
        handleOpenModalPersonalized={handleOpenModalDos}
        handleCloseModalPersonalized={handleCloseModalDos}
        description="Deseas limpiar todas la modificaciones manuales?"
      />

      <ModalForm
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        description="Deseas cerrar y guardar el formulario?"
      />
      {loading ? <KDImage
            
          /> : null}

    </>
  )
}

export default Venta