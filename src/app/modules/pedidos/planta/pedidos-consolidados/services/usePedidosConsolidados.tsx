import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../../core/api/AplicationConnect";
//import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const usePedidosConsolidados = () => {

    // pedido/listarPedidosConsolidados

    const loadApiListarPedidosConsolidados = async (fecha:string,tipo:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/pedido/listarPedidosConsolidados`, {
                "fecha_reporte": fecha,
                "tipo_reporte": tipo
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    // pedido/get_estado_bloqueado_sucursales

    const loadApiSucursalesEstado = async (fecha:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/pedido/get_estado_bloqueado_sucursales`, {
                "fecha": fecha
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }
    

    // pedido/set_estado_desbloqueado_sucursales
    const loadApiDesbloquearTodos = async (fecha:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedido/set_estado_desbloqueado_sucursales', {
                "fecha": fecha
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    // /pedido/set_estado_bloqueado_sucursales
    const loadApiBloquearTodos = async (fecha:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedido/set_estado_bloqueado_sucursales', {
                "fecha": fecha
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /pedido/cambiar_estado_acceso_pedidos
    const loadApiCambiarEstado = async (fecha:string,codigo:string,sufijo:string,estado:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedido/cambiar_estado_acceso_pedidos', {
                "fecha": fecha,
                "codigo": codigo,
                "sufijo": sufijo,
                "estado_bloqueado": estado
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarPedidosConsolidados,
        loadApiSucursalesEstado,
        loadApiDesbloquearTodos,
        loadApiBloquearTodos,
        loadApiCambiarEstado

    }
}
