import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useCronogramaEntregaService = () => {

    //ok
    const loadApiSucursales = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursales')
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }

    //ok
    const loadApiGetCabeceraCronograma = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/getCabeceraCronograma')
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }
    //ok
    const loadApiInventariosTurno = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/inventariosTurno')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    //ok
    const loadApiObtenerCronogramas = async (fecha: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/obtenerCronogramas', {
                "fecha":  fecha //2023-05-15
            })

            /*  
        "sucursal": sucursal,
        "estado": estado,
        "fecha_inicio": fecha_inicio,
        "fehca_fin": fecha_fin*/

            return respuesta.data

        } catch (error) {
            console.log(error)
        }



    }//ok
    const loadApiNuevoCronogramaEntrega = async (sucursal: string,turno:string,fecha: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/nuevoCronogramaEntrega', {
                "sucursal":sucursal, // "13"
                "turno":turno, //"1"
                "fecha":fecha
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }



    }

    return {
        loadApiObtenerCronogramas,
        loadApiSucursales,
        loadApiInventariosTurno,
        loadApiNuevoCronogramaEntrega,

        loadApiGetCabeceraCronograma
    }
}
