//import CrearRecetas from '../../app/modules/planta/crear-recetas/CrearRecetas';
//import MuiNavbar from '../../core/components/navbar/MuiNavbar'
import Proveedor from '../../app/modules/planta/proveedor/Proveedor';

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
const PlantaProveedorPage = () => {
  return (


    <Container>
      <Proveedor />
    </Container>



  )
}

export default PlantaProveedorPage