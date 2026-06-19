import {guardarVenta, guardarDetallesVenta, buscarVentaConDetalle, verificarVenta} from "../utils/ventaUtils.js"
export const crearNuevaVenta = (datosVenta) => {
    const { nombreCliente, total, productos } = datosVenta;
    return guardarVenta(nombreCliente, total).then(guardarDetallesVenta(productos));
};

export const leerVentaConDetalle = (id) => buscarVentaConDetalle(id).then(verificarVenta);