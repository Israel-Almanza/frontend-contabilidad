import { Typography, Button, Collapse, TextField, Modal, Grid, InputAdornment, Stack, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from "react-hook-form";
import MapRegisterView from '../components/MapRegisterView';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SellIcon from '@mui/icons-material/Sell';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import SignpostIcon from '@mui/icons-material/Signpost';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import { useEditarCliente } from './services/useEditarCliente';
import { KDImage } from '../../../../core/modal-loading/KDImage';

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

const UpdateCliente = () => {

  const { handleSubmit, control, setValue, getValues, register, formState } = useForm();
  const {loadApiSearchCliente, loadApiListarClientes, loadApiActualizarCliente} = useEditarCliente()
  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };
  const { errors } = formState;
  const [idDocumento, setIdDocumento] = useState([])
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
   // loadObtenerPrimeraCategoria()
    loadObtenerListaClientes()
    //loadCompararCI(carnet)
    
    setValue('nomCompleto', idDocumento?.NOMBRE_COMPLETO)
    setValue('carnet',idDocumento?.CI)
    setValue('complemento',idDocumento?.COMPLEMENTO)
    setValue('expedido',idDocumento?.EXT)
    setValue('nit',idDocumento?.NIT)
    setValue('nomFacturacion',idDocumento?.NOMBRE_FACTURACION)
    setValue('direccion',idDocumento?.DIRECCION)
    setValue('email',idDocumento?.EMAIL)
    setValue('celular',idDocumento?.CELULAR)
    setValue('telefono',idDocumento?.TELEFONO_FIJO)
    

  }, [idDocumento]);


  //loading
  const [loading, setLoading] = useState(
    false
  );

  const [latitud, setLatitud] = useState('')
  const [longitud, setLongitud] = useState('')

  const updatePosicionMap = (Longitud:any, Latitud: any) => {
    console.log("datos desde el padre editar ", Longitud,"**", Latitud)
    setLatitud(Latitud)
    setLongitud(Longitud)

  }

  const [ListCliente, setListCliente] = useState<any>([]);
  //const [idDocumento, setIdDocumento] = useState('')

  const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleSeleccioneCliente = (value: any) => {
    console.log("valee de cliente ", value)
    const { CODIGO } = value
    setIdDocumento(value)
    
    //recuperar el nombre de la sucursal

  }

  const loadObtenerListaClientes = async () => {
    try {
      setLoading(true)
      const response = await loadApiListarClientes()
      setLoading(false)
      console.log("lista cliente ", response)
      
      if(response?.status && response?.results){
        setListCliente(response.results)
      }
      
    } catch (error) {
  
    }
  
  }
