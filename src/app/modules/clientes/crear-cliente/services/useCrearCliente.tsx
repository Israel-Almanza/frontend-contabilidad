import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useCrearCliente = () => {

    // /cliente/get_documentos

    const loadApiListarDocumentos = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/cliente/get_documentos`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }
    

    // /cliente/cliente_capresso_register
    const loadApiRegistrarCliente = async (nombre: string, dni: string, complemento: string, 
                nit: string, expedido: string, direccion: string, celular: string, telefono: string,
                nomFactura: string, email: string, lat: string, lng: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cliente/cliente_capresso_register', {
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

    // /cliente/existe_dni
    const loadApiExiteDNI = async (dni: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cliente/existe_dni', {
                "dni": dni
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarDocumentos,
        loadApiRegistrarCliente,
        loadApiExiteDNI

    }
}
