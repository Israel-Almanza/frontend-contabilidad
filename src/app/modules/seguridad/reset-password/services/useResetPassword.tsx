import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useResetPassword = () => {


    const loadApiGetUsuariosforReset = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/security/get-usuarios-for-reset')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiSetResetPassword = async (id_usuario: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/security/reset-password', {
                "id": id_usuario
            })
    
            //id":112
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }





    return {
        loadApiGetUsuariosforReset,
        loadApiSetResetPassword 
     
    }
}
