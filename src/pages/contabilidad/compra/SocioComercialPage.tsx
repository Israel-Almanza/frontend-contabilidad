import React from 'react'
import SocioComercial from '../../../app/modules/contabilidad/comun/SocioComercial';
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

const SocioComercialPage = () => {
    return (
        <Container>
            <SocioComercial />
        </Container>
    )
}

export default SocioComercialPage;
