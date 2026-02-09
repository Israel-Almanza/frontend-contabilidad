import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Box from '@mui/material/Box';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import { useProductosInventario } from '../services/useProductoInventario';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';

  const styleModal = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '38%',
    minWidth: 350,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
  //  p: 2,
};

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#008000'),
    backgroundColor: '#008000',
    '&:hover': {
        backgroundColor: '#0A680A',
    },
}));


export const ModalAgregarSubCatInventario = (props:any) => {

    const {loadApiNewSubCategoriaInventario} = useProductosInventario()
    const {openModalSubCategoria,handleOpenModalSubCategoria ,handleCloseModalSubCategoria, nomPrimeraCat, loadObtenerSubCategoria, idPrimeraCat} = props;
    
    const [gender, setGender] = React.useState("");

    const [nombrePerfil, setNombrePerfil] = useState<string>('')
    const [nombreSubCate, setNombreSubCate] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );

    
    const onChangeNameSubCategoria = (event: any) => {
        console.log("nombre subCategoria ", event.target.value)
        setNombreSubCate(event.target.value)

    }
   
    const handleSaveSubCategoria = async () => {
        if (!nombreSubCate ) {
            //alert("nombre de versil vacio")
            closeModalResetForm()
            return;
        }
        try {
            //localStorage.setItem('nombre_perfil_local',nombrePerfil);
            setLoading(true)
            const response:any = await loadApiNewSubCategoriaInventario(
                idPrimeraCat,
                nombreSubCate
                )
            console.log("save pefil ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerSubCategoria(idPrimeraCat)
                AlertSave({ title: "", message: response.message });
               
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: response.message })
        
        
            }
        
            if (response == undefined) {
                AlertError({ title: '', message: response.message })
            }


        } catch (error) {
            console.log("error ", error)
            setLoading(false)
        }
    }

      const closeModalResetForm = () => {


        setNombreSubCate('')
        handleCloseModalSubCategoria()
    }

    {/*<TextField id="outlined-basic" defaultValue="Ingrese" size='small' InputProps={{
                    readOnly: true,
                    }}
                    variant="filled"/> */}

    return (
        <Modal
            open={openModalSubCategoria}
            //onClose={handleCloseModalSubCategoria}
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
                        marginLeft: '3%',
                        color:'white',
                        fontSize: '1.2rem', //marginBottom: '10px'
                        fontFamily: 'Times New Roman'
                    }}>
                        Agregar SubCategoria
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
                
                <div style={{ margin:'15px' }}>
                    <div>
                        <h4 style={{ margin: "2px" }}>Categoria:</h4>
                        <TextField id="outlined-basic"
                            size='small'
                            sx={{ width: '100%', backgroundColor:'#E4E6E8' }}
                            //label="Ingrese Nombre Categoria"
                            variant="outlined"
                            //variant="filled"
                            //onChange={onChangeNamePerfil}
                            value={nomPrimeraCat}
                            InputProps={{
                                readOnly: true,
                                }}
                        />
                    </div>

                    <div>
                        <h4 style={{ margin: "2px" }}>SubCategoria:</h4>
                        <TextField id="outlined-basic"
                            size='small'
                            sx={{ width: '100%' }}
                            label="Ingrese Nombre SubCategoria"
                            variant="outlined"
                            onChange={onChangeNameSubCategoria}
                            value={nombreSubCate}
                        />
                    </div>


                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSaveSubCategoria}> Crear</ColorButton>

                    &nbsp; &nbsp;
                    <Button onClick={closeModalResetForm} sx={{
                    backgroundColor: '#6E7881',
                    '&:hover': {
                        backgroundColor: '#474849',
                    },

                    }} variant="contained" >Cancel</Button>
                    </div>
                    <br/>
                    {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
}
