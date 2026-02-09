//import { AuthProvider } from './app/modules/auth/context'
//import { SplashScreenProvider } from './core/context/SplashScrean'
//import { BrowserRouter } from 'react-router-dom'
//import { Navigation } from './app/Navigation'

import React, { useState, useEffect, useContext, useReducer } from 'react';



import { Typography, TextField, Button, InputAdornment, Box, Divider, MenuItem, Autocomplete } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";




import { styled } from "@mui/system";

import { KDImage } from '../../../../core/modal-loading/KDImage';
import SearchIcon from '@mui/icons-material/Search';
import { useResetPassword } from './services/useResetPassword';
import { AlertQuestion, AlertSave ,AlertError} from '../../../common/alerts/alerts';




const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));

const ColorButtonGreen = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#28A745',
  '&:hover': {
    backgroundColor: '#1B8332',
  },
}));


const ResetPassword = () => {

  const navigate = useNavigate()


  const { loadApiGetUsuariosforReset, loadApiSetResetPassword } = useResetPassword();
  const [loading, setLoading] = useState(false);
  const [ListUsaurios, setListUsaurios] = useState<any>([]);
  const [idUsuario, setIdUsuario] = useState('')
  useEffect(() => {

    loadGetUsuariosforReset()
  }, []);


  const loadGetUsuariosforReset = async () => {
    try {
      const response = await loadApiGetUsuariosforReset();
      console.log("response data ", response)
      if (response?.status && response?.usuarios) {
        setListUsaurios(response?.usuarios)
      }

    } catch (error) {

    }
  }

  const handleSeleccioneUsuario = (value: any) => {
    console.log("value usuario ", value)


    const {id } = value
    setIdUsuario(id)

    //recuperar el nombre de la sucursal

  }

  //

  const handleSetResetPassword = async () => {
    if (!idUsuario) {
      return;
    }
    try {
      setLoading(true);
      const response = await loadApiSetResetPassword(idUsuario);
      setLoading(false);
      if (response?.status) {
    
        AlertSave({ title: '', message: 'se ha reseteado la contraseña del usuario' })

      }
      if (response?.status == false) {

        AlertQuestion({ title: '', message: 'No Se ha guardado ' })
        return;
      }
      if (response == undefined) {
        AlertError({ title: '', message: 'Algo salió mal' })
        return;
      }

    } catch (error) {

    }
  }








  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


        <form style={{ marginTop: '1%' }}>

          <Box sx={{
            width: '100%', maxWidth: 390, margin: 'auto', backgroundColor: 'white',
            border: '1px solid #C0C1C1'


          }}>
            <Typography variant="subtitle1" gutterBottom sx={{
              textAlign: 'center',
              color: 'black', fontSize: '20px', marginBottom: '10px',
              borderTop: '2px solid red'

            }}>
              Resetear Contraseña
            </Typography>
            <Divider />
            <div style={{ maxWidth: '35%', margin: 'auto', marginBottom: '8px', marginTop: '5%' }}>
              <img style={{ width: '100%' }} src="https://sistemageneral.azurewebsites.net/assets/dist/img/logo.png" />
            </div>

   

            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '15px', color: '#666666',
              fontSize: '14px'
            }}>
              Seleccione usuario
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>


            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={ListUsaurios}
                //options={ListUsaurios.map((option:any) => option.text)}
                noOptionsText={'Sin opciones'}
                sx={{ width: '90%' }}
                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                onChange={(event, value) =>
                  handleSeleccioneUsuario(value)
                }
                getOptionLabel={(option: any) => option.text}
                /*renderOption={(props, option, index) => {
                  const key = `listItem-${index}-${option.id}`;
                  return (

                    <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                      {option['text']}
                    </Box>
                  )
                }}*/

                
                renderOption={(props, option, index) => {
                  const key = `listItem-${index}-${option.id}`;
                  return (
                    <li {...props} key={key}>
                     
                      {option['text']}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Seleccione la sucursal"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (<InputAdornment position="start"> <SearchIcon />
                      </InputAdornment>),
                      disableUnderline: true
                    }}

                  />
                )}



              />




            </div>


            <br />
            {loading ? <KDImage

            /> : null}


            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '10px' }}>
              <ColorButtonGreen variant="contained" sx={{ marginTop: '34px' }}
              
              onClick={()=>handleSetResetPassword()}>Resetear</ColorButtonGreen>
              {/*<ColorButton variant="contained" sx={{ marginTop: '34px' }}>Enviar</ColorButton>*/}
              &nbsp; &nbsp;

              <ColorButton variant="contained" sx={{ marginTop: '34px' }}>Cancelar</ColorButton>



            </div>

          </Box>
        </form>



      </div>
    </div>
  )
}

export default ResetPassword