import React from 'react'

import { Box, styled, useTheme } from '@mui/material';
import Permiso from '../../app/modules/permisos/Permiso';

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


const PermisoPage = () => {
    return (
        <Container>
            <Permiso />
        </Container>
    )
}

export default PermisoPage;
