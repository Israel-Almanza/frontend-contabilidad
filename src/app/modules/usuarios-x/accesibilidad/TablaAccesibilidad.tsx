import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, TextField, Typography  } from "@mui/material";
import {CardActionArea} from "@mui/material";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
//import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { BsPersonFillCheck } from "react-icons/bs";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import EditIcon from '@mui/icons-material/Edit';
import { ModalBajaUsuario } from "./components/ModalBajaUsuario";
import { ModalAltaUsuario } from "./components/ModalAltaUsuario";
import { ModalAsignarUbicacion } from "./components/ModalAsignarUbicacion";
import { ModalEditarUsuario } from "./components/ModalEditarUsuario";
import { useAccesibilidad } from "./services/useAccesibilidad";
import { ModalCambiarPerfil } from "./components/ModalCambiarPerfil";
import { KDImage } from "../../../../core/modal-loading/KDImage";


/*interface Cell {
  cellIndex: number;
}*/

const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  fontSize: '10px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
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
  return order === 'asc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

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
const DEFAULT_ORDER_BY = 'ID_USUARIO';
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
             width: '2%',

             // backgroundColor: "red",
             //  paddingLeft: '10px',
             // fontWeight: 'bold',


           }}
           align="left"
         >
           ID
           <TableSortLabel
            active={orderBy === "ID_USUARIO"}
            direction={orderBy === "ID_USUARIO" ? order : 'asc'}
            onClick={createSortHandler("ID_USUARIO")}
           >
             {/* ID */}
             {orderBy === "ID_USUARIO" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>

         <TableCell sx={{ ...tableStyling, width: '3%', minWidth: '60px', borderLeft: "1px solid white",wordBreak: 'normal' }} align="left">
           Nombre Completo
           <TableSortLabel
             active={orderBy === "NOMBRE"}
             direction={orderBy === "NOMBRE" ? order : 'asc'}
             onClick={createSortHandler("NOMBRE")}
           >
             {/*headCell.label*/}
             {orderBy === "NOMBRE" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>

         <TableCell sx={{ ...tableStyling, width: '3%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
            Doc. Ident
           <TableSortLabel
             active={orderBy === "CI"}
             direction={orderBy === "CI" ? order : 'asc'}
             onClick={createSortHandler("CI")}
           >
             {/*headCell.label*/}
             {orderBy === "CI" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>
         <TableCell sx={{ ...tableStyling, width: '3%', wordBreak: 'normal' }} align="left">
            Celular
           <TableSortLabel
             active={orderBy === "CELULAR"}
             direction={orderBy === "CELULAR" ? order : 'asc'}
             onClick={createSortHandler("CELULAR")}
           >
             {/*headCell.label*/}
             {orderBy === "CELULAR" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>
         <TableCell sx={{ ...tableStyling, width: '4%', wordBreak: 'normal' }} align="left">
            Perfil
           <TableSortLabel
             active={orderBy === "TIPO_USUARIO"}
             direction={orderBy === "TIPO_USUARIO" ? order : 'asc'}
             onClick={createSortHandler("TIPO_USUARIO")}
           >
             {/*headCell.label*/}
             {orderBy === "TIPO_USUARIO" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>
         <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal' }} align="left">
            Area
           <TableSortLabel
             active={orderBy === "AREA"}
             direction={orderBy === "AREA" ? order : 'asc'}
             onClick={createSortHandler("AREA")}
           >
             {/*headCell.label*/}
             {orderBy === "AREA" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>
         <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal' }} align="left">
              Cargo
           <TableSortLabel
             active={orderBy === "NOMBRE_CARGO"}
             direction={orderBy === "NOMBRE_CARGO" ? order : 'asc'}
             onClick={createSortHandler("NOMBRE_CARGO")}
           >
             {/*headCell.label*/}
             {orderBy === "NOMBRE_CARGO" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>
         <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal' }} align="left">
              Ubicaciones
           <TableSortLabel
             active={orderBy === "NOMBRE_CARGO"}
             direction={orderBy === "NOMBRE_CARGO" ? order : 'asc'}
             onClick={createSortHandler("NOMBRE_CARGO")}
           >
             {/*headCell.label*/}
             {orderBy === "NOMBRE_CARGO" ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
           </TableSortLabel>
         </TableCell>
         <TableCell sx={{ ...tableStyling, width: '2%', wordBreak: 'normal' }} align="left">
           Opciones

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



function createData(f0: any, f1: any, f2: any, f3: any) {
  return { f0, f1, f2, f3 };
}

const rows = [

  createData("1-Bebidas calientes con café", "Regular (Tamaño Unico)", "", "Unidad"),

];

var dataArray = [


  {
    id: 1,
    grupo: "1-Bebidas calientes con café",
    nombre: "ADOLFO MONDOCORRE GIZADA",
    numfact: "1166",
    fechayhora: "10-20-2023 13:45",
    cliente: "LORESA ISSA",
    nit: '5198586',
    pagar: '10'
  },

  {
    id: 2,
    grupo: "2-Bebidas calientes con café",
    nombre: "ADOLFO MONDOCORRE GIZADA",
    numfact: "1166",
    fechayhora: "10-20-2023 13:45",
    cliente: "LORESA ISSA",
    nit: '5198586',
    pagar: '10'
  },
  {
    id: 3,
    grupo: " ",
    nombre: "ADOLFO MONDOCORRE GIZADA",
    numfact: "1166",
    fechayhora: "10-20-2023 13:45",
    cliente: "LORESA ISSA",
    nit: '5198586',
    pagar: '10'
  }

];



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function TablaAccesibilidad(props:any) {
  const { loadApiUsuariosAccesibilidad, loadApiListaSucursales, loadApiListaPerfiles, loadApiListaCargos, loadApiListaAFP, loadApiGuardarUsuario, loadApiEditarUsuario} = useAccesibilidad()
  const { Usuarios,loadObtenerUsuarios, Lista, Perfiles, Cargos, ListaAfps,tableData } = props;
  //console.log("lista de los usuarios ",Usuarios)

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  ;
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);


  const [rows, setRows] = React.useState([]);

  /*//end codigo exitoso
  React.useEffect(() => {
    //console.log("data ...", tableData)
    if (Usuarios) setRows(Usuarios);
  }, [Usuarios]);*/
   //end codigo exitoso
   React.useEffect(() => {
    console.log("data ...", tableData)
    if (tableData) setRows(tableData);
  }, [tableData]);

  //loading
  const [loading, setLoading] = useState(
    false
  );

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");

  const [listDataSimulation, setListDataSimulation] = useState(dataArray);

  const defaultStyleTitle = true;

  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };

  //modal baja usuario
  const [openModalBajaU, setOpenModalBajaU] = useState(false);

  const handleOpenModalBajaU = () => setOpenModalBajaU(true);
  const handleCloseModalBajaU = () => setOpenModalBajaU(false);

  //modal alta usuario
  const [openModalAltaU, setOpenModalAltaU] = useState(false);

  const handleOpenModalAltaU = () => setOpenModalAltaU(true);
  const handleCloseModalAltaU = () => setOpenModalAltaU(false);

  //modal alta usuario
  const [openModalAsignar, setOpenModalAsignar] = useState(false);

  const handleOpenModalAsignar = () => setOpenModalAsignar(true);
  const handleCloseModalAsignar = () => setOpenModalAsignar(false);

  //modal editar usuario
  const [openModalEditar, setOpenModalEditar] = useState(false);

  const handleOpenModalEditar = () => setOpenModalEditar(true);
  const handleCloseModalEditar = () => setOpenModalEditar(false);

  //modal editar usuario
  const [openModalCambiar, setOpenModalCambiar] = useState(false);

  const handleOpenModalCambiar = () => setOpenModalCambiar(true);
  const handleCloseModalCambiar = () => setOpenModalCambiar(false);

  const [EMPLEADO, setEMPLEADO] = useState('')
  const [USUARIO, setUSUARIO] = useState('')
  const [NomEmpleado, setNomEmpleado] = useState('')
  const [datosEmpleado, setDatosEmpleado] = useState<any>([])


  const pasarParametros = (row: any) => {
    const { ID_EMPLEADO } = row;
    console.log("row ", row)
    setEMPLEADO(ID_EMPLEADO)
    handleOpenModalBajaU()

  }

  const pasarParametrosHabilitar = (row: any) => {
    const { ID_EMPLEADO } = row;
    console.log("row ", row)
    setEMPLEADO(ID_EMPLEADO)
    handleOpenModalAltaU()

  }

  const pasarParametrosOperacion = (row: any) => {
    const { ID_USUARIO, NOMBRE} = row;
    console.log("row ", row)
    setUSUARIO(ID_USUARIO)
    setNomEmpleado(NOMBRE)
    handleOpenModalAsignar()

  }

  const pasarParametrosEditar = async (row: any) => {
    const { ID_EMPLEADO, NOMBRE} = row;
    console.log("row ", row)
    setEMPLEADO(ID_EMPLEADO)
    setNomEmpleado(NOMBRE)
    handleOpenModalEditar()
    //EditarUsuario()
    try {
      setLoading(true)
     
      const response = await loadApiEditarUsuario(
          ID_EMPLEADO
  
      )
      console.log("res datos usuarios ", response.empleado)
      setLoading(false)
      setDatosEmpleado(response.empleado)
      
    } catch (error) {
      console.log("error api guardar:*", error)
      //setLoading(false)
    }
  }

  const pasarParametrosCambiar = (row: any) => {
    const { ID_USUARIO} = row;
    console.log("row ", row)
    setUSUARIO(ID_USUARIO)
    handleOpenModalCambiar()

  }

 

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "desc";
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

  const isSelected = (value: any) => selected.indexOf(value) !== -1;

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
  const handleDelete = (id: any) => {
    // console.log("id a eliminar ", id)
    //econtrar a add
    for (var i = 0; i < dataArray.length; i++) {
      if (id == dataArray[i].id) {
        console.log("find id y estoy en la poscion ", id)

        // const index = dataArray.indexOf(i);
        var arrayAux = [...listDataSimulation]
        setListDataSimulation(arrayAux.splice(i, 1))
        //console.log("aaa", dataArray.splice(i, 1));
        // delete dataArray[i];
      }
    }
    console.log("array data ", listDataSimulation)

  }
  /*
  const myArray = [1, 2, 3, 4, 5];
  
  const index = myArray.indexOf(2);
  
  const x = myArray.splice(index, 1);
  */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
        <Table sx={{ tableLayout: "auto", minWidth: '750px' }}>
        <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}

          />
          <TableHead onClick={tableHeaderClickHandler} style={{
            //  borderTopColor: 'black',
            //  borderTopStyle: 'double'

          }}>
            {/* <TableRow
              onClick={() => {
                console.log("Detected Row Click");
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
              <TableCell sx={{ ...tableStyling, width: '2%', borderLeft: "1px solid white" }} align="left">
                ID
              </TableCell>
              <TableCell
                onClick={() => {
                  console.log("Detected Cell Click");
                }}
                sx={{
                  ...tableStyling,
                  width: '7%',
                  wordBreak: 'normal'
                  // backgroundColor: "red",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Nombre Completo
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Doc. Ident
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '3%', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
                Celular
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '4%', wordBreak: 'normal' }} align="left">
                Perfil
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal' }} align="left">
                Area
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%', wordBreak: 'normal' }} align="left">
                Cargo
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%', wordBreak: 'normal' }} align="left">
                Ubicaciones
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '2%', wordBreak: 'normal' }} align="left">
                Opcciones
              </TableCell>

            </TableRow> */}
          </TableHead>
          <TableBody>
            {/* {Usuarios?.map((row:any, index:any) => ( */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: any) => {
                const isItemSelected = isSelected(row.ID_USUARIO);
                const labelId = `enhanced-table-checkbox-${index}`;
                return(
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
                    verticalAlign: 'top'

                  }}
                  align="left"
                >
                  


                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '13px', fontFamily: 'Times New Roman'
                  }} >
                    {row.ID_USUARIO}
                  </Typography>

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
                    wordBreak: 'normal',
                    //  borderBottom: "1px solid white",
                    //fontSize: "12px"
                    // fontSize: "0.9rem",
                    //padding:'1%',
                    paddingLeft: '10px',
                    verticalAlign: 'top'
                  }}
                  align="left"
                >
                  {/*row.grupo*/}



                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '12px', fontFamily: 'Times New Roman'
                  }} >
                    {row.NOMBRE}
                  </Typography>





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
                    verticalAlign: 'top'
                    // borderBottom: "1px solid #A7A7A7",
                    //backgroundColor: "#C8E6C9",
                    //"&:active": { backgroundColor: "blue" }
                  }}
                  align="left"
                  //onClick={tableCellClickHandler}
                >
                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '12px', fontFamily: 'Times New Roman'
                    }} >
                    {row.CI}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    //backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    verticalAlign: 'top',
                    wordBreak: 'normal'
                    //borderBottom: "1px solid white",
                    //fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >

                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '12px', fontFamily: 'Times New Roman'
                  }} >
                    {row.CELULAR}
                  </Typography>

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    //backgroundColor: "#C8E6C9",
                    borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    wordBreak: 'normal',
                    paddingLeft: '10px',
                    verticalAlign: 'top'
                  }}

                  //onClick={tableCellClickHandler}
                  align="left"
                >
                  {/*row.fechayhora*/}
                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '12px', fontFamily: 'Times New Roman'
                    }} >
                    {row.TIPO_USUARIO}
                  </Typography>

                </TableCell>

                <TableCell
                  sx={{
                    padding: "0px 0px",
                    //backgroundColor: "#C8E6C9",
                    borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    paddingLeft: '10px',
                    verticalAlign: 'top',
                    wordBreak: 'normal'
                  }}

                  //onClick={tableCellClickHandler}
                  align="left"
                >
                  {/*row.cliente*/}

                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '12px',fontFamily: 'Times New Roman'
                  }} >
                    {row.AREA}
                  </Typography>

                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    // backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    verticalAlign: 'top',
                    wordBreak: 'normal'
                  }}

                  //onClick={tableCellClickHandler}
                  align="left"
                >
                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '12px',fontFamily: 'Times New Roman'
                    }} >
                    {row.NOMBRE_CARGO}
                  </Typography>
                  
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 0px",
                    //backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    verticalAlign: 'top',
                    wordBreak: 'normal'
                  }}

                  //onClick={tableCellClickHandler}
                  align="left"
                >
                  <Typography variant="subtitle1" gutterBottom sx={{

                    color: 'black', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', fontSize: '12px',fontFamily: 'Times New Roman'
                    }} >
                    {row.SUCURSALES?.map((rowS:any) => (
                      <>
                      {rowS.DESCRIPCION}<br/>
                      </>
                    ))}
                  </Typography>
                  
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
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {row.ID_STATUS == 1?
                <>
                    <Button onClick={() => pasarParametros(row)}><PersonRemoveIcon sx={{ backgroundColor: '#DC3545', color: 'white', fontSize: '2.4rem', padding: '10px', margin: '2px' }} /></Button>
                    <Button onClick={() => pasarParametrosEditar(row)}><EditIcon sx={{ backgroundColor: '#FF8F00', color: 'white', fontSize: '2.4rem', padding: '10px', margin: '2px' }} /></Button>
                    <Button onClick={() => pasarParametrosOperacion(row)}><StoreMallDirectoryIcon sx={{ backgroundColor: '#17A2B8', color: 'white', fontSize: '2.4rem', padding: '10px', margin: '2px' }} /></Button>
                    <Button onClick={() => pasarParametrosCambiar(row)}><ManageAccountsIcon sx={{ backgroundColor: '#28A743', color: 'white', fontSize: '2.4rem', padding: '10px', margin: '2px' }} /></Button>
                </>
                    :<>
                    {row.ID_STATUS == 4?
                      <>
                        <Button onClick={() => pasarParametrosHabilitar(row)} sx={{ backgroundColor: '#28A743', color: 'white', fontSize: '1.2rem', padding: '5px', margin: '1px' }}><BsPersonFillCheck /></Button>
                      </>
                      :null}
                    </>}
                  </div>


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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>


      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          This is a {infoText} column.
        </Alert>
      </Snackbar>

      <ModalBajaUsuario EMPLEADO={EMPLEADO}
                        loadObtenerUsuarios={loadObtenerUsuarios}
        openModalBajaUsuario={openModalBajaU}
        handleOpenModalBajaUsuario={handleOpenModalBajaU}
        handleCloseModalBajaUsuario={handleCloseModalBajaU}
        />

      <ModalAltaUsuario EMPLEADO={EMPLEADO}
                        loadObtenerUsuarios={loadObtenerUsuarios}
        openModalAltaUsuario={openModalAltaU}
        handleOpenModalAltaUsuario={handleOpenModalAltaU}
        handleCloseModalAltaUsuario={handleCloseModalAltaU}
        />

        <ModalAsignarUbicacion
        loadObtenerUsuarios={loadObtenerUsuarios}
        Lista={Lista}
        USUARIO={USUARIO}
        NomEmpleado={NomEmpleado}
        openModalAsignar={openModalAsignar}
        handleOpenModalAsignar={handleOpenModalAsignar}
        handleCloseModalAsignar={handleCloseModalAsignar}
        />

        <ModalEditarUsuario
        loadObtenerUsuarios={loadObtenerUsuarios}
        datosEmpleado={datosEmpleado}
        Lista={Lista}
        Perfiles={Perfiles}
        Cargos={Cargos}
        ListaAfps={ListaAfps}
        USUARIO={USUARIO}
        EMPLEADO={EMPLEADO}
        NomEmpleado={NomEmpleado}
        openModalEditar={openModalEditar}
        handleOpenModalEditar={handleOpenModalEditar}
        handleCloseModalEditar={handleCloseModalEditar}
        />

        <ModalCambiarPerfil 
        Perfiles={Perfiles}
        loadObtenerUsuarios={loadObtenerUsuarios}
        USUARIO={USUARIO}
        openModalCambiar={openModalCambiar}
        handleOpenModalCambiar={handleOpenModalCambiar}
        handleCloseModalCambiar={handleCloseModalCambiar}
        />
{loading ? <KDImage /> : null}
    </div>

  
  );
}
