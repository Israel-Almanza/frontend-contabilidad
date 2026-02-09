import { Typography, Button, Collapse, TextField, Grid, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import TablaRecetaCombo from '../TablaRecetaCombo';
import { useRecetaCombo } from '../services/useRecetaCombo';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { KDImage } from '../../../../../core/modal-loading/KDImage';


const styleModal = {
    /* position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: '85%',
     bgcolor: 'background.paper',
     borderRadius: '8px',
     overflow: 'scroll',
     //border: '2px solid #000',
     boxShadow: 24,
     p: 4,*/
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
    p: 2,
};

export const ModalAPCombo = (props: any) => {
    const { loadApiProductos, loadApiPrimeraCategoria, loadApiSegundaCategoria, 
        loadApiProductoCategoria, loadApiPresentacion, loadApiAComboCategoria, 
        loadApiAComboCategoria2, loadApiAComboCategoria3, loadApiAComboCategoria4 } = useRecetaCombo()
    //const { formState, handleSubmit, register, getValues, setValue, unregister,reset  } = useForm();
    const { openModalCombo, handleOpenModalCombo, handleCloseModalCombo,
         NomMenu, ElementosCombo, control,
        handleSubmit, setValue, getValues, reset, IdComboMadre,
        IdMenuCombo,idProductoG,unregister,pasarParametros }: any = props;
    //console.log("dato de IdProductoMadre ",IdProductoMadre)
    const [producto, setProducto] = useState<any>([])
    const [primeraCat, setPrimeraCat] = useState<any>([])
    const [segundaCat, setSegundaCat] = useState<any>([])
    const [productoC, setProductoC] = useState<any>([])
    const [presentacionC, setPresentacionC] = useState<any>([])

    const [Categoria1, setCategoria1] = useState<any>([])
    const [Categoria2, setCategoria2] = useState<any>([])
    const [Categoria3, setCategoria3] = useState<any>([])
    const [Categoria4, setCategoria4] = useState<any>([])
    const [nomCat1, setNomCat1] = useState<any>([])

    const [idPrimeraCat, setIdPrimeraCat] = useState('')
    const [nomPrimeraCat, setNomPrimeraCat] = useState('')
    const [idSegundaCat, setIdSegundaCat] = useState('')
    const [nomSegundaCat, setNomSegundaCat] = useState('')
    const [idProducto, setIdProducto] = useState('')
    const [nomProducto, setNomProducto] = useState('')
    const [idPresentacion, setIdPresentacion] = useState('')
    const [nomPresentacion, setNomPresentacion] = useState('')

    const [idProductoUnico, setIdProductoUnico] = useState('')

    const [disableSubCategorySecond, setDisableSubCategorySecond] = useState(true)
    const [disableSubCategoryFrist, setDisableSubCategoryFrist] = useState(true)
    const [disableSubCategoryThird, setDisableSubCategoryThird] = useState(true)

    const [rows, setRows] = useState<any>([])
    React.useEffect(() => {
        //console.log("data ...", tableData)
        if (ElementosCombo) setRows(ElementosCombo);
    }, [ElementosCombo]);

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        loadObtenerPrimeraCategoria()
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

    const loadObtenerSegundaCategoria = async (idPrimeraCat: number) => {
        try {
            const response = await loadApiSegundaCategoria(idPrimeraCat);
            console.log("response categoria segunda", response)
            if (response?.status && response?.segundaCategoria) {
                if (Array.isArray(response.segundaCategoria)) {

                    setSegundaCat(response.segundaCategoria)
                    //actulizar select
                }
            }

        } catch (error) {

        }
    }

    const loadObtenerProducto = async (idSegundaCat: number) => {
        try {
            const response = await loadApiProductoCategoria(idSegundaCat);
            console.log("response Producto", response)
            if (Array.isArray(response.productomadre)) {

                setProductoC(response.productomadre)
                //actulizar select
            }

        } catch (error) {

        }
    }

    const loadObtenerPresentacion = async (Id_Producto: number) => {
        try {
            const response = await loadApiPresentacion(Id_Producto);
            console.log("response Presentacion", response)
            if (Array.isArray(response.productounico)) {

                setPresentacionC(response.productounico)
                //actulizar select
            }

        } catch (error) {

        }
    }

    const loadObtenerListaCategoriaCombo = async (id_primera_cat:number) => {
        try {
            setLoading(true)
            const response = await loadApiAComboCategoria(id_primera_cat);
            setLoading(false)
            console.log("response Categoria1", response)
            if (Array.isArray(response.cageoria1)) {

                setCategoria1(response.cageoria1)
                //console.log("hola")
                for (let i = 0; i < response?.cageoria1?.length; i++) {
                    setNomCat1(response?.cageoria1[i].NOMBRE)
                    //setIdProductoUnico(response?.cageoria1[i].ID_PRODUCTO_UNICO)
                }
                //actulizar select
            }

        } catch (error) {

        }
        //addNewElement()
    }

    const loadObtenerListaCategoria2Combo = async (id_primera_cat:number,id_segunda_cat:number) => {
        try {
            setLoading(true)
            const response = await loadApiAComboCategoria2(id_primera_cat,id_segunda_cat);
            setLoading(false)
            console.log("response Categoria2", response)
            if (Array.isArray(response.cageoria2)) {

                setCategoria2(response.cageoria2)

                //console.log("hola")
               
            }

        } catch (error) {

        }
        //addNewElement2()
    }

    const loadObtenerListaCategoria3Combo = async (id_primera_cat:number,
                                                    id_segunda_cat:number,
                                                    id_Producto:number) => {
        try {
            setLoading(true)
            const response = await loadApiAComboCategoria3(
                id_primera_cat,
                id_segunda_cat,
                id_Producto);
            setLoading(false)
            console.log("response Categoria3", response)
            if (Array.isArray(response.cageoria3)) {

                setCategoria3(response.cageoria3)
                //console.log("hola")
               
            }

        } catch (error) {

        }
        //addNewElement3()
    }

    const loadObtenerListaCategoria4Combo = async (id_primera_cat:number,
                                                    id_segunda_cat:number,
                                                    id_Producto:number,
                                                    id_Presentacion:number) => {
        try {
            setLoading(true)
            const response = await loadApiAComboCategoria4(
               id_primera_cat,
               id_segunda_cat,
               id_Producto,
               id_Presentacion
                );
            setLoading(false)
            console.log("response Categoria4", response)
            if (Array.isArray(response)) {

                setCategoria4(response)
                //console.log("hola")
               
            }

        } catch (error) {

        }
        //addNewElement4()
    }


    const handleSeleccionePrimeraCategoria = async (value: any) => {

        console.log("valee de primera Cate ", value)
        const { ID_CATEGORIA, CATEGORIA } = value
        setIdPrimeraCat(ID_CATEGORIA)
        setNomPrimeraCat(CATEGORIA)
        setValue("subcategoria", "")
        setValue("producto", "")
        setValue("presentacion", "")
        setSegundaCat([])
        await loadObtenerSegundaCategoria(ID_CATEGORIA);
        //setDisableSubCategorySecond(false)
        setDisableSubCategoryFrist(false)
        await loadObtenerListaCategoriaCombo(ID_CATEGORIA)

    }

    const handleSeleccioneSegundaCategoria = async (value: any) => {
        console.log("valee de segunda Cate ", value)
        const { ID_CATEGORIA_2, CATEGORIA_2 } = value
        setIdSegundaCat(ID_CATEGORIA_2)
        setNomSegundaCat(CATEGORIA_2)
        setValue("producto", "")
        setValue("presentacion", "")
        setProductoC([])
        await loadObtenerProducto(ID_CATEGORIA_2);
        setDisableSubCategorySecond(false)
        await loadObtenerListaCategoria2Combo(Number(idPrimeraCat),ID_CATEGORIA_2)
    }

    const handleSeleccioneProducto = async (value: any) => {
        console.log("valee de producto ", value)
        const { ID_PRODUCTO_MADRE, PRODUCTO } = value
        setIdProducto(ID_PRODUCTO_MADRE)
        setNomProducto(PRODUCTO)
        setValue("presentacion", "")
        setPresentacionC([])
        await loadObtenerPresentacion(ID_PRODUCTO_MADRE);
        setDisableSubCategoryThird(false)
        await loadObtenerListaCategoria3Combo(
            Number(idPrimeraCat),
            Number(idSegundaCat),
            ID_PRODUCTO_MADRE)
    }

    const handleSeleccionePresentacion = async (value: any) => {
        console.log("valee de presentacion ", value)
        const { ID_PRODUCTO_UNICO, TAMAÑO } = value
        setIdPresentacion(ID_PRODUCTO_UNICO)
        setNomPresentacion(TAMAÑO)
        setDisableSubCategorySecond(false)
        await loadObtenerListaCategoria4Combo( 
            Number(idPrimeraCat),
            Number(idSegundaCat),
            Number(idProducto),
            ID_PRODUCTO_UNICO)
    }

    const cerrarModal = async () => {
        reset({});
        handleCloseModalCombo()
        // setValue("subcategoria", "")
        // setValue("producto", "")
        // setValue("presentacion", "")
    }
    const closeModalResetForm = () => {

        reset({});
        //rows([]);
        handleCloseModalCombo()
    }

    const addNewElement = () => {
        // console.log("add ", value)
        //console.log("ejecutando metodo rows",rows[0].GRUPO)
        //var { nomElemento } = value cageoria1[i].NOMBRE
        console.log("hay dato ", Categoria1)
        const arrayTemp = [...rows];

        for (let i = 0; i < Categoria1?.length; i++) {
            //arrayTemp.push({ PRODUCTO_MADRE: `HOLA_${i}` })
            arrayTemp.push({ GRUPO: NomMenu , PRODUCTO_MADRE: Categoria1[i].NOMBRE, IdProductoUnico: Categoria1[i].ID_PRODUCTO_UNICO })
            //setValue(`visual_${i}`,1)
            //setIdProductoUnico(Categoria1[i].ID_PRODUCTO_UNICO)
        }

        setRows(arrayTemp);
        

    }

    const addNewElement2 = () => {
        
        console.log("hay dato ", Categoria2)
        const arrayTemp = [...rows];

        for (let i = 0; i < Categoria2?.length; i++) {
            
            arrayTemp.push({ GRUPO: NomMenu , PRODUCTO_MADRE: Categoria2[i].NOMBRE, IdProductoUnico: Categoria2[i].ID_PRODUCTO_UNICO })
            //setIdProductoUnico(Categoria2[i].ID_PRODUCTO_UNICO)
        }

        setRows(arrayTemp);

    }

    const addNewElement3 = () => {
        
        console.log("hay dato ", Categoria3)
        const arrayTemp = [...rows];

        for (let i = 0; i < Categoria3?.length; i++) {
            
            arrayTemp.push({ GRUPO: NomMenu , PRODUCTO_MADRE: Categoria3[i].NOMBRE, IdProductoUnico: Categoria3[i].ID_PRODUCTO_UNICO })
            //setIdProductoUnico(Categoria3[i].ID_PRODUCTO_UNICO)
        }

        setRows(arrayTemp);

    }

    const addNewElement4 = () => {
        
        console.log("hay dato ", Categoria4)
        const arrayTemp = [...rows];

        for (let i = 0; i < Categoria4?.length; i++) {
            
            arrayTemp.push({ GRUPO: NomMenu , PRODUCTO_MADRE: Categoria4[i].NOMBRE, IdProductoUnico: Categoria4[i].ID_PRODUCTO_UNICO })
            //setValue(`visual_${i}`,1)
            //setIdProductoUnico(Categoria4[i].ID_PRODUCTO_UNICO)
        }

        setRows(arrayTemp);

    }

    //metodo para eliminar elementos
    const deleteByIndex = (index: any) => {
    console.log("eliminar ", index)
  
  
    //eliminar la referencia datos ya creado al momento de eliminar
    //exameple  unregister("yourDetails")
    unregister(`check_${index}`)
    unregister(`checkVisual_${index}`)
    
  
    setRows((oldValues: any) => {
      return oldValues.filter((_: any, i: any) => i !== index)
    })
  }

    
    return (
        <Modal
            open={openModalCombo}
            onClose={handleCloseModalCombo}
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
                        {NomMenu}
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
                {/* <Typography id="modal-modal-description" sx={{
                    mt: 0// textAlign: 'center'
                    , fontWeight: 'bold',
                    fontSize: '1.5rem', marginBottom: '10px',fontFamily: 'Times New Roman'
                }}>
                    {NomMenu} 
                </Typography> */}
                <br />
                {/* <button onClick={()=> console.log(getValues())}>get values Modal</button> */}
                {/* <button onClick={addNewElement}>prueba</button> */}
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <div >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <h6 style={{ padding: '0px', margin: '0px' }}>Categoria</h6>
                                    <AddIcon sx={{
                                        backgroundColor: '#17A2B8', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                                        marginLeft: '10px', marginBottom: '10px'
                                        , fontWeight: 'bold'
                                    }}
                                        //onClick={loadObtenerListaCategoriaCombo}
                                        onClick={addNewElement}
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name="categoria"
                                    //rules={{ required: true }}
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <h6 style={{ padding: '0px', margin: '0px' }}>SubCategoria</h6>
                                    <AddIcon sx={{
                                        backgroundColor: '#17A2B8', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                                        marginLeft: '10px', marginBottom: '10px'
                                        , fontWeight: 'bold'
                                    }}
                                        //onClick={loadObtenerListaCategoria2Combo}
                                        onClick={addNewElement2}
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name="subcategoria"
                                    //rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            clearOnBlur={true}
                                            options={segundaCat}
                                            disabled={disableSubCategoryFrist}
                                            sx={{ width: '100%' }}
                                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                            onChange={(event, item, reason) => {

                                                if (reason === 'clear') {
                                                    console.log("Put your clear logic here: this condition executed when clear button clicked")
                                                    // setValue({ SUB_CATEGORIA_1: '' }) //for reset the value
                                                    return
                                                }

                                                handleSeleccioneSegundaCategoria(item)
                                                onChange(item)

                                            }
                                            }

                                            //value={value}
                                            value={value || null}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Seleccion Segunda Categoria"
                                                //error={!!errors.subcategoria}
                                                //helperText={errors.subcategoria && "Completa este campo"}
                                                //  required

                                                />
                                            )}


                                            getOptionLabel={(option: any) => option.CATEGORIA_2}


                                        />
                                    )}
                                />

                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <h6 style={{ padding: '0px', margin: '0px' }}>Producto</h6>
                                    <AddIcon sx={{
                                        backgroundColor: '#17A2B8', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                                        marginLeft: '10px', marginBottom: '10px'
                                        , fontWeight: 'bold'
                                    }}
                                        //onClick={loadObtenerListaCategoria3Combo}
                                        onClick={addNewElement3}
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name="producto"
                                    //rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={productoC}
                                            disabled={disableSubCategorySecond}
                                            sx={{ width: '100%' }}
                                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                            onChange={(event, item) => {
                                                handleSeleccioneProducto(item)
                                                onChange(item)

                                            }
                                            }

                                            //value={value}
                                            value={value || null}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Seleccione el Producto"
                                                //error={!!errors.categoria}
                                                //helperText={errors.categoria && "Completa este campo"}
                                                //  required

                                                />
                                            )}


                                            getOptionLabel={(option: any) => option.PRODUCTO}


                                        />
                                    )}
                                />

                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <h6 style={{ padding: '0px', margin: '0px' }}>Presentacion</h6>
                                    <AddIcon sx={{
                                        backgroundColor: '#17A2B8', color: 'white', fontSize: '1.1rem', padding: '0.5px', margin: '0',
                                        marginLeft: '10px', marginBottom: '10px'
                                        , fontWeight: 'bold'
                                    }}
                                        //onClick={loadObtenerListaCategoria4Combo}
                                        onClick={addNewElement4}
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name="presentacion"
                                    //rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={presentacionC}
                                            disabled={disableSubCategoryThird}
                                            sx={{ width: '100%' }}
                                            //    isOptionEqualToValue={(option, value) => option.DESCRIPCION === value.DESCRIPCION}

                                            onChange={(event, item) => {
                                                handleSeleccionePresentacion(item)
                                                onChange(item)

                                            }
                                            }

                                            //value={value}
                                            value={value || null}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Seleccione Presentacion"
                                                // error={!!errors.categoria}
                                                //helperText={errors.categoria && "Completa este campo"}
                                                //  required

                                                />
                                            )}


                                            getOptionLabel={(option: any) => option.TAMAÑO}


                                        />
                                    )}
                                />

                            </div>
                        </Grid>

                    </Grid>
                    {loading ? <KDImage /> : null}
                </Box>


                <br />

                <TablaRecetaCombo
                    rows={rows}
                    deleteByIndex={(index: any) => deleteByIndex(index)}
                    //ElementosCombo={ElementosCombo}
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    handleSubmit={handleSubmit}
                    Categoria1={Categoria1}
                    IdComboMadre={IdComboMadre}
                    idPrimeraCat={idPrimeraCat}
                    idSegundaCat={idSegundaCat}
                    idProducto={idProducto}
                    idPresentacion={idPresentacion}
                    IdMenuCombo={IdMenuCombo}
                    idProductoG={idProductoG}
                    unregister={unregister}
                    idProductoUnico={idProductoUnico}
                    pasarParametros={pasarParametros}
                    cerrarModal={cerrarModal}
                />

                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/* <Button sx={{ backgroundColor: '#7066E0' }} variant="contained" >Si</Button> */}
                    &nbsp; &nbsp;
                    <Button onClick={cerrarModal} sx={{ backgroundColor: '#6E7881' }} variant="contained" >Cancel</Button>
                </div>
            </Box>
        </Modal>
        
    )
    
}
