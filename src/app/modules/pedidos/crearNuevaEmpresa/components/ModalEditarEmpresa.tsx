import { Typography, Button, Collapse, TextField, Modal, Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import Box from '@mui/material/Box';
import { Controller, useForm } from "react-hook-form";
import { useNewEmpresa } from '../services/useNewEmpresaServices';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';


const styleModal = {
    position: 'absolute',
    top: '40%',
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


export const ModalEditarEmpresa = (props: any) => {

    const { loadApiEditarEmpresa } = useNewEmpresa()
    const { openModalEditar, handleOpenModalEditar, handleCloseModalEditar,
        loadObtenerListaEmpresa, Empresa } = props;
    const { handleSubmit, control, reset, setValue } = useForm();

    //loading
    const [loading, setLoading] = useState(
        false
    );

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        //EditarUsuario()
        setValue("empresa", Empresa.DESCRIPCION)
        setValue("Unitario", (Empresa.DESCUENTO_UNITARIO == 1 ? true: false))
        setValue("ICE", (Empresa.DESCUENTO_ICE == 1? true:false))
        setValue("General", (Empresa.DESCUENTO_GENERAL == 1? true:false))
        setValue("FormatoTabla", (Empresa.FORMATO_TABLA == 1? true:false))
        setValue("Planta", (Empresa.ESTADO_PLANTA == 1? true:false))

    }, [Empresa]);

    const EditarEmpresa = async (data: any) => {
        console.log("datos ", data)
       /* console.log("IDempresa ",Empresa.ID_AREA_PRODUCCION)
        console.log("unitario ",(data.Unitario == true ? "1":"0"))
        console.log("ice ",(data.ICE == true ? "1":"0"))
        console.log("general ",(data.General == true ? "1":"0"))*/
        try {
            setLoading(true)
            const response:any = await loadApiEditarEmpresa(
                Empresa.ID_AREA_PRODUCCION,
                data.empresa,
                (data.Unitario == true ? "1":"0"),
                (data.ICE == true ? "1":"0"),
                (data.General == true ? "1":"0")
                )
            console.log("save categoria ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerListaEmpresa()
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
                    fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '3px'
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
        handleCloseModalEditar()
    }


    return (
        <Modal
            open={openModalEditar}
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
                        color: 'white',
                        fontSize: '1.2rem', //marginBottom: '10px'
                        fontFamily: 'Times New Roman'
                    }}>
                        Editar Empresa
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


                <div style={{ margin: '15px' }}>

                    <div>
                        <InputTextFieldNew
                            label={'Nombre Empresa'}
                            control={control}
                            isRequired={true}
                            nameRegister={'empresa'}
                        />
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <h5 style={{ margin: "5px", fontSize: '0.8rem', }}>Descuento Unitario</h5>
                            <Controller
                                name={`Unitario`}
                                control={control}
                                render={({ field: props }: any) => (
                                    <Checkbox
                                        {...props}
                                        //checked={props.value}
                                        sx={{ padding: 0, margin: 0 }}
                                        size="small"
                                        checked={!!props.value}
                                        onChange={(e: any) => props.onChange(e.target.checked)}
                                    //onChange={handlecheck0} 
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <h5 style={{ margin: "5px", fontSize: '0.8rem', }}>Descuento ICE</h5>
                            <Controller
                                name={`ICE`}
                                control={control}
                                render={({ field: props }: any) => (
                                    <Checkbox
                                        {...props}
                                        //checked={props.value}
                                        sx={{ padding: 0, margin: 0 }}
                                        size="small"
                                        checked={!!props.value}
                                        onChange={(e: any) => props.onChange(e.target.checked)}
                                    //onChange={handlecheck0} 
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <h5 style={{ margin: "5px", fontSize: '0.8rem', }}>Descuento General :</h5>
                            <Controller
                                name={`General`}
                                control={control}
                                render={({ field: props }: any) => (
                                    <Checkbox
                                        {...props}
                                        //checked={props.value}
                                        sx={{ padding: 0, margin: 0 }}
                                        size="small"
                                        checked={!!props.value}
                                        onChange={(e: any) => props.onChange(e.target.checked)}
                                    //onChange={handlecheck0} 
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <h5 style={{ margin: "5px", fontSize: '0.8rem', }}>Formato Tabla :</h5>
                            <Controller
                                name={`FormatoTabla`}
                                control={control}
                                render={({ field: props }: any) => (
                                    <Checkbox
                                        {...props}
                                        //checked={props.value}
                                        sx={{ padding: 0, margin: 0 }}
                                        size="small"
                                        checked={!!props.value}
                                        onChange={(e: any) => props.onChange(e.target.checked)}
                                    //onChange={handlecheck0} 
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <h5 style={{ margin: "5px", fontSize: '0.8rem', }}>Estado Planta :</h5>
                            <Controller
                                name={`Planta`}
                                control={control}
                                render={({ field: props }: any) => (
                                    <Checkbox
                                        {...props}
                                        //checked={props.value}
                                        sx={{ padding: 0, margin: 0 }}
                                        size="small"
                                        checked={!!props.value}
                                        onChange={(e: any) => props.onChange(e.target.checked)}
                                    //onChange={handlecheck0} 
                                    />
                                )}
                            />
                        </div>
                    </div>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSubmit(EditarEmpresa)}> Confirmar</ColorButton>

                    &nbsp; &nbsp;
                    <Button onClick={closeModalResetForm} sx={{
                        backgroundColor: '#6E7881',
                        '&:hover': {
                            backgroundColor: '#474849',
                        },

                    }} variant="contained" >Cancel</Button>
                </div>
                <br />
                {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
}
