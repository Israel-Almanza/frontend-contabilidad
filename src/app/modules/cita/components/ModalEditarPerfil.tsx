import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import Box from '@mui/material/Box';
import { usePerfil } from '../services/usePerfil';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from "react-hook-form";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';

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


export const ModalEditarPerfil = (props:any) => {

    const {loadApiEditarPerfil} = usePerfil()
    const { handleSubmit, control,setValue, getValues, register } = useForm();
    const {openModalEditar,handleOpenModalEditar ,handleCloseModalEditar, 
        loadObtenerListaPerfil, ListPERFIL} = props;
console.log("lista",ListPERFIL)
    const [nomPerfil, setNomPerfil] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        //EditarUsuario()
        setValue("nomPerfil",ListPERFIL.PERFIL)
        setValue("estado",ListPERFIL.ESTADO)
       
      }, [ListPERFIL]);

    const onChangeNamePerfil = (event: any) => {
        console.log("nombre perfil ", event.target.value)
        setNomPerfil(event.target.value)

    }
   
    const EditarPerfil = async (data:any) => {
        console.log("data", data)
        console.log("id ",ListPERFIL.ID_VENTAS_PERFIL)
        console.log("nombre ",data.nomPerfil)
        console.log("estado ",data.estado)
       
        try {
            //localStorage.setItem('nombre_perfil_local',nombreCategoria);
            setLoading(true)
            const response:any = await loadApiEditarPerfil(
                ListPERFIL.ID_VENTAS_PERFIL,
                data.nomPerfil,
                data.estado
                )
            console.log("save perfil ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerListaPerfil()
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

    const SelectTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
        //console.log("entre al metodo 1")
        
    
        const [ListEstado, setListEstado] = useState<any>(
          [
            {
                ID: '1',
                TEXT: 'HABILITADO',
            },
            {
                ID: '0',
                TEXT: 'INABILITADO',
            },
          ]
        )
        const [ItemTurno, setItemTurno] = useState('');
    
        const [renderItem, setRenderItem] = useState("");
    
        //  console.log("getValues ***", getValues("PERECEDERO"));
    
    
        const handleChangeTurno = (event: any) => {
          console.log("select item turno", event.target.value);
    
    
          setItemTurno(event.target.value)
    
    
    
          // setSucursalItem(event.target.value)
        };
    
    
    
        return (
    
          <TextField
            id="outlined-select-gender"
            select
            //label="Seleccione turno"
            //  disabled={disableSubCategorySecond}
            //label={gender === "" ? "Seleccione una Opción" : ""}
            //  value={ItemTurno}
            // onChange={handleChangeTurno}
    
            //disabled={handleIsDisable()}
            sx={{ width: '100%' }}
            // InputLabelProps={{ shrink: false }}
    
             //defaultValue={"F"}
            defaultValue={getValues(nameRegister)}
            SelectProps={{
              MenuProps: {
    
              },
            }}
            //   margin='normal'
            size="small"
            variant="outlined"
    
            inputProps={register(nameRegister, {
              required: 'Completa este campo',
            })}
            //error={errors[nameRegister]}
            //helperText={errors ? errors[nameRegister]?.message : null}
          >
            {ListEstado && ListEstado?.map((option: any) => (
              <MenuItem key={option.ID}
                value={option.ID}
              >
                {option.TEXT}
              </MenuItem>
            ))}
          </TextField>
    
    
        )
      }

    const closeModalResetForm = () => {


        setNomPerfil('')
        handleCloseModalEditar()
    }

    return (
        <Modal
            open={openModalEditar}
            //onClose={handleCloseModalAgregarPerfil}
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
                        Editar Perfil
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
                            <h4 style={{ margin: "2px" }}>Nombre Perfil:</h4>
                            <Controller
                                name={'nomPerfil'}
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField id="outlined-basic" 
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

                   
                            />
                        </div>
                        <div>
                        <h4 style={{ margin: "2px" }}>Estado:</h4>
                                <SelectTextFieldSmall
                                isDisable={false}
                                control={control}
                                isRequired={false}
                                nameRegister={'estado'}
                                />
                        </div>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSubmit(EditarPerfil)}> Editar</ColorButton>

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
