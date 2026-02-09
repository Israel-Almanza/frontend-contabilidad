import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const usePedidosPlanta = () => {

     // //planta/get_proveedores

     const loadApiListarProveedor = async () => {
       
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_proveedores`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }
    
    // /planta/get_presentacionByNameProductByProveedor
    const loadApiListarPresentacionProducto = async (idProveedor:string, nomProducto:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_presentacionByNameProductByProveedor`, {
                "id_proveedor":idProveedor,
                "nombre_producto":nomProducto
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    // /planta/get_productosByIdProveedor
    const loadApiProductoProveedor = async (idProveedor: number) => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/planta/get_productosByIdProveedor', {
              "id_proveedor": idProveedor
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /planta/guardar_pedido
    const loadApiGuardarPedido = async (pedido:any) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/planta/guardar_pedido', {
                "pedidos": pedido
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
   
    return {
        
        loadApiListarProveedor,
        loadApiProductoProveedor,
        loadApiListarPresentacionProducto,
        loadApiGuardarPedido

    }
}
