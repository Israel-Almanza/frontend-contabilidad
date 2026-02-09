


import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'

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

import { styled } from "@mui/system";
import { usePerfilPedido } from '../services/usePerfilPedido';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { AlertSave, AlertError, AlertQuestion } from '../../../../../common/alerts/alerts';
import { KDImage } from '../../../../../../core/modal-loading/KDImage';
import { useParams } from "react-router-dom";
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
  //  p: 2,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
        backgroundColor: '#A31826',
    },
}));

export const ModalSave = (props: any) => {

    const { loadApiNuevoPerfilSucursal } = usePerfilPedido()

    const { idSucursal } = useParams()
    console.log("id sucursal dinamico ", idSucursal)

    const { openModalPersonalized, handleOpenModalPersonalized,
        handleCloseModalPersonalized, description, loadObtenerPerfilesSucursal,
        loadPerfilPedidoTempCloneSave } = props;

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);
    const [nombrePerfil, setNombrePerfil] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );



    const onChangeNamePerfil = (event: any) => {
        console.log("nombre perfil ", event.target.value)
        setNombrePerfil(event.target.value)

    }

    const handleSavePerfil = async () => {
        if (!nombrePerfil && !idSucursal) {
            //alert("nombre de versil vacio")
            closeModalResetForm()
            return;
        }
        try {
            localStorage.setItem('nombre_perfil_local',nombrePerfil);
            setLoading(true)
            const response:any = await loadApiNuevoPerfilSucursal(nombrePerfil,Number(idSucursal))
            console.log("save pefil ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerPerfilesSucursal()
                AlertSave({ title: "", message: "Se ha registrado un perfil de pedido" });
                if(response?.id){
                    await  loadPerfilPedidoTempCloneSave(response?.id); 
                }
            }
            if (response?.status == false) {
                closeModalResetForm()
                AlertQuestion({ title: '', message: 'El perfil ya Existe' })
        
        
              }
        
              if (response?.status == undefined) {
                closeModalResetForm()
                AlertError({ title: '', message: response.message })
              }


        } catch (error) {
            console.log("error ", error)
            setLoading(false)
        }
    }








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
            // onClose={handleCloseModalPersonalized}
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

               
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSavePerfil}> Crear</ColorButton>

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
