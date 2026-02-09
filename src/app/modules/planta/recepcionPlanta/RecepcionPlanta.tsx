import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, FormControlLabel, Grid, Modal, FormGroup, Box, CardActionArea, Card, CardContent } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import QrReader from "react-qr-reader";
import TablaRecepcionPlanta from './TablaRecepcionPlanta';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRecepcionPlanta } from './services/useRecepcionPlanta';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getStringFechaInicial, getDayFormat, getMonthFormat } from '../../../../core/utils/DateFormat';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { BiQrScan } from "react-icons/bi";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { styled } from '@mui/material/styles';
import SearchBar from '@mkyy/mui-search-bar';
import { ToastContainer, toast } from 'react-toastify';
import TablaDetalleRecepcion from './TablaDetalleRecepcion';
import { AlertSave, AlertError, AlertQuestion } from '../../../common/alerts/alerts';


import { Controller, useForm } from "react-hook-form";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));

const Destino = [
  {
    ID: '1',
    TEXT: 'Interno',
  },
  {
    ID: '2',
    TEXT: 'Externo',
  },


];

const PlantaRecepcion = () => {
  const { loadApiListarRecepcion, loadApiGuardarDetalleRecepcion } = useRecepcionPlanta()
  const { formState, handleSubmit, control, getValues, setValue, unregister, reset } = useForm();
  const { errors } = formState;

  const [rows, setRows] = useState<any>([]);

  const updateTextTablaRecepcion = (ListaDetalle: any) => {

    console.log("updateTextTablaRecepcion ", ListaDetalle)
    setRows(ListaDetalle);
    //cleanLocalStorageRows()
  }

  //ocultar tabla inicial
    const [activeBtn, setActiveBtn] = useState(false)
     const handleOBoton = () => setActiveBtn(true);
     const handleCBoton = () => setActiveBtn(false);

     const [startScan, setStartScan] = useState(false);
     const [loadingScan, setLoadingScan] = useState(false);
     const [dataQ, setDataQ] = useState("");
   
      const handleScan = async (scanData:any) => {
        setLoadingScan(true);
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "") {
          console.log(`loaded >>>`, scanData);
          setDataQ(scanData);
          setStartScan(false);
          setLoadingScan(false);
          // setPrecScan(scanData);
        }
      };
      const handleError = (err:any) => {
        console.error(err);
      };

  const [checkSi, setcheckSi] = useState(false)
  const [checkNo, setcheckNo] = useState(true)

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    // loadObtenerPrimeraCategoria()
    loadObtenerListaRecepcion()

  }, []);


  //loading
  const [loading, setLoading] = useState(
    false
  );

  const [originalRows, setoriginalRows] = useState<any>([])
  const [listaRecepcion, setListaRecepcion] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const [nroDocumento, setNroDocumento] = useState<string>('')
  const [urlSIAT, setUrlSiat] = useState<string>('')
  const [nomDestino, setNomDestino] = useState('')



  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);

    const keys = ["CODIGO", "NOMBRE_PROVEEDOR", "FECHA_REGISTRO"]
    const filteredRows = originalRows.filter((row: any) => {

      return keys.some((key: any) =>
        row[key]?.toString()?.toLowerCase()?.includes(searchedVal.toLowerCase())
      );
    });

    setListaRecepcion(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };

  const [fechaRecepcion, setFechaRecepcion] = useState(() => getStringFechaInicial())
  const [fechaDocumento, setFechaDocumento] = useState(() => getStringFechaInicial())

  const handleChangeDateRecepcion = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    console.log("format fecha recepcion", auxFormatFecha)

    setFechaRecepcion(auxFormatFecha)



  };
  const handleChangeDateDocumento = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    console.log("format fecha documento", auxFormatFecha)

    setFechaDocumento(auxFormatFecha)


  };



  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };



  const loadObtenerListaRecepcion = async () => {
    try {
      //setLoading(true)
      const response = await loadApiListarRecepcion()
      //setLoading(false)
      console.log("lista recepcion ", response)

      if (response?.status && response?.respuesta) {
        setListaRecepcion(response.respuesta)
        setoriginalRows(response.respuesta)
      }

    } catch (error) {

    }

  }

  const onChangeDocumento = (event: any) => {
    console.log("nombre documento ", event.target.value)
    setNroDocumento(event.target.value)

  }

  const onChangeUrlSIAT = (event: any) => {
    console.log("rrl siat ", event.target.value)
    setUrlSiat(event.target.value)

  }


  const handleSeleccioneDestino = async (value: any) => {

    console.log("valee destino ", value)
    const { TEXT } = value
    setNomDestino(TEXT)


  }


  const handlecheckSi = () => {

    setcheckSi(!checkSi)

    if (!checkSi) {
      setcheckNo(false);

    } else {
      setcheckNo(true)

    }



  }

  const handlecheckNo = () => {


    setcheckNo(!checkNo)

    if (!checkNo) {
      setcheckSi(false);

    } else {
      setcheckSi(true)

    }

  }

  const [state, setState] = useState({
    file: null,
    base64URL: ""
  });

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log("info base Url", baseURL);
        resolve(baseURL);
      };
      console.log("file info iii", fileInfo);
    });
  };

  const handleFileInputChange = (e: any) => {
    console.log("##############################")
    console.log("info imagen", e.target.files[0]);
    let { file } = state;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setState({
          base64URL: result,
          file
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setState({
      file: e.target.files[0]
    });
  };


  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };


  const InputTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable = false, index }: any) => {





    return (



      <Controller
        name={nameRegister}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (


          <TextField id="outlined-basic"
            sx={{ backgroundColor: 'white' }}
            //label="Outlined"
            size="small"
            //  type="number"
            variant="outlined"
            /*inputProps={{
              style: {
                margin: '0.4px', padding: '2px'
              },
             
            }}*/

            // disabled={isDisable}

            /* InputProps={{
               readOnly: isDisable,
            
             }}*/

            InputProps={{
              style: {

              }, inputProps: {
                min: 0//, step: 0.25
                , style: {
                  margin: '0.4px', padding: '2px'
                },

              }, readOnly: isDisable
            }}



            value={value}
            onBlur={() => {
              console.log("blurrrrrr")
              // handleSubmit(() => { })()
            }}

            onFocus={(e) => {
              // e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })


            }
            }
            onChange={(event) => {

              // localStorage.setItem(`CANTIDAD_${index}`, `CANTIDAD_${index}`)
              //  localStorage.setItem(`COSTO_UNITARIO_${index}`, `COSTO_UNITARIO_${index}`)



              onChange(event.target.value)

            }}


            error={!!error}
            helperText={error ? error.message : null}


          />
        )}

        rules={{
          //required: isRequired
          //required: getEsRequerido()

          //  esRequeridoName == nameRegister ? true : false
        }

        }


      />

    )
  }
  return (
    <>
      <div style={{
        backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center'

      }}

      >

        <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '15px',
              color: 'white', alignItems: 'center'
            }} >
              PLANTA - RECEPCION

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

              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Nro Documento</h5>
                  <TextField id="outlined-basic"
                    size='small'
                    sx={{ width: '100%' }}
                    label="Ingrese Nro Documento"
                    variant="outlined"
                    type='number'
                    onChange={onChangeDocumento}
                    value={nroDocumento}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Fecha Documento</h5>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DesktopDatePicker sx={{ width: '100%' }}
                          defaultValue={dayjs() as unknown as Date}
                          //minDate={dayjs()}
                          //  minDate={dayjs(getRestarDateCurrent())}
                          // maxDate={dayjs()}
                          onChange={(newValue: any) => { handleChangeDateDocumento(newValue) }}
                          slotProps={{ textField: { size: 'small', fullWidth: true } }}

                        />
                      </LocalizationProvider>
                   
                </div>
              </Grid>

              <Grid item xs={0.3} sm={0.3} md={0.3}>

              </Grid >

              <Grid item xs={12} sm={1} md={1}>
                <FormGroup sx={{ width: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '0px',
                    color: 'black', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                  }}>
                    ¿Factura?
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox checked={checkNo}

                        sx={{ margin: 0, padding: 0 }}
                        size='small'
                        onChange={handlecheckNo} defaultChecked />
                    }
                    label="NO"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkSi}
                        sx={{ margin: 0, padding: 0 }}
                        size='small'
                        onChange={handlecheckSi}
                      //onClick={(e) => handlecheckSi(e)}


                      />
                    }

                    label="SI"
                  />

                </FormGroup>
              </Grid>
              {checkSi == true ? 
              <>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}> Link SIAT</h5>
                  <TextField id="outlined-basic"
                    size='small'
                    sx={{ width: '100%' }}
                    label="Ingrese Telefono"
                    variant="outlined"
                    onChange={onChangeUrlSIAT}
                    //value={urlSIAT}
                    value={dataQ}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={0.8} md={0.8}>
                <br />
                {/* <Button 
                sx={{fontSize: '1.6em', color: 'black'}}>Escanear
                  <BiQrScan titleAccess='escanear QR' />
                  </Button> */}
                <CardActionArea sx={{
                  padding: '0', margin: '0', marginTop: '1px', width: '30px',
                }}
                onClick={() => {
                  setStartScan(!startScan);
                  }}
                >
                  {startScan ?
                  <QrCode2Icon
                    titleAccess='Escanear QR'
                    sx={{
                      backgroundColor: '#005592', color: 'white', fontSize: '2.4rem', padding: '5px'
                    }} />
                    :
                    <QrCode2Icon
                    titleAccess='Escanear QR'
                    sx={{
                      backgroundColor: '#005592', color: 'white', fontSize: '2.4rem', padding: '5px'
                    }} />
                  }
                </CardActionArea>
                {startScan && (
                        <>
                        
                        <QrReader
                            //facingMode={}
                            delay={1000}
                            onError={handleError}
                            onScan={handleScan}
                            // chooseDeviceId={()=>selected}
                            style={{ width: "300px" }}
                        />
                        </>
                         )}
              </Grid>
              </>
              :null}
             
              


              <Grid item xs={12} sm={2} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                {/* <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  //onClick={loadGuardarProveedor}
                >Agregar</ColorButton> */}
              </Grid>
            </Grid>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
            <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Destino Fondos</h5>
                  <Controller
                    control={control}
                    name="fondos"
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Destino}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          handleSeleccioneDestino(item)
                          onChange(item)

                        }
                        }

                        //value={value}
                        value={value || null}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="---Seleccione---"
                          //error={!!errors.categoria}
                          //helperText={errors.categoria && "Completa este campo"}
                          //  required

                          />
                        )}


                        getOptionLabel={(option: any) => option.TEXT}


                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Fecha Recepcion</h5>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DesktopDatePicker sx={{ width: '100%' }}
                          defaultValue={dayjs() as unknown as Date}
                          //minDate={dayjs()}
                          //  minDate={dayjs(getRestarDateCurrent())}
                          // maxDate={dayjs()}
                          onChange={(newValue: any) => { handleChangeDateRecepcion(newValue) }}
                          slotProps={{ textField: { size: 'small', fullWidth: true } }}

                        />
                      </LocalizationProvider>
                   
                </div>
              </Grid>
             
              <Grid item xs={12} sm={2.5} md={2.5} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                {/* <ColorButton variant="contained" sx={{ marginTop: '20px' }}
                //onClick={loadGuardarProveedor}
                >Adjuntar Factura/Recibo</ColorButton> */}
                 <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h5 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Adjuntar Comprobante Pago:</h5>
                  </div>
                  {/* <input type='file' name='images' 
                                    style={{fontSize: '0.7rem', fontFamily:'Times New Roman'}}>
                                    </input> */}
                  <input type="file" name="file" onChange={handleFileInputChange} />
                  <center>
                    <img
                      src={state.base64URL}
                      id="nuevaImagen"
                      className="img-thumbnail previsualizar"
                      alt="not found"
                      width="120px"
                    />
                  </center>
                </div>
              </Grid>


              {/* <Grid item xs={12} sm={2.5} md={2.5} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <ColorButton variant="contained" sx={{ marginTop: '20px' }}
                //onClick={loadGuardarProveedor}
                >Adjuntar Comprobante Pago</ColorButton>

              </Grid> */}
            </Grid>
          </AccordionDetails>

        </Accordion>
      </div>

      {/* <ColorButton variant="contained" onClick={handleSubmit(onSubmit)} > aaa Confirmar</ColorButton>
      <ColorButton variant="contained" onClick={() => console.log("get values ", getValues())} > get values</ColorButton> */}

      <br />
      {activeBtn == false?
      <> 
      <Card >
        <CardContent >
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={0.5}>
            </Grid>
            <Grid item xs={12} sm={12} md={11}>
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
            
              <TablaRecepcionPlanta
                tableData={listaRecepcion}
                updateTextTablaRecepcion={(list: any) => updateTextTablaRecepcion(list)}
                //OpenYcloseTabla = {() => OpenYcloseTabla()}
                control={control} 
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
                reset={reset}
                handleOBoton= {handleOBoton}
                handleCBoton = {handleCBoton}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={0.5}>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      </>
      :null}

      {activeBtn ? 
      <>
      <Card >
        <CardContent >
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={4} md={4}>
              <div style={{
                backgroundColor: `#9f4fa1`, padding: '0.5%', display: 'flex', flexDirection: 'row',
                justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
                , alignItems: 'center'

              }}

              >

                <Typography variant="subtitle1" gutterBottom sx={{
                  marginLeft: '15px',
                  color: 'white', alignItems: 'center'
                }} >
                  CODIGO PEDIDO: {rows[0]?.CODIGO}

                </Typography>
              </div>
            </Grid>
            <Grid item xs={7} sm={7} md={7}>
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <CancelIcon sx={{fontSize:'2.4rem'}} onClick={handleCBoton}/>
            </Grid>
          </Grid>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={0.5}>
            </Grid>
            <Grid item xs={12} sm={12} md={11}>
              
                    <TablaDetalleRecepcion
                        tableData={rows}
                        control={control} 
                        getValues={getValues}
                        setValue={setValue}
                        handleSubmit={handleSubmit}
                        reset={reset}
                        nroDocumento={nroDocumento}
                        fechaRecepcion={fechaRecepcion}
                        fechaDocumento={fechaDocumento}
                        nomDestino={nomDestino}
                        checkSi={checkSi}
                        //urlSIAT={urlSIAT}
                        dataQ={dataQ}
                        handleOBoton= {handleOBoton}
                        handleCBoton = {handleCBoton}
                    />
            </Grid>
            <Grid item xs={12} sm={12} md={0.5}>
            </Grid>
          </Grid>
          {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <ColorButton variant="contained" onClick={handleSubmit(onSubmit)} > Guardar</ColorButton>
            </div> */}
        </CardContent>
      </Card>
      </>
      :null}



      {loading ? <KDImage /> : null}
      <ToastContainer />
    </>


  )

}
export default PlantaRecepcion