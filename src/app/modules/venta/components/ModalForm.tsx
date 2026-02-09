import { Typography, Button, Collapse, TextField, Modal, Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import AplicationConnect from '../../../../core/api/AplicationConnect';
import QrReader from "react-qr-reader";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { BiQrScan } from "react-icons/bi";
import { ModalQR } from './ModalQR';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import ModalAlerta from './ModalAlerta';
import { AlertToastWarning } from '../../../common/alerts/alertsToast';
import { ToastContainer, toast } from 'react-toastify';
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import Swal from 'sweetalert2';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 320,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 3,
};



export const ModalForm = (props: any) => {
    const { handleSubmit, control, reset,setValue, getValues } = useForm();
    const { idSucursal } = useParams()
    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized,
        ID_VENTA, CODIGO_CUF, dato, listaVenta, fechaInicio } = props;

    //loading
    const [loading, setLoading] = useState(
        false
    );

    const [ID_ANULACION, setID_ANULACION] = useState<number>(0)
    const [NombreAnulacionTemp, setNombreAnulacionTemp] = useState('')
    const [lista, setLista] = useState<any>([])

    //modal QR
    //<---modal
    const [openModalQR, setOpenModalQR] = useState(false);

    const handleOpenModalQR = () => setOpenModalQR(true);
    const handleCloseModalQR = () => setOpenModalQR(false);

    //<---modal de alerta de eliminacion de factura
    const [openModalAlerta, setOpenModalAlerta] = useState(false);

    const handleOpenModalAlerta = () => setOpenModalAlerta(true);
    const handleCloseModalAlerta = () => setOpenModalAlerta(false);

    const [test, setTest] = React.useState([]);

    useEffect(() => {
        console.log("aaa ", dato)
        setTest(dato)
    }, [test]);


    const [startScan, setStartScan] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false);
    const [dataQ, setDataQ] = useState("");

    const [camposRequeridos, setCamposRequeridos] = useState<any>({
        req2: false,
        req3: true,
        req4: false
    })

    const handleScan = async (scanData: any) => {
        setLoadingScan(true);
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "") {
            console.log(`loaded >>>`, scanData);
            setDataQ(scanData);
            setValue("qr_factura",scanData)
            setStartScan(false);
            setLoadingScan(false);
            // setPrecScan(scanData);
        }
    };
    const handleError = (err: any) => {
        console.error(err);
    };


    const [dataSelect, setDataSelect] = useState<any>([]);
    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        loadDataAnulacion()
        // testAxios();
    }, []);

    //datos para el motivo de anulacion
    const loadDataAnulacion = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/motivosAnulacion', {

            })

            //console.log("resAnulacionTabla +++++++++++", respuesta.data)
            setDataSelect(respuesta.data)
            setLista(respuesta.data)
            console.log("lista de anulacion ", respuesta.data)
        } catch (error) {

        }
    }



    const onSubmit = async (data: any) => {

        console.log(" data ", data)
        console.log("id motivo anulacion ", ID_ANULACION)
        console.log("nom motivo anulacion ", NombreAnulacionTemp)
        console.log("qr ",dataQ)
        //const {detalle_anulacion}=data;
        
        //alertaEliminar()

        //llamar a la api y enviar datos
        if(ID_ANULACION == 0 ){
            AlertToastWarning({ message: "Seleccione Motivo Anulacion" })
            handleCloseModalAlerta()
        }else{
            //console.log("hay campos que estan llenos")
            handleCloseModalPersonalized()
            handleCloseModalAlerta()
        try {
            setLoading(true)
            const respuesta = await AplicationConnect.post<any>('/AnulacionVentaFactura', {
                "sucursal": idSucursal,
                "venta": ID_VENTA,
                "cuf": CODIGO_CUF,
                // codigo_motivo : 'valor',
                // texto_motivo: 'DESCRIPCION',
                "codigo_motivo": ID_ANULACION,
                "texto_motivo": NombreAnulacionTemp,
                "factura_reemplazo": data.texto_motivo,
                "qr_factura": data.qr_factura,
                "detalle_anulacion": data.detalle_anulacion
            })
            //handleCloseModalPersonalized() respuesta.data.message
            closeModalResetForm()
            console.log("respuestaDEanulacion ", respuesta.data)
            setDataSelect(respuesta.data)
            setLoading(false)
            if (respuesta.data?.status) {
                await listaVenta(idSucursal, fechaInicio)
                AlertSave({ title: "", message: respuesta.data.message });

            }
            if (respuesta.data?.status == false) {
                AlertQuestion({ title: '', message: 'No Se ha guardado ' })


            }

            if (respuesta.data == undefined) {
                AlertError({ title: '', message: respuesta.data.message })
            }

        } catch (error) {
            Swal.fire(
                data.message,
                '',
                'info'
            )
        }

    }


        {/*  try {
                     const respuesta = await AplicationConnect.post<any>('/AnulacionVentaFactura', {
                         "sucursal": idSucursal,
                        "venta": ID_VENTA,
                         "cuf" : CODIGO_CUF,
                        // codigo_motivo : 'valor',
                        // texto_motivo: 'DESCRIPCION',
                         "codigo_motivo" : data.codigo_motivo,
                         "texto_motivo": "FACTURA MAL EMITIDA",
                         "factura_reemplazo" : data.texto_motivo,
                         "qr_factura" : data.qr_factura,
                         "detalle_anulacion" : data.detalle_anulacion
                     })
                     //handleCloseModalPersonalized()

                     console.log("respuestaDEanulacion ", respuesta.data)
                     //setDataSelect(respuesta.data)
                     Swal.fire(
                         respuesta.data.message,
                         'La factura fue cancelada.',
                         'success'
                       )

                 } catch (error) {

                 } */}
    }

    const AutoCompletableCustom = () => {

        const handleSeleccionePerfil = (value: any) => {
            console.log("Seleccione Anulacion** ", value)
            const { CODIGO, DESCRIPCION } = value
            setID_ANULACION(CODIGO)
            setNombreAnulacionTemp(DESCRIPCION)
        }

        return (
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={lista}
                sx={{ width: '100%' }}
                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                onChange={(event, value) =>
                    handleSeleccionePerfil(value)
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        label="Seleccione Motivo de Anulacion"

                    />
                )}


                getOptionLabel={(option: any) => option.DESCRIPCION}


            />

        )
    }

    const closeModalResetForm = () => {

        reset({});
        setID_ANULACION(0)

        handleCloseModalPersonalized()
        //data('')
    }



    return (
        <>
            <Modal
                open={openModalPersonalized}
                onClose={handleCloseModalPersonalized}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={styleModal}>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#DC3545'
                    }}>
                        <Typography id="modal-modal-description" sx={{
                            mt: 1, textAlign: 'left', marginLeft: '3%',
                            fontSize: '1.2rem', fontFamily: 'Times New Roman', color: 'white'
                        }}>
                            Anular Factura
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

                    {/* {readQr()} */}

                    <div style={{ margin:'18px' }}>
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Seleccione el Motivo de Anulación</h6>

                        </div>

                        {AutoCompletableCustom()}


                    </div>

                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h6 style={{ padding: '0px', margin: '0px', marginBottom: '3px', fontSize: '12px' }}>N° Factura de reemplazo</h6>

                        </div>
                        <Controller
                            name={"factura_reemplazo"}
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField id="outlined-basic" label="Numero de factura de reemplazo"
                                    variant="outlined" sx={{
                                        width: '100%',
                                    }}
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    size="small"

                                    onBlur={() => {
                                        console.log("blurrrrrr")
                                        //caso 1 si campo 2 esta con datos
                                        // handleSubmit(() => { })()
                                        var cad = getValues('factura_reemplazo')
                                        if(cad.length > 0){
                                            setCamposRequeridos({
                                                req2: true,
                                                req3: true,
                                                req4: false
                                            })
                                        }else{
                                             //caso 2 si campo 2 esta vacios
                                        // handleSubmit(() => { })()
                                        setCamposRequeridos({
                                            req2: false,
                                            req3: true,
                                            req4: true
                                        })
                                        }
                                        

                                            
                                    }}


                                />
                            )}
                            //rules={{ required: true}}
                            rules={{
                                required: {
                                    value: camposRequeridos.req2,
                                    message: 'Completa este campo '
                                }
                            }}
                        />



                    </div>


                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h6 style={{ padding: '0px', margin: '0px', marginBottom: '3px', fontSize: '12px' }}>QR Factura</h6>
                            {/* <Button sx={{color: 'black'}} onClick={handleOpenModalQR}><BiQrScan/></Button> */}
                            <Button sx={{ color: 'black' }}
                                onClick={() => {
                                    setStartScan(!startScan);
                                }}>
                                {startScan ? <BiQrScan /> : <BiQrScan />}
                            </Button>
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
                            
                        </div>
                        <Controller
                            name={"qr_factura"}
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField id="outlined-basic" //label="QR de la factura"
                                    variant="outlined" sx={{
                                        width: '100%',
                                    }}
                                    value={value}
                                    //value={dataQ}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    size="small"

                                />
                            )}

                            rules={{
                                required: {
                                    value: camposRequeridos.req3,
                                    message: 'Completa este campo '
                                }
                            }}
                        />



                    </div>


                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h6 style={{ padding: '0px', margin: '0px', marginBottom: '3px', fontSize: '12px' }}>Detalle de Anulación</h6>

                        </div>
                        <Controller
                            name={"detalle_anulacion"}
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField id="outlined-basic" label="Detalle de Anulacion"
                                    variant="outlined" sx={{
                                        width: '100%',
                                    }}
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    size="small"
                                    multiline
                                    rows={4}

                                    onBlur={() => {
                                        console.log("blurrrrrr")
                                        //caso 1 si campo 2 esta con datos
                                        // handleSubmit(() => { })()
                                        var cad2 = getValues('detalle_anulacion')
                                        if(cad2.length > 0){
                                            setCamposRequeridos({
                                                req2: false,
                                                req3: true,
                                                req4: true
                                            })
                                        }else{
                                             //caso 2 si campo 2 esta vacios
                                        // handleSubmit(() => { })()
                                        setCamposRequeridos({
                                            req2: true,
                                            req3: true,
                                            req4: false
                                        })
                                        }
                                        

                                            
                                    }}

                                />
                            )}
                            //rules={{ required: true}}
                            //rules={{ required: 'Completa este campo' }}

                            rules={{
                                required: {
                                    value: camposRequeridos.req4,
                                    message: 'Completa este campo '
                                }
                            }}
                        />



                    </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {/*<Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>*/}
                        &nbsp; &nbsp;
                        <Button sx={{ backgroundColor: '#DC3741' }}
                            //onClick={handleSubmit(onSubmit)}
                            onClick={handleSubmit(handleOpenModalAlerta)}

                            variant="contained" >Anular</Button>&nbsp;&nbsp;

                    </div>
                    <br/>
                </Box>
            </Modal>

            {loading ? <KDImage /> : null}
            <ToastContainer />

            <ModalQR
                openModalQR={openModalQR}
                handleOpenModalQR={handleOpenModalQR}
                handleCloseModalQR={handleCloseModalQR}
            />

            <ModalAlerta
                anular={onSubmit}
                handleSubmit={handleSubmit}
                openModalAlerta={openModalAlerta}
                handleOpenModalAlerta={handleOpenModalAlerta}
                handleCloseModalAlerta={handleCloseModalAlerta}
            />

        </>

    )

}

