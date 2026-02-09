import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';


const Usuarios = [
  { label: 'Sergio', year: 1994 },
  { label: 'Ana', year: 1972 },
  { label: 'Maria Luna', year: 1974 },
  { label: 'Brenda Sanchez', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },

];

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '38%',
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


export const ModalPersonalized3 = (props:any) => {

    const {openModalPersonalized,handleOpenModalPersonalized ,handleCloseModalPersonalized,description} = props;

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);

    return (
        <Modal
            open={openModalPersonalized}
            onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 1, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                   {description}
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Fecha Inicial</h5>
                  <TextField
                    id="date"
                    label="Fecha Inicial"
                    type="date"
                    size="small"
                    defaultValue="hoy"
                    sx={{ width: '100%' }}

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Fecha Final</h5>
                  <TextField
                    id="date"
                    label="Fecha Final"
                    type="date"
                    size="small"
                    sx={{ width: '100%' }}
                    defaultValue="DD/MM/YYYY"

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Selecione Usuario</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Usuarios}

                    renderInput={(params: any) => <TextField {...params}
                      size="small"
                      sx={{ width: '100%' }}
                      label="Seleccione Usuario" />}
                  />
                </div>
                &nbsp; &nbsp;
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button sx={{ backgroundColor: '#43A047' }} variant="contained" >Si, Buscar</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    &nbsp; &nbsp;
                </div>
            </Box>
        </Modal>
    )
}
