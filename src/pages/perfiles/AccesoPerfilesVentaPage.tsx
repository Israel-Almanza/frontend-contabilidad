import React from 'react'

import { Box, styled, useTheme } from '@mui/material';


import AccesoPerfilesVenta from '../../app/modules/perfiles/acceso-perfiles-venta/AccesoPerfilesVenta';

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


const AccesoPerfilesVentaPage = () => {
    return (
        <Container>
            <AccesoPerfilesVenta />
        </Container>
    )
}

export default AccesoPerfilesVentaPage;
