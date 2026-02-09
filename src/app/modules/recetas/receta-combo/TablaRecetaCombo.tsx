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
import { Button, Checkbox, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
//import { AlertSave } from "../../../common/alerts/alerts";
import { Controller ,useForm} from "react-hook-form";
import { useRecetaCombo } from "./services/useRecetaCombo";
import { KDImage } from "../../../../core/modal-loading/KDImage";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import { ModalBorrarRecetaCombo } from "./components/ModalBorrarRecetaCombo";

/*interface Cell {
  cellIndex: number;
}*/

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  //borderRight: "2px solid black",



};




export default function TablaRecetaCombo(props: any) {
  //const { formState, handleSubmit, register, unregister } = useForm();
  const { loadApiProductos, loadApiPrimeraCategoria, loadApiSegundaCategoria, 
    loadApiProductoCategoria, loadApiPresentacion, loadApiAComboCategoria, 
    loadApiAComboCategoria2, loadApiAComboCategoria3, loadApiAComboCategoria4,loadApiGuardarReceta } = useRecetaCombo()
  const { tableData, // ElementosCombo
    rows, getValues, control,  setValue, handleSubmit, Categoria1, IdComboMadre,
    idPrimeraCat, idSegundaCat, idProducto, idPresentacion, IdMenuCombo, idProductoG,
    unregister,deleteByIndex, pasarParametros, cerrarModal }:any = props;
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");
  //console.log("datos control ",ElementosCombo)

  //modal delete usuario
const [openModalDelete, setOpenModalDelete] = useState(false);

const handleOpenModalDelete = () => setOpenModalDelete(true);
const handleCloseModalDelete = () => setOpenModalDelete(false);


const [ID_V_M_COMBO, setID_V_M_COMBO] = useState('')
const [ID_PUNICO, setID_PUNICO] = useState('')

const pasarParametrosDelete = (row: any) => {
 const { ID_VENTAS_MENU_COMBO, ID_PRODUCTO_UNICO } = row;
 console.log("row ", row)
 setID_V_M_COMBO(ID_VENTAS_MENU_COMBO)
 setID_PUNICO(ID_PRODUCTO_UNICO)
 handleOpenModalDelete()

}
 
  //const [rows, setRows] = React.useState([]);

  //end codigo exitoso
  /*React.useEffect(() => {
    console.log("data ...", tableData)
    if (tableData) setRows(tableData);
  }, [tableData]);*/

  // const [rows, setRows] = useState<any>([])
  // React.useEffect(() => {
  //   //console.log("data ...", tableData)
  //   if (ElementosCombo) setRows(ElementosCombo);
  // }, [ElementosCombo]);

    //loading
    const [loading, setLoading] = useState(
      false
    );

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


  const addNewElement = (value: any) => {
    console.log("add ", value)
   
      //var { nomElemento } = value
      console.log("hay dato ", Categoria1)
    for (let i = 0; i < Categoria1?.length; i++) {
      //setRows([...rows,
      //{ PRODUCTO_MADRE: Categoria1[i].NOMBRE }
      //]);
    }

  }

  const onSubmit = async (dataForm: any) => {
    console.log("enviando datos form ", dataForm)
    AlertSave({ title: "GUARDADO!", message: "registrado correctamente" })
  }

  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  //guardar los dataForm de entregas
  const onSubmitRecetaCombo = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    //console.log("respues ", isObjEmpty(dataForm))
    console.log("datos** ",dataForm)
    console.log("rows ", rows)
    //paso 1 verificar si el objecto es mayor a cero
    /* if (isObjEmpty(dataForm) || isObjEmpty(rows) 
     ) {
       //alert("el objecto esta vacio")
       return;
     }*/



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    //for (var key in registro) {
      // if(isObjEmpty(ListaReceta)){
      //   return;
      // }else{
   
      for(let i=0; i<rows?.length; i++){
        //for (var i in ListaElementos) {
        //console.log("cantidad rows ",rows)
        var resChild: any = {
          // "entregada": dataForm[`${key}_entregada`],
          // "regresada": (dataForm[`${key}_devuelta`] == null ? "0" : dataForm[`${key}_devuelta`]),
          // "observacion": dataForm[`${key}_observacion`]
          //(dataForm[`${key}_solicitud`] == solicitud[key] ? "1" : "0")
          "id_producto_unico": (rows[i].ID_PRODUCTO_UNICO == undefined ? rows[i].IdProductoUnico : rows[i].ID_PRODUCTO_UNICO),
          "id_ventas_menu_combo": IdMenuCombo,
          "precio": (dataForm[`precio_${i}`] == undefined ? 0:dataForm[`precio_${i}`]),
          //"visual": (dataForm[`checkVisual_${i}`] == true ? 1 : 0),
          "visual": (dataForm[`visual_${i}`] == undefined ? 1:dataForm[`visual_${i}`]),
          "opcional": (dataForm[`check_${i}`] == true ? 1 : 0),
          "combo_madre": IdComboMadre,
          "id_pruducto_madre": idProductoG,
          //"perece": (dataForm[`check4_${i}`] == true ? 1 : 0),
          //"adecuacion": (dataForm[`${i}_medida`] > 0 ? dataForm[`${i}_medida`] : 0)
        }
        //resObj[(rows[i].ID_PRODUCTO_UNICO == undefined ? idProductoG:rows[i].ID_PRODUCTO_UNICO)] = resChild;
        resObj[i] = resChild;
      //}

    }

    console.log("combo_madre ", IdComboMadre)
    console.log("prod cate1 ", idPrimeraCat)
    console.log("prod cate2 ", idSegundaCat)
    console.log("producto madre ", idProducto)
    console.log("producto presentacion ", idPresentacion)
    console.log("res send guardar ", resObj)

        try {
          setLoading(true)
          const response = await loadApiGuardarReceta(
            IdComboMadre,
            idPrimeraCat,
            idSegundaCat,
            idProducto,
            idPresentacion,
            resObj
          )
          console.log("res aaa", response)
          setLoading(false)
          if (response?.status) {
            //await loadBuscarReceta()
            await pasarParametros()
            //cerrarModal()
            AlertSave({ title: "", message: response.message });
    
          }
          if (response?.status == false) {
            AlertQuestion({ title: '', message: 'No Se ha guardado ' })
    
    
          }
    
          if (response == undefined) {
            AlertError({ title: '', message: response.message })
          }
        
        } catch (error) {
          console.log("error api guardar:*", error)
          setLoading(false)
        }
        
  
}

 


  const InputTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
    //console.log("entre al metodo 1")


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
      
            InputProps={{ inputProps: { min: 0 } }}
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
            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
            //onBlur={testData}
            error={!!error}
            helperText={error ? error.message : null}
           


          />

        )}

      />

    )
  }

  const InputTextFieldSmall2 = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
    //console.log("entre al metodo 1")


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
      
            InputProps={{ inputProps: { min: 1 } }}
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
            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
            //onBlur={testData}
            error={!!error}
            helperText={error ? error.message : null}
           


          />

        )}

      />

    )
  }
  

  return (
    <div>
{/* <button onClick={()=> console.log(getValues())}>get values tabla</button> */}
{/* <button onClick={addNewElement}>tabla</button> */}
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
                Grupo
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '18%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Nombre
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Opcional
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '12%', wordBreak: 'normal' }} align="left">
                Precio
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '12%', wordBreak: 'normal' }} align="left" title="campo para el tipo de visualizacion">
                Opcion visual
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '7%', wordBreak: 'normal' }} align="left">
                Opciones
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, index: any) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    //padding: "0px 0px",
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    // fontWeight: 'bold',
                    backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    //  borderBottom: "1px solid white",
                    //fontSize: "12px"
                    fontSize: "0.9rem",
                    wordBreak: 'normal'
                    //padding:'1%',
                  }}
                  align="left"
                  
                >
                  {row.GRUPO}
                </TableCell>
                <TableCell
                  sx={{
                    // padding: "0px 0px",
                    paddingLeft: '10px',
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    //   borderRight: "1px solid #A7A7A7",
                    //   borderBottom: "1px solid #A7A7A7",
                    backgroundColor: "#C8E6C9",
                    wordBreak: 'normal',
                    "&:active": { backgroundColor: "blue" }
                  }}
                  align="left"
                  onClick={tableCellClickHandler}
                >
                  {row.PRODUCTO_MADRE}
                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
                  {/*row.f2*/}
                  <Controller
                      name={`check_${index}`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          //checked={props.value}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          checked={!!props.value}
                          onChange={(e: any) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="left"
                >
                  {/* <Controller
                    name={`price0_${index}`}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic" //label={label}
                        variant="outlined" sx={{
                          width: '100%',backgroundColor: 'white'
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"

                        inputProps={{
                          style: {
                            margin: 0, padding: '2px'
                          },
                        }}
                      />
                    )}

                    rules={{
                      required:true,
                    }}
                  /> */}
                  
                    <InputTextFieldSmall

                      isDisable={false}

                      //variant="filled"
                      control={control}
                      isRequired={true}
                      //nameRegister="demo"
                      nameRegister={`precio_${index}`}
                      index={index}
                    />
                
                </TableCell>

                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  onClick={tableCellClickHandler}
                  align="left"
                >
                  <InputTextFieldSmall2

                    isDisable={false}

                    //variant="filled"
                    control={control}
                    isRequired={true}
                    //nameRegister="demo"
                    nameRegister={`visual_${index}`}
                    index={index}
                    />
                  {/* <Controller
                      name={`checkVisual_${index}`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          //checked={props.value}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          checked={!!props.value}
                          onChange={(e: any) => props.onChange(e.target.checked)}
                        />
                      )}
                    /> */}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  //onClick={tableCellClickHandler}
                  align="left"
                >
                  {/*row.f3*/}
                  {/* <DeleteIcon sx={{
                    backgroundColor: '#DC3545', color: 'white', fontSize: '1.5rem', margin: '0'
                    // marginLeft: '10px'
                    , fontWeight: 'bold'
                  }}

                    onClick={() => deleteByIndex(index)}
                  /> */}
                  {row.ID_PRODUCTO_UNICO > 0 ? 
                    <DeleteIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '2.3rem',
                      padding: '10px',
                    }}

                      //onClick={() => deleteByIndex(index)}
                      onClick={() => pasarParametrosDelete(row)}
                    /> 
                    :
                    <DeleteIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '2.3rem',
                      padding: '10px',
                    }}

                      onClick={() => deleteByIndex(index)}
                      //onClick={() => pasarParametrosDelete(row)}
                    /> 
                    }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* {hoveredCell && <div>Mensaje: {hoveredCell}</div>} */}
      </TableContainer>

      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ backgroundColor: '#DC3741' }}



          variant="contained" startIcon={<SaveIcon />}

          onClick={handleSubmit(onSubmitRecetaCombo)}
         
        >
          Guardar Receta
        </Button>

      </div>
      <ModalBorrarRecetaCombo
        //loadBuscarReceta={loadBuscarReceta}
        ID_V_M_COMBO={ID_V_M_COMBO}
        ID_PUNICO={ID_PUNICO}
        openModalDelete={openModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        pasarParametros ={pasarParametros}
        />
      {loading ? <KDImage /> : null}
    </div>
  );
}
