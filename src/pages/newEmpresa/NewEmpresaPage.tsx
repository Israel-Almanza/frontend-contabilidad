import NewEmpresa from '../../app/modules/pedidos/crearNuevaEmpresa/NuevaEmpresa';

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
const NewEmpresaPage = () => {
  return (


    <Container>
      <NewEmpresa />
    </Container>



  )
}

export default NewEmpresaPage