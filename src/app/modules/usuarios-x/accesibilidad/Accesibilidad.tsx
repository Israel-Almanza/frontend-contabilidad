import { Typography, Button, Collapse, TextField, Modal, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SearchBar from '@mkyy/mui-search-bar';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import ExplicitOutlinedIcon from '@mui/icons-material/ExplicitOutlined';


import FindInPageIcon from '@mui/icons-material/FindInPage';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TableViewIcon from '@mui/icons-material/TableView';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Controller, useForm } from "react-hook-form";
import { ModalBajaUsuario } from './components/ModalBajaUsuario';
import { ModalForm } from './components/ModalForm';
import { ModalAsignarUbicacion } from './components/ModalAsignarUbicacion';
import { ModalTabla } from './components/ModalTabla';
import TablaAccesibilidad from './TablaAccesibilidad';
import { styled } from "@mui/system";
import { useAccesibilidad } from './services/useAccesibilidad';
import { FaDesktop } from 'react-icons/fa';


//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//import dayjs from 'dayjs';


const ColorButtonGreen = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#28A745',
  '&:hover': {
    backgroundColor: '#1B8332',
  },
}));


const ChatBot = () => {

  const { loadApiUsuariosAccesibilidad, loadApiListaSucursales, loadApiListaPerfiles, loadApiListaCargos, loadApiListaAFP, loadApiBajaUsuario, loadApiEditarUsuario, loadApiGuardarUsuario, loadApiAltaUsuario, loadApiAsignarUbicacion} = useAccesibilidad()
  const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();
  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };



  const [valueSelect, setValueSelct] = useState('Button Prueba');

  const handleChangeSelect = (event: any) => {
    //setAge(event.target.value);
    setValueSelct(event.target.value)
  };


  const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
    setGender(event.target.value);
  };

  

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

  //const [originalRows, setoriginalRows] = useState<any>([])
  //const [rows, setRows] = useState<any>(originalRows);
  //const [searched, setSearched] = useState<string>("");

  const [message, setMessage] = useState('');
  const handleChangeSerach = (event: any) => {

    console.log("event ", event.target.value)
    setMessage(event.target.value);
  };

  const [usuarios, setUsuarios] = useState<any>([])
  const [ListSucursales, setListSucursales] = useState<any>([])
 
  const [ListPerfiles, setListPerfiles] = useState<any>([])
  const [ListCargos, setListCargos] = useState<any>([])
  const [ListAFPs, setListAFPs] = useState<any>([])

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
  //  loadObtenerUsuarios()
   // loadSucursales()
    //loadPerfiles()
    //loadCargos()
    //loadAFP()
   
  }, []);

  //loading
  const [loading, setLoading] = useState(
    false
  );

  /*const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    //console.log("result ****",originalRows)
    setSearched(searchedVal);
    const keys = ["ID_USUARIO", "NOMBRE", "CI", "CELULAR", "TIPO_USUARIO", "AREA", "NOMBRE_CARGO"]
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
  };*/

  const [originalRows, setoriginalRows] = useState<any>([])


  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);

    const keys = ["ID_USUARIO", "NOMBRE", "CI", "CELULAR", "TIPO_USUARIO", "AREA", "NOMBRE_CARGO"]
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


  const loadObtenerUsuarios = async () => {
    

    try {
      setLoading(true)
      const response = await loadApiUsuariosAccesibilidad()
      setLoading(false)
      console.log("lista usuarios ", response.usuarios)
      setUsuarios(response.usuarios)

      if(response?.status && response?.usuarios){
        setRows(response.usuarios)
        setoriginalRows(response.usuarios)
      }
      
    } catch (error) {

    }

  }

  const loadSucursales = async () => {
    try {
      const response = await loadApiListaSucursales();
      //console.log("resp Lista Sucursal ", response)
      if (Array.isArray(response)) {
        setListSucursales(response)
        //actulizar select
      }

    } catch (error) {

    }
  }

 //lista de perfiles
 const loadPerfiles = async () => {
  try {
    const response = await loadApiListaPerfiles();
    //console.log("resp Lista perfiles ", response.perfiles)
    
      setListPerfiles(response.perfiles)
      //actulizar select
    

  } catch (error) {

  }
}

 //lista de cargos
 const loadCargos = async () => {
  try {
    const response = await loadApiListaCargos();
    //console.log("resp Lista cargos ", response.cargos)
    
      setListCargos(response.cargos)
      //actulizar select
    

  } catch (error) {

  }
}

