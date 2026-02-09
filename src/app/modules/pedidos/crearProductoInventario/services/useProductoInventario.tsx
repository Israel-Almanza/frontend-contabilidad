import { ListAlt } from "@mui/icons-material"
import AplicationConnect from "../../../../../core/api/AplicationConnect"
//import { AlertError, AlertQuestion, AlertSave } from '../../../../common/alerts/alerts';





export const useProductosInventario = () => {

    // solicitud/getCategoriasInventarios

    const loadApiListarCategoriaInventario = async () => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/solicitud/getCategoriasInventarios`, {

            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // solicitud/createCategoriaInventario
    const loadApiNewCategoriaInventario = async (nomCategoria: string, colorR: string,
        colorG: string, colorB: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/solicitud/createCategoriaInventario', {
                "categoria": nomCategoria,
                "color_r": colorR,
                "color_g": colorG,
                "color_b": colorB
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //solicitud/update_categoria_inventario_estado
    const loadApiEditarCategoriaInventario = async (idCategoria: string, nomCategoria: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/solicitud/update_categoria_inventario_estado', {
                "id_categoria": idCategoria,
                "new_nombre_categoria": nomCategoria,
                "metodo": "update"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //solicitud/update_categoria_inventario_estado
    const loadApiEliminarCategoriaInventario = async (idCategoria: string, estado: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>('/solicitud/update_categoria_inventario_estado', {
                "id_categoria": idCategoria,
                "estado": estado,
                "metodo": "delete"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // solicitud/getSubCategoriasInventarios1

    const loadApiListarSubCategoriaInventario = async (idCategoria: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/solicitud/getSubCategoriasInventarios1`, {
                "id_categoria": idCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // solicitud/create_sub_categoria_inventario_1

    const loadApiNewSubCategoriaInventario = async (idCategoria: string, nomSubCategoria: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/solicitud/create_sub_categoria_inventario_1`, {
                "id_categoria": idCategoria,
                "nombre_sub_categoria": nomSubCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // solicitud/update_sub_categoria_inventario_1_estado

    const loadApiEditarSubCategoriaInventario = async (idSubCategoria: string, nomSubCategoria: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/solicitud/update_sub_categoria_inventario_1_estado`, {
                "id_sub_categoria_1": idSubCategoria,
                "new_nombre_sub_categoria_1": nomSubCategoria,
                "metodo": "update"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //solicitud/update_categoria_inventario_estado
    const loadApiEliminarSubCategoriaInventario = async (idSubCategoria: string, estado: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/solicitud/update_sub_categoria_inventario_1_estado`, {
                "id_sub_categoria_1": idSubCategoria,
                "estado":estado,
                "metodo": "delete"
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    // solicitud/getSubCategoriasInventarios2

    const loadApiListarProductosInventario = async (idSubCategoria: string) => {
        try {
            const respuesta = await AplicationConnect.post<any>(`/solicitud/getSubCategoriasInventarios2`, {
                "id_sub_categoria_1": idSubCategoria
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }





    return {

        loadApiListarCategoriaInventario,
        loadApiNewCategoriaInventario,
        loadApiEditarCategoriaInventario,
        loadApiEliminarCategoriaInventario,
        loadApiListarSubCategoriaInventario,
        loadApiNewSubCategoriaInventario,
        loadApiEditarSubCategoriaInventario,
        loadApiEliminarSubCategoriaInventario,
        loadApiListarProductosInventario

    }
}
