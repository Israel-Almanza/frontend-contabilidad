import { Collapse, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState, useEffect } from 'react'
import TablaInventarioCierre from './TablaInventarioCierre';



const PaletaChild = (props: any) => {
  const { name="test", color="#DC3545", COLOR_R="220", COLOR_G="53", COLOR_B="69" } = props;

  //color="#DC3545" COLOR_R="147" COLOR_G="20" COLOR_B="151"
  console.log(" aaa ", COLOR_R, COLOR_G, COLOR_B)

  const [openOne, setOpenOne] = useState(false);

  const handleClick = () => {
    setOpenOne(!openOne);
  };

  //rgba(${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.6 )

  return (
    <>
      <div style={{ margin: 'auto', width: '98%' }}>
        <div style={{
          backgroundColor: `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.6 )`, padding: '0.3%', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
          , alignItems: 'center'

        }}
          onClick={handleClick}
        >
          <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'white' }} >
            {name}
          </Typography>
          {/*  <RemoveIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />*/}
          {!openOne ? <AddIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} /> :
            <RemoveIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />}

        </div>
      </div>


      <Collapse in={openOne} timeout="auto" unmountOnExit>
        <div style={{ margin: 'auto', width: '96%' }}>
        <TablaInventarioCierre />

        
        </div>


      </Collapse>
    </>
  )
}

export default PaletaChild
