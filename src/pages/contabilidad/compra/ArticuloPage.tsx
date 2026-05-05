import React from 'react'
import Articulo from '../../../app/modules/contabilidad/comun/Articulo';
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

const ArticuloPage = () => {
    return (
        <Container>
            <Articulo />
        </Container>
    )
}

export default ArticuloPage;
