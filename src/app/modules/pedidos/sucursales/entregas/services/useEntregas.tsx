import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../../core/api/AplicationConnect"





export const useEntregas = () => {

    //http:///SistemaGeneralB/entregaSucursal

    const loadApiEntregaSucursal = async (sucursal: string,fecha:any,turno:string) => {
        //solicitudesSucursal
        try {
            const respuesta = await AplicationConnect.post<any>(`/entregaSucursal`, {
                "sucursal": sucursal,
                "fecha": fecha,
                "turno": turno
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    //http://localhost/SistemaGeneralB/recepcionSucursal

    //http://localhost/SistemaGeneralB/turnosEntrega
    const loadApiEntregaTurnoSucursal = async (sucursal: string,fecha:any) => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/turnosEntrega', {
                "sucursal": sucursal,
                "fecha": fecha
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //http://localhost/SistemaGeneralB/restriccionesTiempoSucursal/13
    const loadApiRestriccion = async (idSucursal:number) => {
        //solicitudesSucursal
        try {
            //const respuesta = await AplicationConnect.post<any>(`/productosPedidosExternos/${ID_AREA_PRODUCCION}`)
            const respuesta = await AplicationConnect.post<any>(`/restriccionesTiempoSucursal/${idSucursal}`)
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    //http://localhost/SistemaGeneralB/guardarEntregaSucursal
    const loadApiGuardarEntregaSucursal = async (idSucursal: string, fecha: string, entrega: any) => {

        //guardarRevisionSucursal
          try {
              const respuesta = await AplicationConnect.post<any>('/guardarEntregaSucursal', {
                  "sucursal": idSucursal,  //13
                  "fecha": fecha,  // 2023-05-10
                  "entrega": entrega  //objeto
              })
              return respuesta.data
  
          } catch (error) {
              console.log(error)
          }
  
      }

    //http://localhost/SistemaGeneralB/enviarEntregaSucursal
    const loadApiEnviarEntregaSucursal = async (idSucursal: string, fecha: string, tipo: string, entrega: any) => {

        // console.log("llegando datos ",idPerfil,registro)
        try {
            const respuesta = await AplicationConnect.post<any>('/enviarEntregaSucursal', {
                "sucursal": idSucursal,  //13
                "fecha": fecha,  // 2023-05-10
                "tipo": tipo,
                "entrega": entrega  //objeto
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {
        
        loadApiEntregaSucursal,
        loadApiEntregaTurnoSucursal,
        loadApiRestriccion,
        loadApiEnviarEntregaSucursal,
        loadApiGuardarEntregaSucursal

    }
}
