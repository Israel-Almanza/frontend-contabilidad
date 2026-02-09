import React from 'react'

import { Box, styled, useTheme } from '@mui/material';
import Cita from '../../app/modules/cita/Cita'

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


const CitaPage = () => {
    return (
        <Container>
            <Cita />
        </Container>
    )
}

export default CitaPage;

