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
import { Button, TextField, CardActionArea  } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FaRegHandPointLeft } from "react-icons/fa";


export default function TablaSolicitudes(props:any) {
  const { COLOR_R, COLOR_G, COLOR_B, PRODUCTOS, control, controlDisable, registro , precargado,getValues,adecuacionInput} = props;
  //console.log("PRODUCTOS**",PRODUCTOS)
  //console.log("adecuacion input ",adecuacionInput)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");
  const defaultStyleTitle = true;

  const tableStyling = {
    //padding: "0px 0px",
    backgroundColor: `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.3 )`,
    padding: '0.8%',
    //borderRight: "2px solid black",
    fontSize: '3px',
    fontFamily: 'Times New Roman'


  };


/*  function rgbToHex(rgb: string): string | null {
    const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const match = rgb.match(regex);
  
    if (!match) return null;
  
    const [, r, g, b] = match;
  
    const red = parseInt(r).toString(16).padStart(2, '0');
    const green = parseInt(g).toString(16).padStart(2, '0');
    const blue = parseInt(b).toString(16).padStart(2, '0');
  
    return `#${red}${green}${blue}`;
  }
  
  function lightenColor(hex: string, amount: number): string | null {
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const match = hex.match(regex);
  
    if (!match) return null;
  
    const [, r, g, b] = match;
  
    const newR = clamp(parseInt(r, 16) + amount, 0, 255);
    const newG = clamp(parseInt(g, 16) + amount, 0, 255);
    const newB = clamp(parseInt(b, 16) + amount, 0, 255);
  
    const newHex = `#${componentToHex(newR)}${componentToHex(newG)}${componentToHex(newB)}`;
  
    return newHex;
  }
  
  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
  
  function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  
  // Ejemplo de uso
const rgbColor = 'rgb(147,20,151)';
  //const rgbColor = `rgb(${COLOR_R},${COLOR_G},${COLOR_B} )`;
  var colorTemp = `rgb(${COLOR_R},${COLOR_G},${COLOR_B})`;

  console.log("colores  left rigth",rgbColor,colorTemp)
  //const rgbColor = `rgb(${color})`;
  const hexColor:any = rgbToHex(colorTemp);
  const lightenedColor = lightenColor(hexColor, 165);
  
  console.log(hexColor); // Resultado: #143cc8
  console.log(lightenedColor); // Resultado: #3f5ae2 */


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
    top: '0', xIndex: 50,zIndex: 10,
    backgroundColor: 'white',
    //boxShadow: "5px 2px 5px black",
    borderRight: "1px solid #A7A7A7",
    //borderBottom: "1px solid #A7A7A7",
  }

  const stickyStylingHead = {
    position: "sticky",
    left: 0,
    backgroundColor: (colorRGB),
    //backgroundColor: `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.3 )`,
    //boxShadow: "5px 2px 5px black",
    borderRight: "1px solid white",
    borderBottom: "1px solid white",
  }

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

  const getValueByKeyInObject = (val: any, array: any) => {
    for (var key in array) {
      if (key == val) {
        if (array[`${key}`] == '.00') {
          return 0
        } else {
          return array[key]   
        }
      //  return array[key]
      }
    }
    return null;
  }

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
           validate: () => Number(getValues(nameRegister)) % Number(numberValidation) == 0 || 'Solo permite múltiplos segun adecuacion'
        }}
      />

    )
  }
  // <FaRegHandPointLeft/>
  

  const InputTextFieldSmall2 = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
    //console.log("entre al metodo 1")

    
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
            disabled={isDisable}
            //disabled={handleIsDisable()}
            //InputProps={{ inputProps: { min: 0, max: getStockByIndex(index) } }}
            InputProps={{style: {
              height: "30px",
            }, inputProps: { min: 0, step:0.25 },readOnly: true, }}
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

            //onBlur={testData}
            error={!!error}
            helperText={error ? error.message : null}


          />

        )}

        //capturar el elemento a comparar en este caso el stock


        rules={{
          required: isRequired,
          //  validate: () => getStockByIndex(index) >= Number(getValues(nameRegister))
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
                  width: '16%',

                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Producto
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Unidad de Conteo
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Stock
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Media Solicitud
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Stock Minimo
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '15%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Solicitud
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {/* {productosPerfil.map((rowP:any)=>(
              <TableCell>
                
                {getValueByKeyInObject(rowP.ID_SUB_CATEGORIA_2, productosPerfil.STOCK)}
              </TableCell>
            ))} */}
            {PRODUCTOS.map((row:any, index: any) => (
              <TableRow key={row.ID_SUB_CATEGORIA_2}>
                <TableCell
                  sx={{
                    ...stickyStyling,
                    //padding: "0px 0px",
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    // fontWeight: 'bold',
                    //   backgroundColor: "white",
                    paddingLeft: '10px',
                    borderRight: "1px solid #A7A7A7",
                    //borderBottom: "1px solid white",
                    //fontSize: "12px"
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
                    wordBreak: 'normal',
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    borderRight: "1px solid #A7A7A7",
                    //   borderBottom: "1px solid #A7A7A7",
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
                    fontWeight: 'bold',
                    backgroundColor: "white",
                    paddingLeft: '10px',
                    wordBreak: 'normal',
                    //borderBottom: "1px solid white",
                    fontSize: "12px" 
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
                  {getValueByKeyInObject(row.ID_SUB_CATEGORIA_2, registro)}
                </TableCell>

                <TableCell
                  sx={{
                    padding: "0px 0px",
                    borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                    wordBreak: 'normal'
                  }}

                  onClick={tableCellClickHandler}
                  align="left"
                >
                  {row.MEDIDA_ADECUACIÓN}
             
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
                  {/*row.f3*/}
                  {/* {getValueByKeyInObject(row.ID_SUB_CATEGORIA_2, row.STOCK)} */}
                 
                  <InputTextFieldSmall2

                    //isDisable={controlDisable == 10 ? true : false}
                    //isDisable={true}
                    
                    //variant="filled"
                    control={control}
                    //isRequired={true}
                    //nameRegister="demo"
                    nameRegister={`${row.ID_SUB_CATEGORIA_2}_minimo`} 
                    index={index}
                    />
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
                    <div style={{display:'flex',margin: '7px'}}>
                 <InputTextFieldSmall

                    isDisable={controlDisable == 10 ? true : false}
                    // isDisable={true}

                    //variant="filled"
                    control={control}
                    isRequired={true}
                    //nameRegister="demo"
                    nameRegister={`${row.ID_SUB_CATEGORIA_2}_solicitud`} 
                    keyRow={row.ID_SUB_CATEGORIA_2}
                    index={index}
                    />
                    {(precargado[row.ID_SUB_CATEGORIA_2]) == 1 ?
                    <>
                    <CardActionArea
                      sx={{
                        padding: '0', margin: '0', marginTop: '0px', width: '38px',backgroundColor: '#28A745',color: 'white'
                      }} 
                    >
                      <FaRegHandPointLeft
                        //titleAccess={rowBtn.TITLE}
                        sx={{ backgroundColor: '#28A745', color: 'white', fontSize: '2.3rem', padding: '10px' }}
                      />
                    </CardActionArea>
                    </>
                    :
                    <>
                    <CardActionArea
                      sx={{
                        padding: '0', margin: '0', marginTop: '0px', width: '38px',backgroundColor: '#D32F2F',color: 'white'
                      }} 
                    >
                      <FaRegHandPointLeft
                        //titleAccess={rowBtn.TITLE}#D32F2F 
                        sx={{ backgroundColor: '#D32F2F', color: 'white', fontSize: '2.3rem', padding: '10px' }}
                      />
                    </CardActionArea>
                    </>} 
                    </div>
                   
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          This is a {infoText} column.
        </Alert>
      </Snackbar>
    </div>
  );
}
