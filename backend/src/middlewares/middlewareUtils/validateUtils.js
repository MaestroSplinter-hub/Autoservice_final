import { MensajesError } from "./errores.js";
import { esEntero, esDecimal, esUndefined, esCadena, esObjeto } from "./middleUtils.js";

export const tieneLongitudMinima = (min) => (valor) => esCadena(valor) && valor.trim().length >= min;

export const perteneceACategorias = (categorias) => (tipo) => esCadena(tipo) && categorias.includes(tipo);

export const cumpleReglaNumerica = (condicionFn) => (valor) => esDecimal(valor) && condicionFn(Number(valor));

const categoriasProducto = ["videojuego", "consola"];
export const esNombreValido = tieneLongitudMinima(2);
export const esTipoValido = perteneceACategorias(categoriasProducto);
export const esPrecioMayorACero = cumpleReglaNumerica((n) => n > 0);
export const esPrecioMayorOIgualACero = cumpleReglaNumerica((n) => n >= 0);

// ---------------------------------------

export const esEnteroPositivo = (num) => esDecimal(num) && Number.isInteger(Number(num)) && Number(num) > 0;

export const esDecimalValido = (decimal) => !esUndefined(decimal) && esDecimal(decimal);

export const esPrecioValido = (precio) => esDecimalValido(precio) && esPrecioMayorACero(precio);

export const esCorreoValido = (correo) => esCadena(correo) && correo.includes('@');

export const esContraValida = (contrasenia) => esCadena(contrasenia) && contrasenia.length >= 6;

export const esIdValido = (id) => esEnteroPositivo(id);

export const esPaginaValida = (pagina) => esEnteroPositivo(pagina);

export const esLimiteValido = (limite) => esEnteroPositivo(limite) && limite <= 1000;

export const esItemVentaValido = (item) => {
    if (!esObjeto(item)) return false;
    const esItemValido = esIdValido(item.id) && esEnteroPositivo(item.cantidad) && esPrecioValido(item.precio);
    return esItemValido;
};

export const validarPropiedadesItem = (item, indice) => {
    if (!esObjeto(item)) return { valido: false, mensaje: `El ítem en la posición ${indice + 1} debe ser un objeto plano.` };

    if (!esIdValido(item.id)) return { valido: false, mensaje: MensajesError.VENTA.PRODUCTO_DETALLE(indice, "id") };

    if (!esEnteroPositivo(item.cantidad)) return { valido: false, mensaje: MensajesError.VENTA.PRODUCTO_DETALLE(indice, "cantidad") };

    if (!esPrecioValido(item.precio)) return { valido: false, mensaje: MensajesError.VENTA.PRODUCTO_DETALLE(indice, "precio") };

    return { valido: true };
};

export const analizarProductosVenta = (productos) => {
    const primerError = productos.map(validarPropiedadesItem).find(reporte => !reporte.valido);
    return primerError ? primerError : { valido: true };
};