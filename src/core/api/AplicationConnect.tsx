import axios from 'axios'
import { toast } from 'react-toastify'
import ConfigSwisse from './ConfigSwisse'

const CODE_LOGOUT = [401, 403, 500]

const AplicationConnect = axios.create({
    baseURL: ConfigSwisse.urlapi,
    timeout: 30000
})

/* ===========================
   REQUEST
=========================== */
AplicationConnect.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const isFormData = typeof FormData !== 'undefined' && config.data instanceof FormData
        console.log('is form data ', isFormData)

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
                ...(isFormData ? {} : { 'Content-Type': 'application/json' })
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/* ===========================
   RESPONSE (AQUÍ ESTÁ LA MAGIA)
=========================== */
AplicationConnect.interceptors.response.use(
    (response) => {
        // si tu backend devuelve { datos: ... }
        // return response.data?.datos ?? 
        return response.data
    },
    async (error) => {
        if (error.response) {
            const status = error.response.status
            const message =
                error.response.data?.mensaje ||
                error.response.data?.message ||
                'Ocurrió un error inesperado'

            // 🔥 mostrar error al usuario
            toast.error(message)
            // alert(message)

            // 🔒 logout automático
            if (CODE_LOGOUT.includes(status)) {
                // alert('sesesion finalizada')
                toast.error('sesesion finalizada')
                localStorage.removeItem('token')
                // opcional:
                // window.location.href = '/'
                window.location.reload();
            }

            return Promise.reject(message)
        } else {
            // error de red / servidor caído
            toast.error('No se pudo conectar con el servidor')
            // alert('No se pudo conectar con el servidor')
            return Promise.reject('Network error')
        }
    }
)

export default AplicationConnect
