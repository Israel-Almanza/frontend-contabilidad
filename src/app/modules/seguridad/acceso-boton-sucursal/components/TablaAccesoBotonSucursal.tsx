import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, MenuItem, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import Switch from "@mui/material/Switch";

import { useAccesoBotonSucursal } from "../services/useAccesoBotonSucursal";
import { KDImage } from "../../../../../core/modal-loading/KDImage";
import { AlertSave } from "../../../../common/alerts/alerts";
import { Controller } from "react-hook-form";


const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  fontSize: '10px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  //borderRight: "2px solid black",



};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)"
    }
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#28A745"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200
    })
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box"
  }
}));






export default function TablaAccesoBotonSucursal(props: any) {

  const { loadApiSetConfiguracionBoton } = useAccesoBotonSucursal();
  const { tablaData, control,
    getValues,
    setValue,
    errors,
    register } = props;

  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

   // setValue("test1", true)

    if (tablaData) {
      setRows(tablaData)
    }



  }, [tablaData]);


  const SelectAntSwitchSmall = ({ control, isRequired = false, nameRegister,
    isDisable, index, namecolumn, ID }: any) => {

   

      const handleChangeSwitch = async (valor: boolean) => {
        //console.log("valor de select ", event.target.value, namecolumn);
        //let valor = event.target.value;
        if (!ID || !namecolumn) {
          return;
        }
        //console.log("ID : ",ID);
        //console.log("name column ",namecolumn)
        //console.log("valore de estado ",valor)
  
        if (valor) {
          setLoading(true);
          const response = await loadApiSetConfiguracionBoton(ID, namecolumn, "1");
          setLoading(false);
          if (response?.status && response?.message) {
            AlertSave({ title: '', message: `${response?.message}` })
            // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
          }
  
        } else {
          setLoading(true);
          const response = await loadApiSetConfiguracionBoton(ID, namecolumn, "0");
          setLoading(false);
          if (response?.status && response?.message) {
            AlertSave({ title: '', message: `${response?.message}` })
            // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
          }
  
        }
  
      };

    return (
      <Controller
        control={control}
        name={nameRegister}
        render={({ field: { value, ...field } }) => (

          <AntSwitch inputProps={{ "aria-label": "ant design" }}
            {...field} checked={!!value}
            onClick={()=> handleChangeSwitch(!value)}
          //  onChange={() => {!!value}}
          //  onChange={handleChangeSwitch}
            />

        )}
      />
    )
  }





  const SelectTextFieldSmall = ({ control, isRequired = false, nameRegister,
    isDisable, index, namecolumn, ID }: any) => {

    const handleIsDisable = () => {
      var localestaDesabilitado = localStorage.getItem('estaDesabilitado_RevisionPedido'); //string true // false
      if (localestaDesabilitado == null || localestaDesabilitado == undefined) {

        return true
      }
      //caso 2 control del boton
      if (localestaDesabilitado == "false") {

        return false
      }
      if (localestaDesabilitado == "true") {

        return true
      }
      else {

        return true
      }
    }

    const ListTurnos =
      [
        //'1'=>'ACTIVO', '0'=>'INACTIVO'
        {
          id: 1,
          "TURNO": "ACTIVO"
        },
        {
          id: 0,
          "TURNO": "INACTIVO"
        }
      ]



    const handleChangeSelect = async (event: any) => {
      console.log("valor de select ", event.target.value, namecolumn);
      let valor = event.target.value;
      if (!ID || !namecolumn) {
        return;
      }
      //console.log("ID : ",ID);
      //console.log("name column ",namecolumn)
      //console.log("valore de estado ",valor)

      if (valor == 1) {
        setLoading(true);
        const response = await loadApiSetConfiguracionBoton(ID, namecolumn, "1");
        setLoading(false);
        if (response?.status && response?.message) {
          AlertSave({ title: '', message: `${response?.message}` })
          // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
        }

      } else {
        setLoading(true);
        const response = await loadApiSetConfiguracionBoton(ID, namecolumn, "0");
        setLoading(false);
        if (response?.status && response?.message) {
          AlertSave({ title: '', message: `${response?.message}` })
          // AlertSave({ title: '', message: 'Se ha actualizado correctamente' })
        }

      }

    };


    return (

      <TextField
        id="outlined-select-gender"
        select
        //label="Seleccione turno"
        //  disabled={disableSubCategorySecond}
        //label={gender === "" ? "Seleccione una Opción" : ""}
        //  value={ItemTurno}



        // disabled={handleIsDisable()}
        sx={{ width: '100%' }}
        // InputLabelProps={{ shrink: false }}

        // defaultValue={"PERECEDERO"}
        defaultValue={getValues(nameRegister)}
        onChange={handleChangeSelect}
        SelectProps={{
          MenuProps: {

          },
        }}
        //   margin='normal'
        size="small"
        variant="outlined"

        inputProps={register(nameRegister, {
          required: 'Completa este campo',
        })}
        error={errors[nameRegister]}
        helperText={errors ? errors[nameRegister]?.message : null}
      >
        {ListTurnos && ListTurnos?.map((option: any) => (
          <MenuItem key={option.id}
            value={option.id}
          >
            {option.TURNO}
          </MenuItem>
        ))}
      </TextField>


    )
  }


  return (
    <div>

      <TableContainer
        onClick={() => {
          //  console.log("Detected Table Container Click");
        }}
        component={Paper}
        sx={{
          // border: "4px solid rgba(0,0,0,0.2)",
          //padding: 1,
          // height: '420px',
          margin: '0px', padding: '0px', marginTop: '5px'

          //   width: "max-content"
          //backgroundColor: "blue"
        }}
      >
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead //onClick={tableHeaderClickHandler} 
            style={{
              //  borderTopColor: 'black',
              //  borderTopStyle: 'double'

            }}>
            <TableRow
              onClick={() => {
                //console.log("Detected Row Click");
              }}
              sx={{
                //  backgroundColor: "#BCEAFD",
                //borderBottom: "2px solid black",
                display: 'none',

                "& th": {
                  fontSize: "12px",
                  //fontSize: "0.8rem",
                  //  height: "5px",
                  // color: "black",
                  //  borderBottom: "1px solid white",

                }
              }}
            >
              <TableCell
                onClick={() => {
                  console.log("Detected Cell Click");
                }}
                sx={{
                  ...tableStyling,
                  width: '5%',

                  // backgroundColor: "red",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                N°
              </TableCell>

              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white" }} align="left">
                Accion
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white" }} align="left">
                Accion
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white" }} align="left">
                Accion
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '10%', borderLeft: "1px solid white" }} align="left">
                Accion
              </TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    //padding: "0px 0px",
                    // borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    // fontWeight: 'bold',
                    backgroundColor: "#6C757D",
                    paddingLeft: '20px',
                    padding: '0px', margin: '0px',

                    //  borderBottom: "1px solid white",
                    //fontSize: "12px"
                    // fontSize: "0.9rem",
                    //padding:'1%',
                  }}
                  align="left"
                >
                  {/*row.numero*/}

                  <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5px' }}>

                    <SelectAntSwitchSmall
                      isDisable={false}
                      control={control}
                      isRequired={false}
                      ID={row.ID}
                      namecolumn={"ESTADO"}
                      nameRegister={`estado_${index}`}
                    />

             
                    <Typography variant="subtitle1" gutterBottom sx={{
                      margin: 0, padding: 0, marginLeft: '4px', fontSize: '12px', color: 'white', fontWeight: 'bold'
                      , minWidth: '40px'
                    }}>
                      {row.CANAL}
                    </Typography>
                  </div>

                </TableCell>

                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    //backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
                  {/*row.numfact*/}

                  <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '4px', fontSize: '12px', color: 'black', fontWeight: 'bold'
                  }}>
                    Envios con Transporte
                  </Typography>

                  <SelectTextFieldSmall
                    isDisable={false}
                    control={control}
                    isRequired={false}
                    ID={row.ID}
                    namecolumn={"TRANSPORTE"}
                    nameRegister={`envios_${index}`}
                    index={index}
                  />


                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    //backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
                  {/*row.numfact*/}

                  <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '4px', fontSize: '12px', color: 'black', fontWeight: 'bold'
                  }}>
                    Venta Programada
                  </Typography>
                  <SelectTextFieldSmall
                    isDisable={false}
                    control={control}
                    isRequired={false}
                    ID={row.ID}
                    namecolumn={"ENVIO_PROGRAMADO"}
                    nameRegister={`venta_${index}`}
                    index={index}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    //backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >


                  <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '4px', fontSize: '12px', color: 'black', fontWeight: 'bold'
                  }}>
                    Descuento Facturado
                  </Typography>

                  <SelectTextFieldSmall
                    isDisable={false}
                    control={control}
                    isRequired={false}
                    ID={row.ID}
                    namecolumn={"DESCUENTO_FACTURADO"}
                    nameRegister={`descuentofac_${index}`}
                    index={index}
                  />

                </TableCell>
                <TableCell
                  sx={{
                    //padding: "0px 0px",

                    // borderRight: "1px solid #A7A7A7",
                    borderBottom: "1px solid #A7A7A7",
                    fontWeight: 'bold',
                    //backgroundColor: "#C8E6C9",
                    paddingLeft: '10px',
                    //borderBottom: "1px solid white",
                    fontSize: "12px"
                    // fontSize: "1.1rem"
                  }}
                  align="left"
                >
                  {/*row.numfact*/}

                  <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '4px', fontSize: '12px', color: 'black', fontWeight: 'bold'
                  }}>
                    Descuento Tradicional
                  </Typography>
                  <SelectTextFieldSmall
                    isDisable={false}
                    control={control}
                    isRequired={false}
                    ID={row.ID}
                    namecolumn={"DESCUENTO_TRADICIONAL"}
                    nameRegister={`descuentotra_${index}`}
                    index={index}
                  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      {loading ? <KDImage

      /> : null}

    </div>
  );
}
