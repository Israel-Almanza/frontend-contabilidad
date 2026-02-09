


import {  styled } from '@mui/material';

import Accesibilidad from '../../app/modules/usuarios-x/accesibilidad/Accesibilidad';

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


const AccessibilidadPage = () => {
    return (
        <Container>
            <Accesibilidad />
        </Container>
    )
}

export default AccessibilidadPage;
