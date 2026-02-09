
import AplicationConnect from "../../../../core/api/AplicationConnect"



export const useCierreTurnoServices = () => {

    //reportes/get_usuarios_for_reportes
    const loadApiListaUsuarioTurno = async (sucursal: string) => {

        try {
            const respuesta = await AplicationConnect.post<any>('/reportes/get_usuarios_for_reportes', {
                "sucursal":sucursal
                //"sucursal": "pando"
            })
            //  "id_empleado":"360"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    //reportes/get_reporte_cierre_turno
    const loadApiReporteUsuario = async (fechaInicio: string, fechaFin:string,sucursal:string,usuario:string) => {
        console.log("datos: ",fechaInicio,"*",fechaFin,"*",sucursal,"*",usuario)
        try {
            const respuesta = await AplicationConnect.post<any>('/reportes/get_reporte_cierre_turno', {
                "fecha_inicial": fechaInicio,
                "fecha_final": fechaFin,
                "sucursal": sucursal,
                "usuario": usuario

            })
            //  "id_empleado":"360"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

     //imprimir-cierre-turno
     const loadApiReportePrint = async (cantidad:string,descuadre:string,fechaInicio: string, 
        fechaFin:string,horaCierre:string,horaInicio:string,impresora:string,montoCierre:string,montoInicial:string,
        pedidosYa:string,efectivo:string,card:string,noEfectivo:string,pagoQR:string,tarjeta:string,
        transferencia:string,rangoFacturas:string,saldoTeorico:string,sucursal:string,egresos:string,
        ingresos:string,usuario:string) => {
        //console.log("datos: ",fechaInicio,"*",fechaFin,"*",sucursal,"*",usuario)
        try {
            const respuesta = await AplicationConnect.post<any>('/imprimir-cierre-turno', {
                
                    "cantidadRecibos": cantidad,
                    "descuadre": descuadre,
                    "fecha_apertura": fechaInicio,
                    "fecha_cierre": fechaFin,
                    "hora_cierre": horaCierre,
                    "horario_apertura":horaInicio,
                    "impresora_local":impresora,
                    "monto_cierre": montoCierre,
                    "monto_inicial": montoInicial,
                    "monto_total_ventas_cupon_pedidos_ya": pedidosYa,
                    "monto_total_ventas_efectivo": efectivo,
                    "monto_total_ventas_gift_card": card,
                    "monto_total_ventas_no_efectivo": noEfectivo,
                    "monto_total_ventas_pago_qr": pagoQR,
                    "monto_total_ventas_tarjeta": tarjeta,
                    "monto_total_ventas_transferencia_bancaria": transferencia,
                    "rangoFacturas": rangoFacturas,
                    "saldo_teorico": saldoTeorico,
                    "sucursal": sucursal,
                    "total_egresos": egresos,
                    "total_ingresos": ingresos,
                    "usuario": usuario
                    

            },{ responseType: 'blob' })
            //  "id_empleado":"360"
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {

        loadApiListaUsuarioTurno,
        loadApiReporteUsuario,
        loadApiReportePrint
    }
}
