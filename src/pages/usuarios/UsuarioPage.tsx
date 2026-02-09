import React from 'react'

import { Box, styled, useTheme } from '@mui/material';
import Usuario from '../../app/modules/usuarios/Usuario';

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


const UsuarioPage = () => {
    return (
        <Container>
            <Usuario />
        </Container>
    )
}

export default UsuarioPage;
