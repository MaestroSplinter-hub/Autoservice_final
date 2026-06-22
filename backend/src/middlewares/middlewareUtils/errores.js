export const MensajesError = {
    USUARIO: {
        CORREO: "El formato del correo electrónico no es válido.",
        CONTRA: "La contraseña es inválida (debe tener mínimo 6 caracteres)."
    },
    PRODUCTO: {
        ID: "El identificador (ID) proporcionado no es válido.",
        NOMBRE: "El nombre no es válido (mínimo 2 caracteres).",
        TIPO: "El tipo de producto no es válido (debe ser: videojuego|consola).",
        PRECIO: "El precio debe ser un número decimal mayor a cero.",
        ACTIVO: "El estado activo/inactivo debe ser un booleano válido."
    },
    PAGINACION: {
        PAGINA: "El número de página debe ser un entero positivo.",
        LIMITE: "El límite debe ser un entero positivo no mayor a 1000."
    },
    VENTA: {
        CLIENTE: "El nombre del cliente no es válido.",
        TOTAL: "El total de la venta debe ser mayor o igual a cero.",
        PRODUCTOS_VACIOS: "La lista de productos no puede estar vacía.",
        PRODUCTO_DETALLE: (indice, campo) => `En el producto de la posición ${indice + 1}, el campo '${campo}' es inválido.`
    }
};