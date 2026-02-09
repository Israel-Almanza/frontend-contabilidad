import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useCuis = () => {

    // cuis/get-cuis

    const loadApiListarCuis = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/cuis/get-cuis`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    // cuis/get_sucursales

    const loadApiListarSucursales = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/cuis/get_sucursales`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }
    

    // /cuis/nuevo-cuis
    const loadApiGuardarCuis = async (ambiente:string,venta:string,sistema:string,
                                    nit:string,sucursal:string,modalidad:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cuis/nuevo-cuis', {
                "ambiente": ambiente,
                "venta": venta,
                "sistema": sistema,
                "nit": nit,
                "sucursal": sucursal,
                "modalidad": modalidad
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /cuis/ver-cuis
    const loadApiVerCuis = async (idCuis:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cuis/ver-cuis', {
                "id": idCuis
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /cuis/activar-cuis
    const loadApiActivarCuis = async (idCuis:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cuis/activar-cuis', {
                "id": idCuis
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /cuis/inactivar-cuis
    const loadApiDesactivarCuis = async (idCuis:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/cuis/inactivar-cuis', {
                "id": idCuis
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    

    return {
        
        loadApiListarCuis,
        loadApiListarSucursales,
        loadApiGuardarCuis,
        loadApiVerCuis,
        loadApiActivarCuis,
        loadApiDesactivarCuis

    }
}
