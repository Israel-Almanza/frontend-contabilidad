import { Typography, Button, Collapse, TextField, Modal, Grid, Autocomplete, InputAdornment, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useEffect, useState } from 'react'



import Box from '@mui/material/Box';

import TablaPedidosExternos from './TablaPedidosExternos';


import SearchBar from '@mkyy/mui-search-bar';
import { styled } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { DesktopDatePicker } from '@mui/x-date-pickers';

import { usePedidosExternos } from './services/usePedidosExternos';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ModalForm } from './components/ModalForm';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import FileSaver from "file-saver";
import SearchIcon from '@mui/icons-material/Search';
import XLSX from "xlsx";
import { getDayFormat, getMonthFormat, getStringFechaInicial } from '../../../../core/utils/DateFormat';

import jsPDF from "jspdf";
import "jspdf-autotable";


const formatDateString = (FECHA_ENTREGA_PEDIDO: string) => {
  var year = FECHA_ENTREGA_PEDIDO.substring(0, 4);
  var day = FECHA_ENTREGA_PEDIDO.substring(5, 7);
  var month = FECHA_ENTREGA_PEDIDO.substring(8, 10)

  var res = month + '/' + day + '/' + year
  //26/04/2023
  //const str = 'Mozilla';


  return res
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));
const PedidosExternos = () => {

  const { loadApiSucursalesUsaurio, loadApiPedidosExternosSuc } = usePedidosExternos()

  const [loading, setLoading] = useState(
    false
  );

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };




  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const handleOpenModalTres = () => setOpenModalTres(true);
  const handleCloseModalTres = () => setOpenModalTres(false);




  const [originalRows, setoriginalRows] = useState<any>([])


  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");
  //
  const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())
  const [fechaFin, setFechaFin] = useState(() => getStringFechaInicial())




  const [ListSucursalesUsaurio, setListSucursalesUsaurio] = useState<any>([])


  //capara de datos 
  const [estadoDefault, setEstadoDefault] = useState('')
  const [idSucursal, setIdSucursal] = useState('')


  const [nombreSucursalTabla, setNombreSucursalTable] = useState('')

  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);
    /* const filteredRows = originalRows.filter((row: any) => {
       return row.DETALLE.toLowerCase().includes(searchedVal.toLowerCase());
     });*/

    const keys = ["FECHA_FACTURA", "DOCUMENTO", "COSTO_TOTAL"]
    const filteredRows = originalRows.filter((row: any) => {
      return keys.some((key: any) =>
        row[key].toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };


  //star llamar a api
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //loadData();
    loadSucursalesUsaurio()
    // loadPrimeraCategoriaInventarios()
  }, []);

  const loadSucursalesUsaurio = async () => {
    try {
      const response = await loadApiSucursalesUsaurio();
      console.log("response data ", response)
      if (Array.isArray(response)) {
        setListSucursalesUsaurio(response)
        //actulizar select
      }

    } catch (error) {

    }
  }
  const loadPedidosExternosSuc = async () => {
    try {

      //parametro ncesarios
      console.log(idSucursal, estadoDefault, fechaInicio, fechaFin)

      if (!idSucursal || !fechaInicio || !fechaFin) {

        //  alert("hay un campo vacio")
        return;
      }
      setLoading(true)
      const response = await loadApiPedidosExternosSuc(Number(idSucursal), fechaInicio, fechaFin)
      setLoading(false)
      console.log("lista externos ", response)
      if (Array.isArray(response)) {
        setRows(response)
        setoriginalRows(response)

      }


    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }


  //end llamar a la api

  const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }


  const handleChangeDateInicio = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    console.log("format fecha ini", auxFormatFecha)

    setFechaInicio(auxFormatFecha)
    //loadDataVentaParmaters(ITEM, auxFormatFecha)
    //la a la api cada vez que cambiar al backend

  };
  const handleChangeDateFin = async (fecha: Date) => {

    fecha = new Date(fecha)

    const auxFormatFecha = `${fecha.getFullYear()}-${getMonth(fecha.getMonth())}-${getDay(fecha.getDate())}`
    //console.log("format fecha fin ", auxFormatFecha)
    setFechaFin(auxFormatFecha)

  };

  const handleSeleccioneSucursal = (value: any) => {
    console.log("value de succrusal ", value)
    const { ID_UBICACION, DESCRIPCION } = value
    setNombreSucursalTable(DESCRIPCION)

    setIdSucursal(ID_UBICACION)
  }

  const printPDF = () => {
    const titleHeader = `Pedidos Externos ${nombreSucursalTabla} `
    //const titleHeader = `Pedidos externos ` // ${nombreSucursalTabla} `
    const pdf: any = new jsPDF("p", "pt", "a4");
    const columns = [
      "Fecha",
      "Factura",
      "Precio (Bs)",

    ];
    var rowsX = [];



    for (let i = 0; i < rows.length; i++) {

      var temp = [
        // nombreSucursalTabla,
        formatDateString(rows[i].FECHA_FACTURA),
        rows[i].DOCUMENTO,
        rows[i].COSTO_TOTAL,

      ];
      rowsX.push(temp);
    }
    pdf.setFontSize(11)
    pdf.text(titleHeader, 40, 40);
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
    //console.log(pdf.output("datauristring"));
    //pdf.save("pdf");
    pdf.save(titleHeader);
  };


  //export excel

  // ******** XLSX with object key as header *************
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileExtension = ".xlsx";

  // const exportToCSV = (csvData, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  // ******** XLSX with new header *************
  const [customers, setCustomers] = useState(customersData());

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const Heading = [
    {
      /*  firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        address: "Address",
        postcode: "Postcode"*/

      Sucursal: "Sucursal",
      Categoria: "Categoria",
      SubCategoria: "Subcategoria",
      Producto: "Producto",
      Detalle: "Detalle",
      PAModificado: "P.Modifcado",
      FechaDeEntrega: "Fecha de entrega"
    }
  ];

  function customersData() {
    const custs = [];

    //console.log("rows* ", rows)
    for (let i = 0; i < rows.length; i++) {
      custs[i] = {

        "Fecha": formatDateString(rows[i].FECHA_FACTURA),
        "Factura": rows[i].DOCUMENTO,
        "Precio (Bs)": rows[i].COSTO_TOTAL

      };
    }
    return custs;
  }



  const wscols = [

    { wch: Math.max(...rows.map((customer: any) => customer?.FECHA_FACTURA?.length)) + 0 },
    { wch: Math.max(...rows.map((customer: any) => customer?.DOCUMENTO?.length)) },
    { wch: Math.max(...rows.map((customer: any) => customer?.COSTO_TOTAL?.length)) },

  ];

  /*
  
   const wscols = [
    {
      wch: Math.max(...customers.map((customer) => customer.Sucursal.length))
    },
    { wch: Math.max(...customers.map((customer) => customer.Categoria.length)) },
    { wch: Math.max(...customers.map((customer) => customer.SubCategoria.length)) },
    { wch: Math.max(...customers.map((customer) => customer.Producto.length)) },
    { wch: Math.max(...customers.map((customer) => customer.Detalle.length)) },
    { wch: Math.max(...customers.map((customer) => customer.PModificado.length)) +10},
    { wch: Math.max(...customers.map((customer) => customer.FechaDeEntrega.length)) },
     {
       wch:
         Math.max(...customers.map((customer) => customer.postcode.length)) + 3
     }
    ];
  */


  //const csvData = customers
  const csvData = [...customersData()]
  //const fileName = "testExcel"

  const titleHeader = `Pedidos Externos ${nombreSucursalTabla} `
 
  const fileName = titleHeader

  const exportToCSV = () => {
    // console.log(Heading);

    console.log("csvData ", csvData)
    /*const ws = XLSX.utils.json_to_sheet(Heading, {
      header: ["firstName", "lastName", "email", "address", "postcode"],
      skipHeader: true,
      origin: 0 //ok
    });*/
    var ws = XLSX.utils.aoa_to_sheet([
      // ["OneCloud"],
      [titleHeader]
    ]);
    ws["!cols"] = wscols;
    /*ws["A1"].l = {
      Target: "https://sheetjs.com",
      Tooltip: "Find us @ SheetJS.com!"
    };*/
    //ONLY Data Added here
    XLSX.utils.sheet_add_json(ws, csvData, {
      /*Categoria: rows[i].CATEGORIA,
       SubCategoria: "Subcategoria",
       Producto: "Producto",
       Detalle: "Detalle",
       PModificado: "P.Modifcado",
       FechaDeEntrega: "Fecha de entrega"*/
      // header: ["Sucursal", "Categoria", "SubCategoria", "Producto","Detalle","PModificado","FechaDeEntrega"],
      skipHeader: false,
      origin: "A6" //ok -1
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };


  return (
    <>
      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
          <Grid item xs={5} sm={9} md={9}>
            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '15px',
              color: 'white', alignItems: 'center'
            }} >
              Pedidos externos

            </Typography>
          </Grid>
          <Grid item xs={7} sm={3} md={3}>
            <div>
              {/*<Button onClick={() => setActiveBtnSearch(!activeBtnSearch)} sx={{ fontSize: '1.6em', color: 'white' }}><BiSearchAlt /></Button>*/}

              <Button onClick={handleOpenModalTres} sx={{ fontSize: '1.6em', color: 'white' }}><AiOutlinePlusCircle /></Button>
              <Button onClick={() => exportToCSV()}
                sx={{ fontSize: '1.6em', color: 'white' }}

              ><SiMicrosoftexcel />
              </Button>

              <Button onClick={() => printPDF()}
                sx={{ fontSize: '1.6em', padding: "0px", margin: '0px', color: 'white' }}><ImFilePdf /></Button>
            </div>
          </Grid>
        </Grid>




      </div>

      <div >
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


            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

              <Grid item xs={12} sm={6} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Sucursal</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListSucursalesUsaurio}
                    noOptionsText={'Sin opciones'}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) => 

                      handleSeleccioneSucursal(value)
                      

                  
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Seleccione la sucursal"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (<InputAdornment position="start"> <SearchIcon />
                          </InputAdornment>),
                          disableUnderline: true
                        }}

                      />
                    )}
                    getOptionLabel={(option: any) => option.DESCRIPCION}
                  />



                </div>
              </Grid>

              <Grid item xs={6} sm={6} md={2}>

                <h5 style={{ margin: "5px" }}>
                  Seleccione Fecha inicial</h5>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DesktopDatePicker sx={{ width: '100%' }}
                    defaultValue={dayjs()}
                    format='DD/MM/YYYY'
                    //    defaultValue={new Date()}
                    // label="Basic example"
                    //   value={currentDateMiddle}
                    /*  onChange={(newValue) => {
                        //setValue(newValue);
                        console.log("new vale ", newValue)
                      }}*/

                    onChange={(newValue: Date) => { handleChangeDateInicio(newValue) }}
                    slotProps={{ textField: { size: 'small' } }}

                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6} sm={6} md={2}>

                <h5 style={{ margin: "5px" }}>Seleccione Fecha final</h5>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DesktopDatePicker sx={{ width: '100%' }}
                    defaultValue={dayjs()}
                    format='DD/MM/YYYY'
                    //    defaultValue={new Date()}
                    // label="Basic example"
                    //   value={currentDateMiddle}
                    /*  onChange={(newValue) => {
                        //setValue(newValue);
                        console.log("new vale ", newValue)
                      }}*/

                    onChange={(newValue: Date) => { handleChangeDateFin(newValue) }}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}

                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => loadPedidosExternosSuc()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>



          </AccordionDetails>

        </Accordion>
      </div>

      {expanded ?

        <>






          <Box sx={{ width: '100%' }}>


            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

         


              <Grid item xs={12} sm={6} md={3}>
                <SearchBar

                  style={{ marginTop: '20px' }}
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelResearch={() => cancelSearch()}
                  placeholder='Buscar'

                />
              </Grid>
            </Grid>

          </Box>


          <br />
          <TablaPedidosExternos
            tableData={rows}
            deleteByIndex={(index: any) => deleteByIndex(index)}
          />


        </>
        : null}

      {loading ? <KDImage

      /> : null}
      <ModalForm
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        idSucursal={idSucursal}
        description="Deseas cerrar y guardar el formulario?"
      />
    </>
  )
}

export default PedidosExternos