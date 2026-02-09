import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useAccesoBoton = () => {


    const loadApiGetUsuariosMenus = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/get-usuarios-y-menus')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiGetPermisoBoton = async (
        id_usuario: string,
        id_menu: string
    ) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/get-permiso-boton', {
                "id_usuario": id_usuario,//"12",
                "id_menu": id_menu//"42"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    const loadApiSetEstadoBoton = async (
        id: string,
        estado: string
    ) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/set-estado-boton', {
                "id": id,//"12",
                "estado": estado//"42"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {
        loadApiSetEstadoBoton,
        loadApiGetPermisoBoton,
        loadApiGetUsuariosMenus
    }
}
