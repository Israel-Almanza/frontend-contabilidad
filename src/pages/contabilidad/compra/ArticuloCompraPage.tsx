import React from 'react'
import ArticuloCompra from '../../../app/modules/contabilidad/compra/ArticuloCompra';
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


const ArticuloCompraPage = () => {
    return (
        <Container>
            <ArticuloCompra />
        </Container>
    )
}

export default ArticuloCompraPage;
