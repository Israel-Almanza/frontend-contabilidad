import AplicationConnect from "../../../../../../core/api/AplicationConnect"





export const usePerfilPedido = () => {




    //ok
    const loadApiObtenerPerfil = async (ID_PERFIL: number) => {
        // obtenerPerfil/51
        try {
            //const respuesta = await AplicationConnect.post<any>(`/productosPedidosExternos/${ID_AREA_PRODUCCION}`)
            const respuesta = await AplicationConnect.post<any>(`/obtenerPerfil/${ID_PERFIL}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
    //ok
    const loadApiObtenerPerfilesSucursal = async (ID_SUCURSAL: number) => {
        //obtenerPerfilesSucursal/13
        try {

            const respuesta = await AplicationConnect.post<any>(`/obtenerPerfilesSucursal/${ID_SUCURSAL}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
    //ok
    const loadApiNuevoPerfilSucursal = async (name_perfil: string, idSucursal: number) => {
        //obtenerPerfilesSucursal/13

     //   console.log("name_perfil ",name_perfil)
     //   console.log("idSucursal ",idSucursal)
        try {

            const respuesta = await AplicationConnect.post<any>(`/nuevoPerfilSucursal`, {
                "perfil": name_perfil,   //nombre
                "sucursal": idSucursal   //13
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //ok
    const loadApiClonarPerfilSucursal = async (name_perfil: string, idPerfil: number, idSucursal: number) => {
        //obtenerPerfilesSucursal/13
        try {

            const respuesta = await AplicationConnect.post<any>(`/clonarPerfilSucursal`, {
                "perfil": name_perfil,   //nombre
                "id_perfil":idPerfil, //2
                "sucursal": idSucursal   //13
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //ok
  
    const loadApiGuardarPerfilSucursal = async (idPerfil: number, registro: any) => {
        
       // console.log("llegando datos ",idPerfil,registro)
        try {
            

            const respuesta = await AplicationConnect.post<any>('/guardarPerfilSucursal', {
                "id_perfil": idPerfil,
                "registro": registro
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }



    return {

        loadApiObtenerPerfil,
        loadApiObtenerPerfilesSucursal,
        loadApiNuevoPerfilSucursal,
        loadApiClonarPerfilSucursal,
        loadApiGuardarPerfilSucursal
 

    }
}
