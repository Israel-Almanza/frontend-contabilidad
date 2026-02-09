
import Swal from 'sweetalert2';

import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import ExplicitOutlinedIcon from '@mui/icons-material/ExplicitOutlined';


import FindInPageIcon from '@mui/icons-material/FindInPage';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import Autocomplete from '@mui/material/Autocomplete';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Usuarios = [
  { label: 'CORTE DEL SERVICIO DE INTERNET', year: 1994 },
  { label: 'INACCESIBILIDAD AL SERVICIO WEB DE LA ADMINISTRACION TRIBUTARIA', year: 1972 },
  { label: 'INGRESO A ZONAS SIN INTERNET POR DESPLIEGUE DE PUNTO DE VENTA EN VEHICULOS AUTOMOTORES', year: 1974 },
  { label: 'VENTAS EN LUGARES SIN INTERNET', year: 2008 },
  { label: 'CORTE DE SUMINISTRO DE ENERGIA ELECTRICA', year: 1957 },
  { label: "VIRUS INFORMATICO O FALLA DE SOFTWARE", year: 1993 },
  { label: 'CAMBIO DE INFRAESTRUCTURA DEL SISTEMA INFORMATICO DE FACTURACION O FALLA DE HARDWARE', year: 1994 },

];

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '28%',
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


export const ModalPersonalized = (props:any) => {

    const {openModalPersonalized,handleOpenModalPersonalized ,handleCloseModalPersonalized,description} = props;

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const AlertaGuardar = () => {
      Swal.fire(
        'GUARDADO!',
        'Se ha Guardado el Perfil!',
        'success'
      )
    }

    return (
        <Modal
            open={openModalPersonalized}
            onClose={handleCloseModalPersonalized}
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Selecione Evento Significativo</h5>
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
                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Fecha Inicio</h5>
                  <TextField
                    id="date"
                    label="Fecha inicio"
                    type="date"
                    size="small"
                    sx={{ width: '110%' }}
                    defaultValue="DD/MM/YYYY"

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Fecha Vencimiento</h5>
                  <TextField
                    id="date"
                    label="Fecha Vencimiento"
                    type="date"
                    size="small"
                    sx={{ width: '110%' }}
                    defaultValue="DD/MM/YYYY"

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                &nbsp; &nbsp;
                &nbsp; &nbsp;
                &nbsp; &nbsp;
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Hora Inicio</h5>
                  <TextField
                    id="time"
                    label="Hora Inicio"
                    type="time"
                    size="small"
                    sx={{ width: '150%' }}
                    defaultValue="DD/MM/YYYY"

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Hora Fin</h5>
                  <TextField
                    id="time"
                    label="Hora Fin"
                    type="time"
                    size="small"
                    sx={{ width: '150%' }}
                    defaultValue="DD/MM/YYYY"

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                </div>
                <br/>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                    <Button sx={{ backgroundColor: '#008000' }} variant="contained" onClick={AlertaGuardar}>Crear</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}
