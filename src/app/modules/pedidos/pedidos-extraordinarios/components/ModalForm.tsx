


import { Typography, Button, Collapse, TextField, Modal, FormGroup, Checkbox, Grid, FormControlLabel, InputAdornment, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'


import Box from '@mui/material/Box';




import { styled } from "@mui/system";

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { Controller, useForm } from "react-hook-form";
import { usePedidosExtraordinariosService } from '../services/usePedidosExtraordinariosService';
import { useNotifcacionesService } from '../../../notificaciones-service/services/useNotifcacionesService';
import { AlertSave } from '../../../../common/alerts/alerts';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { getDayFormat,getMonthFormat,getStringFechaInicial } from '../../../../../core/utils/DateFormat';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',

    // minWidth: 440,
    overflow: 'scroll',
    height: '80%',
    display: 'block',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 2,
};






const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
        backgroundColor: '#A31826',
    },
}));

export const ModalForm = (props: any) => {

    const { loadApiSucursalesUsaurio, loadApiPrimeraCategoriaInventarios,
        loadApiPrimeraSubCategoryInventory,
        loadApiSegundaSubCategoryInventory,
        loadApiGuardarPedidoExtraordinario
    } = usePedidosExtraordinariosService();

    const {loadApiAddNotification}=useNotifcacionesService();



    const { formState, handleSubmit, control, register, reset, getValues, setValue } = useForm();
    const { errors } = formState;
    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized, description } = props;


    const [ListSucursalesUsaurio, setListSucursalesUsaurio] = useState<any>([])
    const [sucursalItem, setSucursalItem] = useState("");

    const [ListCategoria, setListCategoria] = useState<any>([])
    const [idCateogria, setIdCategoria] = useState("");

    const [ListSubCategoria, setListSubCategoria] = useState<any>([])
    const [idSubCateogria, setIdSubCategoria] = useState("");

    const [ListSubSegundaCategoria, setListSubSegundaCategoria] = useState<any>([])
    const [idSubSegundaCateogria, setIdSubSegundaCategoria] = useState("");
    const [checkSi, setcheckSi] = useState(false)
    const [checkNo, setcheckNo] = useState(true)

    const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)
    const [disableSubCategorySecond, setDisableSubCategorySecond] = useState(true)

    const [fechaDeEntrega, setFechaDeEntrega] = useState(() => getStringFechaInicial())

    const [loading, setLoading] = useState(false);
    const [nombreSucursal,setNombreSucursal]=useState('')

    useEffect(() => {
        // Update the document title using the browser API
        loadSucursalesUsaurio();
        loadPrimeraCategoriaInventarios();
        //loadPrimeraSubCategoryInventory();
        //  loadSegundaSubCategorListSubCategoriayInventory();
    }, []);



    const loadSucursalesUsaurio = async () => {
        try {
            const response = await loadApiSucursalesUsaurio();
         
            if (Array.isArray(response)) {
                setListSucursalesUsaurio(response)
                //actulizar select
            }

        } catch (error) {

        }
    }

    const loadPrimeraCategoriaInventarios = async () => {
        try {
            const response = await loadApiPrimeraCategoriaInventarios();
     
            if (Array.isArray(response)) {
                setListCategoria(response)
                //actulizar select
            }

        } catch (error) {
            console.log(error)
        }
    }


    const loadPrimeraSubCategoryInventory = async (subcategoria1: number) => {
        try {
            const response = await loadApiPrimeraSubCategoryInventory(subcategoria1);
     
            if (Array.isArray(response)) {

                setListSubCategoria(response)
                //actulizar select
            }

        } catch (error) {

        }
    }


    const loadSegundaSubCategoryInventory = async (subcategoria2: number) => {
        try {
            const response = await loadApiSegundaSubCategoryInventory(subcategoria2);
        
            if (Array.isArray(response)) {

                setListSubSegundaCategoria(response)
                //actulizar select
            }

        } catch (error) {

        }
    }

    const onSubmit = async (dataForm: any) => {
        console.log("enviando datos form ", dataForm)
        // console.log("fecha de entrega ", fechaDeEntrega)
        // console.log("check no ", checkNo)
        //  console.log("check si ", checkSi)

        const { categoria, detalle, subcategoria, subcategoria2, sucursal } = dataForm

        const idSucursal = sucursal?.ID_UBICACION
        const idCategoria = categoria?.ID_CATEGORIA
        const idSubCategoria = subcategoria?.ID_SUB_CATEGORIA_1
        const idSubcategoria2 = subcategoria2?.ID_SUB_CATEGORIA_2

    
        if (!fechaDeEntrega) {
            alert("este campo es requerido")
            return
        }

        //si 1 // no cero

        if (checkSi) {
            try {
                setLoading(true)
                const response = await loadApiGuardarPedidoExtraordinario(
                    idSucursal,
                    idCategoria,
                    idSubCategoria,
                    idSubcategoria2
                    , detalle,
                    1,
                    fechaDeEntrega
                )
                setLoading(false)
                console.log("response save  ", response)

                handleCloseModalPersonalized()

                if (response) {
                    if (response.status) {
                        AlertSave({ title: "", message: "Se Guardado Correctamente!" });
                 
                        const responseNoti = await loadApiAddNotification(
                            idSucursal,
                         `Se realizado un pededio Extraorinario de la ${nombreSucursal}`
                        )

                        console.log(" save notifacion ",responseNoti)
                    }

                 



                }

            } catch (error) {
                console.log("error  save ", error)
                setLoading(false)
            }

            return;
        }

        if (checkNo) {
            try {
                setLoading(true)
                const response = await loadApiGuardarPedidoExtraordinario(
                    idSucursal,
                    idCategoria,
                    idSubCategoria,
                    idSubcategoria2
                    , detalle,
                    0,
                    fechaDeEntrega


                )
                setLoading(false)
                console.log("response save No ", response)
                handleCloseModalPersonalized()

                if (response) {
                    if (response.status) {
                        AlertSave({ title: "", message: "Se Guardado  Correctamente!" });
                    
                        const responseNoti = await loadApiAddNotification(
                            idSucursal,
                         `Se realizado un pededio Extraorinario de la ${nombreSucursal}`
                        )

                        console.log(" save notifacion 1",responseNoti)
                    }

                }

            } catch (error) {
                console.log("error  save ", error)
                setLoading(false)
            }

            return;
        }



    }


    const handleChangeSucursal = (value: any) => {
     

        const { ID_UBICACION,DESCRIPCION} = value
        
        setSucursalItem(ID_UBICACION)
setNombreSucursal(DESCRIPCION);



        // setSucursalItem(event.target.value)
    };

    const handleChangeCategoria = (value: any) => {

        const { ID_CATEGORIA } = value
      
        setIdCategoria(ID_CATEGORIA)
        setValue("subcategoria", "")
        setListSubCategoria([])
 

        loadPrimeraSubCategoryInventory(ID_CATEGORIA);
        //reset de subcategoria o producto 
       
        setDisableSubCategoryFrist(false)


    };

    const handleChangeSubCategory = (value: any) => {

        //ID_SUB_CATEGORIA_1
        const { ID_SUB_CATEGORIA_1 } = value
        setIdSubCategoria(ID_SUB_CATEGORIA_1)
        loadSegundaSubCategoryInventory(ID_SUB_CATEGORIA_1);
        setDisableSubCategorySecond(false)

   

    };

    const handleChangeSubSegundaCategory = (value: any) => {
        
        const { ID_SUB_CATEGORIA_2 } = value
        setIdSubSegundaCategoria(ID_SUB_CATEGORIA_2)

    };

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
        if (tempDateMonth > 0 && tempDateMonth < 10) {
            let temp = tempDateMonth + 1;
            res = res + temp;
            return res;
        } else {
            return tempDateMonth + 1;
        }
    }

    const handleChangeDateFin = async (fecha: Date) => {

        fecha = new Date(fecha)

        //2023-04-24"
        const auxFormatFecha = `${fecha.getFullYear()}-${getMonth(fecha.getMonth())}-${getDay(fecha.getDate())}`
      

        setFechaDeEntrega(auxFormatFecha)
        //loadDataVentaParmaters(ITEM, auxFormatFecha)
        //la a la api cada vez que cambiar al backend

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
                            multiline
                            rows={5}

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
        setDisableSubCategoryFrist(true)
        setDisableSubCategorySecond(true)

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

                <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: '#DC3545', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
                }}>

                    <Typography id="modal-modal-description" sx={{
                        mt: 1,
                        textAlign: 'center',
                        //fontWeight: 'bold',
                        marginLeft: '2%',
                        color:'white',
                        fontSize: '0.9rem', //marginBottom: '10px'
                    }}>
                        Pedido extraordinario
                    </Typography>
                    <Button onClick={() => closeModalResetForm()}
                        sx={{
                            color: 'black',
                            ':hover': {
                                color: 'white'
                            }
                        }}
                    >
                        <CancelPresentationIcon
                        />
                    </Button>
                </div>



                <div style={{ margin: '10px' }}>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                            }}>
                                Sucursal
                            </Typography>

                        

                            <Controller
                                control={control}
                                name="sucursal"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={ListSucursalesUsaurio}
                                        sx={{ width: '100%' }}
                                        noOptionsText={'Sin opciones'}
                                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                        onChange={(event, item) => {
                                            handleChangeSucursal(item)
                                            onChange(item)

                                        }
                                        }

                                        value={value}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                label="Sucursal"
                                                error={!!errors.sucursal}
                                                helperText={errors.sucursal && "Completa este campo"}
                                            //  required

                                            />
                                        )}


                                        getOptionLabel={(option: any) => option.DESCRIPCION}


                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >


                        <Grid item xs={12} sm={12} md={3}>

                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                            }}>
                                Categoria
                            </Typography>


                            {/*     <TextField
                            id="outlined-select-gender"
                            select
                            label="Seleccion Primero la Categoria"
                            //label={gender === "" ? "Seleccione una Opción" : ""}
                            value={idCateogria}
                            onChange={handleChangeCategoria}
                            sx={{ width: '100%' }}
                            // InputLabelProps={{ shrink: false }}


                            SelectProps={{
                                MenuProps: {

                                },
                            }}
                            //   margin='normal'
                            size="small"
                            variant="outlined"

                            inputProps={register('categoria', {
                                required: 'Completa este campo',
                            })}
                            error={errors.categoria}
                            helperText={errors ? errors.categoria?.message : null}

                        >
                            {ListCategoria && ListCategoria?.map((option: any) => (
                                <MenuItem key={option.ID_CATEGORIA
                                } value={option.ID_CATEGORIA}
                                >
                                    {option.CATEGORIA}
                                </MenuItem>
                            ))}
                        </TextField>*/}

                            <Controller
                                control={control}
                                name="categoria"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={ListCategoria}
                                        noOptionsText={'Sin opciones'}
                                        sx={{ width: '100%' }}
                                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                        onChange={(event, item) => {
                                            handleChangeCategoria(item)
                                            onChange(item)

                                        }
                                        }

                                        value={value}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                label="Seleccion Primero la Categoria"
                                                error={!!errors.categoria}
                                                helperText={errors.categoria && "Completa este campo"}
                                            //  required

                                            />
                                        )}


                                        getOptionLabel={(option: any) => option.CATEGORIA}


                                    />
                                )}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>

                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                            }}>
                                Subcategoria
                            </Typography>

                            {/*<TextField
                            id="outlined-select-gender"
                            select
                            label="Seleccion Primero la Categoria"
                            disabled={disableSubCategoryFrist}
                            //label={gender === "" ? "Seleccione una Opción" : ""}
                            value={idSubCateogria}
                            onChange={handleChangeSubCategory}
                            sx={{ width: '100%' }}
                            // InputLabelProps={{ shrink: false }}


                            SelectProps={{
                                MenuProps: {

                                },
                            }}
                            //   margin='normal'
                            size="small"
                            variant="outlined"

                            inputProps={register('subcategoria', {
                                required: 'Completa este campo',
                            })}
                            error={errors.subcategoria}
                            helperText={errors ? errors.subcategoria?.message : null}

                        >
                            {ListSubCategoria && ListSubCategoria?.map((option: any) => (
                                <MenuItem key={option.ID_SUB_CATEGORIA_1
                                } value={option.ID_SUB_CATEGORIA_1}
                                >
                                    {option.SUB_CATEGORIA_1}
                                </MenuItem>
                            ))}
                        </TextField>*/}

                            <Controller
                                control={control}
                                name="subcategoria"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        clearOnBlur={true}
                                        options={ListSubCategoria}
                                        disabled={disableSubCategoryFrist}
                                        noOptionsText={'Sin opciones'}
                                        sx={{ width: '100%' }}
                                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                        onChange={(event, item, reason) => {

                                            if (reason === 'clear') {
                                                console.log("Put your clear logic here: this condition executed when clear button clicked")
                                               // setValue({ SUB_CATEGORIA_1: '' }) //for reset the value
                                                return
                                            }

                                            handleChangeSubCategory(item)
                                            onChange(item)

                                        }
                                        }

                                        //value={value}
                                        value={value || null}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                label="Seleccion Primero la Categoria"
                                                error={!!errors.subcategoria}
                                                helperText={errors.subcategoria && "Completa este campo"}
                                            //  required

                                            />
                                        )}


                                        getOptionLabel={(option: any) => option.SUB_CATEGORIA_1}


                                    />
                                )}
                            />

                        </Grid>

                        <Grid item xs={12} sm={12} md={3}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                            }}>
                                Seleccione el producto
                            </Typography>

                            {/*<TextField
                            id="outlined-select-gender"
                            select
                            label="Seleccione el producto"
                            disabled={disableSubCategorySecond}
                            //label={gender === "" ? "Seleccione una Opción" : ""}
                            value={idSubSegundaCateogria}
                            onChange={handleChangeSubSegundaCategory}
                            sx={{ width: '100%' }}
                            // InputLabelProps={{ shrink: false }}


                            SelectProps={{
                                MenuProps: {

                                },
                            }}
                            //   margin='normal'
                            size="small"
                            variant="outlined"

                            inputProps={register('subcategoria2', {
                                required: 'Completa este campo',
                            })}
                            error={errors.subcategoria2}
                            helperText={errors ? errors.subcategoria2?.message : null}

                        >
                            {ListSubSegundaCategoria && ListSubSegundaCategoria?.map((option: any) => (
                                <MenuItem key={option.ID_SUB_CATEGORIA_2
                                } value={option.ID_SUB_CATEGORIA_2}
                                >
                                    {option.SUB_CATEGORIA_2}
                                </MenuItem>
                            ))}
                        </TextField>*/}

                            <Controller
                                control={control}
                                name="subcategoria2"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        disabled={disableSubCategorySecond}
                                        options={ListSubSegundaCategoria}
                                        noOptionsText={'Sin opciones'}
                                        sx={{ width: '100%' }}
                                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                        onChange={(event, item) => {
                                            //handleChangeSubCategory(item)
                                            handleChangeSubSegundaCategory(item)
                                            onChange(item)

                                        }
                                        }

                                        value={value}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                label="Seleccione el producto"
                                                error={!!errors.subcategoria2}
                                                helperText={errors.subcategoria2 && "Completa este campo"}
                                            //  required

                                            />
                                        )}


                                        getOptionLabel={(option: any) => option.SUB_CATEGORIA_2}


                                    />
                                )}
                            />

                        </Grid>

                        <Grid item xs={6} sm={6} md={3}>

                            <h5 style={{ margin: "5px" }}>Seleccione Fecha de entrega</h5>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DesktopDatePicker sx={{ width: '100%' }}
                                    defaultValue={dayjs()}
                                    minDate={dayjs()}
                               
                                    onChange={(newValue: Date) => { handleChangeDateFin(newValue) }}
                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}

                                />
                            </LocalizationProvider>


                        </Grid>



                        {/*<Grid item xs={12} sm={12} md={4}>
                        <Controller
                            name={'demofecha'}
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (

                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DesktopDatePicker


                                        //name={'demofecha'}
                                        //inputFormat="DD-MM-YYYY"
                                        value={value}
                                        onChange={(event) => { onChange(event); }}
                                        renderInput={(params: any) =>
                                            <TextField {...params}


                                                //   error={errors.demofecha}
                                                //     helperText={errors ? errors.demofecha?.message : null}
                                                error={!!error}
                                                helperText={error ? error.message : null}

                                            />
                                        }
                                    />
                                </LocalizationProvider>
                            )}



                            rules={{
                                required: {
                                    value: true,
                                    message: 'Completa este campo '
                                },
                            }}
                        />

                    </Grid>*/}


                        <Grid item xs={12} sm={12} md={9}>
                            <InputTextFieldCustomAcce
                                label={'Detalle del pedido extraordinario'}
                                control={control}
                                isRequired={true}
                                nameRegister={'detalle'}
                            />

                        </Grid>

                        <Grid item xs={12} sm={12} md={3}>
                            <FormGroup sx={{ width: '100%' }}>
                                <Typography variant="subtitle1" gutterBottom sx={{
                                    margin: 0, padding: 0, marginLeft: '3px',
                                    color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                                }}>
                                    ¿Se modificará el producto?
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





                    </Grid>
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {/*<Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    <ColorButton variant="contained" >Cerrar</ColorButton>
                    &nbsp; &nbsp;*/}
                        <ColorButton variant="contained" onClick={handleSubmit(onSubmit)} > Confirmar</ColorButton>



                        {/*  <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>*/}
                    </div>
                </div>
                {loading ? <KDImage /> : null}

            </Box>
        </Modal>
    )
}
