import { Collapse, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState, useEffect } from 'react'
//import TablaRecepcion from '../../../app/modules/recepcion/TablaRecepcion';
//import TablaRecepcion from '../TablaRecepcion';
import TablaRecepcion from '../TablaRecepcion';

const PaletaChildRep = (props: any) => {
  const { name, color, COLOR_R, COLOR_G, COLOR_B ,SUB_CATEGORIA_1,PRODUCTOS, STOCK,control, controlDisable, registro, precargado,getValues,adecuacionInput} = props;

  //console.log(" aaa ", COLOR_R, COLOR_G, COLOR_B)

  const [openOne, setOpenOne] = useState(false);

  const handleClick = () => {
    setOpenOne(!openOne);
  };

  //rgba(${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.6 )
  const handleColorTitle = () => {
    
    if((COLOR_R==103 &&  COLOR_G==228 && COLOR_B==233)
    || (COLOR_R==63 &&  COLOR_G==170 && COLOR_B==186)
    || (COLOR_R==197 &&  COLOR_G==157 && COLOR_B==49)
    ){
      return {color: 'black'}
    }else{
      return {color: 'white'}
    }
 
  } 

  return (
    <>
      <div style={{ margin: 'auto', width: '98%' }}>
        <div style={{
          backgroundColor: `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.6 )`, padding: '0.3%', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%', marginLeft:'0.5%' 
          , alignItems: 'center'

        }}
          onClick={handleClick}
        >
          <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', fontSize: '13px', fontFamily: 'Times New Roman',...handleColorTitle() }} >
            {SUB_CATEGORIA_1}
          </Typography>
          {/*  <RemoveIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />*/}
          {!openOne ? <AddIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} /> :
            <RemoveIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />}

        </div>
      </div>


      {PRODUCTOS ? 
       <Collapse in={openOne} timeout="auto" unmountOnExit>
       <div style={{ margin: 'auto', width: '96%' }}>
        <TablaRecepcion COLOR_R={COLOR_R} COLOR_G={COLOR_G} COLOR_B={COLOR_B}  PRODUCTOS={PRODUCTOS} STOCK={STOCK} 
        control={control}
        registro={registro}
        controlDisable={controlDisable}
        precargado={precargado}
        getValues={getValues}
        adecuacionInput={adecuacionInput}
        />
        </div>  
        </Collapse>   
      : null }
    </>
  )
}

export default PaletaChildRep