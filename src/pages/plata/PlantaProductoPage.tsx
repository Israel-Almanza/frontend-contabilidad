//import CrearRecetas from '../../app/modules/planta/crear-recetas/CrearRecetas';
//import MuiNavbar from '../../core/components/navbar/MuiNavbar'
import PlantaProducto from '../../app/modules/planta/planta-producto/PlantaProducto';

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
const PlantaProductoPage = () => {
  return (


    <Container>
      <PlantaProducto />
    </Container>



  )
}

export default PlantaProductoPage