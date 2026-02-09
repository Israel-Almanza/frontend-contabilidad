


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
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { ModalHead } from '../../../../../common/accessories/modals';



const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: '38%',
  //minWidth: 420,
  minWidth: 370,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  //border: '2px solid #000',
  boxShadow: 24,
  //p: 1,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


export const ModalBuscar = (props: any) => {




  const { openModalPersonalized, handleOpenModalPersonalized, resetValues,
    handleBuscarPerfil,
    handleCloseModalPersonalized, description, componentRender } = props;


  //const [openModal, setOpenModal] = useState(false);
  //const handleOpenModal = () => setOpenModal(true);
  //const handleCloseModal = () => setOpenModal(false);
  const closeModalResetForm = () => {

    //reset({});
    // setDisableSubCategoryFrist(true)
    // setDisableSubCategorySecond(true)
    resetValues()
    handleCloseModalPersonalized()
  }


  return (
    <Modal
      open={openModalPersonalized}
      // onClose={handleCloseModalPersonalized}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>



     
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          backgroundColor: '#DC3545', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
        }}>

          <Typography id="modal-modal-description" sx={{
            mt: 1,
            textAlign: 'center',
            //fontWeight: 'bold',
            marginLeft: '2%',
            color:'white',
            fontSize: '0.9rem', //marginBottom: '10px'
          }}>
            {description}
          </Typography>
          <Button onClick={() => closeModalResetForm()}
            sx={{
              color: 'black',
              ':hover': {
                color: 'white'
              }
            }}
          >
            <CancelPresentationIcon
            />
          </Button>
        </div>

        <br />
        <div style={{ marginLeft: '3%', marginRight: '3%' }}>
          {componentRender}
        </div>

        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <TextField
            id="outlined-select-gender"
            select
            label="Perfil de Pedido"
            size="small"
            value={gender}
            onChange={handleChange}
            sx={{ width: '100%' }}
            //InputLabelProps={{ shrink: false }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          >
            {genders.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>*/}
        <br />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Button sx={{ backgroundColor: '#7066E0' }} variant="contained"
            onClick={handleBuscarPerfil}
          >Si, Buscar</Button>
          &nbsp; &nbsp;
          <Button onClick={closeModalResetForm} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
          &nbsp; &nbsp;
        </div>
        <br />

      </Box>
    </Modal>
  )
}
