import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useAccesibilidad = () => {

    // getUsuariosAccessiblidad

    const loadApiUsuariosAccesibilidad = async () => {
        //usuarios accesibilidad
        try {

            //    const respuesta = await AplicationConnect.get<any>(`/getUsuariosAccessiblidad`, {
            const respuesta = await AplicationConnect.get<any>(`/getUsuariosAccessiblidadssss`, {
               
            })
            return respuesta.data 

        } catch (error) {
            console.log(error)
            AlertError({ title: '', message: "Error en Conexion de API" })
        }

    }

    // /listaCargos
    const loadApiListaCargos = async () => {
        try {
            //console.log("entrega**", fecha)
            const respuesta = await AplicationConnect.post<any>('/listaCargos', {
              
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // getListPerfiles
    const loadApiListaPerfiles = async () => {
        //solicitudesSucursal
        try {
            const respuesta = await AplicationConnect.post<any>(`/getListPerfiles`)
            return respuesta.data 

        } catch (error) {
            console.log(error)
        }

    }

    // getlistaAFP
    const loadApiListaAFP = async () => {

          try {
              const respuesta = await AplicationConnect.post<any>('/getlistaAFP', {
                 
              })
              return respuesta.data
  
          } catch (error) {
              console.log(error)
          }
  
      }

    // sucursalesUsuario
    const loadApiListaSucursales = async () => {

        // console.log("llegando datos ",idPerfil,registro)
        try {
            const respuesta = await AplicationConnect.post<any>('/sucursalesUsuario', {
               
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // saveUsuario
    const loadApiGuardarUsuario = async (nombre:string, apPaterno:string, apMaterno:string, 
                                        ci:string, exp:string, idSucursal:string, 
                                        fechaNac: string, email:string,telef:string, celular:string, idCargo:string, fechaIngreso:string, direccion:string,
                                        genero:string, sueldo:string, idAFPs:string, idPerfil:string,
                                        usuario:string, nCuenta:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/saveUsuario', {
                
                "nombre":nombre,
                "appat":apPaterno,
                "apmat":apMaterno,
                "dni":ci,
                "expedido":exp,
                "sucursal":idSucursal,
                "nacimiento":fechaNac,
                "email":email,
                "telefono":telef,
                "celular":celular,
                "cargo":idCargo,
                "ingreso":fechaIngreso,
                "domicilio":direccion,
                "genero":genero,
                "sueldo":sueldo,
                "afp":idAFPs,
                "perfil":idPerfil,
                "usuario":usuario,
                "cuenta":nCuenta
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

     // /darbajaUsuario
     const loadApiBajaUsuario = async (idEmpleado:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/darbajaUsuario', {
               "ID_EMPLEADO": idEmpleado
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /darAltaaUsuario
    const loadApiAltaUsuario = async (idEmpleado:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/daraltaUsuario', {
               "ID_EMPLEADO": idEmpleado
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // /setUbicacion
    const loadApiAsignarUbicacion = async (idUsuario:string, sucursal:string, operacion:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/setUbicacion', {
               "id_usuario": idUsuario,
               "sucursal": sucursal,
               "operacion": operacion
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // getEmpleadoById
    const loadApiEditarUsuario = async (idEmpleado:string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/getEmpleadoById', {
               "ID_EMPLEADO": idEmpleado
               
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // updateUsuario
    const loadApiUpDateUsuario = async (idEmpleado:number,nombre:string, apPaterno:string, apMaterno:string,  
                                        fechaNac: string, email:string,telef:string, celular:string, 
                                        idCargo:string, fechaIngreso:string, direccion:string,
                                        genero:string, sueldo:string, idAFPs:string,
                                        nCuenta:string) => {

                    try {
                    const respuesta = await AplicationConnect.post<any>('/updateUsuario', {
                        "empleado": idEmpleado,
                        "nombre": nombre,
                        "appat": apPaterno,
                        "apmat": apMaterno,
                         "nacimiento":fechaNac,
                         "email":email,
                        "telefono": telef,
                        "celular": celular,
                        "cargo": idCargo,
                        "ingreso": fechaIngreso,
                        "domicilio": direccion,
                        "genero": genero,
                        "sueldo": sueldo,
                        "afp": idAFPs,
                        "cuenta": nCuenta
                    })
                    return respuesta.data

                    } catch (error) {
                    console.log(error)
                    }

}

    // /change-perfil
    const loadApiCambiarPerfil = async (idUsuario:string, perfil:string ) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/change-perfil', {
                "perfil": perfil,
                "ID_USUARIO": idUsuario
              
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {
        
        loadApiUsuariosAccesibilidad,
        loadApiListaCargos,
        loadApiListaPerfiles,
        loadApiListaSucursales,
        loadApiListaAFP,
        loadApiGuardarUsuario,
        loadApiBajaUsuario,
        loadApiAltaUsuario,
        loadApiAsignarUbicacion,
        loadApiEditarUsuario, 
        loadApiUpDateUsuario, 
        loadApiCambiarPerfil

    }
}