//lista de AFP
const loadAFP = async () => {
  try {
    const response = await loadApiListaAFP();
    console.log("resp Lista AFP ", response.afps)
    
      setListAFPs(response.afps)
      //actulizar select
    

  } catch (error) {

  }
}


const arrayDemo = [{ id: 1 }, { id: 2 }, { id: 3 }]

  return (
    <>
<div>


<Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >



  <Grid item xs={12} sm={12} md={12}>
    <br />

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

      <Button onClick={handleOpenModalTres} variant="outlined" >Agregar aaaaaa</Button>

    </div>

  </Grid>
</Grid>




</div>

<Box sx={{ flexGrow: 2 }} >
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
  {arrayDemo?.map((row: any) => {
    return (
      <>
        {Array.from(Array(1)).map((_, index) => (

          <Grid item xs={4} sm={4} md={4} key={index}   >
            <div style={{ width: '100%', backgroundColor: 'white' }}>

              <div style={{margin:'5%'}}>
                <div style={{
                  backgroundColor: 'white', padding: '1%', display: 'flex', flexDirection: 'row',
                  justifyContent: 'space-between', borderRadius: '4px', marginTop: '1%'
                  , alignItems: 'center'

                }}>
                  <Typography variant="subtitle1" sx={{ color: 'black',fontWeight:'bold' }}>2/2</Typography>
               <FaDesktop  style={{color:'white',backgroundColor:'#5E72E4',fontSize:'50px',
              padding:'10px', borderRadius:'20px'}}/>
                </div>
                <div>
                  <Typography gutterBottom variant="subtitle1" component="div" sx={{ margin: 0, padding: 0 }}>
                  Dispositivos
                  </Typography>
                </div>
              </div>
            </div>

          </Grid>


        ))}
      </>
    )
  })}
</Grid>
</Box>


      <div 
      // onClick={handleClick}
      >
        
   
            <div>
              <Button //onClick={() => setActiveBtnSearch(!activeBtnSearch)}
              onClick={handleOpenModalTres}
               sx={{ fontSize: '1.6em', color: 'white' }}>Agregar OK</Button>
     

            </div>
        
        
      </div>



      {/* <ColorButtonGreen variant="contained" sx={{ marginTop: '20px' }} 
      onClick={handleOpenModalTres}><PersonAddAlt1Icon/>Nuevo Usuario</ColorButtonGreen> */}

      <br />
      <Box sx={{ width: '100%' }}>


        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
          , alignContent: 'center'
        }}>
          {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h6 style={{ padding: '0px', margin: '0px' }}>Mostrar</h6>
            &nbsp;&nbsp;
            <TextField
              label="Mostrar"
              id="outlined-size-small"
              defaultValue="Small"
              type='number'
              size="small"
            />
          </div> */}

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
      <TablaAccesibilidad Usuarios={usuarios}
                          loadObtenerUsuarios={loadObtenerUsuarios}
                          Lista={ListSucursales}
                          Perfiles={ListPerfiles}
                          Cargos={ListCargos}
                          ListaAfps={ListAFPs}
                          register={register}
                          tableData={rows}
      
      />

      {/*<Demo />*/}


      <ModalForm Lista={ListSucursales}
                Perfiles={ListPerfiles}
                Cargos={ListCargos}
                ListaAfps={ListAFPs}
                loadObtenerUsuarios={loadObtenerUsuarios}
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        description="Deseas cerrar y guardar el formulario?"
      />

      <ModalTabla
        openModalPersonalized={openModalCuatro}
        handleOpenModalPersonalized={handleOpenModalCuatro}
        handleCloseModalPersonalized={handleCloseModalCuatro}
        description="Deseas cerrar y guardar el formulario?"
      />
    {loading ? <KDImage
      /> : null}

    </>
  )
}

export default ChatBot