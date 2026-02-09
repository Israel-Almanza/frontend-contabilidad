import React, { useEffect,useState } from 'react'
import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, Grid, Container, Card, CardContent } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import TextField from '@mui/material/TextField';
import { ModalRegistrarLlave } from './components/ModalRegistrarLlave';
import dataLlaveJson from '../../../../data/llave/dataLlaveJson.json'
import TablaLlave from './TablaLlave';
import SearchBar from '@mkyy/mui-search-bar';
import { IoKeyOutline } from "react-icons/io5";
import { useLlave } from './services/useLlave';
import { KDImage } from '../../../../core/modal-loading/KDImage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Llave = () => {

  const {loadApiListarLlaves} = useLlave();

 
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
   // loadObtenerPrimeraCategoria()
    loadObtenerListaLlaves()

  }, []);


  //loading
  const [loading, setLoading] = useState(
    false
  );

//row de json para la tabla
const [originalRows, setoriginalRows] = useState<any>([])
const [ListLlaves, setListLlaves] = useState<any>(originalRows);
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

    setListLlaves(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };
//fin json
//<---modal
const [openModalRegistrarLlave, setOpenModalRegistrarLlave] = useState(false);

const handleOpenModalRegistrarLlave = () => setOpenModalRegistrarLlave(true);
const handleCloseModalRegistrarLlave = () => setOpenModalRegistrarLlave(false);
//modal--->
  const [gender, setGender] = React.useState("");

  const loadObtenerListaLlaves = async () => {
    try {
      setLoading(true)
      const response = await loadApiListarLlaves()
      setLoading(false)
      console.log("lista llaves ", response)
      
      if(response?.status && response?.llaves){
        setListLlaves(response.llaves)
        setoriginalRows(response.llaves)
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



/*const loadData = async () => {
  console.log("user data ", dataLlaveJson)
  setRows(dataLlaveJson)
  setoriginalRows(dataLlaveJson)
}*/

   //end llamar a la api

  /* const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }  */

 /* const addElemento = () => {
    setRows([...rows,
    {
      id: 7,
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSb25h",
      fechaactivacion: "2022-11-10",
      fechaven: "2023-10-31",
      pagar: 10
    }
    ]);


  }*/

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
          API KEY's
        </Typography>
        <div>
              <Button //onClick={() => setActiveBtnSearch(!activeBtnSearch)}
              onClick={handleOpenModalRegistrarLlave}
               sx={{ fontSize: '1.6em', color: 'white' }}><IoKeyOutline/><AddCircleOutlineIcon /></Button>
     <Button></Button>

            </div>
        
      </div>
        <Container>
          <Card>
            <CardContent>
              <Grid>
                <Grid item xl={8} lg={6} md={5} sm={4} xs={3}>
                <br/>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'right' }}>
                  <SearchBar
                      value={searched}
                      onChange={(searchVal) => requestSearch(searchVal)}
                      onCancelResearch={() => cancelSearch()}
                      placeholder='Buscar'
                    />
                  </div>
                  <TablaLlave
                    tableData={ListLlaves}
                    loadObtenerListaLlaves={loadObtenerListaLlaves}
                    //deleteByIndex={(index: any) => deleteByIndex(index)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>

        <ModalRegistrarLlave
        openModalRegistrarLlave={openModalRegistrarLlave}
        handleOpenModalRegistrarLlave={handleOpenModalRegistrarLlave}
        handleCloseModalRegistrarLlave={handleCloseModalRegistrarLlave}
        //addtest={addElemento}
        loadObtenerListaLlaves={loadObtenerListaLlaves}
      />
       {loading ? <KDImage /> : null}
        </>
    )


}

export default Llave