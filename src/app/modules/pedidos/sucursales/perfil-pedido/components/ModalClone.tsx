import { Typography, Button, Collapse, TextField, Modal, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import ExplicitOutlinedIcon from '@mui/icons-material/ExplicitOutlined';


import FindInPageIcon from '@mui/icons-material/FindInPage';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AlertQuestion, AlertSave } from '../../../../../common/alerts/alerts';
import Swal from 'sweetalert2';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { styled } from "@mui/system";
import { usePerfilPedido } from '../services/usePerfilPedido';
import { KDImage } from '../../../../../../core/modal-loading/KDImage';
import { useParams } from "react-router-dom";



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




export const ModalClone = (props: any) => {


    const { idSucursal } = useParams()
    console.log("id sucursal dinamico ", idSucursal)

    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized,
        description, loadObtenerPerfilesSucursal,
        loadPerfilPedidoTempCloneSave
    } = props;

    const { loadApiObtenerPerfilesSucursal, loadApiClonarPerfilSucursal } = usePerfilPedido()


    const [nombrePerfil, setNombrePerfil] = useState<string>('')
    const [ListObtenerPerfilesUsaurio, setListObtenerPerfilesUsaurio] = useState<any>([]);

    const [ID_PERFILES, setID_PERFILES] = useState<number>(0)
    //loading
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        loadObtenerPerfilesSucursalInside()

    }, [idSucursal]);

    const onChangeNamePerfil = (event: any) => {
        console.log("nombre perfil ", event.target.value)
        setNombrePerfil(event.target.value)
        

    }

    const handleSeleccionePerfil = (value: any) => {
        console.log("Seleccione Pefil ", value)
        const { ID } = value
        setID_PERFILES(ID)
   
    }

    const handleClonePerfil = async () => {
        if (!nombrePerfil || !ID_PERFILES || !idSucursal) {
            closeModalResetForm()
            //alert("nombre de versil vacio")
            return;
        }
        try {
            localStorage.setItem('nombre_perfil_local',nombrePerfil);
            setLoading(true)
            const response = await loadApiClonarPerfilSucursal(nombrePerfil, ID_PERFILES, Number(idSucursal))
            setLoading(false)
            console.log("clone pefil  ", response)
            if (response?.status) {
                // AlertSave({ "","Se ha registrado un perfil de pedido"})
                closeModalResetForm()
                AlertSave({ title: "", message: "Se ha registrado un perfil de pedido" });
                await loadObtenerPerfilesSucursal()
                await  loadPerfilPedidoTempCloneSave(ID_PERFILES);
            } else {
                if (response?.status == false && response?.existe == true) {
                    // AlertSave({ "","Se ha registrado un perfil de pedido"})
                    closeModalResetForm()
                    AlertQuestion({ title: "", message: "Existe un perfil con el mismo nombre" })

                    //  await loadObtenerPerfilesSucursal()
                }
            }
        } catch (error) {
            console.log("error ", error)
            setLoading(false)
        }
    }


    const loadObtenerPerfilesSucursalInside = async () => {

        if (!idSucursal) {
            return
        }
        try {
            const response = await loadApiObtenerPerfilesSucursal(Number(idSucursal))
            console.log("list perfiles ", response)
            if (Array.isArray(response?.perfiles)) {
                setListObtenerPerfilesUsaurio(response?.perfiles)
            }
        } catch (error) {

        }

    }

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);



    const closeModalResetForm = () => {

        //reset({});
        // setDisableSubCategoryFrist(true)
        // setDisableSubCategorySecond(true)

        setNombrePerfil('')
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
                        fontWeight: 'bold',
                        marginLeft: '2%',//color:'white',

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
                <div style={{ margin:'10px' }}>
           
                        <div>
                            <h4 style={{ margin: "2px" }}>Nombre del Perfil:</h4>
                            <TextField id="outlined-basic"
                                size='small'
                                sx={{ width: '100%' }}
                                label="Ingrese Nombre"
                                variant="outlined"
                                onChange={onChangeNamePerfil}
                                value={nombrePerfil}
                            />

                        </div>
                        <div>
                            <h4 style={{ margin: "2px" }}>Perfil</h4>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={ListObtenerPerfilesUsaurio}
                                sx={{ width: '100%' }}
                                noOptionsText={"Sin opciones"}
                                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                onChange={(event, value) =>
                                    handleSeleccionePerfil(value)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione Pefil"

                                    />
                                )}
                                getOptionLabel={(option: any) => option?.TEXT}

                            />
                        </div>
                   
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleClonePerfil}> Clonar</ColorButton>

                    &nbsp; &nbsp;
                    <Button onClick={closeModalResetForm} sx={{
                        backgroundColor: '#6E7881',
                        '&:hover': {
                            backgroundColor: '#474849',
                        },

                    }} variant="contained" >Cancel</Button>

                </div>
                <br/>
                {loading ? <KDImage /> : null}

            </Box>
        </Modal>
    )
}
