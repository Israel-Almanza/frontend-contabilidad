//import { AuthProvider } from './app/modules/auth/context'
//import { SplashScreenProvider } from './core/context/SplashScrean'
//import { BrowserRouter } from 'react-router-dom'
//import { Navigation } from './app/Navigation'

import React, { useState, useEffect, useContext, useReducer } from 'react';
import dataJson from '../../data/example.json'



import { Typography, TextField, Button, InputAdornment, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import useAuth from '../../app/hooks/useAuth';



import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { KDImage } from '../../core/modal-loading/KDImage';


//import { types } from '../../store/storeReducer'
//import { StoreContext } from '../../store/StoreProvider';


const DisabledBackground = styled(Box)({
  width: "100%",
  height: "100vh",
  position: "absolute",
  background: "red",
  opacity: 0.5,
  //zIndex: 1
});

const CircularLoading = () => (
  <>


    <CircularProgress
      size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2
      }}
    />

  </>
);

const Login = () => {



  const { login } = useAuth();
  const navigate = useNavigate()
  //first  local storage 
  //const { login } = useAuth()

  //const [state, dispatch] = useReducer(authReducer, initialStateAuth)


  //const [store, dispatch]  =  useContext(StoreContext)
  //start config loading
  const [loading, setLoading] = useState(

    false

  );

  //end confing loading 

  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control } = useForm();



  const onSubmit = async (data: any) => {


    //setLoading(true);
    console.log(data);
    const { usuario, password } = data;

    try {
      setLoading(true)
      const response: any = await login(usuario, password);

      console.log("login submit ", response)
      setLoading(false)
      if (response?.status == true) {
        navigate('/');
      } else {
        //no pude ingresar al sistema
        if (response?.status == false) {
          setErrorValueEmpty(true)
        }


      }

    } catch (e) {
      console.log(e)
      setLoading(false)
    }





    //await submitData()


  };









  const [textValue, setTextValue] = useState<string>("");

  const [errorValueEmpty, setErrorValueEmpty] = useState(false);

  const [textPasswordValue, setTextPasswordValue] = useState<string>("");



  const handleClickShowPassword = () => {

    setShowPassword(!showPassword);
  };
  return (
    <div style={{ backgroundColor: '#3C3C3C', width: '100%', height: '100vh' }}>
      <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


        <form style={{ marginTop: '5%' }}>

          <Box sx={{
            width: '100%', maxWidth: 390, margin: 'auto', backgroundColor: 'white'
            ,
          }}>
            <div style={{ width: '60%', margin: 'auto', marginBottom: '8px', marginTop: '10%' }}>
              <img style={{ width: '100%', marginTop: '10%' }} src="/assets/dental2.png" />
            </div>

            {errorValueEmpty ? <>
              <div style={{
                backgroundColor: '#DC3545', margin: '5%', display: 'flex', flexDirection: 'row'
                , padding: '7%'
              }}>
                <Typography variant="subtitle1" gutterBottom sx={{
                  color: 'white'
                  , textAlign: 'center',
                  borderRadius: '5px', fontSize: '13px',
                }}>
                  Usuario no encontrado, verifique usuario y contraseña
                </Typography>
                <CloseIcon onClick={() => setErrorValueEmpty(false)} sx={{ fontSize: '12px' }} />
              </div>
            </> : <></>}

            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: '#666666' }}>
              Usuario
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Controller
                name={"usuario"}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField id="outlined-basic" label="Usuario"
                    variant="outlined" sx={{
                      width: '90%',
                    }}
                    value={value}
                    size='small'
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}

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



            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: '#666666' }} >
              Contraseña
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Controller
                name={"password"}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField id="outlined-basic" label="Contraseña" variant="outlined" sx={{ width: '90%' }}
                    value={value}
                    size='small'
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}

                    type={showPassword ? 'text' : 'password'}

                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>

                          {showPassword ? <RemoveRedEyeIcon onClick={() => handleClickShowPassword()}
                          /> : <VisibilityOffIcon onClick={() => handleClickShowPassword()} />}
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                //rules={{ required: true}}
                rules={{ required: 'Completa este campo' }}
              />


            </div>




            <br />
            {loading ? <KDImage

            /> : null}
            <Button variant="contained" sx={{ marginTop: '5%', marginLeft: '69.5%' }}
              type='submit'

              onClick={handleSubmit(onSubmit)}
            >Ingresar</Button>
            <Typography variant="body1" gutterBottom sx={{ color: '#666666', marginLeft: '20px', paddingBottom: '0px' }}>
              V. 1.0.0 General
            </Typography>

          </Box>
        </form>



      </div>
    </div>
  )
}

export default Login
