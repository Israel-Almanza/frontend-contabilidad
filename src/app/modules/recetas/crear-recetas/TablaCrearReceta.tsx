import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Box, Button, Checkbox, Modal, TextField, Typography,Grid  } from "@mui/material";
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { KDImage } from "../../../../core/modal-loading/KDImage";
import { useCrearReceta } from "./services/useCrearReceta";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import { ModalBorrarReceta } from "./components/ModalBorrarReceta";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  borderLeft: "1px solid #DEE2E6",
  //borderRight: "2px solid black",



};

function createData(f0: any, f1: any, f2: any, f3: any) {
  return { f0, f1, f2, f3 };
}
/*
const rows = [

  createData("Galleta de Alfajor", "Unidad", "", "0"),
  createData("Galleta de Alfajor", "Unidad", "", "0"),

];*/



export default function TablaCrearReceta(props:any) {


  //const {control,  setValue, unregister } = props;

 // const { formState, handleSubmit, control, register, setValue, unregister } = useForm();


  const { ListaElementos, ListaReceta, getValues,control,  setValue, unregister, loadBuscarReceta, handleSubmit, idPresentacion } = props;
  console.log("datos id presentacion", idPresentacion)
  const {loadApiGuardarReceta} = useCrearReceta()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   //modal agregar
   const [openModalAgregar, setOpenModalAgregar] = useState(false);

   const handleOpenModalAgregar = () => setOpenModalAgregar(true);
   const handleCloseModalAgregar = () => setOpenModalAgregar(false);
 
//modal delete usuario
const [openModalDelete, setOpenModalDelete] = useState(false);

const handleOpenModalDelete = () => setOpenModalDelete(true);
const handleCloseModalDelete = () => setOpenModalDelete(false);

const [ID_RECETA, setID_RECETA] = useState('')

const pasarParametrosDelete = (row: any) => {
 const { ID } = row;
 console.log("row ", row)
 setID_RECETA(ID)
 handleOpenModalDelete()

}



  const tableCellClickHandler = (e: any) => {
    //console.log((e.target as Element).innerHTML);
  };

  const [rows, setRows] = useState<any>([])
  React.useEffect(() => {
    //console.log("data ...", tableData)
    if (ListaReceta) setRows(ListaReceta);
  }, [ListaReceta]);
  //paso 1 cargar datos al inicio
  useEffect(() => {
    
  }, []);

  //loading
  const [loading, setLoading] = useState(
    false
  );

  //metodo para agregar elementos
  const addItem = () => {
    console.log("Añadiendo")


    setRows([...rows,
    { nombre: "Galleta de Alfajor" }
    ]);
  }

  //metodo para eliminar elementos
  const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)


    //eliminar la referencia datos ya creado al momento de eliminar
    //exameple  unregister("yourDetails")
    unregister(`check0_${index}`)
    unregister(`check1_${index}`)
    unregister(`check2_${index}`)
    unregister(`check3_${index}`)
    unregister(`check4_${index}`)
    unregister(`check5_${index}`)

    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }
  //metodo para seleccionar todos los elementos con check por fila

  const selectAllCheckByRow = (event: any, index: any) => {
    var checkedValue = event.target.checked
    console.log("valos necesarios ,", index, checkedValue)
    //index 0 ,rows 0
    //index 1, rows 1

    //escribir logica para hacer check todos los campos
    //index es dato genereico

    if (checkedValue) {
      setValue(`check0_${index}`, true)
      setValue(`check1_${index}`, true)
      setValue(`check2_${index}`, true)
      setValue(`check3_${index}`, true)
      setValue(`check4_${index}`, true)
      setValue(`check5_${index}`, true)
    } else {
      setValue(`check0_${index}`, false)
      setValue(`check1_${index}`, false)
      setValue(`check2_${index}`, false)
      setValue(`check3_${index}`, false)
      setValue(`check4_${index}`, false)
      setValue(`check5_${index}`, false)
    }


  }

  const handlecheck = (index: any, row:any) => {
console.log("dato mesa ")

    if (row.PARA_MESA == 1) {
      setValue(`check0_${index}`, true)

    } else {
      setValue(`check0_${index}`, false)

    }

}

  const saveData = () => {
    console.log("datos save ", getValues())
    AlertSave({ title: "GUARDADO!", message: "Se ha Guardado la Receta!" });
  }

  const [selectElement, setSelectElement] = useState<any>('')
  const addNewElement = () => {
    console.log("add ", selectElement)
    if (selectElement) {
      const { label } = selectElement
      console.log("hay dato ", label)
      setRows([...rows,
      { SUB_CATEGORIA_2: label }
      ]);

    }

  }

   

  const [idElemento, setIdElemento] = useState('')
  const [nomElemento, setNomElemento] = useState('')
  const [adecuacion, setAdecuacion] = useState('')

  const handleSeleccioneElemento = (value: any) => {
    console.log("valee de elemento ", value)
    const { SUB_CATEGORIA_2, ID_SUB_CATEGORIA_2, ADECUACION } = value
    setIdElemento(ID_SUB_CATEGORIA_2)
    setNomElemento(SUB_CATEGORIA_2)
    setAdecuacion(ADECUACION)

  }

  const addNewElement2 = (value: any) => {
    console.log("add ", value)
   
      //var { nomElemento } = value
      console.log("hay dato ", nomElemento)
      console.log("adecuacion",adecuacion)
      
      setRows([...rows,
      { SUB_CATEGORIA_2: nomElemento, TAMAÑO: adecuacion ,ID: idElemento, ID_UNICO: idPresentacion }
      ]);
     
      setValue(`medida_${rows?.length}`,adecuacion)
      
      
      //setValue(`medida_${i}`,adecuacion)
  }
  


  const isObjEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  }
  //guardar los dataForm de entregas
  const onSubmitReceta = async (dataForm: any) => {
    //esta vacio-> true
    //si no esta vacio-> false
    //console.log("respues ", isObjEmpty(dataForm))
    console.log("datos** ",dataForm)
    console.log("rows ", rows)
    //paso 1 verificar si el objecto es mayor a cero
    /* if (isObjEmpty(dataForm) || isObjEmpty(ListaElementos) 
     ) {
       //alert("el objecto esta vacio")
       return;
     }*/



    var resObj: any = {}
    //paso 2 verficar si hay un cambio de dataForm
    // console.log("registro objec ", registro)

    //for (var key in registro) {
      // if(isObjEmpty(ListaReceta)){
      //   return;
      // }else{
   
      for(let i=0; i<rows?.length; i++){
        //for (var i in ListaElementos) {
        
        var resChild: any = {
          // "entregada": dataForm[`${key}_entregada`],
          // "regresada": (dataForm[`${key}_devuelta`] == null ? "0" : dataForm[`${key}_devuelta`]),
          // "observacion": dataForm[`${key}_observacion`]
          //(dataForm[`${key}_solicitud`] == solicitud[key] ? "1" : "0")
          "idUnico": (rows[i].ID_PRODUCTO_UNICO == undefined ? rows[i].ID_UNICO : rows[i].ID_PRODUCTO_UNICO),
          "id": (rows[i].ID_PRODUCTO_UNICO == undefined ? rows[i].ID : rows[i].ID_SUB_CATEGORIA_2),
          "fruta": (dataForm[`check0_${i}`] == true ? 1 : 0),
          "mesa": (dataForm[`check1_${i}`] == true ? 1 : 0),
          "llevar": (dataForm[`check2_${i}`] == true ? 1 : 0),
          "manda": (dataForm[`check3_${i}`] == true ? 1 : 0),
          "perece": (dataForm[`check4_${i}`] == true ? 1 : 0),
          "adecuacion": (dataForm[`medida_${i}`] > 0 ? Number(dataForm[`medida_${i}`]) : 0)
        }
        resObj[(rows[i].ID_PRODUCTO_UNICO == undefined ? rows[i].ID : rows[i].ID_SUB_CATEGORIA_2)] = resChild;
      
      //}

    }

    console.log("res send guardar ", resObj)

        try {
          setLoading(true)
          const response = await loadApiGuardarReceta(
            resObj
          )
          console.log("res aaa", response)
          setLoading(false)
          if (response?.status) {
            await loadBuscarReceta()
            AlertSave({ title: "", message: response.message });
    
          }
          if (response?.status == false) {
            AlertQuestion({ title: '', message: response.message })
    
    
          }
    
          if (response == undefined) {
            AlertError({ title: '', message: response.message })
          }
        
        } catch (error) {
          console.log("error api guardar:*", error)
          setLoading(false)
        }
        
  
}

  //const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  //const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const InputTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
    //console.log("entre al metodo 1")


    return (


      <Controller
        name={nameRegister}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (

          <TextField id="outlined-basic"
            sx={{ backgroundColor: 'white',   wordBreak: 'normal' }}
            //label="Outlined"
            size="small"
            type="number"
            disabled={isDisable}
      
             //InputProps={{ inputProps: { min: 0,step:0.25 } }}
            /* InputProps={{
               readOnly: isDisable,
             }}*/
            // variant="filled"
            variant="outlined"
            inputProps={{
              style: {
                margin: '0.4px', padding: '2px'
              },
            }}

            value={value}
            onChange={onChange}

            //onBlur={testData}
            error={!!error}
            helperText={error ? error.message : null}
           


          />

        )}

        //capturar el elemento a comparar en este caso el stock
        // rules={{
        //   required: {
        //     value: isRequired,
        //     message:'Completa este campo '
        //   },
        //    validate: () => Number(getValues(nameRegister)) % 0.25 == 0 || 'Solo permite múltiplos de 0.25'
        // }}
      />

    )
  }

  return (
    <div>
      {/* <button onClick={()=> console.log(getValues())}>get values </button>
      <button onClick={()=> {setValue("check2_1",true)}}>Marcar</button> */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
        <Button onClick={handleOpen} sx={{ backgroundColor: '#D32F2F' }} variant="contained" startIcon={<AddIcon />}>Agregar</Button>
      </div>
      <br/>
      {/*<button onClick={() => addItem()}>Add</button>*/}
      <TableContainer
        onClick={() => {
          console.log("Detected Table Container Click");
        }}
        component={Paper}
        sx={{
          // border: "4px solid rgba(0,0,0,0.2)",
          //padding: 1,
          // height: '420px',
          margin: '0px', padding: '0px', marginTop: '5px',


          //   width: "max-content"
          //backgroundColor: "blue"
        }}
      >
        <Table sx={{ tableLayout: "auto", minWidth: '800px' }}>
          <TableHead style={{
            //  borderTopColor: 'black',
            //  borderTopStyle: 'double'
          }}>
            <TableRow
              onClick={() => {
                console.log("Detected Row Click");
              }}
              sx={{
                //  backgroundColor: "#BCEAFD",
                //borderBottom: "2px solid black",

                "& th": {
                  //fontSize: "1rem",
                  fontSize: "0.8rem",
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
                  width: '15%',

                  //backgroundColor: "#BCEAFD",
                  //  paddingLeft: '10px',
                  // fontWeight: 'bold',


                }}
                align="left"
              >
                Nombre
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Es Fruta
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Para Mesa
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Para Llevar
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Mandatorio
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Perecedero
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '6%' }} align="left">
                Medida
              </TableCell>
              <TableCell sx={{ ...tableStyling, width: '5%' }} align="left">
                Eliminar
              </TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: any) => {
              // console.log("index ", index)
              return (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      //padding: "0px 0px",
                      // borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid #A7A7A7",
                      // fontWeight: 'bold',
                      //   backgroundColor: "white",
                      paddingLeft: '10px',
                      //  borderBottom: "1px solid white",
                      //fontSize: "12px"
                      fontSize: "0.9rem",
                      //padding:'1%',
                    }}
                    align="left"
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      {row.SUB_CATEGORIA_2}

                      <Checkbox

                        //checked={props.value}
                        sx={{ padding: 0, margin: 0 }}
                        size="small"
                        onChange={(e: any) => selectAllCheckByRow(e, index)}

                      //onChange={(e: any) => console.log(e.target.checked)}
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      // padding: "0px 0px",
                      paddingLeft: '10px',
                      // fontWeight: 'bold',
                      // borderBottom: "1px solid white",
                      //   borderRight: "1px solid #A7A7A7",
                      //   borderBottom: "1px solid #A7A7A7",
                      //  "&:active": { backgroundColor: "blue" }
                    }}
                    align="left"
                    onClick={tableCellClickHandler}
                  >
                    <Controller
                      name={`check0_${index}`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          //checked={props.value}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          checked={!!props.value}
                          onChange={(e: any) => props.onChange(e.target.checked)}
                          //onChange={handlecheck0} 
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "0px 0px",

                      // borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid #A7A7A7",
                      fontWeight: 'bold',
                      backgroundColor: "white",
                      paddingLeft: '10px',
                      //borderBottom: "1px solid white",
                      fontSize: "12px"
                      // fontSize: "1.1rem"
                    }}
                    align="left"
                  >
                    <Controller
                      name={`check1_${index}`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          //checked={props.value}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          defaultChecked
                          checked={!!props.value}
                          onChange={(e: any) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                      paddingLeft: '10px',
                    }}

                    onClick={tableCellClickHandler}
                    align="left"
                  >
                    <Controller
                      name={`check2_${index}`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          //checked={props.value}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          checked={!!props.value}
                          onChange={(e: any) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                      paddingLeft: '10px',
                    }}

                    onClick={tableCellClickHandler}
                    align="left"
                  >
                    <Controller
                      name={`check3_${index}`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          //checked={props.value}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          checked={!!props.value}
                          onChange={(e: any) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                      paddingLeft: '10px',
                    }}

                    onClick={tableCellClickHandler}
                    align="left"
                  >
                    <Controller
                      name={`check4_${index}`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          //checked={props.value}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          checked={!!props.value}
                          onChange={(e: any) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                      paddingLeft: '10px',
                    }}

                    onClick={tableCellClickHandler}
                    align="left"
                  >
                    
                    <InputTextFieldSmall

                      isDisable={false}

                      //variant="filled"
                      control={control}
                      isRequired={true}
                      //nameRegister="demo"
                      nameRegister={`medida_${index}`}
                      index={index}
                      />
                  </TableCell>

                  <TableCell
                    sx={{
                      padding: "0px 0px",// borderRight: "1px solid #A7A7A7",
                      // borderBottom: "1px solid white",
                      paddingLeft: '10px',
                    }}

                    onClick={tableCellClickHandler}
                    align="left"
                  >
                    {row.ID_PRODUCTO_UNICO > 0 ? 
                    <DeleteIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '2.3rem',
                      padding: '10px',
                    }}

                      //onClick={() => deleteByIndex(index)}
                      onClick={() => pasarParametrosDelete(row)}
                    /> 
                    :
                    <DeleteIcon sx={{
                      backgroundColor: '#DC3545', color: 'white', fontSize: '2.3rem',
                      padding: '10px',
                    }}

                      onClick={() => deleteByIndex(index)}
                      //onClick={() => pasarParametrosDelete(row)}
                    /> 
                    }
                  </TableCell>




                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <br/>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <br/>
      <Button onClick={handleSubmit(onSubmitReceta)} sx={{ backgroundColor: '#28A745' }} variant="contained" startIcon={<SaveIcon />}>Guardar</Button>
      </div>
      

      {/* <Button onClick={handleSubmit(onSubmitReceta)} sx={{ backgroundColor: '#28A745' }} variant="contained" startIcon={<SaveIcon />}>Guardar</Button> */}
      {/* <Button onClick={handleOpenModalAgregar} sx={{ backgroundColor: '#28A745' }} variant="contained" startIcon={<SaveIcon />}>prueba</Button> */}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
            <Button onClick={handleClose} style={{ color: 'black' }}>X</Button>
          </div>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            NUEVO ELEMENTO DE LA RECETA
          </Typography>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* <h4 style={{ margin: "5px" }}>Seleccione Elementos</h4> */}
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 300 }}
              onChange={(event, value: any) => setSelectElement(value)}
              renderInput={(params) => <TextField {...params}
                size="small"
                label="--Seleccione una opcion--" />}
            /> */}

            {/* <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={ListaElementos}
            disableCloseOnSelect
            getOptionLabel={(option) => option.SUB_CATEGORIA_2}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.SUB_CATEGORIA_2}
              </React.Fragment>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
            )}
          /> */}
           {/* <Controller
                  control={control}
                  name="elemento"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                      <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={ListaElementos}
                          sx={{ width: '100%' }}
                          //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                          onChange={(event, item) => {
                              handleSeleccioneElemento(item)
                              onChange(item)

                          }
                          }

                          value={value}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  size="small"
                                  label="Seleccione--"
                                  //error={!!errors.categoria}
                                  //helperText={errors.categoria && "Completa este campo"}
                              //  required

                              />
                          )}


                          getOptionLabel={(option: any) => option.SUB_CATEGORIA_2}


                      />
                  )}
              /> */}
          </div>
          <Grid item xs={12} sm={12} md={2.5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ margin: "5px" }}>Seleccione Elemento</h5>
                  <Controller
                    control={control}
                    name="Elemntos"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            disablePortal
                            //id="combo-box-demo"
                            options={ListaElementos}
                            //options={ListaElementos.map((option:any) => option.SUB_CATEGORIA_2)}
                            sx={{ width: '100%' }}
                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                            onChange={(event, item) => {
                              handleSeleccioneElemento(item)
                                onChange(item)

                            }
                            }

                            //value={value}
                            value={value || null}
                            getOptionLabel={(option: any) => option.SUB_CATEGORIA_2}
                            renderOption={(props, option, index) => {
                              const key = `listItem-${index}-${option.ID_SUB_CATEGORIA_2}`;
                              return (
                                <li {...props} key={key}>
                                  
                                  {option['SUB_CATEGORIA_2']}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="---Seleccione---"
                                    //error={!!errors.categoria}
                                    //helperText={errors.categoria && "Completa este campo"}
                                //  required
                                />
                            )}


                            


                        />
                    )}
                  />
                </div>
              </Grid>
          <br></br>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
            {/* <Button sx={{ backgroundColor: '#d50000' }} variant="contained"
              onClick={addNewElement}
            >Agregar</Button> */}
            <Button sx={{ backgroundColor: '#d50000' }} variant="contained"
              onClick={addNewElement2}
            >Agregar</Button>
            &nbsp; &nbsp;
            <Button onClick={handleClose} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cerrar</Button>
            {/* <button onClick={()=> console.log(getValues())}>get values </button> */}
          </div>
        </Box>
      </Modal>


      <ModalBorrarReceta
        loadBuscarReceta={loadBuscarReceta}
        ID_RECETA={ID_RECETA}
        openModalDelete={openModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        />

      {loading ? <KDImage /> : null}
    </div>
  );
}
