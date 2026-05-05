import React from 'react'
import FacturaVenta from '../../../app/modules/contabilidad/venta/FacturaVenta';
import {styled} from '@mui/material';

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


const FacturaVentaPage = () => {
    return (
        <Container>
            <FacturaVenta />
        </Container>
    )
}

export default FacturaVentaPage;
