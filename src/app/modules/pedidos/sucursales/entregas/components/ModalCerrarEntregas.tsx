import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import Box from '@mui/material/Box';

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


export const ModalCerrarEntregas = (props:any) => {

    const {openModalCerrar,handleOpenModalCerrar ,handleCloseModalCerrar,description,handlePadLock} = props;

    return (
        <Modal
            open={openModalCerrar}
            onClose={handleCloseModalCerrar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                   {description}
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button sx={{ backgroundColor: '#7066E0' }} variant="contained" onClick={() => handlePadLock()}>Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalCerrar} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    &nbsp; &nbsp;
                </div>
            </Box>
        </Modal>
    )
}
