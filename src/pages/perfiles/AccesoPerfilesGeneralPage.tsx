import React from 'react'

import { Box, styled, useTheme } from '@mui/material';


import AccesoPerfilesGeneral from '../../app/modules/perfiles/acceso-perfiles-general/AccesoPerfilesGeneral';

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


const AccesoPerfilesGeneralPage = () => {
    return (
        <Container>
            <AccesoPerfilesGeneral />
        </Container>
    )
}

export default AccesoPerfilesGeneralPage;
