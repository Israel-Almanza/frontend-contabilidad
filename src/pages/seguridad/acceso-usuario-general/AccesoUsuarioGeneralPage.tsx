
//import Solicitudes from '../../app/modules/solicitudes/Solicitudes';


import {  styled } from '@mui/material';
import AccesoUsuarioGeneral from '../../../app/modules/seguridad/acceso-usuario-general/AccesoUsuarioGeneral';

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


const AccesoUsuarioGeneralPage = () => {
    return (
        <Container>
            <AccesoUsuarioGeneral/>
        </Container>
    )
}

export default AccesoUsuarioGeneralPage;
