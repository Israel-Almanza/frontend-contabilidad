import { Typography, Button, TextField, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
//import Paleta from '../../../core/components/common/Paleta'
//import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
//import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ModalPersonalized } from './components/ModalPersonalized';
//import TablaRecetaCombo from './TablaRecetaCombo';
import { ModalForm } from './components/ModalForm';
import { ModalTabla } from './components/ModalTabla';
//import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
//import ButtonBase from '@mui/material/ButtonBase';
//import dataRecetaComboJson from '../../../../data/m-recetas/crear-receta-combo/dataRecetaComboJson.json'
//import { AlertSave } from '../../common/alerts/alerts';
import { AlertSave } from '../../../common/alerts/alerts';
import { useRecetaCombo } from './services/useRecetaCombo';
import { ModalAPCombo } from './components/ModalAPCombo';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import { FcSearch } from "react-icons/fc";

const RecetaCombo = () => {
  const { loadApiProductos, loadApiPrimeraCategoria, loadApiSegundaCategoria, loadApiProductoCategoria, loadApiPresentacion, loadApiListaCombos, loadApiBuscarElementoCombo } = useRecetaCombo()
  const { formState, handleSubmit, control, register, getValues, setValue, unregister, reset } = useForm();


  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //two
  const [openModalDos, setOpenModalDos] = useState(false);
  const handleOpenModalDos = () => setOpenModalDos(true);
  const handleCloseModalDos = () => setOpenModalDos(false);
  //thre
  const [openModalTres, setOpenModalTres] = useState(false);
  const handleOpenModalTres = () => setOpenModalTres(true);
  const handleCloseModalTres = () => setOpenModalTres(false);
  //four
  const [openModalCuatro, setOpenModalCuatro] = useState(false);
  const handleOpenModalCuatro = () => setOpenModalCuatro(true);
  const handleCloseModalCuatro = () => setOpenModalCuatro(false);
  //modal de tabla agregar producto a combo
  const [openModalCombo, setOpenModalCombo] = useState(false);
  const handleOpenModalCombo = () => setOpenModalCombo(true);
  const handleCloseModalCombo = () => setOpenModalCombo(false);

  const [originalRows, setoriginalRows] = useState<any>([])

  const [producto, setProducto] = useState<any>([])
  const [datosCombo, setDatosCombo] = useState<any>([])
  const [ElementosCombo, setElementosCombo] = useState<any>([])

  const [idProductoG, setIdProductoG] = useState('')
  const [nomProductoG, setNomProductoG] = useState('')
  const [ID_COMBO, setID_COMBO] = useState('')

  const [IdCategoria, setIdCategoria] = useState('')
  const [NomMenu, setNomMenu] = useState('')
  const [IdComboMadre, setIdComboMadre] = useState('')
  const [IdMenuCombo, setIdMenuCombo] = useState('')

  const [IdProductoMadre, setIdProductoMadre] = useState('')

  const [rows, setRows] = useState<any>(originalRows);

  const [activeBtnSearch, setActiveBtnSearch] = useState(false)
  const handleOpenBoton = () => setActiveBtnSearch(true);


  //star llamar a api
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadObtenerProductoP();
  }, []);

   //loading
   const [loading, setLoading] = useState(
    false
  );

  
