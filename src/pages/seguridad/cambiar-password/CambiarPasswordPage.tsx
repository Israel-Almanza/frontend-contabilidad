


import {  styled } from '@mui/material';
import CambiarPassword from '../../../app/modules/seguridad/cambiar-password/CambiarPassword';

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


const CambiarPasswordPage = () => {
    return (
        <Container>
            <CambiarPassword />
        </Container>
    )
}

export default CambiarPasswordPage;
