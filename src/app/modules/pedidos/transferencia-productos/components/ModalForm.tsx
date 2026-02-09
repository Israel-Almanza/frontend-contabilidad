


import { Typography, Button, Collapse, TextField, Modal, FormGroup, Checkbox, Grid, FormControlLabel, InputAdornment, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'



import Box from '@mui/material/Box';



import { styled } from "@mui/system";

import { Controller, useForm } from "react-hook-form";
import { useTransferenciaProductos } from '../services/useTransferenciaProductos';

import { AlertSave } from '../../../../common/alerts/alerts';
import TablaInsideModal from './TablaInsideModal';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../core/modal-loading/KDImage';

import { useNotifcacionesService } from '../../../notificaciones-service/services/useNotifcacionesService';
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '95%',

    // minWidth: 440,
    overflow: 'scroll',
    height: '80%',
    display: 'block',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    // p: 2,
};



const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#DC3545'),
    backgroundColor: '#DC3545',
    '&:hover': {
        backgroundColor: '#A31826',
    },
}));

const ContentTypes = {
    ANGULAR: "ANGULAR",
    REACT: "REACT",
    JQUERY: "JQUERY",
    VUE: "VUE"
};

export const ModalForm = (props: any) => {

    const [loading, setLoading] = useState(false);
 

    const { loadApiSucursalesUsaurio,
        loadApiInventarioProductSuc,
        loadApiRegistrarTransferProduct,
        loadApiStockSucInventory
    } = useTransferenciaProductos();

    const {loadApiAddNotification } = useNotifcacionesService();

    const { formState, handleSubmit, control, register, getValues, setValue, reset } = useForm();
    const { errors } = formState;
    const { openModalPersonalized, handleOpenModalPersonalized, handleCloseModalPersonalized,
        description } = props;


    const [ListSucursalesUsaurio, setListSucursalesUsaurio] = useState<any>([])

    const [ListInvetoryProducSuc, setListInvetoryProducSuc] = useState<any>([])
    const [idSucursalOrigen, setidSucursalOrigen] = useState("");
    const [idSucursalDestino, setidSucursalDestino] = useState("");



    const [ListProduct, setListProduct] = useState<any>([])
    const [itemSelectProduct, setItemSelectProduct] = useState<any>("");


    const [disableProduct, setDisableProduct] = useState(true)


    const [fechaDeEntrega, setFechaDeEntrega] = useState('')

    const [ nombreSucursalDestino,setNombreSucursalDestino]= useState('')
        const [nombreSucursalOrigen, setNombreSucursalOrigen]= useState('')

    useEffect(() => {
        // Update the document title using the browser API
        loadSucursalesUsaurio();
        loadPrimeraCategoriaInventarios();

        //  loadSegundaSubCategoryInventory();
    }, []);



    const loadSucursalesUsaurio = async () => {
        try {
            const response = await loadApiSucursalesUsaurio();
            // console.log("response data modal form", response)
            if (Array.isArray(response)) {
                setListSucursalesUsaurio(response)
                //actulizar select
            }

        } catch (error) {

        }
    }

    const loadPrimeraCategoriaInventarios = async () => {

    }


    const loadInventarioProductSucById = async (ID_SUCURSAL: number) => {
        try {
            const response = await loadApiInventarioProductSuc(ID_SUCURSAL);
            console.log("response api invetori sucursal ", response)
            if (Array.isArray(response)) {

                //  setListProduct(response)

                setListInvetoryProducSuc(response)
                //actulizar select
            }

        } catch (error) {

        }
    }


    /*Start select autocomplete */
    const handleSeleccioneSucursal = (value: any) => {
        console.log("valor suc origen", value)
        const { ID_UBICACION,DESCRIPCION } = value
        setidSucursalOrigen(ID_UBICACION)

        setNombreSucursalOrigen(DESCRIPCION)

        loadInventarioProductSucById(ID_UBICACION);
        setDisableProduct(false)

    }

    const handleSeleccioneSucursalDestino = (value: any) => {
        console.log("valor suc destino", value)
        const { ID_UBICACION ,DESCRIPCION} = value
        setidSucursalDestino(ID_UBICACION)
        setNombreSucursalDestino(DESCRIPCION)
       

    }


    const handleSeleccioneProduct = (value: any) => {
        console.log("value de product ", value)
        setItemSelectProduct(value)
        // const { ID_UBICACION } = value
        // setidSucursalOrigenOrigen(ID_UBICACION)
    }


    /*End select autocomplete */


    const onSubmit = async (dataForm: any) => {
        console.log("enviando datos form ", dataForm)
        console.log("fecha de entrega ", fechaDeEntrega)

        var total = 0;


        //console.log("list preduct ............. ", ListProduct.length)
        console.log("list preduct ............. ", ListProduct)
        if (ListProduct.length <= 0) {
            alert("Debe agregar productos.")
            return
        }
        const productos = []

        for (let i = 0; i < ListProduct.length; i++) {

            //  console.log("capture value ", dataForm[`ICE_${i}`], dataForm.ICE_0)
            var newPar = {
                "ID_SUB_CATEGORIA_2": (ListProduct[i].ID_SUB_CATEGORIA_2).toString(),
                "CANTIDAD": dataForm[`CANTIDAD_${i}`],


            }
            //console.log("new Pares ", newPar)
            total = total + Number(dataForm[`CANTIDAD_${i}`]);
            productos.push(newPar)
        }
        //  console.log("productos array",productos)

        const dataSend = {
            "sucursal_origen": idSucursalOrigen,// 13,
            "sucursal_destino": idSucursalDestino,
            "cantidad_total_productos": total,
            "productos": [...productos]
        }

        console.log("send data ", dataSend)

        const dataDemo = {
            "sucursal_origen": 13,
            "sucursal_destino": 13,
            "cantidad_total_productos": 5,
            "productos":
                [
                    { "ID_SUB_CATEGORIA_2": "630", "CANTIDAD": "2" },
                    { "ID_SUB_CATEGORIA_2": "632", "CANTIDAD": "3" }
                ]
        }


        try {
            setLoading(true)
            const response = await loadApiRegistrarTransferProduct(
                Number(idSucursalOrigen),
                Number(idSucursalDestino),
                Number(total),
                productos
            )
            setLoading(false)
            closeModalResetForm()
            //handleCloseModalPersonalized()

            if (response) {
                if (response.status) {
                    AlertSave({ title: "", message: "Se Guardado Correctamente!" });

                    const responseNotiOrigen = await loadApiAddNotification(
                        idSucursalOrigen,
                     `La ${nombreSucursalOrigen} recibio una transferencia de la ${nombreSucursalDestino}`
                    )

                    const responseNotiDestino = await loadApiAddNotification(
                        idSucursalOrigen,
                     `La ${nombreSucursalDestino} realiza una transferencia a la ${nombreSucursalOrigen}`
                    )
                }

            }

            console.log("res data ", response)
        } catch (error) {
            console.log("error api", error)
            setLoading(false)
        }
        //captura de datos de formulario



        //llevar al formato correcto





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



    const validarDatos = () => {
        return handleSubmit(onSubmit)
    }

    const addNewElement = async () => {

        //imprimerinedo valores
        console.log("valores necesarios ", idSucursalOrigen, itemSelectProduct)
        const { ID_SUB_CATEGORIA_2, SUB_CATEGORIA_2 } = itemSelectProduct
        if (idSucursalOrigen && itemSelectProduct && ID_SUB_CATEGORIA_2) {

            //HACER UNA BUSQUEDA EL PRODUCTO DE SI EXISTE NO AGREGAR
            const result = ListProduct.find((x: any) =>
                //console.log(x.nombre)
                x.SUB_CATEGORIA_2 === SUB_CATEGORIA_2
            );

            console.log(" result find ", result)
            if (result) {
                alert("El producto seleccionado ya existe en la lista")
                return;
            }

            try {
                setLoading(true)
                const response = await loadApiStockSucInventory(Number(idSucursalOrigen), Number(ID_SUB_CATEGORIA_2))
                console.log("response stok filter", response)
                //producto->SUB_CATEGORIA_2  de itemSelectProduct
                //stok // cantidad  de response 
                //SUB_CATEGORIA_2 de response
                if (response) {
                    const { stock, unidadM } = response
                    console.log("valores a renderizar ", stock, unidadM, SUB_CATEGORIA_2)
                    setListProduct([...ListProduct,
                    {
                        SUB_CATEGORIA_2: SUB_CATEGORIA_2,
                        ID_SUB_CATEGORIA_2: ID_SUB_CATEGORIA_2,
                        stock: stock,
                        unidadM: unidadM
                    }
                    ]);
                }
                setLoading(false)

            } catch (error) {
                setLoading(false)
            }
        }



        /* try {
             const response = await loadApiStockSucInventory(13, 630)
             console.log("response stok filter",response)
         } catch (error) {
 
         }*/

        /*console.log("add ", selectElement)
        if (selectElement) {
          const { label } = selectElement
          console.log("hay dato ", label)
          setRows([...rows,
          { nombre: label }
          ]);
    
          
        }*/

        /*
        setListProduct([...ListProduct,
        { nombre: "demo test" }
        ]);*/

    }

    const deleteByIndex = (index: any) => {
        console.log("eliminar ", index)
        setListProduct((oldValues: any) => {
            return oldValues.filter((_: any, i: any) => i !== index)
        })
    }

    const closeModalResetForm = () => {

        reset({});
        setListProduct([])
        handleCloseModalPersonalized()
    }


    return (
        <Modal

            open={openModalPersonalized}
            // onClose={handleCloseModalPersonalized}
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
                        color:'white',
                        fontSize: '0.9rem', //marginBottom: '10px'
                    }}>
                        Transferencia de Productos
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


                <div style={{ margin: '10px' }}>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                        <Grid item xs={12} sm={6} md={3}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 style={{ margin: "5px" }}>Sucursal Origen</h5>




                                <Controller
                                    control={control}
                                    name="suc_origen"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={ListSucursalesUsaurio}
                                            noOptionsText={'Sin opciones'}
                                            sx={{ width: '100%' }}
                                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                            onChange={(event, item) => {
                                                handleSeleccioneSucursal(item)
                                                onChange(item)
                                            }
                                            }

                                            value={value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Sucursal Origen"
                                                    error={!!errors.suc_origen}
                                                    helperText={errors.suc_origen && "Completa este campo"}
                                                //  required

                                                />
                                            )}


                                            getOptionLabel={(option: any) => option.DESCRIPCION}


                                        />
                                    )}
                                />

                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 style={{ margin: "5px" }}>Sucursal Destino</h5>

                                <Controller
                                    control={control}
                                    name="suc_destino"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (

                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={ListSucursalesUsaurio}
                                            noOptionsText={'Sin opciones'}
                                            sx={{ width: '100%' }}
                                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                            onChange={(event, item) => {
                                                handleSeleccioneSucursalDestino(item)
                                                onChange(item)
                                            }
                                            }

                                            value={value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Sucursal Destino"
                                                    error={!!errors.suc_destino}
                                                    helperText={errors.suc_destino && "Completa este campo"}
                                                />
                                            )}

                                            getOptionLabel={(option: any) => option.DESCRIPCION}
                                        />
                                    )}
                                />



                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 style={{ margin: "5px" }}>Seleccione el producto</h5>

                                <Controller
                                    control={control}
                                    name="select_pro"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (

                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={ListInvetoryProducSuc}

                                            disabled={disableProduct}
                                            noOptionsText={'Sin opciones'}
                                            sx={{ width: '100%' }}
                                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                            onChange={(event, item) => {
                                                handleSeleccioneProduct(item)
                                                onChange(item)
                                            }
                                            }
                                            value={value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Seleccione el producto"
                                                    error={!!errors.select_pro}
                                                    helperText={errors.select_pro && "Completa este campo"}
                                                />
                                            )}
                                            getOptionLabel={(option: any) => option.SUB_CATEGORIA_2}
                                        />

                                    )}
                                />



                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={2} container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center">

                            <ColorButton variant="contained" sx={{ marginTop: '29px' }}
                                //onClick={() => loadPedidosExternosSuc()}
                                onClick={() => addNewElement()}
                            >Agregar</ColorButton>
                        </Grid>



                        {/*<Grid item xs={12} sm={12} md={3}>
    <InputTextFieldCustomAcce
        label={'Número de factura'}
        control={control}
        isRequired={true}
        nameRegister={'numero_factura'}
    />

</Grid>*/}





                    </Grid>

                    <TablaInsideModal
                        tableData={ListProduct}
                        control={control}
                        getValues={getValues}
                        setValue={setValue}

                        deleteByIndex={(index: any) => deleteByIndex(index)}

                    />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {/*<Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button>
<ColorButton variant="contained" >Cerrar</ColorButton>
&nbsp; &nbsp;*/}
                        <ColorButton variant="contained" onClick={handleSubmit(onSubmit)} > Guardar</ColorButton>



                        {/*  <Button onClick={handleCloseModalPersonalized} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>*/}
                    </div>

                </div>
                {loading ? <KDImage
                // src={`https://source.unsplash.com/random?sig=${0}`}

                // height={'200px'}
                /> : null}
            </Box>
        </Modal>
    )
}
