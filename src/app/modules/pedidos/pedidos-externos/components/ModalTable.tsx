


import { Typography, Button, Collapse, TextField, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'


import Box from '@mui/material/Box';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';



const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '80%',

  // minWidth: 440,
  overflow: 'scroll',
  height: '90%',
  display: 'block',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


export const ModalTable = (props: any) => {

  const { openModalPersonalized, handleOpenModalPersonalized,
    handleCloseModalPersonalized, title, DETALLE } = props;





 

  return (
    <Modal
      open={openModalPersonalized}
      //onClose={handleCloseModalPersonalized}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>



        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <Typography id="modal-modal-description" sx={{
            mt: 0, textAlign: 'left', fontWeight: 'bold',
            fontSize: '1rem', fontFamily: 'Times New Roman'
          }}>
            {title}
          </Typography>
          <Button onClick={handleCloseModalPersonalized}
            sx={{
              color: 'black',
              ':hover': {
                backgroundColor: '#DC3545', color: 'white'
              }
            }}
          >
            <CancelPresentationIcon
            />
          </Button>
        </div>
        <br />
        <TableContainer
          onClick={() => {
            //console.log("Detected Table Container Click");
          }}
          component={Paper}
          sx={{
            // border: "4px solid rgba(0,0,0,0.2)",
            //padding: 1,
            // height: '420px',
            margin: '0px', padding: '0px', marginTop: '5px'
          }}
        >
          <Table sx={{ tableLayout: "auto" }}>
            <TableHead>
              {/* <button onClick={()=> console.log("data en modal ",Datos)}>DATA SHOW</button> */}
              <TableRow
                sx={{
                  //  backgroundColor: "#BCEAFD",
                  //borderBottom: "2px solid black",

                  "& th": {
                    fontSize: "12px",
                    //fontSize: "0.8rem",
                    //  height: "5px",
                    // color: "black",
                    //  borderBottom: "1px solid white",

                  }
                }}
              >
                <TableCell
                  sx={{

                    width: '10%',
                    backgroundColor: '#E12129'
                  }}
                  align="left"
                >
                  <Typography sx={{ marginLeft: '6px', color: 'white', fontSize: '12px', fontFamily: 'Times New Roman' , wordBreak: 'normal'}} >
                    Producto
                  </Typography>

                </TableCell>
                <TableCell sx={{ background: '#757575', width: '5%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center"

                >
                  <Typography sx={{ marginLeft: '6px', color: 'white', fontSize: '12px', fontFamily: 'Times New Roman' , wordBreak: 'normal'}} >
                    Cantidad
                  </Typography>

                </TableCell>
                <TableCell sx={{ background: '#757575', width: '3%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center"

                >
                  <Typography sx={{ marginLeft: '6px', color: 'white', fontSize: '12px', fontFamily: 'Times New Roman', wordBreak: 'normal' }} >
                    P. Unitario
                  </Typography>

                </TableCell>
                {/*           <TableCell sx={{ background:'#757575', width: '3%' }} align="center" >
                                <Typography  sx={{ marginLeft: '6px', color: 'white', fontSize:'12px', fontFamily:'Times New Roman' }} >
                                    Precio
                                    </Typography>
                                    
                                </TableCell>*/}

              </TableRow>
            </TableHead>

            <TableBody>

              {DETALLE ? DETALLE?.map((row: any, index: any) => {

                return (

                  <TableRow key={index} >

                    <TableCell
                      sx={{
                         padding: "0px 0px",
                        paddingLeft: '10px',
                        // fontWeight: 'bold',
                        //   borderBottom: "1px solid white",
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                        // borderBottom: "1px solid #A7A7A7",
                        //backgroundColor: "#C8E6C9",
                        //  "&:active": { backgroundColor: "blue" }
                      }}
                      align="left"


                    >
                      {row.SUB_CATEGORIA_2}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "0px 0px",

                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                        fontWeight: 'bold',
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '10px',
                        //borderBottom: "1px solid white",
                        fontSize: "12px"
                        // fontSize: "1.1rem"
                      }}
                      align="center"

                    >
                      {row.CANTIDAD}
                    </TableCell>
                     <TableCell
                        sx={{
                          padding: "0px 0px",
                          //backgroundColor: "#C8E6C9",
                          borderRight: "1px solid #A7A7A7",
                          borderBottom: "1px solid #A7A7A7",
                        }}
            
                        
                        align="center"
                        className='headHiddenFecha'
                      >
                        {row.COSTO_UNITARIO}
            
                      </TableCell>

                  

                  </TableRow>

                )
              }) : null}
            </TableBody>
          </Table>
        </TableContainer>
        &nbsp; &nbsp;
     
      </Box>
    </Modal>
  )
}
