import { Typography, Button, Collapse, TextField, Modal, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'



import Box from '@mui/material/Box';

import TablaBorrarUsuario from './TablaBorrarUsuario';
import SearchBar from '@mkyy/mui-search-bar';

import { useBorrarUsuario } from './services/useBorrarUsuario';




const BorrarUsuario = () => {

  const { loadApigetUsuariosconBaja,
    loadApiDeleteUsuario} = useBorrarUsuario()




  const [originalRows, setoriginalRows] = useState<any>([])


  const [rows, setRows] = useState<any>(originalRows);
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

    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };


  //star llamar a api
  useEffect(() => {

    loadgetUsuariosconBaja();
  }, []);


  const loadgetUsuariosconBaja = async  () => {

    try {
      const response = await loadApigetUsuariosconBaja()
      console.log("lista usuarios ", response.usuarios)
      //setUsuarios(response.usuarios)
      if(response?.status && response?.usuarios){
        setRows(response.usuarios)
        setoriginalRows(response.usuarios)
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
  }

  return (
    <>




      <div style={{
        backgroundColor: '#DC3545', padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px'

      }}
      // onClick={handleClick}
      >

        <Typography variant="subtitle1" gutterBottom sx={{
          marginLeft: '15px',
          color: 'white', alignItems: 'center'
        }} >
          ELIMINAR USUARIO
        </Typography>

      </div>

  
      <div style={{
        padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'start'
        , alignItems: 'end',

      }}
      // onClick={handleClick}
      >


      </div>

      <br />

      <Box sx={{ width: '100%' }}>


        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
          , alignContent: 'center'
        }}>
  

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/*  <h6 style={{ padding: '0px', margin: '0px' }}>Buscar</h6>*/}
            &nbsp;&nbsp;
            {/*<TextField
              label="Buscar"
              id="outlined-size-small"
              defaultValue="Small"
              //  type='number'
              size="small"


              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
            //onCancelSearch={() => cancelSearch()}
            // value={message}
            //    onChange={handleChangeSerach}


            />*/}
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
      <TablaBorrarUsuario
        tableData={rows}
        loadgetUsuariosconBaja={loadgetUsuariosconBaja}
        deleteByIndex={(index: any) => deleteByIndex(index)}
      />




    </>
  )
}

export default BorrarUsuario