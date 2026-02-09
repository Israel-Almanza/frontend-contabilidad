import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, FormControlLabel, Grid, Modal, Box, Card, CardContent } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import { Controller, useForm } from "react-hook-form";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import { usePlantaProducto } from './services/usePlantaProducto';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { styled } from '@mui/material/styles';
import { BiSearchAlt } from "react-icons/bi";
import SearchBar from '@mkyy/mui-search-bar';
import TablaPlantaProducto from './TablaPlantaProducto';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));



const PlantaProducto = () => {
  const { loadApiListarProveedor, loadApiListarPresentaciones, loadApiListarProductos, 
    loadApiGuardarProducto } = usePlantaProducto()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister } = useForm();
  const { errors } = formState;

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)

  

  const [idPresentacion, setIdPresentacion] = useState('')
  const [idProveedor, setIdProveedor] = useState('')
  const [nomProveedor, setNomProveedor] = useState('')
  const [idPresentacionP, setIdPresentacionP] = useState('')
  const [nomPresentacion, setNomPresentacion] = useState('')



  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadObtenerListaProveedor()
    loadObtenerListaPresentacion()
    loadObtenerListaProducto()
  }, []);


  //loading
  const [loading, setLoading] = useState(
    false
  );

  const addNewElement = () => {
    // console.log("add ", selectElement)
    //  if (selectElement) {
    //   const { label } = selectElement
    //   console.log("hay dato ", label)
    setRows([...rows,
    { SUB_CATEGORIA_2: "data test" }
    ]);

  }

  const [nombreProducto, setNombreProducto] = useState<string>('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };

  const [ListProveedor, setListProveedor] = useState<any>([]);
  const [ListPresentacion, setListPresentacion] = useState<any>([]);
  const [ListProductos, setListProductos] = useState<any>([]);

  const [originalRows, setoriginalRows] = useState<any>([])
  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);

    const keys = ["NOMBRE","CI","CELULAR","TIPO_USUARIO","AREA","NOMBRE_CARGO"]
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


const loadObtenerListaProveedor = async () => {
  try {
    //setLoading(true)
    const response = await loadApiListarProveedor()
    //setLoading(false)
    console.log("lista proveedor ", response)
    
    if(response?.status && response?.proveedores){
      setListProveedor(response.proveedores)
    }
    
  } catch (error) {

  }

}

const loadObtenerListaPresentacion = async () => {
  try {
    //setLoading(true)
    const response = await loadApiListarPresentaciones()
    //setLoading(false)
    console.log("lista presentacion ", response)
    
    if(response?.status && response?.areas){
      setListPresentacion(response.areas)
    }
    
  } catch (error) {

  }

}

const loadObtenerListaProducto = async () => {
  try {
    setLoading(true)
    const response = await loadApiListarProductos()
    setLoading(false)
    console.log("lista productos ", response)
    
    if(response?.status && response?.productos){
      setListProductos(response.productos)
    }
    
  } catch (error) {

  }

}

