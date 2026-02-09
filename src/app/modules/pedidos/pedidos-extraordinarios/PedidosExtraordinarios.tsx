import { Typography, Button, Collapse, TextField, Modal, Grid, Autocomplete, InputAdornment, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useEffect, useState } from 'react'


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import TablaPedidosExtraordinarios from './TablaPedidosExtraordinarios';

import SearchBar from '@mkyy/mui-search-bar';
import { styled } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import { usePedidosExtraordinariosService } from './services/usePedidosExtraordinariosService';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { ModalForm } from './components/ModalForm';
import { KDImage } from '../../../../core/modal-loading/KDImage';

import FileSaver from "file-saver";
import SearchIcon from '@mui/icons-material/Search';
import XLSX from "xlsx";
import { getDayFormat, getMonthFormat, getStringFechaInicial } from '../../../../core/utils/DateFormat';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';




const top100Films = [
  { label: 'Todos', cod: 'all' },
  { label: 'Sin Aprobacion', cod: 'all' },
  { label: 'Aprobados', cod: 'all' },


];



const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));



const formatDateString = (FECHA_ENTREGA_PEDIDO: string) => {
  var year = FECHA_ENTREGA_PEDIDO.substring(0, 4);
  var day = FECHA_ENTREGA_PEDIDO.substring(5, 7);
  var month = FECHA_ENTREGA_PEDIDO.substring(8, 10)

  var res = month + '/' + day + '/' + year
  //26/04/2023
  //const str = 'Mozilla';


  return res
}


