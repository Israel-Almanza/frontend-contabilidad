//import PerfilPedido from '../../../app/modules/pedidos-sucursales/perfil-pedido/PerfilPedido';
import PerfilPedido from '../../../../app/modules/pedidos/sucursales/perfil-pedido/PerfilPedido';
import {styled} from '@mui/material';

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

const PerfilPedidoPage = () => {
    return (
            <Container>
                <PerfilPedido />
            </Container>

    )
}

export default PerfilPedidoPage;