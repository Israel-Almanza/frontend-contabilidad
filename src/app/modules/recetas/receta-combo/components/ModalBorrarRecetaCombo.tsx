import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import { useRecetaCombo } from '../services/useRecetaCombo';
import { KDImage } from '../../../../../core/modal-loading/KDImage';

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


export const ModalBorrarRecetaCombo = (props:any) => {
    const { loadApiBorrarElementoCombo} = useRecetaCombo()
    const {openModalDelete,handleOpenModalDelete ,handleCloseModalDelete, ID_V_M_COMBO,ID_PUNICO,loadBuscarReceta,pasarParametros} = props;

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);

     //loading
 const [loading, setLoading] = useState(
    false
  );

//eliminar receta
const loadDeleteReceta = async () => {
    handleCloseModalDelete()
    try {
        setLoading(true)
      const response = await loadApiBorrarElementoCombo(
        Number(ID_V_M_COMBO),
        Number(ID_PUNICO)
      );
      console.log("res eliminar receta ", response)
            setLoading(false)
            if (response?.status) {
               
              await pasarParametros()
              AlertSave({ title: "",  message: "Borrado Exitoso" });
  
  
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: "Error al Eliminar Receta" })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: "Error al Eliminar Receta" })
              }
      
  
    } catch (error) {
  
    }
  }

    return (
        <>
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
                   ¿Deseas Eliminar este Elemento de la Receta Combo?
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadDeleteReceta} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalDelete} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
            </Box>
        </Modal>
        {loading ? <KDImage /> : null}
        </>
    )
}
