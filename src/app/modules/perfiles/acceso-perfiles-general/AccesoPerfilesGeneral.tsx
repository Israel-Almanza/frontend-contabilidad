import { Typography, Button, Collapse, TextField, Modal, Checkbox, Grid, InputAdornment, ListItemButton, List, ListItemText, Accordion, AccordionSummary, AccordionDetails, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'


//import PaletaChildConsolidados from './PaletaChildConsolidados';
//import Paleta from '../../../core/components/common/Paleta'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import TablaChildPerfilesGeneral from './components/TablaChildPerfilesGeneral';



import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import SearchIcon from '@mui/icons-material/Search';



import { Controller, useForm } from "react-hook-form";

import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import pruebaDatos from "../../../../data/seguridad/user-general/userGeneralJson.json";


import { useAccesoPerfilesGeneral } from './services/useAccesoPerfilesGeneral';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { AlertError, AlertSave } from '../../../common/alerts/alerts';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));
const AccesoPerfilesGeneral = () => {


  const { loadApiGetPerfiles, loadApiGetgetSearchUsuarioVenta, loadApiSetUpdatePermiso } = useAccesoPerfilesGeneral();
  const [ListUsaurios, setListUsaurios] = useState<any>([]);
  const [idPerfil, setIdPerfil] = useState('')
  const [menuData, setMenuData] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {

    loadGetUsuariosforVentas()
  }, []);


  const loadGetUsuariosforVentas = async () => {
    try {
      const response = await loadApiGetPerfiles();
      console.log("response data ", response)
      if (response?.status && response?.perfiles) {
        setListUsaurios(response?.perfiles)

      }

    } catch (error) {

    }
  }


 

  const handleSeleccionePerfil = (value: any) => {
    console.log("value usuario ", value)

    setMenuData([]);
    const {id } = value
    setIdPerfil(id)

    //recuperar el nombre de la sucursal

  }


  const loadGetgetSearchUsuarioVenta = async () => {
    if (!idPerfil) {
      return;
    }

    try {
      setLoading(true);
      const response = await loadApiGetgetSearchUsuarioVenta(idPerfil);
      setLoading(false);
      console.log("response list menus info ", response)
      if (response?.status && response?.menu) {
        setMenuData(response?.menu)
      }

    } catch (error) {

    }
  }



  const [SUBNIVEL, SET_SUBNIVEL] = useState<any>(pruebaDatos)

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };





  const CustomRenderCheck = (ACCEDE: number, ID_VENTAS_ACCESO: string) => {
    const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
    const [loadingX, setLoadingX] = useState(false);

    useEffect(() => {
      // Actualiza el título del documento usando la API del navegador
      if (ACCEDE == 1) {
        setValue(`padre`, true)
      }
      if (ACCEDE == 0) {
        setValue(`padre`, false)
      }
    }, []);


    const hadleChangeCheked = async (index: number, estado: boolean, idVentasAcceso: string) => {
      console.log("index ff", index);
      console.log("valor ff", estado);
      console.log("valor ff ", index)

     

      //setValue(`check_father`,!!estado)



      console.log("show", getValues())
      if (!idVentasAcceso || !idPerfil) {
        return;
      }



      if (estado) {
        setLoadingX(true);
        const response = await loadApiSetUpdatePermiso("1", idPerfil, idVentasAcceso)
        setValue("padre", !!estado)
        setLoadingX(false);
        if (response?.status && response?.message) {
          AlertSave({ title: '', message: `${response?.message}` })
          // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
        } else {
          AlertError({ title: '', message: 'Algo salió mal' })
        }

      } else {
        setLoadingX(true);
        const response = await loadApiSetUpdatePermiso("0", idPerfil, idVentasAcceso)
        setValue("padre", !!estado)
        setLoadingX(false);
        if (response?.status && response?.message) {
          AlertSave({ title: '', message: `${response?.message}` })
          // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
        } else {
          AlertError({ title: '', message: 'Algo salió mal' })
        }

      }


    }

    return (<><Controller
      name={"padre"}
      control={control}
      render={({ field: props }: any) => (
        <Checkbox
          {...props}


          //checked={props.value}
          //  icon={<LockOpenRoundedIcon sx={{ color: 'black' }} />} checkedIcon={<LockSharpIcon sx={{ color: 'black' }} />}

          icon={<LockSharpIcon sx={{ color: 'black' }} />} checkedIcon={<LockOpenRoundedIcon sx={{ color: 'black' }} />}
          sx={{ padding: 0, margin: 0 }}
          size="small"
          checked={!!props.value}

          onChange={(e: any) => {
            props.onChange(e.target.checked)
            hadleChangeCheked(0, e.target.checked, ID_VENTAS_ACCESO)
          }}
        // onChange={(e: any) => hadleChangeCheked(0, e.target.checked, ID_VENTAS_ACCESO)}

        />
      )}
    />
  {loadingX ? <KDImage

/> : null}

 
    </>
    )
  }




  function SidebarItem(elemento: any) {



    var { item, controlIndex } = elemento;



    const [collapsed, setCollapsed] = React.useState(false);
    const { title, NOMBRE, items, SUBNIVEL, LINK, lista, ID_VENTAS_ACCESO, ACCEDE } = item;



    //code copy  




    if (SUBNIVEL == undefined || SUBNIVEL?.length <= 0) {

      var arrayTemp: any = [];
      arrayTemp.push(item)
      return (
        <TablaChildPerfilesGeneral idPerfil={idPerfil} lista={arrayTemp} />
      )
    }


    function toggleCollapse() {
      setCollapsed(prevValue => !prevValue);
    }

    function onClick() {

      //console.log("items ", NOMBRE, LINK, controlIndex)
      console.log("items ", NOMBRE, controlIndex)
      //  controlRoutersNavigation(NOMBRE, LINK)

      if (Array.isArray(SUBNIVEL)) {
        toggleCollapse();
      }
    }

    var styleTitle = {
      backgroundColor: (controlIndex == 0 ? '#EF9A9A' : 'white'),

    }

    controlIndex = controlIndex + 1;

    let expandIcon;
    if (Array.isArray(SUBNIVEL) && SUBNIVEL?.length || lista?.length) {
      expandIcon = !collapsed ? <ExpandLess onClick={onClick} /> : <ExpandMore onClick={onClick} />;
    }


    return (
      <>
        <List component="div" disablePadding>
          <ListItemButton sx={{
            pl: 2 + controlIndex * 2, color: 'black', ...styleTitle, width: '100%'
          }}  //onClick={onClick} 
          >

            {/*<ListItemText sx={{ color: 'black',backgroundColor:'yellow',width:'30%' }} primary={NOMBRE} primaryTypographyProps={{ fontSize: '11px' }} />*/}

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

              {/* <button onClick={() => console.log("get valores ", getValues())}>get valores</button>*/}

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '48%' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'black' }} >
                  {NOMBRE}
                </Typography>

                {CustomRenderCheck(ACCEDE, ID_VENTAS_ACCESO)}


              </div>

              {expandIcon}



            </div>



          </ListItemButton>


        </List>
        <Collapse
          in={!collapsed}
          //in={!collapsed} 
          timeout="auto" unmountOnExit
        >

          <List disablePadding dense>

            {SUBNIVEL && SUBNIVEL.length > 0 ?
              <>
                {SUBNIVEL.map((subItem: any, index: number) => (
                  <SidebarItem key={`${subItem.id}${index}`} item={subItem} controlIndex={controlIndex} />
                ))}
              </> :

              null
            }

          </List>

        </Collapse>
      </>
    );
  }

  /*
  function Sidebar({ items ,SUBNIVEL  }: any) {
    console.log("items ...  ",items )
    console.log("items ...  ",SUBNIVEL )
    return (
      <>
        <List disablePadding dense>
          {items.map((sidebarItem: any, index: any) => (
            <SidebarItem
              key={`${sidebarItem.title}${index}`}
              item={sidebarItem}

            />
          ))}
        </List>
      </>
    );
  }
  */

  function Sidebar({ items, SUBNIVEL }: any) {
    // console.log("datos ...  ", datos)
    // console.log("niveles ...  ",SUBNIVEL )
    var controlIndex = 0;


    return (
      <>

        {SUBNIVEL?.map((sidebarItem: any, index: any) => (
          <SidebarItem
            key={`${sidebarItem.title}${index}`}
            item={sidebarItem}
            controlIndex={controlIndex}
          />
        ))}




      </>
    );
  }

  return (
    <>




      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'flex-start', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >
        <PersonAddAlt1Icon sx={{ marginLeft: '20px', color: 'white' }} />

        <Typography variant="subtitle1" gutterBottom sx={{
          marginLeft: '15px',
          color: 'white', alignItems: 'center'
        }} >
          Acceso de Perfiles - General
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

              <Grid item xs={12} sm={6} md={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Perfiles</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ListUsaurios}
                    sx={{ width: '100%' }}
                    //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                    onChange={(event, value) =>
                      handleSeleccionePerfil(value)
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
                    getOptionLabel={(option: any) => option.text}
                  />



                </div>
              </Grid>




              <Grid item xs={12} sm={12} md={2} container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">

                <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                  onClick={() => loadGetgetSearchUsuarioVenta()}
                >Buscar</ColorButton>
              </Grid>

            </Grid>

          </AccordionDetails>

        </Accordion>
      </div>



      <br />




      <Sidebar SUBNIVEL={menuData} />
      {/*<Sidebar SUBNIVEL={SUBNIVEL} />*/}

      {loading ? <KDImage

/> : null}



    </>
  )
}

export default AccesoPerfilesGeneral