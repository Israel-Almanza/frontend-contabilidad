import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { ModalActivarLlave } from "./components/ModalActivar";
import { ModalDesactivarLlave } from "./components/ModalDesactivar";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { AlertSave } from "../../../common/alerts/alerts";
import { Controller, useForm } from "react-hook-form";
import { alpha } from '@mui/material/styles';
import { ImEye } from "react-icons/im";
import { ModalMostrarToken } from "./components/ModalToken";
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import { useLlave } from "./services/useLlave";
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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));

const ColorButtonGreen = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#28A745',
  '&:hover': {
    backgroundColor: '#1B8332',
  },
}));




function TablePaginationActions(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, addtest } = props;

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


const DEFAULT_ORDER = 'asc';
//const rows = 'calories';
const DEFAULT_ORDER_BY = 'ID_VENTAS_LLAVE';
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
            width: '5%',
            borderLeft: "1px solid white"
            // backgroundColor: "red",
            //  paddingLeft: '10px',
            // fontWeight: 'bold',


          }}
          align="left"
        >
          {/* Nombre Completo*/}
          <TableSortLabel
            active={orderBy === "id"}
            direction={orderBy === "id" ? order : 'asc'}
            onClick={createSortHandler("id")}
          >
            Id
            {orderBy === "id" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          onClick={() => {
            console.log("Detected Cell Click");
          }}
          sx={{
            ...tableStyling,
            width: '30%',
            borderLeft: "1px solid white"
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
            Token API
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '20%', minWidth: '60px', borderLeft: "1px solid white" }} align="left">
          Fecha Activacion
          <TableSortLabel
            active={orderBy === "ci"}
            direction={orderBy === "ci" ? order : 'asc'}
            onClick={createSortHandler("ci")}
          >
            {/*headCell.label*/}
            {orderBy === "ci" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '20%', borderLeft: "1px solid white" }} align="left">
          Fecha Vencimiento
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
            {/*headCell.label*/}
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '15%', borderLeft: "1px solid white" }} align="left">
          Estado
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
            {/*headCell.label*/}
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white" }} align="left">
          Opciones
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
            {/*headCell.label*/}
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
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


export default function TablaLlave(props: any) {
  const {loadApiBuscarToken} = useLlave()
  const { tableData, deleteByIndex, loadObtenerListaLlaves }: any = props;
  const { formState, handleSubmit, control, register, getValues, setValue, unregister } = useForm();
//<---modal
const [openModalToken, setOpenModalToken] = useState(false);

const handleOpenModalToken = () => setOpenModalToken(true);
const handleCloseModalToken = () => setOpenModalToken(false);
//modal--->

  //console.log("rec prodiedad ", props.lista)
 

  //const [rows, setrows] = useState([])


  /*metodo para odernar y ayudas */
  //new metods for odeser and ogusbtuib

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  //const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const [rows, setRows] = React.useState<any>([]);

  //end codigo exitoso
  React.useEffect(() => {
    console.log("data ...", tableData)
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

  const handleOpen = (row: any) => {
    setOpen(true);
    setModalData(row);
  };

  const handleClose = () => {
    setOpen(false);
    setModalData(null);
    setSelected([]);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };
 
   //modal activar
   const [openModalEstadoA, setOpenModalEstadoA] = useState(false);
   const handleOpenModalEstadoA = () => setOpenModalEstadoA(true);
   const handleCloseModalEstadoA = () => setOpenModalEstadoA(false);

   //modal desactivar
   const [openModalEstadoDes, setOpenModalEstadoDes] = useState(false);
   const handleOpenModalEstadoDes = () => setOpenModalEstadoDes(true);
   const handleCloseModalEstadoDes = () => setOpenModalEstadoDes(false);

   //loading
  const [loading, setLoading] = useState(
    false
  );

  const [Token, setToken] = useState({});
  const [Id_Llave, setId_Llave] = useState('');
 
   const pasarParametrosToken = async (row: any) => {
    const { TOKEN_API, ID_VENTAS_LLAVE } = row;
    console.log("row ", row)
    //setToken(TOKEN_API)
    handleOpenModalToken()
    try {
      setLoading(true)
      const response = await loadApiBuscarToken(ID_VENTAS_LLAVE)
      setLoading(false)
      console.log("lista llaves ", response)
      
      if(response?.status && response?.llave){
        setToken(response.llave)
      }
      
    } catch (error) {
  
    }

  }

  const pasarParametrosA = (row: any) => {
    const { ID_VENTAS_LLAVE } = row;
    console.log("row ", row)
    setId_Llave(ID_VENTAS_LLAVE)
    handleOpenModalEstadoA()

  }

  const pasarParametrosDes = (row: any) => {
    const { ID_VENTAS_LLAVE } = row;
    console.log("row ", row)
    setId_Llave(ID_VENTAS_LLAVE)
    handleOpenModalEstadoDes()

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
              .map((row:any, index:any) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow key={index}>
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
                      }}
                      align="left"
                    >
                      {row.ID_VENTAS_LLAVE}
                    </TableCell>
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
                      }}
                      align="left"
                    >
                      {row.TOKEN_API}
                    </TableCell>
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
                      }}
                      align="left"
                    >
                      {row.FECHA_ACTIVACION}
                    </TableCell>
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
                      }}
                      align="left"
                    >
                      {row.FECHA_VENCIMIENTO}
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
                        //"&:active": { backgroundColor: "blue" }
                      }}
                      align="left"
                      //onClick={tableCellClickHandler}
                    >
                       {row.ESTADO == 1 ?
                        <>
                          <ColorButtonGreen variant="contained" sx={{ marginTop: '0px' }} 
                          onClick={() => pasarParametrosDes(row)}
                          >HABILITADO</ColorButtonGreen>
                        </>
                        :
                        <>
                          <ColorButton variant="contained" sx={{ marginTop: '0px' }}
                            onClick={() => pasarParametrosA(row)}
                          >INABILITADO</ColorButton>
                    </>} 
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
                      align="left"
                    >
                      <Button sx={{ fontSize: 20,color: '#42A5F5' }} onClick={()=>pasarParametrosToken(row)}><ImEye/></Button>
                      {/* <Button sx={{ fontSize: 20,color: '#42A5F5' }} onClick={handleOpenModal}><ImEye/></Button> */}
                    </TableCell>
                  </TableRow>
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
      
      <ModalMostrarToken
        openModalToken={openModalToken}
        handleOpenModalToken={handleOpenModalToken}
        handleCloseModalToken={handleCloseModalToken}
        Token={Token}
      />

      <ModalActivarLlave
        openModalEstadoA={openModalEstadoA}
        handleOpenModalEstadoA={handleOpenModalEstadoA}
        handleCloseModalEstadoA={handleCloseModalEstadoA}
        Id_Llave={Id_Llave}
        loadObtenerListaLlaves={loadObtenerListaLlaves}
        />

        <ModalDesactivarLlave
        openModalEstadoDes={openModalEstadoDes}
        handleOpenModalEstadoDes={handleOpenModalEstadoDes}
        handleCloseModalEstadoDes={handleCloseModalEstadoDes}
        Id_Llave={Id_Llave}
        loadObtenerListaLlaves={loadObtenerListaLlaves}
        />
        {loading ? <KDImage /> : null}
    </div>
  );
}
