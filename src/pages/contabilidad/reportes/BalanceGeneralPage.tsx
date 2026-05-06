import React from 'react'
import BalanceGeneral from '../../../app/modules/contabilidad/reportes/BalanceGeneral';
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

const BalanceGeneralPage = () => {
    return (
        <Container>
            <BalanceGeneral />
        </Container>
    )
}

export default BalanceGeneralPage;
