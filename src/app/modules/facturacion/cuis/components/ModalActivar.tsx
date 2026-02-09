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


export const ModalActivarCuis = (props:any) => {
    const { loadApiActivarCuis} = useCuis()
    const {openModalEstadoA,handleOpenModalEstadoA ,handleCloseModalEstadoA, Id_Cuis ,loadObtenerListaCuis} = props;


//cambiar estado de area
const loadActivar = async () => {
    handleCloseModalEstadoA()
    try {
      const response = await loadApiActivarCuis(
        Id_Cuis
      );
      console.log("res baja llave ", response)
            //setLoading(false)
            if (response?.status) {
               
              await loadObtenerListaCuis()
              AlertSave({ title: "",  message: response.message });
  
  
            }
            if (response?.status == false) {
                AlertError({ title: '', message: response.message })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: response.message })
              }
      
  
    } catch (error) {
  
    }
  }

    return (
        <Modal
            open={openModalEstadoA}
            //onClose={handleCloseModalEstadoDes}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem', fontFamily: 'Times New Roman'
                }}>
                   ¿Esta seguro de Habilitar al CUIS?
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadActivar} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalEstadoA} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
            </Box>
        </Modal>
    )
}
