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
import { TextField, Typography, Button } from "@mui/material";
import { Controller } from "react-hook-form";
import useInterval from "use-interval";
import { ToastContainer, toast } from 'react-toastify';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import { AlertSave,AlertError,AlertQuestion } from '../../../common/alerts/alerts';
import { useRecepcionPlanta } from "./services/useRecepcionPlanta";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#28A745'),
    backgroundColor: '#28A745',
    '&:hover': {
      backgroundColor: '#1c8033',
    },
  }));

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#D4A1D5',
  padding: '0.8%',
  //minWidth:'200px'

  // wordBreak:'keep-all',
  //borderRight: "2px solid black",



};



export default function TablaDetalleRecepcion(props: any) {

  const { tableData, control, getValues, handleSubmit, setValue, reset,
        nroDocumento, fechaRecepcion, fechaDocumento, nomDestino, checkSi, dataQ,
        handleOBoton, handleCBoton } = props;
  const {loadApiGuardarDetalleRecepcion} = useRecepcionPlanta()
  //const { formState, handleSubmit, control, register, getValues } = useForm();
  // const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = React.useState([]);
  // time controller  30 seg = 30*1000
  const [delay, setDelay] = useState(30000)
   useEffect(() => {
     for (let i = 0; i < tableData?.length; i++) {
         setValue(`CANTIDAD_R${i}`,tableData[i].CANTIDAD)
         //console.log("cantidad ",tableData[i].CANTIDAD)
     }
     //cleanLocalStorageRows()
   }, [tableData]);

  

  React.useEffect(() => {
    //console.log("data ...", tableData)
    if (tableData) setRows(tableData);
  }, [tableData]);

 
  const [indexCurrentTabla, setIndexCurrentTabla] = useState(-1)

  useInterval(() => {
    // Your custom logic here
    //setCount(count + 1);
    if (indexCurrentTabla >= 0) {
      //  console.log("valores ", getValues(`CANTIDAD_${indexCurrentTabla}`), getValues(`COSTO_UNITARIO_${indexCurrentTabla}`))
      if (getValues(`CANTIDAD_R${indexCurrentTabla}`) == "" && getValues(`COSTO_UNITARIO_R${indexCurrentTabla}`) == "") {
        //elminar el validador en estos campos 
       // localStorage.removeItem(`CANTIDAD_${indexCurrentTabla}`);
        ///localStorage.removeItem(`COSTO_UNITARIO_${indexCurrentTabla}`);

        // handleSubmit(() => { })()
        //  console.log("eliminado validados de campo vacio")
      }
      if (getValues(`CANTIDAD_R${indexCurrentTabla}`) == "" && getValues(`COSTO_UNITARIO_R${indexCurrentTabla}`) == "" && getValues(`SUBTOTAL_${indexCurrentTabla}`)) {
        //elminar el validador en estos campos 
        // localStorage.removeItem(`CANTIDAD_${indexCurrentTabla}`);
        // localStorage.removeItem(`COSTO_UNITARIO_${indexCurrentTabla}`);
        setValue(`SUBTOTAL_${indexCurrentTabla}`)

        calculatingDataUpdate(indexCurrentTabla)

        //handleSubmit(() => { })()
        //  console.log("eliminado validados de campo vacio")
      }
    }
    // console.log("interval",indexCurrentTabla)
  }, 1000); // passing null instead of 1000 will cancel the interval if it is already running



  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");


  const defaultStyleTitle = true;

  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };

  const tableHeaderClickHandler = (e: any) => {
    //console.log("Detected Header Click");
    setSnackbarOpen(true);
    //    if (((e.target as unknown) as Cell).cellIndex) {
    if (((e.target)).cellIndex) {
      setInfoText("data");
    } else {
      setInfoText("title");
    }
  };

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

    if (getValues(`CANTIDAD_R${index}`) && getValues(`COSTO_UNITARIO_R${index}`)) {
      console.log("entre calculo 2")
      var CANTIDAD_ROW = Number(getValues(`CANTIDAD_R${index}`));
      var COSTO_UNITARIO_ROW = Number(getValues(`COSTO_UNITARIO_R${index}`))
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

  const GuardarRecepcion = async (dataForm: any) => {
    //console.log("enviando datos form ", dataForm)
    //console.log("fecha de entrega ", fechaDocumento)
    console.log("holaaaa");
    console.log("rows ",rows)
    
    var resObj: any = []

for (let i = 0; i < rows?.length; i++) {
  //for (var i in ListaElementos) {

  var resChild: any = {
   
       
        "id_pedido": rows[i].ID_PEDIDO,
        "cantidad": dataForm[`CANTIDAD_R${i}`],
        "costo_unit": dataForm[`COSTO_UNITARIO_R${i}`],
        "descuento": (dataForm[`DESCUENTO_${i}`] == undefined ? 0 : dataForm[`DESCUENTO_${i}`]),
        "ice": (dataForm[`ICE_${i}`] == undefined ? 0 : dataForm[`ICE_${i}`]),
        "subtotal": dataForm[`SUBTOTAL_${i}`]
  }
  resObj[i] = resChild;

  //}

}
    

    const dataSend = {
        "id_pedido": "0",
        "numero_documento": nroDocumento,
        "fecha_documento": fechaDocumento,
        "fecha_recepccion": fechaRecepcion,
        "destino_fondos": nomDestino,
        "url_factura": (checkSi == true? dataQ : ""),
        "factura": (checkSi == true? "1":"0"),
        "subtotal": dataForm.SUBTOTAL,
        "descuento": (dataForm.DESCUENTO == undefined ? 0:dataForm.DESCUENTO),
        "total": dataForm.total, // total,//"52",
        "detalles": resObj
    }

    console.log("send data ", dataSend)

   

       try {
            setLoading(true)
            const response = await loadApiGuardarDetalleRecepcion(
                "0",
                nroDocumento,
                fechaDocumento,
                fechaRecepcion,
                nomDestino,
                (checkSi == true? dataQ : ""), 
                (checkSi == true? "1":"0"), 
                dataForm.SUBTOTAL, 
                (dataForm.DESCUENTO == undefined ? 0:dataForm.DESCUENTO),
                dataForm.total,
                resObj
            )
            setLoading(false)
            // handleCloseModalPersonalized()
            closeModalResetForm();
              handleCBoton()
            console.log("res data ", response)
            if (response.status) {
                AlertSave({ title: "", message: response.message });
                return;
            }

            if (response?.status == false) {

                AlertQuestion({ title: '', message: 'No Se ha guardado ' })
                return;
              }
      
              if (response == undefined) {
                AlertError({ title: '', message: 'Algo salió mal' })
                return;
              }
        } catch (error) {
            console.log("error api", error)
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
             // handleSubmit(() => { })()
            }}

            onFocus={(e) => {
             // e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })


            }
            }
            onChange={(event) => {

             // localStorage.setItem(`CANTIDAD_${index}`, `CANTIDAD_${index}`)
            //  localStorage.setItem(`COSTO_UNITARIO_${index}`, `COSTO_UNITARIO_${index}`)



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
          //required: getEsRequerido()

          //  esRequeridoName == nameRegister ? true : false
        }

        }


      />

    )
  }

  
    
    const cleanLocalStorageRows = () => {
        localStorage.removeItem(`DESCUENTO`)
        console.log("delete local storega de de form table")
        for (let i = 0; i < rows.length; i++) {
            localStorage.removeItem(`CANTIDAD_R${i}`);
            localStorage.removeItem(`COSTO_UNITARIO_R${i}`);
            localStorage.removeItem(`ICE_${i}`);
            localStorage.removeItem(`DESCUENTO_${i}`);
            localStorage.removeItem(` SUBTOTAL_${i}`);
            //localStorage.setItem(`CANTIDAD_${i}`, `CANTIDAD_${index}`)
            //   localStorage.setItem(`COSTO_UNITARIO_${i}`, `COSTO_UNITARIO_${index}`)
        }
    }

    const closeModalResetForm = () => {

        reset({}); //reset values form
        setRows([]) //reset value table modal
        cleanLocalStorageRows()
    
    }
    const onSubmit = async (data: any) => {
      console.log("enviando datos form ", data)
  }


  return (
    <div>
    <div style={{


    }}>
{/* <button onClick={()=> console.log(getValues())}>get values </button> */}
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
          <TableHead onClick={tableHeaderClickHandler} style={{
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
                  width: '15%',
                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Producto
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '15%', borderLeft: "1px solid white" }} align="left">
                Presentacion
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '14%', borderLeft: "1px solid white" }} align="left">
                Cantidad
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '14%', borderLeft: "1px solid white" }} align="center">
                Precio Unitario
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '14%', borderLeft: "1px solid white" }} align="center">
                Descuento
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '14%', borderLeft: "1px solid white"}} align="center">
                ICE
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '14%', borderLeft: "1px solid white" }} align="center">
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
                    fontSize: "13px",
                    fontFamily: "Times New Roman"
                    //fontSize: "0.9rem",
                    //padding:'1%',
                  }}
                  align="left"
                >
                  {row.NOMBRE_PRODUCTO}
                </TableCell>
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
                    fontSize: "13px",
                    fontFamily: "Times New Roman"
                    //fontSize: "0.9rem",
                    //padding:'1%',
                  }}
                  align="left"
                >
                  {row.NOMBRE_PRESNTACION}
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
                  onClick={tableCellClickHandler}
                >
                  <InputTextFieldSmall

                    control={control}
                    // isRequired={false}
                    nameRegister={`CANTIDAD_R${index}`}
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
                    nameRegister={`COSTO_UNITARIO_R${index}`}
                    index={index}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="left"
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
                  <InputTextFieldSmall

                    control={control}
                    isRequired={false}
                    nameRegister={`DESCUENTO_${index}`}
                    index={index}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  onClick={tableCellClickHandler}
                  align="left"
                >

                  <InputTextFieldSmall

                    control={control}
                    isRequired={false}
                    nameRegister={`ICE_${index}`}
                    index={index}
                  />


                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
    <ColorButton variant="contained" onClick={handleSubmit(GuardarRecepcion)} > Guardar</ColorButton>

    {/* <ColorButton variant="contained" onClick={handleSubmit((data:any) => {console.log(data) })} > Confirmar</ColorButton> */}


    </div>

    </div>
    
    {loading ? <KDImage /> : null}
      <ToastContainer />
    </div>
  );
}
