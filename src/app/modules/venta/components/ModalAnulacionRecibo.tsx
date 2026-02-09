import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import AplicationConnect from '../../../../core/api/AplicationConnect';
import Swal from "sweetalert2";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 420,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalAnulacionRecibo = (props: any) => {

    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized, description, tableData, ID_VENTA } = props;
    const { idSucursal } = useParams()
    
    const loadAnulacionRecibo = async () => {

       
        try {
          const response = await AplicationConnect.post<any>(`/AnulacionVentaRecibo`, {
            "sucursal": idSucursal,
            "venta": ID_VENTA,
            "detalle_anulacion": "Se anula el recibo"
         })
          handleCloseModalPersonalized()
          console.log("resuesta de api:** ", response.data)
          Swal.fire(
            response.data.message,
            'Su archivo ha sido Cancelado.',
            'success'
          )
        } catch (error) {
  
        }
  
      }

    return (
        <Modal
            open={openModalPersonalized}
            //onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
            
             
               <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                    ¿Estas Seguro/a?
                </Typography>
                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1rem'
                }}>
                   Estás por anular un recibo, este no se podrá recuperar más adelante.
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button sx={{ backgroundColor: '#DD6B55' }} variant="contained" onClick={() => loadAnulacionRecibo()}>Continuar</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}
