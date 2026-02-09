//import Solicitudes from '../../../app/modules/pedidos-sucursales/solicitudes/Solicitudes';
import Solicitudes from '../../../../app/modules/pedidos/sucursales/solicitudes/Solicitudes';
import {  styled } from '@mui/material';

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
const SolicitudesPage = () => {
    return (
        <Container>
        <Solicitudes />
        </Container>
       
    )
}

export default SolicitudesPage;
