


import { styled } from '@mui/material';



import CronogramaEntrega from '../../../app/modules/pedidos/cronograma-entrega/CronogramaEntrega';
//import TransferenciaProductos from '../../../app/modules/pedidos/transferencia-productos/TransferenciaProductos';

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


const CronogramaEntregaPage = () => {
    return (
        <Container>
            <CronogramaEntrega />
        </Container>
    )
}

export default CronogramaEntregaPage;
