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
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';

/*interface Cell {
  cellIndex: number;
}*/

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#D4A1D5',
  padding: '0.8%',
  //borderRight: "2px solid black",



};



export default function TablaSolicitudes(props: any) {
  //console.log("properties ", props)
  const { tableData, control, getValues, setValue, deleteByIndex }: any = props;
  //const { formState, handleSubmit, register, getValues } = useForm();
  //const { formState, handleSubmit, control, register, getValues } = useForm();
  // const { errors } = formState;
  const [rows, setRows] = useState<any>([]);

  React.useEffect(() => {
    //console.log("data ...", tableData)
    if (tableData) setRows(tableData);
  }, [tableData]);




  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");

  const defaultStyleTitle = true;

  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };

  const tableHeaderClickHandler = (e: any) => {
    console.log("Detected Header Click");
    setSnackbarOpen(true);
    //    if (((e.target as unknown) as Cell).cellIndex) {
    if (((e.target)).cellIndex) {
      setInfoText("data");
    } else {
      setInfoText("title");
    }
  };

  const handleAlertClose = () => {
    setSnackbarOpen(false);
  };

  //add elemento a la tabla
  const addNewElement = () => {
    /*console.log("add ", selectElement)
    if (selectElement) {
      const { label } = selectElement
      console.log("hay dato ", label)
      setRows([...rows,
      { nombre: label }
      ]);

      
    }*/

    setRows([...rows,
    { nombre: "demo test" }
    ]);

  }


  const InputTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {


    const validateGetValue = (key: string) => {
      var res = getValues(key) ? Number(getValues(key)) : 0
      return res;
    }

    const testData = () => {
      console.log("working ", nameRegister, index)

      //calculado  subtotatotal
      if (getValues(`CANTIDAD_${index}`) && getValues(`COSTO_UNITARIO_${index}`)) {
        var CANTIDAD_ROW = Number(getValues(`CANTIDAD_${index}`));
        var COSTO_UNITARIO_ROW = Number(getValues(`COSTO_UNITARIO_${index}`))
        var DESCUENTO_ROW = getValues(`DESCUENTO_${index}`) ? Number(getValues(`DESCUENTO_${index}`)) : 0
        var ICE_ROW = getValues(`ICE_${index}`) ? Number(getValues(`ICE_${index}`)) : 0


        var subtotalRow = CANTIDAD_ROW * COSTO_UNITARIO_ROW - DESCUENTO_ROW + ICE_ROW
        setValue(`SUBTOTAL_${index}`, subtotalRow)

        //calculal el total de los subtotales
        var total = 0;
        for (let i = 0; i < rows.length; i++) {


          total = total + validateGetValue(`SUBTOTAL_${i}`);
          setValue(`total`, total)
        }

      }




    }

    const getStockByIndex = (index: any) => {
      for (let i = 0; i < rows.length; i++) {
        if (index==i){
        //  console.log("get stock row ",rows[i]?.stock)
          return Number(rows[i]?.stock)
        }
      }
      return 0
    }
    return (


      <Controller
        name={nameRegister}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (


          <TextField id="outlined-basic"
            sx={{ backgroundColor: 'white' }}
            //label="Outlined"
            size="small"
            type="number"
            InputProps={{ inputProps: { min: 0, max: getStockByIndex(index) } }}
          
            variant="outlined"
            inputProps={{
              style: {
                margin: '0.4px', padding: '2px'
              },
            }}

            value={value}
            onChange={onChange}

            onBlur={testData}
            error={!!error}
            helperText={error ? error.message : null}


          />
        )}

        //capturar el elemento a comparar en este caso el stock

        rules={{
          required: isRequired,
          validate: () => getStockByIndex(index) >= Number(getValues(nameRegister))
        }}
      />

    )
  }


  return (
    <div>
      {/*<button onClick={() => addNewElement()}>Add elemente test</button>*/}
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
          <TableHead onClick={tableHeaderClickHandler} style={{
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
                  width: '20%',

                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Producto
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '18%', borderLeft: "1px solid white" }} align="center">
                Unidad de medida
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '18%', borderLeft: "1px solid white" }} align="center">
                Stock
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '15%', borderLeft: "1px solid white" }} align="center">
                Cantidad
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%' }} align="center">
                Acciones
              </TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: any) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    // fontWeight: 'bold',
                    //   backgroundColor: "white",
                    paddingLeft: '10px',
                    //  borderBottom: "1px solid white",
                    fontSize: "12px"
                    //fontSize: "0.9rem",
                    //padding:'1%',
                  }}
                  align="left"
                >
                  {row.SUB_CATEGORIA_2}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    paddingLeft: '10px',
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    //   borderRight: "1px solid #A7A7A7",
                    //   borderBottom: "1px solid #A7A7A7",
                    // "&:active": { backgroundColor: "blue" }
                  }}
                  align="center"
                  onClick={tableCellClickHandler}
                >
                  {row.unidadM}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    paddingLeft: '10px',
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    //   borderRight: "1px solid #A7A7A7",
                    //   borderBottom: "1px solid #A7A7A7",
                    // "&:active": { backgroundColor: "blue" }
                  }}
                  align="center"
                  onClick={tableCellClickHandler}
                >
                  {row.stock}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    backgroundColor: "white",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="center"
                >
                  <InputTextFieldSmall

                    control={control}
                    isRequired={true}
                    nameRegister={`CANTIDAD_${index}`}
                    index={index}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="center"
                >
                  {/*row.f3*/}
                  {/*   <TextField id="outlined-basic"

                    //label="Outlined"
                    type="number"
                    variant="outlined"
                    inputProps={{
                      style: {
                        height: "10px",
                      },
                    }}
                  />*/}

                  <DeleteIcon sx={{
                    backgroundColor: '#DC3545', color: 'white', fontSize: '2rem',
                    padding: '10px',
                  }}

                    onClick={() => deleteByIndex(index)}
                  />

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />



    </div>
  );
}
