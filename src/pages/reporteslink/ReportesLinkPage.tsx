
import ReporteCierreTurno from '../../app/modules/reporte-cierre-turno/ReporteCierreTurno';


import { styled } from '@mui/material';

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

const ReportesLinkPage = () => {
    return (

        <Container>
            <iframe id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="800"
                src="https://www.capressocafe.com/">
            </iframe>
        </Container>

    )
}

export default ReportesLinkPage;