import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useArea } from '../services/useArea';
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


export const ModalDesactivarArea = (props:any) => {
    const { loadApiCambioEstado} = useArea()
    const {openModalEstadoDes,handleOpenModalEstadoDes ,handleCloseModalEstadoDes, ID_AREA,loadObtenerListaAreas} = props;


//cambiar estado de area
const loadDesactivar = async () => {
    handleCloseModalEstadoDes()
    try {
      const response = await loadApiCambioEstado(
        ID_AREA,
        "0"
      );
      console.log("res baja usuario ", response)
            //setLoading(false)
            if (response?.status) {
               
              await loadObtenerListaAreas()
              AlertSave({ title: "",  message: response.message });
  
  
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: "Error al Desactivar Area" })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: "Error al Desactivar Area" })
              }
      
  
    } catch (error) {
  
    }
  }

    return (
        <Modal
            open={openModalEstadoDes}
            //onClose={handleCloseModalEstadoDes}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                   ¿Esta seguro de Desactivar a la Area?
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadDesactivar} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalEstadoDes} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
            </Box>
        </Modal>
    )
}
