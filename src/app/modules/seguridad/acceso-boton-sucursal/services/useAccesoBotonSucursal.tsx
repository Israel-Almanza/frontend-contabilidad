import AplicationConnect from "../../../../../core/api/AplicationConnect"





export const useAccesoBotonSucursal = () => {


    const loadApiSucursalesUsaurio = async () => {

        try {
            const respuesta = await AplicationConnect.post<any>('/sucursalesUsuario')
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiGetAccesoBotones = async (sucursal: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/security/get-acceso-botones', {
                "sucursal": sucursal
            })
            //"sucursal":"13"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }



    const loadApiSetConfiguracionBoton = async (id: string,
        boton: string,
        valor: string) => {
        /*
        
          "id": "44",
    "boton": "ESTADO",
    "valor": "1"
        */
        try {
            const respuesta = await AplicationConnect.post<any>('/security/set-configuracion-boton', {
                "id": id,
                "boton": boton,
                "valor": valor
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {
        loadApiSucursalesUsaurio,
        loadApiGetAccesoBotones,
        loadApiSetConfiguracionBoton

    }
}
