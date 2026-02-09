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
import { Box, Button, Checkbox, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { withStyles } from "@mui/material/styles";
import { createStyles } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';


const tableStyling = {
  padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  paddingLeft: '4px',
  // padding: '0.8%',
  //fontSize: '11px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  fontWeight: 'bold'
  //borderRight: "2px solid black",



};

const stickyStyling = {
  position: "sticky",
  left: 0,
  backgroundColor: 'white',
  boxShadow: "5px 2px 5px orange",
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
}

const stickyStylingHead = {
  position: "sticky",
  left: 0,
  backgroundColor: '#F2F2F2',
  boxShadow: "5px 2px 5px orange",
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
}

const stickyStyling2 = {
  position: "sticky",
  left: 95,
  backgroundColor: '#F2F2F2',
  borderRight: "1px solid #A7A7A7",
  //background: "white",
  boxShadow: "5px 2px 5px grey",
 // zIndex: 118,
}

const stickyStyling3 = {
  position: "sticky",
  left: 198,
  backgroundColor: '#F2F2F2',
  borderRight: "1px solid #A7A7A7",
  //background: "white",
  boxShadow: "5px 2px 5px grey",
 // zIndex: 242,
}



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
const DEFAULT_ORDER_BY = 'cliente';
const DEFAULT_ROWS_PER_PAGE = 5;

const EnhancedTableHead = (props: any) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };



  //id: 'categoria' | 'subcategoria' | 'producto' | 'tipoproducto' | 'pando' | 'salamanca' | 'americaoeste' | 'hupermall' | 'lincoln' | 'jordan' | 'americaeste';
  return (
    <TableHead style={{
        //borderTopColor: 'black',
        //borderTopStyle: 'double'

    }}>
      <TableRow sx={{
         // backgroundColor: "#BCEAFD",
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
            ...stickyStylingHead,
            width: '3%',

            // backgroundColor: "red",
            //  paddingLeft: '5px',
            // fontWeight: 'bold',


          }}
          align="left"
        >
          {/* Nombre Completo*/}
          <TableSortLabel
            active={orderBy === "categoria"}
            direction={orderBy === "categoria" ? order : 'asc'}
            onClick={createSortHandler("categoria")}
          >
            Categoria
            {orderBy === "categoria" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>


        <TableCell sx={{
          ...tableStyling, ...stickyStyling2,
          width: '2.6%', minWidth: '60px', borderLeft: "1px solid white"
        }} align="left">
          Subcategoria
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

        <TableCell sx={{ ...tableStyling, ...stickyStyling3, width: '3%', borderLeft: "1px solid white" }} align="left">
          Producto
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
        <TableCell sx={{ ...tableStyling, width: '4.7%' }} align="left">
          Tipo de producto
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
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          Pando
          <TableSortLabel
            active={orderBy === "pando"}
            direction={orderBy === "pando" ? order : 'asc'}
            onClick={createSortHandler("pando")}
          >
            {/*headCell.label*/}
            {orderBy === "pando" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '3.5%' }} align="left">
          Salamanca
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
        <TableCell sx={{ ...tableStyling, width: '3.9%' }} align="left">
          America Oeste
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
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          Hupermall
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
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          lincoln
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
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          Jordan
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
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          America este
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
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          Mega Center
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
        
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          Total
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
        <TableCell sx={{ ...tableStyling, width: '3.2%' }} align="left">
          Vencimiento
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


export default function TablaPedidosConsolidados(props: any) {

  //console.log("rec prodiedad ", props.lista)
  const { tableData, deleteByIndex }: any = props;
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

  const [rows, setRows] = React.useState([]);

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

  // end codigo exitiso



  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };



  /*if(rows.length<=0){
    return (
      <h1>Loading</h1>
    )
  }*/
  //code delete 

  //end code delete
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
          margin: '0px', padding: '0px', marginTop: '5px',
          // maxWidth: 400,

          //   width: "max-content"
          //backgroundColor: "blue"
        }}
      >
        <Table sx={{
          tableLayout: "auto",
          minWidth: '1500px'
          // maxWidth: '1000px' 
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
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...stickyStyling,
                       // padding: "0px 0px",
                       //borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                        // fontWeight: 'bold',
                        //backgroundColor: "#C8E6C9",
                        //paddingLeft: '10px',
                        //padding: '0px', margin: '0px',
                        //  borderBottom: "1px solid white",
                        //fontSize: "12px"
                        // fontSize: "0.9rem",
                        //padding:'1%',
                        paddingLeft: '5px',



                      }}
                      align="left"
                    >
                      {row.CATEGORIA}






                    </TableCell>
                    <TableCell
                      sx={{
                       // padding: "0px 0px",
                       ...stickyStyling2,
                        paddingLeft: '5px',
                        // fontWeight: 'bold',
                        //   borderBottom: "1px solid white",
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "2px solid #A7A7A7",
                        // borderBottom: "1px solid #A7A7A7",
                        //backgroundColor: "#C8E6C9",
                        
                        position: "sticky",
                        //left: 96,
                       // zIndex: 200,
                        background: "white",
                        boxShadow: "1px 1px 1px 1px black",
                        //"&:active": { backgroundColor: "blue" }
                      }}
                      align="left"
                      onClick={tableCellClickHandler}
                    >
                      {row.SUB_CATEGORIA_1}
                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        ...stickyStyling3,
                        borderRight: "2px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                        // fontWeight: 'bold',
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        //borderBottom: "1px solid white",
                        fontSize: "12px",
                        // fontSize: "1.1rem"

                        position: "sticky",
                        left: 198,
                        //zIndex: 200,
                        background: "white",
                        boxShadow: "1px 1px 1px 1px black",
                        wordBreak:'normal'
                 
                      }}
                      align="left"
                    >
                      {row.SUB_CATEGORIA_2}
                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        borderLeft: "1px solid #A7A7A7",
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      onClick={tableCellClickHandler}
                      align="left"
                    >
                      {/*row.fechayhora*/}


                    </TableCell>

                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                        paddingLeft: '5px',
                      }}

                      onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.pando}

                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        // backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.salamanca}
                    </TableCell>
                    <TableCell
                      sx={{
                       // padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.aoeste}
                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.hupermall}
                    </TableCell>
                    <TableCell
                      sx={{
                       // padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.lincoln}
                    </TableCell>
                    <TableCell
                      sx={{
                       // padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.jordan}
                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.aeste}
                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.center}
                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.total}
                    </TableCell>
                    <TableCell
                      sx={{
                        //padding: "0px 0px",
                        //backgroundColor: "#C8E6C9",
                        paddingLeft: '5px',
                        borderRight: "1px solid #A7A7A7",
                        borderBottom: "1px solid #A7A7A7",
                      }}

                      //onClick={tableCellClickHandler}
                      align="left"
                    >
                      {row.fecha_vencimiento}
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
    </div>
  );
}
