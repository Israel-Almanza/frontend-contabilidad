import React from 'react'
//import PedidosConsolidados from '../../app/modules/pedidos-consolidados/PedidosConsolidados';
import PedidosConsolidados from '../../app/modules/pedidos/planta/pedidos-consolidados/PedidosConsolidados';
//import MuiNavbar from '../../core/components/navbar/MuiNavbar';

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

const PedidosConsolidadosPage = () => {
    return (
        <Container>
            <PedidosConsolidados />
        </Container>

    )
}

export default PedidosConsolidadosPage;