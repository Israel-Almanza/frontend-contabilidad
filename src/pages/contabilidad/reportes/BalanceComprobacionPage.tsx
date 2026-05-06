import React from 'react'
import BalanceComprobacion from '../../../app/modules/contabilidad/reportes/BalanceComprobacion';
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

const BalanceComprobacionPage = () => {
    return (
        <Container>
            <BalanceComprobacion />
        </Container>
    )
}

export default BalanceComprobacionPage;
