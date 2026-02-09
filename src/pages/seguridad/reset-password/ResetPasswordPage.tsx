import React from 'react'


import { styled } from '@mui/material';

import ResetPassword from '../../../app/modules/seguridad/reset-password/ResetPassword';

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


const ResetPasswordPage = () => {
    return (
        <Container>
            <ResetPassword />
        </Container>
    )
}

export default ResetPasswordPage;
