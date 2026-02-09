import { Typography, Button, Collapse, colors, Input, Checkbox, Grid, FormGroup, Container, Card, CardContent } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Controller, useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ModalAgregarCategoria } from './components/ModalAgregarCategoria';
import { ModalAgregarSubCat } from './components/ModalAgregarSubCat';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ModalEditarCategoria } from './components/ModalEditarCategoria';
import { ModalEditarSubCat } from './components/ModalEditarSubCat';
import { ModalBorrarCategoria } from './components/ModalEliminarCategoria';
import { ModalBorrarSubCate } from './components/ModalEliminarSubCate';
import { ModalTamaño } from './components/ModalTamaño';
import TablaProducto from './TablaProducto';
import TablaProductoEditar from './TablaEditar';
import { useProducto } from './services/useProducto';
import { PetLists } from './MultiSelect';
import { KDImage } from '../../../../core/modal-loading/KDImage';



interface User {
  id: number;
  name: string;
}

const userList: User[] = [
  { id: 1, name: "name 1" },
  { id: 2, name: "name 2" },
  { id: 3, name: "name 3" },
  { id: 4, name: "name 4" },
  { id: 5, name: "name 5" },
];



const Producto = () => {

  const [contador, setContador] = useState(0)

  const updateTextTabla = () => {
    setContador(20)

  }

  const getContador = () => {
    console.log("contador ", contador)
    console.log("contador rows ", rows)
  }
  const { loadApiPrimeraCategoria, loadApiSegundaCategoria, loadApiProductoCategoria,
    loadApiPresentacion, loadApiUnidadesMedida, loadApiTamañoProducto,
    loadApiRecuperarDatos, loadApiSucursales } = useProducto()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister, reset } = useForm();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState("a data");
  const [rows, setRows] = useState<any>([]);

  const updateTextModal = (idTamaño: string, tamaño: string, cantidad: number, sucursales: number,
    Pedidos_Ya: number, yaigo: number, ser: number, cortesias: number,
    reposiciones: number, consumo: number, desperdicio: number,
    fventas: number, fcortesias: number, fmerienda: number, fcredito: number,
    fdesperdicio: number) => {
    //setContador(10)
    // setRows([...rows,
    //   { TAMAÑO: data.tamaño}fco
    //   ]);

    setRows([...rows,
    {
      IdTamaño: idTamaño, TAMAÑO: tamaño, FRUTAS: cantidad, SUCURSALES: sucursales,
      PEDIDOS: Pedidos_Ya, YAIGO: yaigo, SER: ser,
      CORTESIAS: cortesias, REPOSICIONES: reposiciones, CONSUMO: consumo,
      DESPERDICIOS: desperdicio, VENTAS: fventas, FCORTESIAS: fcortesias,
      MERIENDA: fmerienda, CREDITO: fcredito, FDESPERDICIO: fdesperdicio
    }
    ]);
    console.log("datos modal", tamaño, "*", cantidad, "*", sucursales, "*", Pedidos_Ya, "*",
      yaigo, "*", ser, "*", cortesias, "*", reposiciones, "*", consumo, "*", desperdicio, "*",
      fventas, "*", fcortesias, "*", fmerienda, "*", fcredito, "*", fdesperdicio)
  }
  //<---modal agregar categoria
  const [openModalAgregarCategoria, setOpenModalAgregarCategoria] = useState(false);
  const handleOpenModalAgregarCategoria = () => setOpenModalAgregarCategoria(true);
  const handleCloseModalAgregarCategoria = () => setOpenModalAgregarCategoria(false);

  //<---modal agregar sub categoria
  const [openModalSubCategoria, setOpenModalSubCategoria] = useState(false);
  const handleOpenModalSubCategoria = () => setOpenModalSubCategoria(true);
  const handleCloseModalSubCategoria = () => setOpenModalSubCategoria(false);

  //<---modal editar categoria
  const [openModalEditarCategoria, setOpenModalEditarCategoria] = useState(false);
  const handleOpenModalEditarCategoria = () => setOpenModalEditarCategoria(true);
  const handleCloseModalEditarCategoria = () => setOpenModalEditarCategoria(false);

  //<---modal editar sub categoria
  const [openModalEditarSubCate, setOpenModalEditarSubCate] = useState(false);
  const handleOpenModalEditarSubCate = () => setOpenModalEditarSubCate(true);
  const handleCloseModalEditarSubCate = () => setOpenModalEditarSubCate(false);

  //<---modal borrar categoria
  const [openModalBorrarCategoria, setOpenModalBorrarCategoria] = useState(false);
  const handleOpenModalBorrarCategoria = () => setOpenModalBorrarCategoria(true);
  const handleCloseModalBorrarCategoria = () => setOpenModalBorrarCategoria(false);

  //<---modal borrar Subcategoria
  const [openModalBorrarSubCategoria, setOpenModalBorrarSubCategoria] = useState(false);
  const handleOpenModalBorrarSubCategoria = () => setOpenModalBorrarSubCategoria(true);
  const handleCloseModalBorrarSubCategoria = () => setOpenModalBorrarSubCategoria(false);

  //<---modal tamaño producto
  const [openModalTamaño, setOpenModalTamaño] = useState(false);
  const handleOpenModalTamaño = () => setOpenModalTamaño(true);
  const handleCloseModalTamaño = () => setOpenModalTamaño(false);

  //mostrar tabla
  const [activeBtnSearch, setActiveBtnSearch] = useState(false)
  const handleOpenBoton = () => setActiveBtnSearch(true);
  const handleCerrarBoton = () => setActiveBtnSearch(false);
  //mostrar botones del producto
  const [activeBtnSearchProducto, setActiveBtnSearchProducto] = useState(false)
  const handleOpenProductoBoton = () => setActiveBtnSearchProducto(true);
  const handleCerrarProductoBoton = () => setActiveBtnSearchProducto(false);
  //ocultar boton editado producto
  const [activeBtn, setActiveBtn] = useState(false)
  const handleOBoton = () => setActiveBtn(true);
  const handleCBoton = () => setActiveBtn(false);
  //mostrar tabla editado producto
  const [editarTabla, setEditarTabla] = useState(false)
  const handleOpenEditarTabla = () => setEditarTabla(true);
  const handleCerrarEditarTabla = () => setEditarTabla(false);
  //<---check
  const [value2, setValue2] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue2((event.target as HTMLInputElement).value);
  };
  //check--->

  //select new
  /*const classes = useStyles();
  
    const [value, setValue] = React.useState<any>([userList[0].name]);
  
    console.log("value: ", value);*/



  const [producto, setProducto] = useState<any>([])
  const [primeraCat, setPrimeraCat] = useState<any>([])
  const [segundaCat, setSegundaCat] = useState<any>([])
  const [productoC, setProductoC] = useState<any>([])
  const [datosItemEditar, setDatosItemEditar] = useState<any>({})
  const [datosPreciosEditar, setDatosPreciosEditar] = useState<any>([])
  const [imagenEditar, setImagenEditar] = useState('')
  const [unidadMedida, setUnidadMedida] = useState<any>([])

  const [Categoria1, setCategoria1] = useState<any>([])
  const [Categoria2, setCategoria2] = useState<any>([])
  const [Categoria3, setCategoria3] = useState<any>([])
  const [Categoria4, setCategoria4] = useState<any>([])
  const [nomCat1, setNomCat1] = useState<any>([])

  const [idPrimeraCat, setIdPrimeraCat] = useState('')
  const [nomPrimeraCat, setNomPrimeraCat] = useState('')
  const [idSegundaCat, setIdSegundaCat] = useState('')
  const [nomSegundaCat, setNomSegundaCat] = useState('')
  const [idProducto, setIdProducto] = useState('')
  const [nomProducto, setNomProducto] = useState('')
  const [idUnidadMedida, setIdUnidadMedida] = useState('')
  const [nomUnidadMedida, setNomUnidadMedida] = useState('')
  const [idTamaño, setIdTamaño] = useState([])
  const [nomTamaño, setNomTamaño] = useState([])
  const [idsSelect, setIdsSelect] = useState([])
  const [idsSucursales, setIdsSucursales] = useState([])

  const [idProductoUnico, setIdProductoUnico] = useState('')

  const [disableSubCategorySecond, setDisableSubCategorySecond] = useState(true)
  const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)
  const [disableSubCategoryThird, setDisableSubCategoryThird] = useState(true)

  const [tamaño, setTamaño] = useState<any>([])
  const [sucursales, setSucursales] = useState<any>([])
  const [listaPrecio, setListaPrecio] = useState<any>([])

  const [checkSi, setcheckSi] = useState(false)
  const [checkNo, setcheckNo] = useState(true)
  //para los input
  const [nombreProducto, setNombreProducto] = useState<string>('')
  const [detalle, setDetalle] = useState<string>('')
  const [codEconomia, setCodEconomia] = useState<string>('')
  const [codProducto, setCodProducto] = useState<string>('')
  const [precio, setPrecio] = useState<string>('')

  const pets = ["Cat", "Dog", "Bird", "Pigeon"];
  const [selectedPets, setSelectedPets] = useState([]);
  const [petInputValue, setPetInputValue] = useState("");
  const [selectedSucursal, setSelectedSucursal] = useState([]);
  const [SucursalInputValue, setSucursalInputValue] = useState("");
  //setUltimoDato(selectedPets.length-1)
  console.log(selectedPets);
  //console.log("ultimo dato",selectedPets[selectedPets.length - 1])
  const datosUltimos = selectedPets[selectedPets?.length - 1]
  //console.log("datos a mandar",datos)
  //setUltimoDato(selectedPets[selectedPets.length - 1])
  const { errors } = formState;

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadObtenerPrimeraCategoria()
    loadObtenerUnidadesMedida()
    loadObtenerTamañoProducto()
    //loadSucursales()

    //setValue("UnidadMedidaE",)
  }, []);

  //loading
  const [loading, setLoading] = useState(
    false
  );



  const loadObtenerPrimeraCategoria = async () => {


    try {
      //setLoading(true)
      const response = await loadApiPrimeraCategoria()
      //setLoading(false)
      console.log("lista primera categoria ", response.primeraCategoria)

      if (response?.status && response?.primeraCategoria) {
        setPrimeraCat(response.primeraCategoria)
        //setoriginalRows(response.usuarios)
      }

    } catch (error) {

    }

  }

  const loadObtenerSegundaCategoria = async (idPrimeraCat: number) => {
    try {
      const response = await loadApiSegundaCategoria(idPrimeraCat);
      console.log("response categoria segunda", response)
      if (response?.status && response?.segundaCategoria) {
        if (Array.isArray(response.segundaCategoria)) {

          setSegundaCat(response.segundaCategoria)
          //actulizar select
        }
      }

    } catch (error) {

    }
  }

  const loadObtenerProducto = async (idSegundaCat: number) => {
    try {
      const response = await loadApiProductoCategoria(idSegundaCat);
      console.log("response Producto", response)
      if (Array.isArray(response.productomadre)) {

        setProductoC(response.productomadre)
        //actulizar select
      }

    } catch (error) {

    }
  }


  const loadObtenerUnidadesMedida = async () => {


    try {
      //setLoading(true)
      const response = await loadApiUnidadesMedida()
      //setLoading(false)
      console.log("lista inidades medida ", response)

      if (response?.status && response?.unidadesMedida) {
        setUnidadMedida(response.unidadesMedida)
        //setoriginalRows(response.usuarios)
      }

    } catch (error) {

    }

  }

  const loadSucursales = async () => {


    try {
      const response = await loadApiSucursales()
      console.log("list sucursales ", response)
      if (Array.isArray(response?.sucursales)) {
        setSucursales(response?.sucursales)
      }
    } catch (error) {

    }

  }

  const loadObtenerTamañoProducto = async () => {


    try {
      //setLoading(true)
      const response = await loadApiTamañoProducto()
      //setLoading(false)
      console.log("lista tamaño producto ", response)

      if (response?.status && response?.tamProductos) {
        setTamaño(response.tamProductos)
        //setoriginalRows(response.usuarios)
      }
      if (response?.status && response?.listasPrecios) {
        setListaPrecio(response.listasPrecios)
        //setoriginalRows(response.usuarios)
      }

    } catch (error) {

    }

  }

  const loadObtenerDatos = async () => {

    try {
      setLoading(true)
      const response = await loadApiRecuperarDatos(Number(idProducto))

      console.log("lista datos ", response)
      setLoading(false)
      if (response?.status && response?.item) {
        setDatosItemEditar(response.item)
        setValue("EditarP", response?.item.PRODUCTO_MADRE)
        setValue("Detalle", response?.item.DETALLE)
        setValue("Economica", response?.item.CODIGO_ACTIVIDAD_ECONOMICA)
        setValue("CodProducto", response?.item.CODIGO_PRODUCTO_SIN)
        setValue("PrecioEdit", response?.item.PRECIO_TRANSPORTE)

        var itemUnidadMedida = unidadMedida?.find((x: any) => x.CODIGO == response?.item.CODIGO_UNIDAD_MEDIDA)
        //var itemTamañoProducto = tamaño?.find((x: any) => x.ID_TAMAÑO == response?.precios.id_tam)

        console.log(" item ", itemUnidadMedida)
        //console.log("tamaño",itemTamañoProducto)
        if (itemUnidadMedida) {

          var descripcion_temp = itemUnidadMedida.DESCRIPCION;
          console.log(" ddes ", descripcion_temp)
          setValue("UnidadMedidaEditar", itemUnidadMedida)
          // setValue("UnidadMedidaEditar",")
        }
      }
      if (response?.status && response?.precios) {
        setDatosPreciosEditar(response.precios)
        console.log("datos precios", response.precios)
      }
      if (response?.status && response?.ruta_imagen) {
        setImagenEditar(response.ruta_imagen)
      }
      //console.log("imagen",imagenEditar)



    } catch (error) {

    }

  }

  /*const Actualizar = () => {
    setValue("EditarP",datosItemEditar.PRODUCTO_MADRE)
    setValue("Detalle",datosItemEditar.DETALLE)
    setValue("Economica",datosItemEditar.CODIGO_ACTIVIDAD_ECONOMICA)
    setValue("CodProducto",datosItemEditar.CODIGO_PRODUCTO_SIN)
    setValue("UnidadMedidaE",datosItemEditar.CODIGO_UNIDAD_MEDIDA)
  }*/

  const handleSeleccionePrimeraCategoria = async (value: any) => {

    console.log("valee de primera Cate ", value)
    const { ID_CATEGORIA, CATEGORIA } = value
    setIdPrimeraCat(ID_CATEGORIA)
    setNomPrimeraCat(CATEGORIA)
    setValue("subcategoria", "")
    setValue("producto", "")
    setValue("sucursales", "")
    setSegundaCat([])
    await loadObtenerSegundaCategoria(ID_CATEGORIA);
    //setDisableSubCategorySecond(false)
    setDisableSubCategoryFrist(false)

  }

  const handleSeleccioneSegundaCategoria = async (value: any) => {
    console.log("valee de segunda Cate ", value)
    const { ID_CATEGORIA_2, CATEGORIA_2 } = value
    setIdSegundaCat(ID_CATEGORIA_2)
    setNomSegundaCat(CATEGORIA_2)
    setValue("producto", "")
    setValue("sucursales", "")
    setProductoC([])
    await loadObtenerProducto(ID_CATEGORIA_2);
    await loadSucursales()
    setDisableSubCategorySecond(false)

  }

  const handleSeleccioneProducto = async (value: any) => {
    console.log("valee de producto ", value)
    const { ID_PRODUCTO_MADRE, PRODUCTO } = value
    setIdProducto(ID_PRODUCTO_MADRE)
    setNomProducto(PRODUCTO)
    setValue("sucursales", "")
    setSucursales([])
    await loadSucursales()
    //await loadObtenerPresentacion(ID_PRODUCTO_MADRE);
    setDisableSubCategoryThird(false)

  }

  const handleSeleccioneUnidadMedida = (value: any) => {
    console.log("valee de unidad medida ", value)
    const { CODIGO, DESCRIPCION } = value
    setIdUnidadMedida(CODIGO)
    setNomUnidadMedida(DESCRIPCION)
    //setDisableSubCategorySecond(false)

  }

  const handleSeleccioneTamaño = (value: any) => {
    console.log("valee de Tamaño ", value)
    const { ID_TAMAÑO, TAMAÑO } = value
    setIdTamaño(ID_TAMAÑO)
    setNomTamaño(TAMAÑO)
    const selectedIds = value.map((option: any) => option.ID_TAMAÑO)
    console.log("id seleccionados", selectedIds)
    setIdsSelect(selectedIds)
    //setIdsSelect(value.map((option:any) => option.ID_TAMAÑO))
    //console.log("id seleccionados",idsSelect,"*")
  }

  const handleSeleccioneSucursal = (value: any) => {
    console.log("valee sucursal ", value)
    const { SUCURSAL, DESCRIPCION } = value
    //setIdTamaño(SUCURSAL)
    setNomTamaño(DESCRIPCION)
    const selectedIdsSucursal = value.map((option: any) => option.SUCURSAL)
    console.log("id seleccionados sucursal", selectedIdsSucursal)
    setIdsSucursales(selectedIdsSucursal)
    //setIdsSelect(value.map((option:any) => option.ID_TAMAÑO))
    //console.log("id seleccionados",idsSelect,"*")
  }

  const result = () => {
    console.log("id seleccionados", idsSelect, "*")
  }

  const handlecheckSi = () => {

    setcheckSi(!checkSi)

    if (!checkSi) {
      setcheckNo(false);

    } else {
      setcheckNo(true)

    }



  }

  const handlecheckNo = () => {


    setcheckNo(!checkNo)

    if (!checkNo) {
      setcheckSi(false);

    } else {
      setcheckSi(true)

    }

  }


  const onChangeNameProducto = (event: any) => {
    console.log("nombre producto ", event.target.value)
    setNombreProducto(event.target.value)

  }

  const onChangeNameDetalle = (event: any) => {
    console.log("nombre detalle ", event.target.value)
    setDetalle(event.target.value)

  }

  const onChangeCodEconomia = (event: any) => {
    console.log("nombre codigo economia ", event.target.value)
    setCodEconomia(event.target.value)

  }

  const onChangeCodProducto = (event: any) => {
    console.log("nombre codigo producto ", event.target.value)
    setCodProducto(event.target.value)

  }

  const onChangePrecio = (event: any) => {
    console.log("precio ", event.target.value)
    setPrecio(event.target.value)

  }

  // const handleSave = () => {
  //   const selectedIds = tamaño.map(option => option.ID_TAMAÑO);
  //   console.log(selectedIds); // Aquí obtienes los IDs seleccionados
  // };

  //metodo para eliminar elementos
  const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)

    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

  const [state, setState] = useState({
    file: null,
    base64URL: ""
  });

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log("info base Url", baseURL);
        resolve(baseURL);
      };
      console.log("file info iii", fileInfo);
    });
  };

  const handleFileInputChange = (e: any) => {
    console.log("##############################")
    console.log("info imagen", e.target.files[0]);
    let { file } = state;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setState({
          base64URL: result,
          file
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setState({
      file: e.target.files[0]
    });
  };


  //subir imagen--->
  // const [archivo, setArchivo]=useState(null);

  // const subirArchivo =e=>{
  //     setArchivo(e);
  // }

  // const InsertarImagen=async()=>{
  //     const f = new FormData();

  //     for(let index = 0; index < archivo.length; index++){
  //         f.append("files", archivo[index]);
  //     }
  //     await axios.post("",f)
  //     .then(response=>{
  //         console.log(response.data);
  //     }).catch(error=>{
  //         console.log(error);
  //     })
  // }
  //<----subir imagen
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
        , alignItems: 'center', position: "fixed", width: "97%"
      }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontFamily: 'Times New Roman' }} >
          Productos
        </Typography>
      </div>
      <br />
      <br />
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
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h5 style={{ padding: '0px', margin: '0.5px', fontFamily: 'Times New Roman' }}>Categoria</h5>
                    <AddIcon sx={{
                      backgroundColor: '#17A2B8', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalAgregarCategoria}
                    />
                    <BorderColorIcon sx={{
                      backgroundColor: '#FFC107', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalEditarCategoria}
                    />
                    <DeleteForeverIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalBorrarCategoria}
                    />
                  </div>
                  <Controller
                    control={control}
                    name="categoria"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={primeraCat}
                        noOptionsText={"Sin opciones"}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          handleSeleccionePrimeraCategoria(item)
                          onChange(item)

                        }
                        }

                        value={value}
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


                        getOptionLabel={(option: any) => option.CATEGORIA}


                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h5 style={{ padding: '0px', margin: '0.5px', fontFamily: 'Times New Roman' }}>SubCategoria</h5>
                    <AddIcon sx={{
                      backgroundColor: '#17A2B8', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalSubCategoria}
                    />
                    <BorderColorIcon sx={{
                      backgroundColor: '#FFC107', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalEditarSubCate}
                    />
                    <DeleteForeverIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalBorrarSubCategoria}
                    />
                  </div>
                  <Controller
                    control={control}
                    name="subcategoria"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        clearOnBlur={true}
                        options={segundaCat}
                        noOptionsText={"Sin opciones"}
                        disabled={disableSubCategoryFrist}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item, reason) => {

                          if (reason === 'clear') {
                            console.log("Put your clear logic here: this condition executed when clear button clicked")
                            // setValue({ SUB_CATEGORIA_1: '' }) //for reset the value
                            return
                          }

                          handleSeleccioneSegundaCategoria(item)
                          onChange(item)

                        }
                        }

                        //value={value}
                        value={value || null}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccion Segunda Categoria"
                          //  error={!!errors.subcategoria}
                          //  helperText={errors.subcategoria && "Completa este campo"}
                          //  required

                          />
                        )}


                        getOptionLabel={(option: any) => option.CATEGORIA_2}


                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h5 style={{ padding: '0px', margin: '0.5px', fontFamily: 'Times New Roman' }}>Seleccione el producto</h5>
                    <AddIcon sx={{
                      backgroundColor: '#17A2B8', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={() => {
                        handleOpenBoton()
                        handleCerrarEditarTabla()
                        handleCerrarProductoBoton()
                      }}
                    />
                    {activeBtnSearchProducto ?
                      <>
                        {activeBtn ?
                          <BorderColorIcon sx={{
                            backgroundColor: '#FFC107', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                            marginLeft: '10px', marginBottom: '10px'
                            , fontWeight: 'bold'
                          }}
                            onClick={() => {
                              loadObtenerDatos()
                              handleOpenEditarTabla()
                              handleCBoton()

                            }}
                          />
                          : null}
                        <DeleteForeverIcon sx={{
                          backgroundColor: '#DC3545', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                          marginLeft: '10px', marginBottom: '10px'
                          , fontWeight: 'bold'
                        }}
                        />
                      </>
                      : null}
                  </div>
                  <Controller
                    control={control}
                    name="producto"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={productoC}
                        noOptionsText={"Sin opciones"}
                        disabled={disableSubCategorySecond}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          handleSeleccioneProducto(item)
                          onChange(item)
                          handleOBoton()
                          handleCerrarEditarTabla()
                          handleCerrarBoton()
                          handleOpenProductoBoton()
                        }
                        }

                        //value={value}
                        value={value || null}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccione el Producto"
                          // error={!!errors.categoria}
                          // helperText={errors.categoria && "Completa este campo"}
                          //  required

                          />
                        )}


                        getOptionLabel={(option: any) => option.PRODUCTO}


                      />
                    )}
                  />
                </div>
              </Grid>
             

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>
      <br />
      {activeBtnSearch ?
        <Card>
          <CardContent>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={3} md={3}>
                <div >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Producto</h6>
                  </div>
                  <TextField id="outlined-basic"
                    size='small'
                    sx={{ width: '100%' }}
                    label="Nombre del Producto"
                    variant="outlined"
                    onChange={onChangeNameProducto}
                    value={nombreProducto}
                  />

                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Detalle del producto</h6>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese el detalle"
                    variant="outlined"
                    size='small'
                    sx={{ width: '100%' }}
                    multiline
                    rows={2}
                    onChange={onChangeNameDetalle}
                    value={detalle}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Seleccione Sucursal</h6>
                  </div>
                  <React.Fragment>

                    <Autocomplete
                      multiple
                      style={{ width: "100%" }}
                      options={sucursales}
                      noOptionsText={"Sin opciones"}
                      //disabled={disableSubCategorySecond}
                      onChange={(event, newPet: any) => {
                        setSelectedSucursal(newPet);
                        handleSeleccioneSucursal(newPet)
                        //onChange(newPet)
                        //handleOpenModalTamaño()
                      }}

                      inputValue={SucursalInputValue}
                      onInputChange={(event, newPetInputValue) => {
                        setSucursalInputValue(newPetInputValue);
                        //onChange(newPetInputValue)
                      }}
                      // value={value}
                      renderInput={(params) => (
                        <TextField
                          label='Seleccione Sucursal' {...params}
                          size="small"
                          /*inputProps={register('currency', {
                            required: 'Seleccione este campo',
                          })}
                          error={errors.currency}
                          helperText={errors ? errors.currency?.message : null}*/
                        />
                      )}
                      getOptionLabel={(option: any) => option.DESCRIPCION}
                    ></Autocomplete>
                  </React.Fragment>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px' }}>Selecciona unidad de medida</h6>
                  </div>
                  <Controller
                    control={control}
                    name="UnidadMedida"
                    //rules={{ required: true }}
                    render={({ field: { value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={unidadMedida}
                        sx={{ width: '100%' }}
                        noOptionsText={"Sin opciones"}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, value) =>
                          handleSeleccioneUnidadMedida(value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccione Unidad de Medida"
                            InputProps={{
                              ...params.InputProps,

                              //disableUnderline: true
                            }}
                          />
                        )}


                        getOptionLabel={(option: any) => option.DESCRIPCION}


                      />
                    )}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <h6 style={{ padding: '0px', margin: '0px' }}>¿Incluira transporte?</h6> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item xs={6}>
                        <FormGroup sx={{ width: '100%' }}>
                          <Typography variant="subtitle1" gutterBottom sx={{
                            margin: 0, padding: 0, marginLeft: '3px',
                            color: 'black', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                          }}>
                            ¿Incluira transporte?
                          </Typography>

                          <FormControlLabel
                            control={
                              <Checkbox checked={checkNo}

                                sx={{ margin: 0, padding: 0 }}
                                size='small'
                                onChange={handlecheckNo} defaultChecked />
                            }
                            label="NO"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkSi}
                                sx={{ margin: 0, padding: 0 }}
                                size='small'
                                onChange={handlecheckSi}
                              //onClick={(e) => handlecheckSi(e)}


                              />
                            }

                            label="SI"
                          />

                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <br />
                        {checkSi == true ?
                          <>
                            <TextField
                              id="outlined-basic"
                              label="Precio"
                              variant="outlined"
                              type="number"
                              size='small'
                              sx={{ width: '100%' }}
                              onChange={onChangePrecio}
                              value={precio}
                            />
                          </>
                          : null}
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={0} sm={0} md={12}>
                    <h6 style={{ padding: '0px', margin: '0px' }}>Cod.Act.Economia</h6>
                    <TextField
                      id="outlined-basic"
                      label="561003"
                      variant="outlined"
                      size='small'
                      sx={{ width: '100%' }}
                      onChange={onChangeCodEconomia}
                      value={codEconomia}
                    />

                  </Grid>
                  &nbsp; &nbsp;
                  <Grid item xs={0} sm={0} md={12}>
                    <h6 style={{ padding: '0px', margin: '0px' }}>Cod. Producto SIN</h6>
                    <TextField
                      id="outlined-basic"
                      label="94561"
                      variant="outlined"
                      size='small'
                      sx={{ width: '100%' }}
                      onChange={onChangeCodProducto}
                      value={codProducto}
                    />
                  </Grid>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Seleccione tamaño de producto:</h6>
                  </div>
                  <React.Fragment>

                    <Autocomplete
                      multiple
                      style={{ width: "100%" }}
                      options={tamaño}
                      onChange={(event, newPet: any) => {
                        setSelectedPets(newPet);
                        handleSeleccioneTamaño(newPet)
                        handleOpenModalTamaño()
                      }}

                      inputValue={petInputValue}
                      onInputChange={(event, newPetInputValue) => {
                        setPetInputValue(newPetInputValue);

                      }}
                      renderInput={(params) => (
                        <TextField
                          label='Seleccione Tamaño' {...params}
                          size="small" />
                      )}
                      getOptionLabel={(option: any) => option.TAMAÑO}
                    ></Autocomplete>
                  </React.Fragment>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Subir imagen del producto:</h6>
                  </div>
                  {/* <input type='file' name='images' 
                                    style={{fontSize: '0.7rem', fontFamily:'Times New Roman'}}>
                                    </input> */}
                  <input type="file" name="file" onChange={handleFileInputChange} />
                  <center>
                    <img
                      src={state.base64URL}
                      //src={file =! null ? state.base64URL:"https://i.ibb.co/z2wFd7Z/default-image.jpg"}
                      id="nuevaImagen"
                      className="img-thumbnail previsualizar"
                      alt="not found"
                      width="120px"
                    />
                  </center>
                </div>
                {/* <button onClick={() => console.log("imprimir url ", state)}>
                                  Show imagen
                                </button> */}
                {/* <button onClick={result}>prueba</button> */}
              </Grid>

            </Grid>
            <Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TablaProducto
                  handleSubmit={handleSubmit}
                  control={control}
                  getValues={getValues}
                  setValue={setValue}
                  register={register}
                  rows={rows}
                  ultimoDato={datosUltimos}
                  updateTextTabla={updateTextTabla}
                  deleteByIndex={(index: any) => deleteByIndex(index)}
                  getContador={getContador}
                  idSegundaCat={idSegundaCat}
                  nombreProducto={nombreProducto}
                  detalle={detalle}
                  idUnidadMedida={idUnidadMedida}
                  codEconomia={codEconomia}
                  codProducto={codProducto}
                  checkSi={checkSi}
                  precio={precio}
                  state={state}
                  listaPrecio={listaPrecio}
                  idTamaño={idTamaño}
                  selectedPets={selectedPets}
                  idsSelect={idsSelect}
                  idsSucursales={idsSucursales}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        : null}

      {editarTabla ?
        <Card>
          <h3>editar</h3>
          <CardContent>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={3} md={3}>
                <div >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Producto</h6>
                  </div>
                  <Controller
                    name="EditarP"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic"
                        variant="outlined"
                        sx={{
                          width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        //label="Nombre del Producto"
                        //error={!!error}
                        //helperText={error ? error.message : null}
                        size="small"


                      />
                    )}


                  />

                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Detalle del producto</h6>
                  </div>
                  <Controller
                    name="Detalle"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField id="outlined-basic"
                        variant="outlined"
                        sx={{
                          width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        //label="Nombre del Producto"
                        //error={!!error}
                        //helperText={error ? error.message : null}
                        size="small"
                        multiline
                        rows={2}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px' }}>Selecciona unidad de medida</h6>
                  </div>
                  <Controller
                    control={control}
                    name="UnidadMedidaEditar"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      // render={({ field: {  value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={unidadMedida}
                        sx={{ width: '100%' }}
                        noOptionsText={"Sin opciones"}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          handleSeleccioneUnidadMedida(item)
                          onChange(item)
                        }

                        }
                        value={value}
                        defaultValue={getValues("UnidadMedidaEditar")}
                        getOptionLabel={(option: any) => option.DESCRIPCION || ""}
                        renderOption={(props, option, index) => {
                          const key = `listItem-${index}-${option.CODIGO}`;
                          return (
                            <li {...props} key={key}>

                              {option['DESCRIPCION']}
                            </li>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccione Unidad de Medida"
                            InputProps={{
                              ...params.InputProps,

                              //disableUnderline: true
                            }}
                          />
                        )}

                      // getOptionLabel={(option) => option.name || ""}


                      />
                    )}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <h6 style={{ padding: '0px', margin: '0px' }}>¿Incluira transporte?</h6> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item xs={6}>
                        <FormGroup sx={{ width: '100%' }}>
                          <Typography variant="subtitle1" gutterBottom sx={{
                            margin: 0, padding: 0, marginLeft: '3px',
                            color: 'black', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                          }}>
                            ¿Incluira transporte?
                          </Typography>

                          <FormControlLabel
                            control={
                              <Checkbox checked={checkNo}

                                sx={{ margin: 0, padding: 0 }}
                                size='small'
                                onChange={handlecheckNo} defaultChecked />
                            }
                            label="NO"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkSi}
                                sx={{ margin: 0, padding: 0 }}
                                size='small'
                                onChange={handlecheckSi}
                              //onClick={(e) => handlecheckSi(e)}


                              />
                            }

                            label="SI"
                          />

                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <br />
                        {checkSi == true ?
                          <>
                            <Controller
                              name="PrecioEdit"
                              control={control}
                              render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField id="outlined-basic"
                                  variant="outlined"
                                  sx={{
                                    width: '100%',
                                  }}
                                  value={value}
                                  onChange={onChange}
                                  type='number'
                                  //label="Nombre del Producto"
                                  //error={!!error}
                                  //helperText={error ? error.message : null}
                                  size="small"


                                />
                              )}


                            />
                          </>
                          : null}
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={0} sm={0} md={12}>
                    <h6 style={{ padding: '0px', margin: '0px' }}>Cod.Act.Economia</h6>
                    <Controller
                      name="Economica"
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic"
                          variant="outlined"
                          sx={{
                            width: '100%',
                          }}
                          value={value}
                          onChange={onChange}
                          //label="561003"
                          //error={!!error}
                          //helperText={error ? error.message : null}
                          size="small"
                        />
                      )}
                    />

                  </Grid>
                  &nbsp; &nbsp;
                  <Grid item xs={0} sm={0} md={12}>
                    <h6 style={{ padding: '0px', margin: '0px' }}>Cod. Producto SIN</h6>
                    <Controller
                      name="CodProducto"
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic"
                          variant="outlined"
                          sx={{
                            width: '100%',
                          }}
                          value={value}
                          onChange={onChange}
                          //label="94561"
                          //error={!!error}
                          //helperText={error ? error.message : null}
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Seleccione tamaño de producto:</h6>
                  </div>
                  <React.Fragment>

                    <Autocomplete
                      multiple
                      style={{ width: "100%" }}
                      options={tamaño}
                      onChange={(event, newPet: any) => {
                        setSelectedPets(newPet);
                        handleSeleccioneTamaño(newPet)
                        handleOpenModalTamaño()
                      }}

                      inputValue={petInputValue}
                      onInputChange={(event, newPetInputValue) => {
                        setPetInputValue(newPetInputValue);

                      }}
                      renderInput={(params) => (
                        <TextField
                          label='Seleccione Tamaño' {...params}
                          size="small" />
                      )}
                      getOptionLabel={(option: any) => option.TAMAÑO}
                    ></Autocomplete>
                  </React.Fragment>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Subir imagen del producto:</h6>
                  </div>
                  {/* <input type='file' name='images' 
                                    style={{fontSize: '0.7rem', fontFamily:'Times New Roman'}}>
                                    </input> */}
                  <input type="file" name="file" onChange={handleFileInputChange} />
                  <center>
                    <img
                      src={`${imagenEditar}${datosItemEditar.IMAGEN}`}
                      //src={"https://i.ibb.co/z2wFd7Z/default-image.jpg"}
                      id="editImagen"
                      className="img-thumbnail previsualizar"
                      alt="not found"
                      //alt="https://i.ibb.co/z2wFd7Z/default-image.jpg"
                      width="120px"
                    />
                  </center>
                </div>
                {/* <button onClick={() => console.log("imprimir url ", state)}>
                                  Show imagen
                                </button> */}
                {/* <button onClick={()=> console.log(getValues())}>get values </button> */}
              </Grid>
            </Grid>
            <Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TablaProductoEditar
                  handleSubmit={handleSubmit}
                  control={control}
                  getValues={getValues}
                  setValue={setValue}
                  register={register}
                  rows={datosPreciosEditar}
                  ultimoDato={datosUltimos}
                  updateTextTabla={updateTextTabla}
                  deleteByIndex={(index: any) => deleteByIndex(index)}
                  getContador={getContador}
                  idSegundaCat={idSegundaCat}
                  nombreProducto={nombreProducto}
                  detalle={detalle}
                  idUnidadMedida={idUnidadMedida}
                  codEconomia={codEconomia}
                  codProducto={codProducto}
                  checkSi={checkSi}
                  precio={precio}
                  state={state}
                  listaPrecio={listaPrecio}
                  idTamaño={idTamaño}
                  selectedPets={selectedPets}
                  idsSelect={idsSelect}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        : null}

      <ModalAgregarCategoria
        openModalAgregarCategoria={openModalAgregarCategoria}
        handleOpenModalAgregarCategoria={handleOpenModalAgregarCategoria}
        handleCloseModalAgregarCategoria={handleCloseModalAgregarCategoria}
        loadObtenerPrimeraCategoria={loadObtenerPrimeraCategoria}
      />

      <ModalAgregarSubCat
        openModalSubCategoria={openModalSubCategoria}
        handleOpenModalSubCategoria={handleOpenModalSubCategoria}
        handleCloseModalSubCategoria={handleCloseModalSubCategoria}
        loadObtenerSegundaCategoria={loadObtenerSegundaCategoria}
        idPrimeraCat={idPrimeraCat}
        nomPrimeraCat={nomPrimeraCat}
      />

      <ModalEditarCategoria
        openModalEditarCategoria={openModalEditarCategoria}
        handleOpenModalEditarCategoria={handleOpenModalEditarCategoria}
        handleCloseModalEditarCategoria={handleCloseModalEditarCategoria}
        loadObtenerPrimeraCategoria={loadObtenerPrimeraCategoria}
        nomPrimeraCat={nomPrimeraCat}
        idPrimeraCat={idPrimeraCat}
      />

      <ModalEditarSubCat
        openModalEditarSubCate={openModalEditarSubCate}
        handleOpenModalEditarSubCate={handleOpenModalEditarSubCate}
        handleCloseModalEditarSubCate={handleCloseModalEditarSubCate}
        loadObtenerSegundaCategoria={loadObtenerSegundaCategoria}
        idPrimeraCat={idPrimeraCat}
        nomPrimeraCat={nomPrimeraCat}
        idSegundaCat={idSegundaCat}
        nomSegundaCat={nomSegundaCat}
      />

      <ModalBorrarCategoria
        openModalBorrarCategoria={openModalBorrarCategoria}
        handleOpenModalBorrarCategoria={handleOpenModalBorrarCategoria}
        handleCloseModalBorrarCategoria={handleCloseModalBorrarCategoria}
        loadObtenerPrimeraCategoria={loadObtenerPrimeraCategoria}
        idPrimeraCat={idPrimeraCat}
      />

      <ModalBorrarSubCate
        openModalBorrarSubCategoria={openModalBorrarSubCategoria}
        handleOpenModalBorrarSubCategoria={handleOpenModalBorrarSubCategoria}
        handleCloseModalBorrarSubCategoria={handleCloseModalBorrarSubCategoria}
        loadObtenerSegundaCategoria={loadObtenerSegundaCategoria}
        idSegundaCat={idSegundaCat}
        idPrimeraCat={idPrimeraCat}
      />

      <ModalTamaño
        openModalTamaño={openModalTamaño}
        handleOpenModalTamaño={handleOpenModalTamaño}
        handleCloseModalTamaño={handleCloseModalTamaño}
        ultimoDato={datosUltimos}
        handleSubmit={handleSubmit}
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}

        updateTextModal={updateTextModal}
        updateTextTabla={updateTextTabla}
        getContador={getContador}
      />

      {loading ? <KDImage /> : null}

    </>
  )
}
export default Producto