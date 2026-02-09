import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useCuis } from '../services/useCuis';
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


export const ModalDesactivarCuis = (props:any) => {
    const { loadApiDesactivarCuis} = useCuis()
    const {openModalEstadoDes,handleOpenModalEstadoDes ,handleCloseModalEstadoDes, Id_Cuis,loadObtenerListaCuis} = props;


//cambiar estado de area
const loadDesactivar = async () => {
    handleCloseModalEstadoDes()
    try {
      const response = await loadApiDesactivarCuis(
        Id_Cuis
      );
      console.log("res baja usuario ", response)
            //setLoading(false)
            if (response?.status) {
               
              await loadObtenerListaCuis()
              AlertSave({ title: "",  message: response.message });
  
  
            }
            if (response?.status == false) {
                AlertError({ title: '', message: response.message })
      
      
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
                    fontSize: '1.5rem', fontFamily: 'Times New Roman'
                }}>
                   ¿Esta seguro de Inabilitar al CUIS?
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