const PedidosExtraordinarios = () => {

  const { loadApiSucursalesUsaurio, loadApiPedidosExtraordinariosSuc,
    loadApiPrimeraCategoriaInventarios, loadApiGetPermismiosBotones } = usePedidosExtraordinariosService()

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)



  const [loading, setLoading] = useState(
    false
  );


  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const handleOpenModalTres = () => setOpenModalTres(true);
  const handleCloseModalTres = () => setOpenModalTres(false);


  const [originalRows, setoriginalRows] = useState<any>([])


  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");
  //inicializacomos las fechas en la fecha de inicio de hoy
  const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())
  const [fechaFin, setFechaFin] = useState(() => getStringFechaInicial())




  const [ListSucursalesUsaurio, setListSucursalesUsaurio] = useState<any>([])

  const [btn_eliminar, setBtn_eliminar] = useState(0);
  const [btn_aceptar_eli, setBtn_aceptar_eli] = useState(0);
  const [btn_rechazar_eli, setBtn_rechazar_eli] = useState(0);
  const [btn_aceptar_sup, setBtn_aceptar_sup] = useState(0);
  const [btn_aceptar_pla, setBtn_aceptar_pla] = useState(0);


  //capara de datos 
  const [estadoDefault, setEstadoDefault] = useState('')
  const [idSucursal, setIdSucursal] = useState('')

  const [codigoSucursal, setCodigoSucursal] = useState('');
  const [sufijoSucursal, setSufijoSucursal] = useState('');

  const [nombreSucursalTemporal, setNombreSucursalTemporal] = useState('')
  const [nombreSucursalTabla, setNombreSucursalTable] = useState('')

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };


  const requestSearch = (searchedVal: string) => {

    setSearched(searchedVal);
    const keys = ["DETALLE", "CATEGORIA", "SUBCATEGORIA1", "SUBCATEGORIA2", "FECHA_ENTREGA_PEDIDO"]
    const filteredRows = originalRows.filter((row: any) => {
      return keys.some((key: any) =>
        row[key].toLowerCase().includes(searchedVal.toLowerCase())
      );
    });

    //console.log("filter search ",filteredRows)
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
    loadSucursalesUsaurio(),
      loadPrimeraCategoriaInventarios()
    loadBotonesPermisos();
  }, []);

  const [controlReload, setControlReload] = useState(false)
  useEffect(() => {

    loadPedidosExtraordinariosSuc();
  }, [controlReload]);

  const handleChangeControlReload = () => {
    if (controlReload) {
      setControlReload(false)
      return;
    } else {
      setControlReload(true)
    }


  }




  const loadBotonesPermisos = async () => {
    try {
      const response = await loadApiGetPermismiosBotones();
      console.log("response  btn permisos", response)

      if (response.status && response.permisos_botones) {

        setBtn_eliminar(response.permisos_botones.BTN_ELIMINAR);
        setBtn_aceptar_eli(response.permisos_botones.BTN_APROBAR_ELIMINAR)
        setBtn_rechazar_eli(response.permisos_botones.BTN_RECHAZAR_ELIMINAR)
        setBtn_aceptar_sup(response.permisos_botones.BTN_APROBAR_SUPERVISOR)
        setBtn_aceptar_pla(response.permisos_botones.BTN_APROBAR_PLANTA)

      }



    } catch (error) {

    }
  }



  const loadPrimeraCategoriaInventarios = async () => {
    try {
      const response = await loadApiPrimeraCategoriaInventarios();


    } catch (error) {

    }
  }

  const loadSucursalesUsaurio = async () => {
    try {
      const response = await loadApiSucursalesUsaurio();

      if (Array.isArray(response)) {
        setListSucursalesUsaurio(response)
        //actulizar select
      }

    } catch (error) {

    }
  }



  const loadPedidosExtraordinariosSuc = async () => {
    try {

      //parametro ncesarios
      // console.log("######", idSucursal, estadoDefault, fechaInicio, fechaFin)

      if (!idSucursal || !estadoDefault || !fechaInicio || !fechaFin) {

        //alert("hay un campo vacio")
        // setLoading(false)
        return;
      }

      setNombreSucursalTable(nombreSucursalTemporal)
      // setCustomers(customersData())
      //nombre de sucursal que se le pasara al parametor
      setLoading(true)
      const response = await loadApiPedidosExtraordinariosSuc(Number(idSucursal), estadoDefault, fechaInicio, fechaFin)

      console.log("response extraordinarios ", response);
      setLoading(false)

      if (Array.isArray(response)) {
        setRows(response)
        setoriginalRows(response)

      }


    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }



  const printPDF = () => {
    const titleHeader = `Pedidos extraordinarios ${nombreSucursalTabla} `
    const pdf: any = new jsPDF("p", "pt", "a4");
    const columns = [
      "Sucursal",
      "Categoria",
      "Subcategoria",
      "Producto",
      "Detalle",
      "P.Modifcado",
      "Fecha de entrega"
    ];
    var rowsX = [];



    for (let i = 0; i < rows.length; i++) {

      var temp = [
        nombreSucursalTabla,
        rows[i].CATEGORIA,
        rows[i].SUBCATEGORIA1,
        rows[i].SUBCATEGORIA2,
        rows[i].DETALLE,
        rows[i].MODIFICADO == 1 ? "SI" : "NO",
        formatDateString(rows[i].FECHA_ENTREGA_PEDIDO)
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

    pdf.save(titleHeader);
  };



  //end llamar a la api

  const deleteByIndex = (index: any) => {

    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }


  const handleChangeDateInicio = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    // console.log("format fecha ini", auxFormatFecha)

    setFechaInicio(auxFormatFecha)


  };
  const handleChangeDateFin = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    //  console.log("format fecha fin ", auxFormatFecha)
    setFechaFin(auxFormatFecha)


  };

  const handleSeleccioneSucursal = (value: any) => {

    const { ID_UBICACION, DESCRIPCION, CODIGO, SUFIJO } = value

    console.log("value sucursal ", value)
    setIdSucursal(ID_UBICACION)
    setNombreSucursalTemporal(DESCRIPCION)

    setCodigoSucursal(CODIGO);
    setSufijoSucursal(SUFIJO);
    //recuperar el nombre de la sucursal

  }

  const handleSeleccioneDefault = (value: any) => {

    const { cod } = value
    setEstadoDefault(cod);

  }
  //export excel

  // *** XLSX with object key as header ******
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

  // *** XLSX with new header ******
  // const [customers, setCustomers] = useState(customersData());







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






  const exportToCSV = () => {

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

    const titleHeader = `Pedidos extraordinarios ${nombreSucursalTabla} `
    const fileName = titleHeader
    // console.log(Heading);
    function customersData() {
      const custs = [];


      for (let i = 0; i < rows.length; i++) {
        custs[i] = {
          Sucursal: nombreSucursalTabla,
          /*Categoria: rows[i].CATEGORIA,
          SubCategoria: "Subcategoria",
          Producto: "Producto",
          Detalle: "Detalle",
          PModificado: "P.Modifcado",
          FechaDeEntrega: "Fecha de entrega"*/

          Categoria: rows[i].CATEGORIA,
          SubCategoria: rows[i].SUBCATEGORIA1,
          Producto: rows[i].SUBCATEGORIA2,
          Detalle: rows[i].DETALLE,
          "P.Modificado": rows[i].MODIFICADO == 1 ? "SI" : "NO",
          FechaDeEntrega: formatDateString(rows[i].FECHA_ENTREGA_PEDIDO)
        };
      }
      return custs;
    }


    const wscols = [
      /* {
         wch: Math.max(...rows.map((customer:any) => customer.Sucursal.length))
       },*/
      { wch: Math.max(...rows.map((customer: any) => customer.CATEGORIA.length)) },
      { wch: Math.max(...rows.map((customer: any) => customer.SUBCATEGORIA1.length)) },
      { wch: Math.max(...rows.map((customer: any) => customer.SUBCATEGORIA2.length)) },
      { wch: Math.max(...rows.map((customer: any) => customer.DETALLE.length)) },
      { wch: Math.max(...rows.map((customer: any) => customer.MODIFICADO.length)) + 10 },
      /{ wch: Math.max(...rows.map((customer:any) => customer.FechaDeEntrega.length)) },/
      /* {
         wch:
           Math.max(...customers.map((customer) => customer.postcode.length)) + 3
       }*/
    ];

    //const csvData = customers
    const csvData = [...customersData()]


    //const fileName = "testExcel"


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


  const onClickTest = async () => {

    try {

      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminará el pedido extraordinario.',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',

      })

      console.log("ressssssss", result)
      

    } catch (error) {

    }




  }

  return (
    <>

      {/* <button onClick={() => onClickTest()}>test show</button> */}


      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '15px',
              color: 'white', alignItems: 'center'
            }} >
              Pedidos extraordinarios

            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div>
              {/* <Button onClick={() => setActiveBtnSearch(!activeBtnSearch)} sx={{ fontSize: '1.6em', color: 'white' }}><BiSearchAlt /></Button> */}
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
              <Grid item xs={12} sm={6} md={2}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: '100%' }}
                    noOptionsText={'Sin opciones'}

                    onChange={(event, value) =>
                      handleSeleccioneDefault(value)
                    }
                    renderInput={(params) => <TextField {...params}
                      size="small"
                      label="Seleccione"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (<InputAdornment position="start"> <SearchIcon />
                        </InputAdornment>),
                        disableUnderline: true
                      }}
                    />}
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
                  onClick={() => loadPedidosExtraordinariosSuc()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>



          </AccordionDetails>

        </Accordion>
      </div>

      {expanded ?
        <>




          <div style={{
            padding: '0.5%', display: 'flex', flexDirection: 'row',
            justifyContent: 'start'
            , alignItems: 'end',

          }}
          // onClick={handleClick}
          >


          </div>



          <Box sx={{ width: '100%' }}>


            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

              {/*<Grid item xs={12} sm={6} md={8}>

                <ColorButton variant="contained"
                  onClick={handleOpenModalTres}
                >Agregar pedido extraordinario</ColorButton>
              </Grid>*/}


              <Grid item xs={12} sm={6} md={3}>
                <SearchBar
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelResearch={() => cancelSearch()}
                  placeholder='Buscar'

                />
              </Grid>
            </Grid>

          </Box>


          <br />
          <TablaPedidosExtraordinarios
            tableData={rows}
            nombreSucursal={nombreSucursalTabla}

            btn_eliminar={btn_eliminar}
            btn_aceptar_eli={btn_aceptar_eli}
            btn_rechazar_eli={btn_rechazar_eli}
            btn_aceptar_sup={btn_aceptar_sup}
            btn_aceptar_pla={btn_aceptar_pla}
            codigoSucursal={codigoSucursal}
            sufijoSucursal={sufijoSucursal}

            deleteByIndex={(index: any) => deleteByIndex(index)}

            handleChangeControlReload={handleChangeControlReload}
          />


          {loading ? <KDImage

          /> : null}
        </>
        : null}
      <ModalForm
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        description="Deseas cerrar y guardar el formulario?"
      />

    </>
  )
}

export default PedidosExtraordinarios