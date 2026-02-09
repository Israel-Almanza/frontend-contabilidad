import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useAccesoFormasPago = () => {


    const loadApiSucursalesUsaurio = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursalesUsuario')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    const loadApiListFirstFormas = async (sucursal: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/getListFirstFormas',{
                "sucursal":sucursal
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
    

    const loadApigetEstadoFormasByCodeIdnameSucursal = async (
     
        CODIGO:number,
        ID_NOMBRE_LISTA_PRECIOS:number,
        sucursal:number
        ) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/getEstadoFormasByCodeIdnameSucursal', {
                "CODIGO": CODIGO,//1,
                "ID_NOMBRE_LISTA_PRECIOS":ID_NOMBRE_LISTA_PRECIOS,//1,
                "sucursal":sucursal //13
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }



    const loadApiUpdateforma = async (
     
        ID_FORMA_PAGO: string,
        ID_UBICACION: string,
        ID_LISTA_VENTAS:string,
        ID_ESTADO: string
        ) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/update-forma', {
                "ID_FORMA_PAGO":   ID_FORMA_PAGO,// "1",
                "ID_UBICACION": ID_UBICACION ,// "13",
                "ID_LISTA_VENTAS":ID_LISTA_VENTAS, // "1",
                "ID_ESTADO": ID_ESTADO //"0"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }




    return {
        loadApiSucursalesUsaurio,
        loadApiListFirstFormas,
        loadApigetEstadoFormasByCodeIdnameSucursal,
        loadApiUpdateforma 


    }
}
