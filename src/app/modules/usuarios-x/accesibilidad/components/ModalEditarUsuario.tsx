import { Typography, Button, Collapse, TextField, Modal, Checkbox, Grid, InputAdornment, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { getStringFechaInicial, getDayFormat, getMonthFormat } from '../../../../../core/utils/DateFormat';
import { styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { useAccesibilidad } from '../services/useAccesibilidad';
import { update } from 'lodash';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',
    // minWidth: 440,
    overflow:'scroll',
    height:'72%',
    display:'block',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};



//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
        backgroundColor: '#A31826',
    },
}));

export const ModalEditarUsuario = (props: any) => {

    const { loadApiUsuariosAccesibilidad, loadApiListaSucursales, loadApiListaPerfiles, loadApiListaCargos, loadApiListaAFP, loadApiGuardarUsuario, loadApiEditarUsuario, loadApiUpDateUsuario} = useAccesibilidad()

    const { handleSubmit, control,setValue, getValues, register } = useForm();
    const { openModalEditar, handleOpenModalEditar, handleCloseModalEditar, description, Lista, Perfiles, Cargos, ListaAfps, loadObtenerUsuarios, EMPLEADO, NomEmpleado, datosEmpleado } = props;
    //console.log("modal datos empleado  ",EMPLEADO)
    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);
    const [gender, setGender] = useState("");
    const [datosEm, setDatosEmp] = useState<any>([])
    const handleChange = (event: any) => {
        setGender(event.target.value);
    };

   //loading
  const [loading, setLoading] = useState(
    false
  );

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //EditarUsuario()
    setValue("name_user",datosEmpleado.NOMBRE)
    setValue("apellido_paterno",datosEmpleado.AP_PATERNO)
    setValue("apellido_materno",datosEmpleado.AP_MATERNO)
    setValue("ci",datosEmpleado.CI)
    setValue("phone",datosEmpleado.TELEFONO)
    setValue("cell",datosEmpleado.CELULAR)
    setValue("email",datosEmpleado.EMAIL)
    setValue("domicilio",datosEmpleado.DIRECCION)
    setValue("sueldo",datosEmpleado.SUELDO)
    setValue("nro_cuenta",datosEmpleado.CUENTA_BANCARIA)
    setValue("fechaNac",datosEmpleado.FECHA_NACIMIENTO)
    setValue("genero",datosEmpleado.SEXO)
    setValue("afps",datosEmpleado.ID_AFP)
    setValue("cargo",datosEmpleado.ID_CARGO)
    setValue("fechaNac",datosEmpleado.FECHA_NACIMIENTO)
  }, [datosEmpleado]);


    const [idSucursal, setIdSucursal] = useState('')
    const [nombreSucursalTemporal, setNombreSucursalTemporal] = useState('')
    const [idPerfil, setIdPerfil] = useState('')
    const [nombrePerfil, setNombrePerfil] = useState('')
    const [idCargo, setIdCargo] = useState('')
    const [nombreCargo, setNombreCargo] = useState('')
    const [idAFPs, setAFPs] = useState('')
    const [nombreAFPs, setNombreAFPs] = useState('')
    const [idDepa, setIdDepa] = useState('')
    const [nombreDepa, setNombreDepa] = useState('')
    const [idGenero, setIdGenero] = useState('')
    const [nombreGenero, setNombreGenero] = useState('')

    const [fechaNac, setFechaNac] = useState(() => getStringFechaInicial())
    const [fechaIngreso, setFechaIngreso] = useState(() => getStringFechaInicial())

    const handleChangeDateInicio = async (fecha: Date) => {

        fecha = new Date(fecha)
    
        //2023-04-24"
        const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
         console.log("format fecha nac", auxFormatFecha)
    
        setFechaNac(auxFormatFecha)
    
    
      };
      const handleChangeDateIngreso = async (fecha: Date) => {

        fecha = new Date(fecha)
    
        //2023-04-24"
        const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
         console.log("format fecha ingreso", auxFormatFecha)
    
        setFechaIngreso(auxFormatFecha)
    
    
      };

      const handleSeleccioneCargo = (value: any) => {
        console.log("valee de Cargo ", value)
        const { ID, TEXT } = value
        setIdCargo(ID)
        setNombreCargo(TEXT)
        //recuperar el nombre de la sucursal
    
      }

      const handleSeleccioneAFPs = (value: any) => {
        console.log("valee de AFPs ", value)
        const { ID_AFP, NOMBRE_AFP } = value
        setAFPs(ID_AFP)
        setNombreAFPs(NOMBRE_AFP)
        //recuperar el nombre de la sucursal
    
      }

      const handleSeleccioneGenero = (value: any) => {
        console.log("valee de genero ", value)
        const { ID, TEXT } = value
        setIdGenero(ID)
        setNombreGenero(TEXT)
        //recuperar el nombre de la sucursal
    
      }

     /* const EditarUsuario = async () => {
        console.log("empl ",EMPLEADO)
        try {
            //setLoading(true)
           
            const response = await loadApiEditarUsuario(
                EMPLEADO
        
            )
            console.log("res datos usuarios ", response)
            //setLoading(false)
            setDatosEmp(response.empleado)
            
          } catch (error) {
            console.log("error api guardar:*", error)
            //setLoading(false)
          }
    }*/

      const UpDateUsuario = async (data: any) => {
        console.log("enviando datos form ", data)
        console.log("id sucursal ",EMPLEADO,idCargo,idAFPs,idGenero)
        console.log("fecha ingreso ",fechaIngreso)
        console.log("fecha nac ",fechaNac)
        try {
            setLoading(true)
           
            const response = await loadApiUpDateUsuario(
               EMPLEADO,
               data.name_user,
               data.apellido_paterno,
               data.apellido_materno,
               datosEmpleado.FECHA_NACIMIENTO,//fechaNac,
               data.email,
               data.phone,
               data.cell,
               data.cargo,
               fechaIngreso,
               data.domicilio,
               data.genero,
               data.sueldo,
               data.afps,
               data.nro_cuenta

        
            )
            console.log("res guardar usuarios ", response)
            setLoading(false)
            if (response?.status) {
                handleCloseModalEditar()
              await loadObtenerUsuarios()
              AlertSave({ title: "",  message:"Se Ha realizado todo los cambios Solicitados" });
  
  
            }
            if (response?.status == false) {
                handleCloseModalEditar()
                AlertQuestion({ title: '', message: "No se registro nada" })
      
      
              }
      
              if (response == undefined) {
                handleCloseModalEditar()
                AlertError({ title: '', message: "No se registro Usuario" })
              }
          } catch (error) {
            console.log("error api guardar:*", error)
            //setLoading(false)
          }
    }
    


    const InputTextFieldCustomAcce = ({ label, control, isRequired = false, nameRegister, isDisable, value }: any) => {
        return (
            <>

                <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '3px',
                    color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                }}>
                    {label}
                </Typography>
                <Controller
                    name={nameRegister}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic" label={label}
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            size="small"


                        />
                    )}

                    rules={{
                        required: {
                            value: isRequired,
                            message: 'Completa este campo '
                        },
                    }}
                />
            </>
        )
    }
    const SelectTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
        //console.log("entre al metodo 1")
        
    
        const [ListGenero, setListGenero] = useState<any>(
          [
            {
                ID: 'F',
                TEXT: 'Femenino',
            },
            {
                ID: 'M',
                TEXT: 'Masculino',
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
            {ListGenero && ListGenero?.map((option: any) => (
              <MenuItem key={option.ID}
                value={option.ID}
              >
                {option.TEXT}
              </MenuItem>
            ))}
          </TextField>
    
    
        )
      }

      const SelectTextFieldSmallAFPs = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
        //console.log("entre al metodo 1")
        
    
        const [ListGenero, setListGenero] = useState<any>(
          [
            {
                ID: 'F',
                TEXT: 'Femenino',
            },
            {
                ID: 'M',
                TEXT: 'Masculino',
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
            {ListaAfps && ListaAfps?.map((option: any) => (
              <MenuItem key={option.ID_AFP}
                value={option.ID_AFP}
              >
                {option.NOMBRE_AFP}
              </MenuItem>
            ))}
          </TextField>
    
    
        )
      }

      const SelectTextFieldSmallCargo = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
        //console.log("entre al metodo 1")
        

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
            {Cargos && Cargos?.map((option: any) => (
              <MenuItem key={option.ID}
                value={option.ID}
              >
                {option.TEXT}
              </MenuItem>
            ))}
          </TextField>
    
    
        )
      }
      /*const AutoCompletableCustom = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {

        const handleSeleccioneCargo = (value: any) => {
            console.log("valee de Cargo ", value)
            const { ID } = value
            setIdCargo(ID)
            //setNombreCargo(TEXT)
            //recuperar el nombre de la sucursal
        
          }
        
    
        return (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Cargos}
            sx={{ width: '100%' }}
            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}
            defaultValue={getValues(nameRegister)}
            onChange={(event, value) =>
              handleSeleccioneCargo(value)
            }
            //inputProps={register(nameRegister)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Seleccione Cargo"
    
              />
            )}
    
    
            getOptionLabel={(option: any) => option.TEXT}
    
    
          />
    
        )
      }*/

    return (
        <Modal
            open={openModalEditar}
            onClose={handleCloseModalEditar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2// textAlign: 'center'
                    , fontWeight: 'bold',
                    fontSize: '0.9rem', marginBottom: '10px'
                }}>
                    {NomEmpleado}
                </Typography>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Nombres'}
                            control={control}
                            isRequired={true}
                            nameRegister={'name_user'}
                            //value={value}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>

                        <InputTextFieldCustomAcce
                            label={'Apellido Paterno'}
                            control={control}
                            isRequired={true}
                            nameRegister={'apellido_paterno'}
                            //value={value}
                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>

                        <InputTextFieldCustomAcce
                            label={'Apellido Materno'}
                            control={control}
                            isRequired={true}
                            nameRegister={'apellido_materno'}
                            //value={value}
                        />


                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Carnet de Identidad'}
                            control={control}
                            isRequired={true}
                            nameRegister={'ci'}
                            //value={value}
                        />


                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'N° Teléfono'}
                            control={control}
                            isRequired={true}
                            nameRegister={'phone'}
                            //value={value}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'N° Celular'}
                            control={control}
                            isRequired={true}
                            nameRegister={'cell'}
                            //value={value}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem'
                            }}>
                                Fecha de nacimiento
                            </Typography>
                            <Controller
                                name={"fechaNac"}
                                control={control}
                                render={({  fieldState: { error } }) => (
                                    // <TextField id="outlined-basic" label="Complemento"
                                    //     variant="outlined" sx={{
                                    //         width: '100%',
                                    //     }}
                                    //     value={value}
                                    //     onChange={onChange}
                                    //     error={!!error}
                                    //     helperText={error ? error.message : null}
                                    //     size="small"

                                    // />
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                        <DesktopDatePicker sx={{ width: '100%' }}
                                            defaultValue={dayjs() as unknown as Date}
                                            //defaultValue='DD/MM/YYYY'
                                            format='DD/MM/YYYY'
                                            //minDate={dayjs()}
                                            //  minDate={dayjs(getRestarDateCurrent())}
                                            // maxDate={dayjs()}
                                            onChange={(newValue: any) => { handleChangeDateInicio(newValue) }}
                                            slotProps={{ textField: { size: 'small', fullWidth: false } }}
                                            //inputProps={register(name)}

                                        />
                                    </LocalizationProvider>
                                )}
                                //rules={{ required: true}}
                                rules={{ required: 'Completa este campo' }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Correo electronico'}
                            control={control}
                            isRequired={true}
                            nameRegister={'email'}
                            //value={value}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', marginBottom: '3px'
                            }}>
                                Cargo
                            </Typography>
                            {/* <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Cargos}
                                    sx={{ width: '100%' }}
                                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                    onChange={(event, value) =>
                                    handleSeleccioneCargo(value)
                                    }
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione el Cargo"
                                        

                                    />
                                    )}
                                    getOptionLabel={(option: any) => option.TEXT}
                                /> */}
                                <SelectTextFieldSmallCargo
                                isDisable={false}
                                control={control}
                                isRequired={false}
                                nameRegister={'cargo'}
                                />

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem'
                            }}>
                                Género
                            </Typography>
                                {/* <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Genero}
                                    sx={{ width: '100%' }}
                                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                    onChange={(event, value) =>
                                    handleSeleccioneGenero(value)
                                    }
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione Genero"
                                        

                                    />
                                    )}
                                    getOptionLabel={(option: any) => option.TEXT}
                                /> */}
                                <SelectTextFieldSmall

                                    isDisable={false}

                                    //variant="filled"
                                    control={control}
                                    isRequired={false}
                                    //nameRegister="demo"
                                    nameRegister={'genero'}
                                    //index={index}
                                    />

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem'
                            }}>
                                Fecha de ingreso
                            </Typography>
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DesktopDatePicker sx={{ width: '100%' }}
                                    defaultValue={dayjs() as unknown as Date}
                                    //defaultValue='DD/MM/YYYY'
                                    format='DD/MM/YYYY'
                                    //minDate={dayjs()}
                                    //  minDate={dayjs(getRestarDateCurrent())}
                                    // maxDate={dayjs()}
                                    onChange={(newValue: any) => { handleChangeDateIngreso(newValue) }}
                                    slotProps={{ textField: { size: 'small', fullWidth: false } }}

                                />
                            </LocalizationProvider>

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Domicilio'}
                            control={control}
                            isRequired={true}
                            nameRegister={'domicilio'}
                            //value={value}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Sueldo'}
                            control={control}
                            isRequired={true}
                            nameRegister={'sueldo'}
                            //value={value}
                        />

                    </Grid>

                    
                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem'
                            }}>

                                AFP
                            </Typography>
                                {/* <Autocomplete
                                    disablePortal
                                    id="Afps"
                                    //nameRegister={'genero'}
                                    options={ListaAfps}
                                    sx={{ width: '100%' }}
                                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                    onChange={(event, value) =>
                                    handleSeleccioneAFPs(value)
                                    }
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione AFP"
                                        

                                    />
                                    )}
                                    getOptionLabel={(option: any) => option.NOMBRE_AFP}
                                /> */}
                                <SelectTextFieldSmallAFPs

                                    isDisable={false}

                                    //variant="filled"
                                    control={control}
                                    isRequired={false}
                                    //nameRegister="demo"
                                    nameRegister={'afps'}
                                    //index={index}
                                    />


                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'N° de cuenta'}
                            control={control}
                            isRequired={true}
                            nameRegister={'nro_cuenta'}
                            //value={value}
                        />

                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={4}>
                    <SelectTextFieldSmall

                        isDisable={false}

                        //variant="filled"
                        control={control}
                        isRequired={false}
                        //nameRegister="demo"
                        nameRegister={'genero'}
                        //index={index}
                        />
                    </Grid> */}
                    

                </Grid>
                <br/>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/*<Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>*/}
                    <ColorButton variant="contained" onClick={handleCloseModalEditar} >Cerrar</ColorButton>
                    &nbsp; &nbsp;
                    <ColorButton variant="contained" onClick={handleSubmit(UpDateUsuario)} > Confirmar</ColorButton>



                    {/*  <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>*/}
                </div>
                {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
   
}
