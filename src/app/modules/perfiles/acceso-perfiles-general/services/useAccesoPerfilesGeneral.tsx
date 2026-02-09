import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useAccesoPerfilesGeneral = () => {



    const loadApiGetPerfiles = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/perfiles/get_perfiles_for_select')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiGetgetSearchUsuarioVenta = async (id_perfil: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/perfiles/get_acceso_pefil_dinamic', {
                "id": id_perfil,//"1",
                "filtro":"SISTEMA_GENERAL"
            })
            //"id_usuario":"12"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }



    const loadApiSetUpdatePermiso = async (estado: string,
        id_perfil: string,
        id_ventas_acceso: string) => {
    /*
    
          "estado": estado,
                "ID_VENTAS_PERFIL": id_perfil,
                "ID_VENTAS_ACCESO": id_ventas_acceso
    */
        
   
        try {
            const respuesta = await AplicationConnect.post<any>('/perfiles/update_permiso_perfil', {
                "estado": estado,
                "ID_VENTAS_PERFIL": id_perfil,
                "ID_VENTAS_ACCESO": id_ventas_acceso
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {
        loadApiGetPerfiles,
        loadApiGetgetSearchUsuarioVenta,
        loadApiSetUpdatePermiso 
    }
}
