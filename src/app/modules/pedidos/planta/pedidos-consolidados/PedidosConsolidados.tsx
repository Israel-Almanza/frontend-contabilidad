import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, Grid, TextField } from '@mui/material'
import React, { useState ,useEffect} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BiSearchAlt } from "react-icons/bi";
import { ModalBuscarPedidosConsolidados } from './components/ModalPersonalized2';
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import SearchBar from '@mkyy/mui-search-bar';
import TablaPedidosConsolidados from './TablaPedidosConsolidados';
import { IoKeyOutline } from "react-icons/io5";
import { ModalAccesos } from './components/ModalAccesos';
import dataConsolidadosJson from '../../../../../data/pedidos/planta/dataConsolidadosJson.json'
import { usePedidosConsolidados } from './services/usePedidosConsolidados';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { getDayFormat, getMonthFormat, getStringFechaInicial } from '../../../../../core/utils/DateFormat';
import jsPDF from "jspdf";
import "jspdf-autotable";
import XLSX from "xlsx";
import FileSaver from "file-saver";

import { printCustomPDF } from '../../../../../core/utils/ManagerPdf';
import { exportToCustomCSV } from '../../../../../core/utils/ManagerExcel';


//<----columnas de la tabla
interface Column {
  id: 'categoria' | 'subcategoria' | 'producto' | 'tipoproducto' | 'pando' | 'salamanca' | 'americaoeste' | 'hupermall' | 'lincoln' | 'jordan' | 'americaeste';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'categoria', label: 'Categoria', minWidth: 70 },
  { id: 'subcategoria', label: 'SubCategoria', minWidth: 70 },
  {
    id: 'producto',
    label: 'Producto',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'tipoproducto', label: 'Tipo de Producto', minWidth: 70 },
  { id: 'pando', label: 'Pando', minWidth: 70 },
  { id: 'salamanca', label: 'Salamanca', minWidth: 70 },
  { id: 'americaoeste', label: 'America Oeste', minWidth: 70 },
  { id: 'hupermall', label: 'Hupermall', minWidth: 70 },
  { id: 'lincoln', label: 'Lincoln', minWidth: 70 },
  { id: 'jordan', label: 'Jordan', minWidth: 70 },
  { id: 'americaeste', label: 'America Este', minWidth: 70 },
];

const genders = [
  {
    value: 'PERECEDERO',
    label: 'PERECEDERO',
  },
  {
    value: 'NO PERECEDERO',
    label: 'NO PERECEDERO',
  },
  {
    value: 'ALL',
    label: 'TODOS',
  },

];

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#008000'),
  backgroundColor: '#008000',
  '&:hover': {
      backgroundColor: '#0A680A',
  },
}));

const PedidosConsolidados = () => {

  const {loadApiSucursalesEstado,loadApiListarPedidosConsolidados} = usePedidosConsolidados();

  //<---modal
  const [openModalBuscar, setOpenModalBuscar] = useState(false);

  const handleOpenModalBuscar = () => setOpenModalBuscar(true);
  const handleCloseModalBuscar = () => setOpenModalBuscar(false);
 
   const [openModalAcceso, setOpenModalAcceso] = useState(false);

   const handleOpenModalAcceso = () => setOpenModalAcceso(true);
   const handleCloseModalAcceso = () => setOpenModalAcceso(false);
   //modal--->


  const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
    setGender(event.target.value);
  };

  const [SucursalesEstado, setSucursalesEstado] = useState<any>([])
  const [originalRows, setoriginalRows] = useState<any>([])


  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const [FechaCentral, setFechaCentral] = useState<string>("");

  //loading
