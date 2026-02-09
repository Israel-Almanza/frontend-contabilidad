import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../../core/api/AplicationConnect"





export const useRecepcion = () => {

    //http://SistemaGeneralB/recepcionSucursal

    const loadApiRecepcionSucursal = async (sucursal: string,fecha:any,turno:string) => {
        //solicitudesSucursal
        try {
            const respuesta = await AplicationConnect.post<any>(`/recepcionSucursal`, {
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

    //http://localhost/SistemaGeneralB/turnosRecepcion
    const loadApiRecepcionTurnoSucursal = async (sucursal: string,fecha:any) => {
        try {
            console.log("recepcion**", fecha)
            const respuesta = await AplicationConnect.post<any>('/turnosRecepcion', {
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

    //http://localhost/SistemaGeneralB/guardarRecepcionSucursal
    const loadApiGuardarRecepcionSucursal = async (idSucursal: string, fecha: string, recepcion: any) => {

        //guardarRevisionSucursal
          try {
              const respuesta = await AplicationConnect.post<any>('/guardarRecepcionSucursal', {
                  "sucursal": idSucursal,  //13
                  "fecha": fecha,  // 2023-05-10
                  "recepcion": recepcion  //objeto
              })
              return respuesta.data
  
          } catch (error) {
              console.log(error)
          }
  
      }

    //http://localhost/SistemaGeneralB/enviarRecepcionSucursal
    const loadApiEnviarRecepcionSucursal = async (idSucursal: string, fecha: string, tipo: string, recepcion: any) => {

        // console.log("llegando datos ",idPerfil,registro)
        try {
            const respuesta = await AplicationConnect.post<any>('/enviarRecepcionSucursal', {
                "sucursal": idSucursal,  //13
                "fecha": fecha,  // 2023-05-10
                "tipo": tipo,
                "recepcion": recepcion  //objeto
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {
        
        loadApiRecepcionSucursal,
        loadApiRecepcionTurnoSucursal,
        loadApiRestriccion,
        loadApiEnviarRecepcionSucursal,
        loadApiGuardarRecepcionSucursal

    }
}
