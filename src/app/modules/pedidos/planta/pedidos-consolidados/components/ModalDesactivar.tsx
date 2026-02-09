import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { usePedidosConsolidados } from '../services/usePedidosConsolidados';
import { AlertError, AlertQuestion, AlertSave } from '../../../../../common/alerts/alerts';
import { KDImage } from '../../../../../../core/modal-loading/KDImage';

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
    p: 1,
};


export const ModalDesactivarSucursal = (props:any) => {
    const { loadApiCambiarEstado} = usePedidosConsolidados()
    const {openModalEstadoDes,handleOpenModalEstadoDes ,handleCloseModalEstadoDes, 
        CODIGO,SUFIJO,SucursalEstado,FechaCentral} = props;
//loading
const [loading, setLoading] = useState(
    false
  );

//cambiar estado de area
const loadDesactivar = async () => {
    console.log("Fecha ",FechaCentral)
    console.log("codigo ",CODIGO)
    console.log("sufujo ",SUFIJO)
    handleCloseModalEstadoDes()
    try {
        setLoading(true)
      const response = await loadApiCambiarEstado(
        FechaCentral,
        CODIGO,
        SUFIJO,
        "0"
      );
      console.log("res desactivar ", response)
            setLoading(false)
            if (response?.status) {
               
              await SucursalEstado(FechaCentral)
              //AlertSave({ title: "",  message: response.message });
  
  
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: "Error al Activar Sucursal" })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: "Error al Activar Sucursal" })
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
                    fontSize: '1.5rem', fontFamily:'Times New Roman'
                }}>
                   ¿Estás seguro?
                </Typography>
                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', 
                    fontSize: '1rem', fontFamily:'Times New Roman'
                }}>
                   Se bloqueará acceso de pedidos.
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadDesactivar} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalEstadoDes} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
                {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
}
