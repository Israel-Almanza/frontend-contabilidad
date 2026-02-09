//import Recepcion from '../../../app/modules/pedidos-sucursales/recepcion/Recepcion';
import Recepcion from '../../../../app/modules/pedidos/sucursales/recepcion/Recepcion';
import {  styled} from '@mui/material';

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

const RecepcionPage = () => {
    return (
        
            <Container>
                <Recepcion />
            </Container>

    )
}

export default RecepcionPage;