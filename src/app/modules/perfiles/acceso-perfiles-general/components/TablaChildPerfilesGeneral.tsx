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
import { Box, Button, CardActionArea, Checkbox, MenuItem, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
//import { AddIcon, SearchIcon } from "@chakra-ui/icons";


import LockSharpIcon from '@mui/icons-material/LockSharp';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { Controller, useForm } from "react-hook-form";
import { AlertError, AlertSave } from "../../../../common/alerts/alerts";


import { useAccesoPerfilesGeneral } from "../services/useAccesoPerfilesGeneral";
import { KDImage } from "../../../../../core/modal-loading/KDImage";


export default function TablaChildPerfilesGeneral(props: any) {
  const { lista, idPerfil } = props;
  const { loadApiSetUpdatePermiso } = useAccesoPerfilesGeneral();
  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  const [loading, setLoading] = useState(
    false
  );


  const inactivo_parent = localStorage.getItem("inactivo_parent");
  const [valHead, setValHead] = useState(false)

  useEffect(() => {



    for (let i = 0; i < lista.length; i++) {
      if (lista[i]?.ACCEDE == 1) {
        setValue(`check_${i}`, true)
      } else {
        setValue(`check_${i}`, false)
      }
    }


    /*
    console.log(" valor recuperado en tabla usuario general *****", inactivo_parent)
    if (inactivo_parent) {
      const inactivo_parent_aux = JSON.parse(inactivo_parent)
      if (inactivo_parent_aux == true) {
      
        setValue(`check0_${0}`, true)
        setValue(`check0_${1}`, true)
        setValue(`check0_${2}`, true)
        setValue(`check0_${3}`, true)
        setValue(`check0_${4}`, true)
        setValue(`check0_${5}`, true)
        setValue(`check0_${6}`, true)
        setValue(`check0_${7}`, true)

        setValHead(true)
      } else {
        setValHead(false)

      }
      console.log("resuldato de conversion child ", inactivo_parent_aux)
    }*/

    // actulizar este valor inactivo_parent_suc
  }, [lista]);





  function Row(props: any) {
    const { row, index } = props;

    const hadleChangeCheked = async (index: number, estado: boolean, idVentasAcceso: string) => {
      console.log("index ", index);
      console.log("valor ", estado);
     // console.log("valor ", index)

      setValue(`check_${index}`, !!estado)

      console.log("idventas Acceso ",idVentasAcceso)
      console.log("id perfil", idPerfil)

      if (!idVentasAcceso || !idPerfil) {
        return;
      }

   

      if (estado) {
        setLoading(true);
        const response = await loadApiSetUpdatePermiso("1", idPerfil, idVentasAcceso)
        setLoading(false);
        if (response?.status && response?.message) {
          AlertSave({ title: '', message: `${response?.message}` })
          // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
        } else {
          AlertError({ title: '', message: 'Algo salió mal' })
        }

      } else {
        setLoading(true);
        const response = await loadApiSetUpdatePermiso("0", idPerfil, idVentasAcceso)
        setLoading(false);
        if (response?.status && response?.message) {
          AlertSave({ title: '', message: `${response?.message}` })
          // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
        } else {
          AlertError({ title: '', message: 'Algo salió mal' })
        }

      }


    }

    return (
      <React.Fragment>

        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell sx={{
            // backgroundColor: 'orange',
            padding: "0px 0px",
            width: '3.5%'
          }}>
            {/*
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>*/}
          </TableCell>
          <TableCell
            sx={{
              // backgroundColor: 'gainsboro',
              padding: "0px 0px",

              // borderRight: "1px solid #A7A7A7",
              //  borderBottom: "1px solid #A7A7A7",
              fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              paddingLeft: '6%',
              //borderBottom: "1px solid white",
              fontSize: "12px",
              width: '20%',
              minWidth: '200px'
              // fontSize: "1.1rem"
            }}
            align="left"
          >
            {row.NOMBRE}


          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //   backgroundColor: 'goldenrod',
              // borderRight: "1px solid #A7A7A7",
              //     borderBottom: "1px solid #A7A7A7",
              fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              //borderBottom: "1px solid white",
              fontSize: "12px",
              width: '26%',
              // fontSize: "1.1rem"
            }}
            align="left"
          >
            {/*row.numfact*/}
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
                  checked={!!props.value}
                  //  onChange={(e: any) => props.onChange(e.target.checked)}

                  onChange={(e: any) => hadleChangeCheked(index, e.target.checked, row.ID_VENTAS_ACCESO)}
                />
              )}
            />
            {/* <Checkbox {...label} icon={<LockSharpIcon sx={{ color: 'black' }} />} checkedIcon={<LockOpenRoundedIcon />} />*/}
            {/* <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
         
              {valHead == true ?
                <CardActionArea sx={{
                  padding: '0', margin: '0', marginTop: '3px', width: '42px',
                }} onClick={() => console.log("valor de ini ", inactivo_parent)}
                >

                  <LockSharpIcon />
                </CardActionArea> :
                <CardActionArea sx={{
                  padding: '0', margin: '0', marginTop: '3px', width: '42px',
                }} onClick={() => console.log("valor de ini333 ", inactivo_parent)}
                >
                  <LockOpenRoundedIcon />
                </CardActionArea>}
            </FormGroup>*/}

          </TableCell>
        </TableRow>

      </React.Fragment >
    );
  }
  return (
    <div style={{ margin: 0, padding: 0 }}>
      {/*<button onClick={() => console.log("get valores ", getValues())}> get Valores</button>*/}

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
          {/*<TableHead onClick={tableHeaderClickHandler} style={{
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
                display: 'none',

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
                  width: '40%',

                  // backgroundColor: "red",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                N°
              </TableCell>


              <TableCell sx={{ ...tableStyling, width: '20%', borderLeft: "1px solid white" }} align="left">
                Accion
              </TableCell>


            </TableRow>
          </TableHead>*/}
          <TableBody>
            {lista?.map((row: any, index: any) => (
              <Row key={index} row={row} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading ? <KDImage

      /> : null}
    </div>
  );
}

