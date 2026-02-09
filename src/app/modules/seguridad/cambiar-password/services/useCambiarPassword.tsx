import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useCambiarPassword = () => {


    const loadApiGetInfoUsuario = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/security/get-info-usuario')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiSetChangePassword = async (
        usuario: string,
        password_actual: string,
        password_new: string,
        repeat_password_new: string
    ) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/security/changePassword', {

                "usuario": usuario,
                "password_actual": password_actual,
                "password_new": password_new,
                "repeat_password_new": repeat_password_new
            })
            /*
             "usuario": "ddemo1",
                            "password_actual": "publica1",
                            "password_new": "publica2",
                            "repeat_password_new": "publica2"
            */

            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }





    return {
        loadApiGetInfoUsuario,
        loadApiSetChangePassword
    }
}
