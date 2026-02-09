
import CrearRecetas from '../../app/modules/planta/recepcionPlanta/RecepcionPlanta';
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
const PlantaRecepcionPage = () => {
  return (


    <Container>
      <CrearRecetas />
    </Container>



  )
}

export default PlantaRecepcionPage