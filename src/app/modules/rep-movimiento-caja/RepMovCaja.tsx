import { Typography, Button, Collapse, TextField, Modal, Grid, Container, Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { SiMicrosoftexcel } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import Box from '@mui/material/Box';
//import { createStyles, makeStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material';
import TablaRepMovCaja from './TablaRepMovCaja';
import SearchBar from '@mkyy/mui-search-bar';
import dataMovCajaJson from '../../../data/movcaja/dataMovCajaJson.json'


/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
  }),
);*/

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '38%',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RepMovCaja = () => {

  const classes = useStyles();

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


  const [message, setMessage] = useState('');
  const handleChangeSerach = (event: any) => {

    console.log("event ", event.target.value)
    setMessage(event.target.value);
  };
  const [originalRows, setoriginalRows] = useState<any>([])

  /*
    const originalRows: any[] = [
      { name: "Pizza", calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
      { name: "Hot Dog", calories: 300, fat: 6.0, carbs: 24, protein: 4.0 },
      { name: "Burger", calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
      { name: "Hamburger", calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
      { name: "Fries", calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
      { name: "Ice Cream", calories: 700, fat: 6.0, carbs: 24, protein: 4.0 }
    ];*/
  const [rows, setRows] = useState<any>(originalRows);
  const [searched, setSearched] = useState<string>("");


  const requestSearch = (searchedVal: string) => {
    //console.log("serach  ", searchedVal)
    setSearched(searchedVal);
    const filteredRows = originalRows.filter((row: any) => {
      return row.nombre.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };


  //star llamar a api
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    loadData();
  }, []);

  const loadData = async () => {
    console.log("user data ", dataMovCajaJson)
    setRows(dataMovCajaJson)
    setoriginalRows(dataMovCajaJson)
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
        backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '0%'
        , alignItems: 'center', position: "fixed", width: "90%" 
        }}
      >

        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white', fontFamily:'Times New Roman' }} >
          Movimientos de Caja
          <Button sx={{ fontSize: '1.8em',color: 'white' }}
            onClick={() => window.open('https://sistemademo.azurewebsites.net/index.php/recepcion-excel/ventas/AE', '_self', 'noreferrer')} 
          ><SiMicrosoftexcel/></Button>
          <Button sx={{ fontSize: '1.8em',color: 'white' }}><ImFilePdf/></Button> 
        </Typography>
      </div>
      <br />
      <br />
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker sx={{ width: '190px',height:'10px' }}
     

         // label="Basic example"
          //value={value}
          onChange={(newValue) => {
            //setValue(newValue);
            console.log("new vale ",newValue)
          }}
          slotProps={{ textField: { size: 'small' } }} 

        />




      </LocalizationProvider>*/}

      <div style={{
        padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'start'
        , alignItems: 'end',

      }}
      // onClick={handleClick}
      >
      </div>
      <br/>
      <Container>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Fecha Inicial"
                  type="date"
                  defaultValue="hoy"
                  size='small'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </form>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Fecha Final"
                  type="date"
                  defaultValue="DD/MM/YYYY"
                  size='small'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </form>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                
            <Button variant="contained" color="primary">Buscar</Button>
          </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <br />
      <Box sx={{ width: '100%' }}>
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
          , alignContent: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            
          </div>

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
      <TablaRepMovCaja
        tableData={rows}
        deleteByIndex={(index: any) => deleteByIndex(index)}
      />




      {/*<ModalPersonalized
        openModalPersonalized={openModalTres}
        handleOpenModalPersonalized={handleOpenModalTres}
        handleCloseModalPersonalized={handleCloseModalTres}
        description="Deseas cerrar y guardar el formulario?"
      />*/}
      
      {/*customModal()*/}
    </>
  )
}
export default RepMovCaja