import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Box, Button, Checkbox, Modal, TextField, Typography, Grid } from "@mui/material";
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import { KDImage } from "../../../../core/modal-loading/KDImage";
import { usePedidosPlanta } from "./services/usePedidosPlanta";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
//import { ModalBorrarReceta } from "./components/ModalBorrarReceta";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  borderLeft: "1px solid #DEE2E6",
  //borderRight: "2px solid black",



};





export default function TablaPedidosPlanta(props: any) {

  const { getValues, control, setValue, handleSubmit, tableData, deleteByIndex} = props;
  //console.log("datos id presentacion", idPresentacion)
  const { loadApiGuardarPedido } = usePedidosPlanta()

  const [rows, setRows] = React.useState<any>([]);

  //end codigo exitoso
  React.useEffect(() => {
    console.log("data ...", tableData)
    if (tableData) setRows(tableData);
  }, [tableData]);



  //loading
  const [loading, setLoading] = useState(
    false
  );

  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  //guardar los dataForm de entregas
  const onSubmitPedido = async (dataForm: any) => {
 
    //console.log("datos** ", dataForm)
    console.log("rows ", rows)
    //paso 1 verificar si el objecto es mayor a cero
    /* if (isObjEmpty(dataForm) || isObjEmpty(ListaElementos) 
     ) {
       //alert("el objecto esta vacio")
       return;
     }*/



    var resObj: any = []

    for (let i = 0; i < rows?.length; i++) {
      //for (var i in ListaElementos) {

      var resChild: any = {
       
        "id_producto": rows[i].IdProducto,
        "id_presentacion": rows[i].IdPresentacion,
        "cantidad": rows[i].CANTIDAD
      }
      resObj[i] = resChild;

      //}

    }

    console.log("res send guardar ", resObj)

    try {
      setLoading(true)
      const response = await loadApiGuardarPedido(
        resObj
      )
      console.log("res aaa", response)
      setLoading(false)
      if (response?.status) {
        //await loadBuscarReceta()
        AlertSave({ title: "", message: response.message });

      }
      if (response?.status == false) {
        AlertQuestion({ title: '', message: response.message })


      }

      if (response == undefined) {
        AlertError({ title: '', message: response.message })
      }

    } catch (error) {
      console.log("error api guardar:*", error)
      setLoading(false)
    }


  }

  const onSubmit = async (data: any) => {
    console.log("enviando datos form ", data)
}

  return (
    <div>
      {/* <button onClick={()=> console.log(getValues())}>get values </button>
      <button onClick={()=> {setValue("check2_1",true)}}>Marcar</button> */}
  
      <br />
      {/*<button onClick={() => addItem()}>Add</button>*/}
      <TableContainer
        onClick={() => {
          console.log("Detected Table Container Click");
        }}
        component={Paper}
        sx={{
          // border: "4px solid rgba(0,0,0,0.2)",
          //padding: 1,
          // height: '420px',
          margin: '0px', padding: '0px', marginTop: '5px',


          //   width: "max-content"
          //backgroundColor: "blue"
        }}
      >
        <Table sx={{ tableLayout: "auto", minWidth: '800px' }}>
          <TableHead style={{
            //  borderTopColor: 'black',
            //  borderTopStyle: 'double'
          }}>
            <TableRow
              onClick={() => {
                console.log("Detected Row Click");
              }}
              sx={{
                //  backgroundColor: "#BCEAFD",
                //borderBottom: "2px solid black",

                "& th": {
                  //fontSize: "1rem",
                  fontSize: "0.8rem",
                  //  height: "5px",
                  // color: "black",
                  //  borderBottom: "1px solid white",

                }
              }}
            >
              <TableCell
                onClick={() => {
                  console.log("Detected Cell Click");
                }}
                sx={{
                  ...tableStyling,
                  width: '6%',

                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Producto
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Presentacion
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Cantidad
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%' }} align="left">
                Opcciones
              </TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: any) => {
              // console.log("index ", index)
              return (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      //padding: "0px 0px",
                      // borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid #A7A7A7",
                      // fontWeight: 'bold',
                      //   backgroundColor: "white",
                      paddingLeft: '10px',
                      //  borderBottom: "1px solid white",
                      //fontSize: "12px"
                      fontSize: "0.9rem",
                      //padding:'1%',
                    }}
                    align="left"
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      {row.PRODUCTO}


                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      // padding: "0px 0px",
                      paddingLeft: '10px',
                      // fontWeight: 'bold',
                      // borderBottom: "1px solid white",
                      //   borderRight: "1px solid #A7A7A7",
                      //   borderBottom: "1px solid #A7A7A7",
                      //  "&:active": { backgroundColor: "blue" }
                    }}
                    align="left"

                  >
                    {row.PRESENTACION}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                      paddingLeft: '10px',
                    }}

     
                    align="left"
                  >
                    {row.CANTIDAD}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                      paddingLeft: '10px',
                    }}

                    align="left"
                  >
                    <DeleteIcon sx={{
                        backgroundColor: '#DC3545', color: 'white', fontSize: '2.3rem',
                        padding: '10px',
                      }}

                        onClick={() => deleteByIndex(index)}
                      //onClick={() => pasarParametrosDelete(row)}
                      />
                  </TableCell>





                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <br />
        <Button onClick={handleSubmit(onSubmitPedido)} 
        sx={{ backgroundColor: '#28A745' }} variant="contained" startIcon={<SaveIcon />}>Guardar</Button>
      {/* <Button onClick={handleSubmit(onSubmit)}>confirmar</Button> */}
      </div>


      {/* <Button onClick={handleSubmit(onSubmitReceta)} sx={{ backgroundColor: '#28A745' }} variant="contained" startIcon={<SaveIcon />}>Guardar</Button> */}
      {/* <Button onClick={handleOpenModalAgregar} sx={{ backgroundColor: '#28A745' }} variant="contained" startIcon={<SaveIcon />}>prueba</Button> */}



      {loading ? <KDImage /> : null}
    </div>
  );
}
