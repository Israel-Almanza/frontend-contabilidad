import React from 'react'
//import CrearRecetas from '../../app/modules/crear-recetas/CrearRecetas'
import CrearRecetas from '../../app/modules/recetas/crear-recetas/CrearRecetas';
//import MuiNavbar from '../../core/components/navbar/MuiNavbar'


import { Box, styled, useTheme } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px'
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  }
}));
const CrearRecetaPage = () => {
  return (


    <Container>
      <CrearRecetas />
    </Container>



  )
}

export default CrearRecetaPage