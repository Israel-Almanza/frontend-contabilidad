import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useAccesibilidad } from '../services/useAccesibilidad';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
//    width: '38%',
minWidth: 420,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


export const ModalBajaUsuario = (props:any) => {
    const { loadApiBajaUsuario} = useAccesibilidad()
    const {openModalBajaUsuario,handleOpenModalBajaUsuario ,handleCloseModalBajaUsuario, EMPLEADO,loadObtenerUsuarios} = props;

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);


//lista de perfiles
const loadBajaUsuario = async () => {
    handleCloseModalBajaUsuario()
    try {
      const response = await loadApiBajaUsuario(
        EMPLEADO
      );
      console.log("res baja usuario ", response)
            //setLoading(false)
            if (response?.status) {
               
              await loadObtenerUsuarios()
              AlertSave({ title: "",  message:"Se Ha dado de baja a un Usuario" });
  
  
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: "Error al dar Baja al Usuario" })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: "Error al dar Baja al Usuario" })
              }
      
  
    } catch (error) {
  
    }
  }

    return (
        <Modal
            open={openModalBajaUsuario}
            onClose={handleCloseModalBajaUsuario}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                   ¿Esta seguro de dar de baja al Usuario?
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadBajaUsuario} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalBajaUsuario} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
            </Box>
        </Modal>
    )
}
