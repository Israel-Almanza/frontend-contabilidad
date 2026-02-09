import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, TextField, Collapse, Typography, CardContent, CardActionArea } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RecommendIcon from '@mui/icons-material/Recommend';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useHookQuery } from "./components/useHookQuery";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { useParams } from "react-router-dom";
import { ModalPersonalized } from './components/ModalPersonalized';
import { ModalAnulacionRecibo } from "./components/ModalAnulacionRecibo";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { ModalForm } from './components/ModalForm';
import './stylestablaVenta.css'
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
//importaciones tablas
import TableFooter from '@mui/material/TableFooter';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { visuallyHidden } from '@mui/utils';
import AplicationConnect from "../../../core/api/AplicationConnect";

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  fontSize: '10px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  //borderRight: "2px solid black",



};
//tabla paginacion y ordenar
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

const DEFAULT_ORDER = 'desc';
//const rows = 'calories';
const DEFAULT_ORDER_BY = 'NUMERO_FACTURADO';
const DEFAULT_ROWS_PER_PAGE = 5;

const EnhancedTableHead = (props: any) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
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
            width: '7%',

            // backgroundColor: "red",
            //  paddingLeft: '10px',
            // fontWeight: 'bold',


          }}
          align="left"
        >
          {/* Nombre Completo*/}
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
            Accion
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '3%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center" className='headHiddenNumero'>
          N°
          <TableSortLabel
            active={orderBy === "FACTURADO"}
            direction={orderBy === "FACTURADO" ? order : 'asc'}
            onClick={createSortHandler("FACTURADO")}
          >
            {/*headCell.label*/}
            {orderBy === "FACTURADO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '6%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="center"
          className='headHiddenFactura'>
          N° de Factura
          <TableSortLabel
            active={orderBy === "NUMERO_FACTURADO"}
            direction={orderBy === "NUMERO_FACTURADO" ? order : 'asc'}
            onClick={createSortHandler("NUMERO_FACTURADO")}
          >
            {/*headCell.label*/}
            {orderBy === "NUMERO_FACTURADO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '8%', wordBreak: 'normal' }} align="center" className='headHiddenFecha'>
          Fecha y Hora
          <TableSortLabel
            active={orderBy === "FECHA"}
            direction={orderBy === "FECHA" ? order : 'asc'}
            onClick={createSortHandler("FECHA")}
          >
            {/*headCell.label*/}
            {orderBy === "FECHA" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '9%', wordBreak: 'normal' }} align="center" className='headHiddenCliente'>
          Cliente
          <TableSortLabel
            active={orderBy === "CLIENTE"}
            direction={orderBy === "CLIENTE" ? order : 'asc'}
            onClick={createSortHandler("CLIENTE")}
          >
            {/*headCell.label*/}
            {orderBy === "CLIENTE" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '7%', wordBreak: 'normal' }} className='headHiddenNit' align="center">
          Nit
          <TableSortLabel
            active={orderBy === "NRO_DOCUMENTO"}
            direction={orderBy === "NRO_DOCUMENTO" ? order : 'asc'}
            onClick={createSortHandler("NRO_DOCUMENTO")}
          >
            {/*headCell.label*/}
            {orderBy === "NRO_DOCUMENTO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '7%', wordBreak: 'normal' }} className='headHiddenTotal' align="center">
          Total a Pagar
          <TableSortLabel
            active={orderBy === "TOTAL_A_PAGAR"}
            direction={orderBy === "TOTAL_A_PAGAR" ? order : 'asc'}
            onClick={createSortHandler("TOTAL_A_PAGAR")}
          >
            {/*headCell.label*/}
            {orderBy === "TOTAL_A_PAGAR" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal' }} className='headHiddenDetalle' align="center">
          Detalle

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



export default function TablaVenta(props: any) {
  //const { rows }: any = props;
  const { idSucursal } = useParams()
  //<---modal
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //four
  const [openModalCuatro, setOpenModalCuatro] = useState(false);
  const handleOpenModalCuatro = () => setOpenModalCuatro(true);
  const handleCloseModalCuatro = () => setOpenModalCuatro(false);
  //modal--->
  console.log("use paramas en tabla Venta ", idSucursal)

  const { tableData, deleteByIndex, listBotones, listaVenta, fechaInicio  }: any = props;
  //console.log("tabla venta ", listBotones)

  const [rows, setRows] = React.useState([]);

  //end codigo exitoso
  React.useEffect(() => {
    //console.log("data ...", tableData)
    if (tableData) setRows(tableData);
  }, [tableData]);

  const { matches600, matchesDetalle1000, matchesTotal750,
    matchesNit700,
    matchesCliente680,
    matchesFecha1655,
    matchesFactura480,
    matchesNumero400 } = useHookQuery();
  //console.log("preops  ", rows)TableHea


  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };


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
    //console.log("order orderBy", order, orderBy)
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


  //new metods for odeser and ogusbtuib

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);




  const handleRequestSort = React.useCallback(

    (event: any, newOrderBy: any) => {

      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      console.log("entre aquiu...2", newOrderBy, isAsc, toggledOrder)
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);






      //setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage],
  );

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.nombre);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = React.useCallback(
    (event: any, newPage: any) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: any) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy],
  );


  const isSelected = (name: any) => selected.indexOf(name) !== -1;


  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const [ID_VENTA, setID_VENTA] = useState('')
  const [CODIGO_CUF, setCODIGO_CUF] = useState('')
  const [DETALLE, setDETALLE] = useState('')

  const handleOpenModalTres = () => setOpenModalTres(true);
  const handleCloseModalTres = () => setOpenModalTres(false);

  const pasarParametros = (row: any) => {
    const { VENTA, CODIGO_CUF } = row;
    console.log("row ", row)
    setID_VENTA(VENTA)
    setCODIGO_CUF(CODIGO_CUF)
    handleOpenModalTres()

  }

  const pasarParametroDetalle = (row: any) => {
    const { VENTA, DETALLE } = row;
    console.log("para modal detalle ", row)
    setID_VENTA(VENTA)
    setDETALLE(DETALLE)
    handleOpenModal()

  }

  const pasarParametroRecibo = (row: any) => {
    const { VENTA } = row;
    console.log("para modal recibo ", row)
    setID_VENTA(VENTA)
    handleOpenModalCuatro()

  }



  function Row(props: any) {
    const { row } = props;

    const valorInicialExpanded = () => {
      var expanded_local: any = localStorage.getItem("expanded_local");
      console.log("expanded local value ", expanded_local)
      if (expanded_local && expanded_local != undefined && expanded_local != null) {
        var expanded_local_aux = JSON.parse(expanded_local)
        return expanded_local_aux;
      } else {
        return false
      }


    }



    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
      localStorage.setItem("expanded_local", (!expanded).toString());
      setExpanded(!expanded);
    };



    //hace llamadas a las apis 

    const loadFacturaCartaPDF = async (row: any) => {

      console.log("api test", row)
      const { VENTA } = row;
      if (!VENTA)
        return


      try {
        const response = await AplicationConnect.post<any>(`/FacturaCartaPDF`, {
          "sucursal": idSucursal,
          "venta": VENTA
        }, { responseType: 'blob' })
        console.log("response", response.data)
        //  window.open(URL.createObjectURL(response.data),'_blank', 'noreferrer');

        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(response.data);

        window.open(URL.createObjectURL(response.data));


      } catch (error) {

      }

    }

    const loadFacturaRolloPDF = async (row: any) => {

      console.log("api test", row)
      const { VENTA } = row;
      if (!VENTA)
        return


      try {
        const response = await AplicationConnect.post<any>(`/FacturaRolloPDF`, {
          "sucursal": idSucursal,
          "venta": VENTA
        }, { responseType: 'blob' })
        console.log("response", response.data)
        //  window.open(URL.createObjectURL(response.data),'_blank', 'noreferrer');

        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(response.data);

        window.open(URL.createObjectURL(response.data));


      } catch (error) {

      }

    }


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
            }}
            align="center"
          >
            {/*row.grupo*/}

            <div style={{
              width: '100%', display: 'flex', margin: '0px', padding: '0px',
              justifyContent: 'space-around', alignItems: 'center'
            }}>

              {matchesDetalle1000 ?
                expanded ?
                  <RemoveCircleOutlinedIcon onClick={handleExpandClick} sx={{ color: '#D33333', fontSize: '20px' }} />
                  : < AddCircleOutlinedIcon onClick={handleExpandClick} sx={{ color: '#0275D8', fontSize: '20px' }} />
                : null}

              {/*readQr()*/}


              {listBotones ? listBotones?.map((rowBtn: any, index: any) => {
                if(row.FACTURADO == 1 ){
              if (row.ANULADO == 0){
                if (rowBtn.REFERENCIA_BOTON == "anular-factura") {

                  return (
                    <CardActionArea
                      sx={{
                        padding: '0', margin: '0', marginTop: '3px', width: '42px',
                      }} onClick={() => pasarParametros(row)}
                    >


                      <ClearRoundedIcon
                        titleAccess={rowBtn.TITLE}
                        sx={{ backgroundColor: '#DC3545', color: 'white', fontSize: '2.3rem', padding: '10px' }}
                      />
                    </CardActionArea>
                  )
                }

                if (rowBtn.REFERENCIA_BOTON == "imprimir-copia" ) {

                  return (
                    <CardActionArea sx={{
                      padding: '0', margin: '0', marginTop: '3px', width: '42px',
                    }}

                      onClick={() => loadFacturaRolloPDF(row)}
                    // onClick={() => window.open('https://sistemademo.azurewebsites.net/index.php/reimprimir-factura-carta/14447', '_blank', 'noreferrer')}
                    >
                      <FileCopyRoundedIcon
                        titleAccess={rowBtn.TITLE}
                        sx={{ backgroundColor: '#28A745', color: 'white', fontSize: '2.3rem', padding: '10px' }}

                      />

                    </CardActionArea>
                  )
                }

                if (rowBtn.REFERENCIA_BOTON == "imprimir-original") {

                  return (
                    <CardActionArea sx={{
                      padding: '0', margin: '0', marginTop: '3px', width: '42px',
                    }}

                      onClick={() => loadFacturaCartaPDF(row)}
                    //onClick={() => window.open('https://sistemageneral.azurewebsites.net/index.php/reimprimir-factura-carta/14451', '_blank', 'noreferrer')}
                    >

                      <RecommendIcon
                        titleAccess={rowBtn.TITLE}
                        sx={{
                          backgroundColor: '#17A2B8', color: 'white', fontSize: '2.3rem', padding: '10px'
                        }} />
                    </CardActionArea>
                  )
                }


                // if (rowBtn.REFERENCIA_BOTON == "ver-siat"  ) {

                //   return (
                //     <RemoveRedEyeIcon
                //       titleAccess='ver-siat'
                //       sx={{
                //         backgroundColor: '#005592', color: 'white', fontSize: '2.3rem', padding: '10px'
                //       }} onClick={() => window.open(row.URL_FACTURA)}/>
                //   )
                // }
                if (rowBtn.REFERENCIA_BOTON == "cambiar-precio" ) {

                  return (
                    <CardActionArea sx={{
                      padding: '0', margin: '0', marginTop: '3px', width: '42px',
                    }} 
                    //onClick={() => window.open('https://siat.impuestos.gob.bo/consulta/QR?nit=174496020&cuf=BF083376931EFFAE55C4D4D2CB100FF0EB85E3EA565F49E54547FD74&numero=12993&t=1', '_blank', 'noreferrer')}
                    >
                      <AddTaskIcon 
                      titleAccess='cambiar precio'
                      sx={{
                        backgroundColor: '#FFC107', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} />
                    </CardActionArea>
                  )
                }
              }
            }else{
              if (rowBtn.REFERENCIA_BOTON == "anular-factura" && row.ANULADO == 0) {

                return (
                  <CardActionArea
                    sx={{
                      padding: '0', margin: '0', marginTop: '3px', width: '42px',
                    }} onClick={() => pasarParametroRecibo(row)}
                  >


                    <ClearRoundedIcon
                      titleAccess='Anular Recibo'
                      sx={{ backgroundColor: '#FFC107', color: 'white', fontSize: '2.3rem', padding: '10px' }}
                    />
                  </CardActionArea>
                )
              }
              if (rowBtn.REFERENCIA_BOTON == "imprimir-copia" && row.ANULADO == 0) {

                return (
                  <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                  }}

                    onClick={() => loadFacturaRolloPDF(row)}
                  // onClick={() => window.open('https://sistemademo.azurewebsites.net/index.php/reimprimir-factura-carta/14447', '_blank', 'noreferrer')}
                  >
                    <FileCopyRoundedIcon
                      titleAccess={rowBtn.TITLE}
                      sx={{ backgroundColor: '#28A745', color: 'white', fontSize: '2.3rem', padding: '10px' }}

                    />

                  </CardActionArea>
                )
              }
              
            }

              }) : null}

              {(row.FACTURADO == 1) ?
              <>
              {(row.ANULADO==0) ?
                <>

                  <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                  }} onClick={() => pasarParametroDetalle(row)}

                  >
                    <RemoveRedEyeIcon
                      titleAccess='Ver Detalle'
                      sx={{
                        backgroundColor: '#E53935', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} />
                  </CardActionArea>
                  <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                  }} 

                  >
                    <RemoveRedEyeIcon
                      titleAccess='Ver Factura en el SIAT'
                      sx={{
                        backgroundColor: '#005592', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} onClick={() => window.open(row.URL_FACTURA)}/>
                  </CardActionArea>

                </> : <>
                <Button sx={{backgroundColor: '#17A2B8', color :'white', fontFamily: 'Times New Roman'}}>Anulado</Button>

                <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                  }} onClick={() => window.open(row.URL_FACTURA)}

                  >
                    <RemoveRedEyeIcon
                      titleAccess='Ver Detalle'
                      sx={{
                        backgroundColor: '#17A2B8', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} />
                  </CardActionArea>
                </>}
              </>:
              <>
              {(row.ANULADO==0) ?
                <>

                  <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                  }} onClick={() => pasarParametroDetalle(row)}

                  >
                    <RemoveRedEyeIcon
                        titleAccess='Ver Detalle'
                      sx={{
                        backgroundColor: '#E53935', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} />
                  </CardActionArea>


                </> : <>
                <Button sx={{backgroundColor: '#17A2B8', color :'white', fontFamily: 'Times New Roman'}}>Anulado</Button>
                </>}
              </>
              }
              {/* {(row.ANULADO==0) ?
                <>

                  <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                  }} onClick={() => pasarParametroDetalle(row)}

                  >
                    <RemoveRedEyeIcon

                      sx={{
                        backgroundColor: '#E53935', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} />
                  </CardActionArea>


                </> : <>
                <Button sx={{backgroundColor: '#17A2B8', color :'white', fontFamily: 'Times New Roman'}}>Anulado</Button>

                <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                  }} onClick={() => window.open(row.URL_FACTURA)}

                  >
                    <RemoveRedEyeIcon

                      sx={{
                        backgroundColor: '#17A2B8', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} />
                  </CardActionArea>
                </>} */}

              {/* <CardActionArea sx={{
                    padding: '0', margin: '0', marginTop: '3px', width: '42px',
                   }} onClick={()=>pasarParametroDetalle(row)}
                //onClick={() => window.open('https://siat.impuestos.gob.bo/consulta/QR?nit=174496020&cuf=BF083376931EFFAE55C4D4D2CB100FF0EB85E3EA565F49E54547FD74&numero=12993&t=1', '_blank', 'noreferrer')}
                    >
                      <RemoveRedEyeIcon sx={{
                        backgroundColor: '#E53935', color: 'white', fontSize: '2.3rem', padding: '10px'
                      }} />
                    </CardActionArea>  */}

            </div>
          </TableCell>
          <TableCell
            sx={{
              // padding: "0px 0px",
              paddingLeft: '10px',
              // fontWeight: 'bold',
              //   borderBottom: "1px solid white",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              // borderBottom: "1px solid #A7A7A7",
              //backgroundColor: "#C8E6C9",
              "&:active": { backgroundColor: "blue" }
            }}
            align="center"
            onClick={tableCellClickHandler}
            className='headHiddenNumero'
          >
            {row.NUMERO_VENTA_DIA}
          </TableCell>
          <TableCell
            sx={{
              //padding: "0px 0px",

              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              //borderBottom: "1px solid white",
              fontSize: "12px"
              // fontSize: "1.1rem"
            }}
            align="center"
            className='headHiddenFactura'
          >
            {row.NUMERO_FACTURADO}
          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak: 'normal'
            }}

            onClick={tableCellClickHandler}
            align="center"
            className='headHiddenFecha'
          >
            {row.FECHA}

          </TableCell>

          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              paddingLeft: '10px',
              wordBreak: 'normal'
            }}

            onClick={tableCellClickHandler}
            align="center"
            className='headHiddenCliente'
          >
            {row.CLIENTE}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              // backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak: 'normal'
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenNit'
          >
            {row.NRO_DOCUMENTO}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak: 'normal'
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenTotal'
          >
            {row.TOTAL_A_PAGAR}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak: 'normal'
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle'
          >
            {row.TIPO_VENTA}

          </TableCell>
        </TableRow>
        <Collapse in={expanded} timeout="auto" >
          <CardContent sx={{ display: 'flex:', flexDirection: 'column', justifyContent: 'center' }} >


            {matchesNumero400 ?
              <Typography
                component="div" style={{
                  display: 'flex', flexDirection: 'row'
                  , justifyContent: 'center'
                }}>
                <Typography paragraph sx={{ fontWeight: 'bold' }}>N°</Typography>
                &nbsp;
                <Typography paragraph>
                  {row.NUMERO_VENTA_DIA}
                </Typography>
              </Typography> : null}
            {matchesFactura480 ?
              <Typography
                component="div" style={{
                  display: 'flex', flexDirection: 'row'
                  , justifyContent: 'center'
                }}>
                <Typography paragraph sx={{ fontWeight: 'bold' }}>Nº de Factura </Typography>
                &nbsp;
                <Typography paragraph>
                  {row.NUMERO_FACTURADO}
                </Typography>
              </Typography>
              : null
            }
            {matchesFecha1655 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Fecha y Hora </Typography>
              &nbsp;
              <Typography paragraph>
                {row.FECHA}
              </Typography>
            </Typography> : null}



            {matchesCliente680 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Cliente</Typography>
              &nbsp;
              <Typography paragraph>
                {row.CLIENTE}
              </Typography>
            </Typography> : null}

            {matchesNit700 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>NIT</Typography>
              &nbsp;
              <Typography paragraph>
                {row.NRO_DOCUMENTO}
              </Typography>
            </Typography> : null}
            {matchesTotal750 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total a pagar</Typography>
              &nbsp;
              <Typography paragraph>
                {row.TOTAL_A_PAGAR}
              </Typography>
            </Typography> : null}
            {matchesDetalle1000 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Detalle</Typography>
              &nbsp;
              <Typography paragraph>
                {row.TIPO_VENTA}
              </Typography>
            </Typography> : null}

          </CardContent>
        </Collapse>

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
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead //onClick={tableHeaderClickHandler} 
            style={{
              //  borderTopColor: 'black',
              //  borderTopStyle: 'double'

            }}>
            {/* <TableRow
              onClick={() => {
                //console.log("Detected Row Click");
              }}
              sx={{
                //  backgroundColor: "#BCEAFD",
                //borderBottom: "2px solid black",

                "& th": {
                  fontSize: "12px",
                  //fontSize: "0.8rem",
                  //  height: "5px",
                  // color: "black",
                  //  borderBottom: "1px solid white",

                }
              }}
            >
              <TableCell
                onClick={() => {
                  //console.log("Detected Cell Click");
                }}
                sx={{
                  ...tableStyling,
                  width: '10%',

                  // backgroundColor: "red",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Accion
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', borderLeft: "1px solid white" }} align="center"
                className='headHiddenNumero'
              >
                N°
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', borderLeft: "1px solid white" }} align="center"
                className='headHiddenFactura'
              >
                N° de Factura
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '8%' }} align="center" className='headHiddenFecha'>
                Fecha y Hora
              </TableCell>

              <TableCell sx={{ ...tableStyling, width: '9%' }} align="center" className='headHiddenCliente'>
                Cliente
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '7%' }} className='headHiddenNit' align="center">
                Nit
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%' }} className='headHiddenTotal' align="center">
                Total a Pagar
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '7%' }} className='headHiddenDetalle' align="center">
                Detalle
              </TableCell>

            </TableRow> */}
          </TableHead>

          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}

          />

          <TableBody>

            {/* {visibleRows ? visibleRows?.map((row: any, index: any) => {

              const isItemSelected = isSelected(row.nombre);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <>
                  <Row key={index} row={row} />
                </>
              )
            }) : null} */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row: any, index: any) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

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

      <ModalForm

        ID_VENTA={ID_VENTA}
        CODIGO_CUF={CODIGO_CUF}
        listaVenta={listaVenta}
        fechaInicio={fechaInicio}
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        description="Deseas cerrar y guardar el formulario?"
      />

      <ModalPersonalized Datos={tableData}
        ID_VENTA={ID_VENTA}
        DETALLE={DETALLE}
        openModalPersonalized={openModal}
        handleOpenModalPersonalized={handleOpenModal}
        handleCloseModalPersonalized={handleCloseModal}
        description="Detalle de la Compra"
      />

      <ModalAnulacionRecibo
        ID_VENTA={ID_VENTA}
        openModalPersonalized={openModalCuatro}
        handleOpenModalPersonalized={handleOpenModalCuatro}
        handleCloseModalPersonalized={handleCloseModalCuatro}
      />
      <br />
      {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

        {matches600 ? <h6>${matches600} soy menor o igual 600 px </h6> : <h6>${matches600} no soy 600 px</h6>}

      </div> */}


    </div>
  );
}