const loadGuardarProducto = async () => {

  try {
    setLoading(true)
    const response = await loadApiGuardarProducto(
      nombreProducto,
      idProveedor,
      idPresentacionP
    )
    console.log("res guardar", response)
    setLoading(false)
    if (response?.status) {
      await loadObtenerListaProducto()
      AlertSave({ title: "", message: response.message });

    }
    if (response?.status == false) {
      AlertQuestion({ title: '', message: "No se registro el Producto" })


    }

    if (response == undefined) {
      AlertError({ title: '', message: response.message })
    }
    setNombreProducto('')
    setValue("proveedor",'')
    setListProveedor([])
    setValue("presentacion",'')
    setListPresentacion([])
  } catch (error) {
    console.log("error api guardar:*", error)
    setLoading(false)
  }

}


  const handleSeleccioneProveedor = async (value: any) => {

    console.log("valee de Proveedor ", value)
    const { ID_PROVEEDOR, NOMBRE_PROVEEDOR } = value
    setIdProveedor(ID_PROVEEDOR)
    setNomProveedor(NOMBRE_PROVEEDOR)
    //setSegundaCat([])
    //await loadObtenerSegundaCategoria(ID_CATEGORIA);
    //setDisableSubCategorySecond(false)
    //setDisableSubCategoryFrist(false)

  }

  const handleSeleccionePresentacion = async (value: any) => {

    console.log("valee de Presentacion ", value)
    const { ID_PRESENTACION, NOMBRE } = value
    setIdPresentacionP(ID_PRESENTACION)
    setNomPresentacion(NOMBRE)
    

  }

  const onChangeNameProducto = (event: any) => {
    console.log("nombre producto ", event.target.value)
    setNombreProducto(event.target.value)

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

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
          <Grid item xs={10} sm={10} md={11}>
            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '15px',
              color: 'white', alignItems: 'center'
            }} >
              PLANTA-PRODUCTO

            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            {/* <div>
              <Button //onClick={() => setActiveBtnSearch(!activeBtnSearch)}
              onClick={() => setOpen(!open)}
               sx={{ fontSize: '1.6em', color: 'white' }}><BiSearchAlt /></Button>
     

            </div> */}
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

              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione Proveedor</h5>
                  <Controller
                    control={control}
                    name="proveedor"
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        clearOnBlur={true}
                        options={ListProveedor}
                        //disabled={disableSubCategoryFrist}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item, reason) => {

                          // if (reason === 'clear') {
                          //   console.log("Put your clear logic here: this condition executed when clear button clicked")
                          //   // setValue({ SUB_CATEGORIA_1: '' }) //for reset the value
                          //   return
                          // }

                          handleSeleccioneProveedor(item)
                          onChange(item)

                        }
                        }

                        //value={value}
                        value={value }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccion Proveedor"
                            //error={!!errors.subcategoria}
                            //helperText={errors.subcategoria && "Completa este campo"}
                          //  required

                          />
                        )}


                        getOptionLabel={(option: any) => option.NOMBRE_PROVEEDOR}


                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione Presentacion</h5>
                  <Controller
                    control={control}
                    name="presentacion"
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        clearOnBlur={true}
                        options={ListPresentacion}
                        //disabled={disableSubCategoryFrist}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item, reason) => {

                          // if (reason === 'clear') {
                          //   console.log("Put your clear logic here: this condition executed when clear button clicked")
                          //   // setValue({ SUB_CATEGORIA_1: '' }) //for reset the value
                          //   return
                          // }

                          handleSeleccionePresentacion(item)
                          onChange(item)

                        }
                        }

                        //value={value}
                        value={value }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccion Presentacion"
                            //error={!!errors.subcategoria}
                            //helperText={errors.subcategoria && "Completa este campo"}
                          //  required

                          />
                        )}


                        getOptionLabel={(option: any) => option.NOMBRE}


                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Nuevo Producto</h5>
                    <TextField id="outlined-basic"
                        size='small'
                        sx={{ width: '100%' }}
                        label="Ingrese Nombre de Producto"
                        variant="outlined"
                        onChange={onChangeNameProducto}
                        value={nombreProducto}
                    />
                </div>
              </Grid>


              <Grid item xs={12} sm={2} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={loadGuardarProducto}
                >Agregar</ColorButton>
              </Grid>
            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>
      <br/>

    <Card >
        <CardContent >
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={12} md={0.5}>
                </Grid>
                <Grid item xs={12} sm={12} md={11}>
                    <Box sx={{ width: '100%' }}>
                        <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                        , alignContent: 'center'
                        }}>


                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            {/*  <h6 style={{ padding: '0px', margin: '0px' }}>Buscar</h6>*/}
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

                    <TablaPlantaProducto
                        tableData={ListProductos}
                        
                        
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={0.5}>
                </Grid>
            </Grid>
        </CardContent>
    </Card>

    


      {loading ? <KDImage /> : null}
    </>


  )

}
export default PlantaProducto