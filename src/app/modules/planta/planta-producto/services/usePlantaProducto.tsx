import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const usePlantaProducto = () => {

    // /planta/get_proveedores

    const loadApiListarProveedor = async () => {
        //usuarios accesibilidad
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_proveedores`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }
    
    // /planta/get_presentaciones

    const loadApiListarPresentaciones = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_presentaciones`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    // planta/get_productos
    const loadApiListarProductos = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_productos`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    // /planta/guardar_producto
    const loadApiGuardarProducto = async (nomProducto:string, idProveedor:string, idPresentacion:string) => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/planta/guardar_producto', {
                "nombre_producto": nomProducto,
                "id_proveedor": idProveedor,
                "id_presentacion": idPresentacion
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarProveedor,
        loadApiListarPresentaciones,
        loadApiListarProductos,
        loadApiGuardarProducto

    }
}
