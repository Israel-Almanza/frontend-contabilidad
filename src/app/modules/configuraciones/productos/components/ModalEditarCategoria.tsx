
import Swal from 'sweetalert2';

import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import Box from '@mui/material/Box';
import { Controller, useForm } from "react-hook-form";
import { useProducto } from '../services/useProducto';
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


export const ModalEditarCategoria = (props:any) => {

    const {loadApiEditarCategoria} = useProducto()
    const { handleSubmit, control,setValue, getValues, register } = useForm();
    const {openModalEditarCategoria,handleOpenModalEditarCategoria ,handleCloseModalEditarCategoria, 
        loadObtenerPrimeraCategoria, nomPrimeraCat, idPrimeraCat} = props;

    const [nombreCategoria, setNombreCategoria] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        //EditarUsuario()
        setValue("categoriaNew",nomPrimeraCat)
       
      }, [idPrimeraCat]);

    const onChangeNameCategoria = (event: any) => {
        console.log("nombre categoria ", event.target.value)
        setNombreCategoria(event.target.value)

    }
   
    const handleEditarCategoria = async (data:any) => {
        if ( !idPrimeraCat) {
            //alert("nombre de versil vacio")
            closeModalResetForm()
            return;
        }
        // console.log("dato de editar", data.categoriaNew)
        // console.log("datos ide categoria",idPrimeraCat)
        try {
            //localStorage.setItem('nombre_perfil_local',nombreCategoria);
            setLoading(true)
            const response:any = await loadApiEditarCategoria(
                data.categoriaNew,
                Number(idPrimeraCat)
                )
            console.log("save pefil ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerPrimeraCategoria()
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


        setValue("categoriaNew",'')
        handleCloseModalEditarCategoria()
    }

    return (
        <Modal
            open={openModalEditarCategoria}
            //onClose={handleCloseModalEditarCategoria}
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
                        Editar Categoria
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
                            
                            <Controller
                                name="categoriaNew"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField id="outlined-basic" 
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                        }}
                                        value={value}
                                        onChange={onChange}
                                        //error={!!error}
                                        //helperText={error ? error.message : null}
                                        size="small"


                                    />
                                )}

                                
                            />
                            {/* <TextField id="outlined-basic"
                                size='small'
                                sx={{ width: '100%' }}
                                label="Ingrese Nombre Categoria"
                                variant="outlined"
                                onChange={onChangeNameCategoria}
                                value={nombreCategoria}
                            /> */}
                        </div>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSubmit(handleEditarCategoria)}> Modificar</ColorButton>

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
