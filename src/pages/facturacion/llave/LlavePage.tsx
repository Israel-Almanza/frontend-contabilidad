import React from 'react'
import Llave from '../../../app/modules/facturacion/llave/Llave';
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

const LlavePage = () => {
    return (
        <Container>
            <Llave />
        </Container>

    )
}

export default LlavePage;