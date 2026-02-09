


import { Typography, Button, Collapse, TextField, Modal, Checkbox } from '@mui/material'
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
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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


const genders = [
    {
        value: 'M',
        label: 'Bebidas Calientes con Cafe',
    },
    {
        value: 'F',
        label: 'Resposteria',
    },
    {
        value: 'F',
        label: 'Frutas Naturales',
    },
    {
        value: 'F',
        label: '1 Extras de Desayunos',
    },

];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export const ModalForm = (props: any) => {

    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized, description } = props;

    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);
    const [gender, setGender] = useState("");

    const handleChange = (event: any) => {
        setGender(event.target.value);
    };
    return (
        <Modal
            open={openModalPersonalized}
            onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2// textAlign: 'center'
                    , fontWeight: 'bold',
                    fontSize: '1.1rem', marginBottom: '10px'
                }}>
                    {/*description*/} Agregar Grupo
                </Typography>

                <div style={{ width: '80%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Nombre de Grupo</h6>

                    </div>
                    <TextField
                        id="outlined-select-gender"
                        select
               
                        label={gender === "" ? "Seleccione una Opción" : ""}
                        value={gender}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        InputLabelProps={{ shrink: false }}


                        SelectProps={{
                            MenuProps: {

                            },
                        }}
                        //   margin='normal'
                        size="small"
                        variant="outlined"
                    >
                        {genders.map(option => (
                            <MenuItem key={option.value} value={option.value}

                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>
                <div style={{ width: '80%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Nombre de Grupo</h6>

                    </div>
                    <TextField
                        id="outlined-select-gender"

                        label="Nombre de Grupo"
                        //  label={gender === "" ? "Seleccione una Opción" : ""}
                        //  value={gender}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                      //  InputLabelProps={{ shrink: false }}


                        SelectProps={{
                            MenuProps: {

                            },
                        }}
                        //   margin='normal'
                        size="small"
                        variant="outlined"
                    />



                </div>
                <div style={{ width: '80%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Orden</h6>

                    </div>
                    <TextField
                        id="outlined-select-gender"
                        select
                        label={gender === "" ? "Seleccione una Opción" : ""}
                        value={gender}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        InputLabelProps={{ shrink: false }}


                        SelectProps={{
                            MenuProps: {

                            },
                        }}
                        //   margin='normal'
                        size="small"
                        variant="outlined"
                    >
                        {genders.map(option => (
                            <MenuItem key={option.value} value={option.value}

                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>
                <div style={{ width: '80%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Combo madre</h6>

                    </div>
                    <TextField
                        id="outlined-select-gender"
                        select
                        label={gender === "" ? "Seleccione una Opción" : ""}
                        value={gender}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        InputLabelProps={{ shrink: false }}


                        SelectProps={{
                            MenuProps: {

                            },
                        }}
                        //   margin='normal'
                        size="small"
                        variant="outlined"
                    >
                        {genders.map(option => (
                            <MenuItem key={option.value} value={option.value}

                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>

                <div style={{ width: '80%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Agregar
                        </h6>
                        <Checkbox {...label} defaultChecked sx={{ padding: '0px', margin: '0px', fontSize: '8px' }} />
                    </div>


                </div>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/*<Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>*/}
                    &nbsp; &nbsp;
                    <Button sx={{ backgroundColor: '#DC3741' }} variant="contained" >Registrar</Button>
             
                  {/*  <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>*/}
                </div>
            </Box>
        </Modal>
    )
}
