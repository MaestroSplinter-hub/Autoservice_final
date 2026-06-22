import { obtenerBooleano, obtenerNumero, esUndefined, errorJson } from "./middlewareUtils/middleUtils.js";
import { esNombreValido, esTipoValido, esPrecioValido, esPrecioMayorOIgualACero, esCorreoValido, esContraValida, esIdValido, esPaginaValida, esLimiteValido, esItemVentaValido, analizarProductosVenta } from "./middlewareUtils/validateUtils.js";
import { MensajesError } from "./middlewareUtils/errores.js";

export const validarUsuarioAdmin = (req, res, next) => {
    const { correo, contrasenia } = req.body ?? {};

    if (!esCorreoValido(correo)) return errorJson(res, 400, MensajesError.USUARIO.CORREO);
    if (!esContraValida(contrasenia)) return errorJson(res, 400, MensajesError.USUARIO.CONTRA);

    next();
};

export const validarIdParam = (req, res, next) => {
    const { id } = req.params ?? {};

    if (!esIdValido(id)) return errorJson(res, 400, MensajesError.PRODUCTO.ID);

    req.params.id = obtenerNumero(id);
    next();
};

export const validarPaginacion = (req, res, next) => {
    const { pagina, limite } = req.query ?? {};
    const p = esUndefined(pagina) ? 1 : obtenerNumero(pagina);
    const l = esUndefined(limite) ? 9 : obtenerNumero(limite);

    if (!esPaginaValida(p)) return errorJson(res, 400, MensajesError.PAGINACION.PAGINA);
    if (!esLimiteValido(l)) return errorJson(res, 400, MensajesError.PAGINACION.LIMITE);

    req.query.pagina = p;
    req.query.limite = l;
    next();
};

export const validarProductoAlta = (req, res, next) => {
    const { nombre, precio, tipo } = req.body ?? {};
    
    if (!esNombreValido(nombre)) return errorJson(res, 400, MensajesError.PRODUCTO.NOMBRE);
    if (!esTipoValido(tipo)) return errorJson(res, 400, MensajesError.PRODUCTO.TIPO);
    if (!esPrecioValido(precio)) return errorJson(res, 400, MensajesError.PRODUCTO.PRECIO);

    req.body = {
        ...req.body,
        nombre: nombre.trim(),
        precio: Number(precio),
        tipo,
    };

    next();
};

export const validarProductoUpdate = (req, res, next) => {
    const { nombre, precio, tipo, activo } = req.body ?? {};
    const activoBool = obtenerBooleano(activo);

    if (!esNombreValido(nombre)) return errorJson(res, 400, MensajesError.PRODUCTO.NOMBRE);
    if (!esTipoValido(tipo)) return errorJson(res, 400, MensajesError.PRODUCTO.TIPO);
    if (!esPrecioValido(precio)) return errorJson(res, 400, MensajesError.PRODUCTO.PRECIO);
    if (activoBool === null) return errorJson(res, 400, MensajesError.PRODUCTO.ACTIVO);

    req.body = {
        ...req.body,
        nombre: nombre.trim(),
        precio: Number(precio),
        tipo,
        activo: activoBool,
    };
    next();
};

export const validarProductoEstado = validarIdParam;

export const validarProductoGet = validarIdParam;

export const validarVentaCrear = (req, res, next) => {
    const { nombreCliente, total, productos } = req.body ?? {};
    const noEstanBienLosProductos = !Array.isArray(productos) || productos.length === 0;

    if (!esNombreValido(nombreCliente)) return errorJson(res, 400, MensajesError.VENTA.CLIENTE);
    if (!esPrecioMayorOIgualACero(total)) return errorJson(res, 400, MensajesError.VENTA.TOTAL);
    if (noEstanBienLosProductos) return errorJson(res, 400, MensajesError.VENTA.PRODUCTOS_VACIOS);
    
    const resultadoValidacion = analizarProductosVenta(productos);

    if (!resultadoValidacion.valido) return errorJson(res, 400, resultadoValidacion.mensaje);
    
    const productosFormateados = productos.map((p) => ({id: obtenerNumero(p.id), cantidad: obtenerNumero(p.cantidad), precio: Number(p.precio)}));

    req.body = {
        ...req.body,
        nombreCliente: nombreCliente.trim(),
        total: Number(total),
        productos: productosFormateados,
    };
    next();
};