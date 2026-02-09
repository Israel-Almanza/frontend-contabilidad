import React from 'react'
import EventoSignificativo from '../../../app/modules/facturacion/evento-significativo/EventoSignificativo';
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

const EventoSignificativoPage = () => {
    return (
        <Container>
            <EventoSignificativo />
        </Container>

    )
}

export default EventoSignificativoPage;