import React from 'react'

import {styled} from '@mui/material';
import ArticuloVenta from '../../../../app/modules/contabilidad/compras/articuloVenta/ArticuloVenta';
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


const ArticuloVentaPage = () => {
    return (
        <Container>
            <ArticuloVenta />
        </Container>
    )
}

export default ArticuloVentaPage;
