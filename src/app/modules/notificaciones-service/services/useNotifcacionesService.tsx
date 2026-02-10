import AplicationConnect from "../../../../core/api/AplicationConnect"





export const useNotifcacionesService = () => {


    const loadApiGetListNoficaciones = async () => {

        /* try {
            const respuesta = await AplicationConnect.post<any>('/notificaciones/getListNoficaciones')
            return respuesta.data

        } catch (error) {
            console.log(error)
        } */

    }


    const loadApiAddNotification = async (id_ubicacion: string,
        mensaje: string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/notificaciones/add_notification', {

                "id_ubicacion": id_ubicacion,
                "mensaje": mensaje

            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiReadNotification = async (id_ventas_noti:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/notificaciones/read_notification',
            {
                "id_ventas_noti": id_ventas_noti
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    const loadApiReadAllNotification = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/notificaciones/read_all_notification')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    



    return {
        loadApiGetListNoficaciones,
        loadApiAddNotification,
        loadApiReadNotification,
        loadApiReadAllNotification

    }
}
