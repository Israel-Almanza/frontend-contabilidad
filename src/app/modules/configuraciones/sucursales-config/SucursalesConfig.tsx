import { Typography, Button, Collapse, TextField, Modal, Grid, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
//import Paleta from '../../../core/components/common/Paleta'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';






//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//import dayjs from 'dayjs';

import PersonIcon from '@mui/icons-material/Person';
import { Controller, useForm } from "react-hook-form";

import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SellIcon from '@mui/icons-material/Sell';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import SignpostIcon from '@mui/icons-material/Signpost';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';



import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PaletaChild from './PaletaChild';


const StyledTabs = styled((props: any) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    //display: "flex",
    display: 'none',
    justifyContent: "center",
    backgroundColor: "none",

  },
  "& .MuiTabs-indicatorSpan": {

    display: 'none',
    backgroundColor: "none"
  }
});

const StyledTab = styled((props: any) => <Tab
  sx={{ height: '1px', width: '150px', padding: 0 }} disableRipple {...props} />)(

    ({ theme }) => ({
      textTransform: "none",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(12),
      marginRight: theme.spacing(1),
      // height: '0px',
      margin: '0px',
      // padding: '0px',

      color: "#4ea1ac",
      "&.Mui-selected": {
        color: "#DC3545",
        backgroundColor: 'white',
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#DC3545"
      },

    })
  );

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const genders = [
  {
    value: 'A',
    label: 'Sucursal Pando',
  },
  {
    value: 'B',
    label: 'Sucursal America',
  },
  {
    value: 'C',
    label: 'Sucursal Salamanca',
  },


];

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '38%',
  // bgcolor: 'background.paper',
  borderRadius: '8px',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#DC3545'),
  backgroundColor: '#DC3545',
  '&:hover': {
    backgroundColor: '#A31826',
  },
}));
const SucursalesConfig = () => {


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

  const [valueChildTabs, setValueChildTabs] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChangeTest = (event: any) => {
    setGender(event.target.value);
  };


  const [value, setValue] = React.useState(0);

  const handleChangeChildTabs = (event: any, newValue: any) => {
    setValueChildTabs(newValue);
  };

  const tabCustomStyle = {
    color: 'white',
    backgroundColor: '#DC3545',
    fontWeight: 'normal',
    fontSize: '14px',
    borderRadius: '5px',

    //border: '2px solid #0F8E40',

    //marginLeft: '10px',
    //marginRight: '10px',
    // paddingLeft: '10px',
    //paddingRight: '10px',
    //minHeight: '50px'
  }

  const renderSubChildNext = () => {
    return (

      <>

        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >

          <Grid item xs={12} sm={12} md={4}>

            <h5 style={{ padding: '0px', margin: '0px' }}>Mensaje en la Factura</h5>
            <TextField sx={{
              width: "100%",
              backgroundColor: '#FFFEC4'
            }}
              InputProps={{ sx: { height: 300 } }} type="text" label="Mensaje en la Factura"
              id="message"
              name="message"
              //   value={dbTextOne}
              //   onChange={handleChangeDbone}
              multiline
              rows={10}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <h5 style={{ padding: '0px', margin: '0px' }}>Mensaje en el Recibo</h5>
            <TextField sx={{
              width: "100%",
              backgroundColor: '#FFFEC4'
            }}
              InputProps={{ sx: { height: 300 } }} type="text" label="Mensaje en el Recibo"
              id="message"
              name="message"
              //   value={dbTextOne}
              //   onChange={handleChangeDbone}
              multiline
              rows={10}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <h5 style={{ padding: '0px', margin: '0px' }}>Mensaje en la Comanda</h5>
            <TextField sx={{
              width: "100%",
              backgroundColor: '#FFFEC4'
            }}
              InputProps={{ sx: { height: 300 } }} type="text" label="Mensaje en la Comanda"
              id="message"
              name="message"
              //   value={dbTextOne}
              //   onChange={handleChangeDbone}
              multiline
              rows={10}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}
            direction="row"
            justifyContent="center"
            alignItems="center">
            <ColorButton variant="contained" sx={{ marginTop: '20px' }} startIcon={<DownloadDoneIcon />}> Guardar</ColorButton>
          </Grid>

        </Grid>
      </>
    )
  }

  const renderChildPanel = (namePanel: any) => {
    return (
      <>
        <Typography variant="subtitle1" gutterBottom sx={{
          marginLeft: '15px',
          color: 'black', alignItems: 'center', fontWeight: 'bold'
        }} >
          {namePanel}
        </Typography>



      </>
    )
  }

  return (
    <>

      <Collapse in={openOne} timeout="auto" unmountOnExit>
        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
          Excel
        </Typography>

      </Collapse>
      <div style={{
        //backgroundColor: '#DC3545',
        padding: '0.5%', display: 'flex', flexDirection: 'row',
        justifyContent: 'flex-start', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginBottom: '5px',
        borderBottom: '2px solid #DFDFE0'

      }}
      // onClick={handleClick}
      >
        <Typography variant="subtitle1" gutterBottom sx={{
          marginLeft: '15px',
          color: 'black', alignItems: 'center'
        }} >
          Configuracion
        </Typography>

      </div>


      <Box sx={{ width: '100%', backgroundColor: 'white', margin: 'auto', borderRadius: '5px' }}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
          <Grid item xs={12} sm={12} md={4} >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '4px', color: '#666666' }}>
                Sucursal
              </Typography>


              <TextField
                id="outlined-select-gender"
                select
                label="Sucursal"
                //label={gender === "" ? "Seleccione una Opción" : ""}
                value={gender}
                onChange={handleChangeTest}
                //  sx={{ width: '100%' }}
                // InputLabelProps={{ shrink: false }}


                SelectProps={{
                  MenuProps: {

                  },
                }}
                //   margin='normal'
                size="small"
                variant="outlined"


              >
                {genders.map(option => (
                  <MenuItem key={option.value} value={option.value}

                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>


          <Grid item xs={12} sm={12} md={4} container
            direction="row"
            justifyContent="flex-start"
            alignItems="center">

            <ColorButton variant="contained" sx={{ marginTop: '34px' }}>Buscar</ColorButton>
          </Grid>
        </Grid>

      </Box>



      <PaletaChild name="Sucursal Pando" color="rgb(147, 20, 151)" COLOR_R="220" COLOR_G="53" COLOR_B="69"  />


    </>
  )
}

export default SucursalesConfig

/*

.tab {
  color: #0F8E40;

  font-weight: 800;
  font-size: 12px;

  border-radius: 20px;
  border: 2px solid #0F8E40;

  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  min-height: 35px
 
 
  
}

*/