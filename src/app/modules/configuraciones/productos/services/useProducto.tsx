import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useProducto = () => {
    
    // /get-receta-PrimeraCategoria
    const loadApiPrimeraCategoria = async () => {
       
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

      // guardar-primera-categoria
    const loadApiGuardarCategoria = async (nomCategoria:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/guardar-primera-categoria', {
              "nombre_pc": nomCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

      // modificar-primera-categoria
      const loadApiEditarCategoria = async (nomCategoria:string, idCategoria:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/modificar-primera-categoria', {
              "nombre_pc": nomCategoria,
              "id_categoria": idCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // eliminar-primera-categoria
    const loadApiEliminarCategoria = async (idCategoria:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/eliminar-primera-categoria', {
              "id_categoria": idCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    
      // guardar-segunda-categoria
      const loadApiGuardarSubCategoria = async (idCategoria:number, nomSubCategoria:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/guardar-segunda-categoria', {
                "id_categoria_1": idCategoria,
                "nombre_sc": nomSubCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

     // modificar-segunda-categoria
     const loadApiEditarSubCategoria = async (idCategoria:number, nomSubCategoria:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/modificar-segunda-categoria', {
                "id_categoria": idCategoria,
                "nombre": nomSubCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // eliminar-segunda-categoria
    const loadApiEliminarSubCategoria = async (idCategoria:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/eliminar-segunda-categoria', {
              "id_categoria": idCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
   
    // /getUnidadesMedida
    const loadApiUnidadesMedida = async () => {
        
        try {
            const respuesta = await AplicationConnect.post<any>(`/getUnidadesMedida`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    // /getTamaniosProductos
    const loadApiTamañoProducto = async () => {
        
        try {
            const respuesta = await AplicationConnect.post<any>(`/getTamaniosProductos`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    // /guardar-nuevo-producto
    const loadApiGuardarProducto = async (nomProducto:string, idCategoria:string, 
        detalle:string, medida:string,economica:string, sin:string, transporte:string, 
        precio:string,idSucursal:any,productosTabla:any,cantidadTabla:string, imgBase64:string,) => {
            console.log("enviados datos ========================")
            console.log( "nombre_producto", nomProducto)
            console.log(   "categoria_2", idCategoria)
            console.log(   "detalle_producto", detalle)
            console.log(  "unidad_medida", medida)
            console.log(  "actividad_economica", economica)
            console.log(  "producto_sin", sin)
            console.log( "tieneTransporte", transporte)
            console.log(  "precioTransporte", precio)
            console.log("idSucursal",idSucursal)
            console.log(   "productos_unicos", productosTabla)
            console.log(    "productos_unicos_tabla", cantidadTabla)
            console.log(  "imagenBase64",imgBase64)
       try {
            const respuesta = await AplicationConnect.post<any>('/guardar-nuevo-producto', 
            {
                "nombre_producto": nomProducto,
                "categoria_2": idCategoria,
                "detalle_producto": detalle,
                "unidad_medida": medida,
                "actividad_economica": economica,
                "producto_sin": sin,
                "tieneTransporte": transporte,
                "precioTransporte": precio,
                "sucursales":idSucursal,
                "productos_unicos": productosTabla,
                "productos_unicos_tabla": cantidadTabla,
                "imagenBase64": imgBase64
            }
            )
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //load-producto-madreById
    const loadApiRecuperarDatos = async (idProducto:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/load-producto-madreById', {
              "id_producto_madre": idProducto
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    // /guardar-editar-producto
    const loadApiEditarProducto = async (nomProducto:string, idCategoria:string, 
        detalle:string, medida:string,economica:string, sin:string, imgBase64:string, 
        transporte:string, precio:string,productosTabla:any,cantidadTabla:string) => {
        
        try {
            const respuesta = await AplicationConnect.post<any>(`/guardar-editar-producto`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    const loadApiSucursales = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursales')
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }


    return {
        
        loadApiPrimeraCategoria,
        loadApiSegundaCategoria,
        loadApiProductoCategoria,
        loadApiPresentacion,
        loadApiGuardarCategoria,
        loadApiEditarCategoria,
        loadApiEliminarCategoria,
        loadApiGuardarSubCategoria,
        loadApiEditarSubCategoria,
        loadApiEliminarSubCategoria,
        loadApiUnidadesMedida,
        loadApiTamañoProducto, 
        loadApiGuardarProducto,
        loadApiRecuperarDatos,
        loadApiEditarProducto,
        loadApiSucursales
       

    }
}
