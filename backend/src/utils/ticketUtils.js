export const formatearMoneda = (valor) => new Intl.NumberFormat ("es-AR", {style: "currency", currency: "ARS", maximumFractionDigits: 0}).format(valor);

export const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString("es-AR", {day: "2-digit", month:"2-digit", year:"numeric"});

export const formatearProducto = (producto) => {
    const cantidad = producto.VentaProducto.cantidad;
    const precioUnitario = producto.VentaProducto.precio_unitario;
    const subtotal = cantidad * precioUnitario;
    return {
        nombre: producto.nombre,
        cantidad,
        precioUnitario: formatearMoneda(precioUnitario),
        subtotal: formatearMoneda(subtotal)
    };
}