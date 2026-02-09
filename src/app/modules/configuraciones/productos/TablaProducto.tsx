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
import BorderColorIcon from '@mui/icons-material/BorderColor';
//import { AlertSave } from "../../../common/alerts/alerts";
import { Controller, useForm } from "react-hook-form";
import { useProducto } from "./services/useProducto";
import { KDImage } from "../../../../core/modal-loading/KDImage";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import { ModalEditarPNuevo } from "./components/ModalEditarPNuevo";
//import { ModalBorrarRecetaCombo } from "./components/ModalBorrarRecetaCombo";

/*interface Cell {
  cellIndex: number;
}*/

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  //borderRight: "2px solid black",



};




export default function TablaProducto(props: any) {
  const { rows, getValues, control, setValue, handleSubmit, Categoria1, idSegundaCat, unregister, 
    deleteByIndex, register, getContador, nombreProducto, detalle,idUnidadMedida, 
    codEconomia, codProducto, checkSi, precio, state, listaPrecio,idsSelect,idsSucursales }: any = props;
  //console.log("lista en tabla", idsSelect)
  const { loadApiGuardarProducto } = useProducto()
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");
  //console.log("datos control ",ElementosCombo)

  //modal delete usuario
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  //modal Editar producto
  const [openModalEditarProductoN, setOpenModalEditarProductoN] = useState(false);
  const handleOpenModalEditarProductoN = () => setOpenModalEditarProductoN(true);
  const handleCloseModalEditarProductoN = () => setOpenModalEditarProductoN(false);

  const [DatosTablaNuevo, setDatosTablaNuevo] = useState('')
  const [ID_PUNICO, setID_PUNICO] = useState('')

  

  //const [rows1, setRows] = React.useState([]);

  //end codigo exitoso
  /*React.useEffect(() => {
    console.log("data ...", rows)
    if (rows) setRows(rows);
  }, [rows]);*/

  // const [rows, setRows] = useState<any>([])
  // React.useEffect(() => {
  //   //console.log("data ...", tableData)
  //   if (ElementosCombo) setRows(ElementosCombo);
  // }, [ElementosCombo]);

  //loading
  const [loading, setLoading] = useState(
    false
  );

  const pasarParametrosEditar = (row: any) => {
    const { precios_producto_unico    } = row;
    console.log("row ", row)
    setDatosTablaNuevo(row)
    handleOpenModalEditarProductoN()

  }

  /*const updateTextModalEdit = (idTamaño: string, tamaño: string, cantidad: number, sucursales: number,
    Pedidos_Ya: number, yaigo: number, ser: number, cortesias: number,
    reposiciones: number, consumo: number, desperdicio: number,
    fventas: number, fcortesias: number, fmerienda: number, fcredito: number,
    fdesperdicio: number) => {
    //setContador(10)
    // setRows([...rows,
    //   { TAMAÑO: data.tamaño}fco
    //   ]);

    setRows([...rows1,
    {
      IdTamaño: idTamaño, TAMAÑO: tamaño, FRUTAS: cantidad, SUCURSALES: sucursales,
      PEDIDOS: Pedidos_Ya, YAIGO: yaigo, SER: ser,
      CORTESIAS: cortesias, REPOSICIONES: reposiciones, CONSUMO: consumo,
      DESPERDICIOS: desperdicio, VENTAS: fventas, FCORTESIAS: fcortesias,
      MERIENDA: fmerienda, CREDITO: fcredito, FDESPERDICIO: fdesperdicio
    }
    ]);
    console.log("datos modal", tamaño, "*", cantidad, "*", sucursales, "*", Pedidos_Ya, "*",
      yaigo, "*", ser, "*", cortesias, "*", reposiciones, "*", consumo, "*", desperdicio, "*",
      fventas, "*", fcortesias, "*", fmerienda, "*", fcredito, "*", fdesperdicio)
  }*/

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


  //guardar los dataForm de entregas
  const GuardarProducto = async () => {

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

        "id_tam": rows[i].IdTamaño,
        "cantidad_frutas": rows[i].FRUTAS,
        "cantidad_frutas_original": "0",
        "precios": resPrecio,
        "id_producto_unico": 0
      }
      //resObj[(rows[i].ID_PRODUCTO_UNICO == undefined ? idProductoG:rows[i].ID_PRODUCTO_UNICO)] = resChild;
      resObj[i] = resChild;
      //}

    }
    var resTamaño: any = [];
    for(let y = 0; y <idsSelect?.length;y++){
      resTamaño.push(0)
    }

    var imagen64 = (state.base64URL).toString().replace('data:image/jpeg;base64,', '')
     imagen64 = (imagen64).toString().replace('data:image/png;base64,', '')
     imagen64 = (imagen64).toString().replace('data:image/jpg;base64,', '')

    console.log("nombre producto ", nombreProducto)
    console.log("id sub categoria", idSegundaCat)
    console.log("detalle ", detalle)
    console.log("idMedida ", idUnidadMedida)
    console.log("codigo economia ", codEconomia)
    console.log("codigo producto ", codProducto)
    console.log("transporte ", (checkSi == true ? 1 : 0), precio)
    console.log("ids",idsSucursales)
    console.log("imagen", imagen64)
    console.log("res send guardar ", resObj)
    console.log("cantidad en tabla", idsSelect)
    console.log("cambio",resTamaño)

    //const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

