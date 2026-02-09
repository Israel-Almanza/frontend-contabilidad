import React from 'react'
import CrearCliente from '../../app/modules/clientes/crear-cliente/CrearCliente';
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

const CrearClientePage = () => {
    return (
        <Container>
            <CrearCliente />
        </Container>

    )
}

export default CrearClientePage;