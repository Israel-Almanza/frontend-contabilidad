import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, MenuItem, TextField } from "@mui/material";

//import { AddIcon, SearchIcon } from "@chakra-ui/icons";

import LockSharpIcon from '@mui/icons-material/LockSharp';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { Controller, useForm } from "react-hook-form";

import { AlertSave } from "../../../../common/alerts/alerts";

import { useAccesoBoton } from "../services/useAccesoBoton";
import { KDImage } from "../../../../../core/modal-loading/KDImage";
/*interface Cell {
  cellIndex: number;
}*/

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  fontSize: '10px',
  //borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  //borderRight: "2px solid black",



};











export default function TablaAccesoBoton(props: any) {
  const { rows } = props;
  const { loadApiSetEstadoBoton } = useAccesoBoton();
  const [loading, setLoading] = useState(false);
  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();


  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //call api
    if (rows) {
      //actulizar
      for (let i = 0; i < rows?.length; i++) {
        if (rows[i]?.HABILITADO == 1) {
          setValue(`check_${i}`, true)
        }else{
          setValue(`check_${i}`, false)
        }
      }
    }
  }, [rows]);



  const hadleChangeCheked = async (index: number, valor: boolean, ID: string) => {
    console.log("index ", index);
    console.log("valor ", valor);
    setValue(`check_${index}`, !!valor)

    if (valor) {
      setLoading(true);
      const response = await loadApiSetEstadoBoton(ID, "1");
      if (response?.status && response?.message) {
        AlertSave({ title: '', message: `${response?.message}` })
        // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
      }

      setLoading(false);
    } else {
      setLoading(true);
      const response = await loadApiSetEstadoBoton(ID, "0");
      if (response?.status && response?.message) {
        AlertSave({ title: '', message: `${response?.message}` })
        // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
      }

      setLoading(false);
    }


  }


  return (
    <div>
   
      <TableContainer
        onClick={() => {
          console.log("Detected Table Container Click");
        }}
        component={Paper}
        sx={{
          // border: "4px solid rgba(0,0,0,0.2)",
          //padding: 1,
          // height: '420px',
          margin: '0px', padding: '0px', marginTop: '5px'

          //   width: "max-content"
          //backgroundColor: "blue"
        }}
      >
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead //onClick={tableHeaderClickHandler}
            style={{
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
                  fontSize: "12px",
                  //fontSize: "0.8rem",
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
                  width: '4%',

                  // backgroundColor: "red",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                N°
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '25%', borderLeft: "1px solid white" }} align="left">
                Referencia Boton
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '40%', borderLeft: "1px solid white" }} align="left">
                Accion
              </TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    //padding: "0px 0px",
                    // borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    // fontWeight: 'bold',
                    //backgroundColor: "#C8E6C9",

                    padding: '0px', margin: '0px',
                    //  borderBottom: "1px solid white",
                    //fontSize: "12px"
                    // fontSize: "0.9rem",
                    paddingLeft: '10px',
                    //padding:'1%',
                  }}
                  align="left"
                >
                  {row.row}


                </TableCell>
                <TableCell
                  sx={{
                    // padding: "0px 0px",
                    paddingLeft: '10px',
                    // fontWeight: 'bold',
                    //   borderBottom: "1px solid white",
                    //  borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    //backgroundColor: "#C8E6C9",
                    // "&:active": { backgroundColor: "blue" }
                  }}
                  align="left"
                // onClick={tableCellClickHandler}
                >
                  {row.REFERENCIA_BOTON}
                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    //backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
             
                  <Controller
                    name={`check_${index}`}
                    control={control}
                    render={({ field: props }: any) => (
                      <Checkbox
                        {...props}
                        //checked={props.value}
                        //  icon={<LockOpenRoundedIcon sx={{ color: 'black' }} />} checkedIcon={<LockSharpIcon sx={{ color: 'black' }} />}

                        icon={<LockSharpIcon sx={{ color: 'black' }} />} checkedIcon={<LockOpenRoundedIcon sx={{ color: 'black' }} />}
                        sx={{ padding: 0, margin: 0 }}
                        size="small"
                        //onClick={() => AlertSave({ title: '', message: 'Se ha actualizado correctamente' })}
                        checked={!!props.value}
                        /*onChange={(e: any) =>
                          props.onChange(e.target.checked)
                        }*/

                        onChange={(e: any) => hadleChangeCheked(index, e.target.checked, row.ID)}
                      />
                    )}
                  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {loading ? <KDImage

      /> : null}


    </div>
  );
}



