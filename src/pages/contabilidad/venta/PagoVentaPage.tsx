import React from 'react'

import {styled} from '@mui/material';
import PagoVenta from '../../../app/modules/contabilidad/venta/PagoVenta';
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


const PagoVentaPage = () => {
    return (
        <Container>
            <PagoVenta />
        </Container>
    )
}

export default PagoVentaPage;