//api para el select de productos 
  const loadObtenerProductoP = async () => {

    try {
      setLoading(true)
      const response = await loadApiProductos()
      setLoading(false)
      console.log("lista producto ", response)

      if (response?.status && response?.productos) {
        setProducto(response.productos)
        //setoriginalRows(response.usuarios)
        for (let i = 0; i < response?.productos?.length; i++) {
          //console.log("id producto madre ",response?.productos[i].ID_PRODUCTO_MADRE)
          setIdProductoMadre(response?.productos[i].ID_PRODUCTO_MADRE)
        }
      }

    } catch (error) {

    }

  }

  const loadObtenerListaCombo = async (ID_COMBO: number) => {


    try {
      setLoading(true)
      const response = await loadApiListaCombos(ID_COMBO);
      
      console.log("lista producto combo ", response)
      setLoading(false)
      if (response?.status && response?.combo) {
        setDatosCombo(response.combo)
        //setoriginalRows(response.usuarios)
      }
      
    } catch (error) {

    }

  }


  const handleSeleccioneProductosP = async (value: any) => {

    console.log("valee de primera Cate ", value)
    const { ID_PRODUCTO_MADRE, NOMBRE_PRO, COMBO } = value
    setIdProductoG(ID_PRODUCTO_MADRE)
    setNomProductoG(NOMBRE_PRO)
    setID_COMBO(COMBO)

  }

  const pasarParametros = async (row: any) => {
    const { ID_VENTAS_MENU_COMBO, COMBO_MADRE, NOMBRE_MENU, ID_CATEGORIA_1 } = row;
    console.log("row ", row)
    setIdCategoria(ID_CATEGORIA_1)
    setIdMenuCombo(ID_VENTAS_MENU_COMBO)
    setIdComboMadre(COMBO_MADRE)
    setNomMenu(NOMBRE_MENU)
    handleOpenModalCombo()
    try {
      setLoading(true)
      const response = await loadApiBuscarElementoCombo(
        Number(ID_CATEGORIA_1),
        Number(COMBO_MADRE),
        Number(idProductoG)
      );
      setLoading(false)
      console.log("LISTA ELEMENTOS SEGUN COMBO ", response)
      if (response?.status && response?.elementosCombo) {
        //setElementosCombo(response.elementosCombo)
      }
      if (Array.isArray(response.elementosCombo)) {
        setElementosCombo(response.elementosCombo)
        for (let i = 0; i < response?.elementosCombo?.length; i++) {
          
          if (response?.elementosCombo[i].OPCIONAL == 1) {
            setValue(`check_${i}`, true)
          } else {
            setValue(`check_${i}`, false)
          }
          if (response?.elementosCombo[i].PRECIO == '.00') {
            setValue(`precio_${i}`, 0)
          } else {
            setValue(`precio_${i}`,response?.elementosCombo[i].PRECIO)
          }
          
          

          if (response?.elementosCombo[i].OPCION_VISUAL == 0) {
            //setValue(`checkVisual_${i}`, true)
            setValue(`visual_${i}`,1)
          } else {
            //setValue(`checkVisual_${i}`, false)
            setValue(`visual_${i}`,response?.elementosCombo[i].OPCION_VISUAL)
          }
          

        }
      }

    } catch (error) {

    }

  }

  const ListarDatosTabla = async () => {
   
    try {
      setLoading(true)
      const response = await loadApiBuscarElementoCombo(
        Number(IdCategoria),
        Number(IdComboMadre),
        Number(idProductoG)
      );
      setLoading(false)
      console.log("LISTA ELEMENTOS SEGUN COMBO ", response)
      if (response?.status && response?.elementosCombo) {
        //setElementosCombo(response.elementosCombo)
      }
      if (Array.isArray(response.elementosCombo)) {
        setElementosCombo(response.elementosCombo)
        for (let i = 0; i < response?.elementosCombo?.length; i++) {
          
          if (response?.elementosCombo[i].OPCIONAL == 1) {
            setValue(`check_${i}`, true)
          } else {
            setValue(`check_${i}`, false)
          }
          if (response?.elementosCombo[i].PRECIO == '.00') {
            setValue(`precio_${i}`, 0)
          } else {
            setValue(`precio_${i}`,response?.elementosCombo[i].PRECIO)
          }
          //setValue(`precio_${i}`,response?.elementosCombo[i].PRECIO)
          

          if (response?.elementosCombo[i].OPCION_VISUAL == 0) {
            //setValue(`checkVisual_${i}`, true)
            setValue(`visual_${i}`,1)
          } else {
            //setValue(`checkVisual_${i}`, false)
            setValue(`visual_${i}`,response?.elementosCombo[i].OPCION_VISUAL)
          }
          

        }
      }

    } catch (error) {

    }

  }


  //end llamar a la api

  const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })

    AlertSave({ title: "", message: "Se ha quitadado el elemento del combo" });
  }

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'left',
    //color: theme.palette.text.secondary,
  }));

  
  return (
    <>
      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center'

      }}
      // onClick={handleClick}
      >

        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
          Receta Combo
        </Typography>
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
              <Button sx={{ fontSize: '1.5rem' }}><FcSearch /></Button> Buscador
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{
            boxShadow: '1px 2px 9px #918c8d',
          }}>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
              <Grid item xs={12} sm={12} md={0.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Productos</h5>

                  <Controller
                    control={control}
                    name="categoria"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                       // options={primeraCat}
                        options={producto}
                        noOptionsText={"Sin opciones"}
                        sx={{ width: '100%' }}
                        //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                        onChange={(event, item) => {
                          handleSeleccioneProductosP(item)
                          onChange(item)

                        }
                        }

                        value={value}
                        getOptionLabel={(option: any) => option.NOMBRE_PRO}
                        renderOption={(props, option, index) => {
                          const key = `listItem-${index}-${option.ID_PRODUCTO_MADRE}`;
                          return (
                            <li {...props} key={key}>
                              
                              {option['NOMBRE_PRO']}
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
              <Grid item xs={12} sm={12} md={2}>
                <br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button onClick={()=>{
                    loadObtenerListaCombo(Number(ID_COMBO))
                     //setActiveBtnSearch(!activeBtnSearch)
                     handleOpenBoton()
                  }} sx={{ backgroundColor: '#28A745' }} variant="contained" >Buscar</Button>

                </div>
               
               
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <br />
                {activeBtnSearch ?
                <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button onClick={handleOpenModalTres} sx={{ backgroundColor: '#DC3545' }} variant="contained" >Agregar</Button>

                </div>
                </>
                :null}
              </Grid>
            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>
      

      <Box sx={{ flexGrow: 2 }} >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          {datosCombo?.map((row: any) => {
            return (
              <>
                {Array.from(Array(1)).map((_, index) => (

                  <Grid item xs={4} sm={4} md={4} key={index} onClick={() => pasarParametros(row)}>

                    <div style={{
                      backgroundColor: 'black', padding: '3%', display: 'flex', flexDirection: 'row',
                      justifyContent: 'space-between', borderRadius: '4px', marginTop: '1%'
                      , alignItems: 'center'

                    }}>
                      <Typography variant="subtitle1" sx={{ color: 'white' }}>{row.NOMBRE_MENU}</Typography>
                      <Typography variant="subtitle2" sx={{ color: 'white' }}>(Ctd max:{row.CANTIDAD})</Typography>
                    </div>
                    <Item style={{ alignItems: 'left' }}> {/*hoa*/}
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs >
                          {/* <Typography gutterBottom variant="subtitle1" component="div">
                            Standard license
                          </Typography> */}
                        </Grid>
                      </Grid>
                    </Item>

                  </Grid>


                ))}
              </>
            )
          })}
        </Grid>
      </Box>


      <ModalPersonalized
        openModalPersonalized={openModal}
        handleOpenModalPersonalized={handleOpenModal}
        handleCloseModalPersonalized={handleCloseModal}
        description="Deseas cargar la sugerencia del perfil?, puedes perder toda informacion guardada anteriormente"
      />

      <ModalPersonalized
        openModalPersonalized={openModalDos}
        handleOpenModalPersonalized={handleOpenModalDos}
        handleCloseModalPersonalized={handleCloseModalDos}
        description="Deseas limpiar todas la modificaciones manuales?"
      />

      <ModalForm
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        ID_COMBO={ID_COMBO}
        idProductoG={idProductoG}
        loadObtenerListaCombo={loadObtenerListaCombo}
        loadObtenerProductoP={loadObtenerProductoP}
      />

      <ModalTabla
        openModalPersonalized={openModalCuatro}
        handleOpenModalPersonalized={handleOpenModalCuatro}
        handleCloseModalPersonalized={handleCloseModalCuatro}
        description="Deseas cerrar y guardar el formulario?"
      />

      <ModalAPCombo
        openModalCombo={openModalCombo}
        handleOpenModalCombo={handleOpenModalCombo}
        handleCloseModalCombo={handleCloseModalCombo}
        rows={rows}
        NomMenu={NomMenu}
        ElementosCombo={ElementosCombo}
        control={control}
        handleSubmit={handleSubmit}
        setValue={setValue}
        getValues={getValues}
        reset={reset}
        IdComboMadre={IdComboMadre}
        IdMenuCombo={IdMenuCombo}
        IdProductoMadre={IdProductoMadre}
        idProductoG={idProductoG}
        pasarParametros={ListarDatosTabla}
        unregister={unregister}
        deleteByIndex={(index: any) => deleteByIndex(index)}
      />
{loading ? <KDImage /> : null}
    </>
  )
}

export default RecetaCombo