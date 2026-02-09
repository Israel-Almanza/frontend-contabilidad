
//import Solicitudes from '../../app/modules/solicitudes/Solicitudes';


import { styled} from '@mui/material';

import AccesoBotonSucursal from '../../../app/modules/seguridad/acceso-boton-sucursal/AccesoBotonSucursal';

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


const AccesoBotonSucursalPage = () => {
    return (
        <Container>
            <AccesoBotonSucursal />
        </Container>
    )
}

export default AccesoBotonSucursalPage;
