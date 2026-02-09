import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useRecetaCombo = () => {

    // /getProductos-receta-combo

    const loadApiProductos = async () => {
       
        try {
            const respuesta = await AplicationConnect.get<any>(`/getProductos-receta-combo`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }
    
    // /get-receta-PrimeraCategoria

    const loadApiPrimeraCategoria = async () => {
        //usuarios accesibilidad
        try {
            const respuesta = await AplicationConnect.post<any>(`/get-receta-primeraCategoria`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }
    

    // /receta-segunda-categoria
    const loadApiSegundaCategoria = async (idCategoria: number) => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/receta-segunda-categoria', {
              "ID_CATEGORIA": idCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /receta-producto-madre
    const loadApiProductoCategoria = async (idCategoria2: number) => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/receta-producto-madre', {
              "ID_CATEGORIA_2": idCategoria2
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // receta-producto-unico
    const loadApiPresentacion = async (idProducto:number) => {

          try {
              const respuesta = await AplicationConnect.post<any>('/receta-producto-unico', {
                "ID_PRODUCTO_MADRE": idProducto
              })
              return respuesta.data
  
          } catch (error) {
              console.log(error)
          }
  
      }

      // /get-elementos-add-receta

    const loadApiListarElementos = async () => {
        //usuarios accesibilidad
        try {
            const respuesta = await AplicationConnect.get<any>(`/get-elementos-add-receta`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    // get-receta-menuCombo get-receta-menuCombo

    const loadApiListaCombos = async (ID_COMBO:number) => {
        //usuarios accesibilidad
        try {
            const respuesta = await AplicationConnect.post<any>(`/get-receta-menuCombo`, {
                "combo":ID_COMBO
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }
    
      // /get-buscar-elementos-combo
    const loadApiBuscarElementoCombo = async (idCategoria:number, idComboMadre:number, idProductoMadre:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/get-buscar-elementos-combo', {
                "ID_CATEGORIA_1": idCategoria,
                "COMBO_MADRE": idComboMadre,
                "ID_PRODUCTO_MADRE": idProductoMadre
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // //set-categoria-1
    const loadApiAComboCategoria = async (idCategoria:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/set-categoria-1', {
                "ID_CATEGORIA": idCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // //set-categoria-2
    const loadApiAComboCategoria2 = async (idCategoria:number, idCategoria2:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/set-categoria-2', {
                "ID_CATEGORIA": idCategoria,
                "ID_CATEGORIA_2": idCategoria2
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // //set-categoria-3
    const loadApiAComboCategoria3 = async (idCategoria:number, idCategoria2:number, idProductoMadre:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/set-categoria-3', {
                "ID_CATEGORIA": idCategoria,
                "ID_CATEGORIA_2": idCategoria2,
                "ID_PRODUCTO_MADRE":idProductoMadre
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // //set-categoria-4
    const loadApiAComboCategoria4 = async (idCategoria:number, idCategoria2:number, idProductoMadre:number, idProductoUnico:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/set-categoria-4', {
                "ID_CATEGORIA": idCategoria,
                "ID_CATEGORIA_2": idCategoria2,
                "ID_PRODUCTO_MADRE":idProductoMadre,
                "ID_PRODUCTO_UNICO": idProductoUnico
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /delete-elemento-combo
    const loadApiBorrarElementoCombo = async (idMenuCombo:number, idUnico:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/delete-elemento-combo', {
                "ID_VENTAS_MENU_COMBO": idMenuCombo,
                "ID_PRODUCTO_UNICO": idUnico
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /guardar-receta-combo
    const loadApiGuardarReceta = async (combo:string, categoria1:string, categoria2:string,productoMadre:string,productoUnico:string, recetaCombo:any) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/guardar-receta-combo', {
                "combo_madre": combo,
                "productoCategoria1": categoria1,
                "productoCategoria2": categoria2,
                "productoMadre": productoMadre,
                "productoUnico": productoUnico,
                "recetaCombo": recetaCombo
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    const loadApiOrdenProductos = async () => {
        //get-rectea-combo-orden
        try {
            const respuesta = await AplicationConnect.get<any>(`/get-rectea-combo-orden`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    //get-rectea-combo-madre
    const loadApiComboMadre = async () => {
        
        try {
            const respuesta = await AplicationConnect.get<any>(`/get-rectea-combo-madre`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    // /agregar-combo-grupo
    const loadApiAgregarGrupoCombo = async (ID_PRODUCTO_MADRE:string,idCategoria:string, 
        cantidad:string, idOrden:string,agregar:number,idCombo:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/agregar-combo-grupo', {
                "ID_PRODUCTO_MADRE":ID_PRODUCTO_MADRE,
                "id_categoria": idCategoria,
                "cantidad": cantidad,
                "orden": idOrden,
                "btn_agregar": agregar,
                "combo_madre": idCombo
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {
        
        loadApiProductos,
        loadApiPrimeraCategoria,
        loadApiSegundaCategoria,
        loadApiProductoCategoria,
        loadApiPresentacion,
        loadApiListaCombos,
        loadApiBuscarElementoCombo,
        loadApiBorrarElementoCombo,
        loadApiGuardarReceta,
        loadApiListarElementos,
        loadApiAComboCategoria,
        loadApiAComboCategoria2,
        loadApiAComboCategoria3,
        loadApiAComboCategoria4,
        loadApiOrdenProductos,
        loadApiComboMadre,
        loadApiAgregarGrupoCombo

    }
}
