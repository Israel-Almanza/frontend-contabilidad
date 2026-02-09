import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useLlave = () => {

    // /llave/get_llaves

    const loadApiListarLlaves = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/llave/get_llaves`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }
    

    // /llave/nueva_llave
    const loadApiGuardarLlave = async (llave:string,fechaActivacion:string,
                                        fechaVen:string,apikey:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/llave/nueva_llave', {
                "llave":llave,
                "activacion":fechaActivacion,
                "vencimiento":fechaVen,
                "apikey":apikey
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /llave/get_key
    const loadApiBuscarToken = async (idLlave:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/llave/get_key', {
                "id": idLlave
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /llave/activar-key
    const loadApiActivarLlave = async (idLlave:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/llave/activar-key', {
                "id": idLlave
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /llave/inactivar-key
    const loadApiDesactivarLlave = async (idLlave:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/llave/inactivar-key', {
                "id": idLlave
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarLlaves,
        loadApiGuardarLlave,
        loadApiBuscarToken,
        loadApiActivarLlave,
        loadApiDesactivarLlave

    }
}
