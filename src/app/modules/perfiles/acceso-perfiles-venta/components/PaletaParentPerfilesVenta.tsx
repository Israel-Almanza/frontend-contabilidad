import { CardActionArea, Checkbox, Collapse, FormControlLabel, FormGroup, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import React, { useState, useEffect } from 'react'

import TablaAccesoPerfilesVenta from './TablaAccesoPerfilesVenta';

import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import { Controller, useForm } from 'react-hook-form';
import { useAccesoPerfilesVenta } from '../services/useAccesoPerfilesVenta';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { AlertSave } from '../../../../common/alerts/alerts';

const PaletaParentPerfilesVenta = (props: any) => {

  const { formState, handleSubmit, control, register, getValues, setValue } = useForm();
  const { name, COLOR_R, COLOR_G, COLOR_B, rows,
    // control,
    // getValues,
    //setValue, 
    idPerfil,
    idVentasAccesoFather,
    accedeFather
  } = props;

  const { loadApiSetUpdatePermiso } = useAccesoPerfilesVenta();

  const [loading, setLoading] = useState(
    false
  );



  const [openOne, setOpenOne] = useState(true);

  const [checkInactivo, setCheckInactivo] = useState(false)
  const [checkActivo, setCheckActivo] = useState(true)


  const handleClick = () => {
    setOpenOne(!openOne);
  };


  useEffect(() => {

    if (accedeFather) {
      if (accedeFather == 1) {
        setValue(`check_father`, true)
      } else {
        setValue(`check_father`, false)
      }
    }


  }, [rows]);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  //rgba(${COLOR_R}, ${COLOR_G},${COLOR_B}, 0.6 )

  const getChecksInformation = () => {
    console.log("get values: ", getValues())
  }

  const handleCheckInactivo = () => {

    // e.stopPropagation();
    // console.log("target value ", e.target.checked)
    // manejarCehck(e.target.checked)


    //deleteNotification(notification.id)
    //var captureValue = 
    //console.log("valor  ",captureValue)
    // setCheckInactivo(!e.target.checked)
    //save in local store value del father
    //conver value


    localStorage.setItem("inactivo_parent_ina", (!checkInactivo).toString());
    setCheckInactivo(!checkInactivo)

    if (!checkInactivo) {
      setCheckActivo(false);
      localStorage.setItem("inactivo_parent_act", (false).toString());
    } else {
      setCheckActivo(true)
      localStorage.setItem("inactivo_parent_act", (true).toString());
    }


    //setCheckInactivo(e.target.checked)


    // localStorage.setItem("inactivo_parent", (e.target.checked).toString());

    // e.stopPropagation();
    //e.preventDefault();

  }

  const handleCheckActivo = () => {

    localStorage.setItem("inactivo_parent_act", (!checkActivo).toString());
    setCheckActivo(!checkActivo)

    if (!checkActivo) {
      setCheckInactivo(false);
      localStorage.setItem("inactivo_parent_ina", (false).toString());
    } else {
      setCheckInactivo(true)
      localStorage.setItem("inactivo_parent_ina", (true).toString());
    }

  }

  const hadleChangeCheked = async (estado: boolean) => {

    console.log("valor ", estado);


    setValue(`check_father`, !!estado)

    if (!idVentasAccesoFather || !idPerfil) {
      return;
    }

    if (estado) {
      setLoading(true);
      const response = await loadApiSetUpdatePermiso("1", idPerfil, idVentasAccesoFather)
      setLoading(false);
      if (response?.status && response?.message) {
        AlertSave({ title: '', message: `${response?.message}` })
        // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
      }

    } else {
      setLoading(true);
      const response = await loadApiSetUpdatePermiso("0", idPerfil, idVentasAccesoFather)
      setLoading(false);
      if (response?.status && response?.message) {
        AlertSave({ title: '', message: `${response?.message}` })
        // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
      }

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
            display: 'flex', flexDirection: 'row', width: '48%', justifyContent: 'space-between'
          }}>
            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'black', minWidth: '150px' }} >
              {name}
            </Typography>


            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>

              <Controller
                name={`check_father`}
                control={control}
                render={({ field: props }: any) => (
                  <Checkbox
                    {...props}
                    //checked={props.value}
                    // icon={<LockOpenRoundedIcon sx={{ color: 'black' }} />} checkedIcon={<LockSharpIcon sx={{ color: 'black' }} />}

                    icon={<LockSharpIcon sx={{ color: 'black' }} />} checkedIcon={<LockOpenRoundedIcon sx={{ color: 'black' }} />}
                    sx={{ padding: 0, margin: 0 }}
                    size="small"
                    checked={!!props.value}
                    //onChange={(e: any) => props.onChange(e.target.checked)}

                    onChange={(e: any) => hadleChangeCheked(e.target.checked)}
                  />
                )}
              />

            </FormGroup>


            {/* <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
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

          </div>



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


      {loading ? <KDImage

      /> : null}



      <Collapse in={openOne} timeout="auto" unmountOnExit>
        <div style={{ margin: 'auto', width: '98%' }}>


          <TablaAccesoPerfilesVenta rows={rows}
            control={control}
            getValues={getValues}
            setValue={setValue}
            idPerfil={idPerfil}
          />

        </div>


      </Collapse>

    </>
  )
}



export default PaletaParentPerfilesVenta
