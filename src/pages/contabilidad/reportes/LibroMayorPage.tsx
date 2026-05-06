import React from 'react'
import LibroMayor from '../../../app/modules/contabilidad/reportes/LibroMayor';
import {styled} from '@mui/material';

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

const LibroMayorPage = () => {
    return (
        <Container>
            <LibroMayor />
        </Container>
    )
}

export default LibroMayorPage;
