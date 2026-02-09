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

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


import { alpha } from '@mui/material/styles';



import TableSortLabel from '@mui/material/TableSortLabel';



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
  fontWeight: 'bold',
  wordBreak: 'normal',
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





function EnhancedTableHead(props: any) {
  const {

    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    columns,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  //console.log("custom head ", columns)

  return (
    <TableHead>
      <TableRow>

        {columns?.map((headCell: any, index: any) => (
          <TableCell
            key={index}
            align={"left"}

            sx={{ ...tableStyling, width: '100px', borderLeft: "1px solid white" }}
            // padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : "asc"}
              onClick={createSortHandler(headCell)}

            /*active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}*/
            >
              {/*headCell.label*/} {headCell}
              {/*orderBy === headCell.id ? (*/}
              {/*orderBy === headCell ? (
                <span >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null*/}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

/*
const EnhancedTableHead = (props: any) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };





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
            //console.log("Detected Cell Click");
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
       
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
            Nombre Completo
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '3%', minWidth: '60px', borderLeft: "1px solid white" }} align="left">
          Doc. Ident
          <TableSortLabel
            active={orderBy === "ci"}
            direction={orderBy === "ci" ? order : 'asc'}
            onClick={createSortHandler("ci")}
          >
      
            {orderBy === "ci" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '3%', borderLeft: "1px solid white" }} align="left">
          Celular
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
         
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '2.6%' }} align="left">
          Perfil
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
         
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '4%' }} align="left">
          Area
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >

            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
          Cargo
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
          
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '5%' }} align="left">
          Ubicaciones
          <TableSortLabel
            active={orderBy === "nombre"}
            direction={orderBy === "nombre" ? order : 'asc'}
            onClick={createSortHandler("nombre")}
          >
          
            {orderBy === "nombre" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '2%' }} align="left">
          Opcciones

        </TableCell>
      </TableRow>
    </TableHead>
  );
}*/

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  columns: PropTypes.any,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function TablaCronogramaEntrega(props: any) {

  //console.log("rec prodiedad ", props.lista)
  const { tableData, deleteByIndex, comlunaDemo }: any = props;


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

  const [column, setColumn] = useState<any>([])
  //end codigo exitoso
  React.useEffect(() => {
    //console.log("data ...", tableData, comlunaDemo)

    // get table column //
    // const column = Object.keys(tableData[0]);
    /*column.map((data)=>{
      console.log("data * ",data)
      //return <th key={data}>{data}</th>
    })*/
    //console.log("tabla colomns ", column)
    if (tableData && comlunaDemo) {

      /* const animales = ['perro', 'gato', 'oso', 'pájaro', 'hormiga'];
 
 const resultado = animales.filter(animal => animal != 'oso');
 console.log(resultado);
 
 // Resultado -> ["perro", "gato", "pájaro", "hormiga"]*/
      const resultado = comlunaDemo.filter((animal: any) => (
        animal != 'ID_INVENTARIO_CRONOGRAMA' && animal != 'COLOR'
      ));
      // console.log("aaa", resultado);

      setColumn(resultado)
      setRows(tableData)

      // setColumn(tableData?.length > 0 ? Object.keys(tableData[0]) : [])
    }
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


  // end new code Pagina and ordder

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
          // console.log("Detected Table Container Click");
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
            columns={column}
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

                return (<TableRow key={index}>
                  {
                    column.map((v: any, indexDimanic: number) => {



                      if (Array.isArray(row[v])) {
                        return (
                          <h5>is array row</h5>
                        )
                      }

                      if (v == "EN PLANTA" || v == "EN CAMINO") {

                        return (
                          <TableCell
                            key={indexDimanic}
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
                              // backgroundColor: `${row[`COLOR`]}`
                            }}
                            align="left"
                          >
                            {/*row.grupo*/}
                            {row[v] ? (row[v]).substring(0, 19) : null}





                          </TableCell>
                        )
                      }
                      if (v == "ESTADO") {

                        return (
                          <TableCell
                            key={indexDimanic}
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
                              backgroundColor: `${row[`COLOR`]}`
                            }}
                            align="left"
                          >
                            {/*row.grupo*/}

                            {row[v]}




                          </TableCell>
                        )
                      }

                      return (
                        <TableCell
                          key={indexDimanic}
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

                          {row[v]}




                        </TableCell>
                      )
                    })
                  }
                </TableRow>)

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
