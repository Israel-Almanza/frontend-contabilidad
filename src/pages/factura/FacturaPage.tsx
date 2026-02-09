import React from 'react'

import { Box, styled, useTheme } from '@mui/material';
import Factura from '../../app/modules/factura/Factura'

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


const PacientePage = () => {
    return (
        <Container>
            <Factura />
        </Container>
    )
}

export default PacientePage;

