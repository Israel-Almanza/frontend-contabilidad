import React, { useState, useEffect } from "react";
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
//import { AlertSave } from "../../../common/alerts/alerts";
import { Controller, useForm } from "react-hook-form";
import { useProducto } from "./services/useProducto";
import { KDImage } from "../../../../core/modal-loading/KDImage";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import { ModalEditarProducto } from "./components/ModalEditarProducto";

/*interface Cell {
  cellIndex: number;
}*/

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  //borderRight: "2px solid black",



};




export default function TablaProductoEditar(props: any) {
  const { rows, getValues, control, setValue, handleSubmit, Categoria1, idSegundaCat, unregister, deleteByIndex,
    register, nombreProducto, detalle, idUnidadMedida, codEconomia, codProducto,
    checkSi, precio, state, listaPrecio, idsSelect }: any = props;
  console.log("lista ", rows)
  const { loadApiGuardarProducto } = useProducto()
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");
  //console.log("datos control ",ElementosCombo)

  //modal Editar producto
  const [openModalEditarProducto, setOpenModalEditarProducto] = useState(false);
  const handleOpenModalEditarProducto = () => setOpenModalEditarProducto(true);
  const handleCloseModalEditarProducto = () => setOpenModalEditarProducto(false);


  const [DatosTabla, setDatosTabla] = useState('')
  const [ID_PUNICO, setID_PUNICO] = useState('')


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



  React.useEffect(() => {
    console.log("lists precios ...", listaPrecio)
    console.log("rows ...", rows)
  }, []);

  const pasarParametrosEditar = (row: any) => {
    const { precios_producto_unico    } = row;
    console.log("row ", row)
    setDatosTabla(row)
    handleOpenModalEditarProducto()

  }

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

  const getItemAsignado = (llave: string, fila: any) => {
    //("Pedidos Ya")

    //obtner codigo o item dependiendo a la llave que recibe
    const itemListaPrecio = listaPrecio.find((x: any) => x.NOMBRE_LISTA_PRECIOS === llave);

  //  console.log("get datos ", itemListaPrecio)

  //  console.log("get fila ", fila.precios_producto_unico)

    if (itemListaPrecio) {
      var id_lista_precios = itemListaPrecio.ID_NOMBRE_LISTA_PRECIOS;
      //console.log("encontrete id ", id_lista_precios)
      for (let x = 0; x < fila.precios_producto_unico?.length; x++) {

        if (fila?.precios_producto_unico[x]?.ID_NOMBRE_LISTA_PRECIOS == id_lista_precios) {
          return  fila?.precios_producto_unico[x].PRECIO
        }


      }
     
    } else {
      return 0
    }

   

  }


  //guardar los dataForm de productos
  const EditarProducto = async () => {

    console.log("rows ", rows)
    
    var resObj: any = [];
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    for (let i = 0; i < rows?.length; i++) {
      var resPrecio: any = [];

       for (let x = 0; x < listaPrecio?.length; x++) {

         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Sucursales") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['SUCURSALES']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Pedidos Ya") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['PEDIDOS']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Yaigo") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['YAIGO']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Ser") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['SER']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Cortesias") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['CORTESIAS']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Reposiciones") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['REPOSICIONES']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Consumo interno") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['CONSUMO']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Desperdicios") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['DESPERDICIOS']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Fexco-Ventas") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['VENTAS']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Fexco-Cortesias") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['FCORTESIAS']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Fexco-Merienda") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['MERIENDA']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Fexco-Consumo a Crédito") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['CREDITO']
           })
         }
         if (listaPrecio[x]?.NOMBRE_LISTA_PRECIOS == "Fexco-Desperdicio") {
           resPrecio.push({
             "id_lp": listaPrecio[x]?.ID_NOMBRE_LISTA_PRECIOS,
             "precio": (rows[i])['FDESPERDICIO']
           })
         }


       }

      var resChild: any = {

        "id_tam": rows[i].id_tam,
        "cantidad_frutas": rows[i].cantidad_frutas,
        "cantidad_frutas_original": "0",
        "precios": resPrecio,
        "id_producto_unico": 0
      }
      //resObj[(rows[i].ID_PRODUCTO_UNICO == undefined ? idProductoG:rows[i].ID_PRODUCTO_UNICO)] = resChild;
      resObj[i] = resChild;
      //}

    }
    var resTamaño: any = [];
    for (let y = 0; y < idsSelect?.length; y++) {
      resTamaño.push(0)
    }

    var imagen64 = (state.base64URL).toString().replace('data:image/jpeg;base64,', '')

    console.log("nombre producto ", nombreProducto)
    console.log("id sub categoria", idSegundaCat)
    console.log("detalle ", detalle)
    console.log("idMedida ", idUnidadMedida)
    console.log("codigo economia ", codEconomia)
    console.log("codigo producto ", codProducto)
    console.log("transporte ", (checkSi == true ? 1 : 0), precio)
    console.log("imagen", imagen64)
    console.log("res send guardar ", resObj)
    console.log("cantidad en tabla", idsSelect)
    console.log("cambio", resTamaño)

  }




  return (
    <div>
      {/* <button onClick={()=> console.log(getValues())}>get values tabla</button> */}
      {/* <button onClick={addNewElement}>tabla</button> */}
      {/* <button onClick={()=>updateTextTabla()}>actualizar dato desde tabla</button>
<button onClick={()=>getContador()}>ver dato</button> */}
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
          <TableHead  //onClick={tableHeaderClickHandler} 
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
                  //fontSize: "1rem",
                  fontSize: "0.6rem",
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
                  width: '5%',
                  wordBreak: 'normal',
                  borderRight: "1px solid #A7A7A7"
                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Tamaño
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '4%', borderLeft: "1px solid white", wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Frutas
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', borderLeft: "1px solid white", wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Sucursales
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Pedidos Ya
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '4%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Yaigo
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Ser
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Cortesias
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Reposiciones
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Consumo Interno
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Desperdicios
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Fexco-Ventas
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Fexco-Cortesias
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Fexco-Merienda
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '8%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Fexco-Consumo a Crédito
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Fexco-Desperdicio
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal', borderRight: "1px solid #A7A7A7" }} align="center">
                Acciones
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
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px",
                    //  borderBottom: "1px solid white",
                    //fontSize: "12px"
                    //fontSize: "0.9rem",
                    wordBreak: 'normal'
                    //padding:'1%',
                  }}
                  align="center"
                >
                  {row.TAMAÑO}
                </TableCell>
                <TableCell
                  sx={{
                    // padding: "0px 0px",
                    //paddingLeft: '10px',
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    //   borderRight: "1px solid #A7A7A7",
                    //   borderBottom: "1px solid #A7A7A7",
                    backgroundColor: "#C8E6C9",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px",
                    wordBreak: 'normal',
                    "&:active": { backgroundColor: "blue" }
                  }}
                  align="center"
                //onClick={tableCellClickHandler}
                >
                  {row.cantidad_frutas}
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
                  align="center"
                >
                      {getItemAsignado("Sucursales", row)}
             
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}


                  align="center"
                >

                  {getItemAsignado("Pedidos Ya", row)}
                  {/*row.PEDIDOS*/}

                </TableCell>

                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}


                  align="center"
                >

                {getItemAsignado("Yaigo", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}


                  align="center"
                >

                  {getItemAsignado("Ser", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}


                  align="center"
                >

                  {getItemAsignado("Cortesias", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}


                  align="center"
                >

                  {getItemAsignado("Reposiciones", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {getItemAsignado("Consumo interno", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {getItemAsignado("Desperdicios", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {getItemAsignado("Fexco-Ventas", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {getItemAsignado("Fexco-Cortesias", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {getItemAsignado("Fexco-Merienda", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {getItemAsignado("Fexco-Consumo a Crédito", row)}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    fontSize: "12px"
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {getItemAsignado("Fexco-Desperdicio", row)}

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

                  <BorderColorIcon sx={{
                    backgroundColor: '#FFC107', color: 'white', fontSize: '1.2rem', padding: '0.5px', margin: '0',
                    marginLeft: '10px', marginBottom: '10px'
                    , fontWeight: 'bold'
                  }}

                  //onClick={() => deleteByIndex(index)}
                  onClick={() => pasarParametrosEditar(row)}
                  />

                  <DeleteIcon sx={{
                    backgroundColor: '#DC3545', color: 'white', fontSize: '1.2rem',
                    padding: '1px',
                    marginLeft: '10px', marginBottom: '10px'
                    , fontWeight: 'bold'
                  }}

                    onClick={() => deleteByIndex(index)}
                  //onClick={() => pasarParametrosDelete(row)}
                  />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ backgroundColor: '#DC3741' }}



          variant="contained" startIcon={<SaveIcon />}

          onClick={handleSubmit(EditarProducto)}

        >
          Editar
        </Button>
        {/* <button onClick={()=> console.log(getValues())}>get values </button> */}
      </div>

      <ModalEditarProducto
      openModalEditarProducto={openModalEditarProducto}
      handleOpenModalEditarProducto={handleOpenModalEditarProducto}
      handleCloseModalEditarProducto={handleCloseModalEditarProducto}
      handleSubmit={handleSubmit}
      control={control}
      getValues={getValues}
      setValue={setValue}
      register={register}
      DatosTabla={DatosTabla}
      />

      {loading ? <KDImage /> : null}
    </div>
  );
}
