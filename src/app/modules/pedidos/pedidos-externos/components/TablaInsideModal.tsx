import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useInterval from "use-interval";




const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#D4A1D5',
  padding: '0.8%',
  //minWidth:'200px'

  // wordBreak:'keep-all',
  //borderRight: "2px solid black",



};



export default function TablaSolicitudes(props: any) {

  const { tableData, control, getValues, handleSubmit, setValue, ListAreaProduccion }: any = props;
  //const { formState, handleSubmit, register, getValues } = useForm();
  //const { formState, handleSubmit, control, register, getValues } = useForm();
  // const { errors } = formState;
  const [rows, setRows] = React.useState([]);



  React.useEffect(() => {

    if (tableData) setRows(tableData);
  }, [tableData]);

  const [indexCurrentTabla, setIndexCurrentTabla] = useState(-1)

  useInterval(() => {
    // Your custom logic here
    //setCount(count + 1);
    if (indexCurrentTabla >= 0) {
      //  console.log("valores ", getValues(`CANTIDAD_${indexCurrentTabla}`), getValues(`COSTO_UNITARIO_${indexCurrentTabla}`))
      if (getValues(`CANTIDAD_${indexCurrentTabla}`) == "" && getValues(`COSTO_UNITARIO_${indexCurrentTabla}`) == "") {
        //elminar el validador en estos campos 
        localStorage.removeItem(`CANTIDAD_${indexCurrentTabla}`);
        localStorage.removeItem(`COSTO_UNITARIO_${indexCurrentTabla}`);


      }
      if (getValues(`CANTIDAD_${indexCurrentTabla}`) == "" && getValues(`COSTO_UNITARIO_${indexCurrentTabla}`) == "" && getValues(`SUBTOTAL_${indexCurrentTabla}`)) {
        //elminar el validador en estos campos 
        // localStorage.removeItem(`CANTIDAD_${indexCurrentTabla}`);
        // localStorage.removeItem(`COSTO_UNITARIO_${indexCurrentTabla}`);
        setValue(`SUBTOTAL_${indexCurrentTabla}`)

        calculatingDataUpdate(indexCurrentTabla)

        handleSubmit(() => { })()

      }
    }

  }, 1000); // passing null instead of 1000 will cancel the interval if it is already running



  const validateGetValue = (key: string) => {
    var res = getValues(key) ? Number(getValues(key)) : 0
    return res;
  }

  const calculatingDataUpdate = (index: any) => {
    var total = 0;
    for (let i = 0; i < rows.length; i++) {


      total = total + validateGetValue(`SUBTOTAL_${i}`);
      // setValue(`total`, total)
      //subtotal
      setValue(`SUBTOTAL`, total.toFixed(2))
    }

    //caso 1 si no existe decuentp
    if ((!getValues("DESCUENTO") || getValues("DESCUENTO") == undefined) && getValues("SUBTOTAL")) {
      var result = Number(getValues("SUBTOTAL"));
      setValue(`total`, result.toFixed(2))
    }

    //caso 2 si existe descuento calculando el total
    if (getValues("DESCUENTO") && getValues("SUBTOTAL")) {
      var result = Number(getValues("SUBTOTAL")) - Number(getValues("DESCUENTO"));
      setValue(`total`, result.toFixed(2))
    }

  }

  const calculatingData = (index: any) => {

    if (getValues(`CANTIDAD_${index}`) && getValues(`COSTO_UNITARIO_${index}`)) {
      console.log("entre calculo 2")
      var CANTIDAD_ROW = Number(getValues(`CANTIDAD_${index}`));
      var COSTO_UNITARIO_ROW = Number(getValues(`COSTO_UNITARIO_${index}`))
      var DESCUENTO_ROW = getValues(`DESCUENTO_${index}`) ? Number(getValues(`DESCUENTO_${index}`)) : 0
      var ICE_ROW = getValues(`ICE_${index}`) ? Number(getValues(`ICE_${index}`)) : 0


      var subtotalRow = CANTIDAD_ROW * COSTO_UNITARIO_ROW - DESCUENTO_ROW + ICE_ROW
      setValue(`SUBTOTAL_${index}`, subtotalRow.toFixed(2))

      //calculal el total de los subtotales
      var total = 0;
      for (let i = 0; i < rows.length; i++) {


        total = total + validateGetValue(`SUBTOTAL_${i}`);
        // setValue(`total`, total)
        //subtotal
        setValue(`SUBTOTAL`, total.toFixed(2))


      }

    }

    //caso 1 si no existe decuentp
    if ((!getValues("DESCUENTO") || getValues("DESCUENTO") == undefined) && getValues("SUBTOTAL")) {
      var result = Number(getValues("SUBTOTAL"));
      setValue(`total`, result.toFixed(2))
    }

    //caso 2 si existe descuento calculando el total
    if (getValues("DESCUENTO") && getValues("SUBTOTAL")) {
      var result = Number(getValues("SUBTOTAL")) - Number(getValues("DESCUENTO"));
      setValue(`total`, result.toFixed(2))
    }

  }

  const InputTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable = false, index }: any) => {



    const getEsRequerido = () => {
      var getValueRequired = localStorage.getItem(`${nameRegister}`);

      if (getValueRequired && getValueRequired == nameRegister) {
        //  console.log("get Value Requiered ", getValueRequired)
        return true;
      } else {
        return false
      }
    }


    // var esRequeridoName = "";





    /* const calculatingData = () => {

       if (getValues(`CANTIDAD_${index}`) && getValues(`COSTO_UNITARIO_${index}`)) {
         console.log("entre calculo 2")
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
           // setValue(`total`, total)
           //subtotal
           setValue(`SUBTOTAL`, total)


         }

       }

       //caso 1 si no existe decuentp
       if ((!getValues("DESCUENTO") || getValues("DESCUENTO") == undefined) && getValues("SUBTOTAL")) {
         var result = Number(getValues("SUBTOTAL"));
         setValue(`total`, result)
       }

       //caso 2 si existe descuento calculando el total
       if (getValues("DESCUENTO") && getValues("SUBTOTAL")) {
         var result = Number(getValues("SUBTOTAL")) - Number(getValues("DESCUENTO"));
         setValue(`total`, result)
       }




     }*/


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
            variant="outlined"
            /*inputProps={{
              style: {
                margin: '0.4px', padding: '2px'
              },
             
            }}*/

            // disabled={isDisable}

            /* InputProps={{
               readOnly: isDisable,
            
             }}*/

            InputProps={{
              style: {

              }, inputProps: {
                min: 0//, step: 0.25
                , style: {
                  margin: '0.4px', padding: '2px'
                },

              }, readOnly: isDisable
            }}



            value={value}
            onBlur={() => {
              console.log("blurrrrrr")
              handleSubmit(() => { })()
            }}

            onFocus={(e) => {
              e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })


            }
            }
            onChange={(event) => {

              localStorage.setItem(`CANTIDAD_${index}`, `CANTIDAD_${index}`)
              localStorage.setItem(`COSTO_UNITARIO_${index}`, `COSTO_UNITARIO_${index}`)



              setIndexCurrentTabla(index)
              /*if (localStorage.getItem(`CANTIDAD_${index}`) && localStorage.getItem(`COSTO_UNITARIO_${index}`)) {
 
              }*/
              //  handleSubmit(activeValidationData)();
              //comprobar si los 3 campos estan vacios  en este  caso poner el locar storage en false

              onChange(event.target.value)
              calculatingData(index);

            }}


            error={!!error}
            helperText={error ? error.message : null}


          />
        )}

        rules={{
          //required: isRequired
          required: getEsRequerido()

          //  esRequeridoName == nameRegister ? true : false
        }

        }


      />

    )
  }



  return (
    <div style={{


    }}>

      <TableContainer
        onClick={() => {
          // console.log("Detected Table Container Click");
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
        <Table sx={{
          tableLayout: "auto",
          //       display:"block",
          //width:'100%' //,
          //      minWidth:'750px',
          overflowX: 'scroll'

        }}>
          <TableHead //onClick={tableHeaderClickHandler}
            style={{
              //  borderTopColor: 'black',
              //  borderTopStyle: 'double'

            }}

          >
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
                Nombre
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '18%', borderLeft: "1px solid white" }} align="left">
                Cantidad
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '15%', borderLeft: "1px solid white" }} align="left">
                Precio Unitario
              </TableCell>
              {ListAreaProduccion[0].DESCUENTO_UNITARIO == 1 ?
                <TableCell sx={{ ...tableStyling, width: '10%' }} align="left">
                  Descuento
                </TableCell>
                : null}
              {ListAreaProduccion[0].DESCUENTO_ICE == 1 ?
                <TableCell sx={{ ...tableStyling, width: '15%' }} align="left">
                  ICE
                </TableCell>
                : null}
              <TableCell sx={{ ...tableStyling, width: '10%' }} align="left">
                SubTotal
              </TableCell>
              {/* <TableCell sx={{ ...tableStyling, width: '10%' }} align="left">
                Total
              </TableCell>*/}
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
                    wordBreak: 'normal',
                    //  borderBottom: "1px solid white",
                    fontSize: "11px"
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
                  align="left"

                >
                  <InputTextFieldSmall

                    control={control}
                    // isRequired={false}
                    nameRegister={`CANTIDAD_${index}`}
                    index={index}
                  />
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
                  align="left"
                >
                  <InputTextFieldSmall

                    control={control}
                    // isRequired={false}
                    nameRegister={`COSTO_UNITARIO_${index}`}
                    index={index}
                  />
                </TableCell>
                {ListAreaProduccion[0].DESCUENTO_ICE == 1 ?
                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                    }}


                    align="left"
                  >
                    <InputTextFieldSmall
                      control={control}
                      isRequired={false}
                      nameRegister={`DESCUENTO_${index}`}
                      index={index}
                    />
                  </TableCell>
                  : null}
                  {ListAreaProduccion[0].DESCUENTO_ICE == 1 ?
                <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}


                  align="left"
                >

                  <InputTextFieldSmall

                    control={control}
                    isRequired={false}
                    nameRegister={`ICE_${index}`}
                    index={index}
                  />


                </TableCell>
                :null}
                <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}


                  align="left"
                >

                  <InputTextFieldSmall

                    control={control}
                    isRequired={false}
                    nameRegister={`SUBTOTAL_${index}`}
                    index={index}
                  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>SubTotal</div>
        &nbsp;&nbsp;
        <InputTextFieldSmall

          control={control}
          isRequired={false}
          nameRegister={`SUBTOTAL`}
          index={10001}
        />
      </div>
      {ListAreaProduccion[0].DESCUENTO_GENERAL == 1? 
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>Descuento</div>
        &nbsp;&nbsp;
        <InputTextFieldSmall

          control={control}
          isRequired={false}
          nameRegister={`DESCUENTO`}
          index={10002}
        />
      </div>
      :null}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>Total</div>
        &nbsp;&nbsp;
        <InputTextFieldSmall

          control={control}
          isRequired={true}
          nameRegister={`total`}
          isDisable={true}
          index={10003}
        />
      </div>



    </div>
  );
}
