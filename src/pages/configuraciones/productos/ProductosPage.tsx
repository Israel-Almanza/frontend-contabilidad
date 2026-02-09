import React from 'react'
import Producto from '../../../app/modules/configuraciones/productos/Productos';
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


const ProductoPage = () => {
    return (
        <Container>
            <Producto />
        </Container>
    )
}

export default ProductoPage;