import { Venta, Producto, VentaProducto } from "../models/index.js";
import { ventaInexistenteError } from "../errors/ErrorApp.js";

export const guardarVenta = (nombreCliente, total) => Venta.create({nombre_cliente: nombreCliente, total: total});

export const guardarDetallesVenta = (productos) => (nuevaVenta) => {
    const detallesVenta = productos.map(prod => ({
        venta_id: nuevaVenta.id,
        producto_id: prod.id,
        cantidad: prod.cantidad,
        precio_unitario: prod.precio 
    }));
    return VentaProducto.bulkCreate(detallesVenta).then(() => nuevaVenta);
};

export const buscarVentaConDetalle = (id) => Venta.findByPk(id, {
    include: [{
        model: Producto,
        as: "productos",
        through: { attributes: ["cantidad", "precio_unitario"]}
    
    }]
});

export const verificarVenta = (venta) => {
    if (!venta) throw new ventaInexistenteError();
    return venta;
};