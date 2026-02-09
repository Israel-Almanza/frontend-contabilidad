


import { styled } from '@mui/material';



import PedidosExternos from '../../../app/modules/pedidos/pedidos-externos/PedidosExternos';

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


const PedidosExternosPage = () => {
    return (
        <Container>
            <PedidosExternos />
        </Container>
    )
}

export default PedidosExternosPage;
