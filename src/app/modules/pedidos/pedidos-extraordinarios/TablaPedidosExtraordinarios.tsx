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
import { Box, Button, CardActionArea, Checkbox, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
//import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import TableViewIcon from '@mui/icons-material/TableView';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ReactDOMServer from 'react-dom/server'

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import RecommendIcon from '@mui/icons-material/Recommend';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';




import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '@mui/utils';
import { usePedidosExtraordinariosService } from "./services/usePedidosExtraordinariosService";
import Swal from "sweetalert2";
import axios from "axios";
import AplicationConnect from "../../../../core/api/AplicationConnect";
import { AlertError, AlertSave } from "../../../common/alerts/alerts";
import { KDImage } from "../../../../core/modal-loading/KDImage";







const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  //fontSize: '11px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  fontWeight: 'bold'
  //borderRight: "2px solid black",



};




function TablePaginationActions(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}




function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: any) {
  // console.log("order orderBy", order, orderBy)
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array: any, comparator: any) {

  //console.log("step 3 ", array, comparator)
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}


//const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER = 'desc';
//const rows = 'calories';
const DEFAULT_ORDER_BY = 'ID_PEDIDO_EXTRAORDINARIO';
const DEFAULT_ROWS_PER_PAGE = 5;

const EnhancedTableHead = (props: any) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  //console.log("ordenar por ", props)
  /* const createSortHandler = (newOrderBy: any) => (event: any) => {
     console.log("step 1", newOrderBy, event)
     onRequestSort(event, newOrderBy);
   };*/




  return (
    <TableHead style={{
      //  borderTopColor: 'black',
      //  borderTopStyle: 'double'

    }}>
      <TableRow sx={{
        //  backgroundColor: "#BCEAFD",
        //borderBottom: "2px solid black",

        "& th": {
          fontSize: "12px",
          //fontSize: "0.8rem",
          //  height: "5px",
          // color: "black",
          //  borderBottom: "1px solid white",

        }
      }} >
        <TableCell
          onClick={() => {
            console.log("Detected Cell Click");
          }}
          sx={{
            ...tableStyling,
            width: '6%',

            // backgroundColor: "red",
            //  paddingLeft: '10px',
            // fontWeight: 'bold',


          }}
          align="left"
        >
          {/* Nombre Completo*/}
          <TableSortLabel
          // active={orderBy === "nombre"}
          // direction={orderBy === "nombre" ? order : 'asc'}
          // onClick={createSortHandler("nombre")}
          >
            Sucursal
            {/*orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null*/}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '3%', minWidth: '60px', borderLeft: "1px solid white" }} align="left">
          Categoria
          <TableSortLabel
            active={orderBy === "CATEGORIA"}
            direction={orderBy === "CATEGORIA" ? order : 'asc'}
            onClick={createSortHandler("CATEGORIA")}
          >
            {/*headCell.label*/}
            {orderBy === "CATEGORIA" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '4.5%', borderLeft: "1px solid white" }} align="left">
          SubCategoria
          <TableSortLabel
            active={orderBy === "SUBCATEGORIA1"}
            direction={orderBy === "SUBCATEGORIA1" ? order : 'asc'}
            onClick={createSortHandler("SUBCATEGORIA1")}
          >
            {/*headCell.label*/}
            {orderBy === "SUBCATEGORIA1" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '3.5%' }} align="left">
          Producto
          <TableSortLabel
            active={orderBy === "SUBCATEGORIA2"}
            direction={orderBy === "SUBCATEGORIA2" ? order : 'asc'}
            onClick={createSortHandler("SUBCATEGORIA2")}
          >
            {/*headCell.label*/}
            {orderBy === "SUBCATEGORIA2" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '7%' }} align="left">
          Detalle
          <TableSortLabel
            active={orderBy === "DETALLE"}
            direction={orderBy === "DETALLE" ? order : 'asc'}
            onClick={createSortHandler("DETALLE")}
          >
            {/*headCell.label*/}
            {orderBy === "DETALLE" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '4.2%' }} align="left">
          P.Modificado
          <TableSortLabel
            active={orderBy === "MODIFICADO"}
            direction={orderBy === "MODIFICADO" ? order : 'asc'}
            onClick={createSortHandler("MODIFICADO")}
          >
            {/*headCell.label*/}
            {orderBy === "MODIFICADO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '5%' }} align="left">
          Fecha de Entrega
          <TableSortLabel
            active={orderBy === "FECHA_ENTREGA_PEDIDO"}
            direction={orderBy === "FECHA_ENTREGA_PEDIDO" ? order : 'asc'}
            onClick={createSortHandler("FECHA_ENTREGA_PEDIDO")}
          >
            {/*headCell.label*/}
            {orderBy === "FECHA_ENTREGA_PEDIDO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{
          ...tableStyling, width: '2%'
        }} align="left">
          Acciones

        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function TablaPedidosExtraordinarios(props: any) {

  //console.log("rec prodiedad ", props.lista)
  const { tableData, deleteByIndex, nombreSucursal,

    btn_eliminar,
    btn_aceptar_eli,
    btn_rechazar_eli,
    btn_aceptar_sup,
    btn_aceptar_pla,
    codigoSucursal,
    sufijoSucursal,
    handleChangeControlReload
  }: any = props;


  console.log("propiedades necesarias", codigoSucursal,
    sufijoSucursal)

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  ;
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const [rows, setRows] = React.useState([]);


  const [loading, setLoading] = useState(false);







  //end codigo exitoso
  React.useEffect(() => {
    //console.log("data ...", tableData)
    //loadBotonesPermisos();
    if (tableData) setRows(tableData);
  }, [tableData]);





  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };






  // end codigo exitiso


  // end new code Pagina and ordder

  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };




  //code delete 

  //end code delete

  const formatDateString = (FECHA_ENTREGA_PEDIDO: string) => {

    //console.log(FECHA_ENTREGA_PEDIDO.substring(8, 10));

    var year = FECHA_ENTREGA_PEDIDO.substring(0, 4);
    var day = FECHA_ENTREGA_PEDIDO.substring(5, 7);
    var month = FECHA_ENTREGA_PEDIDO.substring(8, 10)

    var res = month + '/' + day + '/' + year
    //26/04/2023
    //const str = 'Mozilla';


    return res
  }

  function Row(props: any) {
    const { row } = props;



    const onClickRechazarEliminarPE = (id_pedido_extraordinario: string,
      codigo_sucursal: string,
      sufijo_sucursal: string,
      estado: string) => {

      console.log("pasando parametros ", id_pedido_extraordinario, codigo_sucursal, sufijo_sucursal, estado)
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se rechazará la eliminación del pedido extraordinario.',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',

      }).then((result) => {

        if (result.isConfirmed) {


          setLoading(true);
          AplicationConnect.post<any>(`/pedido_extraordinario/cambiar-estado-pe`, {
            "id_pedido_extraordinario": id_pedido_extraordinario,
            "codigo_sucursal": codigo_sucursal,
            "sufijo_sucursal": sufijo_sucursal,
            "estado": estado

          }).then((res: any) => {
            setLoading(false)
            console.log(" respuesta YYY", res.data)

            if (res?.data?.status) {

              handleChangeControlReload();
              AlertSave({ title: '', message: `Se ha realizado la operación correctamente.` })
            } else {
              AlertError({ title: '', message: 'Algo salió mal' })
            }

            //  
          }).catch(err => {
            // Handle error
            setLoading(false)
            console.log("error", err);
          });



        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }


   
     
    const onClickAprobarEliminarPE = (id_pedido_extraordinario: string,
      codigo_sucursal: string,
      sufijo_sucursal: string,
      estado: string) => {

      console.log("pasando parametros ", id_pedido_extraordinario, codigo_sucursal, sufijo_sucursal, estado)
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminará el pedido extraordinario.',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',

      }).then((result) => {

        if (result.isConfirmed) {


          setLoading(true);
          AplicationConnect.post<any>(`/pedido_extraordinario/cambiar-estado-pe`, {
            "id_pedido_extraordinario": id_pedido_extraordinario,
            "codigo_sucursal": codigo_sucursal,
            "sufijo_sucursal": sufijo_sucursal,
            "estado": estado

          }).then((res: any) => {
            setLoading(false)
            console.log(" respuesta YYY", res.data)

            if (res?.data?.status) {

              handleChangeControlReload();
              AlertSave({ title: '', message: `Se ha realizado la operación correctamente.` })
            } else {
              AlertError({ title: '', message: 'Algo salió mal' })
            }

            //  
          }).catch(err => {
            // Handle error
            setLoading(false)
            console.log("error", err);
          });



        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }

    const onClickSolicitarEliminarPE = (id_pedido_extraordinario: string,
      codigo_sucursal: string,
      sufijo_sucursal: string,
      estado: string) => {

      console.log("pasando parametros ", id_pedido_extraordinario, codigo_sucursal, sufijo_sucursal, estado)
      Swal.fire({
        icon: 'error',
        title: '¿Estás seguro?',
        text: 'Se solicitará la eliminación del pedido extraordinario.',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',

      }).then((result) => {

        if (result.isConfirmed) {


          setLoading(true);
          AplicationConnect.post<any>(`/pedido_extraordinario/cambiar-estado-pe`, {
            "id_pedido_extraordinario": id_pedido_extraordinario,
            "codigo_sucursal": codigo_sucursal,
            "sufijo_sucursal": sufijo_sucursal,
            "estado": estado

          }).then((res: any) => {
            setLoading(false)
            console.log(" respuesta YYY", res.data)
            handleChangeControlReload();
            if (res?.data?.status) {
              AlertSave({ title: '', message: `Se ha realizado la operación correctamente.` })
            } else {
              AlertError({ title: '', message: 'Algo salió mal' })
            }

            //  
          }).catch(err => {
            // Handle error
            setLoading(false)
            console.log("error", err);
          });



        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }

    const onClickAprobarPESupervisor = (id_pedido_extraordinario: string,
      codigo_sucursal: string,
      sufijo_sucursal: string,
      estado: string) => {

      console.log("pasando parametros ", id_pedido_extraordinario, codigo_sucursal, sufijo_sucursal, estado)
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se envia aprobación del supervisor del pedido extraordinario',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',

      }).then((result) => {

        if (result.isConfirmed) {


          setLoading(true);
          AplicationConnect.post<any>(`/pedido_extraordinario/cambiar-estado-pe`, {
            "id_pedido_extraordinario": id_pedido_extraordinario,
            "codigo_sucursal": codigo_sucursal,
            "sufijo_sucursal": sufijo_sucursal,
            "estado": estado

          }).then((res: any) => {
            setLoading(false)
            console.log(" respuesta YYY", res.data)
            handleChangeControlReload();
            if (res?.data?.status) {
              AlertSave({ title: '', message: `Se ha realizado la operación correctamente.` })
            } else {
              AlertError({ title: '', message: 'Algo salió mal' })
            }

            //  
          }).catch(err => {
            // Handle error
            setLoading(false)
            console.log("error", err);
          });



        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }

    //botonoes 


    //  var btn_accept_eli:any  = null;
    const [btn_delete, setbtn_delete] = useState<any>(null);
    const [btn_accept_eli, setbtn_accept_eli] = useState<any>(null);
    var [btn_reject_eli, setbtn_reject_eli] = useState<any>(null);
    var [btn_accept_sup, setbtn_accept_sup] = useState<any>(null);
    var [btn_accept_pla, setbtn_accept_pla] = useState<any>(null);
    var [icon_aceptado, seticon_aceptado] = useState<any>(null);


    useEffect(() => {
      //logia de para los botones 
      var estado_pedido = row.ESTADO;

      


      switch (estado_pedido) {
        case 1:
          setbtn_delete(  <CardActionArea sx={{
            padding: '0', margin: '0', width: '25px',
          }}
          

          onClick={() => onClickSolicitarEliminarPE(row.ID_PEDIDO_EXTRAORDINARIO,
            codigoSucursal, sufijoSucursal,"3")}
           >

            <DisabledByDefaultIcon titleAccess="Solicitar eliminación de pedido extraordinario" sx={{ color: 'black' }} />

          </CardActionArea>)
          
          //<Button class="btn btn-danger-black btn-xs" codigo_sucursal="13" sufijo_sucursal="AE" iden="34" onclick="onClickSolicitarEliminarPE(this)" title="Solicitar eliminación de pedido extraordinario">Soli elimina</Button>);
          setbtn_accept_eli(null);
          setbtn_reject_eli(null);
          setbtn_accept_sup(
            <CardActionArea sx={{
              padding: '0', margin: '0', width: '25px',
            }}
              onClick={() => onClickAprobarPESupervisor(row.ID_PEDIDO_EXTRAORDINARIO,
                codigoSucursal, sufijoSucursal,"4")}>
              <CheckCircleIcon titleAccess="Solicitar aprobación del pedido extraordinario" sx={{ color: '#00B000' }} />

            </CardActionArea>)
          //<Button  class="btn btn-success btn-xs" codigo_sucursal="13" sufijo_sucursal="AE" iden="34" onclick="onClickAprobarPESupervisor(this)" title="Solicitar aprobación del pedido extraordinario">Soli Apro</Button>);
          setbtn_accept_pla(null);
          seticon_aceptado(null);

          break;
        case 2:
          setbtn_delete(null);
          setbtn_accept_eli(null);
          setbtn_reject_eli(null)
          setbtn_accept_sup(null)
          setbtn_accept_pla(null)
          seticon_aceptado(null)
          break;
        case 3:

          // console.log("entre aqui ")
          setbtn_delete(null);
          //setbtn_accept_eli(<Button variant="contained">Contained</Button>)

          setbtn_accept_eli(
            <CardActionArea sx={{
              padding: '0', margin: '0', width: '25px',
            }}
              onClick={() => onClickAprobarEliminarPE(row.ID_PEDIDO_EXTRAORDINARIO,
                codigoSucursal, sufijoSucursal, "2")}
            >  <RecommendIcon titleAccess="Aprobar eliminar pedido extraordinario" sx={{ color: '#00B000' }} />
            </CardActionArea>)

          // orgina la arriba <Button  class="btn btn-success btn-xs" codigo_sucursal="13" sufijo_sucursal="AE" iden="34" onclick="onClickAprobarEliminarPE(this)" title="Aprobar eliminar pedido extraordinario">Eliminar Ped</Button>);
          setbtn_reject_eli(
            <CardActionArea sx={{
              padding: '0', margin: '0', width: '25px',
            }}
            onClick={() => onClickRechazarEliminarPE(row.ID_PEDIDO_EXTRAORDINARIO,
              codigoSucursal, sufijoSucursal, "1")}
            >
              <ThumbDownAltIcon titleAccess="Rechazar eliminar pedido extraordinario" sx={{ color: 'red' }} />

            </CardActionArea>)

          //origna abajo(<Button  class="btn btn-danger btn-xs" codigo_sucursal="13" sufijo_sucursal="AE" iden="34" onclick="onClickRechazarEliminarPE(this)" title="Rechazar eliminar pedido extraordinario">Rechazar Ped</Button>)
          setbtn_accept_sup(null)
          //$btn_accept_pla='<Button  class="btn btn-info btn-xs" codigo_sucursal="'.$sucursal_seleccionado.'" sufijo_sucursal="'.$sufijo_sucursal.'" iden="'.$id_pedido_extraordinario.'" onclick="onClickAprobarPEPlanta(this)" title="Aprobar pedido extraordinario"><i class="las la-check-double"></i></Button>';
          setbtn_accept_pla(null)
          seticon_aceptado(null)

          //   console.log("btn 3 ",btn_accept_eli,row)
          break;
        case 4:
          setbtn_delete(null);
          setbtn_accept_eli(null);
          setbtn_reject_eli(null)
          setbtn_accept_sup(null)
          setbtn_accept_pla(<Button class="btn btn-info btn-xs" codigo_sucursal="12" sufijo_sucursal="AE" iden="34" onclick="onClickAprobarPEPlanta(this)" title="Aprobar pedido extraordinario">Aprobar Pedi</Button>);
          seticon_aceptado(null)
          //  # code...
          break;
        case 5:
          setbtn_delete(null);
          setbtn_accept_eli(null);
          setbtn_reject_eli(null)
          setbtn_accept_sup(null)
          setbtn_accept_pla(null)
          seticon_aceptado(<i class="las la-check-square"></i>)
          break;
        default:
          //# code...
          break;
      }

      if (!btn_eliminar) {
        setbtn_delete(null);
      }
      if (!btn_aceptar_eli) {
        setbtn_accept_eli(null);
      }
      if (!btn_rechazar_eli) {
        setbtn_reject_eli(null)
      }
      if (!btn_aceptar_sup) {
        setbtn_accept_sup(null) //aqui
      }
      if (!btn_aceptar_pla) {
        setbtn_accept_pla(null)
      }

      //console.log("****************************************************++")
      //console.log("btn 3 eli", btn_accept_eli, row)
      //var btns = btn_accept_eli + btn_reject_eli + btn_accept_sup + btn_accept_pla + icon_aceptado + btn_delete;

      //console.log("btn 3 row ", btns, estado_pedido)
      //setBotonesRender(btns)
    }, []);


    return (
      <React.Fragment>
        <TableRow >
          <TableCell
            sx={{
              //padding: "0px 0px",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              // fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              //paddingLeft: '10px',
              padding: '0px', margin: '0px',
              //  borderBottom: "1px solid white",
              //fontSize: "12px"
              // fontSize: "0.9rem",
              //padding:'1%',
              wordBreak: 'normal',
              paddingLeft: '10px',
            }}
            align="left"
          >
            {/*row.grupo*/}

            {/*row.ID_PEDIDO_EXTRAORDINARIO*/}
            {nombreSucursal}





          </TableCell>
          <TableCell
            sx={{
              // padding: "0px 0px",
              paddingLeft: '10px',
              // fontWeight: 'bold',
              //   borderBottom: "1px solid white",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak: 'normal',
              //  cs how to do so that words are not cut
              // borderBottom: "1px solid #A7A7A7",
              //backgroundColor: "#C8E6C9",
              "&:active": { backgroundColor: "blue" }
            }}
            align="left"
            onClick={tableCellClickHandler}
          >
            {row.CATEGORIA}
          </TableCell>
          <TableCell
            sx={{
              //padding: "0px 0px",

              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              //fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              wordBreak: 'normal',
              //borderBottom: "1px solid white",
              fontSize: "12px"
              // fontSize: "1.1rem"
            }}
            align="left"
          >
            {row.SUBCATEGORIA1}
          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              paddingLeft: '10px',
              //backgroundColor: "#C8E6C9",
              wordBreak: 'normal',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
            }}

            onClick={tableCellClickHandler}
            align="left"
          >
            {row.SUBCATEGORIA2}


          </TableCell>

          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              paddingLeft: '10px',
            }}

            onClick={tableCellClickHandler}
            align="left"
          >
            {row.DETALLE}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              // backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
            }}

            //onClick={tableCellClickHandler}
            align="left"
          >
            {
              row.MODIFICADO == 1 ?
                "SI" : "NO"
            }


          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
            }}

            //onClick={tableCellClickHandler}
            align="left"
          >
            {formatDateString(row.FECHA_ENTREGA_PEDIDO)}


          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
            }}

            //onClick={tableCellClickHandler}
            align="left"
          >


            <div style={{ display: 'flex' }}>
              {btn_accept_eli}
              {btn_reject_eli} {
                btn_accept_sup} {btn_accept_pla}  {icon_aceptado} {btn_delete}
            </div>

            {/* <div dangerouslySetInnerHTML={{ __html: typeof botonesRender === 'string'
  ?  botonesRender
  : botonesRender }}/>*/}


            {/*<Button onClick={() => console.log("botones render ", botonesRender)}>test info</Button>
           <DeleteIcon sx={{
               backgroundColor: '#DC3545', color: 'white', fontSize: '2.6rem',
               padding: '10px',
             }}

               onClick={() => deleteByIndex(index)}
             />*/}

          </TableCell>
        </TableRow>
      </React.Fragment>

    );





  }

  return (
    <div>

      <TableContainer
        onClick={() => {
          //console.log("Detected Table Container Click");
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

        {/*<Button onClick={() => {
          console.log("estados  llegando actulizados ",
            btn_eliminar,
            btn_aceptar_eli,
            btn_rechazar_eli,
            btn_aceptar_sup,
            btn_aceptar_pla)




        }}> test data bontes</Button>*/}
        <Table sx={{ tableLayout: "auto", minWidth: '1000px' }}>

          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}

          />

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: any) => {
                //const isItemSelected = isSelected(row.id);
                //const labelId = `enhanced-table-checkbox-${index}`;


                return (
                  <>
                    <Row key={index} row={row} />
                  </>
                );


              })}




          </TableBody>


          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: rows.length }]}
                colSpan={12}
                //colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={"Filas por página"}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Filas por página',
                  },
                  native: true,
                }}

                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}

              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <br />
      {loading ? <KDImage
      /> : null}
    </div>
  );
}
