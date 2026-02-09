
import ReporteCierreTurno from '../../app/modules/reporte-cierre-turno/ReporteCierreTurno';


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

const ReporteCierreTurnoPage = () => {
    return (
        
            <Container>
                <ReporteCierreTurno />
            </Container>

    )
}

export default ReporteCierreTurnoPage;