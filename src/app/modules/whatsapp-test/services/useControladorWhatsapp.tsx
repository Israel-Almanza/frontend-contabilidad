import AplicationConnect from "../../../../core/api/AplicationConnect"





export const useControladorWhatsapp = () => {


    const loadApiGetUsuariosforWhastapp = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/whastapptest/get_users_for_whastapp')
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
        loadApiGetUsuariosforWhastapp,
        loadApiSetResetPassword 
     
    }
}
