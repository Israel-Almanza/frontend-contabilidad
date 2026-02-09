import * as React from 'react';

import { useMediaQuery } from '@mui/material';
//import useMediaQuery from '@mui/material/useMediaQuery';


export const useHookQuery = () => {
    const matches600 = useMediaQuery('(max-width:600px)');
    const matchesDetalle61700 = useMediaQuery('(max-width:1700px)');
    const matchesDetalle51110 = useMediaQuery('(max-width:1110px)');
    const matchesDetalle41090 = useMediaQuery('(max-width:1090px)');
    const matchesDetalle31070 = useMediaQuery('(max-width:1070px)');
    const matchesDetalle21050 = useMediaQuery('(max-width:1050px)');
    const matchesDetalle1000 = useMediaQuery('(max-width:1000px)');
    const matchesTotal750 = useMediaQuery('(max-width:750px)');
    const matchesNit700 = useMediaQuery('(max-width:700px)');
    const matchesCliente680 = useMediaQuery('(max-width:680px)');


    const matchesFecha1655 = useMediaQuery('(max-width:655px)');
    const matchesFactura480 = useMediaQuery('(max-width:480px)');
    const matchesNumero400 = useMediaQuery('(max-width:400px)');
    //const matches600 = useMediaQuery('(min-width:600px)');

    //return <span>{`(min-width:600px) matches: ${matches}`}</span>;
    return {
        matches600,
        matchesDetalle61700,
        matchesDetalle51110,
        matchesDetalle41090,
        matchesDetalle31070,
        matchesDetalle1000,
        matchesDetalle21050,
        matchesTotal750,
        matchesNit700,
        matchesCliente680,


        matchesFecha1655,
        matchesFactura480,
        matchesNumero400
    }
}


//refencias 
{/*


@media (max-width: 1000px) {
    .headHiddenDetalle{
        display: none;
     
    }   
}
@media (max-width: 750px) {
    .headHiddenTotal{
        display: none;
     
    }   
}
@media (max-width: 700px) {
    .headHiddenNit{
        display: none;
     
    }   
}
@media (max-width: 645px) {
    .headHiddenCliente{
        display: none;
     
    }   
}














********************++++
@media (max-width: 655px) {
    .headHiddenFecha{
        display: none;
     
    }   
}
@media (max-width: 480px) {
    .headHiddenFactura{
        display: none;
     
    }   
}
@media (max-width: 400px) {
    .headHiddenNumero{
        display: none;
     
    }   
}

*/}