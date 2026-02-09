import React, { useState } from "react";
import { Typography, Button,  Modal } from '@mui/material'
import Box from '@mui/material/Box';


const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 350,
  maxWidth: 350,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  //border: '2px solid #000',
  boxShadow: 20,
  p: 2,
};

const ModalAlerta = (props:any) => {

  const { openModalAlerta, handleOpenModalAlerta, handleCloseModalAlerta, anular,handleSubmit } = props;

  return (
    <Modal
            open={openModalAlerta}
            onClose={handleCloseModalAlerta}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>



                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem', fontFamily: 'Times New Roman'
                }}>
                    ¿Estas Segur@?
                </Typography>
                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', 
                    fontSize: '1rem', fontFamily: 'Times New Roman'
                }}>
                    Estas por anular una factura, este no se podra recuperar mas adelante.
                </Typography>
                
                <br />
                
                <div  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={handleSubmit(anular)}  sx={{ backgroundColor: '#DD6B55' }} variant="contained" >Continuar</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalAlerta} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>
                </div>
            </Box>
        </Modal>
  );
};

export default ModalAlerta;
