import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../../core/api/AplicationConnect"





export const useSolicitudes = () => {

    //SistemaGeneralB/solicitudPerfil/51

    const loadApiSolicitudesPerfil = async (ID_PERFIL: number) => {
        //solicitudesSucursal
        try {
            const respuesta = await AplicationConnect.post<any>(`/solicitudPerfil/${ID_PERFIL}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //SistemaGeneralB/solicitudesSucursal
    const loadApiSolicitudesSucursal = async (sucursal: string, fecha: any) => {
        try {
            console.log("inventario**", fecha)
            const respuesta = await AplicationConnect.post<any>('/solicitudesSucursal', {
                "sucursal": sucursal,
                "fecha": fecha
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //http://localhost/SistemaGeneralB/restriccionesTiempoSucursal/13
    const loadApiRestriccion = async (idSucursal: number) => {
        //solicitudesSucursal
        try {
            //const respuesta = await AplicationConnect.post<any>(`/productosPedidosExternos/${ID_AREA_PRODUCCION}`)
            const respuesta = await AplicationConnect.post<any>(`/restriccionesTiempoSucursal/${idSucursal}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //http://localhost/SistemaGeneralB/guardarSolicitudSucursal
    const loadApiGuardarSolicitudSucursal = async (idSucursal: string, fecha: string, lista: number, solicitud: any) => {

        //guardarRevisionSucursal
        try {
            const respuesta = await AplicationConnect.post<any>('/guardarSolicitudSucursal', {
                "sucursal": idSucursal,  //13
                "fecha": fecha,  // 2023-05-10
                "lista": lista,
                "solicitud": solicitud  //objeto
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //http://localhost/SistemaGeneralB/enviarSolicitudSucursal
    const loadApiEnviarSolicitudSucursal = async (idSucursal: string, fecha: string, lista: number, solicitud: any) => {

        // console.log("llegando datos ",idPerfil,registro)
        try {
            const respuesta = await AplicationConnect.post<any>('/enviarSolicitudSucursal', {
                "sucursal": idSucursal,  //13
                "fecha": fecha,  // 2023-05-10
                "lista": lista,
                "solicitud": solicitud  //objeto
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {

        loadApiSolicitudesPerfil,
        loadApiSolicitudesSucursal,
        loadApiRestriccion,
        loadApiEnviarSolicitudSucursal,
        loadApiGuardarSolicitudSucursal

    }
}
