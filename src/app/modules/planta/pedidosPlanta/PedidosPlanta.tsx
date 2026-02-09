import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, FormControlLabel, Grid, Modal, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Controller, useForm } from "react-hook-form";
import TablaPedidosPlanta from './TablaPedidosPlanta';
import { usePedidosPlanta } from './services/usePedidosPlanta';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { styled } from '@mui/material/styles';
import { BiSearchAlt } from "react-icons/bi";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));

const PedidosPlanta = () => {
  const { loadApiListarProveedor, loadApiProductoProveedor, loadApiListarPresentacionProducto } = usePedidosPlanta()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister } = useForm();
  const { errors } = formState;

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)
  const [rows, setRows] = useState<any>([]);

  const [proveedor, setProveedor] = useState<any>([])
  const [ProductoProveedor, setProductoProveedor] = useState<any>([])
  const [ListPresentacion, setListPresentacion] = useState<any>([]);
  const [segundaCat, setSegundaCat] = useState<any>([])
  const [productoC, setProductoC] = useState<any>([])
  const [presentacionC, setPresentacionC] = useState<any>([])
  const [elementos, setElementos] = useState<any>({})
  const [receta, setReceta] = useState<any>([])


  const [idProveedor, setIdProveedor] = useState('')
  const [nomProveedor, setNomProveedor] = useState('')
  const [idProducto, setIdProducto] = useState('')
  const [nomProducto, setNomProducto] = useState('')
  const [idPresentacionP, setIdPresentacionP] = useState('')
  const [nomPresentacion, setNomPresentacion] = useState('')
  const [cantidad, setCantidad] = useState<string>('')

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //loadObtenerListaPresentacion()
    loadObtenerProveedor()
  }, []);


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    //p: 2,
  };

  //loading
  const [loading, setLoading] = useState(
    false
  );

  const addNewElement = () => {
    
    setRows([...rows,
    { PRODUCTO: nomProducto, PRESENTACION: nomPresentacion, CANTIDAD:cantidad,
    IdProducto: idProducto, IdPresentacion:idPresentacionP}
    ]);

  }



  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };







  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const ListaElementos=[ {SUB_CATEGORIA_2:"test 1"}]


  const loadObtenerProveedor = async () => {
    try {
      //setLoading(true)
      const response = await loadApiListarProveedor()
      //setLoading(false)
      console.log("lista proveedor ", response)

      if (response?.status && response?.proveedores) {
        setProveedor(response.proveedores)
        //setoriginalRows(response.usuarios)
      }

    } catch (error) {

    }

  }


  const loadObtenerProductoProveedor = async () => {
    try {
        setLoading(true)
        handleClose()
      const response = await loadApiProductoProveedor(Number(idProveedor));
      setLoading(false)
      console.log("response producto proveedor", response)
      if (Array.isArray(response.productos)) {

        setProductoProveedor(response.productos)
        //actulizar select
      }

    } catch (error) {

    }
  }


  const loadObtenerListaPresentacionProducto = async (id_Proveedor:string,nomProducto:string) => {
    try {
      setLoading(true)
      const response = await loadApiListarPresentacionProducto(
        id_Proveedor,
        nomProducto
      );
      setLoading(false)
      console.log("lista presentacionProducto ", response)
      
      if(response?.status && response?.presentaciones){
        setListPresentacion(response.presentaciones)
      }
      
    } catch (error) {
  
    }
  
  }



  const handleSeleccioneProveedor = async (value: any) => {

    console.log("valee de Proveedor ", value)
    const { ID_PROVEEDOR, NOMBRE_PROVEEDOR } = value
    setIdProveedor(ID_PROVEEDOR)
    setNomProveedor(NOMBRE_PROVEEDOR)

  }

  const handleSeleccioneProducto = async (value: any) => {
    console.log("valee de producto ", value)
    const { NOMBRE_PRODUCTO } = value
    
    setNomProducto(NOMBRE_PRODUCTO)
    await loadObtenerListaPresentacionProducto(idProveedor, NOMBRE_PRODUCTO)

  }

  const handleSeleccionePresentacion = async (value: any) => {

    console.log("valee de Presentacion ", value)
    const { ID_PRESENTACION, NOMBRE, ID_PRODUCTO } = value
    setIdPresentacionP(ID_PRESENTACION)
    setNomPresentacion(NOMBRE)
    setIdProducto(ID_PRODUCTO)

  }

  const onChangeCantidad = (event: any) => {
    console.log("cantidad  ", event.target.value)
    setCantidad(event.target.value)

}

