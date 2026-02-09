import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, FormControlLabel, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
//import Paleta from '../../../core/components/common/Paleta'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Select from '@mui/material/Select';
import ExplicitOutlinedIcon from '@mui/icons-material/ExplicitOutlined';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import { Controller, useForm } from "react-hook-form";
import TablaCrearReceta from './TablaCrearReceta';
import { useCrearReceta } from './services/useCrearReceta';
import { number } from 'prop-types';
import { KDImage } from '../../../../core/modal-loading/KDImage';

const CrearRecetas = () => {
  const { loadApiPrimeraCategoria, loadApiSegundaCategoria, loadApiProductoCategoria, loadApiPresentacion, loadApiBuscarReceta, loadApiListarElementos} = useCrearReceta()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister  } = useForm();
  const { errors } = formState;

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)

  const [primeraCat, setPrimeraCat] = useState<any>([])
  const [segundaCat, setSegundaCat] = useState<any>([])
  const [productoC, setProductoC] = useState<any>([])
  const [presentacionC, setPresentacionC] = useState<any>([])
  const [elementos, setElementos] = useState<any>({})
  const [receta, setReceta] = useState<any>([])


  const [idPrimeraCat, setIdPrimeraCat] = useState('')
  const [nomPrimeraCat, setNomPrimeraCat] = useState('')
  const [idSegundaCat, setIdSegundaCat] = useState('')
  const [nomSegundaCat, setNomSegundaCat] = useState('')
  const [idProducto, setIdProducto] = useState('')
  const [nomProducto, setNomProducto] = useState('')
  const [idPresentacion, setIdPresentacion] = useState('')
  const [nomPresentacion, setNomPresentacion] = useState('')

  const [disableSubCategorySecond, setDisableSubCategorySecond] = useState(true)
  const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)
  const [disableSubCategoryThird, setDisableSubCategoryThird] = useState(true)

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadObtenerPrimeraCategoria()
    loadObtenerElementos()
   
  }, []);

  //loading
  const [loading, setLoading] = useState(
    false
  );

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };


  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('vaso', 56, 2, 2, 2),
  ];

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  const loadObtenerPrimeraCategoria = async () => {
    

    try {
      //setLoading(true)
      const response = await loadApiPrimeraCategoria()
      //setLoading(false)
      console.log("lista primera categoria ", response)
      
      if(response?.status && response?.primeraCategoria){
        setPrimeraCat(response.primeraCategoria)
        //setoriginalRows(response.usuarios)
      }
      
    } catch (error) {

    }

  }
  const loadObtenerElementos = async () => {
    

    try {
      setLoading(true)
      const response = await loadApiListarElementos()
      setLoading(false)
      console.log("lista elementos ", response)
      
      if(response?.status && response?.elmentos){
        setElementos(response.elmentos)
        //setoriginalRows(response.usuarios)
      }
      
    } catch (error) {

    }

  }

  const loadObtenerSegundaCategoria = async (idPrimeraCat:number) => {
        try {
            const response = await loadApiSegundaCategoria(idPrimeraCat);
            console.log("response categoria segunda", response)
            if (Array.isArray(response.segundaCategoria)) {

                setSegundaCat(response.segundaCategoria)
                //actulizar select
            }

        } catch (error) {

        }
    }

    const loadObtenerProducto = async (idSegundaCat:number) => {
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

  const loadObtenerPresentacion = async (Id_Producto:number) => {
    try {
        const response = await loadApiPresentacion(Id_Producto);
        console.log("response Presentacion", response)
        if (Array.isArray(response.productounico)) {

            setPresentacionC(response.productounico)
            //actulizar select
        }

    } catch (error) {

    }
}

const loadBuscarReceta = async () => {
  try {
    setLoading(true)
      const response = await loadApiBuscarReceta(Number(idPresentacion));
      console.log("response lista Receta", response)
      setLoading(false)
      if (Array.isArray(response.elementos)) {

          //setElementos(response.elementos)
          //actulizar select
        
      }
      
      if (Array.isArray(response.receta)) {

        setReceta(response.receta)
        
        //console.log("receta",receta)
        for(let i=0; i< response?.receta?.length; i++){
          //console.log("fruta valor2 ",response?.receta[i].PARA_MESA)
          if(response?.receta[i].ESTADO_FRUTAS == 1){
            setValue(`check0_${i}`, true)
          }else{
            setValue(`check0_${i}`, false)
          }
          if(response?.receta[i].PARA_MESA == 1){
            setValue(`check1_${i}`, true)
          }else{
            setValue(`check1_${i}`, false)
          }
          if(response?.receta[i].PARA_LLEVAR == 1){
            setValue(`check2_${i}`, true)
          }else{
            setValue(`check2_${i}`, false)
          }
          if(response?.receta[i].MANDATORIO == 1){
            setValue(`check3_${i}`, true)
          }else{
            setValue(`check3_${i}`, false)
          }
          if(response?.receta[i].PERECEDERO == 1){
            setValue(`check4_${i}`, true)
          }else{
            setValue(`check4_${i}`, false)
          }
          setValue(`medida_${i}`,response?.receta[i].TAMAÑO)
          //getValueByKeyInObjectTag(response?.receta[i].TAMAÑO, "_medida")
          //console.log("medida--",response?.receta[i].TAMAÑO)
          //setValue(`check5_${i}`, true)
         
        }
        //actulizar select
    }

  } catch (error) {

  }
}

const getValueByKeyInObjectTag = (array: any, tag: string) => {

  for (var key in array) {

    if (array[`${key}`] == null) {
      setValue(`${key}${tag}`, 0)
    } else {
      setValue(`${key}${tag}`, array[key])
    }
  }

}

  const handleSeleccionePrimeraCategoria = async (value: any) => {
   
    console.log("valee de primera Cate ", value)
    const { ID_CATEGORIA, CATEGORIA } = value
    setIdPrimeraCat(ID_CATEGORIA)
    setNomPrimeraCat(CATEGORIA)
    setValue("subcategoria", "")
    setValue("producto", "")
    setValue("presentacion", "")
    setSegundaCat([])
    await loadObtenerSegundaCategoria(ID_CATEGORIA);
    //setDisableSubCategorySecond(false)
    setDisableSubCategoryFrist(false)

  }

  const handleSeleccioneSegundaCategoria = (value: any) => {
    console.log("valee de segunda Cate ", value)
    const { ID_CATEGORIA_2, CATEGORIA_2 } = value
    setIdSegundaCat(ID_CATEGORIA_2)
    setNomSegundaCat(CATEGORIA_2)
    setValue("producto", "")
    setValue("presentacion", "")
    setProductoC([])
    loadObtenerProducto(ID_CATEGORIA_2);
    setDisableSubCategorySecond(false)

  }

  const handleSeleccioneProducto = (value: any) => {
    console.log("valee de producto ", value)
    const { ID_PRODUCTO_MADRE, PRODUCTO } = value
    setIdProducto(ID_PRODUCTO_MADRE)
    setNomProducto(PRODUCTO)
    setValue("presentacion", "")
    setPresentacionC([])
    loadObtenerPresentacion(ID_PRODUCTO_MADRE);
    setDisableSubCategoryThird(false)

  }

  const handleSeleccionePresentacion = (value: any) => {
    console.log("valee de presentacion ", value)
    const { ID_PRODUCTO_UNICO, TAMAÑO } = value
    setIdPresentacion(ID_PRODUCTO_UNICO)
    setNomPresentacion(TAMAÑO)
    setDisableSubCategorySecond(false)

  }

  const getTest = () => {
    console.log("work")
    console.log("res ", getValues())
  }

  const manajarCheckTest = (event: any) => {
    if (event.target.checked) {
      // poner en true los  demas checks
      setValue("check_0", true)
    } else {
      // poner el falso los demas chesk
      setValue("check_0", false)
    }
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
        onClick={() => getTest()}
      >

        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
          Receta
        </Typography>
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
                  <h5 style={{ margin: "5px" }}>Categoria</h5>
                <Controller
                  control={control}
                  name="categoria"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                      <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={primeraCat}
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
                                  error={!!errors.categoria}
                                  helperText={errors.categoria && "Completa este campo"}
                              //  required

                              />
                          )}


                          getOptionLabel={(option: any) => option.CATEGORIA}


                      />
                  )}
              />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>SubCategoria</h5>
                  {/* <Controller
                    control={control}
                    name="categoria"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={segundaCat}
                            sx={{ width: '100%' }}
                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                            onChange={(event, item) => {
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
                                    label="Seleccion la Segunda Categoria"
                                    error={!!errors.categoria}
                                    helperText={errors.categoria && "Completa este campo"}
                                //  required

                                />
                            )}


                            getOptionLabel={(option: any) => option.CATEGORIA_2}


                        />
                    )}
                  /> */}
                  <Controller
                      control={control}
                      name="subcategoria"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              clearOnBlur={true}
                              options={segundaCat}
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
                                      error={!!errors.subcategoria}
                                      helperText={errors.subcategoria && "Completa este campo"}
                                  //  required

                                  />
                              )}


                              getOptionLabel={(option: any) => option.CATEGORIA_2}


                          />
                      )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione el producto</h5>
                  <Controller
                    control={control}
                    name="producto"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={productoC}
                            disabled={disableSubCategorySecond}
                            sx={{ width: '100%' }}
                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                            onChange={(event, item) => {
                                handleSeleccioneProducto(item)
                                onChange(item)

                            }
                            }

                            //value={value}
                            value={value || null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="Seleccione el Producto"
                                    error={!!errors.categoria}
                                    helperText={errors.categoria && "Completa este campo"}
                                //  required

                                />
                            )}


                            getOptionLabel={(option: any) => option.PRODUCTO}


                        />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione la Presentacion</h5>
                  <Controller
                    control={control}
                    name="presentacion"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={presentacionC}
                            disabled={disableSubCategoryThird}
                            sx={{ width: '100%' }}
                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                            onChange={(event, item) => {
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
                                    label="Seleccione Presentacion"
                                    error={!!errors.categoria}
                                    helperText={errors.categoria && "Completa este campo"}
                                //  required

                                />
                            )}


                            getOptionLabel={(option: any) => option.TAMAÑO}


                        />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                {(presentacionC && presentacionC.length > 0) ?
                <>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                  &nbsp; &nbsp;
                  <br/>
                  <div style={{ display: '10px', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={loadBuscarReceta} sx={{ backgroundColor: '#D32F2F' }} variant="contained" ><FindReplaceIcon /></Button>
                    &nbsp; &nbsp;
                  
                  </div>
                    
                  </div>
                </>
                :null}
                
              </Grid>
            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>
     
      {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

        <div style={{ flexDirection: 'column' }}>
          <div>
            <p></p>
          </div>
          <div style={{ display: '10px', flexDirection: 'row', justifyContent: 'center' }}>
            <Button sx={{ backgroundColor: '#D32F2F' }} variant="contained" ><AddIcon /></Button>
            &nbsp; &nbsp;
            <Button variant="contained" color="primary"><DriveFileRenameOutlineIcon /></Button>
          </div>
        </div>
      </div> */}

      <br></br>
      {(presentacionC && presentacionC.length > 0) ?
        <>
      <div>

        <TablaCrearReceta 
          ListaElementos={elementos}
          ListaReceta={receta}
          getValues={getValues}
          setValue={setValue}
          control={control} 
           unregister={unregister}
           loadBuscarReceta={loadBuscarReceta}
           handleSubmit={handleSubmit}
           idPresentacion={idPresentacion}
        />
      </div>
 </>:null}
 {loading ? <KDImage /> : null}
    </>


  )

}
export default CrearRecetas