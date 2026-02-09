


import { Typography, Button, Collapse, TextField, Modal, FormGroup, Checkbox, Grid, FormControlLabel, InputAdornment, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import { styled } from "@mui/system";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers';


import dayjs from 'dayjs';
import { Controller, useForm } from "react-hook-form";
import { usePedidosExternos } from '../services/usePedidosExternos';

import { AlertSave, AlertError, AlertQuestion } from '../../../../common/alerts/alerts';
import TablaInsideModal from './TablaInsideModal';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { AlertToastWarning } from '../../../../common/alerts/alertsToast';
import { ToastContainer, toast } from 'react-toastify';
import { getDayFormat, getMonthFormat, getStringFechaInicial } from '../../../../../core/utils/DateFormat';


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '90%',
    // maxWidth:800,

    // minWidth: 440,
    overflow: 'scroll',
    height: '90%',
    //display: 'block',
    display: "block !important",
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

    const { loadApiSucursalesUsaurio,
        loadApiAreasProduccion,
        loadApiProductPedidosExternos,
        loadApiRegistrarPedidosExternos,
    } = usePedidosExternos();

    const [loading, setLoading] = useState(false);
    const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();
    const { errors } = formState;
    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized,
        description } = props;


    const [ListSucursalesUsaurio, setListSucursalesUsaurio] = useState<any>([])
    const [idSucursal, setidSucursal] = useState("");

    const [ListAreaProduccion, setListAreaProduccion] = useState<any>([])
    const [idCateogria, setIdCategoria] = useState("");

    const [ListProduct, setListProduct] = useState<any>([])




    const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)


    const [fechaDeEntrega, setFechaDeEntrega] = useState(() => getStringFechaInicial())

    useEffect(() => {
        // Update the document title using the browser API
        loadSucursalesUsaurio();
        loadAreasProduccion();

        //  loadSegundaSubCategoryInventory();
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

    const loadAreasProduccion = async () => {
        try {
            const response = await loadApiAreasProduccion();
            console.log("respuestaArea ", response)
            if (Array.isArray(response)) {
                setListAreaProduccion(response)
                //actulizar select
            }

        } catch (error) {
            console.log(error)
        }
    }


    const loadProductPedidosExtById = async (subcategoria1: number) => {
        try {
            setLoading(true)
            const response = await loadApiProductPedidosExternos(subcategoria1);
            setLoading(false)

            cleanLocalStorageRows()
            if (Array.isArray(response)) {

                setListProduct(response)
                //actulizar select
            }

        } catch (error) {
            setLoading(false)
        }
    }




    const onSubmit = async (dataForm: any) => {


        var total = 0;


        const productos = []

        for (let i = 0; i < ListProduct.length; i++) {


            if (dataForm[`CANTIDAD_${i}`] && dataForm[`COSTO_UNITARIO_${i}`]) {
                var newPar = {
                    "ID_SUB_CATEGORIA_2": (ListProduct[i].ID_SUB_CATEGORIA_2).toString(),
                    "CANTIDAD": dataForm[`CANTIDAD_${i}`],
                    "COSTO_UNITARIO": dataForm[`COSTO_UNITARIO_${i}`],
                    "DESCUENTO": (dataForm[`DESCUENTO_${i}`] == undefined ? 0 : dataForm[`DESCUENTO_${i}`]), //controlando si llega undefined
                    "ICE": (dataForm[`ICE_${i}`] == undefined ? 0 : dataForm[`ICE_${i}`]), //controlando si llega undefined
                    //"IVA": "14.00",//falta
                    "DURACION": (ListProduct[i].DURACION).toString(),//falta
                    "SUBTOTAL": dataForm[`SUBTOTAL_${i}`],//falta

                    "ID_AREA_PRODUCCION": (ListProduct[i].AREA_PRODUCCION).toString()

                }

                // total = total + Number(dataForm[`SUBTOTAL_${i}`]);
                productos.push(newPar)
            }

        }

        if (productos.length <= 0) {
            //No existen productos agregados.
            toast.warn("No existen productos agregados.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            //  AlertToastWarning({ message: 'No existen productos agregados.' })
            return;
        }






        const dataDemo = {
            "sucursal": "13",
            "area_produccion": "2",
            "numero_factura": "67",
            "fecha_factura": "2023-04-27",
            "total": "52",
            "productos": [
                {
                    "ID_SUB_CATEGORIA_2": "704",
                    "CANTIDAD": "2",
                    "COSTO_UNITARIO": "4",
                    "DESCUENTO": "0",
                    "ICE": "3",
                    "IVA": "8.00",
                    "DURACION": "20",
                    "SUBTOTAL": "11",
                    "ID_AREA_PRODUCCION": "2"
                }

            ]
        }

        try {
            setLoading(true)
            const response = await loadApiRegistrarPedidosExternos(idSucursal,//"13",
                dataForm.area_produccion, // "2",
                dataForm.numero_factura, // "67",
                fechaDeEntrega, //  "2023-04-27",
                // total.toString(),//"52",
                dataForm.total,
                productos
            )
            setLoading(false)
            // handleCloseModalPersonalized()
            closeModalResetForm();


            if (response.status) {
                AlertSave({ title: "", message: "Se Guardado Correctamente!" });
                return;
            }

            if (response?.status == false) {

                AlertQuestion({ title: '', message: 'No Se ha guardado ' })
                return;
            }

            if (response == undefined) {
                AlertError({ title: '', message: 'Algo salió mal' })
                return;
            }
        } catch (error) {
            console.log("error api", error)
        }


    }


    const handleChangeSucursal = (value: any) => {

        console.log("valor suc destino", value)
        const { ID_UBICACION } = value
        setidSucursal(ID_UBICACION)

        /*console.log("test sucursal", event.target.value);
        setidSucursal(event.target.value)*/
    };

    const handleChangeCategoria = (value: any) => {
        //console.log("test cateogira", event.target.value);
        const { ID_AREA_PRODUCCION } = value
        setIdCategoria(ID_AREA_PRODUCCION)
        loadProductPedidosExtById(ID_AREA_PRODUCCION);
        setDisableSubCategoryFrist(false)


        /*
         setIdCategoria(event.target.value)
         loadProductPedidosExtById(event.target.value);
         setDisableSubCategoryFrist(false)*/
    };





    const handleChangeDateFin = async (fecha: Date) => {

        fecha = new Date(fecha)

        //2023-04-24"
        const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
        //   console.log("format fecha fin ", auxFormatFecha)

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



    const cleanLocalStorageRows = () => {
        localStorage.removeItem(`DESCUENTO`)
        console.log("delete local storega de de form table")
        for (let i = 0; i < ListProduct.length; i++) {
            localStorage.removeItem(`CANTIDAD_${i}`);
            localStorage.removeItem(`COSTO_UNITARIO_${i}`);
            localStorage.removeItem(`ICE_${i}`);
            localStorage.removeItem(`DESCUENTO_${i}`);
            localStorage.removeItem(` SUBTOTAL_${i}`);
            //localStorage.setItem(`CANTIDAD_${i}`, `CANTIDAD_${index}`)
            //   localStorage.setItem(`COSTO_UNITARIO_${i}`, `COSTO_UNITARIO_${index}`)
        }
    }


    const closeModalResetForm = () => {

        reset({}); //reset values form
        setListProduct([]) //reset value table modal

        handleCloseModalPersonalized() // close modal
        cleanLocalStorageRows()

    }
    return (
        <Modal
            open={openModalPersonalized}
            // onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>


                {/*<button onClick={()=> console.log("get values ",getValues())}>Get Values</button>*/}
                <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: '#DC3545', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
                }}>

                    <Typography id="modal-modal-description" sx={{
                        mt: 1,
                        textAlign: 'center',
                        //fontWeight: 'bold',
                        marginLeft: '2%',
                        color: 'white',
                        fontSize: '0.9rem', //marginBottom: '10px'
                    }}>
                        Pedido Externo
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


                        <Grid item xs={12} sm={12} md={3}>
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
                                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                        onChange={(event, item) => {
                                            handleChangeSucursal(item)
                                            //    setListAreaProduccion([])
                                            onChange(item)
                                        }
                                        }

                                        value={value}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                label="Sucursal Destino"
                                                error={!!errors.sucursal}
                                                helperText={errors.sucursal && "Completa este campo"}
                                            />
                                        )}

                                        getOptionLabel={(option: any) => option.DESCRIPCION}
                                    />
                                )}
                            />
                            {/*
    <TextField
        id="outlined-select-gender"
        select
        label="Sucursal"
        //label={gender === "" ? "Seleccione una Opción" : ""}
        value={idSucursal}
        onChange={handleChangeSucursal}
        sx={{ width: '100%' }}
        // InputLabelProps={{ shrink: false }}


        SelectProps={{
            MenuProps: {

            },
        }}
        //   margin='normal'
        size="small"
        variant="outlined"

        inputProps={register('sucursal', {
            required: 'Completa este campo',
        })}
        error={errors.sucursal}
        helperText={errors ? errors.sucursal?.message : null}

    >
        {ListSucursalesUsaurio && ListSucursalesUsaurio?.map((option: any) => (
            <MenuItem key={option.ID_UBICACION} value={option.ID_UBICACION}

            >
                {option.DESCRIPCION}
            </MenuItem>
        ))}
    </TextField>*/}
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>

                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                            }}>
                                Seleccione
                            </Typography>

                            <Controller
                                control={control}
                                name="area_produccion"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (

                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={ListAreaProduccion}
                                        sx={{ width: '100%' }}
                                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                        onChange={(event, item) => {
                                            //  handleChangeSucursal(it)
                                            handleChangeCategoria(item)
                                            onChange(item)
                                        }
                                        }

                                        value={value}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                label="Seleccione una Opción"
                                                error={!!errors.area_produccion}
                                                helperText={errors.area_produccion && "Completa este campo"}
                                            />
                                        )}

                                        getOptionLabel={(option: any) => option.DESCRIPCION}
                                    />
                                )}
                            />

                            {/*
    <TextField
        id="outlined-select-gender"
        select
        label="Seleccione una Opción"
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

        inputProps={register('area_produccion', {
            required: 'Completa este campo',
        })}
        error={errors.area_produccion}
        helperText={errors ? errors.area_produccion?.message : null}

    >
        {ListAreaProduccion && ListAreaProduccion?.map((option: any) => (
            <MenuItem key={option.ID_AREA_PRODUCCION
            } value={option.ID_AREA_PRODUCCION}
            >
                {option.DESCRIPCION}
            </MenuItem>
        ))}
    </TextField>*/}

                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <InputTextFieldCustomAcce
                                label={'Número de factura'}
                                control={control}
                                isRequired={true}
                                nameRegister={'numero_factura'}
                            />

                        </Grid>



                        <Grid item xs={6} sm={6} md={3}>

                            <h5 style={{ margin: "5px" }}>Seleccione Fecha de entrega</h5>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker sx={{ width: '100%' }}
                                    defaultValue={dayjs()}
                                    format='DD/MM/YYYY'
                                    minDate={dayjs()}
                                    onChange={(newValue: Date) => { handleChangeDateFin(newValue) }}
                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}

                                />
                            </LocalizationProvider>


                        </Grid>


                    </Grid>

                    <TablaInsideModal tableData={ListProduct}
                        ListAreaProduccion={ListAreaProduccion}
                        control={control}
                        getValues={getValues}
                        setValue={setValue}
                        handleSubmit={handleSubmit}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                        <ColorButton variant="contained" onClick={handleSubmit(onSubmit)} > Guardar </ColorButton>




                    </div>
                </div>
                {loading ? <KDImage

                /> : null}
                <ToastContainer />

            </Box>

        </Modal>
    )
}
