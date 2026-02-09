import { Typography, Button, Collapse, TextField, Modal, Grid, Autocomplete } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useAccesibilidad } from '../services/useAccesibilidad';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';

const styleModal = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
//    width: '38%',
    minWidth: 320,
    maxWidth: 320,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 20,
    p: 2,
};

const Operacion = [
    {
        ID: '1',
        TEXT: 'Asignar',
    },
    {
        ID: '2',
        TEXT: 'Retirar',
    },
   

];


export const ModalCambiarPerfil = (props:any) => {
    const { loadApiCambiarPerfil} = useAccesibilidad()
    const {openModalCambiar,handleOpenModalCambiar ,handleCloseModalCambiar,loadObtenerUsuarios, Perfiles, USUARIO} = props;

    const [idPerfil, setIdPerfil] = useState('')
    const [nombrePerfil, setNombrePerfil] = useState('')

    const [idOperacion, setIdOperacion] = useState('')
    const [nombreOperacion, setNombreOperacion] = useState('')

    const handleSeleccioneOperacion = (value: any) => {
        console.log("valee de operacion ", value)
        const { ID, TEXT } = value
        setIdOperacion(ID)
        setNombreOperacion(TEXT)
        //recuperar el nombre de la sucursal
    
      }

      const handleSeleccionePerfil = (value: any) => {
        console.log("valee de Perfil ", value)
        const { ID, TEXT } = value
        setIdPerfil(ID)
        setNombrePerfil(TEXT)
        //recuperar el nombre de la sucursal
    
      }

//lista de perfiles
const loadCambiarPerfil = async () => {
    console.log("id perfil", USUARIO,"*",nombrePerfil)
    handleCloseModalCambiar()
    try {
      const response = await loadApiCambiarPerfil(
        USUARIO,
        nombrePerfil
      );
      console.log("res asignar ubicacion usuario ", response)
            //setLoading(false)
            if (response?.status) {
               
              await loadObtenerUsuarios()
              AlertSave({ title: "",  message: "Se cambio Perfil Correctamente" });
  
  
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: "Error al cambiar Perfil al Usuario" })
      
      
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: "Error al Cambiar Perfil al Usuario" })
              }
      
  
    } catch (error) {
  
    }
  }

    return (
        <Modal
            open={openModalCambiar}
            onClose={handleCloseModalCambiar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1rem', fontFamily: 'Times New Romas'
                }}>
                   Cambiar Perfil
                </Typography>
                <br />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} sm={12} md={12}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                fontSize: '1rem', marginBottom: '3px', fontFamily: 'Times New Roman'
                            }}>
                                Sucursal
                            </Typography>
                            <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Perfiles}
                                    sx={{ width: '100%' }}
                                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                    onChange={(event, value) =>
                                    handleSeleccionePerfil(value)
                                    }
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione Perfil"
                                        

                                    />
                                    )}
                                    getOptionLabel={(option: any) => option.TEXT}
                                />

                        </div>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                fontSize: '1rem', marginBottom: '3px', fontFamily: 'Times New Roman'
                            }}>
                                Operacion
                            </Typography>
                            <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Operacion}
                                    sx={{ width: '100%' }}
                                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                    onChange={(event, value) =>
                                    handleSeleccioneOperacion(value)
                                    }
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccione Operacion"
                                        

                                    />
                                    )}
                                    getOptionLabel={(option: any) => option.TEXT}
                                />

                        </div>
                    </Grid> */}

                </Grid>
                <br/>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                    <Button onClick={loadCambiarPerfil} sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalCambiar} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
            </Box>
        </Modal>
    )
}
