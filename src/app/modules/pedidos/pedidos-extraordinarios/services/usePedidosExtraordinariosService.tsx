import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const usePedidosExtraordinariosService = () => {


    const loadApiSucursalesUsaurio = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursalesUsuario')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //guardarPedidoExtraordinario

    const loadApiGuardarPedidoExtraordinario = async (sucursal: number, categoria: number,
        subcategoria1: number, subcategoria2: number, detalle: string, modificable: number, fecha_entrega: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/guardarPedidoExtraordinario', {

                "sucursal": sucursal,
                "categoria": categoria,
                "subcategoria1": subcategoria1,
                "subcategoria2": subcategoria2,
                "detalle": detalle,
                "modificable": modificable,
                "fecha_entrega": fecha_entrega
                /*
              "sucursal": 13,
             "categoria": 7,
             "subcategoria1": 74,
             "subcategoria2": 630,
             "detalle": "Torta completa",
             "modificable": 1,
             "fecha_entrega": "2023-04-26"
         */
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    const loadApiPedidosExtraordinariosSuc = async (sucursal: number, estado: string, fecha_inicio: string, fecha_fin: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/pedidosExtraordinariosSucursal', {

          
                "sucursal":sucursal,
                "estado": estado,
                "fecha_inicio": fecha_inicio,
                "fecha_fin": fecha_fin

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

       

    }

    const loadApiPrimeraCategoriaInventarios = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/primeraCategoriaInventarios')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //SistemaGeneralBLocal/primeraSubCategoriaInventarios/7

    const loadApiPrimeraSubCategoryInventory = async (subcategoria1: number) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/primeraSubCategoriaInventarios/${subcategoria1}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //
    const loadApiSegundaSubCategoryInventory = async (subcategoria2: number) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/segundaSubCategoriaInventarios/${subcategoria2}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    
    const loadApiGetPermismiosBotones = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/pedido_extraordinario/get_permismios_botones`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    const loadApiCambiarEstadoPe = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/pedido_extraordinario/cambiar-estado-pe`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
    

    return {
        loadApiSucursalesUsaurio,
        loadApiPedidosExtraordinariosSuc,
        loadApiPrimeraCategoriaInventarios,
        loadApiPrimeraSubCategoryInventory,
        loadApiSegundaSubCategoryInventory,
        loadApiGuardarPedidoExtraordinario,
        loadApiGetPermismiosBotones,
        loadApiCambiarEstadoPe

    }
}
