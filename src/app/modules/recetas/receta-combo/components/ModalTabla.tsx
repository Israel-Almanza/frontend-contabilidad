


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

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TablaRecetaCombo from '../TablaRecetaCombo';

import Demo from './Demo';
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


export const ModalTabla = (props: any) => {

    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized, description } = props;

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


             <Demo/>
              {/*  <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                    {description}
                </Typography>*/}
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}
