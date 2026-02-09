


import { styled } from '@mui/material';

import PedidosExtraordinarios from '../../../app/modules/pedidos/pedidos-extraordinarios/PedidosExtraordinarios';



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
            <PedidosExtraordinarios />
        </Container>
    )
}

export default AccessibilidadPage;
