import React, { useEffect,useState } from 'react'
import { Typography, Button, Collapse, TableRow, colors, Input, Checkbox, Grid, Container, Card, CardContent } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import TextField from '@mui/material/TextField';
import { ModalPersonalized } from './components/ModalPersonalized';
import TablaEventoS from './TablaEventoS';
import dataEventoSJson from '../../../../data/eventosignificativo/dataEventoSJson.json'

//tabla import
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { KeyboardArrowRight } from '@mui/icons-material';
import LastPageIcon from '@mui/icons-material/LastPage';
import { IoKeyOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsCalendarPlus } from "react-icons/bs";

const EventoSignificativo = () => {

  const [originalRows, setoriginalRows] = useState<any>([])

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

//<---modal
const [openModal, setOpenModal] = useState(false);

const handleOpenModal = () => setOpenModal(true);
const handleCloseModal = () => setOpenModal(false);
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
}, []);

const loadData = async () => {
  console.log("user data ", dataEventoSJson)
  setRows(dataEventoSJson)
  setoriginalRows(dataEventoSJson)
}

   //end llamar a la api

   const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

    return(
        <>
        <Container>
          <Card>
            <CardContent>
              <Grid>
                <Grid item xl={8} lg={6} md={5} sm={4} xs={3}>
                  <div style={{
                    backgroundColor: `#B01F1F`, padding: '0.5%', display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
                    , alignItems: 'center', position: "fixed", width: "80%"
                    }}
                  >
                  <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' , fontFamily:'Times New Roman' }} >
                    <RiCalendarEventFill fontSize={20}/>
                    Evento Justificativo
                  </Typography>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <Button sx={{backgroundColor:'#43AA47 ' }} variant="contained" startIcon={<BsCalendarPlus />} onClick={handleOpenModal}>Nuevo Evento Justificativo</Button>
                  <br/>
                  <br/>
                  <TextField
                label="Buscar"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={message}
                onChange={handleChangeSerach}
                //align="right"
              />
                  <TablaEventoS
                    tableData={rows}
                    deleteByIndex={(index: any) => deleteByIndex(index)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>

        <ModalPersonalized
        openModalPersonalized={openModal}
        handleOpenModalPersonalized={handleOpenModal}
        handleCloseModalPersonalized={handleCloseModal}
        description="Nuevo Evento Significativo"
      />
        </>
    )


}

export default EventoSignificativo