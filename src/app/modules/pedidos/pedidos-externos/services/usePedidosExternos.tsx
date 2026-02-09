import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const usePedidosExternos = () => {


    const loadApiSucursalesUsaurio = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursalesUsuario')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //ok isa


    const loadApiRegistrarPedidosExternos = async (sucursal: string,
        area_produccion: string,
        numero_factura: string,
        fecha_factura: string,
        total: string,
        productos: any) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/registrarPedidosExternos', {
                "sucursal": sucursal ,// "13",
                "area_produccion": area_produccion,// "2",
                "numero_factura":numero_factura , //"67",
                "fecha_factura": fecha_factura, //"2023-04-27",
                "total":total, //  "52",
                "productos":productos
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //ok isa
    const loadApiPedidosExternosSuc = async (sucursal: number, fecha_inicio: string, fecha_fin: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedidosExternosSucursal', {


                "sucursal": sucursal,

                "fecha_inicio": fecha_inicio,
                "fecha_fin": fecha_fin
                /*
                          "sucursal": "13",
               "fecha_inicio": "2023-03-03",
               "fecha_fin": "2023-04-27"
                       */



            })


            return respuesta.data

        } catch (error) {
            console.log(error)
        }



    }
    //ok isa
    const loadApiAreasProduccion = async () => {
        try { //areasProduccion
            const respuesta = await AplicationConnect.post<any>('/areasProduccion')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //SistemaGeneralBLocal/primeraSubCategoriaInventarios/7

    const loadApiProductPedidosExternos = async (ID_AREA_PRODUCCION: number) => {
        //productosPedidosExternos/2
        try {
            const respuesta = await AplicationConnect.post<any>(`/productosPedidosExternos/${ID_AREA_PRODUCCION}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //



    return {
        loadApiSucursalesUsaurio,
        loadApiPedidosExternosSuc,
        loadApiAreasProduccion,
        loadApiProductPedidosExternos,
        loadApiRegistrarPedidosExternos


    }
}
