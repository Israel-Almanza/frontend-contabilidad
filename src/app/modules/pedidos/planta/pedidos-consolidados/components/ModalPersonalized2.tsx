import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { getDayFormat, getMonthFormat, getStringFechaInicial } from '../../../../../../core/utils/DateFormat';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import { usePedidosConsolidados } from '../services/usePedidosConsolidados';

const genders = [
    {
      value: 'PERECEDERO',
      label: 'PERECEDERO',
    },
    {
      value: 'NO PERECEDERO',
      label: 'NO PERECEDERO',
    },
    {
      value: 'ALL',
      label: 'TODOS',
    },
  
  ];

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '38%',
    minWidth: 420,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 4,
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#008000'),
  backgroundColor: '#008000',
  '&:hover': {
      backgroundColor: '#0A680A',
  },
}));


export const ModalBuscarPedidosConsolidados = (props:any) => {
  const {loadApiListarPedidosConsolidados} = usePedidosConsolidados()
  const {openModalBuscar,handleOpenModalBuscar ,handleCloseModalBuscar,
    updateTextTablaConsolidados} = props;

    const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
    console.log("datos ",gender)
    setGender(event.target.value);
  };

    

//loading
const [loading, setLoading] = useState(
  false
);

const [datosConsolidados, setDatosConsolidados] = useState<any>([])
    const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())

    const handleChangeDateInicio = async (fecha: Date) => {

      fecha = new Date(fecha)
  
      //2023-04-24"
      const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
      console.log("format fecha ini", auxFormatFecha)
  
      setFechaInicio(auxFormatFecha)
      //loadDataVentaParmaters(ITEM, auxFormatFecha)
      //la a la api cada vez que cambiar al backend
  
    };

    const loadPedidosConsolidados= async () => {
      try {
  
        //parametro ncesarios
        console.log(gender, fechaInicio)
  
        setLoading(true)
        const response = await loadApiListarPedidosConsolidados(
          fechaInicio,
          gender
          )
          handleCloseModalBuscar()
        setLoading(false)
        console.log("lista pedidos consolidados ", response)
        if(response?.status && response?.consolidados){
        if (Array.isArray(response?.consolidados)) {

          
          var temp_array = response?.consolidados.filter((x: any) => x.total != 0)
          console.log("temp_array",temp_array)
          //setDatosConsolidados(response)
          updateTextTablaConsolidados(temp_array,fechaInicio)
          //setoriginalRows(response)
  
        }
      }
  
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
  
    }

    const closeModalResetForm = () => {

      //setApikey('')
      //setToken('')
      handleCloseModalBuscar()
  }

    return (
        <Modal
            open={openModalBuscar}
            //onClose={handleCloseModalBuscar}
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
                        Buscar Pedidos Consolidados
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
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Fecha Inicial</h5>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DesktopDatePicker sx={{ width: '100%' }}
                    defaultValue={dayjs()}
                    format='DD/MM/YYYY'
                    //    defaultValue={new Date()}
                    // label="Basic example"
                    //   value={currentDateMiddle}
                    /*  onChange={(newValue) => {
                        //setValue(newValue);
                        console.log("new vale ", newValue)
                      }}*/

                    onChange={(newValue: Date) => { handleChangeDateInicio(newValue) }}
                    slotProps={{ textField: { size: 'small' } }}

                  />
                </LocalizationProvider>
                </div>
                &nbsp; &nbsp;
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Seleccione</h5>
                  <TextField
                    id="outlined-select-gender"
                    select
                    //label={gender === "" ? "Seleccione" : ""}
                    label="Seleccione"
                    value={gender}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                    InputLabelProps={{ shrink: true }}
                    size='small'
                    SelectProps={{
                      MenuProps: {

                      },
                    }}
                      margin="normal"
                      variant="outlined"
                  >
                    {genders.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" 
                    onClick={loadPedidosConsolidados}
                    > Buscar</ColorButton>

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
