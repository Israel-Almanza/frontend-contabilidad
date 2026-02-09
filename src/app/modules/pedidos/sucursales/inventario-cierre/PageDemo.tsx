import { Typography, Button, Collapse } from '@mui/material'
import React, { useState } from 'react'
import Paleta from '../../../core/components/common/Paleta'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import ExplicitOutlinedIcon from '@mui/icons-material/ExplicitOutlined';


const PageDemo = () => {

  const [openOne, setOpenOne] = useState(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };

  const [age, setAge] = React.useState('Button Prueba');

  const handleChange = (event: any) => {
    //setAge(event.target.value);
  };


  return (
    <>

     <div>Page Demo</div>
    </>
  )
}

export default PageDemo