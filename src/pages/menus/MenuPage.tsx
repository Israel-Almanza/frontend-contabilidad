import React from 'react'

import { Box, styled, useTheme } from '@mui/material';
import Menu from '../../app/modules/menus/Menu';

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


const UsuarioPage = () => {
    return (
        <Container>
            <Menu />
        </Container>
    )
}

export default UsuarioPage;
