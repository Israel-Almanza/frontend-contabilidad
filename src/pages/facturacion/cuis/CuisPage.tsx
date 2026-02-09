import React from 'react'
import Cuis from '../../../app/modules/facturacion/cuis/Cuis';
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

const CuisPage = () => {
    return (
        <Container>
            <Cuis />
        </Container>

    )
}

export default CuisPage;