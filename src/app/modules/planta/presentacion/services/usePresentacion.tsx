import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const usePresentacion = () => {

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
    

    // /planta/guardar_presentacion
    const loadApiGuardarPresentacion = async (nomPresentacion: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/planta/guardar_presentacion', {
              "nombre_presentacion": nomPresentacion
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /planta/update_presentacion_estado
    const loadApiCambioEstadoP = async (idPresentacion: string, estado:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/planta/update_presentacion_estado', {
                "id_presentacion": idPresentacion,
                "estado": estado
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
   

    return {
        
        loadApiListarPresentaciones,
        loadApiGuardarPresentacion,
        loadApiCambioEstadoP

    }
}
