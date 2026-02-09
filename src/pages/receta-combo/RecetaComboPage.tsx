
//import RecetaCombo from '../../app/modules/receta/RecetaCombo';
import RecetaCombo from '../../app/modules/recetas/receta-combo/RecetaCombo';
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

const RecetaComboPage = () => {
    return (

        <Container>
            <RecetaCombo />
        </Container>



    )
}

export default RecetaComboPage;
