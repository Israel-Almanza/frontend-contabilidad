import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useEditarCliente = () => {

    // /cliente/listClientes

    const loadApiListarClientes = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/cliente/listClientes`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }
    

    // /cliente/actualizar_cliente
    const loadApiActualizarCliente = async (idClientes:string,nombre: string, dni: string, complemento: string, 
                nit: string, expedido: string, direccion: string, celular: string, telefono: string,
                nomFactura: string, email: string, lat: string, lng: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cliente/actualizar_cliente', {
                "id_cliente": idClientes,
                "nombre": nombre,
                "dni": dni,
                "complemento": complemento,
                "nit": nit,
                "expedido": expedido,
                "direccion": direccion,
                "celular": celular,
                "fijo": telefono,
                "nombre_factura": nomFactura,
                "email": email,
                "lat": lat,
                "lng": lng

            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /cliente/search_clientes
    const loadApiSearchCliente = async (cliente: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cliente/search_clientes', {
                "search": cliente
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarClientes,
        loadApiActualizarCliente,
        loadApiSearchCliente

    }
}
