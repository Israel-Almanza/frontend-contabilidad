import { Typography, Button, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import AplicationConnect from '../../../../core/api/AplicationConnect';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
//    width: '38%',
    minWidth: 350,
    //display: 'block',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 54,
    //p: 2,
};


export const ModalPersonalized = (props:any) => {

    const {openModalPersonalized,handleOpenModalPersonalized ,
      handleCloseModalPersonalized,description, Datos,DETALLE,ID_VENTA} = props;
   
    const { idSucursal } = useParams()
   
    const [rows, setRows] = React.useState([]);
    //end codigo exitoso
    useEffect(() => {
      //console.log("DatosVentaModal ", Datos)
      setRows(Datos)
  }, [Datos]);


    function Row(props: any) {
        const { row } = props;
        console.log("que es**",row)
   
    
        return (
          <React.Fragment>
            <TableRow >
              
              <TableCell
                sx={{
                  // padding: "0px 0px",
                  paddingLeft: '10px',
                  // fontWeight: 'bold',
                  //   borderBottom: "1px solid white",
                  borderRight: "1px solid #A7A7A7",
                  borderBottom: "1px solid #A7A7A7",
                  wordBreak:'normal',
                  // borderBottom: "1px solid #A7A7A7",
                  //backgroundColor: "#C8E6C9",
                  "&:active": { backgroundColor: "blue" }
                }}
                align="center"
               
                //className='headHiddenNumero'
              >
                {row.PRODUCTO_UNICO}
              </TableCell>
              <TableCell
                sx={{
                  //padding: "0px 0px",
    
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
                //className='headHiddenFactura'
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
                //className='headHiddenFecha'
              >
                {row.PRECIO}
    
              </TableCell>
    
              <TableCell
                sx={{
                  padding: "0px 0px",
                  //backgroundColor: "#C8E6C9",
                  borderRight: "1px solid #A7A7A7",
                  borderBottom: "1px solid #A7A7A7",
                  paddingLeft: '10px',
                }}

                align="center"
                //className='headHiddenCliente'
              >
                 {row.PRECIO * row.CANTIDAD}
              </TableCell>

            </TableRow>
           
    
          </React.Fragment>
        );
        
      }

      const loadFacturaComandaPDF = async () => {

       // console.log("api test", row)
    
  
  
          try {
            const response = await AplicationConnect.post<any>(`/ImprimirComanda`, {
              "sucursal": idSucursal,
              "venta": ID_VENTA
            }, { responseType: 'blob' })
            console.log("response", response.data)
            //  window.open(URL.createObjectURL(response.data),'_blank', 'noreferrer');
    
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(response.data);
            handleCloseModalPersonalized()
            window.open(URL.createObjectURL(response.data));
  
    
          } catch (error) {
    
          }
  
      }

    return (
        <Modal
            open={openModalPersonalized}
            //onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
              <div style={{ 
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                 borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#DC3545'
                }}>
                <Typography id="modal-modal-description" sx={{
                    mt: 1, textAlign: 'left', fontWeight: 'bold',marginLeft: '3%',
                    fontSize: '1rem', fontFamily: 'Times New Roman', color: 'white'
                }}>
                   {description}
                </Typography>
                <Button onClick={() => handleCloseModalPersonalized()}
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
                <div style={{ margin:'15px' }}>
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
                                    backgroundColor: '#E12129',
                                    wordBreak: 'normal'
                                    }}
                                    align="left"
                                >
                                    <Typography  sx={{ marginLeft: '6px', color: 'white', fontSize:'12px', fontFamily:'Times New Roman' }} >
                                    Producto
                                    </Typography>
                                    
                                </TableCell>
                                <TableCell sx={{ background:'#757575',  width: '2%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center"
                                   
                                >
                                    <Typography  sx={{ marginLeft: '6px', color: 'white', fontSize:'12px', fontFamily:'Times New Roman' }} >
                                    Cantidad
                                    </Typography>
                                    
                                </TableCell>
                                <TableCell sx={{ background:'#757575', width: '4%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center"
                                    
                                >
                                    <Typography  sx={{ marginLeft: '6px', color: 'white', fontSize:'12px', fontFamily:'Times New Roman' }} >
                                    P. Unitario
                                    </Typography>
                                    
                                </TableCell>
                                <TableCell sx={{ background:'#757575', width: '4%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center" >
                                <Typography  sx={{ marginLeft: '6px', color: 'white', fontSize:'12px', fontFamily:'Times New Roman' }} >
                                    Precio
                                    </Typography>
                                    
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {DETALLE? DETALLE?.map((row: any, index: any) => {
                            //const isItemSelected = isSelected(row.nombre);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                
                                <Row key={index} row={row} />
                                
                            )
                            }) : null} 
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
                    
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                    <Button sx={{ backgroundColor: '#E12129' }} variant="contained"  onClick={() => loadFacturaComandaPDF()}>Imprimir</Button>&nbsp; &nbsp;
                </div>
                <br/>
                
            </Box>
        </Modal>
    )
}
