import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useArea = () => {

    // /get_areas

    const loadApiListarAreas = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/planta/get_areas`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }
    

    // /guardar_area
    const loadApiGuardarArea = async (nomArea: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/planta/guardar_area', {
              "nombre_area": nomArea
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /planta/update_area_estado
    const loadApiCambioEstado = async (idArea: string, estado:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/planta/update_area_estado', {
                "id_area": idArea,
                "estado": estado
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarAreas,
        loadApiGuardarArea,
        loadApiCambioEstado

    }
}