//metodo para eliminar elementos
const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)

    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

  const closeModalResetForm = () => {


    //setNombreCategoria('')
    handleClose()
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
          <Grid item xs={12} sm={12} md={11}>
            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '15px',
              color: 'white', alignItems: 'center'
            }} >
              PEDIDO - {nomProveedor}

            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <div>
              <Button //onClick={() => setActiveBtnSearch(!activeBtnSearch)}
              onClick={() => setOpen(!open)}
               sx={{ fontSize: '1.6em', color: 'white' }}><BiSearchAlt /></Button>
     

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

              <Grid item xs={12} sm={12} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Producto</h5>
                  <Controller
                    control={control}
                    name="ProductoProveedor"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={ProductoProveedor}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          handleSeleccioneProducto(item)
                          onChange(item)

                        }
                        }

                        value={value}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccion Producto"
                            error={!!errors.categoria}
                            helperText={errors.categoria && "Completa este campo"}
                          //  required

                          />
                        )}


                        getOptionLabel={(option: any) => option.NOMBRE_PRODUCTO}


                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Presentacion</h5>
                  <Controller
                    control={control}
                    name="subcategoria"
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        clearOnBlur={true}
                        options={ListPresentacion}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item, reason) => {

                          if (reason === 'clear') {
                            console.log("Put your clear logic here: this condition executed when clear button clicked")
                            // setValue({ SUB_CATEGORIA_1: '' }) //for reset the value
                            return
                          }

                          handleSeleccionePresentacion(item)
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
                            error={!!errors.subcategoria}
                            helperText={errors.subcategoria && "Completa este campo"}
                          //  required

                          />
                        )}


                        getOptionLabel={(option: any) => option.NOMBRE_PRESENTACION}


                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Cantidad</h5>
                  <TextField id="outlined-basic"
                        size='small'
                        sx={{ width: '100%' }}
                        label="Ingrese Cantidad"
                        variant="outlined"
                        type="number"
                        onChange={onChangeCantidad}
                        value={cantidad}
                    />
                </div>
              </Grid>


              <Grid item xs={12} sm={12} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => addNewElement()}
                >Agregar</ColorButton>
              </Grid>
            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>


      <br/>


      <TablaPedidosPlanta
        tableData={rows}
        deleteByIndex={(index: any) => deleteByIndex(index)}

        getValues={getValues}
        setValue={setValue}
        control={control}
        unregister={unregister}
        
        handleSubmit={handleSubmit}
      />

<Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: '#DC3545', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
                }}>

                    <Typography id="modal-modal-description" sx={{
                        mt: 1,
                        textAlign: 'center',
                        //fontWeight: 'bold',
                        marginLeft: '3%',
                        color:'white',
                        fontSize: '1.2rem', //marginBottom: '10px'
                        fontFamily: 'Times New Roman'
                    }}>
                        Buscar Producto
                    </Typography>
                    <Button onClick={() => closeModalResetForm()}
                        sx={{
                            color: 'black',
                            ':hover': {
                                color: 'white'
                            }
                        }}
                    >
                        <CancelPresentationIcon
                        />
                    </Button>
                </div>
        <div style={{ margin:'15px' }}>        

          <Grid item xs={12} sm={12} md={2.5}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h5 style={{ margin: "5px" }}>Seleccione Elemento</h5>
              <Controller
                control={control}
                name="Elemntos"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={proveedor}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, item) => {
                      handleSeleccioneProveedor(item)
                      onChange(item)

                    }
                    }

                    //value={value}
                    value={value || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="---Seleccione---"
                      //error={!!errors.categoria}
                      //helperText={errors.categoria && "Completa este campo"}
                      //  required

                      />
                    )}

                    
                    getOptionLabel={(option: any) => option.NOMBRE_PROVEEDOR}


                  />
                )}
              />
            </div>
          </Grid>
        </div>
          <br></br>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {/* <Button sx={{ backgroundColor: '#d50000' }} variant="contained"
              onClick={addNewElement}
            >Agregar</Button> */}
            <Button sx={{ backgroundColor: '#d50000' }} variant="contained"
              onClick={loadObtenerProductoProveedor}
            >Buscar</Button>
            &nbsp; &nbsp;
            <Button onClick={handleClose} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cerrar</Button>
            {/* <button onClick={()=> console.log(getValues())}>get values </button> */}
          </div>
          <br/>
        </Box>
      </Modal>

      {loading ? <KDImage /> : null}
    </>


  )

}
export default PedidosPlanta