//console.log((state.base64URL).toString().replace('data:image/jpeg;base64,', ''));
if(idsSucursales > 0){
  console.log("hay sucursal")
    /*try {
      setLoading(true)
      const response = await loadApiGuardarProducto(
        nombreProducto, 
        idSegundaCat,
        detalle,
        idUnidadMedida,
        codEconomia,
        codProducto,
        (checkSi == true ? "1" : "0"),
        precio,
        idsSucursales,
        resObj,
        resTamaño,
        imagen64
      )
      console.log("res aaa", response)
      setLoading(false)
      if (response?.status) {
        //await loadBuscarReceta()
        //pasarParametros()
        AlertSave({ title: "", message: 'Se ha guardado Correctamente' });
 
      }
      if (response?.status == false) {
        AlertQuestion({ title: '', message: 'No Se ha guardado ' })
 
 
      }
 
      if (response == undefined) {
        AlertError({ title: '', message: 'No Se ha guardado ' })
      }
    
    } catch (error) {
      console.log("error api guardar:*", error)
      setLoading(false)
    }*/
  }else{
    AlertError({ title: '', message: 'Seleccione Sucursal ' })
  }

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
        <Table sx={{ tableLayout: "auto", minWidth: '950px' }}>
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
                    paddingLeft: '10px',
                    //  borderBottom: "1px solid white",
                    //fontSize: "12px"
                    fontSize: "0.9rem",
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
                    paddingLeft: '10px',
                    // fontWeight: 'bold',
                    // borderBottom: "1px solid white",
                    //   borderRight: "1px solid #A7A7A7",
                    //   borderBottom: "1px solid #A7A7A7",
                    backgroundColor: "#C8E6C9",
                    wordBreak: 'normal',
                    "&:active": { backgroundColor: "blue" }
                  }}
                  align="center"
                  onClick={tableCellClickHandler}
                >
                  {row.FRUTAS}
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
                  {row.SUCURSALES}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",
                    // borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                  }}

                  onClick={tableCellClickHandler}
                  align="center"
                >


                  {row.PEDIDOS}

                </TableCell>

                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.YAIGO}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.SER}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.CORTESIAS}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.REPOSICIONES}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.CONSUMO}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.DESPERDICIOS}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.VENTAS}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.FCORTESIAS}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.MERIENDA}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.CREDITO}

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    backgroundColor: "#C8E6C9",// borderRight: "1px solid #A7A7A7",
                    // borderBottom: "1px solid white",
                    paddingLeft: '10px',
                  }}

                  //onClick={tableCellClickHandler}
                  align="center"
                >

                  {row.FDESPERDICIO}

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

          onClick={handleSubmit(GuardarProducto)}

        >
          Guardar
        </Button>
        {/* <button onClick={()=> console.log(getValues())}>get values </button> */}
      </div>

      <ModalEditarPNuevo
      openModalEditarProductoN={openModalEditarProductoN}
      handleOpenModalEditarProductoN={handleOpenModalEditarProductoN}
      handleCloseModalEditarProductoN={handleCloseModalEditarProductoN}
      handleSubmit={handleSubmit}
      control={control}
      getValues={getValues}
      setValue={setValue}
      register={register}
      DatosTablaNuevo={DatosTablaNuevo}
      />

      {loading ? <KDImage /> : null}
    </div>
  );
}
