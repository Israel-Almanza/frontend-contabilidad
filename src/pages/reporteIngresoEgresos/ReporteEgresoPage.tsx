
import ReporteEgresos from '../../app/modules/reporte-ingresos-egresos/egresos/ReporteEgresos';


import { styled} from '@mui/material';

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

const ReporteEgresosPage = () => {
    return (
        
            <Container>
                <ReporteEgresos />
            </Container>

    )
}

export default ReporteEgresosPage;