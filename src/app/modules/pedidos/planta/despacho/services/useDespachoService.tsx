
import AplicationConnect from "../../../../../../core/api/AplicationConnect"



export const useDespachoService = () => {

    //error
    const loadApiSucursales = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursales')
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
    const loadApiObtenerListaPedidosDespacho = async (fecha: string,tipo:string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/obtenerListaPedidosDespacho', {
               
                "fecha": fecha,// "2023-05-15",
                "tipo": tipo // "PERECEDERO"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }



    }//ok
    const loadApiGuardarPedidosDespacho = async (tipo: string,despacho:any) => {
        try {
            console.log("llegnado a la api ",tipo,despacho)
            const respuesta = await AplicationConnect.post<any>('/guardarPedidosDespacho', {
                "tipo":tipo ,//"PERCEDO"
                "despacho":despacho // "obj"
              
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }



    }

    return {
        loadApiObtenerListaPedidosDespacho,
        loadApiInventariosTurno,
        loadApiGuardarPedidosDespacho,

        loadApiSucursales,
      
    

    
    }
}
