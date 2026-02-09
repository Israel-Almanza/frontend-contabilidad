import { Collapse, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
//import PaletaChildRep from './PaletaChildSolicitudes';
import PaletaChildSolicitudes from './PaletaChildSolicitudes';

const PaletaSolicitudes = (props: any) => {
  //const { name, color } = props;
  const { name, color, COLOR_R, COLOR_G, COLOR_B, SUBCATEGORIA, STOCK, control,controlDisable, registro,precargado,getValues,adecuacionInput } = props;
  const [openOne, setOpenOne] = useState(false);

  const handleClick = () => {
    setOpenOne(!openOne);
  };

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
      <div style={{
        backgroundColor: `${color}`, padding: '0.3%', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
        , alignItems: 'center', marginLeft:'0.8%'

      }}
        onClick={handleClick}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px',
         fontSize: '13px', fontFamily: 'Times New Roman',...handleColorTitle() }} >
          {name}
        </Typography>
        {!openOne ? <AddIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} /> :
          <RemoveIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />}
      </div>

      <Collapse in={openOne} timeout="auto" unmountOnExit>
        {SUBCATEGORIA ? SUBCATEGORIA?.map((row: any, index: any) => {
          if (!row.PRODUCTOS || row.PRODUCTOS.length <= 0) {
            return;
          }
          return (

            <PaletaChildSolicitudes
              COLOR_R={COLOR_R}
              COLOR_G={COLOR_G}
              COLOR_B={COLOR_B}

              SUB_CATEGORIA_1={row.SUB_CATEGORIA_1}
              PRODUCTOS={row.PRODUCTOS}
              STOCK={STOCK}
              control={control}
              registro={registro}
              controlDisable={controlDisable}
              precargado={precargado}
              getValues={getValues}
              adecuacionInput={adecuacionInput}
            />

          )
        }) : null}

      </Collapse>
    </>
  )
}

export default PaletaSolicitudes