import React from "react";
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



export default function TablaInventarioCierre(props: any) {
  const { COLOR_R, COLOR_G, COLOR_B, PRODUCTOS, STOCK, control, cabecera, controlDisable, getValues, adecuacionInput } = props;
  // const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");
  //console.log("stock ", STOCK)
  //console.log("estado de cabecera: ", cabecera)


  //console.log("datos del stock: ",PRODUCTOS.ID_SUB_CATEGORIA_2)
  const defaultStyleTitle = true;

  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };

  const tableStyling = {
    //padding: "0px 0px",
    backgroundColor: `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.3 )`,
    padding: '0.8%',
    //borderRight: "2px solid black",
    fontSize: '3px',
    fontFamily: 'Times New Roman'


  };
 
  
  function rgbaToRgb(r: number, g: number, b: number, a: number): { r: number; g: number; b: number } {
    const red = Math.round((1 - a) * 255 + r * a);
    const green = Math.round((1 - a) * 255 + g * a);
    const blue = Math.round((1 - a) * 255 + b * a);
  
    return { r: red, g: green, b: blue };
  }
  
  // Ejemplo de uso
  //const rgbaColor = 'rgba(147,20,151, 0.3)';
  var rgbaColor = `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.3 )`;
  const match = rgbaColor.match(/(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?)/);
  if (match) {
    const r = parseFloat(match[1]);
    const g = parseFloat(match[3]);
    const b = parseFloat(match[5]);
    const a = parseFloat(match[7]);
  
    const { r: convertedR, g: convertedG, b: convertedB } = rgbaToRgb(r, g, b, a);
  
    //console.log('Color RGBA:', rgbaColor);
    //console.log('Color RGB:', `rgb(${convertedR}, ${convertedG}, ${convertedB})`);
    var colorRGB:any = `rgb(${convertedR}, ${convertedG}, ${convertedB})`;
    //console.log("colores de convercion RGB ", colorRGB) 
  } else {
    //console.log('Formato de color RGBA no válido');
  }  
 


  const stickyStyling = {
    position: "sticky",
    left: 0,
    backgroundColor: 'white',
    //boxShadow: "5px 2px 5px black",
    borderRight: "1px solid #A7A7A7",
    //borderBottom: "1px solid #A7A7A7",
  }

  const stickyStylingHead = {
    position: "sticky",
    left: 0,
    //backgroundColor: '#F2F2F2',
    backgroundColor: (colorRGB),
    //boxShadow: "5px 2px 5px black",
    //color:'white',
    borderRight: "1px solid white",
    borderBottom: "1px solid white",
  }

  //const stock = STOCK.find((element:any) => element. == PRODUCTOS.ID_SUB_CATEGORIA_2);
  // console.log("stock segun producto:**",stock);

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


  const getValueByKeyInObject = (val: any, array: any) => {
    for (var key in array) {
      if (key == val) {
        return array[key]
      }
    }
    return null;
  }


  //var map = { "item1": 1404, "item2": 2, "item3":3 ,"item4":5};
  //var res = getValueByKeyInObject("item1", map); 

  const InputTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index, keyRow }: any) => {
    //console.log("entre al metodo 1")
    var  numberValidation = adecuacionInput[keyRow]
    const handleIsDisable = () => {
      var localestaDesabilitado = localStorage.getItem('estaDesabilitado'); //string true // false
      //console.log("aaa2",localestaDesabilitado)
     // var cat = localStorage.getItem('estaDesabilitado');
    //  console.log("entre al metodo ",localestaDesabilitado)
      //caso 1 null o undefnied la primera vez que cambia el estado 
      if (localestaDesabilitado == null || localestaDesabilitado == undefined) {
        //localStorage.setItem('estaDesabilitado', JSON.stringify(true));
        //console.log("block null 1")
        return true
      }
      //caso 2 control del boton
      if (localestaDesabilitado == "false") {
       // console.log("block false 2")
        return false
      }
      if (localestaDesabilitado == "true") {
      //  console.log("block true 3")
        return true
      }
      else {
        //caso por defaultv
       // console.log("block default true 4")
        return true
      }
    }
    return (


      <Controller
        name={nameRegister}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (

          <TextField id="outlined-basic"
            sx={{ backgroundColor: 'white', width: '80%' }}
            //label="Outlined"
            size="small"
            type="number"
            //disabled={isDisable}
            disabled={handleIsDisable()}
            //InputProps={{ inputProps: { min: 0, max: getStockByIndex(index) } }}
            InputProps={{style: {
              height: "30px",
            }, inputProps: { min: 0, step:Number(numberValidation) } }}
            /* InputProps={{
               readOnly: isDisable,
             }}*/
            // variant="filled"
            //step="0.25"
            //step={0.25}
            variant="outlined"
            inputProps={{
              style: {
                margin: '0.4px', padding: '2px'
              },
            }}

            value={value}
            onChange={onChange}
            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
            //onBlur={testData}
            error={!!error}
            helperText={error ? error.message : null}


          />

        )}

        //capturar el elemento a comparar en este caso el stock


        rules={{
          required: {
            value: isRequired,
            message:'Completa este campo '
          },
           validate: () => Number(getValues(nameRegister)) % Number(numberValidation) == 0 || 'Solo permite múltiplos segun la adecuacion '
        }}
      />

    )
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
        <Table sx={{ tableLayout: "auto", minWidth: '750px' }}>
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
                  ...stickyStylingHead,
                  width: '18%',
                  borderRinght:"1px solid white",
                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Producto
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Unidad Medida
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '25%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Nota
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '8%', borderLeft: "1px solid white", fontSize: '10px', wordBreak: 'normal' }} align="left">
                Stock
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '8%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Cantidad Declarada
              </TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {PRODUCTOS?.map((row: any, index: any) => (
              <TableRow key={row.SUB_CATEGORIA_2}>
                <TableCell
                  sx={{
                    ...stickyStyling,
                    //padding: "0px 0px",
                    borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    // fontWeight: 'bold',
                    //   backgroundColor: "white",
                    paddingLeft: '10px',
                    //  borderBottom: "1px solid white",
                    wordBreak: 'normal',
                    fontSize: "0.9rem",
                    //padding:'1%',
                  }}
                  align="left"
                >
                  {row.SUB_CATEGORIA_2}
                </TableCell>
                <TableCell
                  sx={{
                    // padding: "0px 0px",
                    paddingLeft: '10px',
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    borderRight: "1px solid #A7A7A7",
                    wordBreak: 'normal',
                    //borderBottom: "1px solid #A7A7A7",
                    "&:active": { backgroundColor: "blue" }
                  }}
                  align="left"
                  onClick={tableCellClickHandler}
                >
                  {row.MEDIDA_ESTANDARIZACION}
                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    //fontWeight: 'bold',
                    backgroundColor: "white",
                    paddingLeft: '10px',
                    wordBreak: 'normal',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
                  {row.NOTA}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="center"
                >
                  {/*row.ID_SUB_CATEGORIA_2*/}  {getValueByKeyInObject(row.ID_SUB_CATEGORIA_2, STOCK)}
                  {/* {(row.ID_SUB_CATEGORIA_2 == STOCK)?
                <>
                {STOCK}
                </> 
                :null} */}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="center"
                >

                  {/*  <TextField
                    id="standard-number"
                    //label="Number"
                    type="number"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />*/}

                  <InputTextFieldSmall

                    isDisable={controlDisable == 10 ? true : false}
                    // isDisable={true}

                    //variant="filled"
                    control={control}
                    isRequired={true}
                    //nameRegister="demo"
                    nameRegister={`${row.ID_SUB_CATEGORIA_2}_registro`}
                    keyRow={row.ID_SUB_CATEGORIA_2}
                    index={index}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*<button onClick={handleSubmit(onSubmit)}> Botton Guardar </button>*/}
    </div>
  );
}
