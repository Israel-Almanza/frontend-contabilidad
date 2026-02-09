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
import { useArea } from './services/useArea';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import { styled } from '@mui/material/styles';
import { BiSearchAlt } from "react-icons/bi";
import SearchBar from '@mkyy/mui-search-bar';
import TablaArea from './TablaArea';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));



const Area = () => {
  const { loadApiListarAreas,loadApiGuardarArea } = useArea()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister } = useForm();
  const { errors } = formState;

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)

 
  const [segundaCat, setSegundaCat] = useState<any>([])
  const [productoC, setProductoC] = useState<any>([])
  const [presentacionC, setPresentacionC] = useState<any>([])
  const [elementos, setElementos] = useState<any>({})
  const [receta, setReceta] = useState<any>([])


  const [idPresentacion, setIdPresentacion] = useState('')


  const [disableSubCategorySecond, setDisableSubCategorySecond] = useState(true)
  const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)
  const [disableSubCategoryThird, setDisableSubCategoryThird] = useState(true)

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
   // loadObtenerPrimeraCategoria()
    loadObtenerListaAreas()

  }, []);


  //loading
  const [loading, setLoading] = useState(
    false
  );

 

  const [nombreArea, setNombreArea] = useState<string>('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };

  const [originalRows, setoriginalRows] = useState<any>([])
  const [ListAreas, setListArea] = useState<any>(originalRows);
  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);

    const keys = ["ID_AREA","NOMBRE"]
    const filteredRows = originalRows.filter((row: any) => {
      
      return keys.some((key: any) =>
        row[key]?.toString()?.toLowerCase()?.includes(searchedVal.toLowerCase())
      );
    });

    setListArea(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };


const ListaElementos=[ {SUB_CATEGORIA_2:"test 1"}]

const loadObtenerListaAreas = async () => {
  try {
    setLoading(true)
    const response = await loadApiListarAreas()
    setLoading(false)
    console.log("lista areas ", response)
    
    if(response?.status && response?.areas){
      setListArea(response.areas)
      setoriginalRows(response.areas)
    }
    
  } catch (error) {

  }

}


  const loadGuardarArea = async () => {

    try {
      setLoading(true)
      const response = await loadApiGuardarArea(
        nombreArea
      )
      console.log("res guardar", response)
      setLoading(false)
      if (response?.status) {
        await loadObtenerListaAreas()
        AlertSave({ title: "", message: response.message });

      }
      if (response?.status == false) {
        AlertQuestion({ title: '', message: response.message })


      }

      if (response == undefined) {
        AlertError({ title: '', message: response.message })
      }
      setNombreArea('')
    } catch (error) {
      console.log("error api guardar:*", error)
      setLoading(false)
    }

  }
  

  /*const handleSeleccionePrimeraCategoria = async (value: any) => {

    console.log("valee de primera Cate ", value)
    const { ID_CATEGORIA, CATEGORIA } = value


    setSegundaCat([])
    await loadObtenerSegundaCategoria(ID_CATEGORIA);
    //setDisableSubCategorySecond(false)
    setDisableSubCategoryFrist(false)

  }*/

  const onChangeNameArea = (event: any) => {
    console.log("nombre Area ", event.target.value)
    setNombreArea(event.target.value)

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
              SIREPE_AREA

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

              <Grid item xs={1} sm={1} md={1}>
                
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Nueva Area</h5>
                    <TextField id="outlined-basic"
                        size='small'
                        sx={{ width: '100%' }}
                        label="Ingrese Nombre de Area"
                        variant="outlined"
                        onChange={onChangeNameArea}
                        value={nombreArea}
                    />
                </div>
              </Grid>
             


              <Grid item xs={12} sm={2} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={loadGuardarArea}
                >Agregar</ColorButton>
              </Grid>
            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>
      <br/>

    <Card >
        <CardContent >
        <Box sx={{
          width: '100%', maxWidth: 600, margin: 'auto', backgroundColor: 'white',
          border: '1px solid #C0C1C1', padding: '20px'


        }}>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
               
                <Grid item xs={12} sm={12} md={12}>
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

                    <TablaArea
                        tableData={ListAreas}
                        loadObtenerListaAreas={loadObtenerListaAreas}
                    />
                </Grid>
               
            </Grid>
        </Box> 
        </CardContent>
    </Card>

    


      {loading ? <KDImage /> : null}
    </>


  )

}
export default Area