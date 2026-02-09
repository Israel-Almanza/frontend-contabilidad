
import Swal from 'sweetalert2';
import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { styled } from "@mui/system";
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import { useCuis } from '../services/useCuis';
import { Controller, useForm } from "react-hook-form";


const styleModal = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '25%',
    high: '20%',
    minWidth: 420,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
   // p: 2,
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#008000'),
  backgroundColor: '#008000',
  '&:hover': {
      backgroundColor: '#0A680A',
  },
}));


export const ModalNewCuis = (props:any) => {
    const {loadApiGuardarCuis} = useCuis()
    const { handleSubmit, control,setValue, getValues, register } = useForm();
    const {openModalRegistrarCuis,handleOpenModalRegistrarCuis ,handleCloseModalRegistrarCuis,loadObtenerListaCuis,ListSucursal} = props;
    
    const [idSucursal, setIdSucursal] = useState('')
    //loading
    const [loading, setLoading] = useState(
        false
    );
    
    const handleSaveCuis = async (data:any) => {
      console.log("data ",data)
      console.log("idSucursal ",idSucursal)
    
      try {
          //localStorage.setItem('nombre_perfil_local',nombreCategoria);
          setLoading(true)
          const response:any = await loadApiGuardarCuis(
              data.CodAmbiente,
              data.PuntoVenta,
              data.CodSistema,
              data.NIT,
              idSucursal,
              data.CodModalidad
              )
          console.log("save perfil ", response)
          setLoading(false)
          if (response?.status) {
              closeModalResetForm()
            
              await loadObtenerListaCuis()
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

 

const InputTextFieldCustomAcce = ({ label, control, isRequired = false, nameRegister, isDisable, value }: any) => {
  return (
      <>

          <Typography variant="subtitle1" gutterBottom sx={{
              margin: 0, padding: 0, marginLeft: '3px',
              color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
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

const handleSeleccioneSucursal = async (value: any) => {

  console.log("valee destino ", value)
  const { id } = value
  setIdSucursal(id)


}

    const closeModalResetForm = () => {

      setValue('CodAmbiente','')
      setValue('PuntoVenta','')
      setValue('CodSistema','')
      setValue('NIT','')
      setValue('CodModalidad','')
      handleCloseModalRegistrarCuis()
  }

    return (
        <Modal
            open={openModalRegistrarCuis}
            //onClose={handleCloseModalPersonalized}
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
                        Nuevo Cuis
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
               
                <div style={{ margin:'18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  
                  <InputTextFieldCustomAcce
                      label={'Codigo de Ambiente'}
                      control={control}
                      isRequired={false}
                      nameRegister={'CodAmbiente'}
                      //value={value}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                 
                  
                  <InputTextFieldCustomAcce
                      label={'Punto de Venta'}
                      control={control}
                      isRequired={false}
                      nameRegister={'PuntoVenta'}
                      //value={value}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  
                  <InputTextFieldCustomAcce
                      label={'Codigo de Sistema'}
                      control={control}
                      isRequired={false}
                      nameRegister={'CodSistema'}
                      //value={value}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  
                  <InputTextFieldCustomAcce
                      label={'NIT'}
                      control={control}
                      isRequired={false}
                      nameRegister={'NIT'}
                      //value={value}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Sucursal</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListSucursal}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, item) => {
                      handleSeleccioneSucursal(item)

                    }
                    }

                    //value={value}
                    //value={value || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="---Seleccione---"
                      //error={!!errors.categoria}
                      //helperText={errors.categoria && "Completa este campo"}
                      //  required

                      />
                    )}


                    getOptionLabel={(option: any) => option.text}


                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  
                  <InputTextFieldCustomAcce
                      label={'Codigo de Modalidad'}
                      control={control}
                      isRequired={false}
                      nameRegister={'CodModalidad'}
                      //value={value}
                  />
                </div>
                </div>
                &nbsp; &nbsp;
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                  <ColorButton variant="contained" onClick={handleSubmit(handleSaveCuis)}> Crear</ColorButton>

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
