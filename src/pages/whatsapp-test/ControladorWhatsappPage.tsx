

import Venta from '../../app/modules/venta/Venta';
//import Solicitudes from '../../app/modules/solicitudes/Solicitudes';
import CotroladorWhatsapp from '../../app/modules/whatsapp-test/CotroladorWhatsapp'

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


const ControladorWhatsappPage = () => {
    return (
        <Container>
            <CotroladorWhatsapp />
        </Container>
    )
}

export default ControladorWhatsappPage;
