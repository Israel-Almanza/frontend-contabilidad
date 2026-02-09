import { Typography, Button, Collapse, TextField, Modal, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'



import Box from '@mui/material/Box';


import { AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { styled } from "@mui/system";
import { useCronogramaEntregaService } from '../services/useCronogramaEntregaService';
//import { usePerfilPedido } from '../services/usePerfilPedido';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { Controller, useForm } from "react-hook-form";



import { getStringFechaInicial,getDayFormat,getMonthFormat } from '../../../../../core/utils/DateFormat';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
        backgroundColor: '#A31826',
    },
}));

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '38%',
    minWidth: 370,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 2,
};


export const ModalAddCronoEntrega = (props: any) => {




    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized,
        description,  loadObtenerCronogramasByFecha   } = props;

    const {
        //loadApiObtenerPerfilesSucursal, loadApiClonarPerfilSucursal
        loadApiSucursales, loadApiInventariosTurno, loadApiNuevoCronogramaEntrega
    } = useCronogramaEntregaService()

    const { formState, handleSubmit, control, register, reset, getValues } = useForm();
    const { errors } = formState;

   
    const [ListSucursales, setListSucursales] = useState<any>([]);
    const [ListTurno, setListTurno] = useState<any>([]);

    //loading
    const [loading, setLoading] = useState(false);

    const [fechaDeEntrega, setFechaDeEntrega] = useState(() => getStringFechaInicial())

    useEffect(() => {

        loadSucursales()
        loadInventariosTurno();


    }, []);

 

    const handleChangeDateFin = async (fecha: Date) => {

        fecha = new Date(fecha)

        //2023-04-24"
        const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
        console.log("format fecha fin ", auxFormatFecha)

        setFechaDeEntrega(auxFormatFecha)
        //loadDataVentaParmaters(ITEM, auxFormatFecha)
        //la a la api cada vez que cambiar al backend

    };

    


    const loadSucursales = async () => {


        try {
            const response = await loadApiSucursales()
            console.log("list sucursales ", response)
            if (Array.isArray(response?.sucursales)) {
                setListSucursales(response?.sucursales)
            }
        } catch (error) {

        }

    }

    const loadInventariosTurno = async () => {


        try {
            const response = await loadApiInventariosTurno()
            console.log("list turno ", response)
            if (Array.isArray(response?.turnos)) {
                setListTurno(response?.turnos)
            }
        } catch (error) {

        }

    }

    const onSubmit = async (dataForm: any) => {
        console.log("enviando datos ", dataForm)
        var sucursal = dataForm.sucursal.SUCURSAL
        var turno = dataForm.turno.ID_TURNO;
        if (sucursal && turno) {
            console.log("puedes guardar datos")

            
            setLoading(true)
            const response = await loadApiNuevoCronogramaEntrega(sucursal, turno,fechaDeEntrega);
            console.log("response save ", response)
            setLoading(false)
        
            if (response?.status &&  response?.message) {
                // AlertSave({ "","Se ha registrado un perfil de pedido"})
                closeModalResetForm()
                //var fecha= getStringFechaInicial()
                await loadObtenerCronogramasByFecha(getStringFechaInicial())
                AlertSave({ title: "", message: response?.message });
               
            } else {
                if (response?.status == false && response?.message ) {
                    // AlertSave({ "","Se ha registrado un perfil de pedido"})
                    closeModalResetForm()
                    AlertQuestion({ title: "", message: response?.message })
//await loadObtenerCronogramasByFecha()
                    //  await loadObtenerPerfilesSucursal()
                }
            }
        }


    }

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);



    const closeModalResetForm = () => {

        reset({});
        // setDisableSubCategoryFrist(true)
        // setDisableSubCategorySecond(true)

        //   setNombrePerfil('')
        handleCloseModalPersonalized()
    }


    const AutocompleteCustom = ({ control, isRequired = false, nameRegister,
        isDisable, List, label, customOption, titleSelect }: any) => {
   


        return (

            <>
                <h4 style={{ margin: "2px" }}>{titleSelect}</h4>
                <Controller
                    control={control}
                    name={nameRegister}
                    rules={{ required: isRequired }}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={List}
                            sx={{ width: '100%' }}
                            noOptionsText={"Sin opciones"}
                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                            onChange={(event, item) => {
                                // handleSeleccionePerfil(item)
                                onChange(item)
                            }
                            }
                            value={value}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label={label}
                                    error={!!errors[nameRegister]}
                                    helperText={errors[nameRegister] && "Completa este campo"}

                                />
                            )}
                            getOptionLabel={(option: any) => option[customOption]}

                        />
                    )}
                />
            </>
        )
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
                        {description}
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



                <br />
                <div style={{ margin: '10px' }}>

                    {/* <div>
                        <h4 style={{ margin: "2px" }}>Nombre del Perfil:</h4>
                        <TextField id="outlined-basic"
                            size='small'
                            sx={{ width: '100%' }}
                            label="Ingrese Nombre"
                            variant="outlined"
                            onChange={onChangeNamePerfil}
                            value={nombrePerfil}
                        />

                    </div>*/}
                    <div>

                        <AutocompleteCustom
                            isDisable={false}
                            label="Seleccione Sucursal"
                            control={control}
                            isRequired={true}
                            titleSelect={"Sucursal"}
                            nameRegister={`sucursal`}
                            List={ListSucursales}
                            customOption={"DESCRIPCION"}
                        />
                        {/*<Controller
                            control={control}
                            name="sucursal"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={ListSucursales}
                                    sx={{ width: '100%' }}
                                    noOptionsText={"Sin opciones"}
                                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                    onChange={(event, item) => {
                                        // handleSeleccionePerfil(item)
                                        onChange(item)
                                    }
                                    }
                                    value={value}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            label="Seleccione Sucursal"
                                            error={!!errors.sucursal}
                                            helperText={errors.sucursal && "Completa este campo"}

                                        />
                                    )}
                                    getOptionLabel={(option: any) => option?.DESCRIPCION}

                                />
                            )}
                                    />*/}
                    </div>

                    <div>
                        <AutocompleteCustom
                            isDisable={false}
                            label="Seleccione Turno"
                            control={control}
                            isRequired={true}
                            titleSelect={"Turno"}
                            nameRegister={`turno`}
                            List={ListTurno}
                            customOption={"TURNO"}
                        />


                    </div>
                    <h5 style={{ margin: "5px" }}>Seleccione Fecha de entrega</h5>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DesktopDatePicker sx={{ width: '100%' }}
                            defaultValue={dayjs()}
                            minDate={dayjs()}
                            //maxDate={dayjs()}
                            //  minDate={dayjs(getRestarDateCurrent())}
                            // maxDate={dayjs()}
                            onChange={(newValue: Date) => { handleChangeDateFin(newValue) }}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}

                        />
                    </LocalizationProvider>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" //onClick={handleClonePerfil}
                        onClick={handleSubmit(onSubmit)}
                    >Confirmar</ColorButton>

                    &nbsp; &nbsp;
                    <Button onClick={closeModalResetForm} sx={{
                        backgroundColor: '#6E7881',
                        '&:hover': {
                            backgroundColor: '#474849',
                        },

                    }} variant="contained" >Cerrar</Button>

                </div>
                <br />
                {loading ? <KDImage /> : null}

            </Box>
        </Modal>
    )
}