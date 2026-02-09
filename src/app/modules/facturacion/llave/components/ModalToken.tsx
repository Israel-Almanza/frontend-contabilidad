import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Box from '@mui/material/Box';


const styleModal = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '28%',
    minWidth: 420,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 2,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


export const ModalMostrarToken = (props:any) => {

    const {openModalToken,handleOpenModalToken, handleCloseModalToken,Token} = props;
//console.log("respuesta ",Token)

    const [rows, setRows] = React.useState<any>([]);

    const onChangeNameToken = (event: any) => {
        //console.log("api token ", event.target.value)
        //setToken(event.target.value)
  
    }

    const closeModalResetForm = () => {

        //setToken('')
        handleCloseModalToken()
    }

    return (
        <Modal
            open={openModalToken}
            //onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

            <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: '#DC3545', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
                }}>

                    <Typography id="modal-modal-description" sx={{
                        mt: 1,
                        textAlign: 'center',
                        //fontWeight: 'bold',
                        marginLeft: '3%',
                        color:'white',
                        fontSize: '1.2rem', //marginBottom: '10px'
                        fontFamily: 'Times New Roman'
                    }}>
                        Ver API Key
                    </Typography>
                    <Button onClick={() => closeModalResetForm()}
                        sx={{
                            color: 'black',
                            ':hover': {
                                color: 'white'
                            }
                        }}
                    >
                        <CancelPresentationIcon
                        />
                    </Button>
            </div>
                <br />
                <div style={{ margin:'15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Token API</h4>
                  <TextField
                      sx={{ width: '100%', backgroundColor: '#FFF9C4 ' }}
                      //label="Punto de Venta"
                      onChange={onChangeNameToken}
                      value={Token.TOKEN_API} 
                      multiline
                      maxRows={20}
                      InputProps={{
                        readOnly: true,
                      }}
                      
                  />
                  
                </div>
                </div>
                <br/>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={closeModalResetForm} sx={{
                        backgroundColor: '#6E7881',
                        '&:hover': {
                            backgroundColor: '#474849',
                        },

                    }} variant="contained" >Cancel</Button>
                </div>
                <br/>
            </Box>
        </Modal>
    )
}
