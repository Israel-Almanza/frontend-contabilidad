import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
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


export const ModalAgregarCategoriaInventario = (props:any) => {

    const {loadApiNewCategoriaInventario} = useProductosInventario()
    const {openModalAgregarCategoriaINV,handleOpenModalAgregarCategoriaINV ,handleCloseModalAgregarCategoriaINV, loadObtenerCategoria} = props;
    const { handleSubmit, control, reset } = useForm();

    const [nombreCategoria, setNombreCategoria] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );

    const onChangeNameCategoria = (event: any) => {
        console.log("nombre categoria ", event.target.value)
        setNombreCategoria(event.target.value)

    }
   
    const handleSaveCategoria = async (data:any) => {
        console.log("datos ",data)
        if (!nombreCategoria) {
            //alert("nombre de versil vacio")
            closeModalResetForm()
            return;
        }
        try {
            setLoading(true)
            const response:any = await loadApiNewCategoriaInventario(
                nombreCategoria,
                data.color_r,
                data.color_g,
                data.color_b
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
        setNombreCategoria('')
        reset({});
        handleCloseModalAgregarCategoriaINV()
    }


    return (
        <Modal
            open={openModalAgregarCategoriaINV}
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

                    <ColorButton variant="contained" onClick={handleSubmit(handleSaveCategoria)}> Crear</ColorButton>

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
