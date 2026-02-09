import { CardActionArea, Checkbox, Collapse, FormControlLabel, FormGroup, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'

import TablaAccesoFormasPago from './TablaAccesoFormasPago';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockSharpIcon from '@mui/icons-material/LockSharp';

const PaletaParentFormasPago = (props: any) => {
  const { name, COLOR_R, COLOR_G, COLOR_B, rows, formas, ID_NOMBRE_LISTA_PRECIOS,
    sucursal, FACTURADO } = props;

  //console.log("pass 1", props.rows)

  const { formState, handleSubmit, control, register, getValues } = useForm();





  const [openOne, setOpenOne] = useState(true);

  const [checkInactivo, setCheckInactivo] = useState(false)
  const [checkActivo, setCheckActivo] = useState(false)

  useEffect(() => {
    if (FACTURADO == 1) {
      setCheckActivo(true)
      setCheckInactivo(false)
    } else {

      setCheckActivo(false)
      setCheckInactivo(true)

    }
  }, [FACTURADO]);

  const handleClick = () => {
    setOpenOne(!openOne);
  };



  const handleCheckInactivo = () => {




    //localStorage.setItem("inactivo_parent_ina", (!checkInactivo).toString());
    setCheckInactivo(!checkInactivo)

    if (!checkInactivo) {
      setCheckActivo(false);
      //localStorage.setItem("inactivo_parent_act", (false).toString());
    } else {
      setCheckActivo(true)
      //localStorage.setItem("inactivo_parent_act", (true).toString());
    }


    //setCheckInactivo(e.target.checked)


    // localStorage.setItem("inactivo_parent", (e.target.checked).toString());

    // e.stopPropagation();
    //e.preventDefault();

  }

  const handleCheckActivo = () => {

    //localStorage.setItem("inactivo_parent_act", (!checkActivo).toString());
    setCheckActivo(!checkActivo)

    if (!checkActivo) {
      setCheckInactivo(false);
      //localStorage.setItem("inactivo_parent_ina", (false).toString());
    } else {
      setCheckInactivo(true)
      //localStorage.setItem("inactivo_parent_ina", (true).toString());
    }

  }
  return (
    <>
      {/*<button onClick={() => console.log("check Activo provider ", checkActivo)}>estado actual</button>*/}
      <div style={{ margin: 'auto', width: '100%' }}>
        <div style={{
          backgroundColor: `rgba( ${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.6 )`, padding: '0.3%', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', borderRadius: '5px', marginTop: '1%'
          , alignItems: 'center'

        }}
        //onClick={getChecksInformation}
        >
          <div style={{
            display: 'flex', flexDirection: 'row', width: '60%', justifyContent: 'space-between'
          }}>
            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'black', minWidth: '100px' }} >
              {name}
            </Typography>

            {/*<FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              {checkInactivo ?
                <CardActionArea sx={{
                  padding: '0', margin: '0', marginTop: '3px', width: '42px',
                }} onClick={() => handleCheckInactivo()}
                >

                  <LockSharpIcon />
                </CardActionArea> : <CardActionArea sx={{
                  padding: '0', margin: '0', marginTop: '3px', width: '42px',
                }} onClick={() => handleCheckInactivo()}
                >
                  <LockOpenRoundedIcon />
                </CardActionArea>}
            </FormGroup>*/}
            <FormGroup sx={{ display: 'flex', flexDirection: 'row', minWidth: '150px' }}>
              <FormControlLabel
                control={
                  <Checkbox checked={checkActivo}

                    sx={{ margin: 0, padding: 0 }}
                    size='small'
                    onChange={handleCheckActivo} //defaultChecked 
                  />
                }
                label="FACTURADO"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkInactivo}
                    sx={{ margin: 0, padding: 0 }}
                    size='small'
                    onChange={handleCheckInactivo}
                  //onClick={(e) => handleCheckInactivo(e)}


                  />
                }

                label="NO FACTURADO"
              />



            </FormGroup>
          </div>




          {/*  <RemoveIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />*/}
          {!openOne ?

            <CardActionArea sx={{
              paddingBottom: '0', margin: '0', width: '25px',
            }}
              onClick={handleClick}
            > <AddIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />
            </CardActionArea> :

            <CardActionArea sx={{
              paddingBottom: '0', margin: '0', width: '25px',
            }} onClick={handleClick}>

              <RemoveIcon style={{ backgroundColor: '#DC3545', borderRight: '5px', color: 'white' }} />
            </CardActionArea>
          }

        </div>
      </div >


      <Collapse in={openOne} timeout="auto" unmountOnExit>
        <div style={{ margin: 'auto', width: '98%' }}>


          <TablaAccesoFormasPago rows={rows} formas={formas} ID_NOMBRE_LISTA_PRECIOS={ID_NOMBRE_LISTA_PRECIOS}
            sucursal={sucursal} />

        </div>


      </Collapse>

    </>
  )
}



export default PaletaParentFormasPago
