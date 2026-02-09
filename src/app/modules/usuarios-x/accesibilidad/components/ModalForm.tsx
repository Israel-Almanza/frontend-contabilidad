import { Typography, Button, Collapse, TextField, Modal, Checkbox, Grid, InputAdornment, Autocomplete } from '@mui/material'
import React, { useState } from 'react'
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

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',
    // minWidth: 440,
    overflow: 'scroll',
    height: '90%',
    display: 'block',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};
const ColorButtonGreen = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#28A745',
    '&:hover': {
        backgroundColor: '#1B8332',
    },
}));


//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


const Genero = [
    {
        ID: 'F',
        TEXT: 'Femenino',
    },
    {
        ID: 'M',
        TEXT: 'Masculino',
    },


];

const Expedido = [
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
        ID: 'PN',
        TEXT: 'Pando',
    },
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
        backgroundColor: '#A31826',
    },
}));

export const ModalForm = (props: any) => {

    const { loadApiUsuariosAccesibilidad, loadApiListaSucursales, loadApiListaPerfiles, loadApiListaCargos, loadApiListaAFP, loadApiGuardarUsuario } = useAccesibilidad()

    const { formState, handleSubmit, control, getValues, setValue, register,reset } = useForm();
    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized, description, Lista, Perfiles, Cargos, ListaAfps, loadObtenerUsuarios } = props;
    //console.log("perfiles ",Perfiles)
    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);
    const [gender, setGender] = useState("");
    const { errors } = formState;
    const handleChange = (event: any) => {
        setGender(event.target.value);
    };

    //loading
    const [loading, setLoading] = useState(
        false
    );



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

    const handleSeleccioneSucursal = (value: any) => {
        console.log("valee de sucursal ", value)
        const { ID_UBICACION, DESCRIPCION } = value
        setIdSucursal(ID_UBICACION)
        setNombreSucursalTemporal(DESCRIPCION)
        //recuperar el nombre de la sucursal

    }

    const handleSeleccionePerfil = (value: any) => {
        console.log("valee de Perfil ", value)
        const { ID, TEXT } = value
        setIdPerfil(ID)
        setNombrePerfil(TEXT)
        //recuperar el nombre de la sucursal

    }

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

    const handleSeleccioneDepa = (value: any) => {
        console.log("valee de Depar ", value)
        const { ID, TEXT } = value
        setIdDepa(ID)
        setNombreDepa(TEXT)
        //recuperar el nombre de la sucursal

    }

    const handleSeleccioneGenero = (value: any) => {
        console.log("valee de genero ", value)
        const { ID, TEXT } = value
        setIdGenero(ID)
        setNombreGenero(TEXT)
        //recuperar el nombre de la sucursal

    }

    const onSubmit = async (data: any) => {
        console.log("enviando datos form ", data)
        console.log("enviando datos domicilio ", data.domicilio)
        console.log("id sucursal ", idSucursal)
        console.log("fecha ingreso ", fechaIngreso)
        console.log("fecha nac ", fechaNac)
        try {
            setLoading(true)

            const response = await loadApiGuardarUsuario(
                data.name_user,
                data.apellido_paterno,
                data.apellido_materno,
                data.ci,
                idDepa,
                idSucursal,
                fechaNac,
                data.email,
                data.phone,
                data.cell,
                idCargo,
                fechaIngreso,
                data.domicilio,
                idGenero,
                data.sueldo,
                idAFPs,
                nombrePerfil,
                data.user,
                data.nro_cuenta


            )
            console.log("res guardar usuarios ", response)
            setLoading(false)
            closeModalResetForm()
            if (response?.status) {
                handleCloseModalPersonalized()
                await loadObtenerUsuarios()
                AlertSave({ title: "", message: response.message });


            }
            if (response?.status == false) {
                handleCloseModalPersonalized()
                AlertQuestion({ title: '', message: response.message })


            }

            if (response == undefined) {
                handleCloseModalPersonalized()
                AlertError({ title: '', message: response.message })
            }
        } catch (error) {
            console.log("error api guardar:*", error)
            //setLoading(false)
        }
    }

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [firstLetter, setFirstLetter] = useState('');

    const handleInputChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setNombre(inputValue);
       
        if (inputValue.length > 0) {
            const firstCharacter = inputValue.charAt(0);
            setFirstLetter(firstCharacter);
            //setUsuario(firstCharacter);
          } else {
            setFirstLetter('');
          }
          
    };
    const handleInputChangeApellido = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setApellido(inputValue);
        setUsuario(firstLetter+inputValue);
    };
    const handleInputChangeUsuario = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setUsuario(inputValue);
    };

    const InputTextFieldCustomAcce = ({ label, control, isRequired = false, nameRegister, isDisable }: any) => {
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

    const closeModalResetForm = () => {
        reset({});
        setNombre('')
        setApellido('')
        setUsuario('')
        handleCloseModalPersonalized()
    }

    return (
        <Modal
            open={openModalPersonalized}
            //onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 0// textAlign: 'center'
                    , fontWeight: 'bold',
                    fontSize: '1rem', marginBottom: '10px', fontFamily: 'Times New Roman'
                }}>
                    {/*description*/} Nuevo Usuario
                </Typography>
                <br />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} sm={12} md={4}>
                        {/* <InputTextFieldCustomAcce
                            label={'Nombres(*)'}
                            control={control}
                            isRequired={true}
                            nameRegister={'name_user'}
                        /> */}
                        <Typography variant="subtitle1" gutterBottom sx={{
                            margin: 0, padding: 0, marginLeft: '3px',
                            color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                        }}>
                           Nombres(*)
                        </Typography>
                        <TextField id="outlined-basic" label="Nombre"
                            variant="outlined" sx={{
                                width: '100%',
                            }}
                            //value={value}
                            value={nombre}
                            //onChange={onChange}
                            onChange={handleInputChangeNombre}
                            //error={!!error}
                            //helperText={error ? error.message : null}
                            inputProps={register('name_user', {
                                required: 'Seleccione este campo',
                            })}
                            error={errors.name_user}
                            helperText={errors ? errors.name_user?.message : null}

                            size="small"


                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>

                        {/* <InputTextFieldCustomAcce
                            label={'Apellido Paterno'}
                            control={control}
                            isRequired={true}
                            nameRegister={'apellido_paterno'}
                        /> */}
                        <Typography variant="subtitle1" gutterBottom sx={{
                            margin: 0, padding: 0, marginLeft: '3px',
                            color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                        }}>
                           Apellido Paterno
                        </Typography>
                        <TextField id="outlined-basic" label="Apellido Paterno"
                            variant="outlined" sx={{
                                width: '100%',
                            }}
                            //value={value}
                            value={apellido}
                            //onChange={onChange}
                            onChange={handleInputChangeApellido}
                            //error={!!error}
                            //helperText={error ? error.message : null}
                            inputProps={register('apellido_paterno', {
                                required: 'Seleccione este campo',
                            })}
                            error={errors.apellido_paterno}
                            helperText={errors ? errors.apellido_paterno?.message : null}

                            size="small"


                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>

                        <InputTextFieldCustomAcce
                            label={'Apellido Materno'}
                            control={control}
                            isRequired={true}
                            nameRegister={'apellido_materno'}
                        />


                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Carnet de Identidad(*)'}
                            control={control}
                            isRequired={true}
                            nameRegister={'ci'}
                        />


                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', marginBottom: '3px'
                            }}>
                                Expedido
                            </Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Expedido}
                                sx={{ width: '100%' }}
                                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                onChange={(event, value) =>
                                    handleSeleccioneDepa(value)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione"


                                    />
                                )}
                                getOptionLabel={(option: any) => option.TEXT}
                            />

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'N° Teléfono'}
                            control={control}
                            isRequired={true}
                            nameRegister={'phone'}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'N° Celular'}
                            control={control}
                            isRequired={true}
                            nameRegister={'cell'}
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
                                name={"user"}
                                control={control}
                                render={({ fieldState: { error } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                        <DesktopDatePicker sx={{ width: '100%' }}
                                            //defaultValue={dayjs() as unknown as Date}
                                            defaultValue='DD/MM/YYYY'
                                            format='DD/MM/YYYY'
                                            //minDate={dayjs()}
                                            //  minDate={dayjs(getRestarDateCurrent())}
                                            // maxDate={dayjs()}
                                            onChange={(newValue: any) => { handleChangeDateInicio(newValue) }}
                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}

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
                            <Autocomplete
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
                            />

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', marginBottom: '3px'
                            }}>
                                Perfil(*)
                            </Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Perfiles}
                                sx={{ width: '100%' }}
                                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                onChange={(event, value) =>
                                    handleSeleccionePerfil(value)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione el Perfil"


                                    />
                                )}
                                getOptionLabel={(option: any) => option.TEXT}
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
                            <Autocomplete
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
                            />

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Sueldo'}
                            control={control}
                            isRequired={true}
                            nameRegister={'sueldo'}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'Domicilio'}
                            control={control}
                            isRequired={true}
                            nameRegister={'domicilio'}
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
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
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
                            />


                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <InputTextFieldCustomAcce
                            label={'N° de cuenta'}
                            control={control}
                            isRequired={true}
                            nameRegister={'nro_cuenta'}
                        />

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
                                    //defaultValue={dayjs() as unknown as Date}
                                    defaultValue='DD/MM/YYYY'
                                    format='DD/MM/YYYY'
                                    //minDate={dayjs()}
                                    //  minDate={dayjs(getRestarDateCurrent())}
                                    // maxDate={dayjs()}
                                    onChange={(newValue: any) => { handleChangeDateIngreso(newValue) }}
                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}

                                />
                            </LocalizationProvider>

                        </div>
                    </Grid>


                    <Grid item xs={12} sm={12} md={4}>
                        {/* <InputTextFieldCustomAcce
                            label={'Usuario'}
                            control={control}
                            isRequired={true}
                            nameRegister={'user'}
                            onBlur={() => {
                                console.log("blurrrrrr")
                                //caso 1 si campo 2 esta con datos
                                // handleSubmit(() => { })()
                                var cad = getValues('factura_reemplazo')
                                if(cad.length > 0){
                                    console.log("dato",)
                                }
                                

                                    
                            }}
                        /> */}
                        <Typography variant="subtitle1" gutterBottom sx={{
                            margin: 0, padding: 0, marginLeft: '3px',
                            color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                        }}>
                           Usuario
                        </Typography>
                        <TextField id="outlined-basic" label="Usuario"
                            variant="outlined" sx={{
                                width: '100%',
                               // backgroundColor:'#F1ECB7'
                            }}
                            //value={value}
                            value={usuario}
                            //onChange={onChange}
                            onChange={handleInputChangeUsuario}
                            //error={!!error}
                            //helperText={error ? error.message : null}
                            inputProps={register('user', {
                                required: 'Seleccione este campo',
                            })}
                            error={errors.user}
                            helperText={errors ? errors.user?.message : null}

                            size="small"


                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem'
                            }}>
                                Sucursal
                            </Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Lista}
                                sx={{ width: '100%' }}
                                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                onChange={(event, value) =>
                                    handleSeleccioneSucursal(value)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione la sucursal"


                                    />
                                )}
                                getOptionLabel={(option: any) => option.DESCRIPCION}
                            />


                        </div>
                    </Grid>

                </Grid>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/*<Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>*/}
                    <ColorButton variant="contained" onClick={closeModalResetForm}>Cerrar</ColorButton>
                    &nbsp; &nbsp;
                    <ColorButtonGreen variant="contained" onClick={handleSubmit(onSubmit)} > Confirmar</ColorButtonGreen>



                    {/*  <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>*/}
                </div>
            </Box>
        </Modal>
    )

}
