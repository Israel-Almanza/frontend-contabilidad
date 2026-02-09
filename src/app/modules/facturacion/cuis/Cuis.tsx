import React, { useEffect,useState } from 'react'
import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, Grid, Container, Card, CardContent } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import TextField from '@mui/material/TextField';
import { ModalNewCuis } from './components/ModalNewCuis';
import dataLlaveJson from '../../../../data/llave/dataLlaveJson.json'
import TablaCuis from './TablaCuis';
import SearchBar from '@mkyy/mui-search-bar';
import { IoKeyOutline } from "react-icons/io5";
import { useCuis } from './services/useCuis';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Cuis = () => {

  const {loadApiListarCuis, loadApiListarSucursales} = useCuis();

 
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
   // loadObtenerPrimeraCategoria()
    loadObtenerListaCuis()
    loadObtenerListaSucursales()
  }, []);


  //loading
  const [loading, setLoading] = useState(
    false
  );
const [ListSucursal, setListSucursal] = useState<any>([])
//row de json para la tabla
const [originalRows, setoriginalRows] = useState<any>([])
const [ListCuis, setListCuis] = useState<any>(originalRows);
// const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");

  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);

    const keys = ["ID_VENTAS_LLAVE","TOKEN_API","FECHA_ACTIVACION","FECHA_VENCIMIENTO"]
    const filteredRows = originalRows.filter((row: any) => {
      
      return keys.some((key: any) =>
        row[key]?.toString()?.toLowerCase()?.includes(searchedVal.toLowerCase())
      );
    });

    setListCuis(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };
//fin json
//<---modal
const [openModalRegistrarCuis, setOpenModalRegistrarCuis] = useState(false);

const handleOpenModalRegistrarCuis = () => setOpenModalRegistrarCuis(true);
const handleCloseModalRegistrarCuis = () => setOpenModalRegistrarCuis(false);
//modal--->
  const [gender, setGender] = React.useState("");

  const loadObtenerListaCuis = async () => {
    try {
      setLoading(true)
      const response = await loadApiListarCuis()
      setLoading(false)
      console.log("lista cuis ", response)
      
      //if(response?.status && response?.data){
        setListCuis(response.data)
        setoriginalRows(response.data)
      //}
      
    } catch (error) {
  
    }
  
  }

  const loadObtenerListaSucursales = async () => {
    try {
      setLoading(true)
      const response = await loadApiListarSucursales()
      setLoading(false)
      console.log("lista sucursal ", response)
      
      if(response?.status && response?.sucursales){
        setListSucursal(response.sucursales)
      }
      
    } catch (error) {
  
    }
  
  }

  const handleChange = (event: any) => {
      setGender(event.target.value);
  }; 

const [message, setMessage] = useState('');
  const handleChangeSerach = (event:any) => {
  
    console.log("event ",event.target.value)
    setMessage(event.target.value);
  };



    return(
        <>
         <div style={{
        backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center'

      }}

      >

        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' , fontFamily:'Times New Roman' }} >
          <IoKeyOutline/>
          CUIS
        </Typography>
        <div>
              <Button //onClick={() => setActiveBtnSearch(!activeBtnSearch)}
              onClick={handleOpenModalRegistrarCuis}
               sx={{ fontSize: '1.6em', color: 'white' }}><IoKeyOutline/><AddCircleOutlineIcon /></Button>
     <Button></Button>

            </div>
        
      </div>
        
          <Card >
            <CardContent >
              <Grid item md={12} sm={12} xs={12}>
                <Grid item md={12} sm={12} xs={12}>
                <br/>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'right' }}>
                  <SearchBar
                      value={searched}
                      onChange={(searchVal) => requestSearch(searchVal)}
                      onCancelResearch={() => cancelSearch()}
                      placeholder='Buscar'
                    />
                  </div>
                  <TablaCuis
                    tableData={ListCuis}
                    loadObtenerListaCuis={loadObtenerListaCuis}
                    //deleteByIndex={(index: any) => deleteByIndex(index)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
       

        <ModalNewCuis
        openModalRegistrarCuis={openModalRegistrarCuis}
        handleOpenModalRegistrarCuis={handleOpenModalRegistrarCuis}
        handleCloseModalRegistrarCuis={handleCloseModalRegistrarCuis}
        //addtest={addElemento}
        ListSucursal={ListSucursal}
        loadObtenerListaCuis={loadObtenerListaCuis}
      />
       {loading ? <KDImage /> : null}
        </>
    )


}

export default Cuis