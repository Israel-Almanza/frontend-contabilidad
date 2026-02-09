
import AplicationConnect from "../../../../../core/api/AplicationConnect"



export const useRepUsuarioSucursalServices = () => {

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

    //reportes/get_reporte_cierre_turno
    const loadApiReporteUsuario = async (fechaInicio: string, fechaFin:string,sucursal:string,usuario:string) => {
       // console.log("datos: ",fechaInicio,"*",fechaFin,"*",sucursal,"*",usuario)
        try {
            const respuesta = await AplicationConnect.post<any>('/reportes/get_reporte_cierre_turno', {
                "fecha_inicial": fechaInicio,
                "fecha_final": fechaFin,
                "sucursal": sucursal,
                "usuario": usuario

            })
            //  "id_empleado":"360"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {

        loadApiListaTipoReporte,
        loadApiReporteUsuario
    }
}
