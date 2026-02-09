import { Typography, Button, Collapse, TextField, Modal, Grid, InputAdornment, Stack, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TableViewIcon from '@mui/icons-material/TableView';
import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from "react-hook-form";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import MapRegisterView from '../components/MapRegisterView';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SellIcon from '@mui/icons-material/Sell';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import SignpostIcon from '@mui/icons-material/Signpost';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { InputTextFieldCustomWithIcon } from '../../../common/forms/Input';
import { useCrearCliente } from './services/useCrearCliente';

const genders = [
  {
    value: 'CB',
    label: 'Cochabamba',
  },
  {
    value: 'SC',
    label: 'Santa Cruz',
  },
  {
    value: 'LP',
    label: 'La Paz',
  },
  {
    value: 'OR',
    label: 'Oruro',
  },
  {
    value: 'CH',
    label: 'Chuquisaca',
  },
  {
    value: 'BN',
    label: 'Beni',
  },
  {
    value: 'PT',
    label: 'Potosi',
  },
  {
    value: 'TJ',
    label: 'Tarija',
  },
  {
    value: 'PA',
    label: 'Pando',
  },

];

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '38%',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CrearCliente = () => {

  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  const {loadApiListarDocumentos,loadApiExiteDNI, loadApiRegistrarCliente} = useCrearCliente()

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };

  const { errors } = formState;

  const [valueSelect, setValueSelct] = useState('Button Prueba');
  const [valueNum, setValueNum] = useState('');
  const [valueNumTelef, setValueNumTelef] = useState('');
  const [carnet, setCarnet] = useState('');
  
  const handleChangeSelect = (event: any) => {
    //setAge(event.target.value);
    setValueSelct(event.target.value)
  };

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
   // loadObtenerPrimeraCategoria()
    loadObtenerListaDocumentos()
    //loadCompararCI(carnet)

  }, []);


  //loading
  const [loading, setLoading] = useState(
    false
  );
  const [latitud, setLatitud] = useState('')
  const [longitud, setLongitud] = useState('')

  const updatePosicionMap = (Longitud:any, Latitud: any) => {
    console.log("datos desde el padre ", Longitud,"**", Latitud)
    setLatitud(Latitud)
    setLongitud(Longitud)

  }

  const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
    setGender(event.target.value);
    register('user1', event.target.value)
    console.log("get values ", getValues())


  };

  const [ListDocumentos, setListDocumentos] = useState<any>([]);
  const [idDocumento, setIdDocumento] = useState('')



  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
      backgroundColor: '#A31826',
    },
  }));

  const loadObtenerListaDocumentos = async () => {
    try {
      setLoading(true)
      const response = await loadApiListarDocumentos()
      setLoading(false)
      console.log("lista documentos ", response)
      
      if(response?.status && response?.documentos){
        setListDocumentos(response.documentos)
      }
      
    } catch (error) {
  
    }
  
  }

  

  const [query, setQuery] = useState('');
  const [nit, setNit] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setNit(inputValue);
    searchApi(inputValue);
  };

  const handleInputChangeNit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNit(inputValue);
  };

  const [inputValue, setInputValue] = useState('');
  const [nomFactura, setNomFactura] = useState('');


  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setNomFactura(value)
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNomFactura(value)
  };


  const searchApi = async (inputValue: string) => {
    try {
      const response = await loadApiExiteDNI(`${inputValue}`);
      setResults(response.data);
      console.log("respuesta busqueda carnet ",response)
      if (response?.status) {
        //await loadObtenerListaAreas()
        AlertQuestion({ title: "", message: response.message });

      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: any) => {
    /*console.log("enviando datos form ", data)
    console.log("nombre ",inputValue)
    console.log("nomfactura", nomFactura)
    console.log("carnet ",query)
    console.log("celular ", valueNum)
    console.log("telefono ", valueNumTelef)
    console.log("latitud ",latitud)
    console.log("longitud", longitud)*/
    try {
      setLoading(true)
      const response = await loadApiRegistrarCliente(
        data.nombre_completo,
        data.ci,
        data.complemeto,
        data.nit,
        data.currency,
        data.direccion,
        valueNum,
        valueNumTelef,
        data.numfact,
        data.email,
        latitud,
        longitud

      )
      console.log("res guardar", response)
      setLoading(false)
      if (response?.status) {
        //await loadObtenerListaAreas()
        AlertSave({ title: "", message: response.message });

      }
      if (response?.status == false) {
        AlertQuestion({ title: '', message: response.message })


      }

      if (response == undefined) {
        AlertError({ title: '', message: response.message })
      }

    } catch (error) {
      console.log("error api guardar:*", error)
      setLoading(false)
    }
  }

  const handleSeleccioneDocumento = (value: any) => {
    console.log("valee de documento ", value)
    const { CODIGO } = value
    setIdDocumento(CODIGO)

    //recuperar el nombre de la sucursal

  }

  const handleChangeNumerico = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/\D/g, ''); // Eliminar cualquier carácter no numérico
    const limitedValue = numericValue.slice(0, 8); // Limitar a 8 dígitos
    setValueNum(limitedValue);
  };

  const handleChangeNumTelef = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/\D/g, ''); // Eliminar cualquier carácter no numérico
    const limitedValue = numericValue.slice(0, 8); // Limitar a 8 dígitos
    setValueNumTelef(limitedValue);
  };

  

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#2A2D34'
    }}>




      <br />





      <div style={{ maxWidth: '180px', margin: 'auto', marginBottom: '8px', marginTop: '1%' }}>
        <img style={{ width: '100%' }} src="https://sistemageneral.azurewebsites.net/assets/dist/img/logo.png" />
      </div>

      <Box sx={{ width: '90%', backgroundColor: 'white', margin: 'auto', borderRadius: '5px' }}>
        <div style={{
          backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
          justifyContent: 'flex-start', borderRadius: '5px', marginTop: '1%'
          , alignItems: 'center'

        }}
        // onClick={handleClick}
        >



          <PersonAddAlt1Icon sx={{ marginLeft: '20px', color: 'white' }} />
          <Typography variant="subtitle1" gutterBottom sx={{ margin: 0, marginLeft: '15px', color: 'white' }} >
            REGISTRO DE CLIENTE
          </Typography>

        </div>

        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 0 }} >

          <Grid item xs={12} sm={12} md={8} sx={{ margin: '10px' }}>

            <Grid item xs={12} sm={12} md={12} >

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  Nombre Completo
                </Typography>
                    <TextField id="outlined-basic" label="Nombre Completo"
                      variant="outlined" sx={{
                        width: '100%',
                      }}

                      //value={value}
                      //onChange={onChange}
                      value={inputValue}
                      onChange={handleInputChange1}

                      //error={!!error}
                      //helperText={error ? error.message : null}

                      size="small"
                      inputProps={register('nombre_completo', {
                        required: 'Seleccione este campo',
                      })}
                      error={errors.nombre_completo}
                      helperText={errors ?  errors.nombre_completo?.message: null}

                      InputProps={{

                        startAdornment: (
                          <InputAdornment position='end'>
                            <PersonIcon sx={{ color: '#777777' }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  


              </div>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              <Grid item xs={12} sm={6} md={4}>
                
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                Tipo de Documento
                </Typography>
                  <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={ListDocumentos}
                      sx={{ width: '100%' }}
                      //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                      onChange={(event, value) =>
                        handleSeleccioneDocumento(value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Seleccione el Documento"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (<InputAdornment position="start"> 
                            <FolderSharedIcon sx={{ color: '#777777' }} />
                            </InputAdornment>),
                            disableUnderline: true
                          }}

                        />
                      )}
                      getOptionLabel={(option: any) => option.DESCRIPCION}
                  />
              </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  Carnet de Identidad
                </Typography>

               
                    <TextField id="outlined-basic" label="Carnet Identidad"
                      variant="outlined" sx={{
                        width: '100%',
                      }}
                      //value={value}
                      value={query}
                      //onChange={onChange}
                      onChange={handleInputChange}
                      //error={!!error}
                      //helperText={error ? error.message : null}
                      inputProps={register('ci', {
                        required: 'Seleccione este campo',
                      })}
                      error={errors.currency}
                      helperText={errors ?  errors.currency?.message: null}

                      size="small"

                      InputProps={{

                        startAdornment: (
                          <InputAdornment position='end'>
                            <FolderSharedIcon sx={{ color: '#777777' }} />
                          </InputAdornment>
                        )
                      }}
                    />
                 


              </div>
                <div>
      {/* <input type="text" value={query} onChange={handleInputChange} /> */}
      
    </div>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <InputTextFieldCustomWithIcon
                  label={"Complemento"}
                  control={control}
                  isRequired={false}
                  iconButton={<FolderSharedIcon sx={{ color: '#777777' }} />}
                  nameRegister={'complemeto'}
                />

              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                    Expedido
                  </Typography>

                  <TextField
                    id="outlined-select-gender"
                    select
                    label="Expedido"
                    //label={gender === "" ? "Seleccione una Opción" : ""}
                    value={gender}
                    onChange={handleChange}
                    //  sx={{ width: '100%' }}
                    // InputLabelProps={{ shrink: false }}


                    SelectProps={{
                      MenuProps: {

                      },
                    }}
                    //   margin='normal'
                    size="small"
                    variant="outlined"

                    inputProps={register('currency', {
                      required: 'Seleccione este campo',
                    })}
                    error={errors.currency}
                    helperText={errors ?  errors.currency?.message: null}

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='end'>

                          <KeyboardDoubleArrowDownIcon sx={{ color: '#777777' }} />
                        </InputAdornment>
                      )
                    }}
                  >
                    {genders.map(option => (
                      <MenuItem key={option.value} value={option.value}

                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                </div>
              </Grid>



              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  NIT
                </Typography>
                    <TextField id="outlined-basic" label="Carnet Identidad"
                      variant="outlined" sx={{
                        width: '100%',
                      }}
                      //value={value}
                      value={nit}
                      //onChange={onChange}
                      onChange={handleInputChangeNit}
                      //error={!!error}
                      //helperText={error ? error.message : null}
                      inputProps={register('nit', {
                        required: 'Seleccione este campo',
                      })}
                      error={errors.nit}
                      helperText={errors ?  errors.nit?.message: null}

                      size="small"

                      InputProps={{

                        startAdornment: (
                          <InputAdornment position='end'>
                            <SellIcon sx={{ color: '#777777' }} />
                          </InputAdornment>
                        )
                      }}
                    />

              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                Nombre facturacion
                </Typography>
               
                    <TextField id="outlined-basic" label="Nombre facturacion"
                      variant="outlined" sx={{
                        width: '100%',
                      }}

                      //value={value}
                      //onChange={onChange}
                      value={nomFactura}
                      onChange={handleInputChange2}

                      // error={!!error}
                      // helperText={error ? error.message : null}
                      size="small"
                      inputProps={register('numfact', {
                        required: 'Seleccione este campo',
                      })}
                      error={errors.numfact}
                      helperText={errors ?  errors.numfact?.message: null}
                      
                      InputProps={{

                        startAdornment: (
                          <InputAdornment position='end'>
                            <PersonIcon sx={{ color: '#777777' }} />
                          </InputAdornment>
                        )
                      }}
                      
                    />
                  
              </Grid>

              <Grid item xs={12} sm={12} md={6}>

                <InputTextFieldCustomWithIcon
                  label={" Direccion"}
                  control={control}
                  isRequired={true}
                  iconButton={< SignpostIcon sx={{ color: '#777777' }} />}
                  nameRegister={'direccion'}
                />



              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <InputTextFieldCustomWithIcon
                  label={"Correo electronico"}
                  control={control}
                  isRequired={true}
                  iconButton={< LocalPostOfficeIcon sx={{ color: '#777777' }} />}
                  nameRegister={'email'}
                />
              </Grid>



              <Grid item xs={12} sm={12} md={6}>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  Celular
                </Typography>

                <Controller
                  name={"phone"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField id="outlined-basic" label="Celular"
                      variant="outlined" sx={{
                        width: '100%',
                      }}

                      value={valueNum}
                      //onChange={onChange}
                      onChange={handleChangeNumerico}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="number"
                  //InputProps={{ inputProps: { min: 0, max: 8 } }}

                      size="small"

                      InputProps={{
                        inputProps: { min: 0, max: 99999999 },
                        startAdornment: (
                          <InputAdornment position='end'>
                            <PhoneIphoneIcon sx={{ color: '#777777' }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  rules={{ required: false }}
                //  rules={{ required: 'Completa este campo',maxLength:3 }}
                />


              </div>
             
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                      Telefono
                    </Typography>
                    <TextField id="outlined-basic" label="Telefono"
                          variant="outlined" sx={{
                            width: '100%',
                          }}

                          value={valueNumTelef}
                          //onChange={onChange}
                          onChange={handleChangeNumTelef}
                          //error={!!error}
                          //helperText={error ? error.message : null}
                          type="number"
                      //InputProps={{ inputProps: { min: 0, max: 8 } }}

                          size="small"

                          InputProps={{
                            //inputProps: { min: 0, max: 99999999 },
                            startAdornment: (
                              <InputAdornment position='end'>
                                <PhoneIcon sx={{ color: '#777777' }} />
                              </InputAdornment>
                            )
                          }}
                    />
                </div>
               
              </Grid>
             
              <Grid item xs={12} sm={12} md={12} container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <ColorButton variant="contained" onClick={handleSubmit(onSubmit)} startIcon={<PersonAddAlt1Icon />}> Registrarme</ColorButton>
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <MapRegisterView 
            //updateTextTablaRecepcion={updateTextTablaRecepcion}
            updatePosicionMap={(latitud: any, longitud:any) => updatePosicionMap(latitud, longitud)}
            
            />
          </Grid>
        </Grid>

      </Box>
      {loading ? <KDImage /> : null}
    </div >
  )
}

export default CrearCliente