import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useProductosInventario } from '../services/useProductoInventario';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
//    width: '38%',
minWidth: 380,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export const ModalBorrarSubCategoriaInventario = (props:any) => {
    const { loadApiEliminarSubCategoriaInventario} = useProductosInventario()
    const {openModalBorrarSubCategoriaINV,handleOpenModalBorrarSubCategoriaINV ,handleCloseModalBorrarSubCategoriaINV, loadObtenerSubCategoria, idSubCategoria, estado} = props;
//loading
const [loading, setLoading] = useState(
    false
);

//lista de perfiles
const loadBorrarSubCategoria = async () => {
   
    try {
        setLoading(true)
      const response = await loadApiEliminarSubCategoriaInventario(
        idSubCategoria,
        "0"
      );
      console.log("res eliminar categoria ", response)
      handleCloseModalBorrarSubCategoriaINV()
            setLoading(false)
            if (response?.status) {
               
              await loadObtenerSubCategoria()
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
            open={openModalBorrarSubCategoriaINV}
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
                   Se Eliminará la SubCategoria Seleccionada
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadBorrarSubCategoria} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalBorrarSubCategoriaINV} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
                <br/>
                {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
}
