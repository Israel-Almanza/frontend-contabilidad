import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useBorrarUsuario } from '../services/useBorrarUsuario';
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


export const ModalDeleteUsuario = (props:any) => {
    const { loadApiDeleteUsuario} = useBorrarUsuario()
    const {openModalDelete,handleOpenModalDelete ,handleCloseModalDelete, EMPLEADO,loadgetUsuariosconBaja} = props;

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);


//lista de perfiles
const loadDeleteUsuario = async () => {
    handleCloseModalDelete()
    try {
      const response = await loadApiDeleteUsuario(
        EMPLEADO
      );
      console.log("res eliminar usuario ", response)
            //setLoading(false)
            if (response?.status) {
               
              await loadgetUsuariosconBaja()
              AlertSave({ title: "",  message: response.message });
  
  
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: "Error al Eliminar Usuario" })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: "Error al Eliminar Usuario" })
              }
      
  
    } catch (error) {
  
    }
  }

    return (
        <Modal
            open={openModalDelete}
            onClose={handleCloseModalDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                   ¿Esta seguro de Eliminar al Usuario?
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadDeleteUsuario} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalDelete} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
            </Box>
        </Modal>
    )
}
