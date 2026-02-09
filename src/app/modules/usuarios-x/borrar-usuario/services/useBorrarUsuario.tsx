
import AplicationConnect from "../../../../../core/api/AplicationConnect"



export const useBorrarUsuario = () => {

    //getUsuariosconBaja
    const loadApigetUsuariosconBaja = async () => {

        try {
            const respuesta = await AplicationConnect.get<any>(`/getUsuariosconBaja`, {

            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiDeleteUsuario = async (id_empleado: string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/deleteUsuario', {
                "id_empleado": id_empleado

            })
            //  "id_empleado":"360"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {

        loadApigetUsuariosconBaja,
        loadApiDeleteUsuario
    }
}
