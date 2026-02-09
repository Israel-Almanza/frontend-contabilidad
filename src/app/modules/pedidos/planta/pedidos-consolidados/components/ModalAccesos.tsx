import { Typography, Button, Collapse, TextField, Modal, CardActionArea  } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { usePedidosConsolidados } from '../services/usePedidosConsolidados';
import { KDImage } from '../../../../../../core/modal-loading/KDImage';
import { AlertSave, AlertError, AlertQuestion } from '../../../../../common/alerts/alerts';
import { ModalActivarSucursal } from './ModalActivar';
import { ModalDesactivarSucursal } from './ModalDesactivar';
import { styled } from "@mui/system";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
//    width: '38%',
    minWidth: 360,
    //display: 'block',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 54,
    p: 2,
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#008000'),
  backgroundColor: '#008000',
  '&:hover': {
      backgroundColor: '#0A680A',
  },
}));

const ColorButtonRed = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#D32F2F'),
  backgroundColor: '#D32F2F',
  '&:hover': {
      backgroundColor: '#b82c2c',
  },
}));

export const ModalAccesos = (props:any) => {
   const {loadApiBloquearTodos,loadApiDesbloquearTodos,loadApiCambiarEstado} = usePedidosConsolidados();
    const {openModalAcceso,handleOpenModalAcceso ,SucursalEstado,
      handleCloseModalAcceso, Datos,SucursalesEstado,FechaCentral} = props;
    
    
    
    //console.log("Sucursales Estado** ",SucursalesEstado)
    const [rows, setRows] = React.useState([]);
    const [selected, setSelected] = React.useState<any>([]);
    //end codigo exitoso
    useEffect(() => {
      //console.log("DatosVentaModal ", Datos)
      setRows(Datos)
  }, [Datos]);

  //loading
const [loading, setLoading] = useState(
  false
);

//modal activar
const [openModalEstadoA, setOpenModalEstadoA] = useState(false);
const handleOpenModalEstadoA = () => setOpenModalEstadoA(true);
const handleCloseModalEstadoA = () => setOpenModalEstadoA(false);

//modal desactivar
const [openModalEstadoDes, setOpenModalEstadoDes] = useState(false);
const handleOpenModalEstadoDes = () => setOpenModalEstadoDes(true);
const handleCloseModalEstadoDes = () => setOpenModalEstadoDes(false);

const [CODIGO, setCODIGO] = useState('')
const [SUFIJO, setSUFIJO] = useState('')

    function Row(props: any) {
        const { row } = props;
        //console.log("que es**",row)
   
   
        // const valorInicialExpanded = () => {
        //   var expanded_local: any = localStorage.getItem("expanded_local");
        //   console.log("expanded local value ", expanded_local)
        //   if (expanded_local && expanded_local != undefined && expanded_local != null) {
        //     var expanded_local_aux = JSON.parse(expanded_local)
        //     return expanded_local_aux;
        //   } else {
        //     return false
        //   }
    
    
        // }
    
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
                align="left"
               
                //className='headHiddenNumero'
              >
                {row.descripcion}
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
                {/* {row.bloqueado} */}
                {row.bloqueado == 0 ?
                   <>
                   <CardActionArea
                     sx={{
                       padding: '0', margin: '0', marginTop: '0px', width: '28px',backgroundColor: '#28A745',color: 'white'
                     }} 
                     onClick={() => pasarParametrosDesactivar(row)}
                   >
                     <LockOpenIcon
                       //titleAccess={rowBtn.TITLE}
                       sx={{ backgroundColor: '#28A745', color: 'white', fontSize: '1.3rem', padding: '2px' }}
                     />
                   </CardActionArea>
                   </>
                   :
                   <>
                   <CardActionArea
                     sx={{
                       padding: '0', margin: '0', marginTop: '0px', width: '28px',backgroundColor: '#D32F2F',color: 'white'
                     }} 
                     onClick={() => pasarParametrosActivar(row)}
                   >
                     <LockIcon
                       //titleAccess={rowBtn.TITLE}#D32F2F 
                       sx={{ backgroundColor: '#D32F2F', color: 'white', fontSize: '1.3rem', padding: '2px' }}
                     />
                   </CardActionArea>
                   </>} 
              </TableCell>
              

            </TableRow>
           
    
          </React.Fragment>
        );
        
      }

      const SucursalBloquearEstado = async () => {

        try {
      
          //parametro ncesarios
          console.log( FechaCentral)
          handleCloseModalAcceso()
          //setLoading(true)
          const response = await loadApiBloquearTodos(
            FechaCentral
            )

          //setLoading(false)
          console.log("respuesta bloqueo ", response)
          
          if (response?.status) {
            await SucursalEstado(FechaCentral)
            handleCloseModalAcceso()
            AlertSave({ title: "", message: response.message });
    
          }
          if (response?.status == false) {
            AlertQuestion({ title: '', message: response.message })
    
    
          }
    
          if (response == undefined) {
            AlertError({ title: '', message: response.message })
          }
    
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }

      const SucursalDesbloquearEstado = async () => {

        try {
      
          //parametro ncesarios
          console.log( FechaCentral)
          handleCloseModalAcceso()
          //setLoading(true)
          const response = await loadApiDesbloquearTodos(
            FechaCentral
            )
          //setLoading(false)
          console.log("respuesta desbloqueo ", response)
          
          if (response?.status) {
            await SucursalEstado(FechaCentral)
            handleCloseModalAcceso()
            AlertSave({ title: "", message: response.message });
    
          }
          if (response?.status == false) {
            AlertQuestion({ title: '', message: response.message })
    
    
          }
    
          if (response == undefined) {
            AlertError({ title: '', message: response.message })
          }
    
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }

      const pasarParametrosActivar = (row: any) => {
        const { codigo, sufijo  } = row;
        console.log("row ", row)
        setCODIGO(codigo)
        setSUFIJO(sufijo)
        handleOpenModalEstadoA()
    
      }
    
      const pasarParametrosDesactivar = (row: any) => {
        const { codigo, sufijo } = row;
        console.log("row ", row)
        setCODIGO(codigo)
        setSUFIJO(sufijo)
        handleOpenModalEstadoDes()
    
      }

      

    return (
        <Modal
            open={openModalAcceso}
            //onClose={handleCloseModalPersonalized}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
              <div style={{ 
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                 borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
                }}>
                <Typography id="modal-modal-description" sx={{
                    mt: 0, textAlign: 'left', fontWeight: 'bold',
                    fontSize: '1rem', fontFamily: 'Times New Roman'
                }}>
                   Acceso de pedidos - {FechaCentral}
                </Typography>
                <Button onClick={() => handleCloseModalAcceso()}
            sx={{
              color: 'black',
              ':hover': {
                color: 'lead'
              }
            }}
          >
            <CancelPresentationIcon
            />
          </Button>
              </div>
              &nbsp;
              &nbsp; 
              <ColorButtonRed 
              onClick={SucursalBloquearEstado} 
              variant="contained"
              >Bloquear Todos</ColorButtonRed>
              &nbsp; &nbsp;
              <ColorButton 
              onClick={SucursalDesbloquearEstado} 
              variant="contained" 
              >Desbloquear Todos</ColorButton>
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
                                    
                                    width: '70%',
                                    backgroundColor: '#E12129',
                                    wordBreak: 'normal'
                                    }}
                                    align="left"
                                >
                                    <Typography  sx={{ marginLeft: '6px', color: 'white', fontSize:'12px', fontFamily:'Times New Roman' }} >
                                    Sucursal
                                    </Typography>
                                    
                                </TableCell>
                                <TableCell sx={{ background:'#757575',  width: '30%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center"
                                   
                                >
                                    <Typography  sx={{ marginLeft: '6px', color: 'white', fontSize:'12px', fontFamily:'Times New Roman' }} >
                                    Permiso
                                    </Typography>
                                    
                                </TableCell>
                               

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {SucursalesEstado? SucursalesEstado?.map((row: any, index: any) => {
                            //const isItemSelected = isSelected(row.nombre);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                
                                <Row key={index} row={row} />
                                
                            )
                            }) : null} 
                        </TableBody>
                    </Table>
                </TableContainer>
                    {/* &nbsp; &nbsp;
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                    <Button sx={{ backgroundColor: '#E12129' }} variant="contained"  onClick={() => loadFacturaComandaPDF()}>Imprimir</Button>
                </div> */}
                {loading ? <KDImage /> : null}

                <ModalActivarSucursal
                openModalEstadoA={openModalEstadoA}
                handleOpenModalEstadoA={handleOpenModalEstadoA}
                handleCloseModalEstadoA={handleCloseModalEstadoA}
                CODIGO={CODIGO}
                SUFIJO={SUFIJO}
                SucursalEstado={SucursalEstado}
                FechaCentral={FechaCentral}
                />

                <ModalDesactivarSucursal
                openModalEstadoDes={openModalEstadoDes}
                handleOpenModalEstadoDes={handleOpenModalEstadoDes}
                handleCloseModalEstadoDes={handleCloseModalEstadoDes}
                CODIGO={CODIGO}
                SUFIJO={SUFIJO}
                SucursalEstado={SucursalEstado}
                FechaCentral={FechaCentral}
                />
            </Box>
        </Modal>
    )
}
