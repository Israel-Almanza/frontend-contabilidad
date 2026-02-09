import React, { useEffect, useState } from 'react'
import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, Grid, Container, Card, CardContent } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import TextField from '@mui/material/TextField';
import { ModalAgregarPerfil } from './components/ModalNewPerfil';
import TablaPerfil from './TablaPerfil';
import SearchBar from '@mkyy/mui-search-bar';
import dataPerfilJson from '../../../../data/perfil/dataPerfilJson.json'
import { usePerfil } from './services/usePerfil';
 




const Perfil = () => {

  const {loadApiListaPerfil} = usePerfil()
  const [originalRows, setoriginalRows] = useState<any>([])
  const [listPerfil, setListPerfil] = useState<any>(originalRows)
  //const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);

    const keys = ["ID_VENTAS_PERFIL","PERFIL"]
    const filteredRows = originalRows.filter((row: any) => {
      
      return keys.some((key: any) =>
        row[key]?.toString()?.toLowerCase()?.includes(searchedVal.toLowerCase())
      );
    });

    setListPerfil(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };
//<---modal
const [openModalAgregarPerfil, setOpenModalAgregarPerfil] = useState(false);

const handleOpenModalAgregarPerfil = () => setOpenModalAgregarPerfil(true);
const handleCloseModalAgregarPerfil = () => setOpenModalAgregarPerfil(false);
//modal--->
  const [gender, setGender] = React.useState("");

  const handleChange = (event: any) => {
      setGender(event.target.value);
  }; 

const [message, setMessage] = useState('');
  const handleChangeSerach = (event:any) => {
  
    console.log("event ",event.target.value)
    setMessage(event.target.value);
  };

//star llamar a api
useEffect(() => {
  // Actualiza el título del documento usando la API del navegador
  loadData();
  // loadObtenerListaPerfil()
}, []);

const loadData = async () => {
   console.log("user data ", dataPerfilJson)
   setListPerfil(dataPerfilJson)
   setoriginalRows(dataPerfilJson)
}

/* const loadObtenerListaPerfil = async () => {

  try {
    //setLoading(true)
    const response = await loadApiListaPerfil()
    //setLoading(false)
    console.log("lista perfil ", response)

    if (response?.status && response?.perfiles) {
      setListPerfil(response.perfiles)
      setoriginalRows(response.perfiles)
    }

  } catch (error) {

  }

} */

   //end llamar a la api
  /* const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }*/

  // const addElemento = () => {
  //   setRows([...rows,
  //   {
  //     id: 1,
  //     nombre: "Cajero",

  //     pagar: 10
  //   }
  //   ]);


  // }
    return(
        <>
         <div style={{
        backgroundColor: '#DC3545', padding: '0.1%', display: 'flex', flexDirection: 'row',
        justifyContent: 'flex-start', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >
        
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
          <Grid item xs={11} sm={11} md={11}>
          
            <Typography variant="subtitle1" gutterBottom sx={{
              marginLeft: '10px', marginTop: '5px',
              color: 'white', alignItems: 'center'
            }} >
              <ManageAccountsIcon sx={{ marginLeft: '20px', color: 'white' }} />
              PERFILES
            
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <div>
              <Button //onClick={() => setActiveBtnSearch(!activeBtnSearch)}
              onClick={handleOpenModalAgregarPerfil}
               sx={{ fontSize: '1.6em', color: 'white' }}><MdOutlinePersonAddAlt1 /></Button>
     

            </div>
          </Grid>
        </Grid>
      </div>
        <Container>
          <Card>
            <CardContent>
              <Grid>
                <Grid item xl={8} lg={6} md={5} sm={4} xs={3}>
                  {/* <div style={{
                    backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', borderRadius: '5px', marginTop: '0%'
                    , alignItems: 'center'
                    }}
                  >
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontFamily:'Times New Roman' }} >
                    <ManageAccountsIcon/>
                    PERFILES
                  </Typography>
                  </div>
                  <br/>
                  <Button sx={{backgroundColor:'#43AA47 ' }} variant="contained" startIcon={<MdOutlinePersonAddAlt1 />} onClick={handleOpenModalAgregarPerfil}>Nuevo Perfil</Button>
                  <br/> */}
                  <br/>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'right' }}>
                    <SearchBar
                      value={searched}
                      onChange={(searchVal) => requestSearch(searchVal)}
                      onCancelResearch={() => cancelSearch()}
                      placeholder='Buscar'
                    />
                  </div>
                  <TablaPerfil
                    tableData={listPerfil}
                    loadObtenerListaPerfil={loadData}
                    //deleteByIndex={(index: any) => deleteByIndex(index)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
        <br/>
        

        <ModalAgregarPerfil
        openModalAgregarPerfil={openModalAgregarPerfil}
        handleOpenModalAgregarPerfil={handleOpenModalAgregarPerfil}
        handleCloseModalAgregarPerfil={handleCloseModalAgregarPerfil}
        loadObtenerListaPerfil = { loadData}
        //addtest={addElemento}
        //description="Nuevo Perfil"
      />

      
        </>
    )


}

export default Perfil