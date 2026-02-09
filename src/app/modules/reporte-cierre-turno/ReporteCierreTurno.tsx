import { Typography, Button, Autocomplete, colors, Input, Checkbox, Grid, Container, Card, CardContent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { Theme, useTheme } from '@mui/material';
import SearchBar from '@mkyy/mui-search-bar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { getDayFormat, getMonthFormat, getStringFechaInicial } from '../../../core/utils/DateFormat';
import dataUsuarioTurnoJson from '../../../data/usuarioturno/dataUsuarioTurnoJson.json'
import { ModalPersonalized3 } from './components/ModalPersonalized3';
import { BiSearchAlt } from "react-icons/bi";
import exportFromJSON from 'export-from-json'
import TablaRepTurno from './TablaRepTurno';
import { useCierreTurnoServices } from './services/useCierreTurnoServices';
import { useLocation } from 'react-router-dom';
import { KDImage } from '../../../core/modal-loading/KDImage';
import { printCustomPDF } from '../../../core/utils/ManagerPdf';
import { exportToCustomCSV } from '../../../core/utils/ManagerExcel';
import jsPDF from "jspdf";
import "jspdf-autotable";

const isWeekend = (date: any) => {
  const day = date.day();

  return day === 0 || day === 6;
};

const ReporteCierreTurno = () => {
  const { loadApiListaUsuarioTurno, loadApiReporteUsuario } = useCierreTurnoServices()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister, reset } = useForm();
  const location = useLocation();
  console.log("ruta actual ", location.pathname)
  //const classes = useStyles();

  const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
    setGender(event.target.value);
  };


  const [message, setMessage] = useState('');
  const handleChangeSerach = (event: any) => {

    console.log("event ", event.target.value)
    setMessage(event.target.value);
  };


  const exportDataJson = () => {

    console.log("entre aqui sdddddddd")




    const data = [{
      id: 1,
      first_name: "Ethelred",
      last_name: "Slowly",
      email: "eslowly0@google.es"
    }, {
      id: 2,
      first_name: "Reta",
      last_name: "Woolmer",
      email: "rwoolmer1@miibeian.gov.cn"
    }, {
      id: 3,
      first_name: "Arabel",
      last_name: "Pestor",
      email: "apestor2@bloglovin.com"
    }]

    // const data=JSON.parse(data_menu)
    const fileName = 'datos'
    const exportType = exportFromJSON.types.csv

    exportFromJSON({ data, fileName, exportType })
    //SUBNIVEL = [...JSON.parse(data_menu)]

    //console.log("test list ", SUBNIVEL)
  }

  //<--modal
  const [openModal3, setOpenModal3] = useState(false);

  const handleOpenModal3 = () => setOpenModal3(true);
  const handleCloseModal3 = () => setOpenModal3(false);
  //modal-->

  //<---tabla
  const [originalRows, setoriginalRows] = useState<any>([])

  const [rows, setRows] = useState<any>([]);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);

    const keys = ["usuario", "fecha_apertura", "fecha_cierre", "rangoFacturas",
      "cantidadRecibos", "monto_inicial", "monto_cierre"]
    const filteredRows = originalRows.filter((row: any) => {

      return keys.some((key: any) =>
        row[key]?.toString()?.toLowerCase()?.includes(searchedVal.toLowerCase())
      );
    });

    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };

  const [fechaInicio, setFechaInicio] = useState(() => getStringFechaInicial())
  const [fechaFinal, setFechaFinal] = useState(() => getStringFechaInicial())

  const handleChangeDateInicio = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    console.log("format fecha ini", auxFormatFecha)

    setFechaInicio(auxFormatFecha)
    //loadDataVentaParmaters(ITEM, auxFormatFecha)
    //la a la api cada vez que cambiar al backend

  };
  const handleChangeDateFinal = async (fecha: Date) => {

    fecha = new Date(fecha)

    //2023-04-24"
    const auxFormatFecha = `${fecha.getFullYear()}-${getMonthFormat(fecha.getMonth())}-${getDayFormat(fecha.getDate())}`
    console.log("format fecha final", auxFormatFecha)

    setFechaFinal(auxFormatFecha)
    //loadDataVentaParmaters(ITEM, auxFormatFecha)
    //la a la api cada vez que cambiar al backend

  };

  const [usuarios, setUsuarios] = useState<any>([])
  //const [ListaUsuarios, setListaUsuarios] = useState<any>([])

  const [sucursal, setSucursal] = useState('')
  const [nomSucursal, setnomSucursal] = useState('')
  const [idUsuario, setIdUsuario] = useState('')

  //star llamar a api
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador

    nomSucursales()
    //loadListaReporteUsuario()
    //console.log("userr data ", dataUsuarioTurnoJson)
    //setRows(dataUsuarioTurnoJson)
    //setoriginalRows(dataUsuarioTurnoJson)
  }, [location.pathname]);

  //loading
  const [loading, setLoading] = useState(
    false
  );

  // para identificar en que sucursal esta para el llamado de api
  const nomSucursales = () => {
    if (location.pathname == "/REP-CT-PANDO") {
      setSucursal("PANDO")
      setnomSucursal("pando")
      console.log("Sucursal **pando")
      loadListaUsuario("pando")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "pando")
    }
    if (location.pathname == "/REP-CT-SALAMANCA") {
      setSucursal("SALAMANCA")
      setnomSucursal("salamanca")
      console.log("sucursal salamanca")
      loadListaUsuario("salamanca")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "salamanca")
    }
    if (location.pathname == "/REP-CT-AMERICA_OE") {
      setSucursal("AMERICA OESTE")
      setnomSucursal("aoeste")
      console.log("sucursal america oeste")
      loadListaUsuario("aoeste")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "aoeste")
    }
    if (location.pathname == "/REP-CT-HUPERMALL") {
      setSucursal("HUPERMALL")
      setnomSucursal("hupermall")
      //console.log("sucursal america oeste")
      loadListaUsuario("hupermall")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "hupermall")
    }
    if (location.pathname == "/REP-CT-LINCOLN") {
      setSucursal("LINCOLN")
      setnomSucursal("lincoln")
      //console.log("sucursal america oeste")
      loadListaUsuario("lincoln")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "lincoln")
    }
    if (location.pathname == "/REP-CT-JORDAN") {
      setSucursal("JORDAN")
      setnomSucursal("jordan")
      //console.log("sucursal america oeste")
      loadListaUsuario("jordan")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "jordan")
    }
    if (location.pathname == "/REP-CT-AMERICA_E") {
      setSucursal("AMERICA ESTE")
      setnomSucursal("aeste")
      //console.log("sucursal america oeste")
      loadListaUsuario("aeste")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "aeste")
    }
    if (location.pathname == "/REP-CT-CENTER") {
      setSucursal("CENTER")
      setnomSucursal("center")
      //console.log("sucursal america oeste")
      loadListaUsuario("center")
      loadListaReporteUsuario(fechaInicio, fechaFinal, "center")
    }

  }

  //lista de perfiles
  const loadListaUsuario = async (nomSucursal: string) => {
    //console.log("nom sucursal ",sucursal)
    try {
      const response = await loadApiListaUsuarioTurno(
        nomSucursal
      );
      console.log("res lista usuario ", response)
      //setLoading(false)
      if (response?.status && response?.usuarios) {
        setUsuarios(response?.usuarios)
        //setRows(response)
        //setoriginalRows(response)
      }

    } catch (error) {

    }
  }

  const loadListaReporteUsuario = async (fechaI: string, fechaF: string, nomSucursal: string) => {
    console.log("nom sucursal**** ", nomSucursal)
    try {
      setLoading(true)
      const response = await loadApiReporteUsuario(
        //  fechaInicio,
        //  fechaFinal,
        //  "pando",
        //  ""
        fechaI,
        fechaF,
        nomSucursal,
        ""
      );
      setLoading(false)
      console.log("res lista usuario tabla ", response)
      //setLoading(false)
      if (Array.isArray(response)) {
        //setUsuarios(response?.usuarios)
        setRows(response)
        setoriginalRows(response)
      }

    } catch (error) {

    }
  }

  const loadListaReporteUsuarioBuscar = async () => {
    console.log("nom sucursal**** ", nomSucursal)
    try {
      setLoading(true)
      const response = await loadApiReporteUsuario(
        fechaInicio,
        fechaFinal,
        nomSucursal,
        ""
      );
      setLoading(false)
      console.log("res lista usuario tabla2 ", response)
      //setLoading(false)
      if (Array.isArray(response)) {
        //setUsuarios(response?.usuarios)
        setRows(response)
        setoriginalRows(response)
      }

    } catch (error) {

    }
  }

  const handleSeleccioneUsuarios = async (value: any) => {

    console.log("valee de primera Cate ", value)
    const { ID_USUARIO, NOMBRE_PRO, COMBO } = value
    setIdUsuario(ID_USUARIO)
    //setNomProductoG(NOMBRE_PRO)
    //setID_COMBO(COMBO)

  }

  const formatDataforPdf = () => {
    console.log("campos ", rows)

    var arrayGetOnlyProduct: any = []
    for (let i = 0; i < rows.length; i++) {
      var objProd = {
        Usuario: rows[i].usuario,
        Fecha_Hora_Inicial: rows[i].fecha_apertura + rows[i].horario_apertura,
        Fecha_Hora_Salida: rows[i].fecha_cierre + rows[i].hora_cierre,
        RangoFacturas: rows[i].rangoFacturas,
        CantidadRecibos: rows[i].cantidadRecibos,
        MontoInicialTurno: rows[i].monto_inicial,
        TotalIngresos: rows[i].total_ingresos,
        TotalEgresos: rows[i].total_egresos,
        TotalVentasEfectivo: rows[i].monto_total_ventas_efectivo,
        TotalVentasQR: rows[i].monto_total_ventas_pago_qr,
        TotalVentaTrajDep_Cred: rows[i].monto_total_ventas_tarjeta,
        TotalVentaTransferidos: rows[i].monto_total_ventas_transferencia_bancaria,
        TotalCuponesPedidosYa: rows[i].monto_total_ventas_cupon_pedidos_ya,
        SaldoTeorico: rows[i].saldo_teorico,
        DineroEntregado: rows[i].monto_cierre,
        Descuadre: rows[i].descuadre
      }
      arrayGetOnlyProduct.push(objProd)

    }

    console.log("get olny prodcut ", arrayGetOnlyProduct)

    const columns = [
      { name: "Usuario", nameRow: "Usuario" },
      { name: "Fecha_Hora_Inicial", nameRow: "Fecha_Hora_Inicial" },
      { name: "Fecha_Hora_Salida", nameRow: "Fecha_Hora_Salida" },
      { name: "RangoFacturas", nameRow: "RangoFacturas" },
      { name: "CantidadRecibos", nameRow: "CantidadRecibos" },
      { name: "MontoInicialTurno", nameRow: "MontoInicialTurno" },
      { name: "TotalIngresos", nameRow: "TotalIngresos" },
      { name: "TotalEgresos", nameRow: "TotalEgresos" },
      { name: "TotalVentasEfectivo", nameRow: "TotalVentasEfectivo" },
      { name: "TotalVentasQR", nameRow: "TotalVentasQR" },
      { name: "TotalVentaTrajDep_Cred", nameRow: "TotalVentaTrajDep_Cred" },
      { name: "TotalVentaTransferidos", nameRow: "TotalVentaTransferidos" },
      { name: "TotalCuponesPedidosYa", nameRow: "TotalCuponesPedidosYa" },
      { name: "SaldoTeorico", nameRow: "SaldoTeorico" },
      { name: "DineroEntregado", nameRow: "DineroEntregado" },
      { name: "Descuadre", nameRow: "Descuadre" }

    ]


    const titleHeader = (`REPORTE DE CIERRE DE TURNO -${sucursal}`).toUpperCase()
    printCustomPDF(arrayGetOnlyProduct, columns, titleHeader, `CIERRE DE TURNO ${sucursal}`)

  }


  const generateExcel = () => {

    var arrayGetOnlyProduct: any = []
    for (let i = 0; i < rows.length; i++) {
      var objProd = {
        Usuario: rows[i].usuario,
        Fecha_Hora_Inicial: rows[i].fecha_apertura + rows[i].horario_apertura,
        Fecha_Hora_Salida: rows[i].fecha_cierre + rows[i].hora_cierre,
        RangoFacturas: rows[i].rangoFacturas,
        CantidadRecibos: rows[i].cantidadRecibos,
        MontoInicialTurno: rows[i].monto_inicial,
        TotalIngresos: rows[i].total_ingresos,
        TotalEgresos: rows[i].total_egresos,
        TotalVentasEfectivo: rows[i].monto_total_ventas_efectivo,
        TotalVentasQR: rows[i].monto_total_ventas_pago_qr,
        TotalVentaTrajDep_Cred: rows[i].monto_total_ventas_tarjeta,
        TotalVentaTransferidos: rows[i].monto_total_ventas_transferencia_bancaria,
        TotalCuponesPedidosYa: rows[i].monto_total_ventas_cupon_pedidos_ya,
        SaldoTeorico: rows[i].saldo_teorico,
        DineroEntregado: rows[i].monto_cierre,
        Descuadre: rows[i].descuadre
      }
      arrayGetOnlyProduct.push(objProd)

    }

    const columns = [
      { name: "Usuario", nameRow: "Usuario" },
      { name: "Fecha_Hora_Inicial", nameRow: "Fecha_Hora_Inicial" },
      { name: "Fecha_Hora_Salida", nameRow: "Fecha_Hora_Salida" },
      { name: "RangoFacturas", nameRow: "RangoFacturas" },
      { name: "CantidadRecibos", nameRow: "CantidadRecibos" },
      { name: "MontoInicialTurno", nameRow: "MontoInicialTurno" },
      { name: "TotalIngresos", nameRow: "TotalIngresos" },
      { name: "TotalEgresos", nameRow: "TotalEgresos" },
      { name: "TotalVentasEfectivo", nameRow: "TotalVentasEfectivo" },
      { name: "TotalVentasQR", nameRow: "TotalVentasQR" },
      { name: "TotalVentaTrajDep_Cred", nameRow: "TotalVentaTrajDep_Cred" },
      { name: "TotalVentaTransferidos", nameRow: "TotalVentaTransferidos" },
      { name: "TotalCuponesPedidosYa", nameRow: "TotalCuponesPedidosYa" },
      { name: "SaldoTeorico", nameRow: "SaldoTeorico" },
      { name: "DineroEntregado", nameRow: "DineroEntregado" },
      { name: "Descuadre", nameRow: "Descuadre" }

    ]

    const titleHeader = (`REPORTE DE CIERRE DE TURNO -${sucursal}`).toUpperCase()
    setLoading(true)
    exportToCustomCSV(arrayGetOnlyProduct, columns, titleHeader, `CIERRE DE TURNO ${sucursal}`)
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
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '0%'
        , alignItems: 'center'

      }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontFamily: 'Times New Roman' }} >
          Reporte Cierre de Turno - {sucursal}
          {/* <Button onClick={handleOpenModal3} sx={{ fontSize: '1.5em',color: 'white' }}><BiSearchAlt/></Button> */}
        </Typography>
        <div >
          <Button onClick={generateExcel} sx={{ fontSize: '1.8em', color: 'white' }}><SiMicrosoftexcel /></Button>
          <Button onClick={formatDataforPdf} sx={{ fontSize: '1.8em', color: 'white' }}><ImFilePdf /></Button>
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

              <Grid item xs={12} sm={3} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: '5px', fontFamily: 'Times New Roman' }}>Seleccione Fecha Inicial</h5>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DesktopDatePicker sx={{ width: '100%' }}
                      defaultValue={dayjs() as unknown as Date}
                      format='DD/MM/YYYY'
                      onChange={(newValue: any) => { handleChangeDateInicio(newValue) }}
                      slotProps={{ textField: { size: 'small' } }}

                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: '5px', fontFamily: 'Times New Roman' }}>Seleccione Fecha Final</h5>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DesktopDatePicker sx={{ width: '100%' }}
                      defaultValue={dayjs() as unknown as Date}
                      format='DD/MM/YYYY'
                      onChange={(newValue: any) => { handleChangeDateFinal(newValue) }}
                      slotProps={{ textField: { size: 'small' } }}

                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccion Usuario</h5>

                  <Controller
                    control={control}
                    name="usuario"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        // options={primeraCat}
                        options={usuarios}
                        noOptionsText={"Sin opciones"}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          handleSeleccioneUsuarios(item)
                          onChange(item)

                        }
                        }

                        value={value}
                        getOptionLabel={(option: any) => option.NOMBRE}
                        //getOptionLabel={(usuarios) => `${usuarios.NOMBRE} ${usuarios.AP_PATERNO} ${usuarios.AP_MATERNO}`}
                        renderOption={(props, option, index) => {
                          const key = `listItem-${index}-${option.ID_USUARIO}`;
                          return (
                            <li {...props} key={key}>

                              {/* {option[`${usuarios.NOMBRE} ${usuarios.AP_PATERNO} ${usuarios.AP_MATERNO}`]} */}
                              {option['NOMBRE']}
                            </li>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccion Primero la Categoria"
                          // error={!!errors.categoria}
                          //  helperText={errors.categoria && "Completa este campo"}
                          //  required

                          />
                        )}
                      />
                    )}
                  />

                </div>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button onClick={loadListaReporteUsuarioBuscar} sx={{ backgroundColor: '#28A745' }} variant="contained" >Buscar</Button>

                </div>
              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>

      <div style={{
        padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'start'
        , alignItems: 'end',

      }}
      // onClick={handleClick}
      >
      </div>
      <br />
      <Box sx={{ width: '100%' }}>
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
          , alignContent: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h6 style={{ padding: '0px', margin: '0px' }}>Buscar</h6>
            &nbsp;&nbsp;

            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelResearch={() => cancelSearch()}
              placeholder='Buscar'

            />
          </div>
        </div>
      </Box>

      <br />
      <TablaRepTurno rows={rows} />

      <ModalPersonalized3
        openModalPersonalized={openModal3}
        handleOpenModalPersonalized={handleOpenModal3}
        handleCloseModalPersonalized={handleCloseModal3}
        description="Perfil que desea buscar"
      />
      {loading ? <KDImage
      /> : null}
    </>
  )
}
export default ReporteCierreTurno