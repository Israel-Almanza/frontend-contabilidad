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
import { Box, Button, CardActionArea, Checkbox, MenuItem, TextField, Typography } from "@mui/material";

//import { AddIcon, SearchIcon } from "@chakra-ui/icons";

import FormGroup from "@mui/material/FormGroup";



import Collapse from '@mui/material/Collapse';

import LockSharpIcon from '@mui/icons-material/LockSharp';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';

import { useAccesoFormasPago } from "../services/useAccesoFormasPago";
//import TablaChildUsuarioGeneral from "./TablaChildUsuarioGeneral";
import { Controller, useForm } from "react-hook-form";
import { KDImage } from "../../../../../core/modal-loading/KDImage";
import { AlertSave, AlertError } from "../../../../common/alerts/alerts";





export default function TablaAccesoFormasPago(props: any) {

  const { formas, ID_NOMBRE_LISTA_PRECIOS, sucursal } = props

  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  const { loadApigetEstadoFormasByCodeIdnameSucursal, loadApiUpdateforma } = useAccesoFormasPago();
  const [loading, setLoading] = useState(
    false
  );

  useEffect(() => {

    inicalizandoTabla();
  }, [formas]);

  //obteniendo datos 

  const inicalizandoTabla = async () => {
    if (formas) {

      for (let i = 0; i < formas?.length; i++) {
        /* "CODIGO":1,  // formas
    "ID_NOMBRE_LISTA_PRECIOS":1,  // de canales
    "sucursal":13*/  //de prop

        for (let i = 0; i < formas.length; i++) {
          if (formas[i]?.ESTADO == 1) {
            setValue(`check_${i}`, true)
          } else {
            setValue(`check_${i}`, false)
          }
        }

        /*
            setLoading(true);
                if (formas[i]?.CODIGO) {
                  //llamar a la api
                   
                 const res=await loadgetEstadoFormasByCodeIdnameSucursal(formas[i]?.CODIGO,
                    ID_NOMBRE_LISTA_PRECIOS,
                    sucursal)
                   
                    console.log("I: ",i,res);
        
                    if(res.estado==1){
                      setValue(`check_${i}`, true)
                    } 
                }
              }
              setLoading(false);
              */
      }
    }
  }


  var inactivo_parent_ina: any = localStorage.getItem("inactivo_parent_ina");
  var inactivo_parent_act: any = localStorage.getItem("inactivo_parent_act");


  const loadgetEstadoFormasByCodeIdnameSucursal = async (CODIGO: number,
    ID_NOMBRE_LISTA_PRECIOS: number,
    sucursal: number) => {

    try {
      const response = await loadApigetEstadoFormasByCodeIdnameSucursal(CODIGO,
        ID_NOMBRE_LISTA_PRECIOS,
        sucursal);
      return response;
    } catch (error) {
      return null
    }
  }

  const devolverValorCheckActivo = () => {
    //   console.log(" valor recuperado en tabla usuario general *****", inactivo_parent_act)
    // console.log(" get ... ", getValues())
    if (inactivo_parent_act) {
      inactivo_parent_act = JSON.parse(inactivo_parent_act)
      console.log("entre act", inactivo_parent_act)
      if (inactivo_parent_act == true) {
        //setValHead(true)
        //   setValue("inactivo_parent_suc", true)
        setValue(`check0_${0}`, true)
        setValue(`check0_${1}`, true)
        setValue(`check0_${2}`, true)
        setValue(`check0_${3}`, true)
        setValue(`check0_${4}`, true)
        setValue(`check0_${5}`, true)
        setValue(`check0_${6}`, true)
        setValue(`check0_${7}`, true)
      } else {
        //  setValue("inactivo_parent_suc", false)
        //  setValHead(false)
        setValue(`check0_${0}`, false)
        setValue(`check0_${1}`, false)
        setValue(`check0_${2}`, false)
        setValue(`check0_${3}`, false)
        setValue(`check0_${4}`, false)
        setValue(`check0_${5}`, false)
        setValue(`check0_${6}`, false)
        setValue(`check0_${7}`, false)
      }
      //console.log("resuldato de conversion ", inactivo_parent_act)
    }
  }




  function Row(props: any) {
    const { row, index } = props;


    //const [open, setOpen] = React.useState(true);

    // const [open, setOpen] = React.useState(() => f_valueInitCollpase());
    const [open, setOpen] = React.useState(true);



    const hadleChangeCheked = async (index: number, valor: boolean, code: string) => {
      console.log("index ", index);
      console.log("valor ", valor);
      setValue(`check_${index}`, !!valor)

      if (valor) {
        setLoading(true);
       // const response:any= await loadUpdateforma(code, sucursal, ID_NOMBRE_LISTA_PRECIOS, "1")

        const response = await loadApiUpdateforma(code, sucursal, ID_NOMBRE_LISTA_PRECIOS, "1");
      
        setLoading(false);
        if (response?.status && response?.message) {
          AlertSave({ title: '', message: `${response?.message}` })
          // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
        } else {
          AlertError({ title: '', message: 'Algo salió mal' })
        }
      } else {
        setLoading(true);
        //const response:any=  await loadUpdateforma(code, sucursal, ID_NOMBRE_LISTA_PRECIOS, "0")
        const response = await loadApiUpdateforma(code, sucursal, ID_NOMBRE_LISTA_PRECIOS, "0");
        console.log("response 2 ",response)
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
          <TableCell sx={{// backgroundColor: 'red',
            width: '4%', padding: "0px 0px",
          }}>
            {/*<IconButton
              aria-label="expand row"
              size="small"
              onClick={() => controlOpenCollpase()}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>*/}
          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              // backgroundColor: 'yellow',
              //  borderRight: "1px solid #A7A7A7",
              //  borderBottom: "1px solid #A7A7A7",
              fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              paddingLeft: '2%',
              //borderBottom: "1px solid white",
              fontSize: "12px",
              width: '20%',
              minWidth: '200px'
              // fontSize: "1.1rem"
            }}
            align="left"
          >
            {row.DESCRIPCION}


          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",

              // borderRight: "1px solid #A7A7A7",
              //     borderBottom: "1px solid #A7A7A7",
              fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              //
              // borderBottom: "1px solid red",
              fontSize: "12px",
              width: '27%',
              //   backgroundColor: 'coral'
              // fontSize: "1.1rem"
            }}
            align="left"
          >

            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>

              <Controller
                name={`check_${index}`}
                control={control}
                render={({ field: props }: any) => (
                  <Checkbox
                    {...props}
                    //checked={props.value}
                    // icon={<LockOpenRoundedIcon sx={{ color: 'black' }} />} checkedIcon={<LockSharpIcon sx={{ color: 'black' }} />}
                    icon={<LockSharpIcon sx={{ color: 'black' }} />} checkedIcon={<LockOpenRoundedIcon sx={{ color: 'black' }} />}
                    sx={{ padding: 0, margin: 0 }}
                    size="small"
                    checked={!!props.value}

                    //  onChange={(e: any) =>console.log("check valor :", e.target.checked)}
                    onChange={(e: any) => hadleChangeCheked(index, e.target.checked, row.CODIGO)}
                  //onChange={(e: any) => props.onChange(e.target.checked)}
                  />
                )}
              />

            </FormGroup>



          </TableCell>


        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" >
              <Box sx={{ margin: 1 }}>

                { /*  <TablaChildUsuarioGeneral />*/}


              </Box>
            </Collapse>
            {/*<details>
              <summary>Epcot Center</summary>
              <TablaChildUsuarioGeneral />
            </details>*/}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


  return (
    <div style={{ margin: 0, padding: 0 }}>


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
                  width: '1%',

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
            {formas?.map((row: any, index: any) => (
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
