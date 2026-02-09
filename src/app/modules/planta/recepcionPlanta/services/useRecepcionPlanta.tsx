import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useRecepcionPlanta = () => {

    // /planta/get_detalle_recepcion

    const loadApiListarRecepcion = async () => {
        //usuarios accesibilidad
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_detalle_recepcion`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }
    
    // /planta/get_list_detalle_byCodeDate
    const loadApiListarDetalleRecepcion = async (codigo:string, fecha:string) => {
        //usuarios accesibilidad
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_list_detalle_byCodeDate`, {
                "codigo": codigo,
                "fecha": fecha 
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    // /planta/guardar_detalle_recepccion
    const loadApiGuardarDetalleRecepcion = async (idPedido:string, nDocumento:string,
        fechaDoc:string, fechaRecep:string, fondos:string, url:string, factura:string, 
        subTotal:string, descuento:string, total:string, detalle:string) => {
        //usuarios accesibilidad
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/guardar_detalle_recepcion`, {
                "id_pedido": idPedido,
                "numero_documento": nDocumento,
                "fecha_documento": fechaDoc,
                "fecha_recepccion": fechaRecep,
                "destino_fondos": fondos,
                "url_factura": url,
                "factura": factura,
                "subtotal": subTotal,
                "descuento": descuento,
                "total": total,
                "detalles": detalle 
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    

    return {
        
        loadApiListarRecepcion,
        loadApiListarDetalleRecepcion,
        loadApiGuardarDetalleRecepcion

    }
}
