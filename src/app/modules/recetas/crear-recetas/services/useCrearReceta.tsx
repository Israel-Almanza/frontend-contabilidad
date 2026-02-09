import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useCrearReceta = () => {

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
    
      // /buscarReceta
    const loadApiBuscarReceta = async (idPresentacion:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/buscarReceta', {
                "ID_PRODUCTO_UNICO": idPresentacion
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /receta-borrar-logico
    const loadApiBorrarReceta = async (id:number) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/receta-borrar-logico', {
                "ID": id
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /agregar-combo-grupo
    const loadApiGuardarReceta = async (receta:any) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/guardar-receta', {
                "receta": receta
            })
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
        loadApiBuscarReceta,
        loadApiBorrarReceta,
        loadApiGuardarReceta,
        loadApiListarElementos

    }
}
