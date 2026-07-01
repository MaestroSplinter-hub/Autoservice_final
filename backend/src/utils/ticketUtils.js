export const formatearMoneda = (valor) => new Intl.NumberFormat ("es-AR", {style: "currency", currency: "ARS", maximumFractionDigits: 0}).format(valor);

export const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString("es-AR", {day: "2-digit", month:"2-digit", year:"numeric"});