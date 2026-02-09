//import CrearRecetas from '../../app/modules/planta/crear-recetas/CrearRecetas';
//import MuiNavbar from '../../core/components/navbar/MuiNavbar'
import Presentacion from '../../app/modules/planta/presentacion/Presentacion';

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
const PlantaPresentacionPage = () => {
  return (


    <Container>
      <Presentacion />
    </Container>



  )
}

export default PlantaPresentacionPage