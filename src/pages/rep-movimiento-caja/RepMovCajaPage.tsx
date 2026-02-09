
import RepMovCaja from '../../app/modules/rep-movimiento-caja/RepMovCaja';


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

const RepMovCajaPage = () => {
    return (
        
            <Container>
                <RepMovCaja />
            </Container>

    )
}

export default RepMovCajaPage;