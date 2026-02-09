import React, { useState, useEffect } from 'react'
import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, Grid, TextField, Card, CardContent } from '@mui/material'
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Controller, useForm } from "react-hook-form";
import { useProductosInventario } from './services/useProductoInventario';
import { ModalAgregarCategoriaInventario } from './components/ModalNewCategoriaInventario';
import { ModalEditarCategoriaInventario } from './components/ModalEditarCategoriaInv';
import { ModalBorrarCategoriaInventario } from './components/ModalBorrarCategoriaInv';
import { ModalAgregarSubCatInventario } from './components/ModalNewSubCategoria';
import { ModalEditarSubCatInventario } from './components/ModalEditarSubCategoriaInv';
import { ModalBorrarSubCategoriaInventario } from './components/ModalBorrarSubCategoria';



const ProductoInventarioNew = () => {
  const { formState, handleSubmit, control, register, getValues, setValue, unregister, reset } = useForm();
  const { loadApiListarCategoriaInventario, loadApiListarSubCategoriaInventario,
    loadApiListarProductosInventario } = useProductosInventario()

  //<---modal agregar categoria
  const [openModalAgregarCategoriaINV, setOpenModalAgregarCategoriaINV] = useState(false);
  const handleOpenModalAgregarCategoriaINV = () => setOpenModalAgregarCategoriaINV(true);
  const handleCloseModalAgregarCategoriaINV = () => setOpenModalAgregarCategoriaINV(false);

  //<---modal editar categoria
  const [openModalEditarCategoriaINV, setOpenModalEditarCategoriaINV] = useState(false);
  const handleOpenModalEditarCategoriaINV = () => setOpenModalEditarCategoriaINV(true);
  const handleCloseModalEditarCategoriaINV = () => setOpenModalEditarCategoriaINV(false);

  //<---modal borrar categoria
  const [openModalBorrarCategoriaINV, setOpenModalBorrarCategoriaINV] = useState(false);
  const handleOpenModalBorrarCategoriaINV = () => setOpenModalBorrarCategoriaINV(true);
  const handleCloseModalBorrarCategoriaINV = () => setOpenModalBorrarCategoriaINV(false);

  //<---modal agregar sub categoria
  const [openModalSubCategoria, setOpenModalSubCategoria] = useState(false);
  const handleOpenModalSubCategoria = () => setOpenModalSubCategoria(true);
  const handleCloseModalSubCategoria = () => setOpenModalSubCategoria(false);

  //<---modal editar sub categoria
  const [openModalEditarSubCate, setOpenModalEditarSubCate] = useState(false);
  const handleOpenModalEditarSubCate = () => setOpenModalEditarSubCate(true);
  const handleCloseModalEditarSubCate = () => setOpenModalEditarSubCate(false);

  //<---modal borrar subcategoria
  const [openModalBorrarSubCategoriaINV, setOpenModalBorrarSubCategoriaINV] = useState(false);
  const handleOpenModalBorrarSubCategoriaINV = () => setOpenModalBorrarSubCategoriaINV(true);
  const handleCloseModalBorrarSubCategoriaINV = () => setOpenModalBorrarSubCategoriaINV(false);

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)
  const handleOpenBoton = () => setActiveBtnSearch(true);
  const handleCerrarBoton = () => setActiveBtnSearch(false);

  const [primeraCat, setPrimeraCat] = useState<any>([])
  const [subCategoria, setSubCategoria] = useState<any>([])
  const [productos, setProductos] = useState<any>([])

  const [idPrimeraCat, setIdPrimeraCat] = useState('')
  const [nomPrimeraCat, setNomPrimeraCat] = useState('')
  const [color_r, setColor_r] = useState('')
  const [color_g, setColor_g] = useState('')
  const [color_b, setColor_b] = useState('')
  const [estado, setEstado] = useState('')
  const [idSubCategoria, setIdSubCategoria] = useState('')
  const [nomSubCategoria, setNomSubCategoria] = useState('')

  const [disableSubCategorySecond, setDisableSubCategorySecond] = useState(true)
  const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)
  const [disableSubCategoryThird, setDisableSubCategoryThird] = useState(true)

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadObtenerCategoria()
    //loadObtenerSubCategoria()
    //loadObtenerProductosInventario()

  }, []);

  const loadObtenerCategoria = async () => {


    try {
      //setLoading(true)
      const response = await loadApiListarCategoriaInventario()
      //setLoading(false)
      console.log("lista categoria ", response)

      if (response?.status && response?.categorias) {
        setPrimeraCat(response.categorias)
        //setoriginalRows(response.usuarios)
      }

    } catch (error) {

    }

  }

  const loadObtenerSubCategoria = async (idPrimeraCat: string) => {
    try {
      const response = await loadApiListarSubCategoriaInventario(idPrimeraCat);
      console.log("response categoria segunda", response)

      if (response?.status && response?.subcategorias1) {
        setSubCategoria(response.subcategorias1)
        //setoriginalRows(response.usuarios)
      }

    } catch (error) {

    }
  }

  const loadObtenerProductosInventario = async (idSubCategoria: string) => {


    try {
      //setLoading(true)
      const response = await loadApiListarProductosInventario(idSubCategoria)
      //setLoading(false)
      console.log("lista productos ", response)

      if (response?.status && response?.subcategorias2) {
        setProductos(response.subcategorias2)
        //setoriginalRows(response.usuarios)
      }

    } catch (error) {

    }

  }

  const handleSeleccionePrimeraCategoria = async (value: any) => {

    console.log("valee de primera Cate ", value)
    const { ID_CATEGORIA, CATEGORIA, COLOR_R, COLOR_G, COLOR_B, ESTADO } = value
    setIdPrimeraCat(ID_CATEGORIA)
    setNomPrimeraCat(CATEGORIA)
    setColor_r(COLOR_R)
    setColor_g(COLOR_G)
    setColor_b(COLOR_B)
    setEstado(ESTADO)
    setValue("subcategoria", "")
    setValue("producto", "")
    setSubCategoria([])
    await loadObtenerSubCategoria(ID_CATEGORIA);
    //setDisableSubCategorySecond(false)
    setDisableSubCategoryFrist(false)

  }

  const handleSeleccioneSegundaCategoria = async (value: any) => {
    console.log("valee de segunda Cate ", value)
    const { ID_SUB_CATEGORIA_1, CATEGORIA_2 } = value
    setIdSubCategoria(ID_SUB_CATEGORIA_1)
    setNomSubCategoria(CATEGORIA_2)
    setValue("producto", "")
    //setProductoC([])
    await loadObtenerProductosInventario(ID_SUB_CATEGORIA_1);
    setDisableSubCategorySecond(false)

  }

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div>
      <div style={{
        backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '0%'
        , alignItems: 'center', position: "fixed", width: "97%"
      }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontFamily: 'Times New Roman' }} >
          Productos-Inventario
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
                      onClick={handleOpenModalAgregarCategoriaINV}
                    />
                    <BorderColorIcon sx={{
                      backgroundColor: '#FFC107', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalEditarCategoriaINV}
                    />
                    <DeleteForeverIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={handleOpenModalBorrarCategoriaINV}
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
                    onClick={handleOpenModalBorrarSubCategoriaINV}
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
                        options={subCategoria}
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
                        getOptionLabel={(option: any) => option.SUB_CATEGORIA_1}
                        renderOption={(props, option, index) => {
                          const key = `listItem-${index}-${option.ID_SUB_CATEGORIA_1}`;
                          return (
                            <li {...props} key={key}>

                              {option['SUB_CATEGORIA_1']}
                            </li>
                          );
                        }}
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
                        /*handleCerrarEditarTabla()
                        handleCerrarProductoBoton()*/
                      }}
                    />

                    <BorderColorIcon sx={{
                      backgroundColor: '#FFC107', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                      onClick={() => {
                        /*handleOpenEditarTabla()
                        handleCBoton()
                        loadObtenerDatos()*/
                      }}
                    />

                    <DeleteForeverIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                      marginLeft: '10px', marginBottom: '10px'
                      , fontWeight: 'bold'
                    }}
                    />

                  </div>
                  <Controller
                    control={control}
                    name="producto"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={productos}
                        noOptionsText={"Sin opciones"}
                        disabled={disableSubCategorySecond}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          /*handleSeleccioneProducto(item)
                          onChange(item)
                          handleOBoton()
                          handleCerrarEditarTabla()
                          handleCerrarBoton()
                          handleOpenProductoBoton()*/
                        }
                        }

                        value={value}
                        //value={value || null}
                        getOptionLabel={(option: any) => option.SUB_CATEGORIA_2}
                        renderOption={(props, option, index) => {
                          const key = `listItem-${index}-${option.ID_SUB_CATEGORIA_2}`;
                          return (
                            <li {...props} key={key}>

                              {option['SUB_CATEGORIA_2']}
                            </li>
                          );
                        }}
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





                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>

              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>
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
                    //onChange={onChangeNameProducto}
                    //value={nombreProducto}
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
                    //onChange={onChangeNameDetalle}
                    //value={detalle}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px' }}>Selecciona unidad de medida</h6>
                  </div>
                  {/* <Controller
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
                  /> */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <h6 style={{ padding: '0px', margin: '0px' }}>¿Incluira transporte?</h6> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item xs={6}>
                        
                      </Grid>
                      <Grid item xs={6}>
                        <br />
                       
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
                      //onChange={onChangeCodEconomia}
                      //value={codEconomia}
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
                      //onChange={onChangeCodProducto}
                      //value={codProducto}
                    />
                  </Grid>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontFamily: 'Times New Roman' }}>Seleccione tamaño de producto:</h6>
                  </div>
                  {/* <React.Fragment>

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
                  </React.Fragment> */}

                 
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                
              </Grid>
            </Grid>
            <Grid>
              <Grid item xs={12} sm={12} md={12}>
                {/* <TablaProducto
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
                /> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        : null}
      <ModalAgregarCategoriaInventario
        openModalAgregarCategoriaINV={openModalAgregarCategoriaINV}
        handleOpenModalAgregarCategoriaINV={handleOpenModalAgregarCategoriaINV}
        handleCloseModalAgregarCategoriaINV={handleCloseModalAgregarCategoriaINV}
        loadObtenerCategoria={loadObtenerCategoria}
      />

      <ModalEditarCategoriaInventario
        openModalEditarCategoriaINV={openModalEditarCategoriaINV}
        handleOpenModalEditarCategoriaINV={handleOpenModalEditarCategoriaINV}
        handleCloseModalEditarCategoriaINV={handleCloseModalEditarCategoriaINV}
        idPrimeraCat={idPrimeraCat}
        nomPrimeraCat={nomPrimeraCat}
        color_r={color_r}
        color_g={color_g}
        color_b={color_b}
        loadObtenerCategoria={loadObtenerCategoria}
      />

      <ModalBorrarCategoriaInventario
        openModalBorrarCategoriaINV={openModalBorrarCategoriaINV}
        handleOpenModalBorrarCategoriaINV={handleOpenModalBorrarCategoriaINV}
        handleCloseModalBorrarCategoriaINV={handleCloseModalBorrarCategoriaINV}
        loadObtenerCategoria={loadObtenerCategoria}
        idPrimeraCat={idPrimeraCat}
        estado={estado}
      />

      <ModalAgregarSubCatInventario
        openModalSubCategoria={openModalSubCategoria}
        handleOpenModalSubCategoria={handleOpenModalSubCategoria}
        handleCloseModalSubCategoria={handleCloseModalSubCategoria}
        loadObtenerSubCategoria={loadObtenerSubCategoria}
        idPrimeraCat={idPrimeraCat}
        nomPrimeraCat={nomPrimeraCat}
      />

      <ModalEditarSubCatInventario
        openModalEditarSubCate={openModalEditarSubCate}
        handleOpenModalEditarSubCate={handleOpenModalEditarSubCate}
        handleCloseModalEditarSubCate={handleCloseModalEditarSubCate}
        loadObtenerSubCategoria={loadObtenerSubCategoria}
        idPrimeraCat={idPrimeraCat}
        nomPrimeraCat={nomPrimeraCat}
        idSegundaCat={idSubCategoria}
        nomSegundaCat={nomSubCategoria}
      />

      <ModalBorrarSubCategoriaInventario
        openModalBorrarSubCategoriaINV={openModalBorrarSubCategoriaINV}
        handleOpenModalBorrarSubCategoriaINV={handleOpenModalBorrarSubCategoriaINV}
        handleCloseModalBorrarSubCategoriaINV={handleCloseModalBorrarSubCategoriaINV}
        loadObtenerSubCategoria={loadObtenerSubCategoria}
        idSubCategoria={idSubCategoria}
      />
    </div>
  );
};

export default ProductoInventarioNew;
