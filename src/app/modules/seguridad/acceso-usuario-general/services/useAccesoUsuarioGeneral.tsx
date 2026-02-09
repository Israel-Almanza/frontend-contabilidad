import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useAccesoUsuarioGeneral = () => {


    const loadApiGetUsuariosforVentas = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/security/get-usuarios-for-ventas')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiGetgetSearchUsuarioVenta = async (id_usuario: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/security/get-search-usuario-general', {
                "id_usuario": id_usuario
            })
            //"id_usuario":"12"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }



    const loadApiSetUpdatePermiso = async (estado: string,
        id_usuario: string,
        id_ventas_acceso: string) => {
        /*
        
      "estado": "0",
    "id_usuario": "12",
    "id_ventas_acceso": "32"
        */
        try {
            const respuesta = await AplicationConnect.post<any>('/security/update-permiso', {
                "estado": estado,
                "id_usuario": id_usuario,
                "id_ventas_acceso": id_ventas_acceso
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {
        loadApiGetUsuariosforVentas,
        loadApiGetgetSearchUsuarioVenta,
        loadApiSetUpdatePermiso 
    }
}
