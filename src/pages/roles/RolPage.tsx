import React from 'react'

import { Box, styled, useTheme } from '@mui/material';

import Rol from '../../app/modules/roles/Rol';

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


const RolPage = () => {
    return (
        <Container>
            <Rol />
        </Container>
    )
}

export default RolPage;
