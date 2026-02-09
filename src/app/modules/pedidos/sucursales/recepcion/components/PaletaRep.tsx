import { Collapse, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
//import PaletaChildRep from './PaletaChildRep';
import PaletaChildRep from './PaletaChildRep';

const PaletaRep = (props: any) => {
  const { name, color, COLOR_R, COLOR_G, COLOR_B, SUBCATEGORIA, control, controlDisable, getValues, registro, adecuacionInput } = props;

  const [openOne, setOpenOne] = useState(false);

  const handleClick = () => {
    setOpenOne(!openOne);
  };


  const handleColorTitle = () => {

    if ((COLOR_R == 103 && COLOR_G == 228 && COLOR_B == 233)
      || (COLOR_R == 63 && COLOR_G == 170 && COLOR_B == 186)
      || (COLOR_R == 197 && COLOR_G == 157 && COLOR_B == 49)
    ) {
      return { color: 'black' }
    } else {
      return { color: 'white' }
    }

  }

  const valdateValuesCerosArray = (array: any) => {


    //ceros y ademoas la longitud sea igual a la iteracion
   
    var res = false
    let i;
    for (i = 0; i < array.length; i++) {

     // console.log("aaaa ", array[`${arrayAux[i]}`])

      if (registro[`${array[i]}`] != '.00') {
       // console.log("aaaa prioridad distion de cero ", array[`${arrayAux[i]}`])
        return false
      }
      if (registro[`${array[i]}`] == '.00') {
        res = true
      } else {
        res = false
      }
    }
    if (i == array.length) {
      if (res) {
        console.log("aaaa res fin true")
        return true
      } else {
        console.log("aaaa res fin false")
        return false
      }

    }

    return res

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
        <Typography variant="subtitle1" gutterBottom sx={{
          marginLeft: '15px',
          fontSize: '13px', fontFamily: 'Times New Roman', ...handleColorTitle()
        }} >
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
          //metodo productos
          // if (valdateValuesCerosArray(row.PRODUCTOS)==false) {
          //   return;
          // }

          return (

            <PaletaChildRep
              key={index}
              COLOR_R={COLOR_R}
              COLOR_G={COLOR_G}
              COLOR_B={COLOR_B}

              SUB_CATEGORIA_1={row.SUB_CATEGORIA_1}
              PRODUCTOS={row.PRODUCTOS}
              control={control}
              getValues={getValues}
              registro={registro}
              controlDisable={controlDisable}
              adecuacionInput={adecuacionInput}

            />

          )
        }) : null}

      </Collapse>
    </>
  )
}

export default PaletaRep