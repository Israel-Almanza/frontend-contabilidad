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
//import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Controller, useForm } from "react-hook-form";
import TableSortLabel from '@mui/material/TableSortLabel';


const tableStyling = {
    //padding: "0px 0px",
    backgroundColor: '#F2F2F2',
    padding: '0.8%',
    //fontSize: '11px',
    borderRight: "1px solid #A7A7A7",
    borderBottom: "1px solid #A7A7A7",
    fontWeight: 'bold',
    wordBreak: 'normal',
    minWidth: 100,



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
        <TableHead sx={{
            position: 'sticky',
            top: '0px', zIndex: 50
        }}>
            <TableRow style={{

            }}>

                {columns?.map((headCell: any, index: any) => (
                    <TableCell
                        key={index}
                        align={"left"}

                        sx={{
                            ...tableStyling //, //width: '100px'
                            , borderLeft: "1px solid white",
                        }}
                        // padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.column_name ? order : false
                        }
                    >
                        <TableSortLabel
                            active={orderBy === headCell.column_name}
                            direction={orderBy === headCell.column_name ? order : "asc"}
                            onClick={createSortHandler(headCell.column_name)}


                        >
                            {headCell.column_name}

                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    columns: PropTypes.any,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


export default function TablaRepUsuarioSucursal(props: any) {

    //console.log("rec prodiedad ", props.lista)
    const { tableData, deleteByIndex, control, comlunaDemo }: any = props;
    console.log("tableData ", tableData)
    console.log("columnas ", comlunaDemo)

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
            /*const resultado = comlunaDemo.filter((animal: any) => (
              animal != 'ID_SUB_CATEGORIA_2' && animal != 'COLOR'
            ));*/
            // console.log("aaa", resultado);

            //setColumn(resultado)
            setColumn(comlunaDemo)
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

    const InputNumberFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
        //console.log("entre al metodo 1")


        return (


            <Controller
                name={nameRegister}
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (

                    <TextField id="outlined-basic"
                        sx={{ backgroundColor: 'white', display: "block" }}
                        //label="Outlined"
                        size="small"
                        type="number"
                        disabled={isDisable}

                        InputProps={{ inputProps: { min: 0, step: 0.25 } }}
                        /* InputProps={{
                           readOnly: isDisable,
                         }}*/
                        // variant="filled"
                        variant="outlined"
                        inputProps={{
                            style: {
                                margin: '0.4px', padding: '2px'
                            },
                        }}

                        value={value}
                        onChange={onChange}

                        //onBlur={testData}
                        error={!!error}
                        helperText={error ? error.message : null}



                    />

                )}



                rules={{
                    required: isRequired,
                    // validate: () => Number(getValues(nameRegister)) % 0.25 == 0
                }}
            />

        )
    }

    const CheckBoxCustom = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
        return (
            <Controller
                name={nameRegister}
                control={control}
                render={({ field: props }: any) => (
                    <Checkbox
                        {...props}
                        //checked={props.value}

                        sx={{ padding: 0, margin: 0, position: 'relative' }}
                        size="small"
                        //onClick={() => AlertSave({ title: '', message: 'Se ha actualizado correctamente' })}
                        checked={!!props.value}
                        onChange={(e: any) =>
                            props.onChange(e.target.checked)
                        }
                    />
                )}
            />
        )
    }
    //end code delete
    return (
        <div style={{ width: '100%' }}>

            <TableContainer
                onClick={() => {
                    // console.log("Detected Table Container Click");
                }}
                component={Paper}
                sx={{
                    // border: "4px solid rgba(0,0,0,0.2)",
                    //padding: 1,
                    // height: '420px',
                    width: "100%",

                    maxHeight: '80vh',
                    margin: '0px', padding: '0px', marginTop: '5px'

                    //   width: "max-content"
                    //backgroundColor: "blue"
                }}
            >
                <Table sx={{
                    tableLayout: "auto"//, minWidth: '1000px' 
                }}
                    stickyHeader
                >

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

                                //console.log("row ",row)
                                return (<TableRow key={index}>
                                    {
                                        column?.map((v: any, indexDimanic: number) => {

                                            //console.log("vvv ", v.column_name, row)

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

                                                    {row[v.column_name]}

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
