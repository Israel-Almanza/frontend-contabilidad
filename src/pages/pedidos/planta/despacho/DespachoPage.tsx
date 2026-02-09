


import { styled } from '@mui/material';


import Despacho from '../../../../app/modules/pedidos/planta/despacho/Despacho';

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


const DespachoPage = () => {
    return (
        <Container>
            <Despacho />
        </Container>
    )
}

export default DespachoPage;
