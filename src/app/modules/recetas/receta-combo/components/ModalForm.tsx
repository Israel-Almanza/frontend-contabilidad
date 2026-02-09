


import { Typography, Button, Collapse, TextField, Modal, Checkbox, Autocomplete } from '@mui/material'
import React, { useState, useEffect} from 'react'
import { Controller, useForm } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import ExplicitOutlinedIcon from '@mui/icons-material/ExplicitOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import FindInPageIcon from '@mui/icons-material/FindInPage';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRecetaCombo } from '../services/useRecetaCombo';
import { KDImage } from '../../../../../core/modal-loading/KDImage';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 320,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 2,
};

//openModalPersonalized={openModal}
//handleOpenModalPersonalized = {handleOpenModal}
//handleCloseModalPersonalized = {handleCloseModal


const genders = [
    {
        value: 'M',
        label: 'Bebidas Calientes con Cafe',
    },
    {
        value: 'F',
        label: 'Resposteria',
    },
    {
        value: 'F',
        label: 'Frutas Naturales',
    },
    {
        value: 'F',
        label: '1 Extras de Desayunos',
    },

];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



export const ModalForm = (props: any) => {
    const { formState, handleSubmit, register, getValues, setValue, unregister,reset,control  } = useForm();
    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized, description, ID_COMBO, loadObtenerListaCombo, idProductoG,loadObtenerProductoP } = props;
    const {loadApiPrimeraCategoria, loadApiOrdenProductos, loadApiComboMadre, loadApiAgregarGrupoCombo, loadApiListaCombos}=useRecetaCombo();
    //const [openModal, setOpenModal] = useState(false);
    //const handleOpenModal = () => setOpenModal(true);
    //const handleCloseModal = () => setOpenModal(false);
    const [gender, setGender] = useState("");

    const [primeraCat, setPrimeraCat] = useState<any>([])
    const [ordenProducto, setOrdenProducto] = useState<any>([])
    const [ComboMadre, setComboMadre] = useState<any>([])

    const [idPrimeraCat, setIdPrimeraCat] = useState('')
    const [nomPrimeraCat, setNomPrimeraCat] = useState('')
    const [idOrden, setIdOrden] = useState('')
    const [idComboMadre, setIdComboMadre] = useState('')

    const handleChange = (event: any) => {
        setGender(event.target.value);
    };

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        loadObtenerPrimeraCategoria()
        loadObtenerOrdenProducto()
        loadObtenerComboMadre()
    }, []);

     //loading
 const [loading, setLoading] = useState(
    false
  );

    const loadObtenerPrimeraCategoria = async () => {


        try {
            //setLoading(true)
            const response = await loadApiPrimeraCategoria()
            //setLoading(false)
            console.log("lista primera categoria ", response.primeraCategoria)

            if (response?.status && response?.primeraCategoria) {
                setPrimeraCat(response.primeraCategoria)
                //setoriginalRows(response.usuarios)
            }

        } catch (error) {

        }

    }

    const loadObtenerOrdenProducto = async () => {


        try {
            //setLoading(true)
            const response = await loadApiOrdenProductos()
            //setLoading(false)
            console.log("lista orden producto ", response)

            if (response?.status && response?.orden) {
                setOrdenProducto(response.orden)
                //setoriginalRows(response.usuarios)
            }

        } catch (error) {

        }

    }

    const loadObtenerComboMadre = async () => {


        try {
            //setLoading(true)
            const response = await loadApiComboMadre()
            //setLoading(false)
            console.log("lista combo madre ", response)

            if (response?.status && response?.madre) {
                setComboMadre(response.madre)
                //setoriginalRows(response.usuarios)
            }

        } catch (error) {

        }

    }


    const loadAgregarCombo = async (dataForm: any) => {
        
        console.log("datos agregar", Number(dataForm.checkAgregar == true ? 1 : 0))
        console.log("datos datafrom orden",dataForm.Cantidad)
        //console.log("datos datafrom ",dataForm)
        console.log("idcategoria",idPrimeraCat)
        console.log("orden ",(idOrden))
        console.log("id combo ", ID_COMBO)
    
    //si id combo == 0
            try {
              setLoading(true)
              const response = await loadApiAgregarGrupoCombo(
                idProductoG,
                idPrimeraCat,
                dataForm.Cantidad,
                idOrden,
                Number(dataForm.checkAgregar == true ? 1 : 0),
                ID_COMBO
              )
              console.log("respuesta agregar", response)
              closeModalResetForm()
              setLoading(false)
              if (response?.status) {
                
                AlertSave({ title: "", message: response.message });
                
              }
              if(ID_COMBO == 0){
                await loadObtenerProductoP()
                console.log("idcombo",response?.COMBO)
                await loadObtenerListaCombo(Number(response?.COMBO))
                
                
                }else{
                    await loadObtenerListaCombo(Number(ID_COMBO))
                    console.log("id combo inicio",ID_COMBO) 
                }
              if (response?.status == false) {
                AlertQuestion({ title: '', message: 'No Se ha guardado ' })
        
        
              }
        
              if (response == undefined) {
                AlertError({ title: '', message: response.message })
              }
            
            } catch (error) {
              console.log("error api guardar:*", error)
              setLoading(false)
            }
            
      
    }

    const handleSeleccionePrimeraCategoria = async (value: any) => {

        console.log("valee de primera Cate ", value)
        const { ID_CATEGORIA, CATEGORIA } = value
        setIdPrimeraCat(ID_CATEGORIA)
        setNomPrimeraCat(CATEGORIA)
        

    }

    const handleSeleccioneOrdenProducto = async (value: any) => {

        console.log("valee de orden producto ", value)
        const { id_orden } = value
        setIdOrden(id_orden )
        

    }

    const handleSeleccioneComboMadre = async (value: any) => {

        console.log("valee de combo Madre ", value)
        const { COMBO_MADRE } = value
        setIdComboMadre(COMBO_MADRE )
        

    }

    const closeModalResetForm = () => {

        reset({});
        //rows([]);
        handleCloseModalPersonalized()
    }

    const InputTextFieldCustomAcce = ({ label, control, isRequired = false, nameRegister, isDisable, value }: any) => {
        return (
            <>

            
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
                            onChange={onChange}
                            //error={!!error}
                            //helperText={error ? error.message : null}
                            size="small"


                        />
                    )}

                    // rules={{
                    //     required: {
                    //         value: isRequired,
                    //         message: 'Completa este campo '
                    //     },
                    // }}
                />
            </>
        )
    }

    return (
        <>
        <Modal
            open={openModalPersonalized}
            onClose={handleCloseModalPersonalized}
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
                        marginLeft: '2%',
                        color: 'white',
                        fontSize: '0.9rem', //marginBottom: '10px'
                    }}>
                        Agregar Grupo
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
                <div style={{ margin:'15px' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Nombre de Grupo</h6>

                    </div>
                    <Controller
                        control={control}
                        name="categoria"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={primeraCat}
                                sx={{ width: '100%' }}
                                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                onChange={(event, item) => {
                                    handleSeleccionePrimeraCategoria(item)
                                    onChange(item)

                                }
                                }

                                value={value}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccion Primero la Categoria"
                                    //error={!!errors.categoria}
                                    //helperText={errors.categoria && "Completa este campo"}
                                    //  required

                                    />
                                )}


                                getOptionLabel={(option: any) => option.CATEGORIA}


                            />
                        )}
                    />

                </div>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Cantidad (productos maximos a seleccionar)</h6>

                    </div>
                    
                    {/* <TextField
                        id="outlined-select-gender"

                        label="Nombre de Grupo"
                        //  label={gender === "" ? "Seleccione una Opción" : ""}
                        //  value={gender}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                      //  InputLabelProps={{ shrink: false }}


                        SelectProps={{
                            MenuProps: {

                            },
                        }}
                        //   margin='normal'
                        size="small"
                        variant="outlined"
                    /> */}
                        <InputTextFieldCustomAcce
                            label={'Cantidad'}
                            control={control}
                            isRequired={true}
                            nameRegister={'Cantidad'}
                            //value={value}
                        />



                </div>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Orden</h6>

                    </div>
                    <Controller
                        control={control}
                        name="categoriaProducto"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={ordenProducto}
                                sx={{ width: '100%' }}
                                //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                onChange={(event, item) => {
                                    handleSeleccioneOrdenProducto(item)
                                    onChange(item)

                                }
                                }

                                value={value}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Seleccion Orden disponible"
                                    //error={!!errors.categoria}
                                    //helperText={errors.categoria && "Completa este campo"}
                                    //  required

                                    />
                                )}


                                getOptionLabel={(option: any) => option.id_orden}


                            />
                        )}
                    />

                </div>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center' }}>
                        <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Agregar
                        </h6>
                        {/* <Checkbox {...label} defaultChecked sx={{ padding: '0px', margin: '0px', fontSize: '8px' }} /> */}
                        <Controller
                            name={`checkAgregar`}
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
                    </div>


                </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/*<Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>*/}
                    &nbsp; &nbsp;
                    <Button onClick={handleSubmit(loadAgregarCombo)} sx={{ backgroundColor: '#DC3741' }} variant="contained" >Registrar</Button>
                    &nbsp; &nbsp;
                    {/* <button onClick={()=> console.log(getValues())}>get values </button> */}
                  {/*  <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>*/}
                </div>
                <br/>
            </Box>
        </Modal>
        {loading ? <KDImage /> : null}
        </>
    )
}