const [loading, setLoading] = useState(
  false
);

  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);
    const filteredRows = originalRows.filter((row: any) => {
      return row.categoria.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };

  const updateTextTablaConsolidados = async (ListaConsolidados: any,fecha:string) => {

    console.log("updateTextTablaConsolidados ", ListaConsolidados)
    setRows(ListaConsolidados);
    console.log("fecha padre",fecha)
    setFechaCentral(fecha)
    //cleanLocalStorageRows()
   
  }

  const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())

  const handleChangeDateInicio = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    console.log("format fecha ini", auxFormatFecha)

    setFechaInicio(auxFormatFecha)
    //loadDataVentaParmaters(ITEM, auxFormatFecha)
    //la a la api cada vez que cambiar al backend

  };

  //star llamar a api
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //loadData();
  }, []);

  const loadPedidosConsolidados= async () => {
    try {

      //parametro ncesarios
      console.log(gender, fechaInicio)

      setLoading(true)
      const response = await loadApiListarPedidosConsolidados(
        fechaInicio,
        gender
        )
      setLoading(false)
      console.log("lista pedidos consolidados ", response)
      if(response?.status && response?.consolidados){
      if (Array.isArray(response?.consolidados)) {

        
        var temp_array = response?.consolidados.filter((x: any) => x.total != 0)
        console.log("temp_array",temp_array)
        //setDatosConsolidados(response)
        //updateTextTablaConsolidados(temp_array,fechaInicio)
        setRows(temp_array)
        //setoriginalRows(response)

      }
    }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  const SucursalEstado = async () => {

    try {
  
      //parametro ncesarios
      console.log( fechaInicio)

      setLoading(true)
      const response = await loadApiSucursalesEstado(
        fechaInicio
        )
        handleCloseModalBuscar()
      setLoading(false)
      console.log("lista sucursales ", response)
      setSucursalesEstado(response)
      handleOpenModalAcceso()

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

  const formatDateString = (fecha_vencimiento: string) => {
    var year = fecha_vencimiento.substring(0, 4);
    var day = fecha_vencimiento.substring(5, 7);
    var month = fecha_vencimiento.substring(8, 10)
  
    var res = month + '/' + day + '/' + year
    //26/04/2023
    //const str = 'Mozilla';
    //console.log("fecha",res)
  
    return res
    
  }

  const printPDF = () => {
    const titleHeader = `Pedidos Cosolidados ${formatDateString(fechaInicio)}`
    const pdf: any = new jsPDF("p", "pt", "a4");
    const columns = [
      "Categoria",
      "Subcategoria",
      "Producto",
      "Tipo de Producto",
      "Pando",
      "Salamanca",
      "America Oeste",
      "Hupermall",
      "Lincoln",
      "Jordan",
      "America Este",
      "Mega Center",
      "Total",
      "Vencimiento"
    ];
    var rowsX = [];



    for (let i = 0; i < rows.length; i++) {

      var temp = [
        rows[i].CATEGORIA,
        rows[i].SUB_CATEGORIA_1,
        rows[i].SUB_CATEGORIA_2,
        rows[i].tipo_producto,
        rows[i].pando,
        rows[i].salamanca,
        rows[i].aoeste,
        rows[i].hupermall,
        rows[i].lincoln,
        rows[i].jordan,
        rows[i].aeste,
        rows[i].center,
        rows[i].total,
        rows[i].fecha_vencimiento
        //formatDateString(rows[i].fecha_vencimiento)
      ];
      rowsX.push(temp);
    }
    pdf.setFontSize(12)
    pdf.text(titleHeader, 120, 40);
    // pdf.text(20, 40,titleHeader);

    pdf.autoTable(columns, rowsX, {
      startY: 65,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0]
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247]
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      rowStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      tableLineColor: [0, 0, 0]
    });

    pdf.save(titleHeader);
  };

  const formatDataforPdf = () => { 
    console.log("campos ", rows)
  
    var arrayGetOnlyProduct: any = []
    for (let i = 0; i < rows.length; i++) {    
              var objProd = {
                Categoria:rows[i].CATEGORIA,
                Sub_Categoria:rows[i].SUB_CATEGORIA_1,
                Producto:rows[i].SUB_CATEGORIA_2,
                Tipo_Producto:rows[i].tipo_producto,
                Pando:rows[i].pando,
                Salamanca:rows[i].salamanca,
                America_Oeste:rows[i].aoeste,
                Hupermall:rows[i].hupermall,
                Lincoln:rows[i].lincoln,
                Jordan:rows[i].jordan,
                America_Este:rows[i].aeste,
                Mega_Center:rows[i].center,
                Total:rows[i].total,
                Vencimiento:rows[i].fecha_vencimiento
              }
              arrayGetOnlyProduct.push(objProd)
  
    }
  
    console.log("get olny prodcut ", arrayGetOnlyProduct)
  
    const columns = [
      { name: "Categoria", nameRow: "Categoria" },
      { name: "Sub Catecoria", nameRow: "Sub_Categoria" },
      { name: "Producto", nameRow: "Producto" },
      { name: "Pando", nameRow: "Pando" },
      { name: "Salamanca", nameRow: "Salamanca" },
      { name: "America Oeste", nameRow: "America_Oeste" },
      { name: "Hupermall", nameRow: "Hupermall" },
      { name: "Lincoln", nameRow: "Lincoln" },
      { name: "Jordan", nameRow: "Jordan" },
      { name: "America Este", nameRow: "America_Este" },
      { name: "Mega Center", nameRow: "Mega_Center" },
      { name: "Total", nameRow: "Total" },
      { name: "Vencimiento", nameRow: "Vencimiento" }
     
    ]
  
  
    const titleHeader = (`REPORTE DE PEDIDOS CONSOLIDADOS - ${formatDateString(fechaInicio)}`).toUpperCase()
    printCustomPDF(arrayGetOnlyProduct, columns, titleHeader,`Pedidos Cosolidados ${formatDateString(fechaInicio)}`)
  
  }


  const generateExcel = () => {

    var arrayGetOnlyProduct: any = []
    for (let i = 0; i < rows.length; i++) {    
      var objProd = {
        Categoria:rows[i].CATEGORIA,
        Sub_Categoria:rows[i].SUB_CATEGORIA_1,
        Producto:rows[i].SUB_CATEGORIA_2,
        Tipo_Producto:rows[i].tipo_producto,
        Pando:rows[i].pando,
        Salamanca:rows[i].salamanca,
        America_Oeste:rows[i].aoeste,
        Hupermall:rows[i].hupermall,
        Lincoln:rows[i].lincoln,
        Jordan:rows[i].jordan,
        America_Este:rows[i].aeste,
        Mega_Center:rows[i].center,
        Total:rows[i].total,
        Vencimiento:rows[i].fecha_vencimiento
      }
      arrayGetOnlyProduct.push(objProd)

}
  
const columns = [
  { name: "Categoria", nameRow: "Categoria" },
  { name: "Sub Catecoria", nameRow: "Sub_Categoria" },
  { name: "Producto", nameRow: "Producto" },
  { name: "Pando", nameRow: "Pando" },
  { name: "Salamanca", nameRow: "Salamanca" },
  { name: "America Oeste", nameRow: "America_Oeste" },
  { name: "Hupermall", nameRow: "Hupermall" },
  { name: "Lincoln", nameRow: "Lincoln" },
  { name: "Jordan", nameRow: "Jordan" },
  { name: "America Este", nameRow: "America_Este" },
  { name: "Mega Center", nameRow: "Mega_Center" },
  { name: "Total", nameRow: "Total" },
  { name: "Vencimiento", nameRow: "Vencimiento" }
 
]
  
    const titleHeader = (`REPORTE DE PEDIDOS CONSOLIDADOS - ${formatDateString(fechaInicio)}`).toUpperCase()
    setLoading(true)
    exportToCustomCSV(arrayGetOnlyProduct, columns, titleHeader, `Pedidos Cosolidados ${formatDateString(fechaInicio)}`)
    setLoading(false)
  }

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <div style={{
        backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center'

      }}
      >

        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontFamily: 'Times New Roman' }} >
          Tabla Consolidada de Pedidos
          {/* <Button onClick={handleOpenModalBuscar} sx={{ fontSize: '1.6em',color: 'white' }}><BiSearchAlt/></Button> */}
        </Typography>
        <div>
        <Button 
              onClick={SucursalEstado}
               sx={{ fontSize: '1.6em', color: 'white' }}><IoKeyOutline/></Button>
          <Button onClick={generateExcel}//onClick={() => exportToCSV()} 
          sx={{ fontSize: '2em',color: 'white' }}><SiMicrosoftexcel/></Button>
          <Button //onClick={formatDataforPdf}
          onClick={() => printPDF()} 
          sx={{ fontSize: '2em',color: 'white' }}><ImFilePdf/></Button>
        </div>
      </div>
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange1('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            //style={{backgroundColor:`#343A40`}}
            style={{
              boxShadow: '1px 2px 9px #918c8d',
              //margin: '4em',
              //padding: '1em',
            }}
          >
            <Typography style={{ fontSize: '1rem', fontFamily: 'Times New Roman' }}>
              Buscador
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{
            boxShadow: '1px 2px 9px #918c8d',
          }}>
            <br />
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

              <Grid item xs={12} sm={12} md={3}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h5 style={{margin: '5px', fontFamily: 'Times New Roman' }}>Seleccione el producto</h5>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DesktopDatePicker sx={{ width: '100%' }}
                        defaultValue={dayjs() as unknown as Date}
                        format='DD/MM/YYYY'
                        //    defaultValue={new Date()}
                        // label="Basic example"
                        //   value={currentDateMiddle}
                        /*  onChange={(newValue) => {
                            //setValue(newValue);
                            console.log("new vale ", newValue)
                          }}*/

                        onChange={(newValue: any) => { handleChangeDateInicio(newValue) }}
                        slotProps={{ textField: { size: 'small' } }}

                      />
                    </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h5 style={{margin: '5px', fontFamily: 'Times New Roman' }}>Seleccione Sucursal</h5>
                    <TextField
                        id="outlined-select-gender"
                        select
                        //label={gender === "" ? "Seleccione" : ""}
                        label="Seleccione"
                        value={gender}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                        InputLabelProps={{ shrink: true }}
                        size='small'
                        SelectProps={{
                          MenuProps: {

                          },
                        }}
                          //margin="normal"
                          variant="outlined"
                      >
                        {genders.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                </div> 
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <br/>
                <ColorButton variant="contained" 
                    onClick={loadPedidosConsolidados}
                    > Buscar</ColorButton>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
              
              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>
      <br></br>
      <div>
        
        &nbsp; &nbsp;
        <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelResearch={() => cancelSearch()}
              placeholder='Buscar'

            />
      </div>

      
      <TablaPedidosConsolidados
        tableData={rows}
        deleteByIndex={(index: any) => deleteByIndex(index)}
      />

      <ModalBuscarPedidosConsolidados
        openModalBuscar={openModalBuscar}
        handleOpenModalBuscar={handleOpenModalBuscar}
        handleCloseModalBuscar={handleCloseModalBuscar}
        updateTextTablaConsolidados={(list: any,fecha:string) => updateTextTablaConsolidados(list,fecha)}
      />

      <ModalAccesos
        openModalAcceso={openModalAcceso}
        handleOpenModalAcceso={handleOpenModalAcceso}
        handleCloseModalAcceso={handleCloseModalAcceso}
        SucursalesEstado={SucursalesEstado}
        FechaCentral={fechaInicio}
        SucursalEstado={SucursalEstado}
      />
 {loading ? <KDImage /> : null}
    </>
  )
}
export default PedidosConsolidados