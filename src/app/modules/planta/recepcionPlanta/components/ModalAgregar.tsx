import { Typography, Button, Collapse, TextField, Modal, Grid, Autocomplete, Checkbox } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


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



export const ModalAgregar = (props:any) => {
    //const { loadApiCambiarPerfil} = useAccesibilidad()
    const {openModalAgregar,handleOpenModalAgregar ,handleCloseModalAgregar,loadObtenerUsuarios, Perfiles, USUARIO} = props;

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

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Modal
            open={openModalAgregar}
            onClose={handleCloseModalAgregar}
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
                    <Grid item xs={12} sm={12} md={12}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{
                                margin: 0, padding: 0, marginLeft: '3px',
                                fontSize: '1rem', marginBottom: '3px', fontFamily: 'Times New Roman'
                            }}>
                                Operacion
                            </Typography>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    //defaultValue={[top100Films]}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="filterSelectedOptions"
                                        placeholder="Favorites"
                                    />
                                    )}
                                />

                        </div>
                    </Grid>

                </Grid>
                <br/>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                    <Button  sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalAgregar} sx={{ backgroundColor: '#DC3741' }} variant="contained" >No </Button>
                    
                </div>
            </Box>
        </Modal>
    )
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];
