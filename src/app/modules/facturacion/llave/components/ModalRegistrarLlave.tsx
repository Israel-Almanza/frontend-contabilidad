import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { getStringFechaInicial, getDayFormat, getMonthFormat } from '../../../../../core/utils/DateFormat';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { styled } from "@mui/system";
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import { useLlave } from '../services/useLlave';

const styleModal = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '28%',
    minWidth: 420,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 2,
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#008000'),
  backgroundColor: '#008000',
  '&:hover': {
      backgroundColor: '#0A680A',
  },
}));



export const ModalRegistrarLlave = (props:any) => {
    const {loadApiGuardarLlave} = useLlave()
    const {openModalRegistrarLlave,handleOpenModalRegistrarLlave,handleCloseModalRegistrarLlave,loadObtenerListaLlaves} = props;

    const [apikey, setApikey] = useState<string>('')
    const [token, setToken] = useState<string>('')
    //loading
    const [loading, setLoading] = useState(
        false
    );

    const [fechaActivacion, setFechaActivacion] = useState(() => getStringFechaInicial())
    const [fechaVencimiento, setFechaVencimiento] = useState(() => getStringFechaInicial())

    const handleChangeDateActivacion = async (fecha: Date) => {

      fecha = new Date(fecha)
  
      //2023-04-24"
      const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
      //console.log("format fecha activacion", auxFormatFecha)
  
      setFechaActivacion(auxFormatFecha)
  
    };

    const handleChangeDateVencimiento = async (fecha: Date) => {

      fecha = new Date(fecha)
  
      //2023-04-24"
      const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
      //console.log("format fecha vencimiento", auxFormatFecha)
  
      setFechaVencimiento(auxFormatFecha)
  
    };

    

    const onChangeNameApi = (event: any) => {
        //console.log("api key ", event.target.value)
        setApikey(event.target.value)

    }

    const onChangeNameToken = (event: any) => {
      //console.log("api token ", event.target.value)
      setToken(event.target.value)

  }

  const handleSaveLlave = async () => {
    
    try {
        //localStorage.setItem('nombre_perfil_local',nombreCategoria);
        setLoading(true)
        const response:any = await loadApiGuardarLlave(
            token,
            fechaActivacion,
            fechaVencimiento,
            apikey
            )
        console.log("save perfil ", response)
        setLoading(false)
        if (response?.status) {
            closeModalResetForm()
          
            await loadObtenerListaLlaves()
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

      setApikey('')
      setToken('')
      handleCloseModalRegistrarLlave()
  }

    return (
        <Modal
            open={openModalRegistrarLlave}
            onClose={handleCloseModalRegistrarLlave}
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
                        Nuevo Perfil
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
                <br />
                <div style={{ margin:'15px' }}>
                <div style={{display:'flex', flexDirection: 'column'}}>
                
                    <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>API Key</h5>
                    
                    <TextField id="outlined-basic"
                        size='small'
                        sx={{ width: '100%' }}
                        label="Token API"
                        variant="outlined"
                        onChange={onChangeNameApi}
                        value={apikey}
                    />

                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Token API</h5>
                  <TextField
                      sx={{ width: '100%' }}
                      //label="Punto de Venta"
                      onChange={onChangeNameToken}
                      value={token} 
                      multiline
                      maxRows={10}
                  />
                  {/* <textarea></textarea> */}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Fecha Activacion</h5>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DesktopDatePicker sx={{ width: '100%' }}
                          //defaultValue={dayjs()}
                          format='DD/MM/YYYY'
                          defaultValue={"DD/MM/YYYY" as unknown as Date}
                          //minDate={dayjs()}
                          //  minDate={dayjs(getRestarDateCurrent())}
                          // maxDate={dayjs()}
                          onChange={(newValue: any) => { handleChangeDateActivacion(newValue) }}
                          slotProps={{ textField: { size: 'small', fullWidth: true } }}

                        />
                      </LocalizationProvider>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Fecha Vencimiento</h5>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DesktopDatePicker sx={{ width: '100%' }}
                          //defaultValue={dayjs()}
                          defaultValue={"DD/MM/YYYY" as unknown as Date}
                          format='DD/MM/YYYY'
                          //minDate={dayjs()}
                          //  minDate={dayjs(getRestarDateCurrent())}
                          // maxDate={dayjs()}
                          onChange={(newValue: any) => { handleChangeDateVencimiento(newValue) }}
                          slotProps={{ textField: { size: 'small', fullWidth: true } }}

                        />
                      </LocalizationProvider>
                </div>
                </div>
                <br/>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" onClick={handleSaveLlave}> Crear</ColorButton>

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
