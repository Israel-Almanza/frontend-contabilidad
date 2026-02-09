import { Typography, Button, Collapse, TextField, Modal, Grid, FormGroup, Checkbox, FormControlLabel, } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Box from '@mui/material/Box';
import { KDImage } from '../../../../../core/modal-loading/KDImage';
import { styled } from "@mui/system";
import { useProducto } from '../services/useProducto';
import { Controller, useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '38%',
    minWidth: 350,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
  //  p: 2,
};

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#008000'),
    backgroundColor: '#008000',
    '&:hover': {
        backgroundColor: '#0A680A',
    },
}));


export const ModalEditarPNuevo = (props:any) => {

    const {loadApiGuardarSubCategoria} = useProducto()
    const {openModalEditarProductoN,handleOpenModalEditarProductoN ,handleCloseModalEditarProductoN, 
        nomPrimeraCat, loadObtenerSegundaCategoria, idPrimeraCat, 
        ultimoDato , handleSubmit, control,setValue, getValues, register,
    
        updateTextModalEdit,getContador, DatosTablaNuevo} = props;
        //const { handleSubmit, control,setValue, getValues, register } = useForm();
    console.log("datos modal",DatosTablaNuevo)
    const [gender, setGender] = React.useState("");

    const [nombrePerfil, setNombrePerfil] = useState<string>('')
    const [nombreSubCate, setNombreSubCate] = useState<string>('')

    const [checkSi, setcheckSi] = useState(false)
    const [checkNo, setcheckNo] = useState(true)

   
//FRUTAS
    useEffect(() => {
        setValue('tamaño', DatosTablaNuevo?.TAMAÑO)
        setValue('Costo_Sucursales',DatosTablaNuevo?.SUCURSALES)
        setValue('Pedidos_Ya',DatosTablaNuevo?.PEDIDOS)
        setValue('Costo_Yaigo',DatosTablaNuevo?.YAIGO)
        setValue('Costo_Ser',DatosTablaNuevo?.SER)
        setValue('Costo_Cortesias',DatosTablaNuevo?.CORTESIAS)
        setValue('Costo_Reposiciones',DatosTablaNuevo?.REPOSICIONES)
        setValue('Consumo_interno',DatosTablaNuevo?.CONSUMO)
        setValue('Costo_Desperdicios',DatosTablaNuevo?.DESPERDICIOS)
        setValue('Fexco_Ventas',DatosTablaNuevo?.VENTAS)
        setValue('Fexco_Cortesias',DatosTablaNuevo?.FCORTESIAS)
        setValue('Fexco_Merienda',DatosTablaNuevo?.MERIENDA)
        setValue('Fexco_Consumo_Crédito',DatosTablaNuevo?.CREDITO)
        setValue('Fexco_Desperdicio',DatosTablaNuevo?.FDESPERDICIO)
        setValue('cantidad',DatosTablaNuevo?.FRUTAS)
        if(DatosTablaNuevo?.FRUTAS >= 1){
            setcheckSi(true)
            setcheckNo(false)
            
        }else{
            setcheckSi(false)
            setcheckNo(true)
        }

        //updateTextModal()
    }, [DatosTablaNuevo?.TAMAÑO]);

    const [rows, setRows] = useState<any>([])
    //loading
    const [loading, setLoading] = useState(
        false
    );

    
    const onChangeNameSubCategoria = (event: any) => {
        console.log("nombre subCategoria ", event.target.value)
        setNombreSubCate(event.target.value)

    }

    

    const handlecheckSi = () => {

        setcheckSi(!checkSi)

        if (!checkSi) {
            setcheckNo(false);

        } else {
            setcheckNo(true)

        }



    }

    const handlecheckNo = () => {


        setcheckNo(!checkNo)

        if (!checkNo) {
            setcheckSi(false);

        } else {
            setcheckSi(true)

        }

    }

   
    const handleSaveSubCategoria = async () => {
        /*if (!nombreSubCate ) {
            //alert("nombre de versil vacio")
            closeModalResetForm()
            return;
        }
        try {
            //localStorage.setItem('nombre_perfil_local',nombrePerfil);
            setLoading(true)
            const response:any = await loadApiGuardarSubCategoria(
                Number(idPrimeraCat),
                nombreSubCate
                )
            console.log("save pefil ", response)
            setLoading(false)
            if (response?.status) {
                closeModalResetForm()
              
                await loadObtenerSegundaCategoria(idPrimeraCat)
                AlertSave({ title: "", message: response.message });
               
            }
            if (response?.status == false) {
                AlertQuestion({ title: '', message: response.message })
        
        
            }
        
            if (response == undefined) {
                AlertError({ title: '', message: response.message })
            }


        } catch (error) {
            console.log("error ", error)
            setLoading(false)
        }*/
    }

      const closeModalResetForm = () => {


        setNombreSubCate('')
        handleCloseModalEditarProductoN()
    }

     const addNewElement = (data: any) => {
         console.log("add ", data)
       
           var tamaño:any=((checkSi == true) ? data.cantidad:0)
           console.log("tamaño ",tamaño)
         //llamar al metdo que recibe parametros
         updateTextModalEdit(data.tamaño, tamaño, 
            data.Costo_Sucursales, 
            data.Pedidos_Ya,  data.Costo_Yaigo, data.Costo_Ser, 
             data.Costo_Cortesias,data.Costo_Reposiciones, data.Consumo_interno,
            data.Costo_Desperdicios, data.Fexco_Ventas, data.Fexco_Cortesias,
           data.Fexco_Merienda,data.Fexco_Consumo_Crédito, data.Fexco_Desperdicio)
        
           closeModalResetForm()
       }

    const InputTextFieldCustomAcce = ({ label, control, isRequired = false, nameRegister, isDisable }: any) => {
        return (
            <>

                <Typography variant="subtitle1" gutterBottom sx={{
                    margin: 0, padding: 0, marginLeft: '3px',
                    color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                }}>
                    {label}
                </Typography>
                <Controller
                    name={nameRegister}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic" label={label}
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            value={value}
                            type="number"
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            size="small"


                        />
                    )}

                    rules={{
                        required: {
                            value: isRequired,
                            message: 'Completa este campo '
                        },
                    }}
                />
            </>
        )
    }

    const SelectTextFieldSmall = ({ control, isRequired = false, nameRegister, isDisable, index }: any) => {
        //console.log("entre al metodo 1")
        
    
        const [Lista, setListGenero] = useState<any>(
          [
            {
                ID: '1',
                TEXT: '1',
            },
            {
                ID: '2',
                TEXT: '2',
            },
            {
                ID: '3',
                TEXT: '3',
            },
            {
                ID: '4',
                TEXT: '4',
            },
          ]
        )
        const [ItemTurno, setItemTurno] = useState('');
    
        const [renderItem, setRenderItem] = useState("");
    
        //  console.log("getValues ***", getValues("PERECEDERO"));
    
    
        const handleChangeTurno = (event: any) => {
          console.log("select item turno", event.target.value);
    
    
          setItemTurno(event.target.value)
    
    
    
          // setSucursalItem(event.target.value)
        };
    
    
    
        return (
    
          <TextField
            id="outlined-select-gender"
            select
            label="Cantidad"
            //  disabled={disableSubCategorySecond}
            //label={gender === "" ? "Seleccione una Opción" : ""}
            //  value={ItemTurno}
            // onChange={handleChangeTurno}
    
            //disabled={handleIsDisable()}
            sx={{ width: '100%' }}
            // InputLabelProps={{ shrink: false }}
    
             //defaultValue={"F"}
            defaultValue={getValues(nameRegister)}
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
            //error={errors[nameRegister]}
            //helperText={errors ? errors[nameRegister]?.message : null}
          >
            {Lista && Lista?.map((option: any) => (
              <MenuItem key={option.ID}
                value={option.ID}
              >
                {option.TEXT}
              </MenuItem>
            ))}
          </TextField>
    
    
        )
      }
    return (
        <Modal
            open={openModalEditarProductoN}
            //onClose={handleCloseModalSubCategoria}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>

            <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: '#DC3545', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
                }}>

                    <Typography id="modal-modal-description" sx={{
                        mt: 1,
                        textAlign: 'center',
                        //fontWeight: 'bold',
                        marginLeft: '3%',
                        color:'white',
                        fontSize: '1.2rem', //marginBottom: '10px'
                        fontFamily: 'Times New Roman'
                    }}>
                        Agregar Frutas y Precios
                    </Typography>
                    <Button onClick={() => closeModalResetForm()}
                        sx={{
                            color: 'black',
                            ':hover': {
                                color: 'white'
                            }
                        }}
                    >
                        <CancelPresentationIcon
                        />
                    </Button>
                </div>
                {/* <button onClick={()=>updateTextModal(ultimoDato?.TAMAÑO )}>actualizar dato desde modal</button> */}
                {/* <button onClick={()=>getContador()}>ver dato</button> */}
                
                <div style={{ margin:'15px' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} sm={12} md={6}>
                    <h4 style={{ margin: "2px",color: '#666666', fontSize: '0.7rem', fontWeight: 'bold' }}>Tamaño seleccionado:</h4>
                        
                        <Controller
                            name={'tamaño'}
                            control={control}
                            render={({ field: {  value }, fieldState: { error } }) => (
                                <TextField id="outlined-basic"
                                    size='small'
                                    sx={{ width: '100%', backgroundColor:'#E9ECEF' }}
                                    //label="Ingrese Nombre Categoria"
                                    variant="outlined"
                                    //variant="filled"
                                    //onChange={onChangeNamePerfil}
                                    //value={ultimoDato?.TAMAÑO}
                                    value={value}
                                    InputProps={{
                                        readOnly: true,
                                        }}
                                />
                            )}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid item xs={5}>
                        <FormGroup sx={{ width: '100%' }}>
                                <Typography variant="subtitle1" gutterBottom sx={{
                                    margin: 0, padding: 0, marginLeft: '3px',
                                    color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
                                }}>
                                    ¿Incluirá frutas?
                                </Typography>
                                
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={checkNo}

                                            sx={{ margin: 0, padding: 0 }}
                                            size='small'
                                            onChange={handlecheckNo} defaultChecked />
                                    }
                                    label="NO"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkSi}
                                            sx={{ margin: 0, padding: 0 }}
                                            size='small'
                                            onChange={handlecheckSi}
                                        //onClick={(e) => handlecheckSi(e)}


                                        />
                                    }

                                    label="SI"
                                />
                                
                        </FormGroup>
                        </Grid>
                        <Grid item xs={7}>
                            <br/>
                            {checkSi == true?
                            <>
                                <SelectTextFieldSmall
                                    isDisable={false}
                                    //variant="filled"
                                    control={control}
                                    isRequired={false}
                                    //nameRegister="demo"
                                    nameRegister={'cantidad'}
                                    //index={index}
                                />
                            </>
                            :null}
                          </Grid>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>

                        <InputTextFieldCustomAcce
                            label={'Costo Sucursales'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Costo_Sucursales'}
                        />


                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Pedidos Ya'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Pedidos_Ya'}
                        />


                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Yaigo'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Costo_Yaigo'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Ser'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Costo_Ser'}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Cortesias'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Costo_Cortesias'}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Reposiciones'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Costo_Reposiciones'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Consumo interno'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Consumo_interno'}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Desperdicios'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Costo_Desperdicios'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Fexco-Ventas'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Fexco_Ventas'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Fexco-Cortesias'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Fexco_Cortesias'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Fexco-Merienda'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Fexco_Merienda'}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Fexco-Consumo a Crédito'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Fexco_Consumo_Crédito'}
                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputTextFieldCustomAcce
                            label={'Costo Fexco-Desperdicio'}
                            control={control}
                            isRequired={false}
                            nameRegister={'Fexco_Desperdicio'}
                        />
                    </Grid>
                    
                </Grid>


                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <ColorButton variant="contained" 
                    onClick={handleSubmit(addNewElement)}
                    //onClick={handleSubmit}
                    //onClick={()=>getContador()}
                   /* onClick={handleSubmit(
                        ()=>updateTextModal(ultimoDato?.TAMAÑO,`cantidad` )
                    )}*/
                    > Agregar</ColorButton>

                    &nbsp; &nbsp;
                    <Button onClick={closeModalResetForm} sx={{
                    backgroundColor: '#6E7881',
                    '&:hover': {
                        backgroundColor: '#474849',
                    },

                    }} variant="contained" >Cancel</Button>
                    </div>
                    <br/>
                    {loading ? <KDImage /> : null}
            </Box>
        </Modal>
    )
}
