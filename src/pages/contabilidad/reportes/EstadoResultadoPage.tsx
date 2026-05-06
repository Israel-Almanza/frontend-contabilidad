import React from 'react'
import EstadoResultado from '../../../app/modules/contabilidad/reportes/EstadoResultado';
import {styled} from '@mui/material';

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

const EstadoResultadoPage = () => {
    return (
        <Container>
            <EstadoResultado />
        </Container>
    )
}

export default EstadoResultadoPage;
