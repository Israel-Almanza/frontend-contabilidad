import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useAccesoPerfilesVenta = () => {


    const loadApiGetPerfiles = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/perfiles/get_perfiles_for_select')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiGetAccesoPerfil = async (id_perfil: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/perfiles/get_acceso_perfil', {
                "id": id_perfil,//"1",
                "filtro":"SISTEMA_VENTAS"
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
      

   /* "ID_VENTAS_ACCESO":"32",
    "ID_VENTAS_PERFIL":"1",
    "estado":"1"*/
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
        loadApiGetAccesoPerfil,
        loadApiSetUpdatePermiso 
    }
}
