import React from 'react'

import {styled} from '@mui/material';
import FacturaCompra from '../../../../app/modules/contabilidad/compras/facturaCompra/FacturaCompra';

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


const FacturaCompraPage = () => {
    return (
        <Container>
            <FacturaCompra />
        </Container>
    )
}

export default FacturaCompraPage;
