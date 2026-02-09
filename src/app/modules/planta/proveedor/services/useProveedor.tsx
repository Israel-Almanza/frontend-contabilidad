import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useProveedor = () => {

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
    

    // /planta/guardar-proveedor
    const loadApiGuardarProveedor = async (nomProveedor: string, idArea: string, 
        direccion: string, telefono:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/planta/guardar_proveedor', {
                "nombre_proveedor": nomProveedor,
                "id_area": idArea,
                "direccion": direccion,
                "telefono": telefono
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarProveedor,
        loadApiListarAreas,
        loadApiGuardarProveedor

    }
}
