import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import Box from '@mui/material/Box';
import { Controller, useForm } from "react-hook-form";
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


export const ModalEditarCategoriaInventario = (props:any) => {

    const {loadApiEditarCategoriaInventario} = useProductosInventario()
    const {openModalEditarCategoriaINV,handleOpenModalEditarCategoriaINV ,handleCloseModalEditarCategoriaINV, 
        loadObtenerCategoria,idPrimeraCat,nomPrimeraCat,color_r,color_g,color_b} = props;
    const { handleSubmit, control, reset, setValue } = useForm();

    //loading
    const [loading, setLoading] = useState(
        false
    );

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        //EditarUsuario()
        setValue("categoria",nomPrimeraCat)
        setValue("color_r",color_r)
        setValue("color_g",color_g)
        setValue("color_b",color_b)
       
      }, [idPrimeraCat]);
   
    const EditarCategoria = async (data:any) => {
        console.log("datos ",data)
        try {
            setLoading(true)
            const response:any = await loadApiEditarCategoriaInventario(
                idPrimeraCat,
                data.categoria
                //data.color_r,
                //data.color_g,
                //data.color_b,
                )
            console.log("save categoria ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerCategoria()
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

    const InputTextFieldNew = ({ label, control, isRequired = false, nameRegister, isDisable }: any) => {
        return (
            <>

                <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '3px',
                    color: '#666666', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '3px'
                }}>
                    {label}
                </Typography>
                <Controller
                    name={nameRegister}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic" label={label}
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            size="small"


                        />
                    )}

                    rules={{
                        required: {
                            value: isRequired,
                            message: 'Completa este campo '
                        },
                    }}
                />
            </>
        )
    }

    const closeModalResetForm = () => {
        //reset({});
        handleCloseModalEditarCategoriaINV()
    }


    return (
        <Modal
            open={openModalEditarCategoriaINV}
            //onClose={handleCloseModalAgregarCategoriaINV}
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
                        <InputTextFieldNew
                            label={'Nombre Categoria'}
                            control={control}
                            isRequired={true}
                            nameRegister={'categoria'}
                        />
                        </div>
                        <div>
                        <InputTextFieldNew
                            label={'COLOR_R'}
                            control={control}
                            isRequired={true}
                            nameRegister={'color_r'}
                        />
                        </div>
                        <div>
                        <InputTextFieldNew
                            label={'COLOR_G'}
                            control={control}
                            isRequired={true}
                            nameRegister={'color_g'}
                        />
                        </div>
                        <div>
                        <InputTextFieldNew
                            label={'COLOR_B'}
                            control={control}
                            isRequired={true}
                            nameRegister={'color_b'}
                        />
                        </div>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSubmit(EditarCategoria)}> Confirmar</ColorButton>

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
