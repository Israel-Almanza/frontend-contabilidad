
//import RecetaCombo from '../../app/modules/receta/RecetaCombo';
import ProductoInventarioNew from '../../app/modules/pedidos/crearProductoInventario/ProductosInventario';
//import Solicitudes from '../../app/modules/solicitudes/Solicitudes';



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

const ProductoInventarioPage = () => {
    return (

        <Container>
            <ProductoInventarioNew />
        </Container>



    )
}

export default ProductoInventarioPage;
