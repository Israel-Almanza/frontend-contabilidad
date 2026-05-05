import React from 'react'
import EntradaDiario from '../../../app/modules/contabilidad/comun/EntradaDiario';
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

const EntradaDiarioPage = () => {
    return (
        <Container>
            <EntradaDiario />
        </Container>
    )
}

export default EntradaDiarioPage;
