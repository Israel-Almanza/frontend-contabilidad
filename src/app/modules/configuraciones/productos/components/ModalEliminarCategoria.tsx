import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useProducto } from '../services/useProducto';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
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



export const ModalBorrarCategoria = (props:any) => {
    const { loadApiEliminarCategoria} = useProducto()
    const {openModalBorrarCategoria,handleOpenModalBorrarCategoria ,handleCloseModalBorrarCategoria, loadObtenerPrimeraCategoria, idPrimeraCat} = props;
//loading
const [loading, setLoading] = useState(
    false
);

//lista de perfiles
const loadBorrarCategoria = async () => {
   
    try {
        setLoading(true)
      const response = await loadApiEliminarCategoria(
        idPrimeraCat
      );
      console.log("res eliminar categoria ", response)
      handleCloseModalBorrarCategoria()
            setLoading(false)
            if (response?.status) {
               
              await loadObtenerPrimeraCategoria()
              AlertSave({ title: "",  message: response.message });
  
  
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: "Error al Eliminar Categoria" })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: "Error al Eliminar Categoria" })
              }
      
  
    } catch (error) {
  
    }
  }

    return (
        <Modal
            open={openModalBorrarCategoria}
            //onClose={handleCloseModalDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem', fontFamily: 'Times New Roman'
                }}>
                   ¿Esta seguro?
                </Typography>
                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', 
                    fontSize: '1rem', fontFamily: 'Times New Roman'
                }}>
                   Se Eliminará la Categoria Seleccionada
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadBorrarCategoria} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalBorrarCategoria} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
                <br/>
                {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
}
