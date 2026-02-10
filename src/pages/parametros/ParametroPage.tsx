import React from 'react'

import { Box, styled, useTheme } from '@mui/material';
import Parametro from '../../app/modules/parametros/Paremtro';

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


const ParametroPage = () => {
    return (
        <Container>
            <Parametro />
        </Container>
    )
}

export default ParametroPage;
