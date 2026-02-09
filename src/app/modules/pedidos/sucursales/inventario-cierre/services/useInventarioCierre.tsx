import AplicationConnect from "../../../../../../core/api/AplicationConnect"





export const useInventarioCierre = () => {


    //SistemaGeneralBLocal/existenciasSucursal/4

    const loadApiInventarioCierre = async (idSucursal:number) => {
        //productosPedidosExternos/2
        try {
            //const respuesta = await AplicationConnect.post<any>(`/productosPedidosExternos/${ID_AREA_PRODUCCION}`)
            const respuesta = await AplicationConnect.post<any>(`/existenciasSucursal/${idSucursal}`)
            return respuesta.data 

        } catch (error) {
            console.log(error)
            return error
        }

    }

    //http://localhost/SistemaGeneralB/guardarInventarioSucursal
    const loadApiGuardarInventario = async (sucursal: string,inventario:any) => {
        try {
            console.log("inventario**", inventario)
            const respuesta = await AplicationConnect.post<any>('/guardarInventarioSucursal', {
                "sucursal": sucursal,
                "declaracion": inventario
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
            //return error
        }

    }

    //http://localhost/SistemaGeneralB/enviarDeclaracionSucursal
    const loadApiEnviarInventario = async (sucursal: string,inventario:any) => {
        try {
            console.log("inventario envio**", inventario)
            const respuesta = await AplicationConnect.post<any>('/enviarDeclaracionSucursal', {
                "sucursal": sucursal,
                "declaracion": inventario
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {
        
        loadApiInventarioCierre,
        loadApiGuardarInventario,
        loadApiEnviarInventario

    }
}
