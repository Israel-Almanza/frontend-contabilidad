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
import RecommendIcon from '@mui/icons-material/Recommend';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
//import FaPeopleCarryBox  from "react-icons/fa";
//import  FaPeopleCarryBox  from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';






import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { ModalTable } from "./components/ModalTable";
import DangerousIcon from '@mui/icons-material/Dangerous';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import Swal from "sweetalert2";

/*interface Cell {
  cellIndex: number;
}*/

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
            active={orderBy === "FECHA"}
            direction={orderBy === "FECHA" ? order : 'asc'}
            onClick={createSortHandler("FECHA")}
          >
            Fecha
            {orderBy === "FECHA" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '3%', minWidth: '60px', borderLeft: "1px solid white" }} align="left">
          Operación
          <TableSortLabel
            active={orderBy === "ENVIO"}
            direction={orderBy === "ENVIO" ? order : 'asc'}
            onClick={createSortHandler("ENVIO")}
          >
            {/*headCell.label*/}
            {orderBy === "ENVIO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '7%' }} align="left">
          Sucursal
          <TableSortLabel
            active={orderBy === "AREA_PRODUCCION"}
            direction={orderBy === "AREA_PRODUCCION" ? order : 'asc'}
            onClick={createSortHandler("AREA_PRODUCCION")}
          >
            {/*headCell.label*/}
            {orderBy === "AREA_PRODUCCION" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '3%', minWidth: '60px', borderLeft: "1px solid white" }} align="left">
          Estado
          <TableSortLabel
            active={orderBy === "ENVIO"}
            direction={orderBy === "ENVIO" ? order : 'asc'}
            onClick={createSortHandler("ENVIO")}
          >
            {/*headCell.label*/}
            {orderBy === "ENVIO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '2%' }} align="left">
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


export default function TablaTransferenciaProductos(props: any) {

  //console.log("rec prodiedad ", props.lista)
  const { tableData, deleteByIndex }: any = props;


  //const [rows, setrows] = useState([])

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  /*metodo para odernar y ayudas */
  //new metods for odeser and ogusbtuib

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const [rows, setRows] = React.useState([]);

  //end codigo exitoso
  React.useEffect(() => {
    //console.log("data ...", tableData)
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: any) => {
    //setDense(event.target.checked);
  };

  const isSelected = (value: any) => selected.indexOf(value) !== -1;

  const [modalData, setModalData] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  // end codigo exitiso


  // end new code Pagina and ordder

  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };




  const formatDateString = (FECHA_ENTREGA_PEDIDO: string) => {

    //console.log(FECHA_ENTREGA_PEDIDO.substring(8, 10));
    var res = ""
    if (FECHA_ENTREGA_PEDIDO) {
      var year = FECHA_ENTREGA_PEDIDO.substring(0, 4);
      var day = FECHA_ENTREGA_PEDIDO.substring(5, 7);
      var month = FECHA_ENTREGA_PEDIDO.substring(8, 10)

      res = month + '/' + day + '/' + year
      //26/04/2023
      //const str = 'Mozilla';


      return res
    } else {
      res
    }

  }



  const [DETALLE, setDETALLE] = useState('')
  const [envio, setEnvio] = useState('')
  const pasarParametroDetalle = (row: any) => {
    const { DETALLE, ENVIO } = row;

    setEnvio(ENVIO == 1 ? "Enviado" : "Recibido")
    setDETALLE(DETALLE)
    handleOpenModal()

  }


  function Row(props: any) {
    const { row } = props;



    const handleChangeEstadoTransferencia = async (textDinamic: string) => {

      try {

        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: textDinamic,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',

        })

        console.log("ressssssss", result)


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
              paddingLeft: '10px',
              wordBreak: 'normal'
            }}
            align="left"
          >
            {/*row.grupo*/}

            {formatDateString(row.FECHA)}




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
              // borderBottom: "1px solid #A7A7A7",
              //backgroundColor: "#C8E6C9",
              "&:active": { backgroundColor: "blue" }
            }}
            align="left"
            onClick={tableCellClickHandler}
          >
            {(row.ENVIO == 0) ? "Recibido"
              :
              (row.ENVIO == 1 ? "Enviado"
                :
                (row.ENVIO == 2 ? "En Camino"
                  :
                  (row.ENVIO == 3 ? "Rechazado" : null)))
            }

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
            align="left"
          >
            {row.AREA_PRODUCCION}

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
              // borderBottom: "1px solid #A7A7A7",
              //backgroundColor: "#C8E6C9",
              "&:active": { backgroundColor: "blue" }
            }}
            align="left"
            onClick={tableCellClickHandler}
          >
            {(row.ESTADO_SUCURSAL == 4) ? "Transferido"
              :
              (row.ESTADO_SUCURSAL == 3 ? "En Camino"
                :
                (row.ESTADO_SUCURSAL == 1 ? "Aceptado"
                  :
                  null))
            }
            {/* {row.ESTADO_SUCURSAL == 4 ?
            <>
            <FaPeopleCarryBox/>
            </>
          :null} */}
          {/* {row.ESTADO_SUCURSAL == 3 ?
            <>
            <NoCrashIcon/>
            </>
          :null} */}

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
            {/*<DeleteIcon sx={{
                        backgroundColor: '#DC3545', color: 'white', fontSize: '2.6rem',
                        padding: '10px',
                      }}

                        onClick={() => deleteByIndex(index)}
                      />*/}

            <div style={{
              width: '100%', display: 'flex', margin: '0px', padding: '0px',
              justifyContent: 'space-around', alignItems: 'center'
            }}>
              <CardActionArea sx={{
                padding: '0', margin: '0', marginTop: '3px', width: '12px',
              }}

                onClick={() => pasarParametroDetalle(row)}


              >
                <RemoveRedEyeIcon
                  titleAccess='Ver Detalle'
                  sx={{
                    backgroundColor: '#005592', color: 'white', fontSize: '1.6rem', padding: '2px'
                  }} />
              </CardActionArea>
              {(row.ID_DOCUMENTO_INVENTARIO_DETALLE == 3 || row.ID_DOCUMENTO_INVENTARIO_DETALLE == 1)? 
              <>
              <OfflinePinIcon
                onClick={() =>  handleChangeEstadoTransferencia('Aceptar Transferencia')}
                titleAccess='Recibiendo si esta todo bien'
                sx={{
                  color: '#048404', fontSize: '1.8rem'
                }}
              />
              {/* <DangerousIcon
                onClick={() => handleChangeEstadoTransferencia('Rechazar Transferencia')}
                titleAccess='Rechazando si esta mal el producto'
                sx={{
                  color: '#E12129 ', fontSize: '1.8rem'
                }}
              />
              <NoCrashIcon
              onClick={() =>  handleChangeEstadoTransferencia('Aceptar Transferencia')}
                titleAccess='En Camino'
                sx={{
                  fontSize: '1.8rem'
                }}
              /> */}
              </>
              :null}
            </div>

          </TableCell>
        </TableRow>
      </React.Fragment>

    );
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
        <Table sx={{
          tableLayout: "auto",
          //minWidth: '1000px'
        }}>

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
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <Row key={index} row={row} />
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
      <br />
      <ModalTable


        DETALLE={DETALLE}
        envio={envio}
        openModalPersonalized={openModal}
        handleOpenModalPersonalized={handleOpenModal}
        handleCloseModalPersonalized={handleCloseModal}
        title="Ver Detalle"

      />

    </div>
  );
}