//buscador en tiempo real
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    searchApiCliente(inputValue);
  };


  const searchApiCliente = async (inputValue: string) => {
    try {
      const response = await loadApiSearchCliente(`${inputValue}`);
      setResults(response.data);
      console.log("respuesta busqueda carnet ",response)
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = async (data: any) => {
    console.log("enviando datos form ", data)
   console.log("id cliente ",idDocumento?.ID_CLIENTE)
   console.log("lan cliente ",idDocumento?.LATITUD)
   console.log("lon cliente ",idDocumento?.LONGITUD)
    console.log("latitud ",latitud)
    console.log("longitud", longitud)
    try {
      setLoading(true)
      const response = await loadApiActualizarCliente(
        idDocumento?.ID_CLIENTE,
        data.nomCompleto,
        data.carnet,
        data.complemento,
        data.nit,
        data.expedido,
        data.direccion,
        data.celular,
        data.telefono,
        data.nomFacturacion,
        data.email,
        idDocumento?.LATITUD,
        idDocumento?.LONGITUD
        
        

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

  const SelectTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
    //console.log("entre al metodo 1")
    

    const [ListExpedido, setListExpedido] = useState<any>(
      [
        {
          ID: 'CB',
          TEXT: 'Cochabamba',
        },
        {
          ID: 'SC',
          TEXT: 'Santa Cruz',
        },
        {
          ID: 'LP',
          TEXT: 'La Paz',
        },
        {
          ID: 'OR',
          TEXT: 'Oruro',
        },
        {
          ID: 'CH',
          TEXT: 'Chuquisaca',
        },
        {
          ID: 'BN',
          TEXT: 'Beni',
        },
        {
          ID: 'PT',
          TEXT: 'Potosi',
        },
        {
          ID: 'TJ',
          TEXT: 'Tarija',
        },
        {
          ID: 'PA',
          TEXT: 'Pando',
        },
      
      ]
    )
    const [ItemTurno, setItemTurno] = useState('');

    const [renderItem, setRenderItem] = useState("");

    //  console.log("getValues ***", getValues("PERECEDERO"));


    const handleChangeTurno = (event: any) => {
      console.log("select item turno", event.target.value);


      setItemTurno(event.target.value)



      // setSucursalItem(event.target.value)
    };



    return (

      <TextField
        id="outlined-select-gender"
        select
        //label="Seleccione turno"
        //  disabled={disableSubCategorySecond}
        //label={gender === "" ? "Seleccione una Opción" : ""}
        //  value={ItemTurno}
        // onChange={handleChangeTurno}

        //disabled={handleIsDisable()}
        sx={{ width: '100%' }}
        // InputLabelProps={{ shrink: false }}

         //defaultValue={"F"}
        defaultValue={getValues(nameRegister)}
        SelectProps={{
          MenuProps: {

          },
        }}
        //   margin='normal'
        size="small"
        variant="outlined"

        inputProps={register(nameRegister, {
          required: 'Completa este campo',
        })}
        //error={errors[nameRegister]}
        //helperText={errors ? errors[nameRegister]?.message : null}
      >
        {ListExpedido && ListExpedido?.map((option: any) => (
          <MenuItem key={option.ID}
            value={option.ID}
          >
            {option.TEXT}
          </MenuItem>
        ))}
      </TextField>


    )
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
      backgroundColor: '#A31826',
    },
  }));
  return (
    <div style={{
      //width: '100vw',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#2A2D34'
    }}>

      {/* <Button variant="contained" sx={{ backgroundColor: '#D32F2F' }} endIcon={<Select
        // labelId="demo-simple-select-label"
        // sx={{width:'400px'}}
        //  id="demo-simple-select"
        //  value={age}
        // label="Age"


        sx={{
          height: '30px',
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
        }}
        onChange={handleChange}


      >
        <MenuItem value={10}><ExplicitOutlinedIcon sx={{ color: '#43A047' }} />  Excel</MenuItem>


      </Select>}

      >
        Descargar Reportes
      </Button >*/}


      <Collapse in={openOne} timeout="auto" unmountOnExit>
        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
          Excel
        </Typography>

      </Collapse>


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



          <EditIcon sx={{ marginLeft: '20px', color: 'white' }} />
          <Typography variant="subtitle1" gutterBottom sx={{ margin: 0, marginLeft: '15px', color: 'white' }} >
            ACTUALIZAR CLIENTE
          </Typography>

        </div>

        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 0 }} >

          <Grid item xs={12} sm={12} md={8} sx={{ margin: '10px' }}>

            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
              <Grid item xs={12} sm={4} md={6} >

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: '#666666' }}>
                    Buscar
                  </Typography>
                  {/* <TextField id="outlined-basic" label="Buscar Cliente"
                      variant="outlined" sx={{
                        width: '100%',
                      }}
                      //value={value}
                      value={query}
                      //onChange={onChange}
                      onChange={handleInputChange}
                      //error={!!error}
                      //helperText={error ? error.message : null}
                    
                      size="small"

                      InputProps={{

                        startAdornment: (
                          <InputAdornment position='end'>
                            <PersonIcon sx={{ color: '#777777' }} />
                          </InputAdornment>
                        )
                      }}
                    /> */}
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListCliente}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) =>
                      handleSeleccioneCliente(value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Seleccione Cliente"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (<InputAdornment position="start"> 
                          <PersonIcon sx={{ color: '#777777' }} />
                          </InputAdornment>),
                          disableUnderline: true
                        }}

                      />
                    )}
                    getOptionLabel={(option: any) => option.NOMBRE_COMPLETO}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={7} md={6} >

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: '#666666' }}>
                    Nombre Completo
                  </Typography>
                  <Controller
                    name={"nomCompleto"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="Nombre Completo"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        sx={{
                          width: '100%',
                        }}
                        helperText={error ? error.message : null}
                        size="small"

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              <PersonIcon sx={{ color: '#777777' }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              {/*<Grid item xs={12} sm={6} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: '#666666' }}>
                    Tipo de Documento
                  </Typography>
                  <Controller
                    name={"user"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="Tipo de Documento"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              <FolderSharedIcon sx={{ color: '#777777' }} />

                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>
              </Grid>*/}
              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: '#666666' }}>
                    Carnet de Identidad
                  </Typography>
                  <Controller
                    name={"carnet"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" //label=" Carnet de Identidad"
                        variant="outlined" sx={{
                          width: '100%',
                          backgroundColor: '#E6E6E6'
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              <FolderSharedIcon sx={{ color: '#777777' }} />
                            </InputAdornment>
                          ),
                          readOnly: true,
                        }}
                        
                      />
                    )}
                    rules={{ required: false}}
                    //rules={{ required: 'Completa este campo' }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: '#666666' }}>
                    Complemento
                  </Typography>
                  <Controller
                    name={"complemento"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="Complemento"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              <FolderSharedIcon sx={{ color: '#777777' }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    rules={{ required: false}}
                    //rules={{ required: 'Completa este campo' }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '4px', color: '#666666' }}>
                    Expedido
                  </Typography>

                  <SelectTextFieldSmall

                    isDisable={false}

                    //variant="filled"
                    control={control}
                    isRequired={false}
                    //nameRegister="demo"
                    nameRegister={'expedido'}
                    //index={index}
                    />
                 
                </div>
              </Grid>



              <Grid item xs={12} sm={12} md={6}>

                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  NIT
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Controller
                    name={"nit"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="NIT"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        size="small"
                        error={!!error}
                        helperText={error ? error.message : null}

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              <SellIcon sx={{ color: '#777777' }} />
                              {/* <PersonIcon sx={{ color: '#777777' }} />*/}
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>


              </Grid>
              <Grid item xs={12} sm={12} md={6}>

                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  Nombre facturacion
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Controller
                    name={"nomFacturacion"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="Nombre facturacion"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        size="small"
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              <PersonIcon sx={{ color: '#777777' }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>


              </Grid>

              <Grid item xs={12} sm={12} md={6}>

                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  Direccion
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Controller
                    name={"direccion"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="Direccion"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        size="small"
                        error={!!error}
                        helperText={error ? error.message : null}

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              < SignpostIcon sx={{ color: '#777777' }} />
                              {/*<PersonIcon sx={{ color: '#777777' }} />*/}
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>


              </Grid>
              <Grid item xs={12} sm={12} md={6}>

                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>

                  Correo electronico
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Controller
                    name={"email"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label=" Correo electronico"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        size="small"
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              < LocalPostOfficeIcon sx={{ color: '#777777' }} />
                              {/*<PersonIcon sx={{ color: '#777777' }} />*/}
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>


              </Grid>



              <Grid item xs={12} sm={12} md={6}>

                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                  Celular
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Controller
                    name={"celular"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="Celular"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        size="small"
                        error={!!error}
                        helperText={error ? error.message : null}

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              < PhoneIphoneIcon />
                              {/* < PhoneIcon />*/}
                              {/*<PersonIcon sx={{ color: '#777777' }} />*/}
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>


              </Grid>
              <Grid item xs={12} sm={12} md={6}>

                <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>

                  Telefono fijo
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Controller
                    name={"telefono"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" label="Telefono fijo"
                        variant="outlined" sx={{
                          width: '100%',
                        }}
                        value={value}
                        size="small"
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}

                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='end'>
                              < PhoneIcon sx={{ color: '#777777' }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    //rules={{ required: true}}
                    rules={{ required: 'Completa este campo' }}
                  />
                </div>


              </Grid>
              <Grid item xs={12} sm={12} md={12} container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <ColorButton variant="contained" onClick={handleSubmit(onEdit)} startIcon={< EditIcon/>}> Actulizar</ColorButton>
              </Grid>

              {/*<Stack spacing={2} direction="row">
                <ColorButton variant="contained">Custom CSS</ColorButton>
                <BootstrapButton variant="contained" disableRipple>
                  Bootstrap
                </BootstrapButton>
              </Stack>*/}

            </Grid>
          </Grid>






          <Grid item xs={12} sm={12} md={3}>
            <MapRegisterView 
            updatePosicionMap={() => updatePosicionMap(idDocumento?.LATITUD, longitud)}
            />
          </Grid>
        </Grid>

      </Box>
      {loading ? <KDImage /> : null}
    </div >
  )
}

export default UpdateCliente