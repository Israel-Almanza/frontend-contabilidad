import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useNewEmpresa = () => {

    // /pedido_extraordinario/listarTodasAreasProduccion

    const loadApiListarEmpresaArea = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/pedido_extraordinario/listarTodasAreasProduccion`, {

            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    // /pedido_extraordinario/guardar_area_produccion
    const loadApiGuardarEmpresaArea = async (nomEmpresa: string, unitario: string, ice: string, general: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedido_extraordinario/guardar_area_produccion', {
                "nombre_area": nomEmpresa,
                "descuento_unitario": unitario,
                "descuento_ice": ice,
                "descuento_general": general
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /pedido_extraordinario/update_area_produccion_estado
    const loadApiCambioEstado = async (idAreaProduccion: string, estado: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedido_extraordinario/update_area_produccion_estado', {
                "id_area_produccion": idAreaProduccion,
                "estado": estado
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /pedido_extraordinario/update_area_produccion
    const loadApiEditarEmpresa = async (idEmpresa: string, nomEmpresa: string, unitario:string,ice:string,general:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedido_extraordinario/update_area_produccion', {
                "id_area_produccion": idEmpresa,
                "nombre_area": nomEmpresa,
                "descuento_unitario": unitario,
                "descuento_ice": ice,
                "descuento_general": general
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {

        loadApiListarEmpresaArea,
        loadApiGuardarEmpresaArea,
        loadApiCambioEstado,
        loadApiEditarEmpresa

    }
}
