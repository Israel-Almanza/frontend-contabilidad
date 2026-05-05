import React from 'react'

import {styled} from '@mui/material';
import ClienteVenta from '../../../app/modules/contabilidad/venta/ClienteVenta';
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


const ClienteVentaPage = () => {
    return (
        <Container>
            <ClienteVenta />
        </Container>
    )
}

export default ClienteVentaPage;
