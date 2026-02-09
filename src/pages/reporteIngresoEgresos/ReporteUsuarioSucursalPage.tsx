
import RepUsuarioSucursal from '../../app/modules/reporte-ingresos-egresos/reporteUsuarioSucursal/ReporteUsuariosSucursales';


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

const ReporteUsuarioSucursalPage = () => {
    return (
        
            <Container>
                <RepUsuarioSucursal />
            </Container>

    )
}

export default ReporteUsuarioSucursalPage;