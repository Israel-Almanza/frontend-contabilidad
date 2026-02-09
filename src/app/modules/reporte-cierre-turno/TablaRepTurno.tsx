import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, TextField, Collapse, Typography, CardContent, CardActionArea } from "@mui/material";
import { useHookQuery } from "./components/useHookQuery";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import axios from "axios";
import './stylestablaRepTurno.css'
import PrintIcon from '@mui/icons-material/Print';
import { useCierreTurnoServices } from "./services/useCierreTurnoServices";
import { KDImage } from "../../../core/modal-loading/KDImage";


const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  fontSize: '10px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  //borderRight: "2px solid black",



};



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import fileDownload from 'js-file-download';
import { visuallyHidden } from '@mui/utils';



export default function TablaRepTurno(props: any) {
  const { rows }: any = props;
  const {loadApiReportePrint} = useCierreTurnoServices()

  const [loading, setLoading] = useState(
    false
  );
  const [DATOS, setDATOS] = useState('')

  const pasarParametros = async (row: any) => {
    const {cantidadRecibos, descuadre,fecha_apertura,fecha_cierre,hora_cierre,horario_apertura,
    impresora_local,monto_cierre,monto_inicial,monto_total_ventas_cupon_pedidos_ya,
    monto_total_ventas_efectivo,monto_total_ventas_gift_card,monto_total_ventas_no_efectivo,
    monto_total_ventas_pago_qr,monto_total_ventas_tarjeta,monto_total_ventas_transferencia_bancaria,
    rangoFacturas,saldo_teorico,sucursal,total_egresos,total_ingresos,usuario} = row;
    console.log("row ", row)
    setDATOS(row)
    //setCODIGO_CUF(CODIGO_CUF)
    //handleOpenModalTres()
    try {
      setLoading(true)
      const response = await loadApiReportePrint(
        cantidadRecibos,
        descuadre,
        fecha_apertura,
        fecha_cierre,
        hora_cierre,
        horario_apertura,
        impresora_local,
        monto_cierre,
        monto_inicial,
        monto_total_ventas_cupon_pedidos_ya,
        monto_total_ventas_efectivo,
        monto_total_ventas_gift_card,
        monto_total_ventas_no_efectivo,
        monto_total_ventas_pago_qr,
        monto_total_ventas_tarjeta,
        monto_total_ventas_transferencia_bancaria,
        rangoFacturas,
        saldo_teorico,
        sucursal,
        total_egresos,
        total_ingresos,
        usuario
      );
      //setLoading(false)
      console.log("res lista usuario tabla2 ", response)
      //setLoading(false)
      console.log("response", response)
      setLoading(false)
         //  window.open(URL.createObjectURL(response.data),'_blank', 'noreferrer');
 
         const a = document.createElement('a');
         a.href = window.URL.createObjectURL(response);
         //handleCloseModalPersonalized()
         window.open(URL.createObjectURL(response));

    } catch (error) {

    }

  }

  /*const loadFacturaComandaPDF = async () => {

    // console.log("api test", row)
 


       try {
         const response = await AplicationConnect.post<any>(`/ImprimirComanda`, {
           "sucursal": idSucursal,
           "venta": ID_VENTA
         }, { responseType: 'blob' })
         console.log("response", response.data)
         //  window.open(URL.createObjectURL(response.data),'_blank', 'noreferrer');
 
         const a = document.createElement('a');
         a.href = window.URL.createObjectURL(response.data);
         handleCloseModalPersonalized()
         window.open(URL.createObjectURL(response.data));

 
       } catch (error) {
 
       }

   }*/
   /*const loadImprimirReporteUsuario = async () => {
    //console.log("nom sucursal**** ", nomSucursal)
    try {
      //setLoading(true)
      const response = await loadApiReportePrint(
        fechaInicio,
        fechaFinal,
        nomSucursal,
        ""
      );
      //setLoading(false)
      console.log("res lista usuario tabla2 ", response)
      //setLoading(false)
      console.log("response", response)
         //  window.open(URL.createObjectURL(response.data),'_blank', 'noreferrer');
 
         const a = document.createElement('a');
         a.href = window.URL.createObjectURL(response);
         //handleCloseModalPersonalized()
         window.open(URL.createObjectURL(response));

    } catch (error) {

    }
  }*/

  const { matches600,matchesDetalle61700 ,matchesDetalle51110 ,matchesDetalle41090 ,matchesDetalle31070 , matchesDetalle1000, matchesDetalle21050, matchesTotal750,
    matchesNit700,
    matchesCliente680,
    matchesFecha1655,
    matchesFactura480,
    matchesNumero400 } = useHookQuery();
  //console.log("preops  ", rows)TableHea
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");



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


  function createData(name: any, calories: any, fat: any, carbs: any, protein: any) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }
  /*
  const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
  
  ];*/

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
    console.log("order orderBy", order, orderBy)
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array: any, comparator: any) {

    console.log("step 3 ", array, comparator)
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

  const headCells = [
    {
      id: 'nombre',
      numeric: false,
      disablePadding: true,
      label: 'N°',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'cliente',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein1',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
    {
      id: 'protein2',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
    {
      id: 'protein3',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    }
  ];

  const DEFAULT_ORDER = 'asc';
  //const rows = 'calories';
  const DEFAULT_ORDER_BY = 'horario_apertura';
  const DEFAULT_ROWS_PER_PAGE = 5;

  function EnhancedTableHead(props: any) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;

    //console.log("ordenar por ", props)
    const createSortHandler = (newOrderBy: any) => (event: any) => {
      console.log("haciendo cick 1", newOrderBy, event)
      onRequestSort(event, newOrderBy);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell sx={{ ...tableStyling, width: '7%' }}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
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


  //new metods for odeser and ogusbtuib

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);

  React.useEffect(() => {

    console.log("rowsss ", rows)
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
      //getComparator(DEFAULT_ORDER, rows),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
    //  setVisibleRows(rows);
  }, [rows]);

  const handleRequestSort = React.useCallback(

    (event: any, newOrderBy: any) => {

      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      console.log("entre aquiu...2", newOrderBy, isAsc, toggledOrder)
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);



      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));

      console.log("redorenar 4", sortedRows)
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
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

  const handleChangeDense = (event: any) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;


  const RowCollapse = () => {

  }

  function Row(props: any) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    function download(url: string, filename: string) {
      axios.get(url, {
        responseType: 'blob',
      }).then((res: any) => {
        fileDownload(res.data, filename);
      });
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
              wordBreak:'normal'
            }}
            align="center"
          >
            {/*row.usuario*/}

            <div style={{
              width: '100%', display: 'flex', margin: '0px', padding: '0px',
              justifyContent: 'space-around', alignItems: 'center'
            }}>
              {matchesDetalle61700 ?
                expanded ?
                  <RemoveCircleOutlinedIcon onClick={handleExpandClick} sx={{ color: '#D33333', fontSize: '20px' }} />
                  : < AddCircleOutlinedIcon onClick={handleExpandClick} sx={{ color: '#0275D8', fontSize: '20px' }} />
                : null}
                  {row.usuario}
              
              {/* <CardActionArea sx={{
                paddingBottom: '0', margin: '0', width: '100px',
              }} onClick={() => download("https://sistemademo.azurewebsites.net/index.php/reimprimir-factura-carta/14143", "test.pdf")}>
                
              </CardActionArea> */}
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
              wordBreak:'normal',
              // borderBottom: "1px solid #A7A7A7",
              //backgroundColor: "#C8E6C9",
              "&:active": { backgroundColor: "blue" }
            }}
            align="center"
            onClick={tableCellClickHandler}
            className='headHiddenNumero'
          >
            {row.fecha_apertura}<br/>{row.horario_apertura}
          </TableCell>
          <TableCell
            sx={{
              //padding: "0px 0px",

              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              fontWeight: 'bold',
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              wordBreak:'normal',
              //borderBottom: "1px solid white",
              fontSize: "12px"
              // fontSize: "1.1rem"
            }}
            align="center"
            className='headHiddenFactura'
          >
            {row.fecha_cierre}<br/>{row.hora_cierre}
          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal'
            }}

            onClick={tableCellClickHandler}
            align="center"
            className='headHiddenFecha'
          >
            {row.rangoFacturas}

          </TableCell>

          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              paddingLeft: '10px',
              wordBreak:'normal'
            }}

            onClick={tableCellClickHandler}
            align="center"
            className='headHiddenCliente'
          >
            {row.cantidadRecibos}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              // backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal'
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenNit'
          >
            {row.monto_inicial}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal'
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenTotal'
          >
            {row.total_ingresos}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle'
          >
            {row.total_egresos}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle3'
          >
            {row.monto_total_ventas_efectivo}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle3'
          >
            {row.monto_total_ventas_pago_qr}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle5'
          >
            {row.monto_total_ventas_tarjeta}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle5'
          >
            {row.monto_total_ventas_transferencia_bancaria}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle6'
          >
            {row.monto_total_ventas_cupon_pedidos_ya}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle6'
          >
            {row.saldo_teorico}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle6'
          >
            {row.monto_cierre}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle6'
          >
            {row.descuadre}

          </TableCell>
          <TableCell
            sx={{
              padding: "0px 0px",
              //backgroundColor: "#C8E6C9",
              paddingLeft: '10px',
              borderRight: "1px solid #A7A7A7",
              borderBottom: "1px solid #A7A7A7",
              wordBreak:'normal',
            }}

            //onClick={tableCellClickHandler}
            align="center"
            className='headHiddenDetalle6'
          >
            <PrintIcon
            //onClick={}
            />

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
                <Typography paragraph sx={{ fontWeight: 'bold' }}>Fecha/Hora Ingreso</Typography>
                &nbsp; &nbsp;
                <Typography paragraph>
                {row.fecha_apertura}<br/>{row.horario_apertura}
                </Typography>
              </Typography> : null}
            {matchesFactura480 ?
              <Typography
                component="div" style={{
                  display: 'flex', flexDirection: 'row'
                  , justifyContent: 'center'
                }}>
                <Typography paragraph sx={{ fontWeight: 'bold' }}>Fecha/Hora Salida </Typography>
                &nbsp; &nbsp;
                <Typography paragraph>
                {row.fecha_cierre}<br/>{row.hora_cierre}
                </Typography>
              </Typography>
              : null
            }
            {matchesFecha1655 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Rango de Facturas </Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.rangoFacturas}
              </Typography>
            </Typography> : null}



            {matchesCliente680 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Cantidad de Recibos</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.cantidadRecibos}
              </Typography>
            </Typography> : null}

            {matchesNit700 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Monto Inicial de Turno</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.monto_inicial}
              </Typography>
            </Typography> : null}
            {matchesTotal750 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total Ingresos</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.total_ingresos}
              </Typography>
            </Typography> : null}
            {matchesDetalle1000 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total Egresos</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.total_egresos}
              </Typography>
            </Typography> : null}
            {matchesDetalle31070 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total Ventas en Efectivo</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.monto_total_ventas_efectivo}
              </Typography>
            </Typography> : null}
            {matchesDetalle31070 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total Ventas en QR</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.monto_total_ventas_pago_qr}
              </Typography>
            </Typography> : null}
            {matchesDetalle51110 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total Venta Traj. Dep/Cred</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.monto_total_ventas_tarjeta}
              </Typography>
            </Typography> : null}
            {matchesDetalle51110 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total Venta Transferidos</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.monto_total_ventas_transferencia_bancaria}
              </Typography>
            </Typography> : null}
            {matchesDetalle61700 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Total Cupones Pedidos Ya</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.monto_total_ventas_cupon_pedidos_ya}
              </Typography>
            </Typography> : null}
            {matchesDetalle61700 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Saldo Teorico</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.saldo_teorico}
              </Typography>
            </Typography> : null}
            {matchesDetalle61700 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Dinero Entregado</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.monto_cierre}
              </Typography>
            </Typography> : null}
            {matchesDetalle61700 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Descuadre</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
              {row.descuadre}
              </Typography>
            </Typography> : null}
            {matchesDetalle61700 ? <Typography
              component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <Typography paragraph sx={{ fontWeight: 'bold' }}>Acciones</Typography>
              &nbsp; &nbsp;
              <Typography paragraph>
                <PrintIcon onClick={() => pasarParametros(row)}/>
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
            <TableRow
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
                  width: '4%',

                  // backgroundColor: "red",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Usuario
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '4%', borderLeft: "1px solid white", wordBreak:'normal' }} align="center"
                className='headHiddenNumero'
              >
                Fecha/Hora Inicial
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '4%', borderLeft: "1px solid white", wordBreak:'normal' }} align="center"
                className='headHiddenFactura'
              >
                Fecha/Hora Salida
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} align="center" className='headHiddenFecha'>
                Rango de Facturas
              </TableCell>

              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} align="center" className='headHiddenCliente'>
                Cantidad de Recibos
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenNit' align="center">
                Monto Inicial de Turno
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenTotal' align="center">
                Total Ingresos
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle' align="center">
                Total Egresos
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle3' align="center">
                Total Ventas en Efectivo
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle3' align="center">
                Total ventas en QR
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle5' align="center">
                Total Ventas tarj. Deb/Cred
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle5' align="center">
                Total Venta Tranferidas
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle6' align="center">
                Total Cupones Pedidos Ya
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle6' align="center">
                Saldo teorico
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle6' align="center">
                Dinero entregado
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle6' align="center">
                Descuadre
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', wordBreak:'normal' }} className='headHiddenDetalle6' align="center">
                Acciones
              </TableCell>

            </TableRow>
          </TableHead>
          {/* <EnhancedTableHead <PrintIcon />
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />*/}
          <TableBody>

            {visibleRows ? visibleRows?.map((row: any, index: any) => {

              const isItemSelected = isSelected(row.nombre);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <>
                  <Row key={index} row={row} />
                </>
              )
            }) : null}

          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

        {matchesDetalle21050 ? <h6>${matchesDetalle21050} soy menor o igual 1000 px </h6> : <h6>${matchesDetalle21050} no soy 1000 px</h6>}

      </div>

      {loading ? <KDImage /> : null}
    </div>
  );
}


