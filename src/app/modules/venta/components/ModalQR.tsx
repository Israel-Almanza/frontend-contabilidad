import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import AplicationConnect from '../../../../core/api/AplicationConnect';
import Swal from "sweetalert2";
//import QrReader from 'react-qr-reader';
//import { QrReader } from 'react-qr-reader';
import PedidosConsolidados from '../../pedidos-consolidados/PedidosConsolidados';


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    maxWidth: 350,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 20,
    p: 2,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


export const ModalQR = (props: any) => {

    const { openModalQR, handleOpenModalQR, handleCloseModalQR, description, tableData, ID_VENTA } = props;
    const [dataQr, setDataQr] = useState('No result');

    const readQr = () => {
        return (
            <>
                {/* <QrReader
                    onResult={(result: any, error: any) => {
                        if (!!result) {
                            setDataQr(result?.text);
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    style={{ width: '50%' }}
                /> */}
                <p>{dataQr}</p>
            </>
        )
    }
    return (
        <Modal
            open={openModalQR}
            onClose={handleCloseModalQR}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>



                <Typography id="modal-modal-description" sx={{
                    mt: 2, textAlign: 'center', fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                    Escanear Codigo QR
                </Typography>
                {readQr()}
                <br />
                {/* <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         /> */}
                <div  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button  sx={{ backgroundColor: '#DD6B55' }} variant="contained" >Continuar</Button>
                    &nbsp; &nbsp;
                    <Button onClick={handleCloseModalQR} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}
