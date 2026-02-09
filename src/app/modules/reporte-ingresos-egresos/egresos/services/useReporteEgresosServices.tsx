
import AplicationConnect from "../../../../../core/api/AplicationConnect"



export const useReporteEgresosServices = () => {

    ///reportes/get_list_reportes
    const loadApiListaTipoReporte = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/reportes/get_list_reportes', {

            })
            //  "id_empleado":"360"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //reportes/get_generic_reportes_by_name_by_date
    const loadApiReporteFechas = async (fechaInicio: string, fechaFin: string, nomReporte: string) => {
        // console.log("datos: ",fechaInicio,"*",fechaFin,"*",sucursal,"*",usuario)
        try {
            const respuesta = await AplicationConnect.post<any>('/reportes/get_generic_reportes_by_name_by_date', {
                "f_inicio": fechaInicio,
                "f_fin": fechaFin,
                "nombre_reporte_pro": nomReporte

            })
            //  "id_empleado":"360"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {

        loadApiListaTipoReporte,
        loadApiReporteFechas
    }
}
