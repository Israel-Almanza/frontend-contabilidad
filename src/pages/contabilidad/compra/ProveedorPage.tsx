import React from 'react'
import Proveedor from '../../../app/modules/contabilidad/compra/Proveedor';
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


const ProveedorPage = () => {
    return (
        <Container>
            <Proveedor />
        </Container>
    )
}

export default ProveedorPage;
