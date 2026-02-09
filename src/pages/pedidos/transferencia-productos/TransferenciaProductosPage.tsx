


import { styled } from '@mui/material';




import TransferenciaProductos from '../../../app/modules/pedidos/transferencia-productos/TransferenciaProductos';

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


const TransferenciaProductosPage = () => {
    return (
        <Container>
            <TransferenciaProductos />
        </Container>
    )
}

export default TransferenciaProductosPage;
