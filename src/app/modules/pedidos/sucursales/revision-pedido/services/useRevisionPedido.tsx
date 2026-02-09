import AplicationConnect from "../../../../../../core/api/AplicationConnect"





export const useRevisionPedido = () => {




    //ok 
    const loadApiRevisionSucursalByDate = async (ID_SUCURSAL: string, FECHA: string) => {

        ///revisionSucursal
        try {
            const respuesta = await AplicationConnect.post<any>(`/revisionSucursal`, {
                "sucursal": ID_SUCURSAL,//"13",
                "fecha": FECHA  //"2023-05-10"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
    //ok 

    const loadApiRestriccionesTiempoSucursal = async (ID_SUCURSAL: number) => {
        //restriccionesTiempoSucursal/13
        try {

            const respuesta = await AplicationConnect.post<any>(`/restriccionesTiempoSucursal/${ID_SUCURSAL}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
   

    

    //ok

    const loadApiEnviarRevisionSucursal = async (idSucursal: string, fecha: string, revision: any) => {

        // console.log("llegando datos ",idPerfil,registro)
        try {
            const respuesta = await AplicationConnect.post<any>('/enviarRevisionSucursal', {
                "sucursal": idSucursal,  //13
                "fecha": fecha,  // 2023-05-10
                "revision": revision  //objeto
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //ok 

    const loadApiGuardarRevisionSucursal = async (idSucursal: string, fecha: string, revision: any) => {

      //guardarRevisionSucursal
        try {
            const respuesta = await AplicationConnect.post<any>('/guardarRevisionSucursal', {
                "sucursal": idSucursal,  //13
                "fecha": fecha,  // 2023-05-10
                "revision": revision  //objeto
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {

        loadApiRevisionSucursalByDate,
        loadApiRestriccionesTiempoSucursal,
        loadApiEnviarRevisionSucursal,
        loadApiGuardarRevisionSucursal,

    }
}
