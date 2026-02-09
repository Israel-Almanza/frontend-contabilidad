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
import { useProveedor } from './services/useProveedor';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import { styled } from '@mui/material/styles';
import { BiSearchAlt } from "react-icons/bi";
import SearchBar from '@mkyy/mui-search-bar';
import TablaProveedor from './TablaProveedor';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));



const Proveedor = () => {
  const { loadApiListarProveedor, loadApiListarAreas, loadApiGuardarProveedor } = useProveedor()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister } = useForm();
  const { errors } = formState;

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)

  const [primeraCat, setPrimeraCat] = useState<any>([])
  const [segundaCat, setSegundaCat] = useState<any>([])
  const [productoC, setProductoC] = useState<any>([])
  const [presentacionC, setPresentacionC] = useState<any>([])
  const [elementos, setElementos] = useState<any>({})
  const [receta, setReceta] = useState<any>([])


  const [idPresentacion, setIdPresentacion] = useState('')
  const [idArea, setIdArea] = useState('')
  const [nomArea, setNomArea] = useState('')


  const [disableSubCategorySecond, setDisableSubCategorySecond] = useState(true)
  const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)
  const [disableSubCategoryThird, setDisableSubCategoryThird] = useState(true)

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadObtenerListaAreas()
    loadObtenerListaProveedor()

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
  

  }

  const [nombreProveedor, setNombreProveedor] = useState<string>('')
  const [direccion, setDireccion] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };

  const [ListAreas, setListArea] = useState<any>([]);
  const [originalRows, setoriginalRows] = useState<any>([])
  const [ListProveedor, setListProveedor] = useState<any>(originalRows);
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

    setListProveedor(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };


const ListaElementos=[ {SUB_CATEGORIA_2:"test 1"}]

const loadObtenerListaProveedor = async () => {
    try {
      setLoading(true)
      const response = await loadApiListarProveedor()
      setLoading(false)
      console.log("lista areas ", response)
      
      if(response?.status && response?.proveedores){
        setListProveedor(response.proveedores)
        setoriginalRows(response.proveedores)
      }
      
    } catch (error) {
  
    }
  
  }

  const loadObtenerListaAreas = async () => {
    try {
      setLoading(true)
      const response = await loadApiListarAreas()
      setLoading(false)
      console.log("lista areas ", response)
      
      if(response?.status && response?.areas){
        setListArea(response.areas)
      }
      
    } catch (error) {
  
    }
  
  }

  const loadGuardarProveedor = async () => {

    try {
      setLoading(true)
      const response = await loadApiGuardarProveedor(
        nombreProveedor,
        idArea,
        direccion,
        telefono
      )
      console.log("res guardar", response)
      setLoading(false)
      if (response?.status) {
        await loadObtenerListaProveedor()
        AlertSave({ title: "", message: response.message });

      }
      if (response?.status == false) {
        AlertQuestion({ title: '', message: response.message })


      }

      if (response == undefined) {
        AlertError({ title: '', message: response.message })
      }
      setNombreProveedor('')
      setDireccion('')
      setTelefono('')
      setValue("Area", "")
      setListArea([])
    } catch (error) {
      console.log("error api guardar:*", error)
      setLoading(false)
    }

  }

  const handleSeleccioneArea = async (value: any) => {

    console.log("valee de area ", value)
    const { ID_AREA, NOMBRE } = value
    setIdArea(ID_AREA)
    setNomArea(NOMBRE)
  }

  const onChangeNameProveedor = (event: any) => {
    console.log("nombre proveedor ", event.target.value)
    setNombreProveedor(event.target.value)

}
const onChangeDireccion = (event: any) => {
    console.log("direccion ", event.target.value)
    setDireccion(event.target.value)

}
const onChangeTelefono = (event: any) => {
    console.log("telefono ", event.target.value)
    setTelefono(event.target.value)

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
              PLANTA-PROVEEDOR

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

              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione Area</h5>
                  <Controller
                    control={control}
                    name="Area"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        clearOnBlur={true}
                        options={ListAreas}
                        //disabled={disableSubCategoryFrist}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item, reason) => {

                          if (reason === 'clear') {
                            console.log("Put your clear logic here: this condition executed when clear button clicked")
                            // setValue({ SUB_CATEGORIA_1: '' }) //for reset the value
                            return
                          }

                          handleSeleccioneArea(item)
                          onChange(item)

                        }
                        }

                        //value={value}
                        value={value || null}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccion Area"
                            error={!!errors.subcategoria}
                            helperText={errors.subcategoria && "Completa este campo"}
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
                  <h5 style={{ margin: "5px" }}>Nuevo Proveedor</h5>
                    <TextField id="outlined-basic"
                        size='small'
                        sx={{ width: '100%' }}
                        label="Ingrese Nombre de Proveedor"
                        variant="outlined"
                        onChange={onChangeNameProveedor}
                        value={nombreProveedor}
                    />
                </div>
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Direccion</h5>
                    <TextField id="outlined-basic"
                        size='small'
                        sx={{ width: '100%' }}
                        label="Ingrese Direccion"
                        variant="outlined"
                        onChange={onChangeDireccion}
                        value={direccion}
                    />
                </div>
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Telefono</h5>
                    <TextField id="outlined-basic"
                        size='small'
                        sx={{ width: '100%' }}
                        label="Ingrese Telefono"
                        variant="outlined"
                        onChange={onChangeTelefono}
                        value={telefono}
                    />
                </div>
              </Grid>


              <Grid item xs={12} sm={2} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={loadGuardarProveedor}
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

                    <TablaProveedor
                        tableData={ListProveedor}

                        ListaElementos={elementos}
                        ListaReceta={receta}
                        getValues={getValues}
                        setValue={setValue}
                        control={control}
                        unregister={unregister}
                        handleSubmit={handleSubmit}
                        idPresentacion={idPresentacion}
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
export default Proveedor