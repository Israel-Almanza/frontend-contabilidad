//import InventarioCierre from '../../../app/modules/pedidos-sucursales/inventario-cierre/InventarioCierre';
import InventarioCierre from '../../../../app/modules/pedidos/sucursales/inventario-cierre/InventarioCierre';

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

const InventarioCierrePage = () => {
    return (

        <Container>
            <InventarioCierre />
        </Container>


    )
}

export default InventarioCierrePage;
