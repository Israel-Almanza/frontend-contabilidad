import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import Box from '@mui/material/Box';
import { useProducto } from '../services/useProducto';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';


// const styleModal = {
//     position: 'absolute',
//     top: '30%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '23%',
//     bgcolor: 'background.paper',
//     borderRadius: '8px',
//     //border: '2px solid #000',
//     boxShadow: 24,
//     p: 2,
// };

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


export const ModalAgregarCategoria = (props:any) => {

    const {loadApiGuardarCategoria} = useProducto()
    const {openModalAgregarCategoria,handleOpenModalAgregarCategoria ,handleCloseModalAgregarCategoria, loadObtenerPrimeraCategoria} = props;

    const [nombreCategoria, setNombreCategoria] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );

    const onChangeNameCategoria = (event: any) => {
        console.log("nombre categoria ", event.target.value)
        setNombreCategoria(event.target.value)

    }
   
    const handleSaveCategoria = async () => {
        if (!nombreCategoria) {
            //alert("nombre de versil vacio")
            closeModalResetForm()
            return;
        }
        try {
            localStorage.setItem('nombre_perfil_local',nombreCategoria);
            setLoading(true)
            const response:any = await loadApiGuardarCategoria(nombreCategoria)
            console.log("save categoria ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerPrimeraCategoria()
                AlertSave({ title: "", message: "Se ha registrado La Categoria" });
                
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


        setNombreCategoria('')
        handleCloseModalAgregarCategoria()
    }

    return (
        <Modal
            open={openModalAgregarCategoria}
            onClose={handleCloseModalAgregarCategoria}
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
                        Nueva Categoria
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
                            <h4 style={{ margin: "2px" }}>Primera Categoria:</h4>
                            <TextField id="outlined-basic"
                                size='small'
                                sx={{ width: '100%' }}
                                label="Ingrese Nombre Categoria"
                                variant="outlined"
                                onChange={onChangeNameCategoria}
                                value={nombreCategoria}
                            />
                        </div>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSaveCategoria}> Crear</ColorButton>

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
