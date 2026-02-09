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



export default function TablaPerfilPedido(props: any) {
  const { COLOR_R, COLOR_G, COLOR_B, PRODUCTOS, control,getValues,adecuacionInput} = props;


  const PRODUCTOS_1=[
    {SUB_CATEGORIA_2:'tony1'},
    {SUB_CATEGORIA_2:'tony2'},
    {SUB_CATEGORIA_2:'tony3'},
    {SUB_CATEGORIA_2:'tony4'},
    {SUB_CATEGORIA_2:'tony5'},
    {SUB_CATEGORIA_2:'tony6'},
  ]


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
    top: '0', zIndex: 10,
    backgroundColor: 'white',
    //boxShadow: "5px 2px 5px black",
    borderRight: "1px solid #A7A7A7",
    //borderBottom: "1px solid #A7A7A7",
  }

  const stickyStylingHead = {
    position: "sticky",
    left: 0,
    top: '0', xIndex: 100,
    //backgroundColor: `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.3 )`,
    backgroundColor: (colorRGB),
    //boxShadow: "5px 2px 5px black",
    borderRight: "1px solid white",
    borderBottom: "1px solid white",
  }


  const tableRowTextStyling = {
  


  };

  //const stock = STOCK.find((element:any) => element. == PRODUCTOS.ID_SUB_CATEGORIA_2);
  // console.log("stock segun producto:**",stock);

  const tableHeaderClickHandler = (e: any) => {
    console.log("Detected Header Click");
   
    //    if (((e.target as unknown) as Cell).cellIndex) {
    if (((e.target)).cellIndex) {
  
    } 
  };




  //var map = { "item1": 1404, "item2": 2, "item3":3 ,"item4":5};
  //var res = getValueByKeyInObject("item1", map); 

  const InputTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index, keyRow }: any) => {
    //console.log("entre al metodo 1")
    var  numberValidation = adecuacionInput[keyRow]

    return (


      <Controller
        name={nameRegister}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (

          <TextField id="outlined-basic"
            sx={{ backgroundColor: 'white',   wordBreak: 'normal' }}
            //label="Outlined"
            size="small"
            type="number"
            disabled={isDisable}
      
             InputProps={{ inputProps: { min: 0,step:Number(numberValidation) } }}
            /* InputProps={{
               readOnly: isDisable,
             }}*/
            // variant="filled"
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
          required: {
            value: isRequired,
            message:'Completa este campo '
          },
           validate: () => Number(getValues(nameRegister)) % Number(numberValidation) == 0 || 'Solo permite múltiplos segun adecuacion'
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
        <Table sx={{ tableLayout: "auto",minWidth:'750px' }}>
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
                  width: '14%',

                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Producto
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '15%', borderLeft: "1px solid white" }} align="left">
                Unidad Medida
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '20%', borderLeft: "1px solid white" }} align="left">
                Nota
              </TableCell>
              {/*<TableCell sx={{ ...tableStyling, width: '8%', borderLeft: "1px solid white", fontSize: '10px' }} align="left">
                Stock
              </TableCell>*/}
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white" }} align="left">
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
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    // fontWeight: 'bold',
                    //   backgroundColor: "white",
                    paddingLeft: '10px',
                    //  borderBottom: "1px solid white",
                    //fontSize: "12px"
                    wordBreak: 'normal',
                   // fontSize: "0.9rem",
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
                  //  fontSize: "0.9rem",
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    //   borderRight: "1px solid #A7A7A7",
                    //   borderBottom: "1px solid #A7A7A7",
                   // "&:active": { backgroundColor: "blue" }
                  }}
                  align="left"
                  onClick={tableCellClickHandler}
                >
                  {row.MEDIDA_ESTANDARIZACION}
                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    //fontWeight: 'bold',
                    backgroundColor: "white",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                   // fontSize: "12px",
                 //   fontSize: "0.9rem",
                    
                    wordBreak: 'normal',
                   // overflowWrap: 'normal'
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
                  {row.NOTA}
                </TableCell>
                {/* <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="center"
                >
                 {getValueByKeyInObject(row.ID_SUB_CATEGORIA_2, STOCK)}
     
                </TableCell>*/}
                <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="center"
                >



                  <InputTextFieldSmall

                    isDisable={false}

                    //variant="filled"
                    control={control}
                    isRequired={true}
                    //nameRegister="demo"
                    nameRegister={`${row.ID_SUB_CATEGORIA_2}`}
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
