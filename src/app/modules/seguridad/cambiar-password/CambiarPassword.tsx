//import { AuthProvider } from './app/modules/auth/context'
//import { SplashScreenProvider } from './core/context/SplashScrean'
//import { BrowserRouter } from 'react-router-dom'
//import { Navigation } from './app/Navigation'

import React, { useState, useEffect, useContext, useReducer } from 'react';



import { Typography, TextField, Button, InputAdornment, Box, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";



import { styled } from "@mui/system";

import { KDImage } from '../../../../core/modal-loading/KDImage';
import { InputTextFieldPasswordWithIcon } from '../../../common/forms/Input';
import { ToastContainer } from 'react-toastify';


import { useCambiarPassword } from './services/useCambiarPassword';
import { AlertToastError } from '../../../common/alerts/alertsToast';
import { AlertSave,AlertQuestion,AlertError } from '../../../common/alerts/alerts';
import useAuth from '../../../hooks/useAuth';

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


const CambiarPassword = () => {

 
  const { logout } = useAuth();
  const { loadApiGetInfoUsuario, loadApiSetChangePassword } = useCambiarPassword();

  const [loading, setLoading] = useState(false);

  //end confing loading 



  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();





  useEffect(() => {

    loadGetInfoUsuario()
  }, []);


  const loadGetInfoUsuario = async () => {
    try {
      setLoading(true)
      const response = await loadApiGetInfoUsuario();
      setLoading(false)
   


      if (response?.USUARIO) {

        setValue('usuario', response?.USUARIO)
        //setListUsaurios(response?.usuarios)
      }

    } catch (error) {

    }
  }

  const onSubmit = async (dataForm: any) => {
    console.log("enviando datos form ", dataForm)
    if (!dataForm.usuario) {
      return;
    }
    if (dataForm.password_new != dataForm.repeat_password_new) {
    
      AlertToastError({ message: "Contraseñas no iguales" });
    }
    if (dataForm.password_new == dataForm.repeat_password_new) {
      console.log("contraseñas iguales")
      
      setLoading(true);
      const response = await loadApiSetChangePassword(
        dataForm.usuario,
        dataForm.password_actual,
        dataForm.password_new,
        dataForm.repeat_password_new

      );

      setLoading(false);
      if (response?.status) {

        //salir del sistema
        //AlertSave({ title: '', message: 'se ha reseteado la contraseña del usuario' })
        logout()

      }
      if (response?.status == false) {

        AlertQuestion({ title: '', message: 'No es la contraseña actual' })
        return;
      }
      if (response == undefined) {
        AlertError({ title: '', message: 'Algo salió mal' })
        return;
      }
    }
    //"repeat_password_new": 
    // "usuario": usuario,
    // "password_actual": password_actual,

  }
  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>




        <Box sx={{
          width: '100%', maxWidth: 390, margin: 'auto', backgroundColor: 'white',
          border: '1px solid #C0C1C1', padding: '20px'


        }}>
          <Typography variant="subtitle1" gutterBottom sx={{
            textAlign: 'center',
            color: 'black', fontSize: '20px', marginBottom: '10px',
            borderTop: '2px solid red'

          }}>
            Cambiar Contraseña
          </Typography>
          <Divider />
          <div style={{ maxWidth: '35%', margin: 'auto', marginBottom: '8px', marginTop: '5%' }}>
            <img style={{ width: '100%' }} src="https://sistemageneral.azurewebsites.net/assets/dist/img/logo.png" />
          </div>





          <Typography variant="subtitle1" gutterBottom sx={{
            color: '#666666',
            fontSize: '14px'
          }}>
            Usuario
          </Typography>
          <div >
            <Controller
              name={"usuario"}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField id="outlined-basic" //label="Usuario"
                  variant="outlined" sx={{
                    width: '100%',
                  }}
                  size='small'
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  //InputLabelProps={{shrink: false}}
                  placeholder=''
                  inputProps={
                    { readOnly: true }
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PersonIcon sx={{ color: '#777777' }} />
                      </InputAdornment>
                    )
                  }}
                />
              )}
              //rules={{ required: true}}
              rules={{ required: 'Completa este campo' }}
            />
          </div>

          <InputTextFieldPasswordWithIcon
            label={"Contraseña Actual"}
            control={control}
            isRequired={true}
            nameRegister={'password_actual'}
          />
          <InputTextFieldPasswordWithIcon
            label={"Nueva Contraseña"}
            control={control}
            isRequired={true}
            nameRegister={'password_new'}
          />

          <InputTextFieldPasswordWithIcon
            label={"Repetir Contraseña"}
            control={control}
            isRequired={true}
            nameRegister={'repeat_password_new'}
          />

          <br />
          {loading ? <KDImage

          /> : null}


          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '10px' }}>
            <ColorButtonGreen variant="contained" sx={{ marginTop: '34px' }} onClick={handleSubmit(onSubmit)}>Enviar</ColorButtonGreen>
            {/*<ColorButton variant="contained" sx={{ marginTop: '34px' }}>Enviar</ColorButton>*/}
            &nbsp; &nbsp;

            <ColorButton variant="contained" sx={{ marginTop: '34px' }}>Buscar</ColorButton>



          </div>

        </Box>

        <ToastContainer />

      </div>
    </div>
  )
}

export default CambiarPassword
