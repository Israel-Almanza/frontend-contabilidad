import React from 'react'

import {styled} from '@mui/material';
import ArticuloVenta from '../../../app/modules/contabilidad/venta/ArticuloVenta';
import CotizacionVenta from '../../../app/modules/contabilidad/venta/CotizacionVenta';
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


const CotizacionVentaPage = () => {
    return (
        <Container>
            <CotizacionVenta />
        </Container>
    )
}

export default CotizacionVentaPage;
