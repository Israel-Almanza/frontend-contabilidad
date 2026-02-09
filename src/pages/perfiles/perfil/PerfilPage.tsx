import React from 'react'

import { Box, styled, useTheme } from '@mui/material';
import Perfil from '../../../app/modules/perfiles/perfil/Perfil';

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


const PerfilPage = () => {
    return (
        <Container>
            <Perfil />
        </Container>
    )
}

export default PerfilPage;
