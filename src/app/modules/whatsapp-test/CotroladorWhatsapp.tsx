import { Autocomplete, InputAdornment, TextField, Typography, Button, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useControladorWhatsapp } from './services/useControladorWhatsapp';
import TablaUsuarios from './components/TablaUsuarios';
import TablaSessiones from './components/TablaSessiones';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import ConfigSwisse from '../../../core/api/ConfigSwisse';
import { KDImage } from '../../../core/modal-loading/KDImage';



const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
        backgroundColor: '#A31826',
    },
}));

const CotroladorWhatsapp = () => {

    const { loadApiGetUsuariosforWhastapp } = useControladorWhatsapp();
    const [ListUsaurios, setListUsaurios] = useState<any>([]);
    const [ListSessiones, setListSessiones] = useState<any>([])
    const [nombreSession, setNombreSession] = useState('')
    const [loading, setLoading] = useState(
        false
    );

    const urlApiWhatsapp = ConfigSwisse.urlApiWhatsapp;
    const [imagenBase64, setimagenBase64] = useState('https://w7.pngwing.com/pngs/395/283/png-transparent-empty-set-null-set-null-sign-mathematics-mathematics-angle-logo-number.png')

    const [numberPhone, setNumberPhone] = useState('');
    const [mensaje, setMensaje] = useState('');


    useEffect(() => {

        loadGetUsuariosforWhastapp();
        loadApiExternaSessiones();
    }, []);


    const loadGetUsuariosforWhastapp = async () => {
        try {
            const response = await loadApiGetUsuariosforWhastapp();
            console.log("response data ", response)
            if (response?.status && response?.usuarios) {
                setListUsaurios(response?.usuarios)
            }

        } catch (error) {

        }
    }


    const loadApiExternaSessiones = async () => {
        try {
            const responseSessiones = await axios.get(`http://localhost:3333/instance/list`);
            if (responseSessiones?.data) {
                setListSessiones(responseSessiones?.data?.data)
            }

        } catch (error) {

        }
    }



    //listas instancias 
    //GET http://localhost:3333/instance/list
    //crear instancia

    //GET http://localhost:3333/instance/init?key=romeo2
    //generar qr con instancia

    //show  base 64
    //GET http://localhost:3333/instance/qrbase64?key=tony

    // GET http://localhost:3333/instance/qr?key=romeo2


    const handleSeleccioneUsuario = async (value: any) => {
        console.log("value usuario ", value)


        const { NOMBRE_SESSION } = value
        //  setIdUsuario(id)
        setNombreSession(NOMBRE_SESSION);

        //recuperar el nombre de la sucursal

    }

    const crearSeesion = async () => {
        if (!nombreSession) {
            return;
        }
        try {
            const responseCreateInstace = await axios.get(`${urlApiWhatsapp}/instance/init?key=${nombreSession}`);
            console.log("response ", responseCreateInstace.data)

        } catch (error) {

        }

    }

    //habilitar codigo QR http://localhost:3333/instance/qr?key=Firmino


    const hablitarQrInstance = async () => {
        if (!nombreSession) {
            return;
        }

        var urlHabilitarCodigo = `${urlApiWhatsapp}/instance/qr?key=${nombreSession}`
        const a = document.createElement('a');
        //a.href = window.URL.createObjectURL(response.data);

        window.open(urlHabilitarCodigo);



    }

    const scannerCogido = async () => {
        if (!nombreSession) {
            return;
        }
        try {

            const responseBase64 = await axios.get(`${urlApiWhatsapp}/instance/qrbase64?key=${nombreSession}`);
            console.log("res base 64 ", responseBase64.data)
            setimagenBase64(responseBase64?.data?.qrcode)

        } catch (error) {

        }

    }

    /*metodos inputs  */
    const onChangePhone = (event: any) => {
        console.log("nombre numero de celular ", event.target.value)
        setNumberPhone(event.target.value)

    }
    const onChangeMensaje = (event: any) => {
        // /console.log("nombre numero de celular ", event.target.value)
        setMensaje(event.target.value)

    }


    const enviarMensajeTexto = async () => {
        console.log("nombre inst ", nombreSession)
        console.log("numero de celular", numberPhone)
        console.log("mensajae", mensaje)
        if (!nombreSession || !numberPhone || !mensaje) {
            return;
        }

        try {

            const responseMessageText = await axios.post(
                `${urlApiWhatsapp}/message/contact?key=${nombreSession}`,
                {
                    "number": numberPhone,
                    "message": mensaje
                }
            )

            console.log("res mensage", responseMessageText)


        } catch (error) {

        }


    }

    const [archivo, setArchivo] = useState('')


    const handleFileInputChange = async (e: any) => {
        console.log("archivo ", e.target.files[0]);

        setArchivo(e.target.files[0])



    };

    const enviarArchivo = async () => {

        if (!nombreSession || !numberPhone || !archivo) {
            return;
        }


        var file: any = archivo;

        if (!file) {
            return;
        }

        console.log("type file ", file.type)
        var typeFile = file.type;

        const identificador = `591${numberPhone}@s.whatsapp.net`;



        try {

            if (typeFile == "image/jpeg" || typeFile == "image/png" || typeFile == "image/jpg") {
                let formData = new FormData();
                formData.append('file', file);
                formData.append('id', identificador);
                formData.append('caption', 'test');

                setLoading(true)
                const responseMessageText = await axios.post(
                    `${urlApiWhatsapp}/message/image?key=${nombreSession}`,
                    formData
                )
                setLoading(false)

                console.log("res mensage", responseMessageText)
                return;

            }

            if (typeFile == "audio/mpeg") {
                let formData = new FormData();
                formData.append('file', file);
                formData.append('id', identificador);
                setLoading(true)
                const responseMessageText = await axios.post(
                    `${urlApiWhatsapp}/message/audio?key=${nombreSession}`,
                    formData
                )
                setLoading(false)

                console.log("res audio", responseMessageText)
                return;

            }


            if (typeFile == "video/mp4") {
                let formData = new FormData();
                formData.append('file', file);
                formData.append('id', identificador);
                formData.append('caption', 'test');
                setLoading(true)
                const responseMessageText = await axios.post(
                    `${urlApiWhatsapp}/message/video?key=${nombreSession}`,
                    formData
                )
                setLoading(false)

                console.log("res video", responseMessageText)
                return;

            }

            if (typeFile == "application/pdf"
                ||
                typeFile == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                || typeFile == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                let formData = new FormData();
                formData.append('file', file);
                formData.append('id', identificador);
                formData.append('caption', 'test');
                setLoading(true)
                const responseMessageText = await axios.post(
                    `${urlApiWhatsapp}/message/doc?key=${nombreSession}`,
                    formData
                )
                setLoading(false)

                console.log("res doc", responseMessageText)
                return;

            } else {
                alert("no existe el formato establecido")
            }



        } catch (error) {

        }
    }

    return (
        <div>
            {/*<h5>Tabla de usuarios</h5>
            <TablaUsuarios tableData={ListUsaurios} />*/}
            <h5>Crear Sesesion</h5>


            <Typography variant="subtitle1" gutterBottom sx={{
                marginLeft: '15px', color: '#666666',
                fontSize: '14px'
            }}>
                Seleccione Session
            </Typography>

            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

                <Grid item xs={12} sm={6} md={5}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 style={{ margin: "5px" }}>Selecione Usuario</h5>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={ListUsaurios}
                            noOptionsText={'Sin opciones'}
                            sx={{ width: '90%' }}
                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                            onChange={(event, value) =>
                                handleSeleccioneUsuario(value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="Seleccione la sucursal"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (<InputAdornment position="start"> <SearchIcon />
                                        </InputAdornment>),
                                        disableUnderline: true
                                    }}

                                />
                            )}
                            getOptionLabel={(option: any) => option.NOMBRE_SESSION}
                        />



                    </div>
                </Grid>




                <Grid item xs={12} sm={6} md={2} container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">

                    <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                        //onClick={() => loadPedidosExternosSuc()}
                        onClick={crearSeesion}
                    >Crear Session</ColorButton>
                </Grid>

            </Grid>



            <br />
            <ColorButton variant="contained" // sx={{ marginTop: '29px' }}

                onClick={hablitarQrInstance}
            >Hablitar Codigo Qr</ColorButton>
            <Button onClick={scannerCogido}>Mostrar Codigo QR</Button>

            <center>
                <img
                    //src={state.base64URL}
                    src={imagenBase64}
                    id="nuevaImagen"
                    className="img-thumbnail previsualizar"
                    alt="not found"
                    width="120px"
                />
            </center>
            <h1>Lista de Instancias</h1>
            <div>
                <TablaSessiones tableData={ListSessiones} />
            </div>

            <h1>Enviar mensajes </h1>

            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

                <Grid item xs={12} sm={3} md={3}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 style={{ margin: "5px" }}>Selecione Instaciona de Usuarios</h5>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={ListUsaurios}
                            noOptionsText={'Sin opciones'}
                            sx={{ width: '100%' }}
                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                            onChange={(event, value) =>
                                handleSeleccioneUsuario(value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="Seleccione la sucursal"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (<InputAdornment position="start"> <SearchIcon />
                                        </InputAdornment>),
                                        disableUnderline: true
                                    }}

                                />
                            )}
                            getOptionLabel={(option: any) => option.NOMBRE_SESSION}
                        />



                    </div>
                </Grid>


                <Grid item xs={12} sm={4} md={4}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 style={{ margin: "5px" }}> Escriba un mensaje</h5>
                        <TextField id="outlined-basic"
                            size='small'
                            sx={{ width: '100%' }}
                            label="Ingrese Telefono"
                            variant="outlined"
                            onChange={onChangeMensaje}
                            value={mensaje}
                        />
                    </div>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h5 style={{ margin: "5px" }}> ¿A que numero enviara el mensaje?</h5>
                        <TextField id="outlined-basic"
                            size='small'
                            sx={{ width: '100%' }}
                            label="Ingrese Telefono"
                            variant="outlined"
                            onChange={onChangePhone}
                            value={numberPhone}
                        />
                    </div>
                </Grid>


                <Grid item xs={12} sm={3} md={3} container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">

                    <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                        //onClick={() => loadPedidosExternosSuc()}
                        onClick={enviarMensajeTexto}
                    >Enviar mensaje</ColorButton>
                </Grid>

            </Grid>

            <div>
                <h1>Enviar archvios </h1>
                <input type="file" name="file" onChange={handleFileInputChange} />
            </div>

            <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                //onClick={() => loadPedidosExternosSuc()}
                onClick={enviarArchivo}
            >Enviar archivo</ColorButton>

            {loading ? <KDImage

            /> : null}


        </div>
    )
}

export default CotroladorWhatsapp