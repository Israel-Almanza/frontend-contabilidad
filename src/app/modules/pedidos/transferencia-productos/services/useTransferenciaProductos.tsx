import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useTransferenciaProductos = () => {


    const loadApiSucursalesUsaurio = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursalesUsuario')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }



    //ok
    const loadApiRegistrarTransferProduct = async (
        sucursal_origen: number,
        sucursal_destino: number,
        cantidad_total_productos: number,
        productos: any) => {
        try {
            //registrarTransferenciaProductos
            const respuesta = await AplicationConnect.post<any>('/registrarTransferenciaProductos', {
                "sucursal_origen": sucursal_origen,
                "sucursal_destino": sucursal_destino,
                "cantidad_total_productos": cantidad_total_productos,
                "productos": productos

            })

            /*
             "sucursal_origen": 13,
 "sucursal_destino": 13,
 "cantidad_total_productos":5,
 "productos":
 [
     {"ID_SUB_CATEGORIA_2":"630","CANTIDAD":"2"},
     {"ID_SUB_CATEGORIA_2":"632","CANTIDAD":"3"}
 ]
            */
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    //ok
    const loadApiTransferProduct = async (sucursal: number, fecha_inicio: string, fecha_fin: string) => {
       
       console.log("datos llengando ",sucursal,fecha_inicio,fecha_fin)
        try {
            const respuesta = await AplicationConnect.post<any>('/transferenciasProductos', {
                "sucursal": sucursal,
                "fecha_inicio": fecha_inicio,
                "fecha_fin": fecha_fin
            })
            /*
         "sucursal": "4",
          "fecha_inicio": "2023-03-03",
          "fecha_fin": "2023-05-02"
            */

            return respuesta.data

        } catch (error) {
            console.log(error)
        }



    }


    //ok isa
    const loadApiInventarioProductSuc = async (ID_SUCURSAL: number) => {
        //inventarioProductosSucursal/13
        try {
            const respuesta = await AplicationConnect.post<any>(`/inventarioProductosSucursal/${ID_SUCURSAL}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //ok isa
    const loadApiStockSucInventory = async (sucursal: number, subcategoria2: number) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/stockSucursalInventario', {
                "sucursal": sucursal,
                "subcategoria2": subcategoria2
            })
            /*
            "sucursal": 13,
                                "subcategoria2": 630
            */

            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }




    return {
        loadApiSucursalesUsaurio,
        loadApiInventarioProductSuc,
        loadApiStockSucInventory,
        loadApiRegistrarTransferProduct,


        loadApiTransferProduct,



    }
}
