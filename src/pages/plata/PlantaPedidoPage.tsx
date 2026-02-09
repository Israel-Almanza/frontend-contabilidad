//import CrearRecetas from '../../app/modules/planta/crear-recetas/CrearRecetas';
//import MuiNavbar from '../../core/components/navbar/MuiNavbar'
import PedidosPlanta from '../../app/modules/planta/pedidosPlanta/PedidosPlanta';

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
const PlantaPedidosPage = () => {
  return (


    <Container>
      <PedidosPlanta />
    </Container>



  )
}

export default PlantaPedidosPage