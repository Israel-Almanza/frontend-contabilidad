import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const usePerfil = () => {
    
    // /perfiles/get_perfiles_all
    const loadApiListaPerfil = async () => {
       
        try {
            const respuesta = await AplicationConnect.post<any>(`/perfiles/get_perfiles_all`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            //AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }
    

    // /perfiles/set_perfil
    const loadApiEditarPerfil = async (id: string, nombre: string, estado: string) => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/perfiles/set_perfil', {
                "id": id,
                "nombre": nombre,
                "estado": estado
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /perfiles/nuevo_perfil
    const loadApiGuardarPerfil = async (nomPerfil: string) => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/perfiles/nuevo_perfil', {
                "nombre": nomPerfil
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListaPerfil,
        loadApiEditarPerfil,
        loadApiGuardarPerfil
       

    }
}
